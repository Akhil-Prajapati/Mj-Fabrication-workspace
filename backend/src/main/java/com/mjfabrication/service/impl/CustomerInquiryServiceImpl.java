package com.mjfabrication.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mjfabrication.entity.CustomerInquiry;
import com.mjfabrication.payload.request.CustomerInquiryRequest;
import com.mjfabrication.payload.response.CustomerInquiryResponse;
import com.mjfabrication.repository.CustomerInquiryRepository;
import com.mjfabrication.service.CustomerInquiryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerInquiryServiceImpl implements CustomerInquiryService {
    private final CustomerInquiryRepository customerInquiryRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<CustomerInquiryResponse> getAll() {
        return customerInquiryRepository.findAll().stream()
                .map(i -> modelMapper.map(i, CustomerInquiryResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public CustomerInquiryResponse getById(UUID id) {
        CustomerInquiry inquiry = customerInquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CustomerInquiry not found"));
        return modelMapper.map(inquiry, CustomerInquiryResponse.class);
    }

    @Override
    public CustomerInquiryResponse create(CustomerInquiryRequest request) {
        CustomerInquiry inquiry = new CustomerInquiry();
        // Use ObjectMapper to extract frontend fields if present
        try {
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(request);
            com.fasterxml.jackson.databind.JsonNode node = mapper.readTree(json);
            // customerName
            String customerName = node.has("customerName") ? node.get("customerName").asText("") : null;
            if (customerName != null && !customerName.isEmpty()) {
                inquiry.setCustomerName(customerName);
            } else if (request.getContactPerson() != null && !request.getContactPerson().isEmpty()) {
                inquiry.setCustomerName(request.getContactPerson());
            } else if (request.getCustomerId() != null) {
                inquiry.setCustomerName(request.getCustomerId().toString());
            } else {
                inquiry.setCustomerName("");
            }
            // email
            String email = node.has("email") ? node.get("email").asText("") : null;
            if (email != null && !email.isEmpty()) {
                inquiry.setEmail(email);
            } else if (request.getContactEmail() != null && !request.getContactEmail().isEmpty()) {
                inquiry.setEmail(request.getContactEmail());
            }
            // phone
            String phone = node.has("phone") ? node.get("phone").asText("") : null;
            if (phone != null && !phone.isEmpty()) {
                inquiry.setPhone(phone);
            } else if (request.getContactPhone() != null && !request.getContactPhone().isEmpty()) {
                inquiry.setPhone(request.getContactPhone());
            }
            // serviceType
            String serviceType = node.has("serviceType") ? node.get("serviceType").asText("") : null;
            if (serviceType != null && !serviceType.isEmpty()) {
                inquiry.setServiceType(serviceType);
            } else if (request.getInquiryType() != null && !request.getInquiryType().isEmpty()) {
                inquiry.setServiceType(request.getInquiryType());
            }
            // customProjectType
            String customProjectType = node.has("customProjectType") ? node.get("customProjectType").asText("") : null;
            if (customProjectType != null && !customProjectType.isEmpty()) {
                inquiry.setCustomProjectType(customProjectType);
            } else if (request.getCustomProjectType() != null && !request.getCustomProjectType().isEmpty()) {
                inquiry.setCustomProjectType(request.getCustomProjectType());
            }
            // message
            String message = node.has("message") ? node.get("message").asText("") : null;
            if (message != null && !message.isEmpty()) {
                inquiry.setMessage(message);
            } else if (request.getMessage() != null && !request.getMessage().isEmpty()) {
                inquiry.setMessage(request.getMessage());
            }
            // budgetRange
            String budgetRange = node.has("budgetRange") ? node.get("budgetRange").asText("") : null;
            if (budgetRange != null && !budgetRange.isEmpty()) {
                inquiry.setBudgetRange(budgetRange);
            } else if (request.getBudgetRange() != null && !request.getBudgetRange().isEmpty()) {
                inquiry.setBudgetRange(request.getBudgetRange());
            }
            // status
            String status = node.has("status") ? node.get("status").asText("") : null;
            if (status != null && !status.isEmpty()) {
                inquiry.setStatus(com.mjfabrication.enums.InquiryStatus.valueOf(status));
            } else if (request.getStatus() != null && !request.getStatus().isEmpty()) {
                inquiry.setStatus(com.mjfabrication.enums.InquiryStatus.valueOf(request.getStatus()));
            } else {
                inquiry.setStatus(com.mjfabrication.enums.InquiryStatus.NEW);
            }
        } catch (Exception e) {
            // fallback to previous logic if any error
            inquiry.setCustomerName(request.getContactPerson() != null && !request.getContactPerson().isEmpty() ? request.getContactPerson() : request.getCustomerId() != null ? request.getCustomerId().toString() : "");
            inquiry.setEmail(request.getContactEmail());
            inquiry.setPhone(request.getContactPhone());
            inquiry.setServiceType(request.getInquiryType());
            inquiry.setCustomProjectType(request.getCustomProjectType());
            inquiry.setMessage(request.getMessage());
            inquiry.setBudgetRange(request.getBudgetRange());
            inquiry.setStatus(request.getStatus() != null ? com.mjfabrication.enums.InquiryStatus.valueOf(request.getStatus()) : com.mjfabrication.enums.InquiryStatus.NEW);
        }
        inquiry.setCreatedAt(java.time.LocalDateTime.now());
        inquiry.setUpdatedAt(java.time.LocalDateTime.now());
        CustomerInquiry saved = customerInquiryRepository.save(inquiry);
        return modelMapper.map(saved, CustomerInquiryResponse.class);
    }

    @Override
    public CustomerInquiryResponse update(UUID id, CustomerInquiryRequest request) {
        CustomerInquiry inquiry = customerInquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CustomerInquiry not found"));
        modelMapper.map(request, inquiry);
        // Explicitly set status to avoid null (enum conversion)
        if (request.getStatus() != null && !request.getStatus().isEmpty()) {
            try {
                inquiry.setStatus(com.mjfabrication.enums.InquiryStatus.valueOf(request.getStatus().toUpperCase()));
            } catch (IllegalArgumentException e) {
                // fallback to NEW if status string is invalid
                inquiry.setStatus(com.mjfabrication.enums.InquiryStatus.NEW);
            }
        } else if (inquiry.getStatus() == null) {
            inquiry.setStatus(com.mjfabrication.enums.InquiryStatus.NEW);
        }
        inquiry.setUpdatedAt(java.time.LocalDateTime.now());
        CustomerInquiry saved = customerInquiryRepository.save(inquiry);
        return modelMapper.map(saved, CustomerInquiryResponse.class);
    }

    @Override
    public void delete(UUID id) {
        customerInquiryRepository.deleteById(id);
    }
}
