
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Download, Printer } from 'lucide-react';

interface InvoiceItem {
  id: string;
  itemName: string;
  hsnCode: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
}

interface Customer {
  customerId: string;
  companyName: string;
  contactPerson: string;
  gstNumber: string;
  address: string;
  state: string;
  stateCode: string;
}

interface InvoicePreviewData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  customer: Customer;
  items: InvoiceItem[];
  subtotal: number;
  sgst: number;
  cgst: number;
  igst: number;
  totalAmount: number;
  notes: string;
}

interface InvoicePreviewProps {
  invoice: InvoicePreviewData;
  onClose: () => void;
  onDownload: () => void;
}

const InvoicePreview = ({ invoice, onClose, onDownload }: InvoicePreviewProps) => {
  const numberToWords = (num: number): string => {
    if (num === 0) return 'Zero';
    return `${Math.floor(num).toLocaleString()} Rupees Only`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Preview Header */}
        <div className="flex justify-between items-center p-4 border-b print:hidden">
          <h3 className="text-lg font-semibold">Invoice Preview</h3>
          <div className="flex gap-2">
            <Button onClick={handlePrint} variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={onDownload} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={onClose} variant="outline" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Invoice Document */}
        <div id="invoice-preview" className="p-6 bg-white">
          {/* Company Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-blue-900 mb-2">MJ FABRICATION</h1>
            <div className="text-sm text-gray-600">
              <p>31, MAHESHWARI PARK SOCIETY, AMARPARK RCC RD</p>
              <p>VASANT VIHAR 2, NAVA NARODA, AHMEDABAD</p>
              <p>GUJARAT, INDIA - 382330</p>
              <p>Phone: 9712929748 | Email: mjfabworld62@gmail.com</p>
              <p className="font-semibold">GSTN: 24AFZPP4386C1ZY</p>
            </div>
          </div>

          {/* Invoice Title */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold border-2 border-gray-800 inline-block px-4 py-2">TAX INVOICE</h2>
          </div>

          {/* Customer Details and Invoice Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Bill To:</h3>
              <div className="text-sm">
                <p className="font-bold">{invoice.customer.companyName}</p>
                <p>{invoice.customer.contactPerson}</p>
                <p>{invoice.customer.address}</p>
                <p>Place of Supply: {invoice.customer.state} ({invoice.customer.stateCode})</p>
                <p>GSTN: {invoice.customer.gstNumber}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">Invoice Details:</h3>
              <div className="text-sm">
                <p><span className="font-medium">Invoice No:</span> {invoice.invoiceNumber}</p>
                <p><span className="font-medium">Invoice Date:</span> {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
                <p><span className="font-medium">Payment Terms:</span> Net 30</p>
                <p><span className="font-medium">Due Date:</span> {new Date(invoice.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-2 text-left">S.N.</th>
                  <th className="border border-gray-300 p-2 text-left">Item Description</th>
                  <th className="border border-gray-300 p-2 text-left">HSN/SAC</th>
                  <th className="border border-gray-300 p-2 text-center">Qty</th>
                  <th className="border border-gray-300 p-2 text-right">Rate</th>
                  <th className="border border-gray-300 p-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">{item.itemName}</td>
                    <td className="border border-gray-300 p-2">{item.hsnCode}</td>
                    <td className="border border-gray-300 p-2 text-center">{item.quantity} {item.unit}</td>
                    <td className="border border-gray-300 p-2 text-right">₹{item.rate.toFixed(2)}</td>
                    <td className="border border-gray-300 p-2 text-right">₹{item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2 font-bold" colSpan={3}>Total</td>
                  <td className="border border-gray-300 p-2 text-center font-bold">
                    {invoice.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2 text-right font-bold">₹{invoice.subtotal.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Amount in Words and Tax Calculation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-bold mb-2">Amount in Words:</h4>
              <p className="text-sm border border-gray-300 p-3">
                {numberToWords(invoice.totalAmount)}
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Tax Calculation:</h4>
              <div className="border border-gray-300 p-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Sub Total:</span>
                  <span>₹ {invoice.subtotal.toFixed(2)}</span>
                </div>
                {invoice.sgst > 0 && invoice.cgst > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span>SGST @ 9%:</span>
                      <span>₹ {invoice.sgst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CGST @ 9%:</span>
                      <span>₹ {invoice.cgst.toFixed(2)}</span>
                    </div>
                  </>
                )}
                {invoice.igst > 0 && (
                  <div className="flex justify-between">
                    <span>IGST @ 18%:</span>
                    <span>₹ {invoice.igst.toFixed(2)}</span>
                  </div>
                )}
                <hr className="my-1" />
                <div className="flex justify-between font-bold">
                  <span>Grand Total:</span>
                  <span>₹ {invoice.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Details and Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-bold mb-2">Bank Details:</h4>
              <div className="text-sm">
                <p><span className="font-medium">Bank Name:</span> The Ahmedabad Dist.Co.Op.Bank Ltd</p>
                <p><span className="font-medium">Account Number:</span> 607019119547</p>
                <p><span className="font-medium">IFSC Code:</span> GSCB0ADC001</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Additional Notes:</h4>
              <p className="text-sm">
                {invoice.notes || 'Thank you for choosing MJ Fabrication for your metal work needs!'}
              </p>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="mb-6">
            <h4 className="font-bold mb-2">Terms & Conditions:</h4>
            <div className="text-xs text-gray-600 grid grid-cols-2 gap-2">
              <p>• Payment is due within 30 days of invoice date</p>
              <p>• Late payments may incur additional charges</p>
              <p>• All disputes must be reported within 7 days</p>
              <p>• Goods once delivered will not be taken back</p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="flex justify-between items-end pt-8 border-t">
            <div>
              <p className="text-xs text-gray-500">* This is a computer generated invoice.</p>
            </div>
            
            <div className="text-center">
              <div className="mb-12">
                <p className="font-bold">For, MJ FABRICATION</p>
              </div>
              <div className="border-t border-gray-800 w-32 pt-1">
                <p className="text-xs">Authorized Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
