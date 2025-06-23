package com.mjfabrication.payload.response;

import lombok.Data;
import java.util.UUID;
import java.time.LocalDateTime;

@Data
public class AuditLogResponse {
    private UUID id;
    private String tableName;
    private String recordId;
    private String action;
    private String oldValues;
    private String newValues;
    private String userId;
    private LocalDateTime createdAt;
}
