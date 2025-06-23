package com.mjfabrication.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class TaxRateRequest {
    @NotNull
    private BigDecimal gstRate;
    @NotNull
    private BigDecimal taxPercentage;
    private String description;
    @NotNull
    private Boolean isActive;
}
