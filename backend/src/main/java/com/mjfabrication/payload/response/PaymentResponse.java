package com.mjfabrication.payload.response;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
public class PaymentResponse {
    private UUID id;
    private BigDecimal amount;
    private String paymentMethod;
    private String referenceNumber;
    private String notes;
    private LocalDate paymentDate;
    private UUID invoiceId;
}
