import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import InvoiceForm from "@/components/invoices/InvoiceForm";
import InvoiceList from "@/components/invoices/InvoiceList";
import InvoicePreview from "@/components/invoices/InvoicePreview";
import { fetchCustomers } from "@/api/invoice";
import { useUserStore } from "@/stores/user-store";

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  customer: any;
  items: any[];
  subtotal: number;
  sgst: number;
  cgst: number;
  igst: number;
  totalAmount: number;
  notes: string;
}

interface Invoice {
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  totalAmount: number;
  status: "draft" | "sent" | "paid" | "overdue";
  dueDate: string;
  fullData?: InvoiceData; // Store complete invoice data for preview
}

const InvoiceGeneration = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState<InvoiceData | null>(
    null
  );
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const selectedCustomerId = useUserStore((state) => state.selectedCustomerId);

  function mapCustomer(raw) {
    const address =
      raw.addresses && raw.addresses.length > 0 ? raw.addresses[0] : {};
    return {
      customerId: raw.id,
      companyName: raw.companyName,
      contactPerson: raw.customerName,
      gstNumber: raw.gstNumber,
      address: address.addressLine1 || "",
      state: address.state || "",
      stateCode: raw.stateCode || "",
    };
  }

  useEffect(() => {
    setLoading(true);
    fetchCustomers()
      .then((data) => setCustomers(data.map(mapCustomer)))
      .finally(() => setLoading(false));

    // Load saved invoices
    const savedInvoices = localStorage.getItem("invoices");
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
    } else {
      // Sample data with enhanced structure
      const sampleInvoices: Invoice[] = [
        {
          invoiceNumber: "INV-001",
          invoiceDate: "2024-01-15",
          customerName: "ABC Construction Ltd",
          totalAmount: 45000,
          status: "paid",
          dueDate: "2024-02-15",
          fullData: {
            invoiceNumber: "INV-001",
            invoiceDate: "2024-01-15",
            dueDate: "2024-02-15",
            customer: {
              customerId: "CUST-001",
              companyName: "ABC Construction Ltd",
              contactPerson: "Rajesh Kumar",
              gstNumber: "29ABCDE1234F1Z5",
              address: "123 Industrial Area, Sector 15, Gurgaon",
              state: "Haryana",
              stateCode: "06",
            },
            items: [
              {
                id: "1",
                itemName: "Fabricated Bracket",
                hsnCode: "73089090",
                quantity: 7,
                unit: "Pieces",
                rate: 730,
                amount: 5110,
              },
            ],
            subtotal: 5110,
            sgst: 459.9,
            cgst: 459.9,
            igst: 0,
            totalAmount: 6029.8,
            notes: "Thank you for your business!",
          },
        },
        {
          invoiceNumber: "INV-002",
          invoiceDate: "2024-01-20",
          customerName: "XYZ Builders Pvt Ltd",
          totalAmount: 32000,
          status: "sent",
          dueDate: "2024-02-20",
        },
      ];
      setInvoices(sampleInvoices);
      localStorage.setItem("invoices", JSON.stringify(sampleInvoices));
    }
  }, [navigate]);

  // Select customer from store if present
  useEffect(() => {
    if (selectedCustomerId && customers.length > 0) {
      const found = customers.find((c) => c.customerId === selectedCustomerId);
      if (found) setSelectedCustomer(found);
    }
  }, [selectedCustomerId, customers]);

  // Open form by default if a customer is pre-selected from store
  useEffect(() => {
    if (selectedCustomerId && customers.length > 0) {
      setShowForm(true);
    }
  }, [selectedCustomerId, customers]);

  const handleSaveInvoice = (invoiceData: InvoiceData) => {
    const newInvoice: Invoice = {
      invoiceNumber: invoiceData.invoiceNumber,
      invoiceDate: invoiceData.invoiceDate,
      customerName: invoiceData.customer?.companyName || "Unknown Customer",
      totalAmount: invoiceData.totalAmount,
      status: "draft",
      dueDate: invoiceData.dueDate,
      fullData: invoiceData,
    };

    const updatedInvoices = [...invoices, newInvoice];
    setInvoices(updatedInvoices);
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    setShowForm(false);

    toast({
      title: "Invoice Created",
      description: `Invoice ${newInvoice.invoiceNumber} has been created successfully.`,
    });
  };

  const handleViewInvoice = (invoice: Invoice) => {
    if (invoice.fullData) {
      setPreviewInvoice(invoice.fullData);
      setShowPreview(true);
    } else {
      toast({
        title: "Preview Not Available",
        description: "Complete invoice data not available for preview.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    if (invoice.fullData) {
      setPreviewInvoice(invoice.fullData);
      setShowPreview(true);
    } else {
      toast({
        title: "Download Invoice",
        description: `Downloading invoice ${invoice.invoiceNumber} as PDF`,
      });
    }
  };

  const handleDownloadPDF = () => {
    // This would integrate with a PDF generation library like jsPDF or html2pdf
    toast({
      title: "PDF Download",
      description: "PDF download functionality would be implemented here",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Invoice Generation
          </h1>
          <p className="text-gray-600 mt-1">
            Create and manage GST-compliant invoices
          </p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>Create New Invoice</Button>
        )}
      </div>

      {showForm ? (
        <InvoiceForm
          onSave={handleSaveInvoice}
          onCancel={() => setShowForm(false)}
          customers={customers}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
          loading={loading}
        />
      ) : (
        <InvoiceList
          invoices={invoices}
          onView={handleViewInvoice}
          onDownload={handleDownloadInvoice}
        />
      )}

      {showPreview && previewInvoice && (
        <InvoicePreview
          invoice={previewInvoice}
          onClose={() => setShowPreview(false)}
          onDownload={handleDownloadPDF}
        />
      )}
    </div>
  );
};

export default InvoiceGeneration;
