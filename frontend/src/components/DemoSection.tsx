import { FormEvent, useEffect, useState } from "react";
import { DemoSlot, fetchDemoSlots, simulateDemoBooking } from "../api/client";

type IndustryKey = "tandlakare" | "frisor" | "massage" | "bilverkstad";
type DayKey = "idag" | "imorgon";

const FALLBACK_SLOTS: Record<IndustryKey, Record<DayKey, DemoSlot[]>> = {
  tandlakare: {
    idag: [
      { time: "09:00", status: "busy", service: "Undersökning", price: "990 kr" },
      { time: "10:30", status: "free", service: "Basundersökning", price: "990 kr" },
      { time: "13:00", status: "deal", service: "Återbud: Tandhygienist", price: "495 kr (-50 %)" },
      { time: "14:30", status: "busy", service: "Lagning", price: "1 450 kr" },
      { time: "16:00", status: "free", service: "Akuttid / Kontroll", price: "850 kr" },
      { time: "17:00", status: "deal", service: "Sista minuten: Puts", price: "450 kr (-50 %)" }
    ],
    imorgon: [
      { time: "08:30", status: "free", service: "Undersökning", price: "990 kr" },
      { time: "10:00", status: "busy", service: "Rotfyllning", price: "2 900 kr" },
      { time: "11:30", status: "free", service: "Tandhygienist", price: "990 kr" },
      { time: "14:00", status: "deal", service: "Sista minuten: Kontroll", price: "495 kr (-50 %)" },
      { time: "15:30", status: "busy", service: "Undersökning", price: "990 kr" },
      { time: "16:30", status: "free", service: "Konsultation", price: "500 kr" }
    ]
  },
  frisor: {
    idag: [
      { time: "09:30", status: "busy", service: "Klippning & färg", price: "1 690 kr" },
      { time: "11:00", status: "deal", service: "Sista minuten: Klippning", price: "345 kr (-50 %)" },
      { time: "13:00", status: "free", service: "Klippning 45 min", price: "690 kr" },
      { time: "14:30", status: "busy", service: "Slingor", price: "1 890 kr" },
      { time: "16:15", status: "free", service: "Styling", price: "490 kr" },
      { time: "17:30", status: "deal", service: "Återbud: Klippning", price: "345 kr (-50 %)" }
    ],
    imorgon: [
      { time: "10:00", status: "free", service: "Klippning 45 min", price: "690 kr" },
      { time: "11:30", status: "free", service: "Klippning & skägg", price: "790 kr" },
      { time: "13:30", status: "busy", service: "Färgbehandling", price: "1 790 kr" },
      { time: "15:00", status: "deal", service: "Sista minuten: Styling", price: "245 kr (-50 %)" },
      { time: "16:30", status: "busy", service: "Klippning", price: "690 kr" },
      { time: "17:45", status: "free", service: "Klippning", price: "690 kr" }
    ]
  },
  massage: {
    idag: [
      { time: "09:00", status: "busy", service: "Idrottsmassage 60 min", price: "890 kr" },
      { time: "10:30", status: "deal", service: "Sista minuten: Rygg & nacke", price: "345 kr (-50 %)" },
      { time: "12:00", status: "free", service: "Klassisk massage 45 min", price: "690 kr" },
      { time: "14:00", status: "busy", service: "Naprapatbehandling", price: "850 kr" },
      { time: "15:30", status: "free", service: "Avslappningsmassage", price: "750 kr" },
      { time: "17:00", status: "deal", service: "Återbud: Massage 45 min", price: "345 kr (-50 %)" }
    ],
    imorgon: [
      { time: "09:30", status: "free", service: "Klassisk massage 45 min", price: "690 kr" },
      { time: "11:00", status: "busy", service: "Naprapatbehandling", price: "850 kr" },
      { time: "13:00", status: "deal", service: "Sista minuten: Massage 30 min", price: "275 kr (-50 %)" },
      { time: "14:30", status: "free", service: "Idrottsmassage 60 min", price: "890 kr" },
      { time: "16:00", status: "free", service: "Rygg & nacke 30 min", price: "550 kr" },
      { time: "17:30", status: "busy", service: "Massage 60 min", price: "890 kr" }
    ]
  },
  bilverkstad: {
    idag: [
      { time: "08:00", status: "busy", service: "Årsservice", price: "3 490 kr" },
      { time: "10:00", status: "free", service: "Felsökning OBD", price: "890 kr" },
      { time: "12:30", status: "deal", service: "Sista minuten: Däckskifte", price: "245 kr (-50 %)" },
      { time: "14:00", status: "busy", service: "Bromsbyte", price: "2 800 kr" },
      { time: "15:30", status: "free", service: "AC-kontroll", price: "995 kr" },
      { time: "16:30", status: "deal", service: "Återbud: Oljebyte", price: "745 kr (-50 %)" }
    ],
    imorgon: [
      { time: "08:00", status: "free", service: "Däckskifte", price: "490 kr" },
      { time: "09:30", status: "busy", service: "Kamremsbyte", price: "6 500 kr" },
      { time: "11:30", status: "free", service: "Felsökning", price: "890 kr" },
      { time: "13:30", status: "deal", service: "Sista minuten: Hjulinställning", price: "595 kr (-50 %)" },
      { time: "15:00", status: "free", service: "Årsservice", price: "3 490 kr" },
      { time: "16:00", status: "busy", service: "Besiktningskontroll", price: "690 kr" }
    ]
  }
};

