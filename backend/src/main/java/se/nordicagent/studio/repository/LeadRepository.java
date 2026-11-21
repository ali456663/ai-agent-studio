package se.nordicagent.studio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.nordicagent.studio.model.Lead;

public interface LeadRepository extends JpaRepository<Lead, Long> {
}
