import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/admin/AdminLayout";
import CompanyProfileForm from "@/components/company/CompanyProfileForm";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle,
} from "lucide-react";

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

const CompanyProfile = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [profile, setProfile] = useState<CompanyProfile | null>(null);

  useEffect(() => {
    // Load company profile from localStorage
    const savedProfile = localStorage.getItem("companyProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, [navigate]);

  const handleSaveProfile = (updatedProfile: CompanyProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem("companyProfile", JSON.stringify(updatedProfile));
    setShowForm(false);
  };

  const getCompletionPercentage = () => {
    if (!profile) return 0;

    const fields = [
      "companyName",
      "address",
      "phone",
      "email",
      "gstNumber",
      "bankName",
      "accountNumber",
      "ifscCode",
    ];

    const filledFields = fields.filter(
      (field) => profile[field as keyof CompanyProfile]
    );
    return Math.round((filledFields.length / fields.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-600 mt-1">
            Manage your company information and invoice settings
          </p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            {profile ? "Edit Profile" : "Setup Profile"}
          </Button>
        )}
      </div>

      {showForm ? (
        <CompanyProfileForm
          profile={profile}
          onSave={handleSaveProfile}
          onCancel={() => setShowForm(false)}
        />
      ) : profile ? (
        <div className="space-y-6">
          {/* Profile Completion */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Profile Completion</h3>
                  <p className="text-sm text-gray-600">
                    Complete your profile for better invoice generation
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {getCompletionPercentage()}%
                  </div>
                  <Badge
                    variant={
                      getCompletionPercentage() === 100
                        ? "default"
                        : "secondary"
                    }
                  >
                    {getCompletionPercentage() === 100
                      ? "Complete"
                      : "Incomplete"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg">
                    {profile.companyName || "Company Name Not Set"}
                  </h4>
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>
                        {profile.address
                          ? `${profile.address}, ${profile.city}, ${profile.state} ${profile.pincode}`
                          : "Address not set"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{profile.phone || "Phone not set"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{profile.email || "Email not set"}</span>
                    </div>
                  </div>
                </div>

                <div>
                  {profile.logo && (
                    <div className="border rounded-lg p-4 text-center">
                      <img
                        src={profile.logo}
                        alt="Company Logo"
                        className="h-20 mx-auto"
                      />
                      <p className="text-sm text-gray-600 mt-2">Company Logo</p>
                    </div>
                  )}
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
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    GST Number
                  </label>
                  <p className="text-lg">{profile.gstNumber || "Not set"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    PAN Number
                  </label>
                  <p className="text-lg">{profile.panNumber || "Not set"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bank Details */}
          <Card>
            <CardHeader>
              <CardTitle>Bank Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Bank Name
                  </label>
                  <p className="text-lg">{profile.bankName || "Not set"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Account Number
                  </label>
                  <p className="text-lg">
                    {profile.accountNumber || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    IFSC Code
                  </label>
                  <p className="text-lg">{profile.ifscCode || "Not set"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Account Holder
                  </label>
                  <p className="text-lg">
                    {profile.accountHolderName || "Not set"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          {profile.termsAndConditions && (
            <Card>
              <CardHeader>
                <CardTitle>Terms and Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line text-sm bg-gray-50 p-4 rounded-lg">
                  {profile.termsAndConditions}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Setup Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Set up your company profile to start generating professional
              invoices with all required details.
            </p>
            <Button onClick={() => setShowForm(true)}>
              Setup Company Profile
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyProfile;
