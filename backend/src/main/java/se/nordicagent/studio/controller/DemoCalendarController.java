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
        if (q.contains("tand") || q.contains("klinik") || q.contains("vård")) {
            reply = "För en klinik passar en AI-agent som hanterar bokningar, svarar på vanliga frågor dygnet runt och automatiskt lyfter fram återbud som sista minuten-tider (-50 %) – utan att känsliga journaluppgifter sparas i chatten.";
        } else if (q.contains("frisör") || q.contains("salong") || q.contains("klipp")) {
            reply = "För en salong kan AI-agenten ta emot bokningar medan ni klipper, svara på priser och fylla tomma luckor samma dag med sista minuten-erbjudanden.";
        } else if (q.contains("massage") || q.contains("naprapat") || q.contains("hälsa")) {
            reply = "För massage och friskvård hjälper agenten kunder att hitta rätt behandling, boka direkt i kalendern och skicka påminnelser så färre tider missas.";
        } else if (q.contains("bil") || q.contains("verkstad") || q.contains("däck")) {
            reply = "För en bilverkstad kan AI-agenten boka service och däckskifte, svara på frågor om tider/priser och minska telefonkön under högsäsong.";
        } else if (q.contains("sista") || q.contains("avbok") || q.contains("tomma") || q.contains("50")) {
            reply = "När en kund avbokar känner AI-agenten av luckan och kan direkt visa den som en sista minuten-tid med t.ex. -50 % rabatt så kalendern fylls igen.";
        } else if (q.contains("gdpr") || q.contains("säker") || q.contains("data")) {
            reply = "Vi utgår alltid från dataminimering enligt GDPR och samlar bara in det som behövs för bokning och kontakt. Vi går igenom era exakta krav vid en genomgång.";
        } else if (q.contains("pris") || q.contains("kost") || q.contains("paket")) {
            reply = "Våra paket börjar från 2 900 kr/mån (Start) och 5 900 kr/mån (Pro) med kalenderkoppling, mailsvar och sista minuten-flöden.";
        } else {
            reply = "Spännande idé! Utifrån det du beskriver kan vi kombinera kundchatt, automatisk bokning och mailsvar anpassade efter era tjänster och priser. Klicka på \"Skicka idén till oss\" så går vi igenom ett konkret upplägg!";
        }

        return Map.of("reply", reply);
    }
}
