package com.mjfabrication.controller;

import com.mjfabrication.payload.request.CustomerInquiryRequest;
import com.mjfabrication.payload.response.CustomerInquiryResponse;
import com.mjfabrication.service.CustomerInquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/customer-inquiries")
@RequiredArgsConstructor
public class CustomerInquiryController {
    private final CustomerInquiryService customerInquiryService;

    @GetMapping
    public List<CustomerInquiryResponse> getAll() {
        return customerInquiryService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerInquiryResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(customerInquiryService.getById(id));
    }

    @PostMapping
    public ResponseEntity<CustomerInquiryResponse> create(@Valid @RequestBody CustomerInquiryRequest request) {
        return ResponseEntity.ok(customerInquiryService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerInquiryResponse> update(@PathVariable UUID id, @Valid @RequestBody CustomerInquiryRequest request) {
        return ResponseEntity.ok(customerInquiryService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        customerInquiryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
