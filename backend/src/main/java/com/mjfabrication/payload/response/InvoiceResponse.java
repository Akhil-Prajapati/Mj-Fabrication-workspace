package com.mjfabrication.payload.response;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class InvoiceResponse {
    private UUID id;
    private String invoiceNumber;
    private LocalDate invoiceDate;
    private LocalDate dueDate;
    private BigDecimal subtotal;
    private BigDecimal cgstAmount;
    private BigDecimal sgstAmount;
    private BigDecimal igstAmount;
    private BigDecimal totalAmount;
    private String paymentTerms;
    private String status;
    private UUID customerId;
    private UUID quotationId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private BigDecimal adjustment;
    private String notes;
    private List<InvoiceItemResponse> items;
}
