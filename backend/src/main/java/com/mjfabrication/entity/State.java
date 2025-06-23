package com.mjfabrication.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "states")
@Data
public class State {
    @Id
    @Column(name = "state_code", length = 2)
    private String stateCode;

    @Column(name = "state_name", nullable = false, length = 100)
    private String stateName;
}
