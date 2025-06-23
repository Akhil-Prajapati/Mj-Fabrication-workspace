package com.mjfabrication.service;

import com.mjfabrication.payload.request.PaymentRequest;
import com.mjfabrication.payload.response.PaymentResponse;
import java.util.List;
import java.util.UUID;

public interface PaymentService {
    List<PaymentResponse> getAll();
    PaymentResponse getById(UUID id);
    PaymentResponse create(PaymentRequest request);
    PaymentResponse update(UUID id, PaymentRequest request);
    void delete(UUID id);
}
