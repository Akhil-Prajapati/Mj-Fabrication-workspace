package com.mjfabrication.service;

import com.mjfabrication.payload.request.CustomerInquiryRequest;
import com.mjfabrication.payload.response.CustomerInquiryResponse;
import java.util.List;
import java.util.UUID;

public interface CustomerInquiryService {
    List<CustomerInquiryResponse> getAll();
    CustomerInquiryResponse getById(UUID id);
    CustomerInquiryResponse create(CustomerInquiryRequest request);
    CustomerInquiryResponse update(UUID id, CustomerInquiryRequest request);
    void delete(UUID id);
}
