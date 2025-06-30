package com.mjfabrication.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {
    // Use environment variables for JWT configuration
    @Value("${JWT_SECRET:bXlTdXBlclNlY3JldEtleU1qRmFicmljYXRpb25AMTIzNDU2Nzg5MDEyMzQ1Ng==}")
    private String secretKey;
    
    @Value("${JWT_ACCESS_TOKEN_EXPIRATION:604800000}") // 7 days default
    private long accessTokenExpiration;
    
    @Value("${JWT_REFRESH_TOKEN_EXPIRATION:2592000000}") // 30 days default
    private long refreshTokenExpiration;

    private SecretKey getSigningKey() {
        byte[] keyBytes = java.util.Base64.getDecoder().decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            // Return the expired claims for processing
            return e.getClaims();
        }
    }

    private Boolean isTokenExpired(String token) {
        try {
            return extractExpiration(token).before(new Date());
        } catch (Exception e) {
            return true; // Consider any exception as expired
        }
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername(), accessTokenExpiration);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("tokenType", "refresh");
        return createToken(claims, userDetails.getUsername(), refreshTokenExpiration);
    }

    private String createToken(Map<String, Object> claims, String subject, long expiration) {
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey())
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            // Token is expired
            return false;
        } catch (Exception e) {
            // Token is invalid
            return false;
        }
    }

    public Boolean isTokenExpiredButValid(String token) {
        try {
            extractAllClaims(token);
            return false; // Token is valid and not expired
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            return true; // Token is expired but was valid
        } catch (Exception e) {
            return false; // Token is invalid
        }
    }

    public String refreshToken(String expiredToken, UserDetails userDetails) {
        try {
            // Verify the token was valid (just expired)
            if (isTokenExpiredButValid(expiredToken)) {
                return generateToken(userDetails);
            }
        } catch (Exception e) {
            // Token is completely invalid
        }
        return null;
    }
}
