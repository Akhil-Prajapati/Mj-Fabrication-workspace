package com.mjfabrication.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "customer_inquiries")
@Data
public class CustomerInquiry {
    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @Column
    private String email;

    @Column(name = "phone", length = 30)
    private String phone;

    @Column(name = "service_type")
    private String serviceType;

    @Column(name = "message", columnDefinition = "text")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private com.mjfabrication.enums.InquiryStatus status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "custom_project_type")
    private String customProjectType;

    @Column(name = "budget_range")
    private String budgetRange;
}
