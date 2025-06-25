package com.mjfabrication.service.impl;

import com.mjfabrication.entity.Customer;
import com.mjfabrication.entity.CustomerAddress;
import com.mjfabrication.payload.request.CustomerRequest;
import com.mjfabrication.payload.response.CustomerResponse;
import com.mjfabrication.repository.CustomerAddressRepository;
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
    private final CustomerAddressRepository customerAddressRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<CustomerResponse> getAll() {
        return customerRepository.findAll().stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt())) // Descending by createdAt
                .map(c -> {
                    CustomerResponse resp = modelMapper.map(c, CustomerResponse.class);
                    // Fetch addresses for this customer
                    List<CustomerAddress> addresses = customerAddressRepository.findByCustomerId(c.getId());
                    List<com.mjfabrication.payload.response.AddressResponse> addressResponses = addresses.stream().map(addr -> {
                        com.mjfabrication.payload.response.AddressResponse ar = new com.mjfabrication.payload.response.AddressResponse();
                        ar.setAddressLine1(addr.getAddressLine1());
                        ar.setAddressLine2(addr.getAddressLine2());
                        ar.setCity(addr.getCity());
                        ar.setState(addr.getState());
                        ar.setPincode(addr.getPincode());
                        ar.setIsDefault(addr.getIsDefault());
                        ar.setAddressType(addr.getAddressType().toString());
                        return ar;
                    }).collect(Collectors.toList());
                    resp.setAddresses(addressResponses);
                    return resp;
                })
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
        customer.setCustomerType(request.getCustomerType());
        // Explicitly set companyName from request to ensure mapping
        System.out.println("[DEBUG] companyName from request: " + request.getCompanyName());
        customer.setCompanyName(request.getCompanyName() != null ? request.getCompanyName() : "");
        // Save customer first to get ID and ensure it's not transient
        Customer saved = customerRepository.saveAndFlush(customer);
        // Save addresses if present
        if (request.getAddresses() != null && !request.getAddresses().isEmpty()) {
            List<CustomerAddress> addresses = request.getAddresses().stream()
                .map(addrReq -> {
                    CustomerAddress addr = new CustomerAddress();
                    addr.setCustomer(saved);
                    addr.setAddressLine1(addrReq.getAddressLine1());
                    addr.setAddressLine2(addrReq.getAddressLine2());
                    addr.setCity(addrReq.getCity());
                    // If isDefault is false, set state to stateCode (code), else use state name
                    if (Boolean.FALSE.equals(addrReq.getIsDefault())) {
                        addr.setState(saved.getStateCode()); // Save state code if not default
                    } else {
                        addr.setState(addrReq.getState()); // Save state name if default
                    }
                    addr.setPincode(addrReq.getPincode());
                    addr.setIsDefault(addrReq.getIsDefault());
                    addr.setAddressType(addrReq.getAddressType());
                    return addr;
                })
                .collect(Collectors.toList());
            customerAddressRepository.saveAll(addresses);
        }
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
