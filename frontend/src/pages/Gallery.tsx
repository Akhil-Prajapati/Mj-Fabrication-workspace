import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, CheckCircle2, ArrowRight, Factory, Layers, Truck, PencilRuler, BadgeCheck, Eye, MessageCircle, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";
import { Spotlight, DirectionAwareHover, CardContainer, CardBody, CardItem } from "@/components/ui/aceternity";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Raw Material Supply",
    "Industrial Fabrication",
    "Sheet Metal Fabrication",
    "Custom Manufacturing",
    "Quality & Inspection",
  ];

  const projects = [
    {
      id: 1,
      title: "Prime Steel Pipes & Hollow Sections Supply for OEMs",
      category: "Raw Material Supply",
      image: "/optimized/steel-tubes-pipes.webp",
      description: "Direct supply of prime Jindal Steel heavy-wall circular pipes, RHS, and SHS sections for equipment and barrier manufacturers.",
      clientType: "Equipment OEM Client",
      specs: "Genuine Jindal Steel • Custom Cut Lengths",
    },
    {
      id: 2,
      title: "12kW Laser-Cut Blanks & Circular Mounting Flanges",
      category: "Custom Manufacturing",
      image: "/optimized/oem-components.webp",
      description: "High-accuracy fiber laser cutting of heavy steel plate blanks, mounting flanges, and drilled bracket components ready for OEM assembly.",
      clientType: "Machinery OEM",
      specs: "12kW CNC Laser • ±0.05mm Tolerance",
    },
    {
      id: 3,
      title: "Heavy Structural Steel Box Girders & Equipment Skids",
      category: "Industrial Fabrication",
      image: "/optimized/structural-steel.webp",
      description: "High-tonnage welded structural box girders and plant equipment skid bases fabricated to engineering drawings.",
      clientType: "Industrial Engineering Contractor",
      specs: "AWS Welded • High Load Capacity",
    },
    {
      id: 4,
      title: "Modular IP66 Stainless Steel Industrial Enclosures",
      category: "Sheet Metal Fabrication",
      image: "/optimized/electrical-enclosures.webp",
      description: "Floor-standing modular electrical power distribution cabinets and consoles with continuous PU robotic gaskets.",
      clientType: "Automation & Switchgear Firm",
      specs: "IP66 Ingress Rated • SS 304/316",
    },
    {
      id: 5,
      title: "250T CNC Multi-Axis Bent Chassis & Equipment Panels",
      category: "Sheet Metal Fabrication",
      image: "/optimized/sheet-metal-fabrication.webp",
      description: "Multi-axis CNC press brake bent brackets, mounting frames, and chassis parts for industrial machinery.",
      clientType: "Heavy Machinery OEM",
      specs: "250T Press Brake • Precision Bending",
    },
    {
      id: 6,
      title: "Genuine Jindal Steel Plates, Angles & Structural Stock",
      category: "Raw Material Supply",
      image: "/optimized/raw-material-supply.webp",
      description: "High-grade structural steel plates, channels, and angles supplied with full heat-number mill test traceability.",
      clientType: "Infrastructure & OEM Clients",
      specs: "Genuine Jindal Steel • Custom Cut-to-Size",
    },
    {
      id: 7,
      title: "12kW Fiber Laser Plate Profiling (Up to 30mm)",
      category: "Custom Manufacturing",
      image: "/optimized/laser-cutting.webp",
      description: "High-speed CNC laser profiling of complex geometries and thick metal blanks with minimal thermal distortion.",
      clientType: "Engineering Fabricator",
      specs: "12kW Laser Bed • Nitrogen Assisted",
    },
    {
      id: 8,
      title: "Industrial Plant Framework & Heavy Welded Assemblies",
      category: "Industrial Fabrication",
      image: "/optimized/industrial-fabrication.webp",
      description: "Heavy-duty structural framework, columns, and certified welded assemblies for industrial plant applications.",
      clientType: "Manufacturing Plant",
      specs: "Certified MIG/TIG • Drawing Accuracy",
    },
    {
      id: 9,
      title: "Live Operations: Heavy Machine Bay & Fabrication Floor",
      category: "Industrial Fabrication",
      image: "/video/factory.webp",
      description: "Active manufacturing bay equipped with heavy machinery, turning, and structural fabrication fixtures in Naroda.",
      clientType: "Plant Infrastructure",
      specs: "Equipped Bay • Naroda, Gujarat",
    },
    {
      id: 10,
      title: "Live Operations: Structural Assembly & Certified Welding Bay",
      category: "Industrial Fabrication",
      image: "/video/welder.webp",
      description: "Dedicated welding stations executing structural assemblies to customer engineering drawings and load specifications.",
      clientType: "Assembly Operations",
      specs: "MIG / TIG Welding Stations",
    },
    {
      id: 11,
      title: "Component Tooling & Fixture Station",
      category: "Industrial Fabrication",
      image: "/optimized/workshop-bay-3.webp",
      description: "Precision alignment and component fitting station ensuring seamless assembly tolerances for contract fabrication.",
      clientType: "Contract Manufacturing",
      specs: "Tooling & Fixture Alignment",
    },
    {
      id: 12,
      title: "Precision Formed Sheet Metal Mounting Brackets",
      category: "Sheet Metal Fabrication",
      image: "/optimized/mounting-brackets.webp",
      description: "CNC sheared, slotted, and formed heavy-gauge mild steel mounting brackets for structural and equipment installations.",
      clientType: "OEM Hardware Client",
      specs: "CNC Sheared & Formed • Slotted Fitment",
    },
    {
      id: 13,
      title: "Custom Welded Industrial Component Assembly",
      category: "Custom Manufacturing",
      image: "/optimized/custom-part-1.webp",
      description: "Bespoke welded components and formed structural attachments manufactured strictly to customer CAD technical drawings.",
      clientType: "Equipment OEM Client",
      specs: "Drawing-to-Part • Exact Fitment",
    },
    {
      id: 14,
      title: "Custom Machine Base Frame & Mounting Assemblies",
      category: "Custom Manufacturing",
      image: "/optimized/custom-part-2.webp",
      description: "Robust welded machine foundation base frame with machined bolt holes and vibration-resistant structural joints.",
      clientType: "Machinery Builder",
      specs: "Reinforced Structural Welds",
    },
    {
      id: 15,
      title: "Bespoke Contract Manufacturing to CAD Models",
      category: "Custom Manufacturing",
      image: "/optimized/custom-manufacturing.webp",
      description: "End-to-end custom metal manufacturing converting 2D/3D customer models into precision fabricated components.",
      clientType: "Engineering Clients",
      specs: "CAD Drawing to Part • High Accuracy",
    },
    {
      id: 16,
      title: "Industrial Cantilever Gate Structures & Welded Frames",
      category: "Industrial Fabrication",
      image: "/optimized/cantilever-gate.webp",
      description: "Heavy-duty perimeter gate structural trusses and customized frames fabricated to engineering specifications.",
      clientType: "Industrial Campus",
      specs: "Heavy Structural Steel • Built to Drawings",
    },
    {
      id: 17,
      title: "Multi-Stage Quality Verification & Export Packaging",
      category: "Quality & Inspection",
      image: "/optimized/quality-timely-delivery.webp",
      description: "Dimensional vernier calipers and weld inspection, followed by protective export packaging for domestic & overseas delivery.",
      clientType: "Domestic & Global Exporters",
      specs: "Full Inspection • Protective Timber Crates",
    },
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Fabrication & Raw Material Supply Portfolio | MJ Fabrication"
        description="Explore MJ Fabrication's projects: industrial fabrication, raw material supply to OEMs, precision sheet metal, custom laser cutting, and structural assemblies."
        canonicalUrl="https://mjfabrication.in/gallery"
      />
      <Header />

      {/* Hero Section with Spotlight */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white py-24 relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="rgba(59, 130, 246, 0.4)"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold mb-6 tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            20+ Years Track Record • Manufacturing &amp; Supply Portfolio
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            Projects &amp; Supply Portfolio
          </h1>
          <p className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            MJ Fabrication provides fabrication and customized metal manufacturing solutions tailored to customer requirements. Showcasing raw material supply, structural steel, CNC laser cutting, and sheet metal assemblies.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-6 bg-slate-100/90 sticky top-[73px] z-30 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className={`rounded-full px-5 font-semibold text-xs transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30"
                    : "bg-white text-slate-700 hover:bg-slate-200 border-slate-300"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Showing {filteredProjects.length} Fabrication &amp; Supply Projects
            </p>
            <span className="text-xs font-mono text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Category: {selectedCategory}
            </span>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group h-full flex flex-col overflow-hidden bg-white border border-slate-200/90 hover:border-blue-500/50 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300">
                    <div className="relative overflow-hidden bg-slate-900 rounded-t-2xl">
                      <DirectionAwareHover
                        imageUrl={project.image}
                        className="w-full h-60 rounded-none cursor-pointer"
                        imageClassName="group-hover:scale-105 transition-transform duration-700"
                      >
                        <div className="bg-slate-950/85 p-3 rounded-xl border border-slate-700/60 backdrop-blur-sm max-w-xs">
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

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wider">
                          {project.clientType}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                          {project.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          Built to Specifications
                        </span>
                        <span className="font-semibold text-blue-600">MJ Fabrication</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Enterprise Milestones */}
      <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Our 20-Year Operational Milestones
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Delivering practical and reliable fabrication solutions for equipment OEMs and industrial clients
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardContainer className="w-full">
              <CardBody className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/60 w-full h-auto">
                <CardItem translateZ={30} className="w-full text-center text-3xl sm:text-4xl md:text-5xl font-black text-blue-400 mb-2">
                  1,500+
                </CardItem>
                <CardItem translateZ={20} className="w-full text-center text-sm font-semibold text-slate-300">
                  Projects Completed
                </CardItem>
              </CardBody>
            </CardContainer>

            <CardContainer className="w-full">
              <CardBody className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/60 w-full h-auto">
                <CardItem translateZ={30} className="w-full text-center text-3xl sm:text-4xl md:text-5xl font-black text-blue-400 mb-2">
                  20+
                </CardItem>
                <CardItem translateZ={20} className="w-full text-center text-sm font-semibold text-slate-300">
                  Years Experience (Est. 2003)
                </CardItem>
              </CardBody>
            </CardContainer>

            <CardContainer className="w-full">
              <CardBody className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/60 w-full h-auto">
                <CardItem translateZ={30} className="w-full text-center text-3xl sm:text-4xl md:text-5xl font-black text-blue-400 mb-2">
                  Naroda
                </CardItem>
                <CardItem translateZ={20} className="w-full text-center text-sm font-semibold text-slate-300">
                  Heavy Bay Facility, Gujarat
                </CardItem>
              </CardBody>
            </CardContainer>

            <CardContainer className="w-full">
              <CardBody className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/60 w-full h-auto">
                <CardItem translateZ={30} className="w-full text-center text-3xl sm:text-4xl md:text-5xl font-black text-blue-400 mb-2">
                  100%
                </CardItem>
                <CardItem translateZ={20} className="w-full text-center text-sm font-semibold text-slate-300">
                  Genuine Jindal Steel Stock
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </section>

      {/* Gallery RFQ CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Drawing Submissions &amp; RFQs
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
            Have Similar Fabrication or Material Requirements?
          </h2>
          <p className="text-sm md:text-base text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Send your CAD models or material requirements directly to our technical desk via WhatsApp or Email. We deliver accurate quotations within 24 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/919712929748?text=Hello%20MJ%20Fabrication,%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20submit%20an%20RFQ."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-xl transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp RFQ (+91 97129 29748)</span>
            </a>

            <a
              href="mailto:mjfabworld62@gmail.com?subject=Technical%20RFQ%20from%20Portfolio%20Review"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-xl transition-all hover:scale-[1.02]"
            >
              <Mail className="w-4 h-4" />
              <span>Email Drawings (mjfabworld62@gmail.com)</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
