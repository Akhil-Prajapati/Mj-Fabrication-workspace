import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Types
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
  adjustment?: number;
  amountInWords?: string;
}

interface Props {
  invoice: InvoicePreviewData;
  indianStates: { name: string; code: string }[];
  numberToWords?: (num: number) => string;
  logoUrl?: string;
}

// Simple styles using only built-in fonts
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    textAlign: "center",
    marginBottom: 8,
  },
  section: {
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#222",
    borderStyle: "solid",
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 20,
  },
  tableHeader: {
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 11,
    borderRightWidth: 1,
    borderColor: "#222",
    borderStyle: "solid",
    padding: 4,
    textAlign: "center",
    flexGrow: 1,
  },
  tableCell: {
    borderRightWidth: 1,
    borderColor: "#222",
    borderStyle: "solid",
    padding: 8,
    fontSize: 10,
    textAlign: "center",
    flexGrow: 1,
    minHeight: 22,
    backgroundColor: "#fff",
  },
  tableCellLeft: {
    textAlign: "left",
    paddingLeft: 10,
  },
  tableCellRight: {
    textAlign: "right",
    paddingRight: 10,
  },
  tableFooter: {
    borderTop: "1 solid #222",
    backgroundColor: "#fff",
    fontWeight: "bold",
    minHeight: 20,
  },
  summaryBox: {
    borderWidth: 1,
    borderColor: "#222",
    borderStyle: "solid",
    padding: 8,
    marginBottom: 4,
    backgroundColor: "#f8f8f8",
  },
  signature: {
    marginTop: 32,
    textAlign: "right",
    fontSize: 11,
  },
  small: {
    fontSize: 9,
    color: "#666",
  },
});

// Safe currency formatting - using Rs. to avoid symbol issues
const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return "Rs. 0.00";
  }
  try {
    return `Rs. ${Number(amount).toFixed(2)}`;
  } catch (error) {
    return "Rs. 0.00";
  }
};

// Safe number formatting
const safeNumber = (value: any): number => {
  if (value === undefined || value === null) return 0;
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};

