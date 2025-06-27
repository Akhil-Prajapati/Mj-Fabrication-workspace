import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Calculator, Package } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { getInventoryItems } from "@/api/inventory";
import { InvoiceSchema } from "./invoiceSchema";

interface InvoiceItem {
  id: string;
  itemName: string;
  hsnCode: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
  gstRate: number;
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

interface InvoiceData {
  invoiceNumber: string;
  orderNumber: string;
  invoiceDate: string;
  dueDate: string;
  customer: Customer | null;
  items: InvoiceItem[];
  subtotal: number;
  sgst: number;
  cgst: number;
  igst: number;
  totalAmount: number;
  notes: string;
}

interface InvoiceFormProps {
  onSave: (invoice: InvoiceData) => void;
  onCancel: () => void;
  customers: Customer[];
  selectedCustomer: Customer | null;
  setSelectedCustomer: (customer: Customer | null) => void;
  loading: boolean;
}

// GST validation function
const validateGSTNumber = (gstNumber: string): boolean => {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gstNumber);
};

const InvoiceForm = ({
  onSave,
  onCancel,
  customers,
  selectedCustomer,
  setSelectedCustomer,
  loading,
}: InvoiceFormProps) => {
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState<InvoiceData>({
    invoiceNumber: `INV-`,
    orderNumber: `ORD-`,
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    customer: null,
    items: [],
    subtotal: 0,
    sgst: 0,
    cgst: 0,
    igst: 0,
    totalAmount: 0,
    notes: "",
  });

  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({});
  const [gstError, setGstError] = useState("");

  const [inventoryItems, setInventoryItems] = useState<any[]>([]);
  const [adjustment, setAdjustment] = useState<number>(0);

  // Indian states with state codes
  const indianStates = [
    { name: "Andhra Pradesh", code: "28" },
    { name: "Arunachal Pradesh", code: "12" },
    { name: "Assam", code: "18" },
    { name: "Bihar", code: "10" },
    { name: "Chhattisgarh", code: "22" },
    { name: "Delhi", code: "07" },
    { name: "Goa", code: "30" },
    { name: "Gujarat", code: "24" },
    { name: "Haryana", code: "06" },
    { name: "Himachal Pradesh", code: "02" },
    { name: "Jharkhand", code: "20" },
    { name: "Karnataka", code: "29" },
    { name: "Kerala", code: "32" },
    { name: "Madhya Pradesh", code: "23" },
    { name: "Maharashtra", code: "27" },
    { name: "Manipur", code: "14" },
    { name: "Meghalaya", code: "17" },
    { name: "Mizoram", code: "15" },
    { name: "Nagaland", code: "13" },
    { name: "Odisha", code: "21" },
    { name: "Punjab", code: "03" },
    { name: "Rajasthan", code: "08" },
    { name: "Sikkim", code: "11" },
    { name: "Tamil Nadu", code: "33" },
    { name: "Telangana", code: "36" },
    { name: "Tripura", code: "16" },
    { name: "Uttar Pradesh", code: "09" },
    { name: "Uttarakhand", code: "05" },
    { name: "West Bengal", code: "19" },
  ];

  const companyState = "Gujarat";
  const companyStateCode = "24";

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      itemName: "Item Name",
      hsnCode: "",
      quantity: 1,
      unit: "Pieces",
      rate: 0,
      amount: 0,
      gstRate: 18,
    };
    const updatedItems = [...invoice.items, newItem];
    setInvoice((prev) => ({
      ...prev,
      items: updatedItems,
    }));
    // Auto-calculate when item is added
    calculateTotalsForItems(updatedItems);
  };

  const addFromInventory = (inventoryItemId: string) => {
    const inventoryItem = inventoryItems.find(
      (item: any) => item.itemId === inventoryItemId
    );
    if (inventoryItem) {
      const newItem: InvoiceItem = {
        id: Date.now().toString(),
        itemName: inventoryItem.itemName,
        hsnCode: inventoryItem.hsnCode,
        quantity: 1,
        unit: inventoryItem.unit,
        rate: inventoryItem.sellingPrice,
        amount: inventoryItem.sellingPrice,
        gstRate: 18,
      };
      const updatedItems = [...invoice.items, newItem];
      setInvoice((prev) => ({
        ...prev,
        items: updatedItems,
      }));
      // Auto-calculate when item is added
      calculateTotalsForItems(updatedItems);
    }
  };

  const updateItem = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const updatedItems = invoice.items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === "quantity" || field === "rate") {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    });

    setInvoice((prev) => ({
      ...prev,
      items: updatedItems,
    }));

    // Auto-calculate when item is updated
    calculateTotalsForItems(updatedItems);
  };

  const removeItem = (id: string) => {
    const updatedItems = invoice.items.filter((item) => item.id !== id);
    setInvoice((prev) => ({
      ...prev,
      items: updatedItems,
    }));
    // Auto-calculate when item is removed
    calculateTotalsForItems(updatedItems);
  };

  const calculateTotalsForItems = (items: InvoiceItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);

    let sgst = 0,
      cgst = 0,
      igst = 0;

    if (invoice.customer) {
      const isInterState = invoice.customer.stateCode !== companyStateCode;

      items.forEach((item) => {
        const gstAmount = (item.amount * item.gstRate) / 100;

        if (isInterState) {
          igst += gstAmount;
        } else {
          sgst += gstAmount / 2;
          cgst += gstAmount / 2;
        }
      });
    }

    // Apply adjustment to total
    const totalAmount = subtotal + sgst + cgst + igst + adjustment;

    setInvoice((prev) => ({
      ...prev,
      subtotal,
      sgst,
      cgst,
      igst,
      totalAmount,
    }));
  };

  const calculateTotals = () => {
    calculateTotalsForItems(invoice.items);
  };

  const handleCustomerSelect = (customerId: string) => {
    const customer = customers.find((c) => c.customerId === customerId);
    if (customer) {
      setInvoice((prev) => ({ ...prev, customer }));
      setSelectedCustomer(customer);
      setTimeout(() => calculateTotalsForItems(invoice.items), 100);
    }
  };

  const handleGSTChange = (gstNumber: string) => {
    setNewCustomer((prev) => ({ ...prev, gstNumber }));

    if (gstNumber && !validateGSTNumber(gstNumber)) {
      setGstError("Invalid GST number format");
    } else {
      setGstError("");
      if (gstNumber.length >= 2) {
        const stateCode = gstNumber.substring(0, 2);
        setNewCustomer((prev) => ({ ...prev, stateCode }));
      }
    }
  };

  const createNewCustomer = () => {
    if (!newCustomer.companyName || !newCustomer.gstNumber || gstError) {
      toast({
        title: "Error",
        description: "Please fill all required fields with valid data",
        variant: "destructive",
      });
      return;
    }

    const customer: Customer = {
      customerId: `CUST-${Date.now()}`,
      companyName: newCustomer.companyName!,
      contactPerson: newCustomer.contactPerson || "",
      gstNumber: newCustomer.gstNumber!,
      address: newCustomer.address || "",
      state: newCustomer.state || "",
      stateCode: newCustomer.stateCode || "",
    };

    setInvoice((prev) => ({ ...prev, customer }));
    setNewCustomer({});
    // Recalculate totals when customer changes
    setTimeout(() => calculateTotalsForItems(invoice.items), 100);
  };

  const handleSave = () => {
    if (!invoice.customer) {
      toast({
        title: "Error",
        description: "Please select a customer",
        variant: "destructive",
      });
      return;
    }

    if (invoice.items.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one item",
        variant: "destructive",
      });
      return;
    }

    // Sync adjustment and notes to invoice before save
    const invoiceToSave = {
      ...invoice,
      adjustment,
      notes: invoice.notes,
      items: invoice.items.map((item) => {
        // Find the inventory item to get itemId
        console.log(inventoryItems, "Inventory Items");

        const inventoryMatch = inventoryItems.find(
          (inv) =>
            inv.itemName === item.itemName && inv.hsnCode === item.hsnCode
        );
        let itemId = inventoryMatch ? inventoryMatch.itemId : undefined;
        return { ...item, itemId };
      }),
    };
    calculateTotals();
    onSave(invoiceToSave);
  };

  // Sync selectedCustomer and invoice.customer on mount and when changed
  useEffect(() => {
    if (selectedCustomer) {
      setInvoice((prev) => ({ ...prev, customer: selectedCustomer }));
      // Recalculate totals when customer changes
      setTimeout(() => calculateTotalsForItems(invoice.items), 100);
    }
  }, [selectedCustomer]);

  useEffect(() => {
    // Fetch inventory items from backend
    getInventoryItems()
      .then((data) => {
        console.log(data, "Fetched inventory items");

        setInventoryItems(data || []);
      })
      .catch((err) => {
        setInventoryItems([]);
        console.error("Failed to fetch inventory items", err);
      });
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Invoice Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={(e) =>
                  setInvoice((prev) => ({
                    ...prev,
                    invoiceNumber: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="orderNumber">Order Number</Label>
              <Input
                id="orderNumber"
                value={invoice.orderNumber}
                onChange={(e) =>
                  setInvoice((prev) => ({
                    ...prev,
                    orderNumber: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={invoice.invoiceDate}
                onChange={(e) =>
                  setInvoice((prev) => ({
                    ...prev,
                    invoiceDate: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={invoice.dueDate}
                onChange={(e) =>
                  setInvoice((prev) => ({ ...prev, dueDate: e.target.value }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="customer">Select Customer</Label>
              <Select
                value={invoice.customer?.customerId || "default"}
                onValueChange={handleCustomerSelect}
              >
                <SelectTrigger className="h-10">
                  <SelectValue>
                    {invoice.customer && invoice.customer.customerId
                      ? `${invoice.customer.companyName} - ${invoice.customer.contactPerson}`
                      : "Select a customer"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default" disabled>
                    Select a customer
                  </SelectItem>
                  {customers.map((customer) => (
                    <SelectItem
                      key={customer.customerId}
                      value={customer.customerId}
                    >
                      {customer.companyName} - {customer.contactPerson}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              variant="secondary"
              className="h-10 flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white transition-colors shadow-sm rounded-md px-4 py-2 font-medium"
              onClick={() => navigate("/admin/customers?add=true")}
            >
              <Plus className="h-4 w-4" />
              Add Customer
            </Button>
          </div>

          {invoice.customer && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold">{invoice.customer.companyName}</h4>
              <p>{invoice.customer.contactPerson}</p>
              <p>{invoice.customer.address}</p>
              <p>GST: {invoice.customer.gstNumber}</p>
              <p>
                Place of Supply:{" "}
                {(() => {
                  const stateObj = indianStates.find(
                    (s) => s.code === invoice.customer?.stateCode
                  );
                  return stateObj ? stateObj.name : invoice.customer.state;
                })()}{" "}
                ({invoice.customer.stateCode})
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Invoice Items</CardTitle>
            <div className="flex gap-2">
              <Select onValueChange={addFromInventory} value="">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Add from Inventory" />
                </SelectTrigger>
                <SelectContent>
                  {inventoryItems.map((item: any) => {
                    const count = invoice.items.filter(
                      (i) => i.itemName === item.itemName
                    ).length;
                    return (
                      <SelectItem key={item.itemId} value={item.itemId}>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span>{item.itemName}</span>
                          {count > 0 && (
                            <span className="ml-2 text-xs text-gray-400">
                              (added {count})
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Button onClick={addItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoice.items.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-2 items-end p-4 border rounded-lg"
              >
                <div className="col-span-2">
                  <Label>Item Name</Label>
                  <Input
                    value={item.itemName}
                    onChange={(e) =>
                      updateItem(item.id, "itemName", e.target.value)
                    }
                    placeholder="Item Name"
                  />
                </div>
                <div className="col-span-1">
                  <Label>HSN Code</Label>
                  <Input
                    value={item.hsnCode}
                    onChange={(e) =>
                      updateItem(item.id, "hsnCode", e.target.value)
                    }
                    placeholder="HSN"
                  />
                </div>
                <div className="col-span-1">
                  <Label>Qty</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "quantity",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="col-span-1">
                  <Label>Unit</Label>
                  <Select
                    value={item.unit}
                    onValueChange={(value) =>
                      updateItem(item.id, "unit", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pieces">Pcs</SelectItem>
                      <SelectItem value="Meters">Mtr</SelectItem>
                      <SelectItem value="Kilograms">Kg</SelectItem>
                      <SelectItem value="Square Feet">Sq Ft</SelectItem>
                      <SelectItem value="Linear Feet">Lin Ft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Label>Rate (₹)</Label>
                  <Input
                    type="number"
                    value={item.rate}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "rate",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="col-span-1">
                  <Label>GST %</Label>
                  <Select
                    value={item.gstRate.toString()}
                    onValueChange={(value) =>
                      updateItem(item.id, "gstRate", parseFloat(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="12">12%</SelectItem>
                      <SelectItem value="18">18%</SelectItem>
                      <SelectItem value="28">28%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label>Amount (₹)</Label>
                  <Input
                    type="number"
                    value={item.amount.toFixed(2)}
                    readOnly
                    className="bg-gray-100 font-bold"
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {invoice.subtotal > 0 && (
            <div className="mt-6 border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-3">
                Tax Calculation Summary
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono">
                    ₹{invoice.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Adjustment:</span>
                  <Input
                    type="number"
                    className="w-32 font-mono"
                    value={adjustment}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setAdjustment(val);
                      calculateTotalsForItems(invoice.items);
                    }}
                    step="0.01"
                  />
                </div>
                {invoice.sgst > 0 && invoice.cgst > 0 && (
                  <>
                    <div className="flex justify-between text-blue-600">
                      <span>SGST @ 9%:</span>
                      <span className="font-mono">
                        ₹{invoice.sgst.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-blue-600">
                      <span>CGST @ 9%:</span>
                      <span className="font-mono">
                        ₹{invoice.cgst.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
                {invoice.igst > 0 && (
                  <div className="flex justify-between text-purple-600">
                    <span>IGST @ 18%:</span>
                    <span className="font-mono">
                      ₹{invoice.igst.toFixed(2)}
                    </span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Grand Total:</span>
                  <span className="font-mono text-green-600">
                    ₹{invoice.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Terms and conditions, payment details, delivery instructions, etc."
            value={invoice.notes}
            onChange={(e) =>
              setInvoice((prev) => ({ ...prev, notes: e.target.value }))
            }
            className="min-h-20"
          />
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          onClick={handleSave}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          Save Invoice
        </Button>
        <Button onClick={onCancel} variant="outline" className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default InvoiceForm;
