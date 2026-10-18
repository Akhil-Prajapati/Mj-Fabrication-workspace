import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Building2, ShieldCheck, MessageCircle, ArrowUpRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EvervaultCard } from "@/components/ui/aceternity";

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
          <Building2 className="w-3.5 h-3.5" />
          Direct Technical Desk
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 tracking-tight">
          Get In Touch With Our Engineering Team
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Submit your CAD drawings, bill of materials, or raw steel material requirements. Our engineering and sales team will review your specifications and provide competitive quotes with firm delivery schedules.
        </p>
      </div>

      <div className="space-y-4">
        {/* Phone Card */}
        <Card className="border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all rounded-2xl bg-white overflow-hidden">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-11 h-11 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Phone &amp; Direct Line</h3>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Mon - Sun Active
                </span>
              </div>
              <a
                href="tel:+919712929748"
                className="text-base font-bold text-blue-600 hover:text-blue-700 mt-1 inline-block"
              >
                +91 97129 29748
              </a>
              <div className="mt-2">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs font-semibold rounded-lg border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 gap-1.5"
                >
                  <a
                    href="https://wa.me/919712929748?text=Hello%20MJ%20Fabrication,%20I%20would%20like%20to%20inquire%20about%20fabrication%20and%20raw%20material%20supply."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Chat on WhatsApp <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Card */}
        <Card className="border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all rounded-2xl bg-white overflow-hidden">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-11 h-11 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Email (CAD / Drawing Submissions)</h3>
              <a
                href="mailto:mjfabworld62@gmail.com"
                className="text-base font-bold text-blue-600 hover:text-blue-700 mt-1 inline-block"
              >
                mjfabworld62@gmail.com
              </a>
              <p className="text-xs text-slate-500 mt-1">
                Send 2D/3D CAD models (.dwg, .dxf, .step, .pdf) for prompt quotation.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Address Card */}
        <Card className="border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all rounded-2xl bg-white overflow-hidden">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-11 h-11 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Manufacturing Plant &amp; Office</h3>
              <div className="text-xs sm:text-sm text-slate-600 mt-1 space-y-0.5">
                <p className="font-semibold text-slate-800">MJ Fabrication Facility</p>
                <p>31, Maheshwari Park Society, Amarpark RCC Road</p>
                <p>Vasant Vihar 2, Nava Naroda, Ahmedabad</p>
                <p>Gujarat - 382330, India</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operating Hours Card */}
        <Card className="border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all rounded-2xl bg-white overflow-hidden">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-11 h-11 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Plant Operational Hours</h3>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-1">
                Monday – Sunday: 9:00 AM – 7:00 PM IST
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Continuous production shifts for high-volume contract orders.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* GST Card */}
        <Card className="border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all rounded-2xl bg-white overflow-hidden">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-11 h-11 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">GST Compliance</h3>
              <p className="text-xs sm:text-sm font-mono text-slate-800 font-bold mt-1">
                GSTIN: 24AFZPP4386C1ZY
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                GST registered enterprise for B2B industrial billing and export invoicing.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CAD Confidentiality Evervault Card */}
        <div className="border border-slate-800 rounded-3xl bg-slate-950 p-6 flex flex-col items-center text-center relative overflow-hidden shadow-xl">
          <div className="w-full h-48 relative flex items-center justify-center">
            <EvervaultCard text="CAD DATA NDA PROTECTED" />
          </div>
          <div className="mt-3 relative z-20">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-blue-400" />
              Intellectual Property &amp; Drawing Security
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Every 2D drawing (.dwg, .dxf, .pdf) and 3D CAD model (.step, .iges) submitted to MJ Fabrication is protected under strict Non-Disclosure Agreement (NDA) protocols.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
