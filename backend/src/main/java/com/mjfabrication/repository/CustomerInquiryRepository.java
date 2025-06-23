package com.mjfabrication.repository;

import com.mjfabrication.entity.CustomerInquiry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CustomerInquiryRepository extends JpaRepository<CustomerInquiry, UUID> {}
