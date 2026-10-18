import { InfiniteMovingCards } from "@/components/ui/aceternity";
import { Star, ShieldCheck, CheckCircle2 } from "lucide-react";

const CustomerReviews = () => {
  const reviews = [
    {
      name: "Rajesh V. Patel",
      title: "Head of Procurement • Equipment OEM",
      quote:
        "MJ Fabrication has been our trusted partner for prime Jindal Steel pipe and structural hollow section supply. Mill test reports are consistently traceable, and deliveries to our assembly plant are always on schedule.",
    },
    {
      name: "Vikram Sengupta",
      title: "Chief Operations Engineer • Heavy Machinery Works",
      quote:
        "Their 12kW fiber laser cutting precision and clean edge finish on heavy mounting flanges reduced our secondary machining by 40%. The parts match our technical drawings to the exact millimetre.",
    },
    {
      name: "Siddharth Mehta",
      title: "Plant Technical Director • Switchgear & Automation Firm",
      quote:
        "We rely on MJ Fabrication for IP-rated customized sheet metal enclosures and console chassis. The 250-ton CNC press brake bending accuracy is repeatable across batch runs of 100+ units.",
    },
    {
      name: "Arun K. Sharma",
      title: "Senior Project Lead • EPC Engineering Contractor",
      quote:
        "Exceptional structural steel welding quality and heavy fabrication capability. Their Naroda facility easily handles our large equipment skids and heavy welded assemblies with complete dimensional accuracy.",
    },
    {
      name: "Anand M. Desai",
      title: "Supply Chain Manager • Industrial Engineering Solutions",
      quote:
        "Prompt turnaround on customized metal manufacturing based directly on our 3D CAD models. Transparent pricing, strict drawing compliance, and export-grade protective packaging.",
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Client Trust &amp; Testimonials
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Client &amp; Partner Feedback
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
            Feedback from equipment OEMs, infrastructure contractors, and engineering firms that rely on MJ Fabrication for precision manufacturing.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden py-4">
          <InfiniteMovingCards items={reviews} direction="right" speed="slow" />
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-slate-800/80 border border-slate-700/60 px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-slate-300">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-white font-bold">5.0 / 5.0 Rating</span>
            <span className="text-slate-400">• 20+ Years Trusted B2B Manufacturing</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
