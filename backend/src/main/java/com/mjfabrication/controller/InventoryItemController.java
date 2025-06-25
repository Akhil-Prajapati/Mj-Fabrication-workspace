package com.mjfabrication.controller;

import lombok.RequiredArgsConstructor;
import com.mjfabrication.payload.request.InventoryItemRequest;
import com.mjfabrication.payload.response.InventoryItemResponse;
import com.mjfabrication.service.InventoryItemService;
import com.mjfabrication.util.DecryptionUtilService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/inventory")
@RequiredArgsConstructor
public class InventoryItemController {
    private final InventoryItemService inventoryItemService;
    private final DecryptionUtilService decryptionUtilService;

    @GetMapping
    public List<InventoryItemResponse> getAll() {
        return inventoryItemService.getAll();
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<InventoryItemResponse> getById(@PathVariable String itemId) {
        return ResponseEntity.ok(inventoryItemService.getById(itemId));
    }

    @PostMapping
    public ResponseEntity<InventoryItemResponse> create(@RequestBody Map<String, Object> requestMap) {
        requestMap = decryptionUtilService.decryptIfNeeded(requestMap);
        InventoryItemRequest request = mapToInventoryItemRequest(requestMap);
        return ResponseEntity.ok(inventoryItemService.create(request));
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<InventoryItemResponse> update(@PathVariable String itemId, @RequestBody Map<String, Object> requestMap) {
        requestMap = decryptionUtilService.decryptIfNeeded(requestMap);
        InventoryItemRequest request = mapToInventoryItemRequest(requestMap);
        return ResponseEntity.ok(inventoryItemService.update(itemId, request));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> delete(@PathVariable String itemId) {
        inventoryItemService.delete(itemId);
        return ResponseEntity.noContent().build();
    }

    // Helper method to map requestMap to InventoryItemRequest
    private InventoryItemRequest mapToInventoryItemRequest(Map<String, Object> map) {
        InventoryItemRequest req = new InventoryItemRequest();
        req.setItemId((String) map.get("itemId"));
        req.setItemName((String) map.get("itemName"));
        req.setCategory((String) map.get("category"));
        req.setSubCategory((String) map.get("subCategory"));
        req.setDescription((String) map.get("description"));
        req.setHsnCode((String) map.get("hsnCode"));
        req.setUnit((String) map.get("unit"));
        req.setCostPrice(map.get("costPrice") != null ? Double.parseDouble(map.get("costPrice").toString()) : 0);
        req.setSellingPrice(map.get("sellingPrice") != null ? Double.parseDouble(map.get("sellingPrice").toString()) : 0);
        req.setStockQuantity(map.get("stockQuantity") != null ? Integer.parseInt(map.get("stockQuantity").toString()) : 0);
        req.setReorderLevel(map.get("reorderLevel") != null ? Integer.parseInt(map.get("reorderLevel").toString()) : 0);
        req.setSupplierInfo((String) map.get("supplierInfo"));
        req.setSpecifications((Map<String, String>) map.get("specifications"));
        req.setGstRate(map.get("gstRate") != null ? Double.parseDouble(map.get("gstRate").toString()) : 0);
        return req;
    }
}