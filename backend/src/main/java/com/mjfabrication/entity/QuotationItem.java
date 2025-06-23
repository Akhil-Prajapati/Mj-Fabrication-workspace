package com.mjfabrication.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "quotation_items")
@Data
public class QuotationItem {
    @Id
    @UuidGenerator
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "quotation_id", nullable = false)
    private Quotation quotation;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "quantity", nullable = false)
    private BigDecimal quantity;

    @Column(name = "unit_price", nullable = false)
    private BigDecimal unitPrice;

    @Column(name = "gst_rate", nullable = false)
    private BigDecimal gstRate;

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice;

    @Column(columnDefinition = "text")
    private String description;
}
