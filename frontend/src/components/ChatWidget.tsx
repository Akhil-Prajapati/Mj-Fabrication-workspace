import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Mail, X, ShieldCheck, ArrowUpRight } from "lucide-react";

const ChatWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneNumber = "919712929748";
  const whatsappNumber = "919712929748";
  const emailAddress = "mjfabworld62@gmail.com";

  const handleCall = () => {
    window.open(`tel:+${phoneNumber}`, "_self");
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello MJ Fabrication, I would like to inquire about your fabrication capabilities and submit our technical drawings / RFQ."
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Technical RFQ & CAD Drawing Submission - MJ Fabrication");
    const body = encodeURIComponent(
      "Dear MJ Fabrication Engineering Desk,\n\nI would like to submit an RFQ for metal fabrication / raw material supply.\n\nPlease find attached our technical drawings / CAD models for review.\n\nRegards,"
    );
    window.open(`mailto:${emailAddress}?subject=${subject}&body=${body}`, "_self");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isExpanded && (
        <div className="mb-4 bg-slate-950 text-white rounded-3xl shadow-2xl border border-slate-800 p-5 w-72 sm:w-80 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div>
              <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                Technical RFQ Desk
              </div>
              <h4 className="font-extrabold text-white text-base">
                MJ Fabrication
              </h4>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Connect directly with our engineering and estimating team. Send CAD files, bills of material, or project specifications.
          </p>

          <div className="space-y-2.5">
            <Button
              onClick={handleWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl h-11 flex items-center justify-between px-4 text-xs sm:text-sm shadow-md"
              size="sm"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </div>
              <ArrowUpRight className="h-4 w-4 opacity-80" />
            </Button>

            <Button
              onClick={handleEmail}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl h-11 flex items-center justify-between px-4 text-xs sm:text-sm shadow-md"
              size="sm"
            >
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email CAD Drawings</span>
              </div>
              <ArrowUpRight className="h-4 w-4 opacity-80" />
            </Button>

            <Button
              onClick={handleCall}
              variant="outline"
              className="w-full border-slate-700 hover:bg-slate-900 text-slate-200 font-semibold rounded-xl h-10 flex items-center justify-between px-4 text-xs"
              size="sm"
            >
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-blue-400" />
                <span>Call +91 97129 29748</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">9 AM - 7 PM</span>
            </Button>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-900 text-[10px] text-slate-500 text-center font-mono">
            CAD Confidentiality &amp; NDA Protected
          </div>
        </div>
      )}

      <div className="relative group">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full w-14 h-14 shadow-2xl hover:scale-105 transition-all duration-300 md:w-16 md:h-16 flex items-center justify-center relative"
          size="sm"
          aria-label="Toggle contact widget"
        >
          {isExpanded ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="relative flex items-center justify-center">
              <MessageCircle className="h-7 w-7" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500"></span>
              </span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatWidget;
