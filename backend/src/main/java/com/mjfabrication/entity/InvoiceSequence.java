package com.mjfabrication.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "invoice_sequences")
@Data
public class InvoiceSequence {
    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "prefix", nullable = false, length = 10)
    private String prefix;

    @Column(name = "financial_year", nullable = false, length = 10)
    private String financialYear;

    @Column(name = "current_number", nullable = false)
    private Integer currentNumber;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
