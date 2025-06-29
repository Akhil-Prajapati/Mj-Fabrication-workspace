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
import { fetchDashboardStats, downloadGSTR1 } from "@/api/reports";

const Reports = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dashboard, setDashboard] = useState<any>(null);

  // Month and year selection
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
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Derived chart data
  const salesData = dashboard?.salesTrend || [];
  const gstData = dashboard?.gstTrend || [];
  const customerData = dashboard?.customerDistribution || [];
  const itemData = dashboard?.itemSales || [];

  // Map stats array to cards
  const stats = dashboard?.stats || [];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const chartConfig = {
    revenue: { label: "Revenue", color: "#0088FE" },
    orders: { label: "Orders", color: "#00C49F" },
    sgst: { label: "SGST", color: "#0088FE" },
    cgst: { label: "CGST", color: "#00C49F" },
    igst: { label: "IGST", color: "#FFBB28" },
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchDashboardStats({ month: selectedMonth + 1, year: selectedYear })
      .then((data) => {
        console.log("Dashboard API response:", data); // Debug log
        setDashboard(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load analytics data");
        setLoading(false);
      });
  }, [selectedMonth, selectedYear]);

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "Report Generated",
      description: `${reportType} report has been generated and is ready for download.`,
    });
  };

  const handleExportGSTR1 = async () => {
    setLoading(true);
    try {
      const data = await downloadGSTR1({
        month: selectedMonth + 1,
        year: selectedYear,
      });
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `GSTR-1_${selectedMonth + 1}_${selectedYear}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "GSTR-1 Export",
        description: "GSTR-1 JSON file has been generated and downloaded.",
      });
    } catch (err) {
      toast({
        title: "GSTR-1 Export Failed",
        description: "Could not download GSTR-1 JSON file.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
          <Select
            value={selectedMonth.toString()}
            onValueChange={(v) => setSelectedMonth(Number(v))}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {monthNames.map((m, idx) => (
                <SelectItem key={m} value={idx.toString()}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedYear.toString()}
            onValueChange={(v) => setSelectedYear(Number(v))}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleExportGSTR1}>
            <Download className="h-4 w-4 mr-2" />
            Export GSTR-1
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-lg text-gray-500">
          Loading analytics...
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : dashboard ? (
        <>
          {/* Key Metrics from stats array */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat: any, idx: number) => (
              <Card key={stat.title}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-green-600">{stat.change}</p>
                    </div>
                    {/* Icon rendering */}
                    {stat.icon === "FileText" && (
                      <FileText className="h-8 w-8 text-blue-600" />
                    )}
                    {stat.icon === "Package" && (
                      <Package className="h-8 w-8 text-orange-600" />
                    )}
                    {stat.icon === "Check" && (
                      <span className="h-8 w-8 text-green-600">✔️</span>
                    )}
                    {stat.icon === "AlertTriangle" && (
                      <span className="h-8 w-8 text-red-600">⚠️</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts: Only show if data exists */}
          {(salesData.length > 0 ||
            gstData.length > 0 ||
            customerData.length > 0 ||
            itemData.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              {salesData.length > 0 && (
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
              )}
              {/* Orders Trend */}
              {salesData.length > 0 && (
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
              )}
              {/* GST Collection */}
              {gstData.length > 0 && (
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
              )}
              {/* Customer Distribution */}
              {customerData.length > 0 && (
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
              )}
            </div>
          )}
          {/* Item-wise Sales */}
          {itemData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Item-wise Sales Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {itemData.map((item: any, index: number) => (
                    <div key={item.category} className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-lg">{item.category}</h4>
                      <p className="text-2xl font-bold text-blue-600">
                        {item.sales}
                      </p>
                      <p className="text-sm text-gray-600">Units Sold</p>
                      <p className="text-lg font-semibold text-green-600">
                        ₹{item.revenue?.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600">Revenue Generated</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : null}

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
