package com.mjfabrication.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;
import java.util.UUID;

@Entity
@Table(name = "customer_addresses")
@Data
public class CustomerAddress {
    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "pincode", nullable = false, length = 10)
    private String pincode;

    @Column(name = "is_default", nullable = false)
    private Boolean isDefault;

    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Enumerated(EnumType.STRING)
    @Column(name = "address_type", nullable = false, length = 20)
    private com.mjfabrication.enums.AddressType addressType;

    @Column(name = "address_line_1", nullable = false)
    private String addressLine1;

    @Column(name = "address_line_2")
    private String addressLine2;

    @Column(name = "state", nullable = false, length = 100)
    private String state;
}
