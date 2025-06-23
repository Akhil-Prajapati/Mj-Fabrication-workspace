package com.mjfabrication.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryItem {
    @Id
    private String itemId;
    private String itemName;
    private String category;
    private String subCategory;
    private String description;
    private String hsnCode;
    private String unit;
    private double costPrice;
    private double sellingPrice;
    private int stockQuantity;
    private int reorderLevel;
    private String supplierInfo;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "inventory_item_specifications", joinColumns = @JoinColumn(name = "item_id"))
    @MapKeyColumn(name = "spec_key")
    @Column(name = "spec_value")
    private Map<String, String> specifications;
    private double gstRate;
    private LocalDateTime createdDate;
    private LocalDateTime lastModified;
}
