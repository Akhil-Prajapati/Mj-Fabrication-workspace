package com.mjfabrication.service.impl;

import lombok.RequiredArgsConstructor;
import com.mjfabrication.entity.InventoryItem;
import com.mjfabrication.payload.request.InventoryItemRequest;
import com.mjfabrication.payload.response.InventoryItemResponse;
import com.mjfabrication.repository.InventoryItemRepository;
import com.mjfabrication.service.InventoryItemService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryItemServiceImpl implements InventoryItemService {
    private final InventoryItemRepository inventoryItemRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<InventoryItemResponse> getAll() {
        return inventoryItemRepository.findAll().stream()
                .map(item -> modelMapper.map(item, InventoryItemResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public InventoryItemResponse getById(String itemId) {
        InventoryItem item = inventoryItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Inventory item not found"));
        return modelMapper.map(item, InventoryItemResponse.class);
    }

    @Override
    public InventoryItemResponse create(InventoryItemRequest request) {
        InventoryItem item = modelMapper.map(request, InventoryItem.class);
        item.setCreatedDate(LocalDateTime.now());
        item.setLastModified(LocalDateTime.now());
        InventoryItem saved = inventoryItemRepository.save(item);
        return modelMapper.map(saved, InventoryItemResponse.class);
    }

    @Override
    public InventoryItemResponse update(String itemId, InventoryItemRequest request) {
        InventoryItem item = inventoryItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Inventory item not found"));
        modelMapper.map(request, item);
        item.setLastModified(LocalDateTime.now());
        InventoryItem saved = inventoryItemRepository.save(item);
        return modelMapper.map(saved, InventoryItemResponse.class);
    }

    @Override
    public void delete(String itemId) {
        try {
            InventoryItem item = inventoryItemRepository.findById(itemId)
                    .orElseThrow(() -> new RuntimeException("Inventory item not found with id: " + itemId));
            inventoryItemRepository.delete(item);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting inventory item: " + e.getMessage());
        }
    }
}
