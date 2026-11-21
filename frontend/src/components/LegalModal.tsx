import { useEffect, useId, useRef } from "react";

interface LegalModalProps {
  mode: "privacy" | "security" | null;
  onClose: () => void;
}

export function LegalModal({ mode, onClose }: LegalModalProps) {
  const titleId = useId();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!mode) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const card = cardRef.current;
    const focusables = card?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [mode, onClose]);

  if (!mode) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={onClose}>
      <div className="modal-card" ref={cardRef} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id={titleId}>
            {mode === "privacy" ? "Integritetspolicy & Cookies (GDPR)" : "Säkerhet & Incidentrapportering"}
          </h2>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Stäng
          </button>
        </div>

        {mode === "privacy" ? (
          <div className="modal-body">
            <p>
              NordicAgent Studio samlar endast in de uppgifter du själv lämnar i kontaktformuläret (namn, e-post,
              företag, bransch, valfritt meddelande samt tidpunkt och version för ditt samtycke) för att besvara din
              förfrågan enligt GDPR art. 6.1 a.
            </p>
            <ul>
              {/* TODO: justera lagringstid om ni har annan rutin */}
              <li>Uppgifter sparas högst 12 månader utan aktiv dialog och raderas därefter.</li>
              <li>Vi använder inga reklam- eller tredjepartscookies – endast lokal lagring för ditt cookie-val.</li>
              <li>
                Du kan när som helst begära utdrag eller radering via{" "}
                {/* TODO: byt till er riktiga adress */}
                <a href="mailto:hej@nordicagent.se">hej@nordicagent.se</a>.
              </li>
            </ul>
          </div>
        ) : (
          <div className="modal-body">
            <p>
              Vi arbetar löpande med dataminimering, krypterad webbtrafik (HTTPS) och rollstyrd åtkomst för
              administrativa funktioner.
            </p>
            <ul>
              <li>
                Rapportera misstänkta sårbarheter eller incidenter till{" "}
                {/* TODO: verifiera att adress och security.txt finns i produktion */}
                <a href="mailto:security@nordicagent.se">security@nordicagent.se</a>.
              </li>
              <li>
                Maskinläsbar kontaktväg: <a href="/.well-known/security.txt">/.well-known/security.txt</a>.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
