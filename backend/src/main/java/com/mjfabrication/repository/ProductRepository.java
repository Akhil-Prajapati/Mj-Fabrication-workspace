package com.mjfabrication.repository;

import com.mjfabrication.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
}
