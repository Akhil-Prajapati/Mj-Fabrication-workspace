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

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  gstNumber: string;
  address: string;
  type: "registered" | "unregistered";
  createdAt: string;
}

const CustomerManagement = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
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

  useEffect(() => {
    // Load customers from localStorage
    const savedCustomers = JSON.parse(
      localStorage.getItem("customers") || "[]"
    );
    setCustomers(savedCustomers);
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCustomer = {
      customerName: formData.name,
      customerType:
        formData.type === "registered" ? "REGISTERED" : "UNREGISTERED",
      phone: formData.phone,
      email: formData.email,
      gstNumber: formData.gstNumber,
      address: formData.address,
      stateCode: formData.stateCode,
      createdAt: new Date().toISOString(),
    };
    try {
      const saved = await fetcher(
        { path: "/api/v1/customers" },
        { method: "POST", json: newCustomer }
      );
      setCustomers((prev) => [...prev, saved]);
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
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
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
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredCustomers.length > 0 ? (
            <div className="space-y-4">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg">
                          {customer.name}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            customer.type === "registered"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {customer.type === "registered"
                            ? "GST Registered"
                            : "Unregistered"}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <p>
                            <strong>Email:</strong> {customer.email}
                          </p>
                          <p>
                            <strong>Phone:</strong> {customer.phone}
                          </p>
                        </div>
                        <div>
                          {customer.gstNumber && (
                            <p>
                              <strong>GST:</strong> {customer.gstNumber}
                            </p>
                          )}
                          <p>
                            <strong>Address:</strong> {customer.address}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Added on:{" "}
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Create Invoice
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {searchTerm
                  ? "No customers found matching your search."
                  : "No customers added yet."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerManagement;
