package com.mjfabrication.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordDebugUtil {
    private static final Logger logger = LoggerFactory.getLogger(PasswordDebugUtil.class);
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public void debugPasswordMatch(String rawPassword, String encodedPassword) {
        logger.info("=== Password Debug Info ===");
        logger.info("Raw password: {}", rawPassword);
        logger.info("Encoded password: {}", encodedPassword);
        logger.info("Password matches: {}", passwordEncoder.matches(rawPassword, encodedPassword));
        
        // Generate a new hash for comparison
        String newHash = passwordEncoder.encode(rawPassword);
        logger.info("New hash would be: {}", newHash);
        logger.info("New hash matches: {}", passwordEncoder.matches(rawPassword, newHash));
        logger.info("=== End Password Debug ===");
    }
}
