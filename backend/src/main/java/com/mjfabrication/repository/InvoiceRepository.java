package com.mjfabrication.repository;

import com.mjfabrication.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {
    @Query("SELECT i FROM Invoice i WHERE MONTH(i.invoiceDate) = :month AND YEAR(i.invoiceDate) = :year")
    List<Invoice> findByMonthAndYear(@Param("month") int month, @Param("year") int year);
}
