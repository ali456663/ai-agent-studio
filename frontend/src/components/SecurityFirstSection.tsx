const SECURITY_PILLARS = [
  {
    num: "1",
    title: "Strategi & Styrning",
    text: "Riskbaserad prioritering utifrån exponering (t.ex. publik webbserver före intern testmiljö) och tydligt ägarskap enligt Identifiera → Bedöma → Åtgärda → Verifiera."
  },
  {
    num: "2",
    title: "Juridik & Policyer (GDPR & NIS2)",
    text: "Dataminimering, laglig grund och rensning enligt GDPR, 24/7-incidentrutiner för kritiska sektorer (NIS2) samt policyer för MFA, 12+ tecken, backup och incidenter."
  },
  {
    num: "3",
    title: "Inventering & Skanning",
    text: "Full överblick över programvara och patchnivå (varningsflagga över 90 dagar) samt strikta brandväggsregler: endast port 443 (HTTPS) utåt – aldrig RDP (3389) eller SMB (445)."
  },
  {
    num: "4",
    title: "CVE/CVSS, Patchning & Härdning",
    text: "Löpande kontroll mot kända sårbarheter (CVE/CVSS), snabb patchning, borttagna standardkonton, avstängt Telnet/SMBv1 och utbyte av End-of-Life-system."
  },
  {
    num: "5",
    title: "Loggning & Övervakning",
    text: "Centraliserade loggar från webb, databas och brandvägg med larm på mönster som upprepade misslyckade inloggningar (4625) och nya adminkonton (4720)."
  },
  {
    num: "6",
    title: "Incidenthantering (Triagekort)",
    text: "Tydliga steg när något händer: identifiera, isolera servern, spärra kontot, dokumentera och spara alla loggar som bevis utan att radera spår."
  }
];

export function SecurityFirstSection() {
  return (
    <section className="section" id="sakerhet-forst">
      <div className="container">
        <div className="section-header">
          <span className="badge">Steg 1 i varje leverans</span>
          <h2>Säkerhet är första steget</h2>
          <p>
            För att bygga en säker hemsida och AI-agent räcker det inte att bara skriva kod. Säkerheten genomsyrar
            hela verksamheten – från juridik och policyer till härdning, loggövervakning och incidentberedskap.
          </p>
        </div>

        <div className="security-hero-grid">
          <figure className="security-media-card">
            <img
              src="/images/security-first.jpg"
              alt="Cybersäkerhetssköld som skyddar webbplats, inloggning och kunddata"
              className="security-media-img"
            />
            <figcaption className="hero-media-overlay">
              <strong>Identifiera → Bedöma → Åtgärda → Verifiera</strong>
              Riskbaserad säkerhet i både utveckling och daglig drift.
            </figcaption>
          </figure>

          <div className="card security-checklist-card">
            <h3>Checklista för en säker hemsida &amp; AI-miljö</h3>
            <div className="checklist-cols">
              <div>
                <h4>Innan lansering</h4>
                <ul className="check-list">
                  <li>GDPR: Integritetspolicy &amp; cookie-information på plats</li>
                  <li>Härdning: Uppdaterad server, inga standardkonton, endast port 443 (HTTPS)</li>
                  <li>Policy: MFA för alla adminkonton &amp; lösenfraser på minst 12 tecken</li>
                  <li>Skanning: Inga kända kritiska CVE:er (hög CVSS)</li>
                </ul>
              </div>
              <div>
                <h4>Under drift</h4>
                <ul className="check-list">
                  <li>Patchning: Inga säkerhetsuppdateringar äldre än 90 dagar</li>
                  <li>Backup: Daglig backup inkl. immutable kopia &amp; årligt återställningstest</li>
                  <li>Loggning: Larm på misstänkta mönster (t.ex. 4625 &amp; 4720)</li>
                  <li>Beredskap: Triagekort &amp; tydlig incidentkontakt (security@)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-3 security-pillars">
          {SECURITY_PILLARS.map((p) => (
            <article key={p.num} className="card">
              <span className="step-num">{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
