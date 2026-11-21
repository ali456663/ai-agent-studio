package se.nordicagent.studio.dto;

import jakarta.validation.constraints.NotBlank;

public record DemoBookRequest(
    @NotBlank String industry,
    @NotBlank String day,
    @NotBlank String time
) {
}
