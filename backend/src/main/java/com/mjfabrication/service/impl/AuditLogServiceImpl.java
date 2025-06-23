package com.mjfabrication.service.impl;

import com.mjfabrication.entity.AuditLog;
import com.mjfabrication.payload.request.AuditLogRequest;
import com.mjfabrication.payload.response.AuditLogResponse;
import com.mjfabrication.repository.AuditLogRepository;
import com.mjfabrication.service.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuditLogServiceImpl implements AuditLogService {
    private final AuditLogRepository auditLogRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<AuditLogResponse> getAll() {
        return auditLogRepository.findAll().stream()
                .map(a -> modelMapper.map(a, AuditLogResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public AuditLogResponse getById(UUID id) {
        AuditLog auditLog = auditLogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("AuditLog not found"));
        return modelMapper.map(auditLog, AuditLogResponse.class);
    }

    @Override
    public AuditLogResponse create(AuditLogRequest request) {
        AuditLog auditLog = modelMapper.map(request, AuditLog.class);
        auditLog.setCreatedAt(LocalDateTime.now());
        AuditLog saved = auditLogRepository.save(auditLog);
        return modelMapper.map(saved, AuditLogResponse.class);
    }

    @Override
    public void delete(UUID id) {
        auditLogRepository.deleteById(id);
    }
}
