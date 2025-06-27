import { z } from "zod";

export const InvoiceItemSchema = z.object({
  id: z.string(),
  itemName: z.string(),
  hsnCode: z.string(),
  quantity: z.number().min(0.01),
  unit: z.string(),
  rate: z.number().min(0),
  amount: z.number().min(0),
  gstRate: z.number().min(0),
});

export const CustomerSchema = z.object({
  customerId: z.string(),
  companyName: z.string(),
  contactPerson: z.string(),
  gstNumber: z.string(),
  address: z.string(),
  state: z.string(),
  stateCode: z.string(),
});

export const InvoiceSchema = z.object({
  invoiceNumber: z.string(),
  orderNumber: z.string(),
  invoiceDate: z.string(),
  dueDate: z.string(),
  customer: CustomerSchema,
  items: z.array(InvoiceItemSchema).min(1),
  subtotal: z.number().min(0),
  sgst: z.number().min(0),
  cgst: z.number().min(0),
  igst: z.number().min(0),
  totalAmount: z.number().min(0),
  notes: z.string(),
  adjustment: z.number().optional(),
});
