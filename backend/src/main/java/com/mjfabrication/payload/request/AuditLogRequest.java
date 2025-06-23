package com.mjfabrication.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuditLogRequest {
    @NotBlank
    private String tableName;
    @NotBlank
    private String recordId;
    @NotBlank
    private String action;
    private String oldValues;
    private String newValues;
    private String userId;
}
