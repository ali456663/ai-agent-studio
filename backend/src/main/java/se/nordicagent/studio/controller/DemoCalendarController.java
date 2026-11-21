package se.nordicagent.studio.controller;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import se.nordicagent.studio.dto.DemoBookRequest;
import se.nordicagent.studio.dto.DemoSlotDto;
import se.nordicagent.studio.service.DemoCalendarService;

@RestController
@RequestMapping("/api/demo")
public class DemoCalendarController {

    private final DemoCalendarService demoCalendarService;

    public DemoCalendarController(DemoCalendarService demoCalendarService) {
        this.demoCalendarService = demoCalendarService;
    }

    @GetMapping("/slots")
    public List<DemoSlotDto> getSlots(
        @RequestParam(defaultValue = "tandlakare") String industry,
        @RequestParam(defaultValue = "idag") String day
    ) {
        return demoCalendarService.getSlots(industry, day);
    }

    @PostMapping("/book")
    public Map<String, String> simulateBooking(@Valid @RequestBody DemoBookRequest request) {
        return Map.of(
            "status", "SIMULATED",
            "message", "Demo: AI-agenten reserverade " + request.time() + " (" + request.day()
                + ") och förberedde en automatisk bekräftelse till kunden."
        );
    }

    @PostMapping("/assistant")
    public Map<String, String> askAssistant(@RequestBody Map<String, String> body) {
        String idea = body.getOrDefault("message", "").trim();
        String q = idea.toLowerCase();

        String reply;
        if (q.contains("inköp") || q.contains("leverantör") || q.contains("volvo") || q.contains("försen")) {
            reply = "Med en inköpsagent läser systemet leverantörens förseningsmejl, matchar inköpsordern och visar direkt vilka planerade jobb som påverkas – så inköparen vet exakt vad som kräver åtgärd idag.";
        } else if (q.contains("order") || q.contains("pdf") || q.contains("avvik") || q.contains("beställ")) {
            reply = "Orderagenten läser artikelnummer, antal och datum ur kundens PDF-beställning, jämför mot offerten, skapar ett orderutkast och flaggar rader med avvikande pris för säljaren.";
        } else if (q.contains("offert") || q.contains("anbud") || q.contains("krav")) {
            reply = "Offertagenten går igenom omfattande offertförfrågningar, sammanställer kraven med sidhänvisning och markerar vilka frågor säljteamet behöver klarlägga.";
        } else if (q.contains("dokument") || q.contains("mall") || q.contains("saab") || q.contains("kvalitet")) {
            reply = "Dokument- och kvalitetsagenten söker enbart i dokument som användaren har behörighet till, visar gällande version med källa och samlar bilder/mätvärden inför utredning.";
        } else if (q.contains("service") || q.contains("abb") || q.contains("manual") || q.contains("serienummer")) {
            reply = "Serviceagenten samlar in modell, serienummer och felkod, hittar rätt manualversion och förbereder ett komplett ärende till serviceteknikern redan vid första kontakten.";
        } else if (q.contains("däck") || q.contains("bil") || q.contains("verkstad") || q.contains("arbetsorder") || q.contains("kupé")) {
            reply = "För en bilverkstad kan agenten boka rätt resurser (lyft/mekaniker), kolla däckhotell, sköta väntelista vid återbud, förbereda arbetsorder, hämta kundens godkännande på extraarbete (t.ex. kupéfilter 450 kr) och skicka sms när bilen är klar.";
        } else if (q.contains("tand") || q.contains("klinik") || q.contains("vård")) {
            reply = "För en klinik passar en AI-agent som hanterar bokningar, svarar på vanliga frågor dygnet runt och automatiskt lyfter fram återbud som sista minuten-tider (-50 %) – utan att känsliga journaluppgifter sparas i chatten.";
        } else if (q.contains("frisör") || q.contains("salong") || q.contains("klipp")) {
            reply = "För en salong kan AI-agenten ta emot bokningar medan ni klipper, svara på priser och fylla tomma luckor samma dag med sista minuten-erbjudanden.";
        } else if (q.contains("massage") || q.contains("naprapat") || q.contains("hälsa")) {
            reply = "För massage och friskvård hjälper agenten kunder att hitta rätt behandling, boka direkt i kalendern och skicka påminnelser så färre tider missas.";
        } else if (q.contains("sista") || q.contains("avbok") || q.contains("tomma") || q.contains("50")) {
            reply = "När en kund avbokar känner AI-agenten av luckan och kan direkt erbjuda den till väntelistan eller visa den som sista minuten med t.ex. -50 % rabatt.";
        } else if (q.contains("gdpr") || q.contains("säker") || q.contains("data")) {
            reply = "Vi utgår alltid från dataminimering enligt GDPR, behörighetsstyrning och tydlig mänsklig kontroll där personalen godkänner viktiga beslut.";
        } else if (q.contains("pris") || q.contains("kost") || q.contains("paket")) {
            reply = "Våra paket börjar från 2 900 kr/mån (Start) och 5 900 kr/mån (Pro) samt skräddarsydda företagsflöden efter offert.";
        } else {
            reply = "Spännande idé! Utifrån det du beskriver kan vi bygga en AI-agent som samlar in uppgifter, kontrollerar mot era system och förbereder nästa steg åt er personal. Klicka på \"Ta med min idé till rådgivning\" nedan så går vi igenom ett konkret upplägg!";
        }

        return Map.of("reply", reply);
    }
}
