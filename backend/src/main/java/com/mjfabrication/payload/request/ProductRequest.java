package com.mjfabrication.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductRequest {
    @NotBlank
    private String unitOfMeasurement;
    @NotNull
    private java.math.BigDecimal basePrice;
    @NotNull
    private java.math.BigDecimal gstRate;
    @NotNull
    private Integer lowStockAlert;
    @NotNull
    private Boolean isActive;
    private String description;
    private String hsnCode;
    @NotNull
    private Integer stockQuantity;
    @NotBlank
    private String categoryId;
}
