import { InfiniteMovingCards } from "@/components/ui/aceternity";
import { Layers, ShieldCheck, Factory, Cpu, Flame, Package } from "lucide-react";

export const SteelMaterialMarquee = () => {
  const materials = [
    {
      name: "Jindal Steel MS Plates",
      title: "IS 2062 E250 / E350BR Grade",
      quote: "Prime structural steel plates cut-to-size up to 50mm thickness with complete heat-number mill test traceability.",
      badge: "Raw Material",
      icon: Layers,
    },
    {
      name: "Seamless & ERW Steel Pipes",
      title: "Heavy-Wall Round Sections",
      quote: "Direct material supply for access barriers, cylinders, and industrial equipment builders with custom cut lengths.",
      badge: "OEM Supply",
      icon: Factory,
    },
    {
      name: "RHS & SHS Structural Tubes",
      title: "Hollow Sections (Square & Rect)",
      quote: "High-rigidity tubular steel for equipment frames, vehicle chassis, and architectural structural applications.",
      badge: "Prime Stock",
      icon: ShieldCheck,
    },
    {
      name: "12kW Laser Profile Blanks",
      title: "Circular Flanges & CAD Blanks",
      quote: "High-precision tight-tolerance profile blanks (±0.05mm) with clean slag-free edges ready for equipment manufacturers.",
      badge: "CNC Laser",
      icon: Cpu,
    },
    {
      name: "250T CNC Formed Chassis",
      title: "Multi-Axis Press Brake Bending",
      quote: "Complex sheet metal brackets, switchgear enclosures, and equipment chassis bent with electronic angle crowning.",
      badge: "Sheet Metal",
      icon: Flame,
    },
    {
      name: "Heavy Machine Base Skids",
      title: "High-Load Welded Assemblies",
      quote: "Certified structural steel foundation skids, gantry beams, and columns manufactured strictly to customer drawings.",
      badge: "Industrial Fab",
      icon: Package,
    },
  ];

  return (
    <div className="bg-slate-950 py-10 border-b border-slate-800/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span>Prime Material Stock &amp; OEM Component Supply</span>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          Genuine Jindal Steel • Custom Cut-to-Size • Prompt Dispatch
        </span>
      </div>
      <InfiniteMovingCards items={materials} direction="left" speed="normal" />
    </div>
  );
};

export default SteelMaterialMarquee;
