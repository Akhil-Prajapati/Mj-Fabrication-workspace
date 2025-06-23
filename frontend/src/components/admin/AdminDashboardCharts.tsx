
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboardCharts = () => {
  const revenueData = [
    { month: 'Jan', revenue: 45000, orders: 12 },
    { month: 'Feb', revenue: 52000, orders: 15 },
    { month: 'Mar', revenue: 48000, orders: 13 },
    { month: 'Apr', revenue: 61000, orders: 18 },
    { month: 'May', revenue: 55000, orders: 16 },
    { month: 'Jun', revenue: 67000, orders: 20 }
  ];

  const gstData = [
    { name: 'SGST', value: 12500, color: '#3B82F6' },
    { name: 'CGST', value: 12500, color: '#10B981' },
    { name: 'IGST', value: 8500, color: '#F59E0B' }
  ];

  const formatCurrency = (value: number) => `₹${value.toLocaleString()}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📈 Revenue Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={formatCurrency}
                />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                  labelStyle={{ color: '#374151' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
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
            📊 GST Collection Breakdown
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
                  formatter={(value: number) => [formatCurrency(value), 'Amount']}
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
                <span className="text-sm text-gray-600">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardCharts;
