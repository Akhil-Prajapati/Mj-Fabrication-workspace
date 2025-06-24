package com.mjfabrication.repository;

import com.mjfabrication.entity.CustomerAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface CustomerAddressRepository extends JpaRepository<CustomerAddress, UUID> {}
