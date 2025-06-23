package com.mjfabrication.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "unit_of_measurement", nullable = false, length = 50)
    private String unitOfMeasurement;

    @Column(name = "base_price", nullable = false)
    private BigDecimal basePrice;

    @Column(name = "gst_rate", nullable = false)
    private BigDecimal gstRate;

    @Column(name = "low_stock_alert", nullable = false)
    private Integer lowStockAlert;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @Column(columnDefinition = "text")
    private String description;

    @Column(name = "hsn_code", length = 8)
    private String hsnCode;

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
