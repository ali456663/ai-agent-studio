package se.nordicagent.studio.dto;

import java.time.Instant;

public record LeadResponse(
    Long id,
    String company,
    String status,
    Instant createdAt
) {
}
