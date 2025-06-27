import { useState, useEffect, useCallback } from "react";
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
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<InventoryItem | null>(null);

  const loadInventoryItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getInventoryItems();
      setItems(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load inventory items. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInventoryItems();
  }, [loadInventoryItems]);

  const handleAddItem = async (newItem: InventoryItem) => {
    setIsSubmitting(true);
    try {
      await createInventoryItem(newItem);
      await loadInventoryItems(); // Refresh the list
      setShowForm(false);
      toast({
        title: "Success",
        description: `${newItem.itemName} has been added to inventory.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add inventory item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditItem = async (updatedItem: InventoryItem) => {
    setIsSubmitting(true);
    try {
      await updateInventoryItem(updatedItem.itemId, updatedItem);
      await loadInventoryItems(); // Refresh the list
      setShowForm(false);
      setEditingItem(undefined);
      toast({
        title: "Success",
        description: `${updatedItem.itemName} has been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update inventory item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDeleteItem = async (item: InventoryItem) => {
    setItemToDelete(item);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setIsSubmitting(true);
    try {
      await deleteInventoryItem(itemToDelete.itemId);
      await loadInventoryItems(); // Refresh the list
      toast({
        title: "Success",
        description: `${itemToDelete.itemName} has been removed from inventory.`,
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to delete inventory item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setItemToDelete(null);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
          <Button onClick={() => setShowForm(true)} disabled={isSubmitting}>
            Add New Item
          </Button>
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
          isSubmitting={isSubmitting}
        />
      ) : (
        <InventoryList
          items={items}
          onEdit={startEdit}
          onDelete={handleDeleteItem}
          isLoading={isSubmitting}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!itemToDelete}
        onOpenChange={() => setItemToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {itemToDelete?.itemName} from the
              inventory. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InventoryManagement;
