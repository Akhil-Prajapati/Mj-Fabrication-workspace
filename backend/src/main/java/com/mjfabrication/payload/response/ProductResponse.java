package com.mjfabrication.payload.response;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ProductResponse {
    private UUID id;
    private String unitOfMeasurement;
    private BigDecimal basePrice;
    private BigDecimal gstRate;
    private Integer lowStockAlert;
    private Boolean isActive;
    private String description;
    private String hsnCode;
    private Integer stockQuantity;
    private UUID categoryId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
