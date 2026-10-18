import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Factory,
  Layers,
  Truck,
  PencilRuler,
  BadgeCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundGradient } from "@/components/ui/aceternity";

const services = [
  {
    id: "industrial-fabrication",
    title: "Industrial Fabrication",
    badge: "Structural & Welded",
    icon: Factory,
    summary:
      "Metal structures, welded assemblies, and industrial components.",
    description:
      "Heavy-duty metal structures, certified welded assemblies, equipment skids, and industrial components built strictly to customer drawings and structural specifications.",
    image: "/optimized/industrial-fabrication.webp",
    features: [
      "Heavy Metal Structures & Skids",
      "Certified MIG & TIG Welded Assemblies",
      "Drawing-to-Part Industrial Components",
    ],
  },
  {
    id: "sheet-metal-fabrication",
    title: "Sheet Metal Fabrication",
    badge: "Precision CNC",
    icon: Layers,
    summary:
      "Customized metal enclosures, frames, brackets, and sheet metal products.",
    description:
      "High-precision 250T CNC press brake multi-axis bending and forming for custom mild steel & stainless steel enclosures, mounting frames, chassis, and brackets.",
    image: "/optimized/sheet-metal-fabrication.webp",
    features: [
      "Customized Metal Enclosures & Housings",
      "Precision Mounting Frames & Brackets",
      "250T Multi-Axis CNC Press Brake Forming",
    ],
  },
  {
    id: "raw-material-supply",
    title: "Raw Material Supply",
    badge: "Prime Material",
    icon: Truck,
    summary:
      "Materials supplied according to project specifications and quality requirements.",
    description:
      "Dependable sourcing and supply of genuine Jindal Steel plates, pipes, seamless tubes, and structural sections. Providing custom cut-to-size material stock for engineering OEMs and infrastructure contractors.",
    image: "/optimized/raw-material-supply.webp",
    features: [
      "Genuine Jindal Steel Plates & Pipes",
      "Structural Tubes, Channels & Beams",
      "Custom Cut-to-Size & Ready Stock",
    ],
  },
  {
    id: "custom-manufacturing",
    title: "Custom Manufacturing",
    badge: "Build-To-Print",
    icon: PencilRuler,
    summary:
      "Fabrication and manufacturing based on customer drawings and project requirements.",
    description:
      "End-to-end bespoke metal manufacturing using 12kW fiber laser cutting, precision machining, and assembly based on CAD drawings, technical specifications, and OEM requirements.",
    image: "/optimized/oem-components.webp",
    features: [
      "12kW Fiber Laser Blanks & Flanges",
      "Fabrication to CAD / Technical Drawings",
      "Sub-Assemblies for Equipment OEMs",
    ],
  },
  {
    id: "quality-delivery",
    title: "Quality & Timely Delivery",
    badge: "Execution Standard",
    icon: BadgeCheck,
    summary:
      "A commitment to reliable workmanship, competitive pricing, and timely project completion.",
    description:
      "Strict dimensional tolerance checks, weld integrity inspections, protective packaging, and guaranteed dispatch schedules for clients across India and global export destinations.",
    image: "/optimized/quality-timely-delivery.webp",
    features: [
      "Rigorous Dimensional & Weld Verification",
      "Competitive, Transparent Pricing",
      "On-Time Project & Export Completion",
    ],
  },
];

const ServicesGrid = () => {
  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-4 tracking-wide uppercase">
            <Factory className="w-4 h-4 text-blue-600" />
            Core Manufacturing Capabilities
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Our Services
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            MJ Fabrication provides fabrication and customized metal manufacturing solutions tailored to customer requirements. We work with customer drawings, technical specifications, and project needs to deliver practical and reliable fabrication solutions.
          </p>
        </motion.div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            // Let the 4th and 5th cards sit nicely if 5 cards in 3-col grid
            const isSpan = index === 3 || index === 4;

            const isFeatured = service.id === "raw-material-supply";

            const cardMarkup = (
              <Card className={`group h-full flex flex-col overflow-hidden bg-white ${isFeatured ? "border-transparent" : "border border-slate-200/90 hover:border-blue-500/50"} rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                      {service.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/90 text-white flex items-center justify-center shrink-0 shadow-lg">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white drop-shadow-sm leading-snug">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-slate-800 text-sm font-semibold leading-relaxed mb-2">
                      {service.summary}
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-slate-100">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="text-xs sm:text-sm font-medium text-slate-700 flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold p-0 h-auto"
                    >
                      <Link to="/services">
                        View Details &amp; Specifications <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={isSpan ? "lg:col-span-1" : ""}
              >
                {isFeatured ? (
                  <BackgroundGradient containerClassName="h-full rounded-2xl" className="rounded-2xl h-full bg-white overflow-hidden">
                    {cardMarkup}
                  </BackgroundGradient>
                ) : (
                  cardMarkup
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-14">
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-blue-600/20 text-base"
          >
            <Link to="/contact">
              Send Your Drawings &amp; Specifications <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
