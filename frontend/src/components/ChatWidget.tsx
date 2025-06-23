import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const ChatWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneNumber = "919712929748";
  const whatsappNumber = "919712929748";

  const handleCall = () => {
    window.open(`tel:+${phoneNumber}`, "_self");
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello! I would like to inquire about your fabrication services."
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isExpanded && (
        <div className="mb-4 bg-white rounded-lg shadow-lg border p-4 w-64 animate-fade-in">
          <h4 className="font-semibold text-gray-900 mb-3">
            Contact MJ Fabrication
          </h4>
          <div className="space-y-2">
            <Button
              onClick={handleCall}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
            <Button
              onClick={handleWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              💬 WhatsApp
            </Button>
          </div>
          <p className="text-xs text-gray-600 mt-2">Mon-Sat: 9 AM - 7 PM</p>
        </div>
      )}

      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 md:w-16 md:h-16"
        size="sm"
      >
        {isExpanded ? (
          <span className="text-xl">✕</span>
        ) : (
          <Phone className="h-6 w-6 md:h-7 md:w-7" />
        )}
      </Button>
    </div>
  );
};

export default ChatWidget;
