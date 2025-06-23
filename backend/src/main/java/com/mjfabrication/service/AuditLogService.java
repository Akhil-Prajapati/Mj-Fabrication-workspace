package com.mjfabrication.service;

import com.mjfabrication.payload.request.AuditLogRequest;
import com.mjfabrication.payload.response.AuditLogResponse;
import java.util.List;
import java.util.UUID;

public interface AuditLogService {
    List<AuditLogResponse> getAll();
    AuditLogResponse getById(UUID id);
    AuditLogResponse create(AuditLogRequest request);
    void delete(UUID id);
}
