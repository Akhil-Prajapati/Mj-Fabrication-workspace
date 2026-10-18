
import { motion } from 'framer-motion';
import { FileCode2, Layers, Cpu, Flame, ShieldCheck, Truck } from 'lucide-react';
import { TracingBeam, HoverEffect } from "@/components/ui/aceternity";

const ProcessSection = () => {
  const processes = [
    {
      title: "CAD & DFM Engineering Review",
      description: "Detailed design-for-manufacturing analysis of customer 2D/3D CAD models, tolerance optimization, and nesting.",
      icon: FileCode2,
      badge: "Step 01",
    },
    {
      title: "Prime Material Allocation",
      description: "Direct sourcing of prime Jindal Steel plates, sections, and structural tubes with traceable heat-number mill test reports.",
      icon: Layers,
      badge: "Step 02",
    },
    {
      title: "12kW CNC Laser & Press Brake",
      description: "High-speed fiber laser profiling to ±0.05mm and 250-ton multi-axis hydraulic bending with dynamic crowning.",
      icon: Cpu,
      badge: "Step 03",
    },
    {
      title: "Certified Heavy Bay Welding",
      description: "Qualified welders conducting robotic MIG, TIG, and submerged arc welding in our equipped heavy assembly bays.",
      icon: Flame,
      badge: "Step 04",
    },
    {
      title: "Multi-Stage NDT & Quality Gate",
      description: "Dimensional vernier inspection, dye-penetrant testing, and surface coating DFT thickness verification.",
      icon: ShieldCheck,
      badge: "Step 05",
    },
    {
      title: "Domestic & Export Dispatch",
      description: "Protective crating, moisture-barrier wrapping, and containerized road/sea dispatch to domestic OEMs & export clients.",
      icon: Truck,
      badge: "Step 06",
    },
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <TracingBeam className="px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
              Quality Engineered Workflow
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
              Our Industrial Execution Process
            </h2>
            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
              From technical drawing sign-off to containerized dispatch, every milestone adheres to rigorous manufacturing protocols.
            </p>
          </div>

          <HoverEffect items={processes} className="py-6" />
        </div>
      </TracingBeam>
    </section>
  );
};

export default ProcessSection;

