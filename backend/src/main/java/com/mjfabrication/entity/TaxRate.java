package com.mjfabrication.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "tax_rates")
@Data
public class TaxRate {
    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "tax_rate_id")
    private UUID taxRateId;

    @Column(name = "gst_rate", nullable = false)
    private BigDecimal gstRate;

    @Column(name = "tax_percentage", nullable = false)
    private BigDecimal taxPercentage;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;
}
