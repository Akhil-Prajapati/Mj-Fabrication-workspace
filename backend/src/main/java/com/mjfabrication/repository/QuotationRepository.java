package com.mjfabrication.repository;

import com.mjfabrication.entity.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface QuotationRepository extends JpaRepository<Quotation, UUID> {
}
