package com.mjfabrication.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "companies", uniqueConstraints = @UniqueConstraint(columnNames = "gst_number"))
@Data
public class Company {
    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column
    private String email;

    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "ifsc_code", length = 15)
    private String ifscCode;

    @Column(name = "gst_number", length = 15, unique = true)
    private String gstNumber;

    @Column(name = "account_number", length = 50)
    private String accountNumber;

    @Column(name = "phone", length = 15)
    private String phone;

    @Column(columnDefinition = "text")
    private String address;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
