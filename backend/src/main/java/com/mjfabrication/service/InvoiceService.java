package com.mjfabrication.service;

import com.mjfabrication.payload.request.InvoiceRequest;
import com.mjfabrication.payload.response.DashboardResponse;
import com.mjfabrication.payload.response.InvoiceResponse;
import java.util.List;
import java.util.UUID;

public interface InvoiceService {
    List<InvoiceResponse> getAll();
    InvoiceResponse getById(UUID id);
    InvoiceResponse create(InvoiceRequest request);
    InvoiceResponse update(UUID id, InvoiceRequest request);
    void delete(UUID id);
    DashboardResponse getDashboardStats(int month, int year);
}
