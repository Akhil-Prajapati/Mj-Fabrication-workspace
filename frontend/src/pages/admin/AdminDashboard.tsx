import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Package, Users } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboardCharts from "@/components/admin/AdminDashboardCharts";
import { fetcher } from "@/api/fetcher";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("adminLoggedIn")) {
      navigate("/admin");
      return;
    }
    // Fetch dashboard data from backend
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const data = await fetcher({
          path: "/admin/dashboard",
          shouldEncrypt: true,
          shouldDecrypt: true,
        });
        setStats(data.stats || []);
        setRecentOrders(data.recentOrders || []);
      } catch (err) {
        // fallback to mock data or show error
        setStats([]);
        setRecentOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [navigate]);

  if (loading) {
    return <div className="p-8 text-center text-lg">Loading dashboard...</div>;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome to MJ Fabrication Admin Panel
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/admin/invoices")}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Create Invoice
            </Button>
            <Button
              onClick={() => navigate("/admin/inventory")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Package className="h-4 w-4" />
              Add Item
            </Button>
            <Button
              onClick={() => navigate("/admin/customers")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Add Customer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-green-600">
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="text-3xl">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <AdminDashboardCharts />

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{order.amount}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
