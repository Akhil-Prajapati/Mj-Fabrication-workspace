package com.mjfabrication.service;

import com.mjfabrication.payload.request.ProductRequest;
import com.mjfabrication.payload.response.ProductResponse;
import java.util.List;
import java.util.UUID;

public interface ProductService {
    List<ProductResponse> getAll();
    ProductResponse getById(UUID id);
    ProductResponse create(ProductRequest request);
    ProductResponse update(UUID id, ProductRequest request);
    void delete(UUID id);
}
