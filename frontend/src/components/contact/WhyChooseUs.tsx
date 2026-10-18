import { Clock, Scale, ShieldCheck, Award } from "lucide-react";
import { HoverEffect } from "@/components/ui/aceternity";

const features = [
  {
    icon: Clock,
    title: "Rapid 24-Hour RFQ Response",
    description: "Detailed drawing analysis, tolerance review, and quotation delivered within 24 business hours.",
    badge: "Response",
  },
  {
    icon: Scale,
    title: "Competitive Pricing",
    description: "Direct raw material sourcing and automated CNC cutting provide optimal project pricing.",
    badge: "Value",
  },
  {
    icon: ShieldCheck,
    title: "Strict Quality Assurance",
    description: "Comprehensive dimensional verification, weld integrity testing, and genuine Jindal Steel materials.",
    badge: "Integrity",
  },
  {
    icon: Award,
    title: "20+ Years Track Record",
    description: "Established in 2003, delivering reliable custom manufacturing solutions for engineering OEMs.",
    badge: "Est. 2003",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            Reliable Engineering Partner
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Why Engineering Clients Choose MJ Fabrication
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Our disciplined execution model bridges technical specifications with dependable delivery.
          </p>
        </div>

        <HoverEffect
          items={features}
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-4"
        />
      </div>
    </section>
  );
};

export default WhyChooseUs;
