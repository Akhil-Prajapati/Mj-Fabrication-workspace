package com.mjfabrication.service.impl;

import com.mjfabrication.entity.Payment;
import com.mjfabrication.payload.request.PaymentRequest;
import com.mjfabrication.payload.response.PaymentResponse;
import com.mjfabrication.repository.PaymentRepository;
import com.mjfabrication.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<PaymentResponse> getAll() {
        return paymentRepository.findAll().stream()
                .map(p -> modelMapper.map(p, PaymentResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public PaymentResponse getById(UUID id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        return modelMapper.map(payment, PaymentResponse.class);
    }

    @Override
    public PaymentResponse create(PaymentRequest request) {
        Payment payment = modelMapper.map(request, Payment.class);
        Payment saved = paymentRepository.save(payment);
        return modelMapper.map(saved, PaymentResponse.class);
    }

    @Override
    public PaymentResponse update(UUID id, PaymentRequest request) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        modelMapper.map(request, payment);
        Payment saved = paymentRepository.save(payment);
        return modelMapper.map(saved, PaymentResponse.class);
    }

    @Override
    public void delete(UUID id) {
        paymentRepository.deleteById(id);
    }
}
