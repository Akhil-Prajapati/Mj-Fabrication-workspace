package com.mjfabrication.controller;

import com.mjfabrication.payload.request.TaxRateRequest;
import com.mjfabrication.payload.response.TaxRateResponse;
import com.mjfabrication.service.TaxRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tax-rates")
@RequiredArgsConstructor
public class TaxRateController {
    private final TaxRateService taxRateService;

    @GetMapping
    public List<TaxRateResponse> getAll() {
        return taxRateService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaxRateResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(taxRateService.getById(id));
    }

    @PostMapping
    public ResponseEntity<TaxRateResponse> create(@Valid @RequestBody TaxRateRequest request) {
        return ResponseEntity.ok(taxRateService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaxRateResponse> update(@PathVariable UUID id, @Valid @RequestBody TaxRateRequest request) {
        return ResponseEntity.ok(taxRateService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        taxRateService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
