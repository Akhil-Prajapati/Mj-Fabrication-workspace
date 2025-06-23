package com.mjfabrication.service;

import com.mjfabrication.payload.request.InventoryItemRequest;
import com.mjfabrication.payload.response.InventoryItemResponse;
import java.util.List;

public interface InventoryItemService {
    List<InventoryItemResponse> getAll();
    InventoryItemResponse getById(String itemId);
    InventoryItemResponse create(InventoryItemRequest request);
    InventoryItemResponse update(String itemId, InventoryItemRequest request);
    void delete(String itemId);
}
