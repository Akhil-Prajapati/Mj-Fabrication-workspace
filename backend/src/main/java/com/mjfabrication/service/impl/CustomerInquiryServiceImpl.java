package com.mjfabrication.service.impl;

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
        CustomerInquiry inquiry = modelMapper.map(request, CustomerInquiry.class);
        CustomerInquiry saved = customerInquiryRepository.save(inquiry);
        return modelMapper.map(saved, CustomerInquiryResponse.class);
    }

    @Override
    public CustomerInquiryResponse update(UUID id, CustomerInquiryRequest request) {
        CustomerInquiry inquiry = customerInquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CustomerInquiry not found"));
        modelMapper.map(request, inquiry);
        CustomerInquiry saved = customerInquiryRepository.save(inquiry);
        return modelMapper.map(saved, CustomerInquiryResponse.class);
    }

    @Override
    public void delete(UUID id) {
        customerInquiryRepository.deleteById(id);
    }
}
