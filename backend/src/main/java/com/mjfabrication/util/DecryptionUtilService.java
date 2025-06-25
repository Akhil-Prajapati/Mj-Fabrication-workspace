package com.mjfabrication.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Base64;
import java.util.Map;

@Service
public class DecryptionUtilService {
    @Autowired
    private CryptoService cryptoService;
    @Autowired
    private ObjectMapper objectMapper;

    public Map<String, Object> decryptIfNeeded(Map<String, Object> requestMap) {
        if (requestMap.containsKey("data")) {
            try {
                String encrypted = (String) requestMap.get("data");
                String decryptedJson = cryptoService.decrypt(encrypted);
                if (decryptedJson.matches("^[A-Za-z0-9+/=]+$")) {
                    byte[] decodedBytes = Base64.getDecoder().decode(decryptedJson);
                    decryptedJson = new String(decodedBytes, java.nio.charset.StandardCharsets.UTF_8);
                }
                return objectMapper.readValue(decryptedJson, Map.class);
            } catch (Exception e) {
                throw new RuntimeException("Failed to decrypt request", e);
            }
        }
        return requestMap;
    }
}