interface ChatMsg {
  role: "bot" | "user";
  text: string;
}

const STATUS_LABEL: Record<DemoSlot["status"], string> = {
  free: "Ledig",
  busy: "Upptagen",
  deal: "Sista minuten"
};

function buildDemoReply(text: string, slots: DemoSlot[]): string {
  const q = text.toLowerCase();
  if (q.includes("sista") || q.includes("rabatt") || q.includes("50") || q.includes("återbud")) {
    const deals = slots.filter((s) => s.status === "deal").length;
    return deals > 0
      ? `Just nu finns ${deals} sista minuten-tider med -50 % i kalendern, markerade i gult. I er egen agent läggs avbokade tider ut automatiskt.`
      : "Just nu finns inga sista minuten-tider i den här kalendern. När en tid blir ledig läggs den ut automatiskt i er egen agent.";
  }
  if (q.includes("gdpr") || q.includes("säker") || q.includes("nis2")) {
    return "Vi samlar bara in det som behövs för att boka och svara. Vi går gärna igenom hur era kunders uppgifter hanteras på en genomgång.";
  }
  if (q.includes("pris") || q.includes("kost") || q.includes("paket")) {
    return "Våra paket börjar från 2 900 kr/mån (Start) och 5 900 kr/mån (Pro) med kalenderkoppling och sista minuten-flöden.";
  }
  if (q.includes("boka") || q.includes("tid") || q.includes("kalender") || q.includes("mail")) {
    return "Kunden skriver i chatten, mailar eller klickar på en ledig tid. AI-agenten kollar er kalender i realtid och skickar bekräftelse.";
  }
  return "Bra fråga! I en skarp AI-agent tränar vårt team svaren på era tjänster, priser och regler. Boka gärna en kostnadsfri genomgång längre ned!";
}

