import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Edit, Trash2, AlertTriangle } from "lucide-react";

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
  createdDate: string;
  lastModified: string;
}

interface InventoryListProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (itemId: string) => void;
}

const InventoryList = ({ items, onEdit, onDelete }: InventoryListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hsnCode.includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && item.stockQuantity <= item.reorderLevel) ||
      (stockFilter === "out" && item.stockQuantity === 0) ||
      (stockFilter === "available" && item.stockQuantity > item.reorderLevel);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.itemName.localeCompare(b.itemName);
      case "price":
        return a.sellingPrice - b.sellingPrice;
      case "stock":
        return a.stockQuantity - b.stockQuantity;
      case "created":
        return (
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
      default:
        return 0;
    }
  });

  const getStockStatus = (item: InventoryItem) => {
    if (item.stockQuantity === 0)
      return { status: "Out of Stock", color: "destructive" };
    if (item.stockQuantity <= item.reorderLevel)
      return { status: "Low Stock", color: "warning" };
    return { status: "In Stock", color: "success" };
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <SelectItem value="all">All Categories</SelectItem>
            {[...new Set(items.map((item) => item.category))]
              .filter((cat) => cat && cat.trim() !== "")
              .map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}

            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="available">In Stock</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="out">Out of Stock</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="stock">Stock</SelectItem>
                <SelectItem value="created">Date Added</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-gray-600 flex items-center">
              Showing {sortedItems.length} of {items.length} items
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedItems.map((item) => {
          const stockStatus = getStockStatus(item);
          return (
            <Card
              key={item.itemId}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.itemName}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {item.category} - {item.subCategory}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(item.itemId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    HSN: {item.hsnCode}
                  </span>
                  <Badge variant={stockStatus.color as any}>
                    {item.stockQuantity <= item.reorderLevel &&
                      item.stockQuantity > 0 && (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      )}
                    {stockStatus.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Stock:</span>
                    <span className="ml-2 font-medium">
                      {item.stockQuantity} {item.unit}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Price:</span>
                    <span className="ml-2 font-medium">
                      ₹{item.sellingPrice}
                    </span>
                  </div>
                </div>

                {item.description && (
                  <p
                    className="text-sm text-gray-600 truncate"
                    title={item.description}
                  >
                    {item.description}
                  </p>
                )}

                {Object.keys(item.specifications).length > 0 && (
                  <div className="pt-2 border-t">
                    <span className="text-xs text-gray-500">
                      Specifications:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {Object.entries(item.specifications)
                        .slice(0, 2)
                        .map(([key, value]) => (
                          <Badge
                            key={key}
                            variant="secondary"
                            className="text-xs"
                          >
                            {key}: {value}
                          </Badge>
                        ))}
                      {Object.keys(item.specifications).length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{Object.keys(item.specifications).length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {sortedItems.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">
              No items found matching your criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InventoryList;
