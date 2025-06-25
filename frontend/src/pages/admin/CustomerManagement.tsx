import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { Search } from "lucide-react";
import { fetcher } from "@/api/fetcher";
import { StateDropdown } from "@/components/state";
import { customerSchema } from "./customerSchema";
import { z } from "zod";
import { NinjaTable } from "@/components/NinjaTable";
import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { getStates } from "@/api/state";

interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  addressType: "BILLING" | "SHIPPING" | "OTHER";
}

interface Customer {
  id: number | string;
  customerName: string;
  companyName?: string;
  email: string;
  phone: string;
  gstNumber: string;
  address: string;
  type: "registered" | "unregistered";
  customerType?: "registered" | "unregistered"; // Ensure customerType is present
  createdAt: string;
  stateCode?: string;
  addresses?: Address[];
}

const CustomerManagement = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [addressType, setAddressType] = useState<
    "BILLING" | "SHIPPING" | "OTHER"
  >("BILLING");
  // Add stateCode and customerType to formData
  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "",
    email: "",
    phone: "",
    gstNumber: "",
    address: "",
    type: "unregistered" as "registered" | "unregistered",
    customerType: "UNREGISTERED" as CustomerTypeOption,
    stateCode: "", // new field
  });
  const [addressForm, setAddressForm] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: true,
    addressType: "BILLING" as "BILLING" | "SHIPPING" | "OTHER",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [stateList, setStateList] = useState<
    { stateCode: string; stateName: string }[]
  >([]);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    // Fetch state list for code-name mapping
    getStates().then((data) => {
      let stateList = data;
      if (Array.isArray(data)) {
        stateList = data;
      } else if (data.states && Array.isArray(data.states)) {
        stateList = data.states;
      } else if (data.data && Array.isArray(data.data)) {
        stateList = data.data;
      }
      setStateList(stateList);
    });
    // Fetch customers from backend
    fetcher({ path: "/api/v1/customers" }, { method: "GET" })
      .then((data: any[]) => {
        const mapped = data.map((saved) => {
          console.log(saved);

          let type: "registered" | "unregistered" = "unregistered";
          let customerType: "registered" | "unregistered" = "unregistered";
          if (
            saved.customerType?.toLowerCase() === "registered" ||
            saved.type === "registered"
          ) {
            type = "registered";
            customerType = "registered";
          }
          return {
            id: saved.id || saved.customerId || Date.now() + Math.random(),
            customerName: saved.name || saved.customerName || "",
            email: saved.email || "",
            phone: saved.phone || "",
            gstNumber: saved.gstNumber || "",
            address:
              saved.address ||
              (saved.addresses && saved.addresses[0]?.addressLine1) ||
              "",
            type,
            customerType, // Always set customerType
            createdAt: saved.createdAt || new Date().toISOString(),
            stateCode: saved.stateCode || "",
            addresses: saved.addresses || [],
            companyName: saved.companyName || "", // Map companyName
          };
        });
        setCustomers(mapped);
      })
      .catch(() => setCustomers([]));
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Build the object to validate
    const validateObj = {
      customerName: formData.customerName,
      companyName: formData.companyName ?? "", // Always send as string
      email: formData.email,
      phone: formData.phone,
      gstNumber: formData.gstNumber,
      address: formData.address,
      type: formData.type,
      customerType: formData.customerType, // Use dropdown value
      stateCode: formData.stateCode,
      addresses: [
        {
          addressLine1: addressForm.addressLine1,
          addressLine2: addressForm.addressLine2,
          city: addressForm.city,
          state: addressForm.state || formData.stateCode,
          pincode: addressForm.pincode,
          isDefault: addressForm.isDefault,
          addressType: addressForm.addressType,
        },
      ],
    };
    // Validate with zod
    const result = customerSchema.safeParse(validateObj);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          errors[err.path.join(".")] = err.message;
        }
      });
      setFormErrors(errors);
      toast({
        title: "Validation Error",
        description: Object.values(errors).join("; "),
        variant: "destructive",
      });
      return;
    }
    setFormErrors({});
    try {
      const saved = await fetcher(
        { path: "/api/v1/customers" },
        { method: "POST", json: validateObj }
      );
      // Map backend response to frontend Customer type
      const mappedCustomer: Customer = {
        id: saved.id || saved.customerId || Date.now(),
        customerName: saved.name || saved.customerName || "",
        companyName: saved.companyName || "",
        email: saved.email || "",
        phone: saved.phone || "",
        gstNumber: saved.gstNumber || "",
        address:
          saved.address ||
          (saved.addresses && saved.addresses[0]?.addressLine1) ||
          "",
        type:
          saved.customerType?.toLowerCase() === "registered" ||
          saved.type === "registered"
            ? "registered"
            : "unregistered",
        customerType:
          saved.customerType?.toLowerCase() === "registered" ||
          saved.type === "registered"
            ? "registered"
            : "unregistered",
        createdAt: saved.createdAt || new Date().toISOString(),
        stateCode: saved.stateCode || "",
        addresses: saved.addresses || [],
      };
      setCustomers((prev) => [...prev, mappedCustomer]);
      toast({
        title: "Customer Added",
        description: "Customer has been successfully added to the database.",
      });
      setFormData({
        customerName: "",
        companyName: "",
        email: "",
        phone: "",
        gstNumber: "",
        address: "",
        type: "unregistered",
        customerType: "UNREGISTERED",
        stateCode: "",
      });
      setAddressForm({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        isDefault: true,
        addressType: "BILLING",
      });
      setShowAddForm(false);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add customer.",
        variant: "destructive",
      });
    }
  };

  // Mock GST API fetch function (replace with your real API call)
  async function fetchGSTDetails(gstNumber: string) {
    // Example: Replace with your real GST API endpoint and key
    // const response = await fetch(`https://api.example.com/gst/${gstNumber}`);
    // if (!response.ok) throw new Error("GST number not found");
    // return response.json();
    // Mocked response for demo:
    if (gstNumber === "") throw new Error("GST number not found");
    return {
      primaryContact: {
        salutation: "Mr.",
        firstName: "Amit",
        lastName: "Shah",
      },
      companyName: "Amit Engineering Pvt Ltd",
      contactEmail: "amit@company.com",
      contactPhone: "9876543210",
      billingAddress: "123, Industrial Area, Mumbai, MH",
      shippingAddress: "456, Export Zone, Mumbai, MH",
      gstNumber: gstNumber,
      paymentTerms: "Net 30",
      gstTreatment: "Regular",
      placeOfSupply: "Maharashtra",
    };
  }

  // Handler for GST number blur
  const handleGSTBlur = async () => {
    if (!formData.gstNumber) return;
    try {
      const data = await fetchGSTDetails(formData.gstNumber);
      setFormData((prev) => ({
        ...prev,
        customerName:
          (data.primaryContact?.firstName || "") +
            (data.primaryContact?.lastName
              ? " " + data.primaryContact.lastName
              : "") || prev.customerName,
        email: data.contactEmail || prev.email,
        phone: data.contactPhone || prev.phone,
        address: data.billingAddress || prev.address,
        // You can add more fields here as needed
      }));
      toast({
        title: "GST Details Fetched",
        description: "Company details have been auto-filled.",
      });
    } catch {
      toast({
        title: "GST Lookup Failed",
        description: "Could not fetch details for this GST number.",
        variant: "destructive",
      });
    }
  };

  // GST validation regex: 15 chars, uppercase letters and digits only
  const gstRegex = /^[0-9A-Z]{15}$/;

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  // Columns for NinjaTable
  const columns = [
    {
      Header: "Name",
      accessor: "customerName",
    },
    {
      Header: "Company Name",
      accessor: "companyName",
      Cell: ({ row }: any) => (
        <span
          style={{
            color: "#3182ce",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => {
            setSelectedCustomer(row.original);
            onOpen();
          }}
        >
          {row.original.companyName}
        </span>
      ),
    }, // New column
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },
    { Header: "GST Number", accessor: "gstNumber" },
    { Header: "Type", accessor: "type" },
    {
      Header: "State Code",
      accessor: "stateCode",
      Cell: ({ value }: any) => {
        const state = stateList.find((s) => s.stateCode === value);
        return state ? `${state.stateCode} - ${state.stateName}` : value;
      },
    },
    {
      Header: "Created At",
      accessor: "createdAt",
      Cell: ({ value }: any) => {
        const date = new Date(value);
        const formatted = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        return <span>{formatted}</span>;
      },
    },
  ];

  // Add customer type options matching backend enum
  const customerTypeOptions = [
    "REGISTERED",
    "UNREGISTERED",
    "REGULAR",
    "PREMIUM",
    "WHOLESALE",
    "CORPORATE",
  ] as const;
  type CustomerTypeOption = (typeof customerTypeOptions)[number];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Customer Management
        </h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Cancel" : "Add New Customer"}
        </Button>
      </div>

      {/* Add Customer Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        customerName: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        companyName: e.target.value,
                      }));
                    }}
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="gstNumber"
                      type="text"
                      value={formData.gstNumber}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase();
                        // Only allow alphanumeric and max 15 chars
                        if (/^[0-9A-Z]*$/.test(value) && value.length <= 15) {
                          setFormData((prev) => ({
                            ...prev,
                            gstNumber: value,
                            type: value ? "registered" : "unregistered",
                          }));
                        }
                      }}
                      placeholder="Enter GST number if registered"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGSTBlur}
                      disabled={!gstRegex.test(formData.gstNumber)}
                    >
                      Fetch GST Details
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="stateCode">State *</Label>
                <StateDropdown
                  value={formData.stateCode}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, stateCode: val }))
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="customerType">Customer Type *</Label>
                <select
                  id="customerType"
                  value={formData.customerType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customerType: e.target.value as CustomerTypeOption,
                    }))
                  }
                  className="block w-full border rounded px-2 py-1"
                  required
                >
                  {customerTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0) + type.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }));
                  }}
                />
              </div> */}

              <div>
                <Label htmlFor="addressType">Address Type *</Label>
                <select
                  id="addressType"
                  value={addressForm.addressType}
                  onChange={(e) =>
                    setAddressForm((prev) => ({
                      ...prev,
                      addressType: e.target.value as any,
                    }))
                  }
                  className="block w-full border rounded px-2 py-1"
                  required
                >
                  <option value="BILLING">Billing</option>
                  <option value="SHIPPING">Shipping</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="addressLine1">Address Line 1 *</Label>
                <Input
                  id="addressLine1"
                  type="text"
                  required
                  value={addressForm.addressLine1}
                  onChange={(e) => {
                    setAddressForm((prev) => ({
                      ...prev,
                      addressLine1: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  type="text"
                  value={addressForm.addressLine2}
                  onChange={(e) => {
                    setAddressForm((prev) => ({
                      ...prev,
                      addressLine2: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  type="text"
                  required
                  value={addressForm.city}
                  onChange={(e) => {
                    setAddressForm((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  type="text"
                  required
                  value={addressForm.pincode}
                  onChange={(e) => {
                    setAddressForm((prev) => ({
                      ...prev,
                      pincode: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="isDefault"
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) =>
                    setAddressForm((prev) => ({
                      ...prev,
                      isDefault: e.target.checked,
                    }))
                  }
                />
                <Label htmlFor="isDefault">Set as Default Address</Label>
              </div>

              <Button type="submit">Add Customer</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Search and Customer List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Database</CardTitle>
        </CardHeader>
        <CardContent>
          <NinjaTable
            columns={columns}
            data={filteredCustomers}
            pageSize={10}
          />
        </CardContent>
      </Card>
      {/* Customer Details Modal */}
      <Dialog
        open={isOpen}
        onOpenChange={(open) => (open ? onOpen() : onClose())}
      >
        <DialogTrigger asChild>
          {/* No trigger here, modal is opened by state */}
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Customer Details</DialogTitle>
          {/* Only one close button, styled top-right */}
          <DialogClose asChild>
            {/* <button
              onClick={onClose}
              className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-700 transition"
            >
              ×
            </button> */}
          </DialogClose>
          <DialogDescription>
            {selectedCustomer && (
              <div className="space-y-4 p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-bold text-blue-700 mb-2 text-lg">
                      Basic Info
                    </h3>
                    <div className="mb-1">
                      <span className="font-semibold text-gray-700">Name:</span>{" "}
                      <span className="text-gray-900">
                        {selectedCustomer.customerName}
                      </span>
                    </div>
                    <div className="mb-1">
                      <span className="font-semibold text-gray-700">
                        Company Name:
                      </span>{" "}
                      <span className="text-gray-900">
                        {selectedCustomer.companyName}
                      </span>
                    </div>
                    <div className="mb-1">
                      <span className="font-semibold text-gray-700">
                        Email:
                      </span>{" "}
                      <span className="text-gray-900">
                        {selectedCustomer.email}
                      </span>
                    </div>
                    <div className="mb-1">
                      <span className="font-semibold text-gray-700">
                        Phone:
                      </span>{" "}
                      <span className="text-gray-900">
                        {selectedCustomer.phone}
                      </span>
                    </div>
                    <div className="mb-1">
                      <span className="font-semibold text-gray-700">
                        GST Number:
                      </span>{" "}
                      <span className="text-blue-700 underline underline-offset-2">
                        {selectedCustomer.gstNumber}
                      </span>
                    </div>
                    <div className="mb-1">
                      <span className="font-semibold text-gray-700">Type:</span>{" "}
                      <span className="text-gray-900 capitalize">
                        {selectedCustomer.type}
                      </span>
                    </div>
                    <div className="mb-1">
                      <span className="font-semibold text-gray-700">
                        State Code:
                      </span>{" "}
                      <span className="text-gray-900">
                        {selectedCustomer.stateCode}
                      </span>
                    </div>
                    <div className="mb-1">
                      <span className="font-semibold text-gray-700">
                        Created At:
                      </span>{" "}
                      <span className="text-gray-900">
                        {new Date(selectedCustomer.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-bold text-green-700 mb-2 text-lg">
                      Primary Address
                    </h3>
                    <div className="mb-1">
                      <span className="font-semibold text-gray-700">
                        Address:
                      </span>{" "}
                      <span className="text-gray-900">
                        {selectedCustomer.address}
                      </span>
                    </div>
                    {selectedCustomer.addresses &&
                      selectedCustomer.addresses.length > 0 && (
                        <div className="mt-2">
                          <h4 className="font-semibold text-green-600 mb-1">
                            All Addresses:
                          </h4>
                          <ul className="space-y-2">
                            {selectedCustomer.addresses.map((addr, idx) => (
                              <li
                                key={idx}
                                className="bg-white rounded border p-3"
                              >
                                <div className="mb-1">
                                  <span className="font-semibold text-gray-700">
                                    Type:
                                  </span>{" "}
                                  <span className="text-gray-900">
                                    {addr.addressType}
                                  </span>
                                </div>
                                <div className="mb-1">
                                  <span className="font-semibold text-gray-700">
                                    Line 1:
                                  </span>{" "}
                                  <span className="text-gray-900">
                                    {addr.addressLine1}
                                  </span>
                                </div>
                                {addr.addressLine2 && (
                                  <div className="mb-1">
                                    <span className="font-semibold text-gray-700">
                                      Line 2:
                                    </span>{" "}
                                    <span className="text-gray-900">
                                      {addr.addressLine2}
                                    </span>
                                  </div>
                                )}
                                <div className="mb-1">
                                  <span className="font-semibold text-gray-700">
                                    City:
                                  </span>{" "}
                                  <span className="text-gray-900">
                                    {addr.city}
                                  </span>
                                </div>
                                <div className="mb-1">
                                  <span className="font-semibold text-gray-700">
                                    State:
                                  </span>{" "}
                                  <span className="text-gray-900">
                                    {addr.state}
                                  </span>
                                </div>
                                <div className="mb-1">
                                  <span className="font-semibold text-gray-700">
                                    Pincode:
                                  </span>{" "}
                                  <span className="text-gray-900">
                                    {addr.pincode}
                                  </span>
                                </div>
                                <div className="mb-1">
                                  <span className="font-semibold text-gray-700">
                                    Default:
                                  </span>{" "}
                                  <span className="text-gray-900">
                                    {addr.isDefault ? "Yes" : "No"}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerManagement;
