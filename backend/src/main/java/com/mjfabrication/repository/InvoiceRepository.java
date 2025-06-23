package com.mjfabrication.repository;

import com.mjfabrication.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {
}
