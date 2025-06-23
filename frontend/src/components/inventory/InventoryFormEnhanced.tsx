
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Save, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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

interface InventoryFormEnhancedProps {
  item?: InventoryItem;
  onSubmit: (item: InventoryItem) => void;
  onCancel: () => void;
}

const InventoryFormEnhanced = ({ item, onSubmit, onCancel }: InventoryFormEnhancedProps) => {
  const [formData, setFormData] = useState<InventoryItem>({
    itemId: item?.itemId || `ITM-${Date.now()}`,
    itemName: item?.itemName || '',
    category: item?.category || '',
    subCategory: item?.subCategory || '',
    description: item?.description || '',
    hsnCode: item?.hsnCode || '',
    unit: item?.unit || 'Pieces',
    costPrice: item?.costPrice || 0,
    sellingPrice: item?.sellingPrice || 0,
    stockQuantity: item?.stockQuantity || 0,
    reorderLevel: item?.reorderLevel || 0,
    supplierInfo: item?.supplierInfo || '',
    specifications: item?.specifications || {},
    gstRate: item?.gstRate || 18,
    createdDate: item?.createdDate || new Date().toISOString(),
    lastModified: new Date().toISOString()
  });

  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  const defaultCategories = [
    'windows',
    'doors', 
    'brackets',
    'frames',
    'railings',
    'canopies',
    'staircases',
    'gates',
    'grills',
    'shutters'
  ];

  useEffect(() => {
    // Load custom categories from localStorage
    const savedCategories = localStorage.getItem('customCategories');
    if (savedCategories) {
      setCustomCategories(JSON.parse(savedCategories));
    }
  }, []);

  const saveCustomCategories = (categories: string[]) => {
    localStorage.setItem('customCategories', JSON.stringify(categories));
    setCustomCategories(categories);
  };

  const addCustomCategory = () => {
    if (newCategory.trim() && !customCategories.includes(newCategory.trim())) {
      const updatedCategories = [...customCategories, newCategory.trim()];
      saveCustomCategories(updatedCategories);
      setFormData(prev => ({ ...prev, category: newCategory.trim() }));
      setNewCategory('');
      setShowAddCategory(false);
      toast({
        title: "Category Added",
        description: `${newCategory} has been added to categories.`,
      });
    }
  };

  const handleSpecificationChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: { ...prev.specifications, [key]: value }
    }));
  };

  const addSpecification = () => {
    const key = `spec_${Object.keys(formData.specifications).length + 1}`;
    handleSpecificationChange(key, '');
  };

  const removeSpecification = (key: string) => {
    const newSpecs = { ...formData.specifications };
    delete newSpecs[key];
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.itemName || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
  };

  const allCategories = [...defaultCategories, ...customCategories];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="h-5 w-5" />
          {item ? 'Edit Inventory Item' : 'Add New Inventory Item'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="itemName">Item Name *</Label>
              <Input
                id="itemName"
                value={formData.itemName}
                onChange={(e) => setFormData(prev => ({ ...prev, itemName: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="itemId">Item ID</Label>
              <Input
                id="itemId"
                value={formData.itemId}
                onChange={(e) => setFormData(prev => ({ ...prev, itemId: e.target.value }))}
                disabled={!!item}
              />
            </div>
          </div>

          {/* Category Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <div className="flex gap-2">
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {allCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddCategory(!showAddCategory)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {showAddCategory && (
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="New category name"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Button type="button" size="sm" onClick={addCustomCategory}>
                      Add
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => setShowAddCategory(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="subCategory">Sub Category</Label>
                <Input
                  id="subCategory"
                  value={formData.subCategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, subCategory: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="hsnCode">HSN Code</Label>
              <Input
                id="hsnCode"
                value={formData.hsnCode}
                onChange={(e) => setFormData(prev => ({ ...prev, hsnCode: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pieces">Pieces</SelectItem>
                  <SelectItem value="Meters">Meters</SelectItem>
                  <SelectItem value="Kilograms">Kilograms</SelectItem>
                  <SelectItem value="Square Feet">Square Feet</SelectItem>
                  <SelectItem value="Linear Feet">Linear Feet</SelectItem>
                  <SelectItem value="Sets">Sets</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="gstRate">GST Rate (%)</Label>
              <Select value={formData.gstRate.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, gstRate: parseFloat(value) }))}>
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
          </div>

          {/* Pricing & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="costPrice">Cost Price (₹)</Label>
              <Input
                id="costPrice"
                type="number"
                value={formData.costPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, costPrice: parseFloat(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <Label htmlFor="sellingPrice">Selling Price (₹)</Label>
              <Input
                id="sellingPrice"
                type="number"
                value={formData.sellingPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, sellingPrice: parseFloat(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <Label htmlFor="stockQuantity">Stock Quantity</Label>
              <Input
                id="stockQuantity"
                type="number"
                value={formData.stockQuantity}
                onChange={(e) => setFormData(prev => ({ ...prev, stockQuantity: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <Label htmlFor="reorderLevel">Reorder Level</Label>
              <Input
                id="reorderLevel"
                type="number"
                value={formData.reorderLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, reorderLevel: parseInt(e.target.value) || 0 }))}
              />
            </div>
          </div>

          {/* Supplier Information */}
          <div>
            <Label htmlFor="supplierInfo">Supplier Information</Label>
            <Input
              id="supplierInfo"
              value={formData.supplierInfo}
              onChange={(e) => setFormData(prev => ({ ...prev, supplierInfo: e.target.value }))}
              placeholder="Supplier name and contact details"
            />
          </div>

          {/* Specifications */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <Label>Specifications</Label>
              <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
                <Plus className="h-4 w-4 mr-2" />
                Add Specification
              </Button>
            </div>
            <div className="space-y-2">
              {Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <Input
                    placeholder="Property name"
                    value={key.replace('spec_', '')}
                    onChange={(e) => {
                      const newKey = `spec_${e.target.value}`;
                      const newSpecs = { ...formData.specifications };
                      delete newSpecs[key];
                      newSpecs[newKey] = value;
                      setFormData(prev => ({ ...prev, specifications: newSpecs }));
                    }}
                  />
                  <Input
                    placeholder="Property value"
                    value={value}
                    onChange={(e) => handleSpecificationChange(key, e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeSpecification(key)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              {item ? 'Update Item' : 'Add Item'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InventoryFormEnhanced;
