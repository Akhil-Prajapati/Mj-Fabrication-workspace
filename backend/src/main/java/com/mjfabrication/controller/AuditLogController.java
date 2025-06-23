package com.mjfabrication.controller;

import com.mjfabrication.payload.request.AuditLogRequest;
import com.mjfabrication.payload.response.AuditLogResponse;
import com.mjfabrication.service.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/audit-logs")
@RequiredArgsConstructor
public class AuditLogController {
    private final AuditLogService auditLogService;

    @GetMapping
    public List<AuditLogResponse> getAll() {
        return auditLogService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuditLogResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(auditLogService.getById(id));
    }

    @PostMapping
    public ResponseEntity<AuditLogResponse> create(@Valid @RequestBody AuditLogRequest request) {
        return ResponseEntity.ok(auditLogService.create(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        auditLogService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
