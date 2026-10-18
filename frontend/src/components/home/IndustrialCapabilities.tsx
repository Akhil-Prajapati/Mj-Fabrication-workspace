import { Card, CardContent } from "@/components/ui/card";
import {
  BadgeCheck,
  Factory,
  Layers,
  PencilRuler,
  Truck,
} from "lucide-react";

// Each entry keeps its own image path so the placeholders can be swapped out
// one at a time. They all point at moke.webp until real photos are supplied.
const capabilities = [
  {
    title: "Industrial Fabrication",
    description:
      "Metal structures, welded assemblies, and industrial components.",
    icon: Factory,
    image: "/optimized/moke.webp",
  },
  {
    title: "Sheet Metal Fabrication",
    description:
      "Customized metal enclosures, frames, brackets, and sheet metal products.",
    icon: Layers,
    image: "/optimized/moke.webp",
  },
  {
    title: "Raw Material Supply",
    description:
      "Materials supplied according to project specifications and quality requirements.",
    icon: Truck,
    image: "/optimized/moke.webp",
  },
  {
    title: "Custom Manufacturing",
    description:
      "Fabrication and manufacturing based on customer drawings and project requirements.",
    icon: PencilRuler,
    image: "/optimized/moke.webp",
  },
  {
    title: "Quality & Timely Delivery",
    description:
      "A commitment to reliable workmanship, competitive pricing, and timely project completion.",
    icon: BadgeCheck,
    image: "/optimized/moke.webp",
  },
];

const IndustrialCapabilities = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Industrial Fabrication &amp; Custom Metal Manufacturing
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            MJ Fabrication provides fabrication and customized metal
            manufacturing solutions tailored to customer requirements. We work
            with customer drawings, technical specifications, and project needs
            to deliver practical and reliable fabrication solutions.
          </p>
        </div>

        {/* Flex rather than grid: there are five cards against a three-column
            layout, and a grid would strand the last two against the left edge
            with a gap on the right. Wrapping flex centres the final row. */}
        <div className="flex flex-wrap justify-center gap-8">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <Card
                key={capability.title}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)] hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white"
              >
                <img
                  src={capability.image}
                  alt={capability.title}
                  width={1200}
                  height={675}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center mr-3 shrink-0">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {capability.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{capability.description}</p>
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
