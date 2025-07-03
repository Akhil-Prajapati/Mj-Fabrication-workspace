package com.mjfabrication.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mjfabrication.payload.request.AuthRequest;
import com.mjfabrication.payload.response.AuthResponse;
import com.mjfabrication.util.JwtUtil;
import com.mjfabrication.util.CryptoService;
import com.mjfabrication.util.PasswordDebugUtil;
import com.mjfabrication.entity.User;
import com.mjfabrication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private CryptoService cryptoService;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordDebugUtil passwordDebugUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        logger.info("Login attempt for username: {}", authRequest.getUsername());
        
        // Debug password before authentication
        try {
            User user = userRepository.findByUsername(authRequest.getUsername()).orElse(null);
            if (user != null) {
                passwordDebugUtil.debugPasswordMatch(authRequest.getPassword(), user.getPassword());
            }
        } catch (Exception debugEx) {
            logger.warn("Could not debug password for user: {}", authRequest.getUsername(), debugEx);
        }
        
        try {
            logger.debug("Attempting authentication for user: {}", authRequest.getUsername());
            
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            
            logger.info("Authentication successful for user: {}", authRequest.getUsername());
            logger.debug("Authentication details: {}", authentication.getDetails());
            
        } catch (Exception ex) {
            logger.error("Authentication failed for user: {} - Error: {}", authRequest.getUsername(), ex.getMessage());
            // Return a clear error for invalid credentials
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }
        
        try {
            logger.debug("Loading user details for: {}", authRequest.getUsername());
            UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
            logger.info("User details loaded successfully for: {}", authRequest.getUsername());
            logger.debug("User authorities: {}", userDetails.getAuthorities());
            
            // Get role from userDetails (convert to UserRole if needed)
            String roleStr = userDetails.getAuthorities().stream().findFirst().map(Object::toString).orElse(null);
            logger.debug("Role string extracted: {}", roleStr);
            
            com.mjfabrication.enums.UserRole role = null;
            if (roleStr != null) {
                try {
                    role = com.mjfabrication.enums.UserRole.valueOf(roleStr);
                    logger.debug("Role enum converted: {}", role);
                } catch (Exception ignored) {
                    logger.warn("Failed to convert role string to enum: {}", roleStr);
                }
            }
            
            logger.debug("Generating JWT token for user: {}", authRequest.getUsername());
            String token = jwtUtil.generateToken(userDetails);
            logger.info("JWT token generated successfully for user: {}", authRequest.getUsername());
            
            // For cross-origin compatibility, return token in response body instead of cookie
            com.mjfabrication.payload.response.AuthResponse authResponse = new com.mjfabrication.payload.response.AuthResponse(
                    token, // Return token in response body for cross-origin compatibility
                    null, // refreshToken
                    "Bearer", // tokenType
                    null, // userId (set if available)
                    userDetails.getUsername(), // username
                    null, // email
                    null, // firstName
                    null, // lastName
                    role // role (UserRole enum)
            );
            
            logger.info("Login successful for user: {} - Returning response", authRequest.getUsername());
            return ResponseEntity.ok(authResponse);
            
        } catch (Exception ex) {
            logger.error("Error during login process for user: {} - Error: {}", authRequest.getUsername(), ex.getMessage(), ex);
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error during login"));
        }
    }
    // In AuthController.java

    @PostMapping("/verify")
    public ResponseEntity<?> verifyToken(jakarta.servlet.http.HttpServletRequest request) {
        String token = null;
        
        // First try Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }
        
        // Fallback to cookie if no Authorization header
        if (token == null && request.getCookies() != null) {
            for (jakarta.servlet.http.Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }
        
        if (token == null) {
            return ResponseEntity.status(401).body(Map.of("verified", false, "error", "No token"));
        }
        try {
            String username = jwtUtil.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            boolean valid = jwtUtil.validateToken(token, userDetails);
            if (valid) {
                // Optionally return user info
                return ResponseEntity.ok(Map.of("verified", true, "user", userDetails));
            }
        } catch (Exception e) {
            // log error if needed
        }
        return ResponseEntity.status(401).body(Map.of("verified", false, "error", "Invalid or expired token"));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(jakarta.servlet.http.HttpServletRequest request, HttpServletResponse response) {
        String token = null;
        
        // First try Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }
        
        // Fallback to cookie if no Authorization header
        if (token == null && request.getCookies() != null) {
            for (jakarta.servlet.http.Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }
        
        if (token == null) {
            return ResponseEntity.status(401).body(Map.of("error", "No token found"));
        }
        
        try {
            // Try to extract username even from expired token
            String username = jwtUtil.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            
            // Check if token was valid but expired
            if (jwtUtil.isTokenExpiredButValid(token)) {
                // Generate new token
                String newToken = jwtUtil.generateToken(userDetails);
                
                // Return new token in response body
                return ResponseEntity.ok(Map.of("accessToken", newToken, "message", "Token refreshed successfully"));
            } else {
                return ResponseEntity.status(401).body(Map.of("error", "Invalid token"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Failed to refresh token"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // Invalidate the JWT cookie
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // set to true in production
        cookie.setPath("/");
        cookie.setMaxAge(0); // Expire immediately
        cookie.setAttribute("SameSite", "Lax");
        response.addCookie(cookie);
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
