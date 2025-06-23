package com.mjfabrication.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class PaymentRequest {
    @NotNull
    private BigDecimal amount;
    @NotBlank
    private String invoiceId;
    @NotBlank
    private String paymentMethod;
    private String referenceNumber;
    private String notes;
    @NotBlank
    private String paymentDate;
}
