import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Factory, Gauge, Sparkles, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Meteors } from "@/components/ui/aceternity";

const MachineryInfrastructure = () => {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-4 h-4 text-blue-400" />
            Advanced Manufacturing Technology
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            World-Class Plant Infrastructure &amp; Machinery
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Operating from our equipped fabrication facility in Naroda, Gujarat, MJ Fabrication deploys high-capacity CNC machinery, precision press brakes, and heavy crane bays engineered for reliable manufacturing output.
          </p>
        </div>

        {/* Aceternity Style Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1: Large Span (Col 1-2, Row 1-2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 lg:col-span-2 group relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <img
                src="/optimized/laser-cutting.webp"
                alt="12kW Fiber Laser Cutting System"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Flagship Capability
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-400 flex items-center justify-center">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    12kW High-Speed CNC Fiber Laser Cutting
                  </h3>
                </div>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                  Equipped with a 6000mm × 2500mm cutting bed capable of slicing mild steel up to 30mm and stainless steel up to 25mm with continuous nitrogen assist for oxide-free, weld-ready edges at ±0.05mm tolerance.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-center">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <div className="text-base sm:text-lg font-bold text-blue-400">12,000 W</div>
                  <div className="text-[11px] text-slate-500 font-medium">Laser Power</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <div className="text-base sm:text-lg font-bold text-blue-400">30 mm</div>
                  <div className="text-[11px] text-slate-500 font-medium">Max Thickness</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <div className="text-base sm:text-lg font-bold text-blue-400">±0.05 mm</div>
                  <div className="text-[11px] text-slate-500 font-medium">CNC Precision</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: 250-Ton Press Brake */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 lg:col-span-2 group relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <img
                src="/optimized/sheet-metal-fabrication.webp"
                alt="250-Ton CNC Press Brake"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  High-Precision Bending
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    250-Ton Multi-Axis CNC Press Brake
                  </h3>
                </div>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                  4,000mm bending length with multi-axis synchronized hydraulic crowning for distortion-free, deep-box bends in heavy structural sheets and electrical cabinet bodies.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-center">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <div className="text-base sm:text-lg font-bold text-emerald-400">250 Ton</div>
                  <div className="text-[11px] text-slate-500 font-medium">Hydraulic Force</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <div className="text-base sm:text-lg font-bold text-emerald-400">4,000 mm</div>
                  <div className="text-[11px] text-slate-500 font-medium">Max Bed Length</div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <div className="text-base sm:text-lg font-bold text-emerald-400">7-Axis</div>
                  <div className="text-[11px] text-slate-500 font-medium">CNC Control</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: 20-Ton Overhead Cranes & Heavy Bay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 lg:col-span-2 group relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src="/optimized/structural-steel.webp"
                alt="20-Ton Overhead Crane Bay"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Factory className="w-5 h-5 text-blue-400" />
                <h4 className="text-lg font-bold text-white">20-Ton Overhead Gantry Cranes</h4>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                Dual gantry cranes running across our heavy assembly bay, allowing seamless handling and rotation of heavy structural steel girders, large plant skids, and welded equipment assemblies.
              </p>
              <div className="flex items-center gap-2 text-xs text-blue-400 font-mono">
                <span>Heavy Lift Capacity</span> • <span>Naroda Assembly Bay</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Quality & NDT Metrology Lab */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1 lg:col-span-2 group relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src="/optimized/quality-timely-delivery.webp"
                alt="Quality & NDT Metrology"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="text-lg font-bold text-white">Ultrasonic NDT &amp; CMM Inspection Lab</h4>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                Comprehensive quality inspection protocol including ultrasonic weld testing (UT), dye penetrant (DPT), digital vernier metrology, and magnetic particle testing ensuring 100% export compliance.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <span>100% Traceable QC</span> • <span>ISO 9001:2015</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MachineryInfrastructure;
