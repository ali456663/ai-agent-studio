import { lazy, Suspense, useEffect, useState } from "react";
import { Calendar, CalendarX, Inbox, Mail, MessageSquare, PhoneMissed, Zap } from "lucide-react";
import { ContactForm } from "./components/ContactForm";
import { DemoSection } from "./components/DemoSection";
import { HeroMockup } from "./components/HeroMockup";
import { LegalModal } from "./components/LegalModal";

const Hero3DCanvas = lazy(() => import("./components/Hero3DCanvas"));
const COOKIE_KEY = "nordicagent_cookie_notice_ack";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<"privacy" | "security" | null>(null);
  const [showCookie, setShowCookie] = useState(false);
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(COOKIE_KEY)) {
        setShowCookie(true);
      }
    } catch {
      setShowCookie(true);
    }
  }, []);

  useEffect(() => {
    const mqWide = window.matchMedia("(min-width: 961px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShow3D(mqWide.matches && !mqMotion.matches);
    update();
    mqWide.addEventListener("change", update);
    mqMotion.addEventListener("change", update);
    return () => {
      mqWide.removeEventListener("change", update);
      mqMotion.removeEventListener("change", update);
    };
  }, []);

  function acceptCookie() {
    try {
      localStorage.setItem(COOKIE_KEY, "accepted");
    } catch {
      // ignore storage errors
    }
    setShowCookie(false);
  }

  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true">NA</span>
            <span>NordicAgent Studio</span>
          </a>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            Meny
          </button>

          <nav aria-label="Huvudmeny">
            <ul className={`nav-links ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}>
              <li><a href="#tjanster">Tjänster</a></li>
              <li><a href="#branscher">Branscher</a></li>
              <li><a href="#demo">Prova demo</a></li>
              <li><a href="#kom-igang">Så kommer ni igång</a></li>
              <li><a href="#priser">Paket</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a className="btn btn-primary btn-sm" href="#kontakt">Boka demo</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* Hero med produktmockup och dämpad 3D-bakgrund */}
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <h1>Fyll tomma tider och svara kunderna dygnet runt</h1>
              <p className="lead">
                Vi bygger skräddarsydda AI-agenter för bokningar, mailsvar, kundchatt och sista minuten-erbjudanden –
                anpassade efter era tider, priser och rutiner.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#kontakt">Boka kostnadsfri rådgivning</a>
                <a className="btn btn-secondary" href="#demo">Prova kalendern</a>
              </div>
              <div className="trust-row">
                <span>✓ Svar dygnet runt</span>
                <span>✓ Anpassat efter er kalender</span>
                <span>✓ Dataminimering enligt GDPR</span>
              </div>
            </div>

            <div className="hero-visual">
              {show3D && (
                <Suspense fallback={null}>
                  <Hero3DCanvas />
                </Suspense>
              )}
              <HeroMockup />
            </div>
          </div>
        </section>

        {/* Problemet */}
        <section className="section" id="problemet">
          <div className="container">
            <div className="section-header">
              <h2>Dagens situation → Framtidens lösning</h2>
              <p>Vi tar bort vardagens flaskhalsar så att ni får tid över till kunderna.</p>
            </div>
            <div className="grid-3">
              <article className="card">
                <div className="card-icon" aria-hidden="true"><PhoneMissed size={22} /></div>
                <h3>Missade samtal &amp; stress</h3>
                <p>När ni sitter med en kund svarar er AI-agent direkt i chatt, bokning och e-post dygnet runt.</p>
              </article>
              <article className="card">
                <div className="card-icon" aria-hidden="true"><Inbox size={22} /></div>
                <h3>Mail som blir liggande</h3>
                <p>Snabba och tydliga svar på återkommande frågor om tider, priser och förberedelser.</p>
              </article>
              <article className="card">
                <div className="card-icon" aria-hidden="true"><CalendarX size={22} /></div>
                <h3>Tomma tider i kalendern</h3>
                <p>Sena återbud kan automatiskt lyftas fram som sista minuten-erbjudanden (-50 %).</p>
              </article>
            </div>
          </div>
        </section>

        {/* Tjänster */}
        <section className="section section-alt" id="tjanster">
          <div className="container">
            <div className="section-header">
              <h2>Vad vi bygger åt ert företag</h2>
              <p>Skräddarsydda AI-agentmoduler anpassade efter era verktyg och kundflöden.</p>
            </div>
            <div className="grid-4">
              <article className="card">
                <div className="card-icon" aria-hidden="true"><Calendar size={22} /></div>
                <h3>Automatisk bokning</h3>
                <p>Visar lediga och upptagna tider i realtid och kopplas mot ert bokningsflöde.</p>
              </article>
              <article className="card">
                <div className="card-icon" aria-hidden="true"><Mail size={22} /></div>
                <h3>AI-mailsvar</h3>
                <p>Svarar på vanliga kundmail dygnet runt och skickar bara mer komplicerade ärenden vidare.</p>
              </article>
              <article className="card">
                <div className="card-icon" aria-hidden="true"><MessageSquare size={22} /></div>
                <h3>Kundchatt 24/7</h3>
                <p>En chatt på er hemsida som svarar om tjänster, priser och guidar kunden till bokning.</p>
              </article>
              <article className="card">
                <div className="card-icon" aria-hidden="true"><Zap size={22} /></div>
                <h3>Sista minuten (-50 %)</h3>
                <p>Fyller tomma luckor och sena avbokningar automatiskt för jämnare beläggning.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Branscher */}
        <section className="section" id="branscher">
          <div className="container">
            <div className="section-header">
              <h2>Branscher vi hjälper</h2>
              <p>Vi börjar gärna med tandläkare och vård, men bygger AI-agenter för alla tidsbokningsintensiva företag.</p>
            </div>
            <div className="grid-4">
              <article className="card card-featured">
                <span className="pill-tag">Huvudfokus</span>
                <h3>Tandläkare &amp; Vård</h3>
                <p>Avlasta receptionen med tydliga bokningsflöden och snabb återbudshantering.</p>
              </article>
              <article className="card">
                <span className="pill-tag">Skönhet</span>
                <h3>Frisör &amp; Salong</h3>
                <p>Slipp avbrott under behandling och fyll luckor med sista minuten-rabatt.</p>
              </article>
              <article className="card">
                <span className="pill-tag">Hälsa</span>
                <h3>Massage &amp; Naprapati</h3>
                <p>Svara på frågor dygnet runt och minska uteblivna besök med påminnelser.</p>
              </article>
              <article className="card">
                <span className="pill-tag">Service</span>
                <h3>Bilverkstad &amp; Fler</h3>
                <p>Hantera servicebokningar, däckbyte och statusfrågor – vi anpassar efter er bransch.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Interaktiv Demo */}
        <DemoSection />

        {/* Så kommer ni igång */}
        <section className="section section-alt" id="kom-igang">
          <div className="container">
            <div className="section-header">
              <h2>Så kommer ni igång</h2>
              <p>Tre tydliga steg från första samtal till färdig AI-agent i er vardag.</p>
            </div>
            <ol className="grid-3 steps">
              <li className="card">
                <span className="step-num">1</span>
                <h3>Kartläggning &amp; kalenderkoppling</h3>
                <p>Vi går igenom era vanligaste kundfrågor, era rutiner för personuppgifter och kopplar in er kalender.</p>
              </li>
              <li className="card">
                <span className="step-num">2</span>
                <h3>Anpassning &amp; test</h3>
                <p>Vi tränar AI-agenten på era tjänster, priser och regler för sista minuten-tider och testar tillsammans med er.</p>
              </li>
              <li className="card">
                <span className="step-num">3</span>
                <h3>Lansering &amp; löpande justering</h3>
                <p>Agenten går live på er hemsida och i era kanaler, och vi finjusterar svaren utifrån riktiga kundfrågor.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* Paket */}
        <section className="section" id="priser">
          <div className="container">
            <div className="section-header">
              <h2>Paket &amp; upplägg</h2>
              <p>Börja enkelt och väx i er egen takt. Priserna nedan är exempel och anpassas efter behov.</p>
            </div>
            <div className="grid-3">
              <article className="card">
                <h3>Start</h3>
                <p>Snabb start med AI-kundchatt och bokningslänk.</p>
                <div className="price-amount">Från 2 900 kr/mån</div>
                <ul className="check-list">
                  <li>AI-kundchatt 24/7</li>
                  <li>Svar på priser &amp; vanliga frågor</li>
                  <li>Anpassning efter era GDPR-krav</li>
                </ul>
                <a className="btn btn-secondary" href="#kontakt">Välj Start</a>
              </article>
              <article className="card card-featured">
                <span className="pill-tag">Mest populär</span>
                <h3>Pro</h3>
                <p>Komplett avlastning för kliniker, salonger och verkstäder.</p>
                <div className="price-amount">Från 5 900 kr/mån</div>
                <ul className="check-list">
                  <li>Allt i Start + direkt kalenderkoppling</li>
                  <li>Automatiska AI-mailsvar</li>
                  <li>Sista minuten-erbjudanden (-50 %)</li>
                </ul>
                <a className="btn btn-primary" href="#kontakt">Boka demo för Pro</a>
              </article>
              <article className="card">
                <h3>Företag / Skräddarsytt</h3>
                <p>Flera avdelningar, egna system och särskilda krav.</p>
                <div className="price-amount">Offert</div>
                <ul className="check-list">
                  <li>Anpassade integrationer mot era system</li>
                  <li>Flera kalendrar, kliniker eller språk</li>
                  <li>Löpande utveckling efter era behov</li>
                </ul>
                <a className="btn btn-secondary" href="#kontakt">Kontakta oss</a>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section section-alt" id="faq">
          <div className="container">
            <div className="section-header">
              <h2>Vanliga frågor</h2>
            </div>
            <div className="faq-list">
              <details className="faq-item">
                <summary>Behöver vi egen IT-avdelning för att ha en AI-agent?</summary>
                <p>Nej, vi hjälper er hela vägen från kartläggning och inställningar till lansering och löpande justeringar.</p>
              </details>
              <details className="faq-item">
                <summary>Hur hanteras kundernas personuppgifter (GDPR)?</summary>
                <p>Vi arbetar efter dataminimering och samlar bara in det som krävs för att besvara eller boka. Vi går igenom era specifika krav under rådgivningen.</p>
              </details>
              <details className="faq-item">
                <summary>Kan vi börja litet och bygga ut senare?</summary>
                <p>Ja! Ni kan börja med t.ex. kundchatt eller bokning idag och lägga till mailsvar och sista minuten-flöden när ni är redo.</p>
              </details>
            </div>
          </div>
        </section>

        {/* Kontakt */}
        <section className="section" id="kontakt">
          <div className="container contact-grid">
            <div>
              <h2>Boka demo med oss</h2>
              <p>Berätta vad ni vill underlätta i er verksamhet så visar vi ett förslag anpassat efter er.</p>
              <ul className="check-list">
                <li>Kostnadsfri genomgång utan förpliktelser</li>
                <li>Dataminimerat formulär enligt GDPR</li>
                <li>Svar normalt inom en arbetsdag</li>
              </ul>
              <p>
                {/* TODO: byt till riktiga adresser innan lansering */}
                <strong>Kontakt:</strong> <a href="mailto:hej@nordicagent.se">hej@nordicagent.se</a><br />
                <strong>Säkerhet:</strong> <a href="mailto:security@nordicagent.se">security@nordicagent.se</a>
              </p>
            </div>

            <div className="card">
              <ContactForm onOpenPrivacy={() => setLegalModal("privacy")} />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3>NordicAgent Studio</h3>
              <p>Skräddarsydda AI-agenter för bokning, mailsvar, kundchatt och sista minuten-tider.</p>
            </div>
            <div>
              <h3>Navigering</h3>
              <ul>
                <li><a href="#tjanster">Tjänster</a></li>
                <li><a href="#demo">Prova demo</a></li>
                <li><a href="#kom-igang">Så kommer ni igång</a></li>
                <li><a href="#priser">Paket</a></li>
              </ul>
            </div>
            <div>
              <h3>Juridik &amp; Säkerhet</h3>
              <ul>
                <li>
                  <button type="button" className="footer-link" onClick={() => setLegalModal("privacy")}>
                    Integritetspolicy &amp; Cookies (GDPR)
                  </button>
                </li>
                <li>
                  <button type="button" className="footer-link" onClick={() => setLegalModal("security")}>
                    Säkerhet &amp; Incidentrapportering
                  </button>
                </li>
                {/* TODO: verifiera att security.txt och e-post finns i produktion */}
                <li><a href="/.well-known/security.txt">security.txt</a></li>
                <li><a href="mailto:security@nordicagent.se">security@nordicagent.se</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} NordicAgent Studio</span>
            <span>Inga spårningscookies</span>
          </div>
        </div>
      </footer>

      {showCookie && (
        <div className="cookie-banner visible" role="dialog" aria-label="Cookie-information">
          <p>
            Vi använder <strong>endast nödvändig lokal lagring</strong> för ditt cookie-val – inga spårningscookies.{" "}
            <button type="button" className="inline-link light" onClick={() => setLegalModal("privacy")}>
              Läs integritetspolicyn
            </button>
            .
          </p>
          <button className="btn btn-accent btn-sm" type="button" onClick={acceptCookie}>
            Jag förstår
          </button>
        </div>
      )}

      <LegalModal mode={legalModal} onClose={() => setLegalModal(null)} />
    </>
  );
}
