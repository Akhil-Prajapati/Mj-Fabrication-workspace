package com.mjfabrication.service.impl;

import com.mjfabrication.entity.Invoice;
import com.mjfabrication.entity.InvoiceItem;
import com.mjfabrication.entity.Customer;
import com.mjfabrication.entity.Quotation;
import com.mjfabrication.entity.InvoiceSequence;
import com.mjfabrication.enums.InvoiceStatus;
import com.mjfabrication.payload.request.InvoiceItemRequest;
import com.mjfabrication.payload.request.InvoiceRequest;
import com.mjfabrication.payload.response.InvoiceItemResponse;
import com.mjfabrication.payload.response.InvoiceResponse;
import com.mjfabrication.payload.response.DashboardResponse;
import com.mjfabrication.repository.InvoiceItemRepository;
import com.mjfabrication.repository.InvoiceRepository;
import com.mjfabrication.repository.CustomerRepository;
import com.mjfabrication.repository.QuotationRepository;
import com.mjfabrication.repository.InvoiceSequenceRepository;
import com.mjfabrication.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final InvoiceItemRepository invoiceItemRepository;
    private final CustomerRepository customerRepository;
    private final QuotationRepository quotationRepository;
    private final InvoiceSequenceRepository invoiceSequenceRepository;
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
        InvoiceResponse response = modelMapper.map(invoice, InvoiceResponse.class);

        // Fetch and set items for this invoice
        List<InvoiceItemResponse> itemResponses = invoiceItemRepository.findAll().stream()
            .filter(i -> i.getInvoice().getId().equals(invoice.getId()))
            .map(i -> modelMapper.map(i, InvoiceItemResponse.class))
            .collect(Collectors.toList());
        response.setItems(itemResponses);

        return response;
    }

    @Override
    @Transactional
    public InvoiceResponse create(InvoiceRequest request) {
        // Only map allowed fields, not id/customerId/quotationId
        Invoice invoice = new Invoice();
        invoice.setSubtotal(request.getSubtotal());
        invoice.setCgstAmount(request.getCgstAmount());
        invoice.setSgstAmount(request.getSgstAmount());
        invoice.setIgstAmount(request.getIgstAmount());
        invoice.setTotalAmount(request.getTotalAmount());
        invoice.setPaymentTerms(request.getPaymentTerms());
        invoice.setStatus(request.getStatus() != null ? InvoiceStatus.valueOf(request.getStatus().toUpperCase()) : InvoiceStatus.DRAFT);
        invoice.setAdjustment(request.getAdjustment());
        invoice.setNotes(request.getNotes());
        // Generate invoice number if not provided
        String prefix = "INV";
        String fy = getCurrentFinancialYear();
        boolean generatedInvoiceNumber = false;
        if (request.getInvoiceNumber() == null || request.getInvoiceNumber().isEmpty() || request.getInvoiceNumber().equals("INV-")) {
            InvoiceSequence seq = invoiceSequenceRepository.findByPrefixAndFinancialYear(prefix, fy)
                .orElseGet(() -> {
                    InvoiceSequence s = new InvoiceSequence();
                    s.setPrefix(prefix);
                    s.setFinancialYear(fy);
                    s.setCurrentNumber(0);
                    s.setCreatedAt(LocalDateTime.now());
                    s.setUpdatedAt(LocalDateTime.now());
                    return invoiceSequenceRepository.save(s);
                });
            int nextNum = seq.getCurrentNumber() + 1;
            seq.setCurrentNumber(nextNum);
            seq.setUpdatedAt(LocalDateTime.now());
            invoiceSequenceRepository.save(seq);
            String invoiceNumber = String.format("%s-%s-%04d", prefix, fy, nextNum);
            invoice.setInvoiceNumber(invoiceNumber);
            generatedInvoiceNumber = true;
        } else {
            invoice.setInvoiceNumber(request.getInvoiceNumber());
        }
        // Always update invoice sequence for every new invoice
        InvoiceSequence seq = invoiceSequenceRepository.findByPrefixAndFinancialYear(prefix, fy)
            .orElseGet(() -> {
                InvoiceSequence s = new InvoiceSequence();
                s.setPrefix(prefix);
                s.setFinancialYear(fy);
                s.setCurrentNumber(0);
                s.setCreatedAt(LocalDateTime.now());
                s.setUpdatedAt(LocalDateTime.now());
                return invoiceSequenceRepository.save(s);
            });
        int nextNum = seq.getCurrentNumber() + 1;
        seq.setCurrentNumber(nextNum);
        seq.setUpdatedAt(LocalDateTime.now());
        invoiceSequenceRepository.save(seq);

        invoice.setInvoiceDate(request.getInvoiceDate());
        invoice.setDueDate(request.getDueDate());
        // Manually set Customer and Quotation
        if (request.getCustomerId() != null) {
            Customer customer = customerRepository.findById(UUID.fromString(request.getCustomerId()))
                .orElseThrow(() -> new RuntimeException("Customer not found"));
            invoice.setCustomer(customer);
        }
        if (request.getQuotationId() != null && !request.getQuotationId().isEmpty()) {
            Quotation quotation = quotationRepository.findById(UUID.fromString(request.getQuotationId()))
                .orElse(null);
            invoice.setQuotation(quotation);
        }
        invoice.setCreatedAt(LocalDateTime.now());
        invoice.setUpdatedAt(LocalDateTime.now());
        Invoice saved = invoiceRepository.save(invoice);

        // Save invoice items
        if (request.getItems() != null && !request.getItems().isEmpty()) {
            List<InvoiceItem> itemsToSave = request.getItems().stream()
                .filter(itemReq -> itemReq.getItemId() != null && !itemReq.getItemId().isEmpty())
                .map(itemReq -> {
                    InvoiceItem item = new InvoiceItem();
                    item.setInvoice(saved);
                    item.setItemId(itemReq.getItemId());
                    item.setQuantity(itemReq.getQuantity());
                    item.setUnitPrice(itemReq.getUnitPrice());
                    item.setGstRate(itemReq.getGstRate());
                    item.setTotalPrice(itemReq.getTotalPrice());
                    item.setHsnCode(itemReq.getHsnCode());
                    item.setDescription(itemReq.getDescription());
                    return item;
                })
                .collect(Collectors.toList());
            if (!itemsToSave.isEmpty()) {
                invoiceItemRepository.saveAll(itemsToSave);
            } else {
                System.out.println("No valid invoice items to save for invoice: " + saved.getInvoiceNumber());
            }
        } else {
            System.out.println("No items received in invoice request for invoice: " + invoice.getInvoiceNumber());
        }
        // TODO: Add logic for invoice_sequences if required by your business rules

        InvoiceResponse response = modelMapper.map(saved, InvoiceResponse.class);
        // Attach items to response
        if (request.getItems() != null) {
            List<InvoiceItemResponse> itemResponses = invoiceItemRepository.findAll().stream()
                .filter(i -> i.getInvoice().getId().equals(saved.getId()))
                .map(i -> modelMapper.map(i, InvoiceItemResponse.class))
                .collect(Collectors.toList());
            response.setItems(itemResponses);
        }
        return response;
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

    @Override
    public DashboardResponse getDashboardStats(int month, int year) {
        DashboardResponse resp = new DashboardResponse();
        // Get all invoices for the month/year
        List<Invoice> invoices = invoiceRepository.findAll().stream()
            .filter(inv -> inv.getInvoiceDate() != null &&
                inv.getInvoiceDate().getMonthValue() == month &&
                inv.getInvoiceDate().getYear() == year)
            .collect(Collectors.toList());
        // Stats
        int totalInvoices = invoices.size();
        double totalAmount = invoices.stream().mapToDouble(inv -> inv.getTotalAmount() != null ? inv.getTotalAmount().doubleValue() : 0).sum();
        double paidAmount = invoices.stream().filter(inv -> inv.getStatus() == InvoiceStatus.PAID).mapToDouble(inv -> inv.getTotalAmount() != null ? inv.getTotalAmount().doubleValue() : 0).sum();
        double overdueAmount = invoices.stream().filter(inv -> inv.getStatus() == InvoiceStatus.OVERDUE).mapToDouble(inv -> inv.getTotalAmount() != null ? inv.getTotalAmount().doubleValue() : 0).sum();
        // Previous month for change
        int prevMonth = month == 1 ? 12 : month - 1;
        int prevYear = month == 1 ? year - 1 : year;
        List<Invoice> prevInvoices = invoiceRepository.findAll().stream()
            .filter(inv -> inv.getInvoiceDate() != null &&
                inv.getInvoiceDate().getMonthValue() == prevMonth &&
                inv.getInvoiceDate().getYear() == prevYear)
            .collect(Collectors.toList());
        int prevTotalInvoices = prevInvoices.size();
        double prevTotalAmount = prevInvoices.stream().mapToDouble(inv -> inv.getTotalAmount() != null ? inv.getTotalAmount().doubleValue() : 0).sum();
        // Stat cards
        DashboardResponse.StatCard totalInvCard = new DashboardResponse.StatCard();
        totalInvCard.setTitle("Total Invoices");
        totalInvCard.setValue(String.valueOf(totalInvoices));
        totalInvCard.setChange((totalInvoices - prevTotalInvoices) + "");
        totalInvCard.setIcon("FileText");
        DashboardResponse.StatCard totalAmtCard = new DashboardResponse.StatCard();
        totalAmtCard.setTitle("Total Amount");
        totalAmtCard.setValue(String.format("%.2f", totalAmount));
        totalAmtCard.setChange(String.format("%.2f", totalAmount - prevTotalAmount));
        totalAmtCard.setIcon("Package");
        DashboardResponse.StatCard paidAmtCard = new DashboardResponse.StatCard();
        paidAmtCard.setTitle("Paid Amount");
        paidAmtCard.setValue(String.format("%.2f", paidAmount));
        paidAmtCard.setChange("-");
        paidAmtCard.setIcon("Check");
        DashboardResponse.StatCard overdueAmtCard = new DashboardResponse.StatCard();
        overdueAmtCard.setTitle("Overdue Amount");
        overdueAmtCard.setValue(String.format("%.2f", overdueAmount));
        overdueAmtCard.setChange("-");
        overdueAmtCard.setIcon("AlertTriangle");
        resp.setStats(List.of(totalInvCard, totalAmtCard, paidAmtCard, overdueAmtCard));
        // Recent invoices (last 5)
        List<DashboardResponse.InvoiceSummary> recent = invoices.stream()
            .sorted((a, b) -> b.getInvoiceDate().compareTo(a.getInvoiceDate()))
            .limit(5)
            .map(inv -> {
                DashboardResponse.InvoiceSummary sum = new DashboardResponse.InvoiceSummary();
                sum.setId(inv.getId().toString());
                sum.setCustomer(inv.getCustomer() != null ? inv.getCustomer().getCompanyName() : "");
                sum.setAmount(inv.getTotalAmount() != null ? inv.getTotalAmount().toString() : "0");
                sum.setStatus(inv.getStatus() != null ? inv.getStatus().name() : "");
                sum.setDate(inv.getInvoiceDate() != null ? inv.getInvoiceDate().toString() : "");
                return sum;
            })
            .collect(Collectors.toList());
        resp.setRecentInvoices(recent);
        return resp;
    }

    @Override
    public Object getGstr1Json(int month, int year) {
        List<Invoice> invoices = invoiceRepository.findByMonthAndYear(month, year);
        Map<String, Object> gstr1 = new HashMap<>();
        gstr1.put("gstin", "YOUR_GSTIN"); // TODO: Replace with your GSTIN or fetch from config
        gstr1.put("fp", String.format("%02d%04d", month, year));
        gstr1.put("gt", 0); // Gross Turnover (fill as needed)
        gstr1.put("cur_gt", 0); // Current Gross Turnover (fill as needed)

        // B2B Section
        Map<String, List<Invoice>> b2bMap = new HashMap<>();
        for (Invoice inv : invoices) {
            String ctin = inv.getCustomer().getGstNumber();
            if (ctin == null || ctin.isEmpty()) continue;
            b2bMap.computeIfAbsent(ctin, k -> new ArrayList<>()).add(inv);
        }
        List<Map<String, Object>> b2b = new ArrayList<>();
        for (Map.Entry<String, List<Invoice>> entry : b2bMap.entrySet()) {
            Map<String, Object> b2bEntry = new HashMap<>();
            b2bEntry.put("ctin", entry.getKey());
            List<Map<String, Object>> invList = new ArrayList<>();
            for (Invoice inv : entry.getValue()) {
                Map<String, Object> invMap = new HashMap<>();
                invMap.put("inum", inv.getInvoiceNumber());
                invMap.put("idt", inv.getInvoiceDate().format(java.time.format.DateTimeFormatter.ofPattern("dd-MM-yyyy")));
                invMap.put("val", inv.getTotalAmount());
                invMap.put("pos", inv.getCustomer().getStateCode());
                invMap.put("rchrg", "N");
                invMap.put("inv_typ", "R");
                List<Map<String, Object>> itms = new ArrayList<>();
                int itemNum = 1;
                List<InvoiceItem> items = invoiceItemRepository.findAll().stream()
                    .filter(i -> i.getInvoice().getId().equals(inv.getId()))
                    .collect(Collectors.toList());
                for (InvoiceItem item : items) {
                    Map<String, Object> itm = new HashMap<>();
                    itm.put("num", itemNum++);
                    Map<String, Object> itmDet = new HashMap<>();
                    itmDet.put("rt", item.getGstRate());
                    itmDet.put("txval", item.getTotalPrice().subtract(inv.getCgstAmount()).subtract(inv.getSgstAmount()).subtract(inv.getIgstAmount()));
                    itmDet.put("camt", inv.getCgstAmount());
                    itmDet.put("samt", inv.getSgstAmount());
                    itmDet.put("iamt", inv.getIgstAmount());
                    itmDet.put("csamt", 0);
                    itm.put("itm_det", itmDet);
                    itms.add(itm);
                }
                invMap.put("itms", itms);
                invList.add(invMap);
            }
            b2bEntry.put("inv", invList);
            b2b.add(b2bEntry);
        }
        gstr1.put("b2b", b2b);

        // HSN Section
        Map<String, Object> hsn = new HashMap<>();
        List<Map<String, Object>> hsnData = new ArrayList<>();
        int hsnNum = 1;
        for (Invoice inv : invoices) {
            List<InvoiceItem> items = invoiceItemRepository.findAll().stream()
                .filter(i -> i.getInvoice().getId().equals(inv.getId()))
                .collect(Collectors.toList());
            for (InvoiceItem item : items) {
                Map<String, Object> hsnEntry = new HashMap<>();
                hsnEntry.put("num", hsnNum++);
                hsnEntry.put("hsn_sc", item.getHsnCode());
                hsnEntry.put("uqc", "NOS");
                hsnEntry.put("qty", item.getQuantity());
                hsnEntry.put("rt", item.getGstRate());
                hsnEntry.put("txval", item.getTotalPrice());
                hsnEntry.put("iamt", inv.getIgstAmount());
                hsnEntry.put("camt", inv.getCgstAmount());
                hsnEntry.put("samt", inv.getSgstAmount());
                hsnEntry.put("csamt", 0);
                hsnData.add(hsnEntry);
            }
        }
        hsn.put("data", hsnData);
        gstr1.put("hsn", hsn);
        return gstr1;
    }

    // Helper method
    private String getCurrentFinancialYear() {
        java.time.LocalDate now = java.time.LocalDate.now();
        int year = now.getMonthValue() >= 4 ? now.getYear() : now.getYear() - 1;
        int nextYear = year + 1;
        return String.format("%d-%02d", year, nextYear % 100);
    }
}
