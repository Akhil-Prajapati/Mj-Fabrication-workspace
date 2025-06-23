package com.mjfabrication.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Email;
import com.mjfabrication.enums.CustomerType;
import lombok.Data;

@Data
public class CustomerRequest {
    @NotBlank
    private String customerName;

    @Email
    private String email;

    @NotBlank
    private String phone;

    @NotNull
    private CustomerType customerType;

    private String gstNumber;

    @NotBlank
    private String stateCode;

    private Boolean isActive = true;
}
