package com.mjfabrication.service.impl;

import com.mjfabrication.entity.State;
import com.mjfabrication.payload.request.StateRequest;
import com.mjfabrication.payload.response.StateResponse;
import com.mjfabrication.repository.StateRepository;
import com.mjfabrication.service.StateService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StateServiceImpl implements StateService {
    private final StateRepository stateRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<StateResponse> getAll() {
        return stateRepository.findAll().stream()
                .map(s -> modelMapper.map(s, StateResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public StateResponse getByCode(String stateCode) {
        State state = stateRepository.findById(stateCode)
                .orElseThrow(() -> new RuntimeException("State not found"));
        return modelMapper.map(state, StateResponse.class);
    }

    @Override
    public StateResponse create(StateRequest request) {
        State state = modelMapper.map(request, State.class);
        State saved = stateRepository.save(state);
        return modelMapper.map(saved, StateResponse.class);
    }

    @Override
    public StateResponse update(String stateCode, StateRequest request) {
        State state = stateRepository.findById(stateCode)
                .orElseThrow(() -> new RuntimeException("State not found"));
        modelMapper.map(request, state);
        State saved = stateRepository.save(state);
        return modelMapper.map(saved, StateResponse.class);
    }

    @Override
    public void delete(String stateCode) {
        stateRepository.deleteById(stateCode);
    }
}
