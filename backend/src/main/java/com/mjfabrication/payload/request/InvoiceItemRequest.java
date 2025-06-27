package com.mjfabrication.payload.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class InvoiceItemRequest {
    @NotNull
    private String itemId;
    @NotNull
    private BigDecimal quantity;
    @NotNull
    private BigDecimal unitPrice;
    @NotNull
    private BigDecimal gstRate;
    @NotNull
    private BigDecimal totalPrice;
    private String hsnCode;
    private String description;
}
