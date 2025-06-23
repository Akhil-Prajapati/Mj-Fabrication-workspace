
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  createdDate: string;
  lastModified: string;
}

interface InventoryFormProps {
  item?: InventoryItem;
  onSubmit: (item: InventoryItem) => void;
  onCancel: () => void;
}

const categories = {
  'shades': ['Outdoor Shades', 'Indoor Shades', 'Commercial Shades', 'Residential Shades'],
  'doors': ['Main Door Frames', 'Interior Door Frames', 'Security Door Frames', 'Sliding Door Frames'],
  'windows': ['Casement Windows', 'Sliding Windows', 'Fixed Windows', 'Bay Windows'],
  'stairs': ['Straight Stairs', 'Curved Stairs', 'Spiral Stairs', 'Platform Stairs'],
  'custom': ['Custom Fabrication', 'Repair Work', 'Installation Services', 'Consultation']
};

const units = ['Pieces', 'Meters', 'Square Meters', 'Kilograms', 'Feet', 'Square Feet'];

const InventoryForm = ({ item, onSubmit, onCancel }: InventoryFormProps) => {
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    itemName: item?.itemName || '',
    category: item?.category || '',
    subCategory: item?.subCategory || '',
    description: item?.description || '',
    hsnCode: item?.hsnCode || '',
    unit: item?.unit || 'Pieces',
    costPrice: item?.costPrice || 0,
    sellingPrice: item?.sellingPrice || 0,
    stockQuantity: item?.stockQuantity || 0,
    reorderLevel: item?.reorderLevel || 10,
    supplierInfo: item?.supplierInfo || '',
    specifications: item?.specifications || {},
  });

  const [specifications, setSpecifications] = useState<Array<{key: string, value: string}>>([
    { key: '', value: '' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.itemName || !formData.category || !formData.hsnCode) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const specs: Record<string, string> = {};
    specifications.forEach(spec => {
      if (spec.key && spec.value) {
        specs[spec.key] = spec.value;
      }
    });

    const newItem: InventoryItem = {
      itemId: item?.itemId || `ITM-${Date.now()}`,
      itemName: formData.itemName!,
      category: formData.category!,
      subCategory: formData.subCategory!,
      description: formData.description!,
      hsnCode: formData.hsnCode!,
      unit: formData.unit!,
      costPrice: Number(formData.costPrice),
      sellingPrice: Number(formData.sellingPrice),
      stockQuantity: Number(formData.stockQuantity),
      reorderLevel: Number(formData.reorderLevel),
      supplierInfo: formData.supplierInfo || '',
      specifications: specs,
      createdDate: item?.createdDate || new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    onSubmit(newItem);
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { key: '', value: '' }]);
  };

  const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{item ? 'Edit Item' : 'Add New Item'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="itemName">Item Name *</Label>
              <Input
                id="itemName"
                value={formData.itemName}
                onChange={(e) => setFormData({...formData, itemName: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="hsnCode">HSN Code *</Label>
              <Input
                id="hsnCode"
                value={formData.hsnCode}
                onChange={(e) => setFormData({...formData, hsnCode: e.target.value})}
                placeholder="e.g., 7308"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({...formData, category: value, subCategory: ''})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shades">Fabrication Shades</SelectItem>
                  <SelectItem value="doors">Door Frames</SelectItem>
                  <SelectItem value="windows">Window Frames</SelectItem>
                  <SelectItem value="stairs">Staircase Fabrication</SelectItem>
                  <SelectItem value="custom">Custom Work</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="subCategory">Sub Category</Label>
              <Select 
                value={formData.subCategory} 
                onValueChange={(value) => setFormData({...formData, subCategory: value})}
                disabled={!formData.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sub category" />
                </SelectTrigger>
                <SelectContent>
                  {formData.category && categories[formData.category as keyof typeof categories]?.map((sub) => (
                    <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Detailed description of the item"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Select 
                value={formData.unit} 
                onValueChange={(value) => setFormData({...formData, unit: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="costPrice">Cost Price (₹)</Label>
              <Input
                id="costPrice"
                type="number"
                value={formData.costPrice}
                onChange={(e) => setFormData({...formData, costPrice: Number(e.target.value)})}
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="sellingPrice">Selling Price (₹)</Label>
              <Input
                id="sellingPrice"
                type="number"
                value={formData.sellingPrice}
                onChange={(e) => setFormData({...formData, sellingPrice: Number(e.target.value)})}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stockQuantity">Stock Quantity</Label>
              <Input
                id="stockQuantity"
                type="number"
                value={formData.stockQuantity}
                onChange={(e) => setFormData({...formData, stockQuantity: Number(e.target.value)})}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="reorderLevel">Reorder Level</Label>
              <Input
                id="reorderLevel"
                type="number"
                value={formData.reorderLevel}
                onChange={(e) => setFormData({...formData, reorderLevel: Number(e.target.value)})}
                min="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="supplierInfo">Supplier Information</Label>
            <Input
              id="supplierInfo"
              value={formData.supplierInfo}
              onChange={(e) => setFormData({...formData, supplierInfo: e.target.value})}
              placeholder="Supplier name, contact details"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <Label>Specifications</Label>
              <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
                Add Specification
              </Button>
            </div>
            <div className="space-y-2">
              {specifications.map((spec, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Property (e.g., Material)"
                    value={spec.key}
                    onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                  />
                  <Input
                    placeholder="Value (e.g., Steel)"
                    value={spec.value}
                    onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                  />
                  {specifications.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeSpecification(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              {item ? 'Update Item' : 'Add Item'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InventoryForm;
