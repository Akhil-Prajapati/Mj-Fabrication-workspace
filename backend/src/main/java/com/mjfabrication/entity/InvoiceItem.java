package com.mjfabrication.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "invoice_items")
@Data
public class InvoiceItem {
    @Id
    @UuidGenerator
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;

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

    @Column(name = "hsn_code", length = 8)
    private String hsnCode;

    @Column(columnDefinition = "text")
    private String description;
}
