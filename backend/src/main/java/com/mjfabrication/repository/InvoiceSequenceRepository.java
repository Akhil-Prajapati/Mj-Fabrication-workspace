package com.mjfabrication.repository;

import com.mjfabrication.entity.InvoiceSequence;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface InvoiceSequenceRepository extends JpaRepository<InvoiceSequence, UUID> {
    Optional<InvoiceSequence> findByPrefixAndFinancialYear(String prefix, String financialYear);
}
