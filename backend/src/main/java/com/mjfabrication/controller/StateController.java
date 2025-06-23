package com.mjfabrication.controller;

import com.mjfabrication.payload.request.StateRequest;
import com.mjfabrication.payload.response.StateResponse;
import com.mjfabrication.service.StateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/states")
@RequiredArgsConstructor
public class StateController {
    private final StateService stateService;

    @GetMapping
    public List<StateResponse> getAll() {
        return stateService.getAll();
    }

    @GetMapping("/{stateCode}")
    public ResponseEntity<StateResponse> getByCode(@PathVariable String stateCode) {
        return ResponseEntity.ok(stateService.getByCode(stateCode));
    }

    @PostMapping
    public ResponseEntity<StateResponse> create(@Valid @RequestBody StateRequest request) {
        return ResponseEntity.ok(stateService.create(request));
    }

    @PutMapping("/{stateCode}")
    public ResponseEntity<StateResponse> update(@PathVariable String stateCode, @Valid @RequestBody StateRequest request) {
        return ResponseEntity.ok(stateService.update(stateCode, request));
    }

    @DeleteMapping("/{stateCode}")
    public ResponseEntity<Void> delete(@PathVariable String stateCode) {
        stateService.delete(stateCode);
        return ResponseEntity.noContent().build();
    }
}
