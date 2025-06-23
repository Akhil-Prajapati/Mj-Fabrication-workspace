package com.mjfabrication.controller;

import com.mjfabrication.payload.request.CustomerRequest;
import com.mjfabrication.payload.response.CustomerResponse;
import com.mjfabrication.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    @GetMapping
    public List<CustomerResponse> getAll() {
        return customerService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(customerService.getById(id));
    }

    @PostMapping
    public ResponseEntity<CustomerResponse> create(@Valid @RequestBody CustomerRequest request) {
        return ResponseEntity.ok(customerService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponse> update(@PathVariable UUID id, @Valid @RequestBody CustomerRequest request) {
        return ResponseEntity.ok(customerService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        customerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
