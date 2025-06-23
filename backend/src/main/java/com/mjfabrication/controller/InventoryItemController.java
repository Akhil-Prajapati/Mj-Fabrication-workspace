package com.mjfabrication.controller;

import lombok.RequiredArgsConstructor;
import com.mjfabrication.payload.request.InventoryItemRequest;
import com.mjfabrication.payload.response.InventoryItemResponse;
import com.mjfabrication.service.InventoryItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/inventory")
@RequiredArgsConstructor
public class InventoryItemController {
    private final InventoryItemService inventoryItemService;

    @GetMapping
    public List<InventoryItemResponse> getAll() {
        return inventoryItemService.getAll();
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<InventoryItemResponse> getById(@PathVariable String itemId) {
        return ResponseEntity.ok(inventoryItemService.getById(itemId));
    }

    @PostMapping
    public ResponseEntity<InventoryItemResponse> create(@RequestBody InventoryItemRequest request) {
        return ResponseEntity.ok(inventoryItemService.create(request));
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<InventoryItemResponse> update(@PathVariable String itemId, @RequestBody InventoryItemRequest request) {
        return ResponseEntity.ok(inventoryItemService.update(itemId, request));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> delete(@PathVariable String itemId) {
        inventoryItemService.delete(itemId);
        return ResponseEntity.noContent().build();
    }
}
