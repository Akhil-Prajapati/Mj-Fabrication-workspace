package com.mjfabrication.service.impl;

import com.mjfabrication.entity.Invoice;
import com.mjfabrication.payload.request.InvoiceRequest;
import com.mjfabrication.payload.response.InvoiceResponse;
import com.mjfabrication.repository.InvoiceRepository;
import com.mjfabrication.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<InvoiceResponse> getAll() {
        return invoiceRepository.findAll().stream()
                .map(i -> modelMapper.map(i, InvoiceResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceResponse getById(UUID id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
        return modelMapper.map(invoice, InvoiceResponse.class);
    }

    @Override
    public InvoiceResponse create(InvoiceRequest request) {
        Invoice invoice = modelMapper.map(request, Invoice.class);
        invoice.setCreatedAt(LocalDateTime.now());
        invoice.setUpdatedAt(LocalDateTime.now());
        Invoice saved = invoiceRepository.save(invoice);
        return modelMapper.map(saved, InvoiceResponse.class);
    }

    @Override
    public InvoiceResponse update(UUID id, InvoiceRequest request) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
        modelMapper.map(request, invoice);
        invoice.setUpdatedAt(LocalDateTime.now());
        Invoice saved = invoiceRepository.save(invoice);
        return modelMapper.map(saved, InvoiceResponse.class);
    }

    @Override
    public void delete(UUID id) {
        invoiceRepository.deleteById(id);
    }
}
