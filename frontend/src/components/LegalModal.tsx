interface LegalModalProps {
  mode: "privacy" | "security" | null;
  onClose: () => void;
}

export function LegalModal({ mode, onClose }: LegalModalProps) {
  if (!mode) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === "privacy" ? "Integritetspolicy & Cookies (GDPR)" : "Säkerhet, Spring Security & Incidenthantering"}</h2>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Stäng
          </button>
        </div>

        {mode === "privacy" ? (
          <div className="modal-body">
            <p>
              NordicAgent Studio följer principen om <strong>dataminimering</strong>. Kontaktformuläret samlar endast in
              namn, e-post, företag, bransch och valfritt meddelande med stöd av ditt samtycke (GDPR art. 6.1 a).
            </p>
            <ul>
              <li>Uppgifter sparas krypterat i PostgreSQL och raderas när dialogen inte längre är aktiv (senast efter 12 månader).</li>
              <li>Inga reklam- eller tredjepartscookies används – endast lokal lagring för att komma ihåg ditt cookie-val.</li>
              <li>Begär utdrag eller radering via <a href="mailto:hej@nordicagent.se">hej@nordicagent.se</a>.</li>
            </ul>
          </div>
        ) : (
          <div className="modal-body">
            <p>
              Plattformen följer arbetsflödet <strong>Identifiera → Bedöma → Åtgärda → Verifiera</strong> enligt vår
              säkerhetsblueprint för SME och NIS2-leverantörskedjor:
            </p>
            <ul>
              <li><strong>Spring Security:</strong> Stateless API, CORS-begränsning, BCrypt, Least Privilege för <code>/api/admin/**</code>.</li>
              <li><strong>HTTPS &amp; Headers:</strong> CSP, HSTS, X-Frame-Options: DENY, Referrer-Policy och inga hemligheter i koden.</li>
              <li><strong>Backup &amp; Drift:</strong> Daglig PostgreSQL-backup med immutable kopia och löpande patchning (&lt; 90 dagar).</li>
              <li><strong>Incidentrapportering:</strong> <a href="mailto:security@nordicagent.se">security@nordicagent.se</a> och <a href="/.well-known/security.txt">/.well-known/security.txt</a>.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
