import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Package, Users, Check, AlertTriangle } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboardCharts from "@/components/admin/AdminDashboardCharts";
import { fetcher } from "@/api/fetcher";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  const [recentInvoices, setRecentInvoices] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch dashboard data from backend
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const data = await fetcher(
          {
            path: `/api/v1/dashboard?month=${selectedMonth}&year=${selectedYear}`,
            shouldEncrypt: false,
            shouldDecrypt: true,
          },
          { method: "GET" }
        );
        setStats(data.stats || []);
        setRecentInvoices(data.recentInvoices || []);
      } catch (err) {
        setStats([]);
        setRecentInvoices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [navigate, selectedMonth, selectedYear]);

  if (loading) {
    return <div className="p-8 text-center text-lg">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome to MJ Fabrication Admin Panel
          </p>
        </div>
        {/* Month/Year Selector */}
        <div className="flex gap-3 items-center">
          <div className="relative">
            <select
              className="appearance-none border border-blue-300 rounded-lg px-4 py-2 pr-8 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {monthNames.map((name, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {name}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ▼
            </span>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select
                className="appearance-none border border-blue-300 rounded-lg px-4 py-2 pr-8 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {[...Array(5)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                ▼
              </span>
            </div>
          </div>
          {/* Quick Action Buttons */}
          <div className="relative">
            <select
              className="appearance-none border border-blue-300 rounded-lg px-4 py-2 pr-8 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 min-w-[140px]"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) navigate(e.target.value);
              }}
            >
              <option value="" disabled>
                Quick Actions
              </option>
              <option value="/admin/customers">Add Customer</option>
              <option value="/admin/invoices">All Invoices</option>
              <option value="/admin/inventory">All Inventory</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          let Icon = FileText;
          if (stat.icon === "Package") Icon = Package;
          if (stat.icon === "Check") Icon = Check;
          if (stat.icon === "AlertTriangle") Icon = AlertTriangle;
          return (
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
                  <div className="text-3xl">
                    <Icon />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <AdminDashboardCharts month={selectedMonth} year={selectedYear} />

      {/* Recent Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentInvoices.slice(0, 2).map((inv, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-semibold">{inv.customer}</p>
                  <p className="text-xs text-gray-400">{inv.date}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <p className="font-semibold">₹{inv.amount}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      inv.status === "PAID"
                        ? "bg-green-100 text-green-800"
                        : inv.status === "DRAFT"
                        ? "bg-blue-100 text-blue-800"
                        : inv.status === "OVERDUE"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
