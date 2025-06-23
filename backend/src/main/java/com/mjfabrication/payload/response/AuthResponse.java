package com.mjfabrication.payload.response;

import com.mjfabrication.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    private UUID userId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private UserRole role;
}
