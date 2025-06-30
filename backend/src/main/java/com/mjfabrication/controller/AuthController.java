package com.mjfabrication.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mjfabrication.payload.request.AuthRequest;
import com.mjfabrication.payload.response.AuthResponse;
import com.mjfabrication.util.JwtUtil;
import com.mjfabrication.util.CryptoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        } catch (Exception ex) {
            // Return a clear error for invalid credentials
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
        // Get role from userDetails (convert to UserRole if needed)
        String roleStr = userDetails.getAuthorities().stream().findFirst().map(Object::toString).orElse(null);
        com.mjfabrication.enums.UserRole role = null;
        if (roleStr != null) {
            try {
                role = com.mjfabrication.enums.UserRole.valueOf(roleStr);
            } catch (Exception ignored) {
            }
        }
        String token = jwtUtil.generateToken(userDetails);
        // Set JWT as HttpOnly cookie
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // set to false for development (allows HTTP)
        cookie.setPath("/");
        cookie.setMaxAge(7 * 24 * 60 * 60); // 1 week
        cookie.setAttribute("SameSite", "Lax"); // Lax is more forgiving for local dev
        response.addCookie(cookie);
        com.mjfabrication.payload.response.AuthResponse authResponse = new com.mjfabrication.payload.response.AuthResponse(
                null, // accessToken (do not return token in body for cookie-based auth)
                null, // refreshToken
                "Bearer", // tokenType
                null, // userId (set if available)
                userDetails.getUsername(), // username
                null, // email
                null, // firstName
                null, // lastName
                role // role (UserRole enum)
        );
        return ResponseEntity.ok(authResponse);
    }
    // In AuthController.java

    @PostMapping("/verify")
    public ResponseEntity<?> verifyToken(jakarta.servlet.http.HttpServletRequest request) {
        String token = null;
        if (request.getCookies() != null) {
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
        if (request.getCookies() != null) {
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
                
                // Set new JWT as HttpOnly cookie
                Cookie cookie = new Cookie("token", newToken);
                cookie.setHttpOnly(true);
                cookie.setSecure(false); // set to true in production
                cookie.setPath("/");
                cookie.setMaxAge(7 * 24 * 60 * 60); // 1 week
                cookie.setAttribute("SameSite", "Lax");
                response.addCookie(cookie);
                
                return ResponseEntity.ok(Map.of("message", "Token refreshed successfully"));
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
        cookie.setSecure(false); // set to true in production
        cookie.setPath("/");
        cookie.setMaxAge(0); // Expire immediately
        cookie.setAttribute("SameSite", "Lax");
        response.addCookie(cookie);
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
