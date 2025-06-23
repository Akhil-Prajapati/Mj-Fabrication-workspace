package com.mjfabrication.controller;

import com.mjfabrication.payload.request.CompanyRequest;
import com.mjfabrication.payload.response.CompanyResponse;
import com.mjfabrication.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/companies")
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;

    @GetMapping
    public List<CompanyResponse> getAll() {
        return companyService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(companyService.getById(id));
    }

    @PostMapping
    public ResponseEntity<CompanyResponse> create(@Valid @RequestBody CompanyRequest request) {
        return ResponseEntity.ok(companyService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompanyResponse> update(@PathVariable UUID id, @Valid @RequestBody CompanyRequest request) {
        return ResponseEntity.ok(companyService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        companyService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
