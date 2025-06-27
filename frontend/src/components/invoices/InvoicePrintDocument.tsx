import React from "react";
import { InvoicePreviewData } from "./InvoicePreview";

interface Props {
  invoice: InvoicePreviewData;
  indianStates: { name: string; code: string }[];
  numberToWords?: (num: number) => string;
}

const InvoicePrintDocument: React.FC<Props> = ({
  invoice,
  indianStates,
  numberToWords,
}) => {
  // Use the provided numberToWords or fallback
  const toWords =
    numberToWords ||
    ((num: number): string => {
      if (invoice.amountInWords) return invoice.amountInWords;
      if (num === 0) return "Zero";
      return `${Math.floor(num).toLocaleString()} Rupees Only`;
    });
  return (
    <div id="invoice-print-document" className="p-6 bg-white">
      {/* Company Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">
          MJ FABRICATION
        </h1>
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
        <h2 className="text-xl font-bold border-2 border-gray-800 inline-block px-4 py-2">
          TAX INVOICE
        </h2>
      </div>
      {/* Customer Details and Invoice Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-bold text-lg mb-2">Bill To:</h3>
          <div className="text-sm">
            <p className="font-bold">{invoice.customer.companyName}</p>
            <p>{invoice.customer.contactPerson}</p>
            <p>{invoice.customer.address}</p>
            <p>
              Place of Supply:{" "}
              {(() => {
                const code =
                  invoice.customer.stateCode || invoice.customer.state;
                const found = indianStates.find(
                  (s) => s.code === code || s.name === code
                );
                return found ? found.name : invoice.customer.state || "-";
              })()}
            </p>
            <p>GSTN: {invoice.customer.gstNumber}</p>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Invoice Details:</h3>
          <div className="text-sm">
            <p>
              <span className="font-medium">Invoice No:</span>{" "}
              {invoice.invoiceNumber || "-"}
            </p>
            <p>
              <span className="font-medium">Invoice Date:</span>{" "}
              {invoice.invoiceDate
                ? new Date(invoice.invoiceDate).toLocaleDateString()
                : "-"}
            </p>
            <p>
              <span className="font-medium">Payment Terms:</span> Net 30
            </p>
            <p>
              <span className="font-medium">Due Date:</span>{" "}
              {invoice.dueDate && !isNaN(Date.parse(invoice.dueDate))
                ? new Date(invoice.dueDate).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>
      </div>
      {/* Items Table */}
      <div className="mb-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-2 text-left">S.N.</th>
              <th className="border border-gray-300 p-2 text-left">
                Item Description
              </th>
              <th className="border border-gray-300 p-2 text-left">HSN/SAC</th>
              <th className="border border-gray-300 p-2 text-center">Qty</th>
              <th className="border border-gray-300 p-2 text-right">Rate</th>
              <th className="border border-gray-300 p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items && invoice.items.length > 0 ? (
              invoice.items.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    {item.itemName || "-"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.hsnCode || "-"}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.quantity ?? "-"} {item.unit || ""}
                  </td>
                  <td className="border border-gray-300 p-2 text-right">
                    ₹
                    {item.rate !== undefined
                      ? Number(item.rate).toFixed(2)
                      : "0.00"}
                  </td>
                  <td className="border border-gray-300 p-2 text-right">
                    ₹
                    {item.amount !== undefined
                      ? Number(item.amount).toFixed(2)
                      : "0.00"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-gray-400">
                  No items
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-2 font-bold" colSpan={3}>
                Total
              </td>
              <td className="border border-gray-300 p-2 text-center font-bold">
                {invoice.items.reduce((sum, item) => sum + item.quantity, 0)}
              </td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2 text-right font-bold">
                ₹{invoice.subtotal.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Amount in Words and Tax Calculation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-bold mb-2">Amount in Words:</h4>
          <p className="text-sm border border-gray-300 p-3">
            {toWords(invoice.totalAmount)}
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Tax Calculation:</h4>
          <div className="border border-gray-300 p-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Sub Total:</span>
              <span>₹ {invoice.subtotal.toFixed(2)}</span>
            </div>
            {typeof invoice.adjustment === "number" &&
              invoice.adjustment !== 0 && (
                <div className="flex justify-between">
                  <span>Adjustment:</span>
                  <span>₹ {invoice.adjustment.toFixed(2)}</span>
                </div>
              )}
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
            <p>
              <span className="font-medium">Bank Name:</span> The Ahmedabad
              Dist.Co.Op.Bank Ltd
            </p>
            <p>
              <span className="font-medium">Account Number:</span> 607019119547
            </p>
            <p>
              <span className="font-medium">IFSC Code:</span> GSCB0ADC001
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-2">Additional Notes:</h4>
          <p className="text-sm">
            {invoice.notes ||
              "Thank you for choosing MJ Fabrication for your metal work needs!"}
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
          <p className="text-xs text-gray-500">
            * This is a computer generated invoice.
          </p>
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
  );
};

export default InvoicePrintDocument;
