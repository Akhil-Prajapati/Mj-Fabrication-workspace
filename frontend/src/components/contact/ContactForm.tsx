import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { fetcher } from "@/api/fetcher";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    customProjectType: "",
    description: "",
    budgetRange: "",
    contactMethod: "phone",
  });
  const [showCustomProjectType, setShowCustomProjectType] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend validation for required fields
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.projectType.trim() ||
      !formData.description.trim() ||
      (formData.projectType === "custom" && !formData.customProjectType.trim())
    ) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }
    try {
      const result = await fetcher(
        {
          path: "/api/v1/customer-inquiries",
          shouldEncrypt: false,
          shouldDecrypt: false,
          shouldShowLoader: true,
        },
        {
          method: "POST",
          json: {
            customerName: formData.name,
            email: formData.email,
            phone: formData.phone,
            serviceType:
              formData.projectType === "custom"
                ? formData.customProjectType
                : formData.projectType,
            customProjectType: formData.customProjectType,
            message: formData.description,
            budgetRange: formData.budgetRange,
            contactMethod: formData.contactMethod,
            status: "NEW",
          },
        }
      );
      if (!result || result.error) {
        toast({
          title: "Submission Failed",
          description:
            result?.error ||
            "There was a problem submitting your inquiry. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Inquiry Submitted!",
          description:
            "Thank you for your inquiry. We'll get back to you soon.",
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          projectType: "",
          customProjectType: "",
          description: "",
          budgetRange: "",
          contactMethod: "phone",
        });
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description:
          "There was a problem submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "projectType") {
        updated.customProjectType = "";
        setShowCustomProjectType(value === "custom");
      }
      return updated;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Submit Your Inquiry</CardTitle>
        <p className="text-gray-600">
          Tell us about your project and we'll get back to you with a detailed
          quote
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="projectType">Project Type *</Label>
            <Select
              value={formData.projectType}
              onValueChange={(value) => handleInputChange("projectType", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shades">Fabrication Shades</SelectItem>
                <SelectItem value="door-frames">Door Frames</SelectItem>
                <SelectItem value="window-frames">Window Frames</SelectItem>
                <SelectItem value="staircases">
                  Staircase Fabrication
                </SelectItem>
                <SelectItem value="custom">Custom Fabrication Work</SelectItem>
              </SelectContent>
            </Select>
            {showCustomProjectType && (
              <div className="mt-2">
                <Label htmlFor="customProjectType">Custom Project Type *</Label>
                <Input
                  id="customProjectType"
                  type="text"
                  required={formData.projectType === "custom"}
                  value={formData.customProjectType || ""}
                  onChange={(e) =>
                    handleInputChange("customProjectType", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="description">Project Description *</Label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Please describe your project requirements, dimensions, materials, etc."
              className="mt-1 min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="budgetRange">Budget Range (Optional)</Label>
            <Select
              value={formData.budgetRange}
              onValueChange={(value) => handleInputChange("budgetRange", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
                <SelectItem value="1l-2l">₹1,00,000 - ₹2,00,000</SelectItem>
                <SelectItem value="2l-5l">₹2,00,000 - ₹5,00,000</SelectItem>
                <SelectItem value="above-5l">Above ₹5,00,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="contactMethod">Preferred Contact Method</Label>
            <Select
              value={formData.contactMethod}
              onValueChange={(value) =>
                handleInputChange("contactMethod", value)
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Submit Inquiry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
