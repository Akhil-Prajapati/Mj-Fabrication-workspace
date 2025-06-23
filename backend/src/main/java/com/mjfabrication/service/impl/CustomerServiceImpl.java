package com.mjfabrication.service.impl;

import com.mjfabrication.entity.Customer;
import com.mjfabrication.payload.request.CustomerRequest;
import com.mjfabrication.payload.response.CustomerResponse;
import com.mjfabrication.repository.CustomerRepository;
import com.mjfabrication.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<CustomerResponse> getAll() {
        return customerRepository.findAll().stream()
                .map(c -> modelMapper.map(c, CustomerResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public CustomerResponse getById(UUID id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return modelMapper.map(customer, CustomerResponse.class);
    }

    @Override
    public CustomerResponse create(CustomerRequest request) {
        Customer customer = modelMapper.map(request, Customer.class);
        customer.setCreatedAt(LocalDateTime.now());
        customer.setUpdatedAt(LocalDateTime.now());
        Customer saved = customerRepository.save(customer);
        return modelMapper.map(saved, CustomerResponse.class);
    }

    @Override
    public CustomerResponse update(UUID id, CustomerRequest request) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        modelMapper.map(request, customer);
        customer.setUpdatedAt(LocalDateTime.now());
        Customer saved = customerRepository.save(customer);
        return modelMapper.map(saved, CustomerResponse.class);
    }

    @Override
    public void delete(UUID id) {
        customerRepository.deleteById(id);
    }
}
