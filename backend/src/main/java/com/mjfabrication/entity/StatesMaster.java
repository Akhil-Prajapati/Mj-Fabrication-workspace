package com.mjfabrication.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;
import java.util.UUID;

@Entity
@Table(name = "states_master")
@Data
public class StatesMaster {
    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "state_name", nullable = false)
    private String stateName;

    @Column(name = "state_code", nullable = false, length = 2)
    private String stateCode;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;
}
