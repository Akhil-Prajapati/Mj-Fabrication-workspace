package com.mjfabrication.controller;

import com.mjfabrication.payload.response.DashboardResponse;
import com.mjfabrication.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {
    @Autowired
    private InvoiceService invoiceService;

    @GetMapping
    public DashboardResponse getDashboard(
            @RequestParam(value = "month", required = false) Integer month,
            @RequestParam(value = "year", required = false) Integer year
    ) {
        // Default to current month/year if not provided
        YearMonth ym = YearMonth.now();
        int m = (month != null) ? month : ym.getMonthValue();
        int y = (year != null) ? year : ym.getYear();
        return invoiceService.getDashboardStats(m, y);
    }
}
