package com.mjfabrication.controller;

import com.mjfabrication.enums.CustomerType;
import com.mjfabrication.payload.request.CustomerRequest;
import com.mjfabrication.payload.response.CustomerResponse;
import com.mjfabrication.service.CustomerService;
import com.mjfabrication.util.DecryptionUtilService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    private final DecryptionUtilService decryptionUtilService;

    @GetMapping
    public List<CustomerResponse> getAll() {
        return customerService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(customerService.getById(id));
    }

    @PostMapping
    public ResponseEntity<CustomerResponse> create(@RequestBody Map<String, Object> requestMap) {
        requestMap = decryptionUtilService.decryptIfNeeded(requestMap);
        CustomerRequest request = mapToCustomerRequest(requestMap);
        CustomerResponse response = customerService.create(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponse> update(@PathVariable UUID id, @Valid @RequestBody CustomerRequest request) {
        System.out.println(id+"idssssssss");
        return ResponseEntity.ok(customerService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        customerService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Helper method to map requestMap to CustomerRequest
    private CustomerRequest mapToCustomerRequest(Map<String, Object> requestMap) {
        CustomerRequest request = new CustomerRequest();
        request.setCustomerName((String) requestMap.get("customerName"));
        request.setPhone((String) requestMap.get("phone"));
        request.setEmail((String) requestMap.get("email"));
        request.setCompanyName((String) requestMap.get("companyName"));
        request.setGstNumber((String) requestMap.get("gstNumber"));
        request.setStateCode((String) requestMap.get("stateCode"));
        String customerTypeStr = (String) requestMap.get("customerType");
        if (customerTypeStr != null && !customerTypeStr.trim().isEmpty()) {
            try {
                request.setCustomerType(CustomerType.valueOf(customerTypeStr.toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid customer type: " + customerTypeStr);
            }
        }
        if (requestMap.containsKey("addresses")) {
            java.util.List<Map<String, Object>> addrList = (java.util.List<Map<String, Object>>) requestMap.get("addresses");
            java.util.List<com.mjfabrication.payload.request.CustomerAddressRequest> addresses = new java.util.ArrayList<>();
            for (Map<String, Object> addrMap : addrList) {
                com.mjfabrication.payload.request.CustomerAddressRequest addr = new com.mjfabrication.payload.request.CustomerAddressRequest();
                addr.setAddressLine1((String) addrMap.get("addressLine1"));
                addr.setAddressLine2((String) addrMap.get("addressLine2"));
                addr.setCity((String) addrMap.get("city"));
                addr.setState((String) addrMap.get("state"));
                addr.setPincode((String) addrMap.get("pincode"));
                addr.setIsDefault(addrMap.get("isDefault") != null && Boolean.parseBoolean(addrMap.get("isDefault").toString()));
                String addrType = (String) addrMap.get("addressType");
                if (addrType != null) {
                    addr.setAddressType(com.mjfabrication.enums.AddressType.valueOf(addrType.toUpperCase()));
                }
                addresses.add(addr);
            }
            request.setAddresses(addresses);
        }
        return request;
    }
}