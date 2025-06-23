package com.mjfabrication.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StateRequest {
    @NotBlank
    private String stateCode;
    @NotBlank
    private String stateName;
}
