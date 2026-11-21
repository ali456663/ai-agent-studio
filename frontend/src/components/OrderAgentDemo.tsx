import { useState } from "react";

export function OrderAgentDemo() {
  const [rowStatus, setRowStatus] = useState<"warn" | "adjusted" | "approved">("warn");

  return (
    <section className="section section-alt" id="orderagent">
      <div className="container">
        <div className="section-header">
          <h2>Exempel: Orderagenten i praktiken</h2>
          <p>
            Agenten läser kundens beställning, jämför mot er offert och skapar ett färdigt orderutkast. När en rad har
            avvikande pris markeras just den raden så säljaren behåller full kontroll.
          </p>
        </div>

        <div className="order-demo-grid">
          <article className="card">
            <span className="pill-tag">1. Inkommande beställning (PDF / mejl)</span>
            <h3>Från: Nordisk Industri AB</h3>
            <div className="order-mail-box">
              <p>
                <strong>Ämne:</strong> Beställning enligt offert #OF-4821 – önskad leverans fredag
              </p>
              <table className="order-table">
                <thead>
                  <tr>
                    <th>Art.nr</th>
                    <th>Antal</th>
                    <th>Pris i PDF</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>AX-204 Ventilblock</td>
                    <td>12 st</td>
                    <td>1 450 kr</td>
                  </tr>
                  <tr className="row-warn">
                    <td>BR-880 Packningssats</td>
                    <td>25 st</td>
                    <td>210 kr</td>
                  </tr>
                  <tr>
                    <td>KM-112 Givarkabel</td>
                    <td>8 st</td>
                    <td>390 kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article className="card card-featured">
            <span className="pill-tag">2. Färdigt orderutkast med avvikelsekontroll</span>
            <h3>Förberett åt säljaren</h3>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Artikel</th>
                  <th>Offert</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="row-ok">
                  <td>AX-204 (12 st)</td>
                  <td>1 450 kr</td>
                  <td>✓ Matchar offert</td>
                </tr>
                <tr className={rowStatus === "warn" ? "row-warn" : "row-ok"}>
                  <td>BR-880 (25 st)</td>
                  <td>265 kr</td>
                  <td>
                    {rowStatus === "warn" && "⚠ Avvikelse: 210 kr i PDF (offert 265 kr)"}
                    {rowStatus === "adjusted" && "✓ Justerad till offertpris (265 kr)"}
                    {rowStatus === "approved" && "✓ Godkänd av säljare (210 kr)"}
                  </td>
                </tr>
                <tr className="row-ok">
                  <td>KM-112 (8 st)</td>
                  <td>390 kr</td>
                  <td>✓ Matchar offert</td>
                </tr>
              </tbody>
            </table>

            <div className="order-actions">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setRowStatus("adjusted")}
              >
                Justera till offertpris (265 kr)
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setRowStatus("approved")}
              >
                Godkänn kundens pris (210 kr)
              </button>
              {rowStatus !== "warn" && (
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setRowStatus("warn")}>
                  Återställ demo
                </button>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
