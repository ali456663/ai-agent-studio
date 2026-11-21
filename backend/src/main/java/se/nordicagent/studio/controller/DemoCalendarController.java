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
            "message", "API-bekräftelse (" + request.industry() + "): AI-agenten reserverade "
                + request.time() + " (" + request.day() + ") och förberedde e-post/SMS-bekräftelse."
        );
    }
}
