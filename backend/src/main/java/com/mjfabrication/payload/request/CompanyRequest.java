package com.mjfabrication.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CompanyRequest {
    @NotBlank
    private String companyName;
    private String email;
    private String bankName;
    private String ifscCode;
    private String gstNumber;
    private String accountNumber;
    private String phone;
    private String address;
}
