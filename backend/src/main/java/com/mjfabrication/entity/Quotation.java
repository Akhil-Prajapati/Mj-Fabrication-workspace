package com.mjfabrication.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "quotations", uniqueConstraints = @UniqueConstraint(columnNames = "quotation_number"))
@Data
public class Quotation {
    @Id
    @UuidGenerator
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(name = "quotation_number", nullable = false, unique = true)
    private String quotationNumber;

    @Column(name = "quotation_date", nullable = false)
    private java.time.LocalDate quotationDate;

    @Column(name = "valid_until", nullable = false)
    private java.time.LocalDate validUntil;

    @Column(name = "subtotal", nullable = false)
    private java.math.BigDecimal subtotal;

    @Column(name = "total_tax", nullable = false)
    private java.math.BigDecimal totalTax;

    @Column(name = "total_amount", nullable = false)
    private java.math.BigDecimal totalAmount;

    @Column(name = "terms_conditions", columnDefinition = "text")
    private String termsConditions;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private com.mjfabrication.enums.QuotationStatus status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
