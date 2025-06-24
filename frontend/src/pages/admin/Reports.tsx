import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  BarChart3,
  TrendingUp,
  FileText,
  Download,
  Calendar,
  DollarSign,
  Users,
  Package,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Reports = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");
  // If you want to use loaded reports, add:
  // const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    // Load reports from localStorage (optional, remove if not needed)
    // const savedReports = JSON.parse(
    //   localStorage.getItem("reports") || "[]"
    // );
    // setReports(savedReports);
  }, [navigate]);

  // Sample data for charts
  const salesData = [
    { month: "Jan", revenue: 45000, orders: 12 },
    { month: "Feb", revenue: 52000, orders: 15 },
    { month: "Mar", revenue: 48000, orders: 14 },
    { month: "Apr", revenue: 61000, orders: 18 },
    { month: "May", revenue: 55000, orders: 16 },
    { month: "Jun", revenue: 67000, orders: 20 },
  ];

  const gstData = [
    { month: "Jan", sgst: 4050, cgst: 4050, igst: 2700 },
    { month: "Feb", sgst: 4680, cgst: 4680, igst: 3120 },
    { month: "Mar", sgst: 4320, cgst: 4320, igst: 2880 },
    { month: "Apr", sgst: 5490, cgst: 5490, igst: 3660 },
    { month: "May", sgst: 4950, cgst: 4950, igst: 3300 },
    { month: "Jun", sgst: 6030, cgst: 6030, igst: 4020 },
  ];

  const customerData = [
    { name: "ABC Construction", value: 35, amount: 145000 },
    { name: "XYZ Builders", value: 25, amount: 105000 },
    { name: "PQR Developers", value: 20, amount: 85000 },
    { name: "Others", value: 20, amount: 75000 },
  ];

  const itemData = [
    { category: "Windows", sales: 45, revenue: 180000 },
    { category: "Doors", sales: 32, revenue: 128000 },
    { category: "Railings", sales: 28, revenue: 112000 },
    { category: "Gates", sales: 15, revenue: 75000 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const chartConfig = {
    revenue: { label: "Revenue", color: "#0088FE" },
    orders: { label: "Orders", color: "#00C49F" },
    sgst: { label: "SGST", color: "#0088FE" },
    cgst: { label: "CGST", color: "#00C49F" },
    igst: { label: "IGST", color: "#FFBB28" },
  };

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "Report Generated",
      description: `${reportType} report has been generated and is ready for download.`,
    });
  };

  const handleExportGSTR1 = () => {
    toast({
      title: "GSTR-1 Export",
      description: "GSTR-1 JSON file has been generated and downloaded.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Comprehensive business insights and GST reports
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisQuarter">This Quarter</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExportGSTR1}>
            <Download className="h-4 w-4 mr-2" />
            Export GSTR-1
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">₹3,28,000</p>
                <p className="text-xs text-green-600">+12.5% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold">95</p>
                <p className="text-xs text-green-600">+8.3% from last month</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Customers
                </p>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-green-600">+3 new this month</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  GST Collected
                </p>
                <p className="text-2xl font-bold">₹59,040</p>
                <p className="text-xs text-green-600">18% of revenue</p>
              </div>
              <Package className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0088FE"
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Orders Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Orders Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="orders" fill="#00C49F" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* GST Collection */}
        <Card>
          <CardHeader>
            <CardTitle>GST Collection Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <BarChart data={gstData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sgst" stackId="a" fill="#0088FE" />
                <Bar dataKey="cgst" stackId="a" fill="#00C49F" />
                <Bar dataKey="igst" stackId="a" fill="#FFBB28" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Customer Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Customer-wise Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <PieChart>
                <Pie
                  data={customerData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {customerData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Item-wise Sales */}
      <Card>
        <CardHeader>
          <CardTitle>Item-wise Sales Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {itemData.map((item, index) => (
              <div key={item.category} className="p-4 border rounded-lg">
                <h4 className="font-semibold text-lg">{item.category}</h4>
                <p className="text-2xl font-bold text-blue-600">{item.sales}</p>
                <p className="text-sm text-gray-600">Units Sold</p>
                <p className="text-lg font-semibold text-green-600">
                  ₹{item.revenue.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600">Revenue Generated</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col"
              onClick={() => handleGenerateReport("Sales Summary")}
            >
              <FileText className="h-6 w-6 mb-2" />
              Sales Summary
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col"
              onClick={() => handleGenerateReport("GST Report")}
            >
              <BarChart3 className="h-6 w-6 mb-2" />
              GST Report
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col"
              onClick={() => handleGenerateReport("Customer Report")}
            >
              <Users className="h-6 w-6 mb-2" />
              Customer Report
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col"
              onClick={() => handleGenerateReport("Inventory Report")}
            >
              <Package className="h-6 w-6 mb-2" />
              Inventory Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