export function DemoSection() {
  const [industry, setIndustry] = useState<IndustryKey>("tandlakare");
  const [day, setDay] = useState<DayKey>("idag");
  const [slots, setSlots] = useState<DemoSlot[]>(FALLBACK_SLOTS.tandlakare.idag);
  const [apiMode, setApiMode] = useState<"live" | "local">("local");
  const [feedback, setFeedback] = useState<string>("");

  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "bot",
      text: "Hej! Jag är en interaktiv demo av AI-agenten som NordicAgent Studio bygger åt företag. Testa att klicka på en tid eller ställ en fråga!"
    }
  ]);

  useEffect(() => {
    let active = true;
    setFeedback("");
    fetchDemoSlots(industry, day)
      .then((data) => {
        if (!active) return;
        setSlots(data);
        setApiMode("live");
      })
      .catch(() => {
        if (!active) return;
        setSlots(FALLBACK_SLOTS[industry][day]);
        setApiMode("local");
      });
    return () => {
      active = false;
    };
  }, [industry, day]);

  async function handleSlotClick(slot: DemoSlot) {
    if (slot.status === "busy") return;
    try {
      const res = await simulateDemoBooking(industry, day, slot.time);
      setFeedback(res.message);
    } catch {
      setFeedback(
        `Demo: AI-agenten skulle nu reservera ${slot.time} (${day}) – ${slot.service} (${slot.price}) och skicka bekräftelse.`
      );
    }
  }

  function sendChat(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "bot", text: buildDemoReply(trimmed, slots) }
    ]);
  }

  function handleChatSubmit(e: FormEvent) {
    e.preventDefault();
    sendChat(chatInput);
    setChatInput("");
  }

  return (
    <section className="section" id="demo">
      <div className="container">
        <div className="section-header">
          <h2>Prova kalendern och chatten</h2>
          <p>
            Så här kan en kund se lediga tider och få svar direkt. Tider och priser nedan är exempel.{" "}
            {import.meta.env.DEV && (
              <span className="api-pill">{apiMode === "live" ? "Dev: live-API" : "Dev: lokal demo-data"}</span>
            )}
          </p>
        </div>

        <div className="demo-shell">
          <div className="card">
            <div className="demo-controls">
              <div className="tab-group" role="group" aria-label="Välj bransch">
                {(
                  [
                    ["tandlakare", "Tandläkare"],
                    ["frisor", "Frisör"],
                    ["massage", "Massage"],
                    ["bilverkstad", "Bilverkstad"]
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={industry === key}
                    className={`tab-btn ${industry === key ? "active" : ""}`}
                    onClick={() => setIndustry(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="tab-group" role="group" aria-label="Välj dag">
                <button
                  type="button"
                  aria-pressed={day === "idag"}
                  className={`tab-btn ${day === "idag" ? "active" : ""}`}
                  onClick={() => setDay("idag")}
                >
                  Idag
                </button>
                <button
                  type="button"
                  aria-pressed={day === "imorgon"}
                  className={`tab-btn ${day === "imorgon" ? "active" : ""}`}
                  onClick={() => setDay("imorgon")}
                >
                  Imorgon
                </button>
              </div>
            </div>

            <div className="legend">
              <span>
                <span className="legend-dot" data-color="free" />
                Ledig tid
              </span>
              <span>
                <span className="legend-dot" data-color="busy" />
                Upptagen
              </span>
              <span>
                <span className="legend-dot" data-color="deal" />
                Sista minuten (-50 %)
              </span>
            </div>

            <div className="slots-grid">
              {slots.map((slot) => (
                <button
                  key={`${slot.time}-${slot.service}`}
                  type="button"
                  disabled={slot.status === "busy"}
                  className={`slot-btn slot-${slot.status}`}
                  onClick={() => handleSlotClick(slot)}
                >
                  <span className="slot-time">{slot.time}</span>
                  <span className="slot-status">{STATUS_LABEL[slot.status]}</span>
                  {slot.status !== "busy" && (
                    <span className="slot-meta">{`${slot.service}, ${slot.price}`}</span>
                  )}
                </button>
              ))}
            </div>

            {feedback && (
              <div className="demo-feedback visible" role="status">
                {feedback}
              </div>
            )}
          </div>

          <div className="card chat-box">
            <h3>Förhandsgranskning: AI-kundchatt</h3>
            <p>Klicka på en snabbfråga eller skriv en egen testfråga:</p>

            <div className="chat-log" aria-live="polite">
              {messages.map((m, idx) => (
                <div key={idx} className={`chat-msg chat-${m.role}`}>
                  {m.text}
                </div>
              ))}
            </div>

            <div className="chat-prompts">
              <button type="button" className="prompt-chip" onClick={() => sendChat("Sista minuten idag?")}>
                Sista minuten idag?
              </button>
              <button type="button" className="prompt-chip" onClick={() => sendChat("Hur bokar en kund?")}>
                Hur bokar en kund?
              </button>
              <button type="button" className="prompt-chip" onClick={() => sendChat("Hur hanteras GDPR?")}>
                GDPR &amp; Säkerhet?
              </button>
            </div>

            <form className="chat-form" onSubmit={handleChatSubmit}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Skriv en testfråga, t.ex. pris, tid eller GDPR"
                aria-label="Skriv en testfråga till AI-demon"
                maxLength={160}
              />
              <button className="btn btn-primary btn-sm" type="submit">
                Skicka
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
