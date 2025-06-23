package com.mjfabrication.controller;

import com.mjfabrication.util.CryptoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private CryptoService cryptoService;

    @PostMapping("/profile")
    public ResponseEntity<Map<String, String>> getProfile(@RequestBody Map<String, Object> body) {
        try {
            // Decrypt request
            String encryptedData = (String) body.get("data");
            String decryptedJson = cryptoService.decrypt(encryptedData);
            // Here you would parse decryptedJson and use it as needed

            // Example profile data
            String profileJson = "{\"username\":\"admin\",\"role\":\"ADMIN\"}";
            String encryptedResponse = cryptoService.encrypt(profileJson);

            Map<String, String> response = new HashMap<>();
            response.put("message", encryptedResponse);
            response.put("error", "");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "");
            response.put("error", e.getMessage());
            return ResponseEntity.ok(response);
        }
    }
}
