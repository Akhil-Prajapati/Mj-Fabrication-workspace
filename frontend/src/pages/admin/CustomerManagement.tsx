import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { fetcher } from "@/api/fetcher";
import { StateDropdown } from "@/components/state";
import { customerSchema } from "./customerSchema";
import { NinjaTable } from "@/components/NinjaTable";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getStates } from "@/api/state";
import { useUserStore } from "@/stores/user-store";

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
  const setSelectedCustomerId = useUserStore(
    (state) => state.setSelectedCustomerId
  );
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
  const [editFormData, setEditFormData] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState<string | number | null>(
    null
  );

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  // DRY: Single fetchCustomers function
  const fetchCustomers = React.useCallback(() => {
    fetcher({ path: "/api/v1/customers" }, { method: "GET" })
      .then((data: any[]) => {
        const mapped = data.map((saved) => {
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
            customerType,
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
    fetchCustomers();
  }, [fetchCustomers]);
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
      setCustomers((prev) => [...prev, mappedCustomer]); // Optionally, just call fetchCustomers() for consistency
      fetchCustomers(); // Refresh list after add
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
    },
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
    {
      Header: "Actions",
      id: "actions",
      Cell: ({ row }: any) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            style={{ color: "#3182ce", borderColor: "#3182ce" }}
            onClick={() => {
              setSelectedCustomerId && setSelectedCustomerId(row.original.id);
              navigate(`/admin/invoices?customerId=${row.original.id}`);
            }}
          >
            Create Invoice
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => openEditDialog(row.original)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDeleteCustomer(row.original.id)}
          >
            Delete
          </Button>
        </div>
      ),
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

  const openEditDialog = (customer: Customer) => {
    setEditFormData({ ...customer });
    setEditCustomerId(customer.id);
    setIsEditOpen(true);
  };
  const closeEditDialog = () => {
    setIsEditOpen(false);
    setEditFormData(null);
    setEditCustomerId(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Ensure all address fields are present and addressType is set
      const updatedAddresses = (editFormData.addresses || []).map(
        (addr: any) => ({
          addressLine1: addr.addressLine1 || "",
          addressLine2: addr.addressLine2 || "",
          city: addr.city || "",
          state: addr.state || "",
          pincode: addr.pincode || "",
          isDefault: !!addr.isDefault,
          addressType: addr.addressType || "BILLING",
        })
      );
      const payload = {
        ...editFormData,
        customerType: (
          editFormData.customerType || "UNREGISTERED"
        ).toUpperCase(),
        type: (editFormData.type || "UNREGISTERED").toUpperCase(),
        addresses: updatedAddresses,
      };
      const updated = await fetcher(
        { path: `/api/v1/customers/${editCustomerId}` },
        { method: "PUT", json: payload }
      );
      toast({
        title: "Customer Updated",
        description: "Customer details updated.",
      });
      closeEditDialog();
      // Refresh customer list
      fetchCustomers();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update customer.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCustomer = async (id: string | number) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;
    try {
      await fetcher({ path: `/api/v1/customers/${id}` }, { method: "DELETE" });
      toast({
        title: "Customer Deleted",
        description: "Customer has been deleted.",
      });
      // Refresh customer list
      fetchCustomers();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete customer.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 px-2 md:px-8 py-4 w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 flex-wrap">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Customer Management
        </h1>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full md:w-auto"
        >
          {showAddForm ? "Cancel" : "Add New Customer"}
        </Button>
      </div>
      {/* Add Customer Form */}
      {showAddForm && (
        <Card className="p-2 md:p-6">
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
      <Card className="p-2 md:p-6">
        <CardHeader>
          <CardTitle>Customers</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <div className="min-w-[600px] w-full">
            <NinjaTable
              columns={columns}
              data={filteredCustomers}
              pageSize={10}
            />
          </div>
        </CardContent>
      </Card>
      {/* Customer Details Modal */}
      <Dialog
        open={isOpen}
        onOpenChange={(open) => (open ? onOpen() : onClose())}
      >
        <DialogContent className="max-w-4xl w-full overflow-y-auto p-2 md:p-6">
          <div className="sticky top-0 bg-white pb-4 ">
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
              Customer Details
            </DialogTitle>
          </div>
          <DialogDescription className="mt-4">
            {selectedCustomer && (
              <div className="space-y-6">
                {/* Basic Information Card */}
                <Card className="border-blue-200">
                  <CardHeader className="bg-blue-50 border-b border-blue-200">
                    <CardTitle className="text-xl font-semibold text-blue-800">
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-500">
                          Customer Name
                        </label>
                        <p className="text-lg text-gray-900 break-words">
                          {selectedCustomer.customerName}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-500">
                          Company Name
                        </label>
                        <p className="text-lg text-gray-900 break-words">
                          {selectedCustomer.companyName || "-"}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-500">
                          Email
                        </label>
                        <p className="text-lg text-blue-600 break-words">
                          {selectedCustomer.email}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-500">
                          Phone
                        </label>
                        <p className="text-lg text-gray-900 break-words">
                          {selectedCustomer.phone}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-500">
                          GST Number
                        </label>
                        <p className="text-lg text-blue-600 font-mono break-words">
                          {selectedCustomer.gstNumber || "-"}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-500">
                          Customer Type
                        </label>
                        <p className="text-lg text-gray-900 capitalize break-words">
                          {selectedCustomer.type}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-500">
                          State Code
                        </label>
                        <p className="text-lg text-gray-900 break-words">
                          {stateList.find(
                            (s) => s.stateCode === selectedCustomer.stateCode
                          )?.stateName || selectedCustomer.stateCode}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-500">
                          Created At
                        </label>
                        <p className="text-lg text-gray-900 break-words">
                          {new Date(
                            selectedCustomer.createdAt
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Addresses Card */}
                <Card className="border-green-200">
                  <CardHeader className="bg-green-50 border-b border-green-200">
                    <CardTitle className="text-xl font-semibold text-green-800">
                      Address Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {selectedCustomer.addresses &&
                    selectedCustomer.addresses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedCustomer.addresses.map((addr, idx) => (
                          <Card key={idx} className="border-gray-200 shadow-sm">
                            <CardHeader className="bg-gray-50 py-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-medium text-gray-900">
                                  {addr.addressType} Address
                                </CardTitle>
                                {addr.isDefault && (
                                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                    Default
                                  </Badge>
                                )}
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 space-y-2">
                              <p className="text-gray-800">
                                {addr.addressLine1}
                              </p>
                              {addr.addressLine2 && (
                                <p className="text-gray-800">
                                  {addr.addressLine2}
                                </p>
                              )}
                              <p className="text-gray-800">
                                {addr.city}, {addr.state} - {addr.pincode}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        No addresses found
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog
        open={isEditOpen}
        onOpenChange={(open) =>
          open ? setIsEditOpen(true) : closeEditDialog()
        }
      >
        <DialogContent className="max-w-2xl w-full">
          <DialogTitle>Edit Customer</DialogTitle>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editCustomerName">Customer Name *</Label>
                <Input
                  id="editCustomerName"
                  type="text"
                  required
                  value={editFormData?.customerName || ""}
                  onChange={(e) =>
                    setEditFormData((prev: any) => ({
                      ...prev,
                      customerName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="editCompanyName">Company Name</Label>
                <Input
                  id="editCompanyName"
                  type="text"
                  required
                  value={editFormData?.companyName || ""}
                  onChange={(e) =>
                    setEditFormData((prev: any) => ({
                      ...prev,
                      companyName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="editPhone">Phone Number *</Label>
                <Input
                  id="editPhone"
                  type="tel"
                  required
                  value={editFormData?.phone || ""}
                  onChange={(e) =>
                    setEditFormData((prev: any) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="editEmail">Email Address *</Label>
                <Input
                  id="editEmail"
                  type="email"
                  required
                  value={editFormData?.email || ""}
                  onChange={(e) =>
                    setEditFormData((prev: any) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="editGstNumber">GST Number</Label>
              <Input
                id="editGstNumber"
                type="text"
                value={editFormData?.gstNumber || ""}
                onChange={(e) =>
                  setEditFormData((prev: any) => ({
                    ...prev,
                    gstNumber: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="editStateCode">State</Label>
              <StateDropdown
                value={editFormData?.stateCode || ""}
                onChange={(val) =>
                  setEditFormData((prev: any) => ({ ...prev, stateCode: val }))
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="editCustomerType">Customer Type</Label>
              <select
                id="editCustomerType"
                value={editFormData?.customerType || ""}
                onChange={(e) =>
                  setEditFormData((prev: any) => ({
                    ...prev,
                    customerType: e.target.value,
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

            {/* Address editing fields */}
            <div className="mt-4">
              <Label>Addresses</Label>
              {Array.isArray(editFormData?.addresses) &&
              editFormData.addresses.length > 0 ? (
                editFormData.addresses.map((addr: any, idx: number) => (
                  <div key={idx} className="border rounded p-3 mb-2 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <Label>Address Line 1</Label>
                        <Input
                          type="text"
                          value={addr.addressLine1 || ""}
                          onChange={(e) =>
                            setEditFormData((prev: any) => {
                              const updated = [...prev.addresses];
                              updated[idx].addressLine1 = e.target.value;
                              return { ...prev, addresses: updated };
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Address Line 2</Label>
                        <Input
                          type="text"
                          value={addr.addressLine2 || ""}
                          onChange={(e) =>
                            setEditFormData((prev: any) => {
                              const updated = [...prev.addresses];
                              updated[idx].addressLine2 = e.target.value;
                              return { ...prev, addresses: updated };
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>City</Label>
                        <Input
                          type="text"
                          value={addr.city || ""}
                          onChange={(e) =>
                            setEditFormData((prev: any) => {
                              const updated = [...prev.addresses];
                              updated[idx].city = e.target.value;
                              return { ...prev, addresses: updated };
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>State</Label>
                        <Input
                          type="text"
                          value={addr.state || ""}
                          onChange={(e) =>
                            setEditFormData((prev: any) => {
                              const updated = [...prev.addresses];
                              updated[idx].state = e.target.value;
                              return { ...prev, addresses: updated };
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Pincode</Label>
                        <Input
                          type="text"
                          value={addr.pincode || ""}
                          onChange={(e) =>
                            setEditFormData((prev: any) => {
                              const updated = [...prev.addresses];
                              updated[idx].pincode = e.target.value;
                              return { ...prev, addresses: updated };
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Address Type</Label>
                        <select
                          value={addr.addressType || "BILLING"}
                          onChange={(e) =>
                            setEditFormData((prev: any) => {
                              const updated = [...prev.addresses];
                              updated[idx].addressType = e.target.value;
                              return { ...prev, addresses: updated };
                            })
                          }
                          className="block w-full border rounded px-2 py-1"
                        >
                          <option value="BILLING">Billing</option>
                          <option value="SHIPPING">Shipping</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          checked={!!addr.isDefault}
                          onChange={(e) =>
                            setEditFormData((prev: any) => {
                              const updated = [...prev.addresses];
                              updated[idx].isDefault = e.target.checked;
                              return { ...prev, addresses: updated };
                            })
                          }
                        />
                        <Label>Default</Label>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No addresses found</div>
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={closeEditDialog}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerManagement;
