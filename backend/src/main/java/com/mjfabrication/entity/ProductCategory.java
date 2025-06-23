package com.mjfabrication.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "product_categories")
@Data
public class ProductCategory {
    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "category_name", nullable = false)
    private String categoryName;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @Column(columnDefinition = "text")
    private String description;
}
