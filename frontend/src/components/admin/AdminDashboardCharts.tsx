import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { fetcher } from "@/api/fetcher";
import { TrendingUp, BarChart3 } from "lucide-react";

const AdminDashboardCharts = ({
  month,
  year,
}: {
  month: number;
  year: number;
}) => {
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [gstData, setGstData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        // Fetch all invoices for the selected year (for trend)
        const invoices = await fetcher(
          {
            path: `/api/v1/invoices`,
            shouldEncrypt: false,
            shouldDecrypt: true,
          },
          { method: "GET" }
        );
        // Revenue trend for each month in the selected year
        const trend = Array.from({ length: 12 }, (_, i) => {
          const monthNum = i + 1;
          const filtered = (invoices || []).filter((inv: any) => {
            const date = new Date(inv.invoiceDate);
            return (
              date.getMonth() + 1 === monthNum && date.getFullYear() === year
            );
          });
          return {
            month: monthNum,
            revenue: filtered.reduce(
              (sum: number, inv: any) => sum + (Number(inv.totalAmount) || 0),
              0
            ),
            orders: filtered.length,
          };
        });
        setRevenueData(trend);
        // GST breakdown for selected month
        const filtered = (invoices || []).filter((inv: any) => {
          const date = new Date(inv.invoiceDate);
          return date.getMonth() + 1 === month && date.getFullYear() === year;
        });
        let sgst = 0,
          cgst = 0,
          igst = 0;
        filtered.forEach((inv: any) => {
          sgst += Number(inv.sgstAmount || 0);
          cgst += Number(inv.cgstAmount || 0);
          igst += Number(inv.igstAmount || 0);
        });
        setGstData([
          { name: "SGST", value: sgst, color: "#3B82F6" },
          { name: "CGST", value: cgst, color: "#10B981" },
          { name: "IGST", value: igst, color: "#F59E0B" },
        ]);
      } catch (err) {
        setRevenueData([]);
        setGstData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchChartData();
  }, [month, year]);

  const formatCurrency = (value: number) =>
    `₹${Number(value).toLocaleString()}`;

  if (loading) {
    return <div className="p-8 text-center text-lg">Loading charts...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Revenue Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={formatCurrency} />
                <Tooltip
                  formatter={(value: number) => [
                    formatCurrency(value),
                    "Revenue",
                  ]}
                  labelStyle={{ color: "#374151" }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* GST Collection Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            GST Collection Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gstData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {gstData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                    formatCurrency(value),
                    "Amount",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {gstData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-sm text-gray-600">
                  {formatCurrency(item.value)}
                </span>
              </div>
            ))}
            {/* Total GST Box */}
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded shadow text-blue-900 font-bold ml-6">
              Total GST:
              <span>
                {formatCurrency(gstData.reduce((sum, g) => sum + g.value, 0))}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardCharts;
