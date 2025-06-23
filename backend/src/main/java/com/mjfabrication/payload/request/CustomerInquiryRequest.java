package com.mjfabrication.payload.request;

import lombok.Data;
import java.util.UUID;

@Data
public class CustomerInquiryRequest {
    private UUID customerId;
    private String inquiryType;
    private String message;
    private String contactPerson;
    private String contactEmail;
    private String contactPhone;
    private String status;
}
