package com.mjfabrication.service.impl;

import com.mjfabrication.entity.TaxRate;
import com.mjfabrication.payload.request.TaxRateRequest;
import com.mjfabrication.payload.response.TaxRateResponse;
import com.mjfabrication.repository.TaxRateRepository;
import com.mjfabrication.service.TaxRateService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaxRateServiceImpl implements TaxRateService {
    private final TaxRateRepository taxRateRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<TaxRateResponse> getAll() {
        return taxRateRepository.findAll().stream()
                .map(t -> modelMapper.map(t, TaxRateResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public TaxRateResponse getById(UUID id) {
        TaxRate taxRate = taxRateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TaxRate not found"));
        return modelMapper.map(taxRate, TaxRateResponse.class);
    }

    @Override
    public TaxRateResponse create(TaxRateRequest request) {
        TaxRate taxRate = modelMapper.map(request, TaxRate.class);
        TaxRate saved = taxRateRepository.save(taxRate);
        return modelMapper.map(saved, TaxRateResponse.class);
    }

    @Override
    public TaxRateResponse update(UUID id, TaxRateRequest request) {
        TaxRate taxRate = taxRateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TaxRate not found"));
        modelMapper.map(request, taxRate);
        TaxRate saved = taxRateRepository.save(taxRate);
        return modelMapper.map(saved, TaxRateResponse.class);
    }

    @Override
    public void delete(UUID id) {
        taxRateRepository.deleteById(id);
    }
}
