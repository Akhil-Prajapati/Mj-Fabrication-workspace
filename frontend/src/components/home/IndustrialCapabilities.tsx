import { Card, CardContent } from "@/components/ui/card";
import {
  BadgeCheck,
  CheckCircle2,
  Factory,
  Layers,
  PencilRuler,
  Truck,
} from "lucide-react";

const capabilities = [
  {
    title: "Industrial Fabrication",
    badge: "Heavy Structural",
    description:
      "Heavy-duty steel structures, certified welded assemblies, and robust industrial components engineered for high structural load capacities.",
    features: [
      "MIG/TIG Certified Welding",
      "Heavy Beams & Columns",
      "Factory & Plant Structures",
    ],
    icon: Factory,
    image: "/optimized/industrial-fabrication.webp",
  },
  {
    title: "Sheet Metal Fabrication",
    badge: "Precision CNC",
    description:
      "High-precision CNC formed sheet metal enclosures, brackets, mounting assemblies, and custom perforated or formed panels.",
    features: [
      "CNC Press Brake Bending",
      "Custom Enclosures & Consoles",
      "Tight Tolerance Control",
    ],
    icon: Layers,
    image: "/optimized/sheet-metal-fabrication.webp",
  },
  {
    title: "Raw Material Supply",
    badge: "Certified Stock",
    description:
      "Prime structural steel, pipes, plates, angles, and channels sourced directly from Jindal Steel with full mill test compliance.",
    features: [
      "Jindal Steel Material",
      "Custom Profile Sizing",
      "Traceable Mill Test Reports",
    ],
    icon: Truck,
    image: "/optimized/raw-material-supply.webp",
  },
  {
    title: "Custom Manufacturing",
    badge: "Bespoke Engineering",
    description:
      "Customized fabrication manufactured precisely to client drawings, technical specifications, CAD models, and architectural requirements.",
    features: [
      "Drawing-to-Part Accuracy",
      "Prototype to Bulk Runs",
      "Architectural & Industrial",
    ],
    icon: PencilRuler,
    image: "/optimized/custom-manufacturing.webp",
  },
  {
    title: "Quality & Timely Delivery",
    badge: "Export Standard",
    description:
      "Rigorous multi-stage quality inspections, precision dimensional verification, and export-grade protective packaging delivered on schedule.",
    features: [
      "Vernier & Gauge Inspection",
      "Export Packaging to Gulf & EU",
      "Reliable Delivery Schedules",
    ],
    icon: BadgeCheck,
    image: "/optimized/quality-timely-delivery.webp",
  },
];

const IndustrialCapabilities = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-sm font-semibold mb-4 tracking-wide">
            <Factory className="w-4 h-4" />
            Manufacturing Excellence
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Industrial Fabrication &amp; Custom Metal Manufacturing
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            MJ Fabrication provides end-to-end fabrication and customized metal
            manufacturing solutions tailored to customer requirements. We work
            with client drawings, technical specifications, and project needs
            to deliver durable, export-standard fabrication solutions.
          </p>
        </div>

        {/* 5-card layout: centered and responsive */}
        <div className="flex flex-wrap justify-center gap-8">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <Card
                key={capability.title}
                className="group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-white border border-gray-100 flex flex-col rounded-xl"
              >
                <div className="relative overflow-hidden h-52 bg-gray-100">
                  <img
                    src={capability.image}
                    alt={`${capability.title} - MJ Fabrication`}
                    width={1200}
                    height={675}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/95 backdrop-blur-sm text-blue-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-blue-100">
                      {capability.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center">
                    <span className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center mr-3 shadow-md shrink-0">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-bold text-white drop-shadow-sm line-clamp-1">
                      {capability.title}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    {capability.description}
                  </p>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
                      Highlights
                    </p>
                    <ul className="space-y-1.5">
                      {capability.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-gray-700 flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustrialCapabilities;

