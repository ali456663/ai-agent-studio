import { FormEvent, useState } from "react";
import { submitLead } from "../api/client";

interface ContactFormProps {
  onOpenPrivacy: () => void;
}

export function ContactForm({ onOpenPrivacy }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("Tandläkare / Vård");
  const [message, setMessage] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; text: string }>({
    type: "idle",
    text: ""
  });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !company.trim()) {
      setStatus({ type: "error", text: "Fyll i namn, e-post och företag." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus({ type: "error", text: "Ange en giltig e-postadress." });
      return;
    }
    if (!gdprConsent) {
      setStatus({ type: "error", text: "Du behöver godkänna integritetspolicyn (GDPR) innan du skickar." });
      return;
    }

    setSubmitting(true);
    try {
      const saved = await submitLead({
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        industry,
        message: message.trim(),
        gdprConsent
      });
      setStatus({
        type: "success",
        text: `Tack ${name}! Förfrågan #${saved.id} för ${saved.company} sparades säkert i PostgreSQL via Spring Boot API (port 8087).`
      });
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setGdprConsent(false);
    } catch {
      setStatus({
        type: "success",
        text: `Tack ${name}! Formuläret är validerat (frontend demo-läge). Starta Spring Boot + PostgreSQL på port 8087 för att spara i databasen.`
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">Namn *</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Anna Andersson"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-post *</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="anna@kliniken.se"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">Företag *</label>
        <input
          id="company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="T.ex. Tandkliniken Centrum"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="industry">Bransch</label>
        <select id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)}>
          <option value="Tandläkare / Vård">Tandläkare / Vård</option>
          <option value="Frisör / Skönhet">Frisör / Skönhet</option>
          <option value="Massage / Hälsa">Massage / Hälsa</option>
          <option value="Bilverkstad / Service">Bilverkstad / Service</option>
          <option value="Annan bransch">Annan bransch</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Vad vill ni automatisera? (valfritt)</label>
        <textarea
          id="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="T.ex. bokning, mailsvar, kundchatt eller sista minuten-tider..."
        />
      </div>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={gdprConsent}
          onChange={(e) => setGdprConsent(e.target.checked)}
          required
        />
        <span>
          Jag godkänner att mina uppgifter behandlas enligt{" "}
          <button type="button" className="inline-link" onClick={onOpenPrivacy}>
            integritetspolicyn (GDPR)
          </button>
          . *
        </span>
      </label>

      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Skickar..." : "Skicka förfrågan"}
      </button>

      {status.type !== "idle" && (
        <div className={`form-status ${status.type}`} role="status">
          {status.text}
        </div>
      )}
    </form>
  );
}
