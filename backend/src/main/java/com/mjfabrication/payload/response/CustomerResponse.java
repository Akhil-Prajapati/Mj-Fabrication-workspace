package com.mjfabrication.payload.response;

import com.mjfabrication.enums.CustomerType;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class CustomerResponse {
    private UUID id;
    private String customerName;
    private String email;
    private String phone;
    private CustomerType customerType;
    private String gstNumber;
    private String stateCode;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
