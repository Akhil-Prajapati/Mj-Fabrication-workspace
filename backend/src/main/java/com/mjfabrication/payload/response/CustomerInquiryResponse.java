package com.mjfabrication.payload.response;

import lombok.Data;
import java.util.UUID;

@Data
public class CustomerInquiryResponse {
    private UUID id;
    private UUID customerId;
    private String inquiryType;
    private String message;
    private String contactPerson;
    private String contactEmail;
    private String contactPhone;
    private String status;
    private String createdAt;
    private String updatedAt;
}
