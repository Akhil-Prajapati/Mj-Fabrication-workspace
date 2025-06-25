import { z } from "zod";

// Add all backend enum values for customerType
const customerTypeOptions = [
  "REGISTERED",
  "UNREGISTERED",
  "REGULAR",
  "PREMIUM",
  "WHOLESALE",
  "CORPORATE",
] as const;

export const customerSchema = z.object({
  customerName: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone is required").max(15, "Phone too long"),
  gstNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9A-Z]{15}$/.test(val), {
      message: "GST number must be 15 alphanumeric characters",
    }),
  type: z.enum(["registered", "unregistered"]),
  customerType: z.enum(customerTypeOptions), // Add customerType validation
  stateCode: z.string().min(2, "State is required"),
  addresses: z
    .array(
      z.object({
        addressLine1: z.string().min(2, "Address Line 1 is required"),
        addressLine2: z.string().optional(),
        city: z.string().min(2, "City is required"),
        state: z.string().min(2, "State is required"),
        pincode: z.string().min(4, "Pincode is required").max(10),
        isDefault: z.boolean(),
        addressType: z.enum(["BILLING", "SHIPPING", "OTHER"]),
      })
    )
    .min(1, "At least one address is required"),
  companyName: z.string().max(100, "Company name too long").optional(),
});

export type CustomerFormType = z.infer<typeof customerSchema>;
