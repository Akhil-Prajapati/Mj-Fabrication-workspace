package com.mjfabrication.payload.request;

import lombok.Data;
import java.util.Map;

@Data
public class InventoryItemRequest {
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
    private Map<String, String> specifications;
    private double gstRate;
}
