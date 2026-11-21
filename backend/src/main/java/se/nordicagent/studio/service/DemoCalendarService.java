package se.nordicagent.studio.service;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import se.nordicagent.studio.dto.DemoSlotDto;

@Service
public class DemoCalendarService {

    private static final Map<String, Map<String, List<DemoSlotDto>>> SLOTS = Map.of(
        "tandlakare", Map.of(
            "idag", List.of(
                new DemoSlotDto("09:00", "busy", "Undersökning", "990 kr"),
                new DemoSlotDto("10:30", "free", "Basundersökning", "990 kr"),
                new DemoSlotDto("13:00", "deal", "Återbud: Tandhygienist", "495 kr (-50 %)"),
                new DemoSlotDto("14:30", "busy", "Lagning", "1 450 kr"),
                new DemoSlotDto("16:00", "free", "Akuttid / Kontroll", "850 kr"),
                new DemoSlotDto("17:00", "deal", "Sista minuten: Puts & kontroll", "450 kr (-50 %)")
            ),
            "imorgon", List.of(
                new DemoSlotDto("08:30", "free", "Undersökning", "990 kr"),
                new DemoSlotDto("10:00", "busy", "Rotfyllning", "2 900 kr"),
                new DemoSlotDto("11:30", "free", "Tandhygienist", "990 kr"),
                new DemoSlotDto("14:00", "deal", "Sista minuten: Kontroll", "495 kr (-50 %)"),
                new DemoSlotDto("15:30", "busy", "Undersökning", "990 kr"),
                new DemoSlotDto("16:30", "free", "Konsultation", "500 kr")
            )
        ),
        "frisor", Map.of(
            "idag", List.of(
                new DemoSlotDto("09:30", "busy", "Klippning & färg", "1 690 kr"),
                new DemoSlotDto("11:00", "deal", "Sista minuten: Klippning", "345 kr (-50 %)"),
                new DemoSlotDto("13:00", "free", "Klippning 45 min", "690 kr"),
                new DemoSlotDto("14:30", "busy", "Slingor", "1 890 kr"),
                new DemoSlotDto("16:15", "free", "Snabbklipp / Styling", "490 kr"),
                new DemoSlotDto("17:30", "deal", "Återbud: Klippning", "345 kr (-50 %)")
            ),
            "imorgon", List.of(
                new DemoSlotDto("10:00", "free", "Klippning 45 min", "690 kr"),
                new DemoSlotDto("11:30", "free", "Klippning & skägg", "790 kr"),
                new DemoSlotDto("13:30", "busy", "Färgbehandling", "1 790 kr"),
                new DemoSlotDto("15:00", "deal", "Sista minuten: Styling", "245 kr (-50 %)"),
                new DemoSlotDto("16:30", "busy", "Klippning", "690 kr"),
                new DemoSlotDto("17:45", "free", "Klippning", "690 kr")
            )
        ),
        "massage", Map.of(
            "idag", List.of(
                new DemoSlotDto("09:00", "busy", "Idrottsmassage 60 min", "890 kr"),
                new DemoSlotDto("10:30", "deal", "Sista minuten: Rygg & nacke", "345 kr (-50 %)"),
                new DemoSlotDto("12:00", "free", "Klassisk massage 45 min", "690 kr"),
                new DemoSlotDto("14:00", "busy", "Naprapatbehandling", "850 kr"),
                new DemoSlotDto("15:30", "free", "Avslappningsmassage", "750 kr"),
                new DemoSlotDto("17:00", "deal", "Återbud: Massage 45 min", "345 kr (-50 %)")
            ),
            "imorgon", List.of(
                new DemoSlotDto("09:30", "free", "Klassisk massage 45 min", "690 kr"),
                new DemoSlotDto("11:00", "busy", "Naprapatbehandling", "850 kr"),
                new DemoSlotDto("13:00", "deal", "Sista minuten: Massage 30 min", "275 kr (-50 %)"),
                new DemoSlotDto("14:30", "free", "Idrottsmassage 60 min", "890 kr"),
                new DemoSlotDto("16:00", "free", "Rygg & nacke 30 min", "550 kr"),
                new DemoSlotDto("17:30", "busy", "Massage 60 min", "890 kr")
            )
        ),
        "bilverkstad", Map.of(
            "idag", List.of(
                new DemoSlotDto("08:00", "busy", "Årsservice", "3 490 kr"),
                new DemoSlotDto("10:00", "free", "Felsökning OBD", "890 kr"),
                new DemoSlotDto("12:30", "deal", "Sista minuten: Däckskifte", "245 kr (-50 %)"),
                new DemoSlotDto("14:00", "busy", "Bromsbyte", "2 800 kr"),
                new DemoSlotDto("15:30", "free", "AC-kontroll", "995 kr"),
                new DemoSlotDto("16:30", "deal", "Återbud: Oljebyte", "745 kr (-50 %)")
            ),
            "imorgon", List.of(
                new DemoSlotDto("08:00", "free", "Däckskifte", "490 kr"),
                new DemoSlotDto("09:30", "busy", "Kamremsbyte", "6 500 kr"),
                new DemoSlotDto("11:30", "free", "Felsökning", "890 kr"),
                new DemoSlotDto("13:30", "deal", "Sista minuten: Hjulinställning", "595 kr (-50 %)"),
                new DemoSlotDto("15:00", "free", "Årsservice", "3 490 kr"),
                new DemoSlotDto("16:00", "busy", "Besiktningskontroll", "690 kr")
            )
        )
    );

    public List<DemoSlotDto> getSlots(String industry, String day) {
        Map<String, List<DemoSlotDto>> byDay = SLOTS.getOrDefault(industry, SLOTS.get("tandlakare"));
        return byDay.getOrDefault(day, byDay.get("idag"));
    }
}
