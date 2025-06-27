package com.mjfabrication.payload.response;

import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
public class InvoiceItemResponse {
    private UUID id;
    private String itemId;
    private BigDecimal quantity;
    private BigDecimal unitPrice;
    private BigDecimal gstRate;
    private BigDecimal totalPrice;
    private String hsnCode;
    private String description;
}
