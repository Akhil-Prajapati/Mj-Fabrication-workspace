package com.mjfabrication.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class HealthController {

    @Value("${spring.profiles.active:prod}")
    private String activeProfile;

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health(HttpServletRequest request) {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", LocalDateTime.now());
        health.put("service", "MJ Fabrication API");
        health.put("version", "1.0.0");
        health.put("environment", activeProfile);
        
        // Add request information for debugging
        Map<String, Object> requestInfo = new HashMap<>();
        requestInfo.put("method", request.getMethod());
        requestInfo.put("origin", request.getHeader("Origin"));
        requestInfo.put("userAgent", request.getHeader("User-Agent"));
        requestInfo.put("referer", request.getHeader("Referer"));
        requestInfo.put("remoteAddr", request.getRemoteAddr());
        requestInfo.put("serverName", request.getServerName());
        requestInfo.put("serverPort", request.getServerPort());
        requestInfo.put("requestURL", request.getRequestURL().toString());
        
        health.put("request", requestInfo);
        
        return ResponseEntity.ok(health);
    }
}
