import { fetcher } from "./fetcher";

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  addressType: string;
}

interface Customer {
  customerId: string;
  customerName: string;
  companyName: string;
  contactPerson: string;
  gstNumber: string;
  addresses: Address[];
  customerType: string;
  createdAt: string;
  updatedAt: string;
}

interface InvoiceResponse {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  subtotal: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalAmount: number;
  paymentTerms: string;
  status: string;
  customerId: string;
  quotationId?: string;
  createdAt: string;
  updatedAt: string;
}

interface InvoiceRequest {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  customerId: string;
  subtotal: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalAmount: number;
  status: string;
  paymentTerms?: string;
}

// Fetch all customers
export const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await fetcher(
      { path: "/api/v1/customers", shouldEncrypt: false, shouldDecrypt: false },
      { method: "GET" }
    );
    return response || [];
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw new Error("Failed to fetch customers");
  }
};

// Fetch all invoices
export const fetchInvoices = async (): Promise<InvoiceResponse[]> => {
  try {
    const response = await fetcher(
      { path: "/api/v1/invoices", shouldEncrypt: false, shouldDecrypt: false },
      { method: "GET" }
    );
    return response || [];
  } catch (error) {
    console.error("Failed to fetch invoices:", error);
    throw new Error("Failed to fetch invoices");
  }
};

// Create a new invoice
export const createInvoice = async (
  invoiceData: InvoiceRequest
): Promise<InvoiceResponse> => {
  try {
    const response = await fetcher(
      { path: "/api/v1/invoices", shouldEncrypt: false, shouldDecrypt: false },
      { method: "POST", json: invoiceData }
    );
    return response;
  } catch (error) {
    console.error("Failed to create invoice:", error);
    throw new Error("Failed to create invoice");
  }
};

// Update an invoice
export const updateInvoice = async (
  id: string,
  invoiceData: InvoiceRequest
): Promise<InvoiceResponse> => {
  try {
    const response = await fetcher(
      {
        path: `/api/v1/invoices/${id}`,
        shouldEncrypt: false,
        shouldDecrypt: false,
      },
      { method: "PUT", json: invoiceData }
    );
    return response;
  } catch (error) {
    console.error("Failed to update invoice:", error);
    throw new Error("Failed to update invoice");
  }
};

// Delete an invoice
export const deleteInvoice = async (id: string): Promise<void> => {
  try {
    await fetcher(
      {
        path: `/api/v1/invoices/${id}`,
        shouldEncrypt: false,
        shouldDecrypt: false,
      },
      { method: "DELETE" }
    );
  } catch (error) {
    console.error("Failed to delete invoice:", error);
    throw new Error("Failed to delete invoice");
  }
};
