package com.mjfabrication.controller;

import com.mjfabrication.payload.request.PaymentRequest;
import com.mjfabrication.payload.response.PaymentResponse;
import com.mjfabrication.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @GetMapping
    public List<PaymentResponse> getAll() {
        return paymentService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(paymentService.getById(id));
    }

    @PostMapping
    public ResponseEntity<PaymentResponse> create(@Valid @RequestBody PaymentRequest request) {
        return ResponseEntity.ok(paymentService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaymentResponse> update(@PathVariable UUID id, @Valid @RequestBody PaymentRequest request) {
        return ResponseEntity.ok(paymentService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        paymentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
