package com.mjfabrication.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class QuotationRequest {
    @NotBlank
    private String customerId;
    @NotBlank
    private String quotationNumber;
    @NotBlank
    private String quotationDate;
    @NotBlank
    private String validUntil;
    private String subtotal;
    private String totalTax;
    private String totalAmount;
    private String termsConditions;
    private String status;
}
