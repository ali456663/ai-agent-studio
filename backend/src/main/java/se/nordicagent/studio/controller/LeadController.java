package se.nordicagent.studio.controller;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import se.nordicagent.studio.dto.LeadRequest;
import se.nordicagent.studio.dto.LeadResponse;
import se.nordicagent.studio.model.Lead;
import se.nordicagent.studio.service.LeadService;

@RestController
@RequestMapping("/api")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @PostMapping("/leads")
    @ResponseStatus(HttpStatus.CREATED)
    public LeadResponse submitLead(@Valid @RequestBody LeadRequest request) {
        return leadService.createLead(request);
    }

    @GetMapping("/admin/leads")
    public List<Lead> listLeads() {
        return leadService.findAll();
    }
}
