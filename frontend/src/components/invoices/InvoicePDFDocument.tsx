import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

// Types copied from InvoicePreview
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
  logoUrl?: string; // Optional logo image path
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    padding: 24,
    backgroundColor: "#fff",
  },
  logo: {
    width: 80,
    height: 40,
    marginBottom: 8,
    objectFit: "contain",
    alignSelf: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: 8,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  companyDetails: {
    fontSize: 10,
    color: "#333",
    marginBottom: 1,
  },
  gstn: {
    fontWeight: "bold",
    fontSize: 11,
    marginBottom: 8,
  },
  invoiceTitle: {
    textAlign: "right",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: -30,
  },
  section: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
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
    backgroundColor: "#1976d2",
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
    padding: 4,
    fontSize: 10,
    textAlign: "center",
    flexGrow: 1,
    minHeight: 18,
  },
  tableCellLeft: {
    textAlign: "left",
    paddingLeft: 6,
  },
  tableCellRight: {
    textAlign: "right",
    paddingRight: 6,
  },
  tableFooter: {
    backgroundColor: "#f1f1f1",
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
      if (num === 0) return "Zero";
      return `${Math.floor(num).toLocaleString()} Rupees Only`;
    });
  const placeOfSupply = (() => {
    const code = invoice.customer.stateCode || invoice.customer.state;
    const found = indianStates.find((s) => s.code === code || s.name === code);
    return found
      ? `${found.name} (${found.code})`
      : invoice.customer.state || "-";
  })();
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo and Title Row */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ flex: 1 }}>
            {logoUrl && <Image src={logoUrl} style={styles.logo} />}
          </View>
          <Text style={styles.invoiceTitle}>TAX INVOICE</Text>
        </View>
        {/* Company Header */}
        <View style={styles.header}>
          <Text style={styles.companyName}>MJ FABRICATION</Text>
          <Text style={styles.companyDetails}>
            31, MAHESHWARI PARK SOCIETY,KATHWAD ROAD NAVA NARODA
          </Text>
          <Text style={styles.companyDetails}>
            AHMEDABAD, Gujarat India - 382330
          </Text>
          <Text style={styles.companyDetails}>
            M: 9712929748 EMAIL: mjfabworld62@gmail.com
          </Text>
          <Text style={styles.companyDetails}>
            WEBSITE: https://g.page/fabrication-ahmedabad?share
          </Text>
          <Text style={styles.gstn}>GSTN: 24AFZPP4386C1ZY</Text>
        </View>
        {/* Customer & Invoice Info Row */}
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#222",
            borderStyle: "solid",
            marginBottom: 8,
          }}
        >
          <View
            style={{
              flex: 2,
              padding: 6,
              borderRightWidth: 1,
              borderColor: "#222",
              borderStyle: "solid",
            }}
          >
            <Text style={styles.bold}>{invoice.customer.companyName}</Text>
            <Text>{invoice.customer.address}</Text>
            <Text>{invoice.customer.contactPerson}</Text>
            <Text>Ahmedabad, Gujarat - 382330</Text>
            <Text>Place of Supply : {placeOfSupply}</Text>
            <Text style={styles.bold}>GSTN : {invoice.customer.gstNumber}</Text>
          </View>
          <View style={{ flex: 2, padding: 6 }}>
            <Text>
              <Text style={styles.bold}>Invoice No: </Text>
              {invoice.invoiceNumber || "-"}
            </Text>
            <Text>
              <Text style={styles.bold}>Invoice Date: </Text>
              {invoice.invoiceDate
                ? new Date(invoice.invoiceDate).toLocaleDateString()
                : "-"}
            </Text>
            <Text>
              <Text style={styles.bold}>Payment Terms: </Text>Due on Receipt
            </Text>
            <Text>
              <Text style={styles.bold}>Invoice Due Date: </Text>
              {invoice.dueDate
                ? new Date(invoice.dueDate).toLocaleDateString()
                : "-"}
            </Text>
          </View>
        </View>
        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, { flex: 0.7 }]}>S.N.</Text>
            <Text style={[styles.tableHeader, { flex: 2 }]}>Item</Text>
            <Text style={[styles.tableHeader, { flex: 1.2 }]}>HSN/SAC</Text>
            <Text style={[styles.tableHeader, { flex: 1 }]}>Qty</Text>
            <Text style={[styles.tableHeader, { flex: 1 }]}>Rate</Text>
            <Text style={[styles.tableHeader, { flex: 1.2 }]}>Amount</Text>
          </View>
          {invoice.items.map((item, idx) => (
            <View style={styles.tableRow} key={item.id}>
              <Text style={[styles.tableCell, { flex: 0.7 }]}>{idx + 1}</Text>
              <Text
                style={[styles.tableCell, styles.tableCellLeft, { flex: 2 }]}
              >
                {item.itemName}
              </Text>
              <Text style={[styles.tableCell, { flex: 1.2 }]}>
                {item.hsnCode}
              </Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {item.quantity} {item.unit}
              </Text>
              <Text
                style={[styles.tableCell, styles.tableCellRight, { flex: 1 }]}
              >
                ₹{Number(item.rate).toFixed(2)}
              </Text>
              <Text
                style={[styles.tableCell, styles.tableCellRight, { flex: 1.2 }]}
              >
                ₹{Number(item.amount).toFixed(2)}
              </Text>
            </View>
          ))}
          {/* Table Footer */}
          <View style={[styles.tableRow, styles.tableFooter]}>
            <Text style={[styles.tableCell, { flex: 0.7 }]}> </Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>Total</Text>
            <Text style={[styles.tableCell, { flex: 1.2 }]}></Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {invoice.items.reduce((sum, item) => sum + item.quantity, 0)}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}></Text>
            <Text
              style={[styles.tableCell, styles.tableCellRight, { flex: 1.2 }]}
            >
              ₹{invoice.subtotal.toFixed(2)}
            </Text>
          </View>
        </View>
        {/* Summary and Bank Details Row */}
        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          {/* Left: Total in words, Bank, Notes, Terms */}
          <View style={{ flex: 2, paddingRight: 8 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 2 }}>
              Total in words:
            </Text>
            <Text style={{ fontSize: 10, marginBottom: 4 }}>
              {toWords(invoice.totalAmount)}
            </Text>
            <Text style={{ fontWeight: "bold", marginBottom: 2 }}>
              Bank Details:
            </Text>
            <Text style={styles.small}>
              Bank Name: The Ahmedabad Dist.Co.Op.Bank Ltd
            </Text>
            <Text style={styles.small}>Account Number: 607019119547</Text>
            <Text style={styles.small}>IFSC: GSCB0ADC001</Text>
            <Text style={{ fontWeight: "bold", marginTop: 4, marginBottom: 2 }}>
              Notes:
            </Text>
            <Text style={styles.small}>
              {invoice.notes || "Thanks for your business."}
            </Text>
            <Text style={{ fontWeight: "bold", marginTop: 4, marginBottom: 2 }}>
              Terms & Conditions:
            </Text>
            <Text style={styles.small}>
              General terms and conditions apply.
            </Text>
          </View>
          {/* Right: Tax summary */}
          <View style={{ flex: 1, ...styles.summaryBox }}>
            <Text>
              Sub Total :{" "}
              <Text style={styles.bold}>₹ {invoice.subtotal.toFixed(2)}</Text>
            </Text>
            {invoice.sgst > 0 && invoice.cgst > 0 && (
              <>
                <Text>
                  SGST @ 9.0% :{" "}
                  <Text style={styles.bold}>₹ {invoice.sgst.toFixed(2)}</Text>
                </Text>
                <Text>
                  CGST @ 9.0% :{" "}
                  <Text style={styles.bold}>₹ {invoice.cgst.toFixed(2)}</Text>
                </Text>
              </>
            )}
            {invoice.igst > 0 && (
              <Text>
                IGST @ 18.0% :{" "}
                <Text style={styles.bold}>₹ {invoice.igst.toFixed(2)}</Text>
              </Text>
            )}
            <Text
              style={{
                marginTop: 4,
                backgroundColor: "#1976d2",
                color: "#fff",
                padding: 4,
                fontWeight: "bold",
              }}
            >
              Total : ₹ {invoice.totalAmount.toFixed(2)}
            </Text>
          </View>
        </View>
        {/* Signature Row */}
        <View style={styles.signature}>
          <Text>For, MJ FABRICATION</Text>
          <Text
            style={{
              marginTop: 24,
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
        {/* Footer note */}
        <Text style={[styles.small, { marginTop: 12 }]}>
          * This is a computer generated receipt.
        </Text>
      </Page>
    </Document>
  );
};

export default InvoicePDFDocument;
