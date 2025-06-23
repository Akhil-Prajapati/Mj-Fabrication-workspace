package com.mjfabrication.payload.response;

import lombok.Data;
import java.util.UUID;
import java.time.LocalDateTime;

@Data
public class CompanyResponse {
    private UUID id;
    private String companyName;
    private String email;
    private String bankName;
    private String ifscCode;
    private String gstNumber;
    private String accountNumber;
    private String phone;
    private String address;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
