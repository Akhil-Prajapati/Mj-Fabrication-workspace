package com.mjfabrication.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import com.mjfabrication.enums.CustomerType;
import lombok.Data;
import java.util.List;

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
    private String stateCode; // Now expects numeric string, e.g. "22" for Chhattisgarh

    private Boolean isActive = true;

     @Valid // Add this annotation for nested validation
    private List<CustomerAddressRequest> addresses;

    @NotBlank
    private String companyName;
}
