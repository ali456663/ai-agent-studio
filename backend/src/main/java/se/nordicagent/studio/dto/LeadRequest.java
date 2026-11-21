package se.nordicagent.studio.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.Instant;

public record LeadRequest(
    @NotBlank(message = "Namn är obligatoriskt")
    @Size(max = 120)
    String name,

    @NotBlank(message = "E-post är obligatoriskt")
    @Email(message = "Ange en giltig e-postadress")
    @Size(max = 180)
    String email,

    @NotBlank(message = "Företag är obligatoriskt")
    @Size(max = 150)
    String company,

    @NotBlank(message = "Bransch är obligatoriskt")
    @Size(max = 80)
    String industry,

    @Size(max = 1000)
    String message,

    @AssertTrue(message = "GDPR-samtycke krävs")
    boolean gdprConsent,

    @NotBlank(message = "Samtyckesversion krävs")
    @Size(max = 32)
    String consentVersion,

    @NotNull(message = "Tidpunkt för samtycke krävs")
    Instant consentAt
) {
}
