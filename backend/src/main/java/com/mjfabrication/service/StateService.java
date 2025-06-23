package com.mjfabrication.service;

import com.mjfabrication.payload.request.StateRequest;
import com.mjfabrication.payload.response.StateResponse;
import java.util.List;

public interface StateService {
    List<StateResponse> getAll();
    StateResponse getByCode(String stateCode);
    StateResponse create(StateRequest request);
    StateResponse update(String stateCode, StateRequest request);
    void delete(String stateCode);
}
