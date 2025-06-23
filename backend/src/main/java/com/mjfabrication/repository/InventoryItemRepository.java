package com.mjfabrication.repository;

import com.mjfabrication.entity.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryItemRepository extends JpaRepository<InventoryItem, String> {
}
