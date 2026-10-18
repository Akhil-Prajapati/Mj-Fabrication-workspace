import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { DirectionAwareHover } from "@/components/ui/aceternity";

const ProjectsGallery = () => {
  const projects = [
    {
      title: "Prime Steel Pipes & Hollow Sections Supply for OEMs",
      category: "Raw Material Supply",
      image: "/optimized/steel-tubes-pipes.webp",
      description: "Consistent supply of prime Jindal Steel heavy-wall pipes, RHS, and SHS sections delivered to equipment manufacturers.",
      specs: "Genuine Jindal Steel • Custom Cut-to-Length",
    },
    {
      title: "Precision Laser-Cut Blanks & Machined Flanges",
      category: "Custom Manufacturing",
      image: "/optimized/oem-components.webp",
      description: "12kW CNC laser profiling of heavy steel plate blanks, circular mounting flanges, and component sub-assemblies for OEMs.",
      specs: "12kW Fiber Laser • Drawing-to-Part Accuracy",
    },
    {
      title: "Heavy Structural Steel Girders & Machine Skids",
      category: "Industrial Fabrication",
      image: "/optimized/structural-steel.webp",
      description: "Certified heavy structural box girders, machine foundation frames, and equipment skids fabricated to technical drawings.",
      specs: "Heavy Bay Assembly • Certified Welded Skids",
    },
    {
      title: "Modular IP66 Stainless Steel Industrial Enclosures",
      category: "Sheet Metal Fabrication",
      image: "/optimized/electrical-enclosures.webp",
      description: "Custom sheet metal electrical control cabinets and console housings fabricated with continuous PU gasket seals.",
      specs: "IP66 Ingress Rated • SS 304/316 & Powder Coated",
    },
    {
      title: "250T CNC Formed Chassis & Heavy Mounting Brackets",
      category: "Sheet Metal Fabrication",
      image: "/optimized/sheet-metal-fabrication.webp",
      description: "Multi-axis press brake bending of structural sheet metal parts, equipment chassis, and heavy-duty brackets.",
      specs: "250-Ton Press Brake • ±0.1mm Tolerances",
    },
    {
      title: "Industrial Cantilever Gate Structures & Welded Frames",
      category: "Industrial Fabrication",
      image: "/optimized/cantilever-gate.webp",
      description: "High-strength welded perimeter gate trusses and industrial frame structures fabricated strictly to client specifications.",
      specs: "Heavy Structural Steel • Built to Drawings",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-4 tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4" />
            Project Execution &amp; Supply
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Featured Fabrication &amp; Supply Projects
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Supplying raw materials, precision laser blanks, welded structural assemblies, and custom metal products for engineering leaders and equipment OEMs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="group h-full flex flex-col overflow-hidden bg-white border border-slate-200 hover:border-blue-500/50 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300">
                <div className="relative overflow-hidden bg-slate-900 rounded-t-2xl">
                  <DirectionAwareHover
                    imageUrl={project.image}
                    className="w-full h-60 rounded-none cursor-pointer"
                    imageClassName="group-hover:scale-105 transition-transform duration-700"
                  >
                    <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-700/60 backdrop-blur-sm max-w-xs">
                      <p className="font-bold text-white text-sm">{project.title}</p>
                      <p className="text-[11px] text-blue-300 mt-1 font-mono">{project.specs}</p>
                    </div>
                  </DirectionAwareHover>
                  
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                      {project.category}
                    </span>
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span>View Engineering Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Button asChild size="lg" className="bg-slate-900 hover:bg-blue-600 text-white font-bold px-8 py-6 rounded-xl shadow-lg transition-all duration-200">
            <Link to="/gallery">
              Explore All Enterprise Case Studies <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallery;

