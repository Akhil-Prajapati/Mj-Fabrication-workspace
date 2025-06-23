package com.mjfabrication.controller;

import com.mjfabrication.payload.request.InvoiceRequest;
import com.mjfabrication.payload.response.InvoiceResponse;
import com.mjfabrication.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/invoices")
@RequiredArgsConstructor
public class InvoiceController {
    private final InvoiceService invoiceService;

    @GetMapping
    public List<InvoiceResponse> getAll() {
        return invoiceService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvoiceResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(invoiceService.getById(id));
    }

    @PostMapping
    public ResponseEntity<InvoiceResponse> create(@Valid @RequestBody InvoiceRequest request) {
        return ResponseEntity.ok(invoiceService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvoiceResponse> update(@PathVariable UUID id, @Valid @RequestBody InvoiceRequest request) {
        return ResponseEntity.ok(invoiceService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        invoiceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
