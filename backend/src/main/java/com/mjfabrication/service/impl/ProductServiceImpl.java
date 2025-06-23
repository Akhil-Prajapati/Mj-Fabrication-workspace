package com.mjfabrication.service.impl;

import com.mjfabrication.entity.Product;
import com.mjfabrication.payload.request.ProductRequest;
import com.mjfabrication.payload.response.ProductResponse;
import com.mjfabrication.repository.ProductRepository;
import com.mjfabrication.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<ProductResponse> getAll() {
        return productRepository.findAll().stream()
                .map(p -> modelMapper.map(p, ProductResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponse getById(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return modelMapper.map(product, ProductResponse.class);
    }

    @Override
    public ProductResponse create(ProductRequest request) {
        Product product = modelMapper.map(request, Product.class);
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        Product saved = productRepository.save(product);
        return modelMapper.map(saved, ProductResponse.class);
    }

    @Override
    public ProductResponse update(UUID id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        modelMapper.map(request, product);
        product.setUpdatedAt(LocalDateTime.now());
        Product saved = productRepository.save(product);
        return modelMapper.map(saved, ProductResponse.class);
    }

    @Override
    public void delete(UUID id) {
        productRepository.deleteById(id);
    }
}
