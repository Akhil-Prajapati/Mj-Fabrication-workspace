package com.mjfabrication.payload.request;

import com.mjfabrication.enums.AddressType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CustomerAddressRequest {
    @NotBlank
    private String addressLine1;
    private String addressLine2;
    @NotBlank
    private String city;
    @NotBlank
    private String state;
    @NotBlank
    private String pincode;
    @NotNull
    private Boolean isDefault;
    @NotNull
    private AddressType addressType;
}
