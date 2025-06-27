package com.mjfabrication.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class InvoiceRequest {
    @NotNull
    private BigDecimal subtotal;
    @NotNull
    private BigDecimal cgstAmount;
    @NotNull
    private BigDecimal sgstAmount;
    @NotNull
    private BigDecimal igstAmount;
    @NotNull
    private BigDecimal totalAmount;
    @NotBlank
    private String customerId;
    private String quotationId;
    @NotBlank
    private String invoiceNumber;
    @NotNull
    private LocalDate invoiceDate;
    @NotNull
    private LocalDate dueDate;
    private String paymentTerms;
    private String status;
    @NotNull
    private BigDecimal adjustment;
    private String notes;
    private List<InvoiceItemRequest> items;
}
