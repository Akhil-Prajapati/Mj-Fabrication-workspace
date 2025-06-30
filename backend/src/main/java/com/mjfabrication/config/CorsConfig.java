package com.mjfabrication.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    
    @Value("${spring.profiles.active:dev}")
    private String activeProfile;
    
    @Value("${FRONTEND_URL:http://localhost:5173}")
    private String frontendUrl;
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@org.springframework.lang.NonNull CorsRegistry registry) {
                if ("prod".equals(activeProfile)) {
                    // Production CORS configuration - use environment variable
                    registry.addMapping("/**")
                            .allowedOriginPatterns(frontendUrl, "https://*.your-domain.com")
                            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                            .allowedHeaders("*")
                            .allowCredentials(true);
                } else {
                    // Development CORS configuration
                    registry.addMapping("/**")
                            .allowedOriginPatterns("http://localhost:*", "http://127.0.0.1:*") // allow all localhost ports
                            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                            .allowedHeaders("*")
                            .allowCredentials(true);
                }
            }
        };
    }
}
