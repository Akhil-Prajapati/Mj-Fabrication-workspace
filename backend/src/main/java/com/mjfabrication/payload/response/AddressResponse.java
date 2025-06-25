package com.mjfabrication.payload.response;

import lombok.Data;

@Data
public class AddressResponse {
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String pincode;
    private Boolean isDefault;
    private String addressType; // "BILLING" | "SHIPPING" | "OTHER"
}
