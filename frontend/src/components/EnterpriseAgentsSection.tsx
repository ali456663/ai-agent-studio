const WORKSHOP_STEPS = [
  {
    num: "1",
    title: "Boka rätt jobb och rätt resurser",
    text: "Agenten frågar t.ex. \"Sitter vinterdäcken redan på fälg?\", kollar däckhotell, lyft och mekaniker, och erbjuder bara tider som faktiskt ryms."
  },
  {
    num: "2",
    title: "Fullbokning, återbud & väntelista",
    text: "Är fredagen full bokas måndag 15.30 med automatiskt sms om ett fredagsåterbud dyker upp. Ombokning sköts direkt i samma konversation."
  },
  {
    num: "3",
    title: "Förberedd arbetsorder till mekanikern",
    text: "Samlar regnummer, mätarställning och symtom (t.ex. skrapande ljud vid inbromsning) så mekanikern får ett färdigt underlag. Säkerhetsfrågor lämnas över till människa."
  },
  {
    num: "4",
    title: "Prisfrågor & godkännande av extraarbete",
    text: "Skickar förslag under besöket (t.ex. kupéfilter 450 kr inkl. arbete och moms) och sparar kundens svar och tidpunkt direkt på arbetsordern."
  },
  {
    num: "5",
    title: "Statusbesked & hämtning",
    text: "Skiljer på inlämningstid, uppskattad sluttid och klar för hämtning, och skickar sms med slutbelopp och öppettider när bilen är färdig."
  },
  {
    num: "6",
    title: "Morgonsammanställning för personalen",
    text: "Flaggar saknade reservdelsleveranser, kunder som väntar på prisförslag, lediga återbudsluckor och krockar på lånebil innan dagen startar."
  }
];

const ENTERPRISE_AGENTS = [
  {
    name: "Inköpsagent",
    example:
      "En leverantör meddelar försening. Agenten hittar inköpsordern, jämför datumen och visar vilka planerade jobb som påverkas – t.ex. hos fordonsbolag och underleverantörer.",
    metric: "Mätetal: Tid från besked till åtgärd"
  },
  {
    name: "Orderagent",
    example:
      "Läser artikelnummer, antal och datum ur en PDF-beställning, jämför mot offerten, skapar orderutkast och flaggar avvikande pris för säljaren.",
    metric: "Mätetal: Minuter per order & färre rättningar"
  },
  {
    name: "Serviceagent",
    example:
      "Samlar in modell, serienummer och felkod, hittar rätt manualversion och förbereder ett komplett ärende åt serviceteknikern vid första kontakten.",
    metric: "Mätetal: Andel kompletta ärenden direkt"
  },
  {
    name: "Dokumentagent",
    example:
      "Söker endast i dokument som användaren har behörighet till, visar gällande kvalitetsmall med version och källa samt upptäcker motstridiga dokument.",
    metric: "Mätetal: Tid att hitta rätt version"
  },
  {
    name: "Kvalitetsagent",
    example:
      "Kopplar avvikelserapporter till artikel och leverantör, samlar bilder och mätvärden och tar fram liknande tidigare ärenden åt kvalitetsingenjören.",
    metric: "Mätetal: Tid till komplett utredningsunderlag"
  },
  {
    name: "Offertagent",
    example:
      "Läser omfattande offertförfrågningar, sammanställer kraven i tabell med sidhänvisning och visar vilka frågor säljteamet behöver svar på.",
    metric: "Mätetal: Timmar till första offertutkast"
  }
];

export function EnterpriseAgentsSection() {
  return (
    <>
      <section className="section" id="verkstad-flode">
        <div className="container">
          <div className="section-header">
            <h2>Exempel i vardagen: AI-agent för bilverkstad</h2>
            <p>
              En enda kundmening på söndagskvällen kan innehålla flera uppgifter. Så här avlastar agenten hela
              verkstadsflödet utan att personalen tappar kontrollen.
            </p>
          </div>

          <blockquote className="quote-callout">
            ”Jag vill byta till vinterdäck på fredag. Hjulen ligger hos er. Har ni någon tid efter tre?”
          </blockquote>

          <div className="grid-3">
            {WORKSHOP_STEPS.map((s) => (
              <article key={s.num} className="card">
                <span className="step-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="foretagsagenter">
        <div className="container">
          <div className="section-header">
            <h2>Sex AI-agenter för större företag &amp; industri</h2>
            <p>
              Agenten läser mejl, hittar rätt uppgifter i era befintliga system, upptäcker avvikelser och förbereder
              nästa åtgärd. Ni bestämmer alltid vilka steg som kräver godkännande.
            </p>
          </div>

          <div className="grid-3">
            {ENTERPRISE_AGENTS.map((a) => (
              <article key={a.name} className="card">
                <h3>{a.name}</h3>
                <p>{a.example}</p>
                <span className="metric-tag">{a.metric}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
