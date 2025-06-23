package com.mjfabrication.service;

import com.mjfabrication.payload.request.TaxRateRequest;
import com.mjfabrication.payload.response.TaxRateResponse;
import java.util.List;
import java.util.UUID;

public interface TaxRateService {
    List<TaxRateResponse> getAll();
    TaxRateResponse getById(UUID id);
    TaxRateResponse create(TaxRateRequest request);
    TaxRateResponse update(UUID id, TaxRateRequest request);
    void delete(UUID id);
}
