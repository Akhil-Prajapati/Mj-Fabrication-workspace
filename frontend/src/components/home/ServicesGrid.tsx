import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ServicesGrid = () => {
  const services = [
    {
      title: "Fabricated Brackets",
      description:
        "Custom steel brackets for industrial and residential use with precision engineering",
      image: "Serviceimg/Brackets.png",
      features: ["Industrial Grade", "Custom Sizes", "Corrosion Resistant"],
    },
    {
      title: "Door Frames",
      description:
        "Durable door frames in various sizes and materials for all applications",
      image: "Serviceimg/Doorframe.png",
      features: [
        "Multiple Materials",
        "Standard & Custom",
        "Weather Resistant",
      ],
    },
    {
      title: "Window Frames",
      description:
        "Quality window frames with precise measurements and modern designs",
      image: "Serviceimg/Window.png",
      features: ["Energy Efficient", "Modern Design", "Long Lasting"],
    },
    {
      title: "Staircases",
      description:
        "Custom staircases with modern designs combining safety and aesthetics",
      image: "Serviceimg/Staircases.png",
      features: ["Safety First", "Modern Design", "Custom Solutions"],
    },
    {
      title: "Shades & Canopies",
      description:
        "Weather protection solutions for homes and businesses with style",
      image: "Serviceimg/Shades&Canopies.png",
      features: ["Weather Protection", "UV Resistant", "Custom Design"],
    },
    {
      title: "Custom Fabrication",
      description:
        "Bespoke fabrication according to your specific requirements and designs",
      image: "Serviceimg/Custom.png",
      features: ["Fully Custom", "Expert Design", "Quality Materials"],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Fabrication Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive fabrication solutions for all your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-1 mb-4">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-500 flex items-center"
                    >
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/services">
              View All Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
