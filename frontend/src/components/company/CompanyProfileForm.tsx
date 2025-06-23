
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Upload, Save, Mail, Phone, MapPin, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CompanyProfile {
  companyName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  website: string;
  gstNumber: string;
  panNumber: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  logo: string;
  signature: string;
  termsAndConditions: string;
}

interface CompanyProfileFormProps {
  profile: CompanyProfile | null;
  onSave: (profile: CompanyProfile) => void;
  onCancel: () => void;
}

const CompanyProfileForm = ({ profile, onSave, onCancel }: CompanyProfileFormProps) => {
  const [formData, setFormData] = useState<CompanyProfile>(profile || {
    companyName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    website: '',
    gstNumber: '',
    panNumber: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    logo: '',
    signature: '',
    termsAndConditions: `1. Payment terms: 30 days from invoice date
2. All disputes subject to local jurisdiction
3. Goods once sold will not be taken back
4. Delivery as per agreed schedule
5. Material warranty as per manufacturer terms`
  });

  const handleInputChange = (field: keyof CompanyProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: 'logo' | 'signature', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange(field, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!formData.companyName || !formData.gstNumber) {
      toast({
        title: "Error",
        description: "Company name and GST number are required",
        variant: "destructive"
      });
      return;
    }

    onSave(formData);
    toast({
      title: "Success",
      description: "Company profile updated successfully"
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="MJ Fabrication Works"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Complete business address"
                className="min-h-20"
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="City"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="State"
              />
            </div>
            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                placeholder="000000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 9876543210"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="contact@mjfabrication.com"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="www.mjfabrication.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Tax Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gstNumber">GST Number *</Label>
              <Input
                id="gstNumber"
                value={formData.gstNumber}
                onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                placeholder="29ABCDE1234F1Z5"
              />
            </div>
            <div>
              <Label htmlFor="panNumber">PAN Number</Label>
              <Input
                id="panNumber"
                value={formData.panNumber}
                onChange={(e) => handleInputChange('panNumber', e.target.value)}
                placeholder="ABCDE1234F"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bank Details */}
      <Card>
        <CardHeader>
          <CardTitle>Bank Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                placeholder="Bank Name"
              />
            </div>
            <div>
              <Label htmlFor="accountHolderName">Account Holder Name</Label>
              <Input
                id="accountHolderName"
                value={formData.accountHolderName}
                onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                placeholder="Account Holder Name"
              />
            </div>
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                placeholder="Account Number"
              />
            </div>
            <div>
              <Label htmlFor="ifscCode">IFSC Code</Label>
              <Input
                id="ifscCode"
                value={formData.ifscCode}
                onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                placeholder="IFSC Code"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logo and Signature */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Logo & Signature
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="logo">Company Logo</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload('logo', e)}
              />
              {formData.logo && (
                <div className="mt-2">
                  <img src={formData.logo} alt="Logo preview" className="h-20 w-auto" />
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="signature">Digital Signature</Label>
              <Input
                id="signature"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload('signature', e)}
              />
              {formData.signature && (
                <div className="mt-2">
                  <img src={formData.signature} alt="Signature preview" className="h-20 w-auto" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.termsAndConditions}
            onChange={(e) => handleInputChange('termsAndConditions', e.target.value)}
            placeholder="Enter your terms and conditions"
            className="min-h-32"
          />
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button onClick={handleSubmit} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          Save Profile
        </Button>
        <Button onClick={onCancel} variant="outline" className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CompanyProfileForm;
