import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { fetcher } from "@/api/fetcher";

interface Inquiry {
  id: string; // UUID from backend
  customerName: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  status: "new" | "contacted" | "quoted" | "completed" | "cancelled";
  createdAt: string;
  updatedAt?: string;
  customProjectType?: string;
  budgetRange?: string;
}

const InquiryManagement = () => {
  // State and navigation
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(0); // zero-based page index
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  // API: Fetch inquiries
  const fetchInquiries = async (page: number) => {
    try {
      const data = await fetcher(
        {
          path: `/api/v1/customer-inquiries?page=${page}&size=${pageSize}`,
          shouldEncrypt: false,
          shouldDecrypt: false,
          shouldShowLoader: true,
        },
        {
          method: "GET",
        }
      );
      if (data && Array.isArray(data.content)) {
        setInquiries(data.content);
        setTotal(data.totalElements || 0);
      } else if (Array.isArray(data)) {
        setInquiries(data);
        setTotal(data.length);
      } else {
        setInquiries([]);
        setTotal(0);
      }
    } catch {
      setInquiries([]);
      setTotal(0);
      toast({
        title: "Error",
        description: "Failed to load inquiries from server.",
      });
    }
  };

  // API: Update inquiry status
  const handleStatusChange = async (inquiry: Inquiry, value: Inquiry["status"]) => {
    try {
      await fetcher(
        {
          path: `/api/v1/customer-inquiries/${inquiry.id}`,
          shouldEncrypt: false,
          shouldDecrypt: false,
          shouldShowLoader: true,
        },
        {
          method: "PUT",
          json: { ...inquiry, status: value },
        }
      );
      setInquiries((prev) =>
        prev.map((i) =>
          i.id === inquiry.id ? { ...i, status: value } : i
        )
      );
      toast({
        title: "Status Updated",
        description: "Inquiry status has been updated successfully.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update inquiry status in backend.",
        variant: "destructive",
      });
    }
  };

  // Filtering logic
  const filteredInquiries =
    filterStatus === "all"
      ? inquiries
      : inquiries.filter(
          (inquiry) => inquiry.status.toLowerCase() === filterStatus
        );

  // Status color helper
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-green-100 text-green-800";
      case "contacted":
        return "bg-blue-100 text-blue-800";
      case "quoted":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Project type display helper
  const getProjectTypeDisplay = (type: string) => {
    const types = {
      shades: "Fabrication Shades",
      "door-frames": "Door Frames",
      "window-frames": "Window Frames",
      staircases: "Staircase Fabrication",
      custom: "Custom Fabrication Work",
    };
    return types[type as keyof typeof types] || type;
  };

  // Fetch on mount and page change
  useEffect(() => {
    if (!localStorage.getItem("adminLoggedIn")) {
      navigate("/admin");
      return;
    }
    fetchInquiries(page);
  }, [navigate, page]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Inquiry Management
          </h1>
          <div className="flex items-center space-x-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Inquiries</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="quoted">Quoted</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="space-y-4">
          {filteredInquiries.length > 0 ? (
            filteredInquiries.map((inquiry) => (
              <Card
                key={inquiry.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">
                        {inquiry.customerName}
                      </CardTitle>
                      <p className="text-gray-600">
                        {getProjectTypeDisplay(inquiry.serviceType)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${getStatusColor(
                        inquiry.status
                      )}`}
                    >
                      {inquiry.status.charAt(0).toUpperCase() +
                        inquiry.status.slice(1)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Contact Information
                      </h4>
                      <p className="text-sm text-gray-600">
                        <strong>Name:</strong> {inquiry.customerName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Email:</strong> {inquiry.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Phone:</strong> {inquiry.phone}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Preferred Contact:</strong>{" "}
                        {inquiry.budgetRange}
                      </p>
                      {inquiry.budgetRange && (
                        <p className="text-sm text-gray-600">
                          <strong>Budget Range:</strong> {inquiry.budgetRange}
                        </p>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Project Details
                      </h4>
                      <p className="text-sm text-gray-600">
                        <strong>Service Type:</strong>{" "}
                        {getProjectTypeDisplay(inquiry.serviceType)}
                      </p>
                      {inquiry.customProjectType && (
                        <p className="text-sm text-gray-600">
                          <strong>Custom Project Type:</strong>{" "}
                          {inquiry.customProjectType}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">{inquiry.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Submitted:{" "}
                        {new Date(inquiry.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`tel:${inquiry.phone}`)}
                      >
                        Call
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`mailto:${inquiry.email}`)}
                      >
                        Email
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            `https://wa.me/${inquiry.phone.replace(/\D/g, "")}`
                          )
                        }
                      >
                        WhatsApp
                      </Button>
                    </div>

                    <Select
                      value={inquiry.status?.toLowerCase() || "new"}
                      onValueChange={(value) => handleStatusChange(inquiry, value as Inquiry["status"])}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">
                  {filterStatus === "all"
                    ? "No inquiries received yet."
                    : `No ${filterStatus} inquiries found.`}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span>
            Page {page + 1} of {Math.ceil(total / pageSize) || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={(page + 1) * pageSize >= total}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default InquiryManagement;
