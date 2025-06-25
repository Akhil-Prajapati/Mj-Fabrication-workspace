import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import InventoryFormEnhanced from "@/components/inventory/InventoryFormEnhanced";
import InventoryList from "@/components/inventory/InventoryList";
import {
  getInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "@/api/inventory";

interface InventoryItem {
  itemId: string;
  itemName: string;
  category: string;
  subCategory: string;
  description: string;
  hsnCode: string;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  stockQuantity: number;
  reorderLevel: number;
  supplierInfo: string;
  specifications: Record<string, string>;
  gstRate: number;
  createdDate: string;
  lastModified: string;
}

const InventoryManagement = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | undefined>();

  useEffect(() => {
    // Load inventory from backend
    getInventoryItems()
      .then(setItems)
      .catch(() => setItems([]));
  }, [navigate]);

  const handleAddItem = async (newItem: InventoryItem) => {
    try {
      const saved = await createInventoryItem(newItem);
      setItems((prev) => [...prev, saved]);
      setShowForm(false);
      toast({
        title: "Item Added",
        description: `${saved.itemName} has been added to inventory.`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to add inventory item.",
        variant: "destructive",
      });
    }
  };

  const handleEditItem = async (updatedItem: InventoryItem) => {
    try {
      const saved = await updateInventoryItem(updatedItem.itemId, updatedItem);
      setItems((prev) =>
        prev.map((item) => (item.itemId === saved.itemId ? saved : item))
      );
      setShowForm(false);
      setEditingItem(undefined);
      toast({
        title: "Item Updated",
        description: `${saved.itemName} has been updated.`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update inventory item.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    const itemToDelete = items.find((item) => item.itemId === itemId);
    try {
      await deleteInventoryItem(itemId);
      setItems((prev) => prev.filter((item) => item.itemId !== itemId));
      toast({
        title: "Item Deleted",
        description: `${itemToDelete?.itemName} has been removed from inventory.`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete inventory item.",
        variant: "destructive",
      });
    }
  };

  const startEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingItem(undefined);
  };

  const lowStockItems = items.filter(
    (item) => item.stockQuantity <= item.reorderLevel
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your fabrication inventory with custom categories and GST
            rates
          </p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>Add New Item</Button>
        )}
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && !showForm && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            ⚠️ Low Stock Alerts ({lowStockItems.length} items)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {lowStockItems.map((item) => (
              <div key={item.itemId} className="text-sm text-yellow-700">
                <span className="font-medium">{item.itemName}</span>
                <span className="ml-2">
                  ({item.stockQuantity} {item.unit} remaining)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form or List */}
      {showForm ? (
        <InventoryFormEnhanced
          item={editingItem}
          onSubmit={editingItem ? handleEditItem : handleAddItem}
          onCancel={cancelForm}
        />
      ) : (
        <InventoryList
          items={items}
          onEdit={startEdit}
          onDelete={handleDeleteItem}
        />
      )}
    </div>
  );
};

export default InventoryManagement;
