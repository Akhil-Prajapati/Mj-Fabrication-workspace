package com.mjfabrication.payload.response;

import java.util.List;

public class DashboardResponse {
    private List<StatCard> stats;
    private List<InvoiceSummary> recentInvoices;

    public List<StatCard> getStats() { return stats; }
    public void setStats(List<StatCard> stats) { this.stats = stats; }

    public List<InvoiceSummary> getRecentInvoices() { return recentInvoices; }
    public void setRecentInvoices(List<InvoiceSummary> recentInvoices) { this.recentInvoices = recentInvoices; }

    public static class StatCard {
        private String title;
        private String value;
        private String change;
        private String icon;
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getValue() { return value; }
        public void setValue(String value) { this.value = value; }
        public String getChange() { return change; }
        public void setChange(String change) { this.change = change; }
        public String getIcon() { return icon; }
        public void setIcon(String icon) { this.icon = icon; }
    }

    public static class InvoiceSummary {
        private String id;
        private String customer;
        private String amount;
        private String status;
        private String date;
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getCustomer() { return customer; }
        public void setCustomer(String customer) { this.customer = customer; }
        public String getAmount() { return amount; }
        public void setAmount(String amount) { this.amount = amount; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
    }
}
