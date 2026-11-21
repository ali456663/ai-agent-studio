import { useEffect, useState } from "react";
import { ContactForm } from "./components/ContactForm";
import { DemoSection } from "./components/DemoSection";
import { Hero3DCanvas } from "./components/Hero3DCanvas";
import { LegalModal } from "./components/LegalModal";

const COOKIE_KEY = "nordicagent_cookie_notice_ack";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<"privacy" | "security" | null>(null);
  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(COOKIE_KEY)) {
        setShowCookie(true);
      }
    } catch {
      setShowCookie(true);
    }
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
              <li><a href="#demo">Live-demo</a></li>
              <li><a href="#om-oss">Vårt team</a></li>
              <li><a href="#priser">Paket</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a className="btn btn-primary btn-sm" href="#kontakt">Boka demo</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* Hero med 3D WebGL / Three.js */}
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <span className="badge">AI-agentstudio · Fullstack &amp; 3D WebGL</span>
              <h1>Vi bygger skräddarsydda AI-agenter som avlastar ert företag – idag och i framtiden</h1>
              <p className="lead">
                Vårt team hjälper företag att designa, bygga och driftsätta säkra AI-agenter för bokningar, mailsvar,
                kundchatt och sista minuten-erbjudanden. Byggt med modern arkitektur: React, TypeScript, 3D WebGL,
                Spring Boot, Spring Security och PostgreSQL.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#kontakt">Boka kostnadsfri rådgivning</a>
                <a className="btn btn-secondary" href="#demo">Testa interaktiv demo</a>
              </div>
              <div className="trust-row">
                <span>✓ Spring Security &amp; GDPR</span>
                <span>✓ PostgreSQL &amp; REST API</span>
                <span>✓ 3D Three.js / Blender / Spline</span>
              </div>
            </div>

            <Hero3DCanvas />
          </div>
        </section>

        {/* Problemet */}
        <section className="section" id="problemet">
          <div className="container">
            <div className="section-header">
              <h2>Dagens situation → Framtidens lösning</h2>
              <p>Vi tar bort vardagens flaskhalsar så att ert team får tid över till kunderna.</p>
            </div>
            <div className="grid-3">
              <article className="card">
                <div className="card-icon">📞</div>
                <h3>Missade samtal &amp; stress</h3>
                <p>När ni sitter med en kund svarar er AI-agent direkt i chatt, bokning och e-post dygnet runt.</p>
              </article>
              <article className="card">
                <div className="card-icon">📥</div>
                <h3>Mail som blir liggande</h3>
                <p>Automatiska, träffsäkra svar på återkommande frågor om tider, priser och förberedelser.</p>
              </article>
              <article className="card">
                <div className="card-icon">📅</div>
                <h3>Tomma tider i kalendern</h3>
                <p>Sena återbud omvandlas automatiskt till synliga sista minuten-erbjudanden (-50 %).</p>
              </article>
            </div>
          </div>
        </section>

        {/* Tjänster */}
        <section className="section section-alt" id="tjanster">
          <div className="container">
            <div className="section-header">
              <h2>Vad vårt team bygger åt ert företag</h2>
              <p>Skräddarsydda AI-agentmoduler anpassade efter era verktyg och säkerhetskrav.</p>
            </div>
            <div className="grid-4">
              <article className="card">
                <div className="card-icon">🗓️</div>
                <h3>Automatisk bokning</h3>
                <p>Visar lediga/upptagna tider i realtid och kopplas säkert mot kalender &amp; databas.</p>
              </article>
              <article className="card">
                <div className="card-icon">✉️</div>
                <h3>AI-mailsvar</h3>
                <p>Svarar snabbt på kundmail 24/7 och eskalerar bara komplicerade ärenden till personalen.</p>
              </article>
              <article className="card">
                <div className="card-icon">💬</div>
                <h3>Kundchatt 24/7</h3>
                <p>Modern chatt på er hemsida som svarar om tjänster, priser och guidar kunden till bokning.</p>
              </article>
              <article className="card">
                <div className="card-icon">⚡</div>
                <h3>Sista minuten (-50 %)</h3>
                <p>Fyller tomma luckor och sena avbokningar automatiskt för högre beläggning.</p>
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
                <p>Avlasta receptionen med GDPR-medvetna bokningsflöden och snabb återbudshantering.</p>
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

        {/* Vårt team & Teknikstack */}
        <section className="section section-alt" id="om-oss">
          <div className="container">
            <div className="section-header">
              <h2>Teamet bakom era AI-agenter</h2>
              <p>Vi kombinerar UI/UX, 3D-design, robust Java-backend och cybersäkerhet under ett tak.</p>
            </div>
            <div className="grid-3">
              <article className="card">
                <div className="team-avatar">BE</div>
                <h3>Backend, API &amp; Databas</h3>
                <div className="team-role">Java · Spring Boot · PostgreSQL</div>
                <p>Bygger skalbara REST-API:er, kalenderintegrationer och säker datalagring med Spring Security.</p>
              </article>
              <article className="card">
                <div className="team-avatar">FE</div>
                <h3>UI/UX, Frontend &amp; 3D</h3>
                <div className="team-role">React · TypeScript · Three.js · Blender · Spline</div>
                <p>Skapar snabba, tillgängliga gränssnitt och engagerande 3D WebGL-upplevelser för moderna företag.</p>
              </article>
              <article className="card">
                <div className="team-avatar">SEC</div>
                <h3>Säkerhet &amp; DevOps</h3>
                <div className="team-role">GDPR · NIS2 · Docker · GitHub Actions · Vercel</div>
                <p>Härdade containers, automatiserade CI-kontroller, MFA och tydliga rutiner för incidenthantering.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Paket */}
        <section className="section" id="priser">
          <div className="container">
            <div className="section-header">
              <h2>Paket &amp; upplägg</h2>
              <p>Börja enkelt och väx i er egen takt. Exempelpriser anpassas efter behov.</p>
            </div>
            <div className="grid-3">
              <article className="card">
                <h3>Start</h3>
                <p>Snabb start med AI-kundchatt och bokningslänk.</p>
                <div className="price-amount">Från 2 900 kr/mån</div>
                <ul className="check-list">
                  <li>AI-kundchatt 24/7</li>
                  <li>Svar på priser &amp; vanliga frågor</li>
                  <li>GDPR-anpassad konfiguration</li>
                </ul>
                <a className="btn btn-secondary" href="#kontakt">Välj Start</a>
              </article>
              <article className="card card-featured">
                <span className="pill-tag">Mest populär</span>
                <h3>Pro</h3>
                <p>Komplett avlastning för kliniker, salonger och verkstäder.</p>
                <div className="price-amount">Från 5 900 kr/mån</div>
                <ul className="check-list">
                  <li>Allt i Start + live kalender-API</li>
                  <li>Automatiska AI-mailsvar</li>
                  <li>Sista minuten-erbjudanden (-50 %)</li>
                </ul>
                <a className="btn btn-primary" href="#kontakt">Boka demo för Pro</a>
              </article>
              <article className="card">
                <h3>Företag / Skräddarsytt</h3>
                <p>Flera avdelningar, egna system och utökad säkerhet.</p>
                <div className="price-amount">Offert</div>
                <ul className="check-list">
                  <li>Skräddarsydd Spring Boot &amp; AI-arkitektur</li>
                  <li>Utökad loggning &amp; NIS2-dokumentation</li>
                  <li>Dedikerat utvecklingsteam</li>
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
                <p>Nej, vårt team ansvarar för design, utveckling, säkerhet och drift så ni kan fokusera på verksamheten.</p>
              </details>
              <details className="faq-item">
                <summary>Hur skyddas vår kunddata (GDPR &amp; säkerhet)?</summary>
                <p>Vi använder dataminimering, Spring Security, krypterad HTTPS-trafik, PostgreSQL-backup och tydliga behörighetsroller.</p>
              </details>
              <details className="faq-item">
                <summary>Kan vi börja litet och bygga ut senare?</summary>
                <p>Ja! Arkitekturen är modulär så ni kan börja med bokning/chatt idag och lägga till fler AI-flöden framöver.</p>
              </details>
            </div>
          </div>
        </section>

        {/* Kontakt */}
        <section className="section" id="kontakt">
          <div className="container contact-grid">
            <div>
              <span className="badge">Kostnadsfri genomgång</span>
              <h2>Boka demo med vårt team</h2>
              <p>Berätta vad ni vill underlätta i er verksamhet så visar vi en skräddarsydd lösning.</p>
              <ul className="check-list">
                <li>Sparas säkert via Spring Boot API → PostgreSQL</li>
                <li>Dataminimerat formulär (GDPR)</li>
                <li>Svar normalt inom 1 arbetsdag</li>
              </ul>
              <p>
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
              <p>Fullstack AI-agentstudio för moderna företag – säkert, skalbart och byggt för framtiden.</p>
            </div>
            <div>
              <h3>Navigering</h3>
              <ul>
                <li><a href="#tjanster">Tjänster</a></li>
                <li><a href="#demo">Live-demo</a></li>
                <li><a href="#om-oss">Vårt team</a></li>
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
                    Säkerhet &amp; Incidenthantering
                  </button>
                </li>
                <li><a href="/.well-known/security.txt">security.txt</a></li>
                <li><a href="mailto:security@nordicagent.se">security@nordicagent.se</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} NordicAgent Studio</span>
            <span>React + TypeScript + Three.js · Spring Boot (8087) + PostgreSQL</span>
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
