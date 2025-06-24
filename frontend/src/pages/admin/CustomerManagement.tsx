import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { Search } from "lucide-react";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gstNumber: "",
    address: "",
    type: "unregistered" as "registered" | "unregistered",
  });

  useEffect(() => {
    // Load customers from localStorage
    const savedCustomers = JSON.parse(
      localStorage.getItem("customers") || "[]"
    );
    setCustomers(savedCustomers);
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCustomer: Customer = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));

    toast({
      title: "Customer Added",
      description: "Customer has been successfully added to the database.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      gstNumber: "",
      address: "",
      type: "unregistered",
    });
    setShowAddForm(false);
  };

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
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
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
                  <Input
                    id="gstNumber"
                    type="text"
                    value={formData.gstNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gstNumber: e.target.value,
                        type: e.target.value ? "registered" : "unregistered",
                      }))
                    }
                    placeholder="Enter GST number if registered"
                  />
                </div>
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
