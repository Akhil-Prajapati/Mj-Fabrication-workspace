
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FileText, Download, Eye, Search, Filter } from 'lucide-react';

interface Invoice {
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  totalAmount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string;
}

interface InvoiceListProps {
  invoices: Invoice[];
  onView: (invoice: Invoice) => void;
  onDownload: (invoice: Invoice) => void;
}

const InvoiceList = ({ invoices, onView, onDownload }: InvoiceListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const paidAmount = filteredInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.totalAmount, 0);
  const pendingAmount = totalAmount - paidAmount;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Invoiced</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">₹{paidAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Amount Paid</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">₹{pendingAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Amount Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{filteredInvoices.length}</div>
            <p className="text-sm text-muted-foreground">Total Invoices</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'draft' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('draft')}
                size="sm"
              >
                Draft
              </Button>
              <Button
                variant={statusFilter === 'sent' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('sent')}
                size="sm"
              >
                Sent
              </Button>
              <Button
                variant={statusFilter === 'paid' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('paid')}
                size="sm"
              >
                Paid
              </Button>
              <Button
                variant={statusFilter === 'overdue' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('overdue')}
                size="sm"
              >
                Overdue
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.invoiceNumber}>
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>{new Date(invoice.invoiceDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>₹{invoice.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onView(invoice)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDownload(invoice)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No invoices found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceList;
