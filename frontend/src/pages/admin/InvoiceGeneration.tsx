import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import InvoiceForm from "@/components/invoices/InvoiceForm";
import InvoiceList from "@/components/invoices/InvoiceList";
import InvoicePreview from "@/components/invoices/InvoicePreview";
import InvoicePDFDocument from "@/components/invoices/InvoicePDFDocument";
import { pdf } from "@react-pdf/renderer";
import { fetchCustomers, createInvoice } from "@/api/invoice";
import { fetchInvoiceById } from "@/api/invoice-details";
import { getInventoryItems } from "@/api/inventory";
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
  adjustment?: number; // Optional adjustment field
}

interface Invoice {
  id: string; // UUID from backend
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
          id: "1",
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
          id: "2",
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

  const handleSaveInvoice = async (invoiceData: InvoiceData) => {
    try {
      // Map frontend items to backend InvoiceItemRequest
      const items = (invoiceData.items || []).map((item) => {
        return {
          itemId: item.id || item.itemId || undefined, // use itemId for backend
          quantity: item.quantity,
          unitPrice: item.rate,
          gstRate: item.gstRate,
          totalPrice: item.amount,
          hsnCode: item.hsnCode,
          description: item.itemName,
        };
      });
      // Prepare payload for backend
      const payload = {
        invoiceNumber: invoiceData.invoiceNumber,
        invoiceDate: invoiceData.invoiceDate,
        dueDate: invoiceData.dueDate,
        customerId: invoiceData.customer?.customerId,
        subtotal: invoiceData.subtotal,
        cgstAmount: invoiceData.cgst,
        sgstAmount: invoiceData.sgst,
        igstAmount: invoiceData.igst,
        totalAmount: invoiceData.totalAmount,
        adjustment: invoiceData.adjustment ?? 0,
        notes: invoiceData.notes,
        status: "draft",
        paymentTerms: "",
        items,
      };
      console.log("Saving invoice with payload:", payload);
      await createInvoice(payload);
      setShowForm(false);
      toast({
        title: "Invoice Created",
        description: `Invoice ${invoiceData.invoiceNumber} has been created successfully and saved to backend.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save invoice to backend.",
        variant: "destructive",
      });
    }
  };

  // Helper to fetch customer by ID
  async function fetchCustomerById(customerId, customers) {
    if (!customers || customers.length === 0) {
      const all = await fetchCustomers();
      return all.find(
        (c) => c.id === customerId || c.customerId === customerId
      );
    }
    return customers.find(
      (c) => c.id === customerId || c.customerId === customerId
    );
  }

  // Helper to fetch items for an invoice (if not included in invoice)
  async function fetchInvoiceItems(invoice) {
    // If invoice.items is present and array, return as is
    if (Array.isArray(invoice.items) && invoice.items.length > 0)
      return invoice.items;
    // Otherwise, try to fetch all inventory items and filter by invoiceId if needed
    // (You may want to replace this with a dedicated endpoint if available)
    return [];
  }

  // Utility: Convert number to words (simple, for rupees)
  function numberToWords(num) {
    if (typeof num !== "number" || isNaN(num)) return "-";
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    function inWords(n) {
      if (n < 20) return a[n];
      if (n < 100)
        return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000)
        return (
          a[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 ? " and " + inWords(n % 100) : "")
        );
      if (n < 100000)
        return (
          inWords(Math.floor(n / 1000)) +
          " Thousand" +
          (n % 1000 ? " " + inWords(n % 1000) : "")
        );
      if (n < 10000000)
        return (
          inWords(Math.floor(n / 100000)) +
          " Lakh" +
          (n % 100000 ? " " + inWords(n % 100000) : "")
        );
      return n.toString();
    }
    return inWords(Math.floor(num)) + " Rupees Only";
  }

  // Map backend invoice + customer + items to InvoicePreviewData
  function mapInvoiceResponseToPreviewData(invoice, customer, items) {
    console.log(items, "Items in preview mapping");

    return {
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: invoice.invoiceDate,
      dueDate: invoice.dueDate,
      customer: customer
        ? {
            customerId: customer.customerId || customer.id,
            companyName: customer.companyName,
            contactPerson: customer.contactPerson || customer.customerName,
            gstNumber: customer.gstNumber,
            address:
              customer.address || (customer.addresses?.[0]?.addressLine1 ?? ""),
            state: customer.state || (customer.addresses?.[0]?.state ?? ""),
            stateCode:
              customer.stateCode || (customer.addresses?.[0]?.stateCode ?? ""),
          }
        : {
            customerId: "",
            companyName: "",
            contactPerson: "",
            gstNumber: "",
            address: "",
            state: "",
            stateCode: "",
          },
      items:
        Array.isArray(items) && items.length > 0
          ? items.map((item) => ({
              id: item.id || item.itemId || "",
              itemName: item.itemName || item.description || "",
              hsnCode: item.hsnCode || "",
              quantity:
                typeof item.quantity === "object" &&
                item.quantity !== null &&
                "toNumber" in item.quantity
                  ? item.quantity.toNumber()
                  : Number(item.quantity) || 0,
              unit: item.unit || "",
              rate:
                typeof item.unitPrice === "object" &&
                item.unitPrice !== null &&
                "toNumber" in item.unitPrice
                  ? item.unitPrice.toNumber()
                  : Number(item.unitPrice) || 0,
              amount:
                typeof item.totalPrice === "object" &&
                item.totalPrice !== null &&
                "toNumber" in item.totalPrice
                  ? item.totalPrice.toNumber()
                  : Number(item.totalPrice) || 0,
            }))
          : [],
      subtotal: Number(invoice.subtotal) || 0,
      sgst: Number(invoice.sgstAmount ?? invoice.sgst ?? 0),
      cgst: Number(invoice.cgstAmount ?? invoice.cgst ?? 0),
      igst: Number(invoice.igstAmount ?? invoice.igst ?? 0),
      totalAmount: Number(invoice.totalAmount) || 0,
      notes: invoice.notes || "",
      adjustment:
        typeof invoice.adjustment === "number"
          ? invoice.adjustment
          : Number(invoice.adjustment) || 0,
      amountInWords: numberToWords(Number(invoice.totalAmount) || 0),
    };
  }

  const handleViewInvoice = async (invoice: Invoice) => {
    console.log("Viewing invoice:", invoice);

    if (invoice.fullData) {
      setPreviewInvoice(invoice.fullData);
      setShowPreview(true);
    } else {
      // Try to fetch full invoice details from backend
      try {
        const data = await fetchInvoiceById(invoice?.id);
        // Fetch customer and items if needed
        console.log("Fetched invoice data:", data);

        const customer = await fetchCustomerById(data.customerId, customers);
        let items = [];
        if (Array.isArray(data.items) && data.items.length > 0) {
          items = data.items;
        } else {
          items = await fetchInvoiceItems(data);
        }
        const previewData = mapInvoiceResponseToPreviewData(
          data,
          customer,
          items
        );
        setPreviewInvoice(previewData);
        setShowPreview(true);
      } catch (err) {
        toast({
          title: "Preview Not Available",
          description: "Complete invoice data not available for preview.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDownloadInvoice = async (invoice: Invoice) => {
    try {
      let invoiceData = invoice.fullData;
      if (!invoiceData) {
        // Fetch full invoice details from backend
        const response = await fetchInvoiceById(invoice.id);
        if (!response || !response.id)
          throw new Error("Invoice data not found");
        // Defensive: ensure customerId exists and fetch customer
        let customer = null;
        if (response.customerId) {
          customer = await fetchCustomerById(response.customerId, customers);
        }
        let items = [];
        if (Array.isArray(response.items) && response.items.length > 0) {
          items = response.items;
        } else {
          items = await fetchInvoiceItems(response);
        }
        invoiceData = mapInvoiceResponseToPreviewData(
          response,
          customer,
          items
        );
      } else if (!invoiceData.customer || !invoiceData.customer.customerId) {
        // Defensive: if fullData exists but is missing customer or customerId, try to fetch
        let customer = null;
        // Try to find customer by customerId (not name)
        if (
          invoiceData.customer &&
          invoiceData.customer.customerId &&
          Array.isArray(customers) &&
          customers.length > 0
        ) {
          customer = customers.find(
            (c) =>
              c.customerId === invoiceData.customer.customerId ||
              c.id === invoiceData.customer.customerId
          );
        }
        invoiceData = { ...invoiceData, customer: customer || {} };
      }
      // Import indianStates dynamically for PDF
      const { indianStates } = await import("@/api/indianStates");
      // Generate PDF using @react-pdf/renderer
      const blob = await pdf(
        <InvoicePDFDocument invoice={invoiceData} indianStates={indianStates} />
      ).toBlob();
      // Trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Invoice-${
        invoiceData.invoiceNumber || invoice.invoiceNumber
      }.pdf`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (err) {
      toast({
        title: "Download Failed",
        description:
          err instanceof Error
            ? err.message
            : "Could not download invoice PDF.",
        variant: "destructive",
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
