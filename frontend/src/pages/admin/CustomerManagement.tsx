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
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button as ChakraButton,
} from "@chakra-ui/core";

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
  name: string;
  email: string;
  phone: string;
  gstNumber: string;
  address: string;
  type: "registered" | "unregistered";
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
    name: "",
    email: "",
    phone: "",
    gstNumber: "",
    address: "",
    type: "unregistered" as "registered" | "unregistered",
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Fetch customers from backend
    fetcher({ path: "/api/v1/customers" }, { method: "GET" })
      .then((data: any[]) => {
        const mapped = data.map((saved) => {
          let type: "registered" | "unregistered" = "unregistered";
          if (
            saved.customerType?.toLowerCase() === "registered" ||
            saved.type === "registered"
          ) {
            type = "registered";
          }
          return {
            id: saved.id || saved.customerId || Date.now() + Math.random(),
            name: saved.name || saved.customerName || "",
            email: saved.email || "",
            phone: saved.phone || "",
            gstNumber: saved.gstNumber || "",
            address:
              saved.address ||
              (saved.addresses && saved.addresses[0]?.addressLine1) ||
              "",
            type,
            createdAt: saved.createdAt || new Date().toISOString(),
            stateCode: saved.stateCode || "",
            addresses: saved.addresses || [],
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
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      gstNumber: formData.gstNumber,
      address: formData.address,
      type: formData.type,
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
        name: saved.name || saved.customerName || "",
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
        createdAt: saved.createdAt || new Date().toISOString(),
      };
      setCustomers((prev) => [...prev, mappedCustomer]);
      toast({
        title: "Customer Added",
        description: "Customer has been successfully added to the database.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        gstNumber: "",
        address: "",
        type: "unregistered",
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
        name:
          (data.primaryContact?.firstName || "") +
            (data.primaryContact?.lastName
              ? " " + data.primaryContact.lastName
              : "") || prev.name,
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
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  // Columns for NinjaTable
  const columns = [
    {
      Header: "Name",
      accessor: "name",
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
          {row.original.name}
        </span>
      ),
    },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },
    { Header: "GST Number", accessor: "gstNumber" },
    { Header: "Type", accessor: "type" },
    { Header: "State Code", accessor: "stateCode" },
    { Header: "Created At", accessor: "createdAt" },
  ];

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
                  <Label htmlFor="name">Customer Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                    }}
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
              </div>

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
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Customer Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCustomer && (
              <div>
                <p>
                  <strong>Name:</strong> {selectedCustomer.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedCustomer.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedCustomer.phone}
                </p>
                <p>
                  <strong>GST Number:</strong> {selectedCustomer.gstNumber}
                </p>
                <p>
                  <strong>Type:</strong> {selectedCustomer.type}
                </p>
                <p>
                  <strong>State Code:</strong> {selectedCustomer.stateCode}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedCustomer.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Address:</strong> {selectedCustomer.address}
                </p>
                {selectedCustomer.addresses &&
                  selectedCustomer.addresses.length > 0 && (
                    <div style={{ marginTop: 12 }}>
                      <strong>Addresses:</strong>
                      <ul style={{ marginLeft: 16 }}>
                        {selectedCustomer.addresses.map((addr, idx) => (
                          <li key={idx} style={{ marginBottom: 8 }}>
                            <div>
                              <strong>Type:</strong> {addr.addressType}
                            </div>
                            <div>
                              <strong>Line 1:</strong> {addr.addressLine1}
                            </div>
                            {addr.addressLine2 && (
                              <div>
                                <strong>Line 2:</strong> {addr.addressLine2}
                              </div>
                            )}
                            <div>
                              <strong>City:</strong> {addr.city}
                            </div>
                            <div>
                              <strong>State:</strong> {addr.state}
                            </div>
                            <div>
                              <strong>Pincode:</strong> {addr.pincode}
                            </div>
                            <div>
                              <strong>Default:</strong>{" "}
                              {addr.isDefault ? "Yes" : "No"}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <ChakraButton onClick={onClose}>Close</ChakraButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CustomerManagement;
