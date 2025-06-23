package com.mjfabrication.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "payments")
@Data
public class Payment {
    @Id
    @UuidGenerator
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;

    @Column(name = "payment_date", nullable = false)
    private LocalDate paymentDate;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "reference_number")
    private String referenceNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private com.mjfabrication.enums.PaymentMethod paymentMethod;

    @Column(name = "notes", columnDefinition = "text")
    private String notes;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
