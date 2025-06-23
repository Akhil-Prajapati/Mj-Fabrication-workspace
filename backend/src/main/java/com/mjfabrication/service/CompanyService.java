package com.mjfabrication.service;

import com.mjfabrication.payload.request.CompanyRequest;
import com.mjfabrication.payload.response.CompanyResponse;
import java.util.List;
import java.util.UUID;

public interface CompanyService {
    List<CompanyResponse> getAll();
    CompanyResponse getById(UUID id);
    CompanyResponse create(CompanyRequest request);
    CompanyResponse update(UUID id, CompanyRequest request);
    void delete(UUID id);
}
