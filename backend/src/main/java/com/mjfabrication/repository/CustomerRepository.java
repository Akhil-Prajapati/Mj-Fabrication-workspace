package com.mjfabrication.repository;

import com.mjfabrication.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {
    boolean existsByEmail(String email);
    java.util.Optional<Customer> findByEmail(String email);
}
