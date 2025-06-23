package com.mjfabrication.service;

import com.mjfabrication.payload.request.CustomerRequest;
import com.mjfabrication.payload.response.CustomerResponse;
import java.util.List;
import java.util.UUID;

public interface CustomerService {
    List<CustomerResponse> getAll();
    CustomerResponse getById(UUID id);
    CustomerResponse create(CustomerRequest request);
    CustomerResponse update(UUID id, CustomerRequest request);
    void delete(UUID id);
}
