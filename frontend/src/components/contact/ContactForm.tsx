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
import { MessageCircle, Mail, Send, PhoneCall, ShieldCheck, ArrowUpRight, CheckCircle2 } from "lucide-react";

const WHATSAPP_NUMBER = "919712929748";
const EMAIL_ADDRESS = "mjfabworld62@gmail.com";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    customProjectType: "",
    description: "",
    budgetRange: "",
    contactMethod: "whatsapp",
  });
  const [showCustomProjectType, setShowCustomProjectType] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFormattedProjectTypeName = () => {
    if (formData.projectType === "custom" && formData.customProjectType) {
      return formData.customProjectType;
    }
    const typeMap: Record<string, string> = {
      "industrial-fabrication": "Industrial Fabrication (Structures & Skids)",
      "sheet-metal-fabrication": "Sheet Metal Fabrication (Enclosures & Frames)",
      "raw-material-supply": "Raw Material Supply (Jindal Steel Pipes, Plates, Tubes)",
      "custom-manufacturing": "Custom Manufacturing (CAD Drawings to Part / Laser Blanks)",
      "quality-export": "Export & Contract Component Supply",
    };
    return typeMap[formData.projectType] || formData.projectType || "General Technical RFQ";
  };

  const submitToBackend = async (showSuccessToast = true) => {
    try {
      const result = await fetcher(
        {
          path: "/api/v1/customer-inquiries",
          shouldEncrypt: false,
          shouldDecrypt: false,
          shouldShowLoader: false,
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
      if (showSuccessToast && (!result || !result.error)) {
        toast({
          title: "Inquiry Logged Successfully!",
          description: "Our technical team will review your specifications promptly.",
        });
      }
    } catch (e) {
      // Backend logging optional during direct WhatsApp/Email dispatch
    }
  };

  const handleWhatsAppSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Name & Phone Required",
        description: "Please enter at least your name and phone number to start your WhatsApp RFQ.",
        variant: "destructive",
      });
      return;
    }
    const projectTypeName = getFormattedProjectTypeName();
    const text = encodeURIComponent(
      `*Technical RFQ Inquiry - MJ Fabrication*\n\n` +
      `• *Client Name:* ${formData.name}\n` +
      `• *Phone Number:* ${formData.phone}\n` +
      `• *Email:* ${formData.email || "Not specified"}\n` +
      `• *Service Required:* ${projectTypeName}\n` +
      `• *Project Scope / Specs:* ${formData.description || "Inquiring for fabrication / material quote"}\n` +
      `• *Estimated Scale / Budget:* ${formData.budgetRange || "To be discussed"}\n\n` +
      `_Hello MJ Fabrication, please review our RFQ details above. We are sharing our technical drawings / CAD models for quotation._`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
    submitToBackend(false);
  };

  const handleEmailSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name to draft the RFQ email.",
        variant: "destructive",
      });
      return;
    }
    const projectTypeName = getFormattedProjectTypeName();
    const subject = encodeURIComponent(`Technical RFQ: ${projectTypeName} - ${formData.name}`);
    const body = encodeURIComponent(
      `Dear MJ Fabrication Technical Desk,\n\n` +
      `I would like to request an RFQ / quote for our project requirements:\n\n` +
      `• Client Name: ${formData.name}\n` +
      `• Phone Number: ${formData.phone || "N/A"}\n` +
      `• Email: ${formData.email || "N/A"}\n` +
      `• Service Pillar: ${projectTypeName}\n` +
      `• Project Scope & Technical Specifications:\n${formData.description || "Please review our attached drawings."}\n\n` +
      `• Estimated Scale / Budget: ${formData.budgetRange || "Standard"}\n\n` +
      `[ATTACH YOUR 2D/3D CAD DRAWINGS (.dwg, .dxf, .step, .pdf) HERE]\n\n` +
      `Thank you,\n${formData.name}`
    );
    window.open(`mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`, "_self");
    submitToBackend(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

    setIsSubmitting(true);
    try {
      await submitToBackend(true);
      // If contactMethod is whatsapp, also prompt WhatsApp
      if (formData.contactMethod === "whatsapp") {
        handleWhatsAppSubmit();
      } else if (formData.contactMethod === "email") {
        handleEmailSubmit();
      }
      setFormData({
        name: "",
        phone: "",
        email: "",
        projectType: "",
        customProjectType: "",
        description: "",
        budgetRange: "",
        contactMethod: "whatsapp",
      });
    } catch (error) {
      toast({
        title: "Submission Issue",
        description: "There was a problem submitting online. Please reach us directly via WhatsApp or Email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
    <Card className="border border-slate-200/90 shadow-xl rounded-3xl overflow-hidden bg-white">
      <CardHeader className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Fast 24-Hr Turnaround Desk
          </span>
          <span className="text-xs text-slate-400 font-mono">NDA Protected</span>
        </div>
        <CardTitle className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Submit RFQ &amp; Drawings
        </CardTitle>
        <p className="text-slate-300 text-sm mt-1 leading-relaxed">
          Submit your CAD models or raw material requirements. You can send directly via WhatsApp or Email for instant technical review.
        </p>

        {/* Quick Direct Channel Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-800">
          <a
            href="https://wa.me/919712929748?text=Hello%20MJ%20Fabrication,%20I%20would%20like%20to%20submit%20an%20RFQ%20and%20technical%20drawings."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Direct WhatsApp RFQ</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </a>
          <a
            href="mailto:mjfabworld62@gmail.com?subject=Technical%20RFQ%20%26%20CAD%20Drawing%20Submission%20-%20MJ%20Fabrication"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02]"
          >
            <Mail className="w-4 h-4" />
            <span>Direct Email Drawings</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </CardHeader>

      <CardContent className="p-6 sm:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g. Rajesh Patel"
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Phone Number (WhatsApp) *
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+91 98765 43210"
                className="mt-1 rounded-xl"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Email Address *
            </Label>
            <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="name@company.com"
                className="mt-1 rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="projectType" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Service Pillar / Requirement Type *
            </Label>
            <Select
              value={formData.projectType}
              onValueChange={(value) => handleInputChange("projectType", value)}
            >
              <SelectTrigger className="mt-1 rounded-xl">
                <SelectValue placeholder="Select primary service requirement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="industrial-fabrication">
                  Industrial Fabrication (Structures, Skids &amp; Heavy Welds)
                </SelectItem>
                <SelectItem value="sheet-metal-fabrication">
                  Sheet Metal Fabrication (Enclosures, Frames &amp; Brackets)
                </SelectItem>
                <SelectItem value="raw-material-supply">
                  Raw Material Supply (Jindal Steel Pipes, Plates, Tubes)
                </SelectItem>
                <SelectItem value="custom-manufacturing">
                  Custom Manufacturing (CAD Drawings to Part / 12kW Laser Blanks)
                </SelectItem>
                <SelectItem value="quality-export">
                  Quality &amp; Timely Delivery (OEM &amp; Contract Supply)
                </SelectItem>
                <SelectItem value="custom">Other Custom Engineering Requirement</SelectItem>
              </SelectContent>
            </Select>
            {showCustomProjectType && (
              <div className="mt-2">
                <Label htmlFor="customProjectType" className="text-xs font-bold text-slate-700">
                  Specify Custom Requirement *
                </Label>
                <Input
                  id="customProjectType"
                  type="text"
                  required={formData.projectType === "custom"}
                  value={formData.customProjectType || ""}
                  onChange={(e) =>
                    handleInputChange("customProjectType", e.target.value)
                  }
                  className="mt-1 rounded-xl"
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="description" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Technical Specifications &amp; Project Scope *
            </Label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Specify requirements: material grade (Jindal MS/SS), thickness (mm), dimensions, drawing references, tolerance requirements, quantity, and target delivery schedule."
              className="mt-1 min-h-[110px] rounded-xl"
            />
            <p className="text-xs text-slate-500 mt-1">
              Have CAD drawings? You can attach them directly when submitting via WhatsApp or Email.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budgetRange" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Estimated Project Scope (Optional)
              </Label>
              <Select
                value={formData.budgetRange}
                onValueChange={(value) => handleInputChange("budgetRange", value)}
              >
                <SelectTrigger className="mt-1 rounded-xl">
                  <SelectValue placeholder="Select estimated volume / scale" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1l">Under ₹1,00,000</SelectItem>
                  <SelectItem value="1l-5l">₹1,00,000 - ₹5,00,000</SelectItem>
                  <SelectItem value="5l-15l">₹5,00,000 - ₹15,00,000</SelectItem>
                  <SelectItem value="15l-50l">₹15,00,000 - ₹50,00,000</SelectItem>
                  <SelectItem value="above-50l">Above ₹50,00,000 / High-Volume Supply</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="contactMethod" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Preferred Response Channel
              </Label>
              <Select
                value={formData.contactMethod}
                onValueChange={(value) =>
                  handleInputChange("contactMethod", value)
                }
              >
                <SelectTrigger className="mt-1 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp (+91 97129 29748)</SelectItem>
                  <SelectItem value="email">Email (mjfabworld62@gmail.com)</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons for WhatsApp, Email and Online Submission */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={() => handleWhatsAppSubmit()}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md text-sm sm:text-base flex items-center justify-center gap-2"
                size="lg"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>Send RFQ via WhatsApp</span>
              </Button>

              <Button
                type="button"
                onClick={() => handleEmailSubmit()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md text-sm sm:text-base flex items-center justify-center gap-2"
                size="lg"
              >
                <Mail className="w-5 h-5 shrink-0" />
                <span>Email RFQ &amp; Drawings</span>
              </Button>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="outline"
              className="w-full border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl text-xs sm:text-sm"
            >
              <Send className="w-4 h-4 mr-2" />
              <span>{isSubmitting ? "Submitting..." : "Submit Online Inquiry to Database"}</span>
            </Button>

            <p className="text-[11px] text-center text-slate-500 leading-relaxed pt-1">
              Direct Desk Contact: <strong className="text-slate-800">WhatsApp: +91 97129 29748</strong> | <strong className="text-slate-800">Email: mjfabworld62@gmail.com</strong>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