const InvoicePDFDocument: React.FC<Props> = ({
  invoice,
  indianStates,
  numberToWords,
  logoUrl,
}) => {
  const toWords =
    numberToWords ||
    ((num: number): string => {
      if (invoice.amountInWords) return invoice.amountInWords;
      if (num === 0) return "Zero Rupees Only";
      try {
        return `${Math.floor(num).toLocaleString()} Rupees Only`;
      } catch (error) {
        return "Amount in words not available";
      }
    });

  const placeOfSupply = (() => {
    try {
      const code = invoice.customer.stateCode || invoice.customer.state;
      const found = indianStates.find(
        (s) => s.code === code || s.name === code
      );
      return found ? found.name : invoice.customer.state || "-";
    } catch (error) {
      return "-";
    }
  })();

  // Safe access to invoice data
  const safeInvoice = {
    invoiceNumber: invoice?.invoiceNumber || "-",
    invoiceDate: invoice?.invoiceDate || "",
    dueDate: invoice?.dueDate || "",
    customer: {
      companyName: invoice?.customer?.companyName || "-",
      contactPerson: invoice?.customer?.contactPerson || "-",
      address: invoice?.customer?.address || "-",
      gstNumber: invoice?.customer?.gstNumber || "-",
    },
    items: invoice?.items || [],
    subtotal: safeNumber(invoice?.subtotal),
    sgst: safeNumber(invoice?.sgst),
    cgst: safeNumber(invoice?.cgst),
    igst: safeNumber(invoice?.igst),
    totalAmount: safeNumber(invoice?.totalAmount),
    notes: invoice?.notes || "-",
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={{ alignItems: "center", marginBottom: 8 }}>
          <View style={{ marginBottom: 4 }}>
            <Image
              src="/logo.jpeg"
              style={{
                width: 200,
                height: 100,
                objectFit: "contain",
                alignSelf: "center",
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#1976d2",
              marginBottom: 2,
            }}
          >
            MJ FABRICATION
          </Text>
          <Text style={{ fontSize: 10, color: "#000" }}>
            31, MAHESHWARI PARK SOCIETY, AMARPARK RCC RD
          </Text>
          <Text style={{ fontSize: 10, color: "#000" }}>
            VASANT VIHAR 2, NAVA NARODA, AHMEDABAD
          </Text>
          <Text style={{ fontSize: 10, color: "#000" }}>
            GUJARAT, INDIA - 382330
          </Text>
          <Text style={{ fontSize: 10, color: "#000" }}>
            Phone: 9712929748 | Email: mjfabworld62@gmail.com
          </Text>
          <Text style={{ fontSize: 10, color: "#000", marginBottom: 2 }}>
            GSTN: 24AFZPP4386C1ZY
          </Text>
        </View>

        {/* TAX INVOICE Centered Box */}
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#222",
              padding: 6,
              borderRadius: 2,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 13, color: "#000" }}>
              TAX INVOICE
            </Text>
          </View>
        </View>

        {/* Bill To & Invoice Details Row */}
        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={{ fontWeight: "bold", fontSize: 11, marginBottom: 2 }}>
              Bill To:
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 10 }}>
              {safeInvoice.customer.companyName}
            </Text>
            <Text style={{ fontSize: 10 }}>
              {safeInvoice.customer.contactPerson}
            </Text>
            <Text style={{ fontSize: 10 }}>{safeInvoice.customer.address}</Text>
            <Text style={{ fontSize: 10 }}>
              Place of Supply: {placeOfSupply}
            </Text>
            <Text style={{ fontSize: 10 }}>
              GSTN: {safeInvoice.customer.gstNumber}
            </Text>
          </View>
          <View style={{ flex: 1, paddingLeft: 8 }}>
            <Text style={{ fontWeight: "bold", fontSize: 11, marginBottom: 2 }}>
              Invoice Details:
            </Text>
            <Text style={{ fontSize: 10, marginBottom: 2 }}>
              Invoice No: {safeInvoice.invoiceNumber}
            </Text>
            <Text style={{ fontSize: 10, marginBottom: 2 }}>
              Invoice Date:{" "}
              {safeInvoice.invoiceDate
                ? new Date(safeInvoice.invoiceDate).toLocaleDateString()
                : "-"}
            </Text>
            <Text style={{ fontSize: 10, marginBottom: 2 }}>
              Payment Terms: Net 30
            </Text>
            <Text style={{ fontSize: 10, marginBottom: 2 }}>
              Due Date:{" "}
              {safeInvoice.dueDate
                ? new Date(safeInvoice.dueDate).toLocaleDateString()
                : "-"}
            </Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, { flex: 0.7 }]}>S.N.</Text>
            <Text style={[styles.tableHeader, { flex: 2 }]}>
              Item Description
            </Text>
            <Text style={[styles.tableHeader, { flex: 1.2 }]}>HSN/SAC</Text>
            <Text style={[styles.tableHeader, { flex: 1 }]}>Qty</Text>
            <Text style={[styles.tableHeader, { flex: 1 }]}>Rate</Text>
            <Text style={[styles.tableHeader, { flex: 1.2 }]}>Amount</Text>
          </View>

          {safeInvoice.items.length > 0 ? (
            safeInvoice.items.map((item, idx) => (
              <View style={styles.tableRow} key={item.id || idx}>
                <Text style={[styles.tableCell, { flex: 0.7 }]}>{idx + 1}</Text>
                <Text
                  style={[styles.tableCell, styles.tableCellLeft, { flex: 2 }]}
                >
                  {item.itemName || "-"}
                </Text>
                <Text style={[styles.tableCell, { flex: 1.2 }]}>
                  {item.hsnCode || "-"}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {safeNumber(item.quantity) + " " + (item.unit || "")}
                </Text>
                <Text
                  style={[styles.tableCell, styles.tableCellRight, { flex: 1 }]}
                >
                  {formatCurrency(item.rate)}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.tableCellRight,
                    { flex: 1.2 },
                  ]}
                >
                  {formatCurrency(item.amount)}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 0.7 }]}>-</Text>
              <Text
                style={[styles.tableCell, styles.tableCellLeft, { flex: 2 }]}
              >
                No items
              </Text>
              <Text style={[styles.tableCell, { flex: 1.2 }]}>-</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>-</Text>
              <Text
                style={[styles.tableCell, styles.tableCellRight, { flex: 1 }]}
              >
                -
              </Text>
              <Text
                style={[styles.tableCell, styles.tableCellRight, { flex: 1.2 }]}
              >
                -
              </Text>
            </View>
          )}

          {/* Table Footer */}
          <View style={[styles.tableRow, styles.tableFooter]}>
            <Text style={[styles.tableCell, { flex: 0.7 }]}> </Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>Total</Text>
            <Text style={[styles.tableCell, { flex: 1.2 }]}></Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {safeInvoice.items.reduce(
                (sum, item) => sum + safeNumber(item.quantity),
                0
              )}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}></Text>
            <Text
              style={[styles.tableCell, styles.tableCellRight, { flex: 1.2 }]}
            >
              {formatCurrency(safeInvoice.subtotal)}
            </Text>
          </View>
        </View>

        {/* Amount in Words & Tax Calculation Row */}
        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={{ fontWeight: "bold", fontSize: 10, marginBottom: 2 }}>
              Amount in Words:
            </Text>
            <Text style={{ fontSize: 10 }}>
              {toWords(safeInvoice.totalAmount)}
            </Text>
          </View>
          <View style={{ flex: 1, ...styles.summaryBox }}>
            <Text style={{ fontWeight: "bold", fontSize: 10, marginBottom: 2 }}>
              Tax Calculation:
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: 10,
              }}
            >
              <Text>Sub Total:</Text>
              <Text>{formatCurrency(safeInvoice.subtotal)}</Text>
            </View>
            {safeInvoice.sgst > 0 && safeInvoice.cgst > 0 && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: 10,
                  }}
                >
                  <Text>SGST @ 9%:</Text>
                  <Text>{formatCurrency(safeInvoice.sgst)}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: 10,
                  }}
                >
                  <Text>CGST @ 9%:</Text>
                  <Text>{formatCurrency(safeInvoice.cgst)}</Text>
                </View>
              </>
            )}
            {safeInvoice.igst > 0 && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  fontSize: 10,
                }}
              >
                <Text>IGST @ 18%:</Text>
                <Text>{formatCurrency(safeInvoice.igst)}</Text>
              </View>
            )}
            <View
              style={{
                borderTopWidth: 1,
                borderColor: "#222",
                marginVertical: 2,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: 10,
              }}
            >
              <Text>Grand Total:</Text>
              <Text>{formatCurrency(safeInvoice.totalAmount)}</Text>
            </View>
          </View>
        </View>

        {/* Bank Details, Notes, Terms Row */}
        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={{ fontWeight: "bold", fontSize: 10, marginBottom: 2 }}>
              Bank Details:
            </Text>
            <Text style={styles.small}>
              Bank Name: The Ahmedabad Dist.Co.Op.Bank Ltd
            </Text>
            <Text style={styles.small}>Account Number: 607019119547</Text>
            <Text style={styles.small}>IFSC Code: GSCB0ADC001</Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 10,
                marginTop: 4,
                marginBottom: 2,
              }}
            >
              Terms & Conditions:
            </Text>
            <Text style={styles.small}>
              • Payment is due within 30 days of invoice date
            </Text>
            <Text style={styles.small}>
              • All disputes must be reported within 7 days
            </Text>
            <Text style={styles.small}>
              • Late payments may incur additional charges
            </Text>
            <Text style={styles.small}>
              • Goods once delivered will not be taken back
            </Text>
          </View>
          <View style={{ flex: 1, paddingLeft: 8 }}>
            <Text style={{ fontWeight: "bold", fontSize: 10, marginBottom: 2 }}>
              Additional Notes:
            </Text>
            <Text style={styles.small}>{safeInvoice.notes}</Text>
          </View>
        </View>

        {/* Signature */}
        <View style={styles.signature}>
          <Text>MJ FABRICATION</Text>
          <Text
            style={{
              marginTop: 36,
              borderTop: 1,
              borderColor: "#222",
              width: 120,
              alignSelf: "flex-end",
              textAlign: "center",
            }}
          >
            Authorized Signature
          </Text>
        </View>

        {/* Footer */}
        <Text style={[styles.small, { marginTop: 12 }]}>
          * This is a computer generated invoice.
        </Text>
      </Page>
    </Document>
  );
};

export default InvoicePDFDocument;
