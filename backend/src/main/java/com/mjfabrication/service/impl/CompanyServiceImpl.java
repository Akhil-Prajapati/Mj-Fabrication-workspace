package com.mjfabrication.service.impl;

import com.mjfabrication.entity.Company;
import com.mjfabrication.payload.request.CompanyRequest;
import com.mjfabrication.payload.response.CompanyResponse;
import com.mjfabrication.repository.CompanyRepository;
import com.mjfabrication.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<CompanyResponse> getAll() {
        return companyRepository.findAll().stream()
                .map(c -> modelMapper.map(c, CompanyResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public CompanyResponse getById(UUID id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        return modelMapper.map(company, CompanyResponse.class);
    }

    @Override
    public CompanyResponse create(CompanyRequest request) {
        Company company = modelMapper.map(request, Company.class);
        company.setCreatedAt(LocalDateTime.now());
        company.setUpdatedAt(LocalDateTime.now());
        Company saved = companyRepository.save(company);
        return modelMapper.map(saved, CompanyResponse.class);
    }

    @Override
    public CompanyResponse update(UUID id, CompanyRequest request) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        modelMapper.map(request, company);
        company.setUpdatedAt(LocalDateTime.now());
        Company saved = companyRepository.save(company);
        return modelMapper.map(saved, CompanyResponse.class);
    }

    @Override
    public void delete(UUID id) {
        companyRepository.deleteById(id);
    }
}
