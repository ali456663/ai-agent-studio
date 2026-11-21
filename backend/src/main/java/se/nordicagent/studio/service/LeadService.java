package se.nordicagent.studio.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import se.nordicagent.studio.dto.LeadRequest;
import se.nordicagent.studio.dto.LeadResponse;
import se.nordicagent.studio.model.Lead;
import se.nordicagent.studio.repository.LeadRepository;

@Service
public class LeadService {

    private final LeadRepository leadRepository;

    public LeadService(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    @Transactional
    public LeadResponse createLead(LeadRequest req) {
        Lead lead = new Lead();
        lead.setName(req.name().trim());
        lead.setEmail(req.email().trim().toLowerCase());
        lead.setCompany(req.company().trim());
        lead.setIndustry(req.industry().trim());
        lead.setMessage(req.message() == null ? "" : req.message().trim());
        lead.setGdprConsent(req.gdprConsent());

        Lead saved = leadRepository.save(lead);
        return new LeadResponse(saved.getId(), saved.getCompany(), "RECEIVED", saved.getCreatedAt());
    }

    @Transactional(readOnly = true)
    public List<Lead> findAll() {
        return leadRepository.findAll();
    }
}
