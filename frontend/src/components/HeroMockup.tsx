export function HeroMockup() {
  return (
    <div className="mock" aria-label="Exempel på kalender och AI-chatt">
      <div className="mock-head">
        <strong>Dagens schema (exempel)</strong>
        <span>Tandkliniken Centrum</span>
      </div>

      <ul className="mock-slots">
        <li className="mock-slot slot-busy">
          <span className="slot-time">09:00</span>
          <span>Upptagen · Undersökning</span>
        </li>
        <li className="mock-slot slot-free">
          <span className="slot-time">10:30</span>
          <span>Ledig · Basundersökning (990 kr)</span>
        </li>
        <li className="mock-slot slot-deal">
          <span className="slot-time">13:00</span>
          <span>Sista minuten (-50 %) · Tandhygienist (495 kr)</span>
        </li>
      </ul>

      <div className="mock-chat">
        <p className="chat-msg chat-user">Hej, har ni någon ledig tid i eftermiddag?</p>
        <p className="chat-msg chat-bot">
          Ja! Kl. 13:00 fick vi precis ett återbud med 50 % rabatt (495 kr). Vill du att jag bokar in dig?
        </p>
      </div>
    </div>
  );
}
