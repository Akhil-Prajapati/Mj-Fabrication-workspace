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
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
        // Get role from userDetails (convert to UserRole if needed)
        String roleStr = userDetails.getAuthorities().stream().findFirst().map(Object::toString).orElse(null);
        com.mjfabrication.enums.UserRole role = null;
        if (roleStr != null) {
            try {
                role = com.mjfabrication.enums.UserRole.valueOf(roleStr);
            } catch (Exception ignored) {}
        }
        String token = jwtUtil.generateToken(userDetails);
        com.mjfabrication.payload.response.AuthResponse authResponse = new com.mjfabrication.payload.response.AuthResponse(
            token, // accessToken
            null,  // refreshToken
            "Bearer", // tokenType
            null,  // userId (set if available)
            userDetails.getUsername(), // username
            null,  // email
            null,  // firstName
            null,  // lastName
            role   // role (UserRole enum)
        );
        return ResponseEntity.ok(authResponse);
    }
}
