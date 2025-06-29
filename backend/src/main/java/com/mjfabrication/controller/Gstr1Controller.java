package com.mjfabrication.controller;

import com.mjfabrication.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.YearMonth;

@RestController
@RequestMapping("/api/v1/gstr1")
public class Gstr1Controller {
    @Autowired
    private InvoiceService invoiceService;

    @GetMapping
    public ResponseEntity<?> getGstr1(
            @RequestParam(value = "month", required = false) Integer month,
            @RequestParam(value = "year", required = false) Integer year
    ) {
        // Default to current month/year if not provided
        YearMonth ym = YearMonth.now();
        int m = (month != null) ? month : ym.getMonthValue();
        int y = (year != null) ? year : ym.getYear();
        // This should return a Map or DTO with GSTR-1 data for the period
        Object gstr1 = invoiceService.getGstr1Json(m, y);
        return ResponseEntity.ok(gstr1);
    }
}