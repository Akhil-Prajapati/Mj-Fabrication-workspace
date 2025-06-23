package com.mjfabrication.payload.response;

import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
public class TaxRateResponse {
    private UUID id;
    private BigDecimal gstRate;
    private BigDecimal taxPercentage;
    private String description;
    private Boolean isActive;
}
