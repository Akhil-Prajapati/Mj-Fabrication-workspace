package com.mjfabrication.repository;

import com.mjfabrication.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    java.util.Optional<User> findByUsername(String username);
    java.util.Optional<User> findByEmail(String email);
}
