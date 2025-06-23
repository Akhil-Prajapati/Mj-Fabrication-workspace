import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Services = () => {
  const services = [
    {
      title: "Fabrication Shades",
      description:
        "Custom-designed shades for residential and commercial spaces. We create durable, weather-resistant shades that provide optimal protection while enhancing aesthetic appeal.",
      features: [
        "Custom sizing",
        "Weather-resistant materials",
        "Multiple color options",
        "Easy installation",
      ],
      image: "Serviceimg/Shades&Canopies.png",
    },
    {
      title: "Door Frames",
      description:
        "Precision-crafted door frames for all types of doors. Our frames are designed for durability, perfect fit, and long-lasting performance.",
      features: [
        "Standard & custom sizes",
        "Multiple material options",
        "Security features",
        "Professional installation",
      ],
      image: "Serviceimg/Doorframe.png",
    },
    {
      title: "Window Frames",
      description:
        "High-quality window frames that combine functionality with style. Perfect for both residential and commercial applications.",
      features: [
        "Energy efficient",
        "Corrosion resistant",
        "Multiple designs",
        "Custom dimensions",
      ],
      image: "Serviceimg/Window.png",
    },
    {
      title: "Staircase Fabrication",
      description:
        "Custom staircases that blend safety, functionality, and aesthetic appeal. From simple designs to complex architectural features.",
      features: [
        "Safety compliance",
        "Custom designs",
        "Handrail options",
        "Non-slip surfaces",
      ],
      image: "Serviceimg/Staircases.png",
    },
    {
      title: "Custom Fabrication",
      description:
        "Specialized fabrication services for unique requirements. We work with you to create custom solutions that meet your specific needs.",
      features: [
        "Consultation & design",
        "CAD drawings",
        "Prototype development",
        "Production & installation",
      ],
      image: "Serviceimg/Custom.png",
    },
    {
      title: "Repair & Maintenance",
      description:
        "Professional repair and maintenance services for all types of fabricated items. Keep your installations in perfect condition.",
      features: [
        "Quick response",
        "Quality repairs",
        "Maintenance contracts",
        "Emergency services",
      ],
      image: "Serviceimg/Custom2.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive fabrication solutions for all your construction and
            design needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">
                      Key Features:
                    </h4>
                    <ul className="grid grid-cols-2 gap-1">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-sm text-gray-600 flex items-center"
                        >
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From consultation to completion, we ensure quality at every step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Consultation
              </h3>
              <p className="text-gray-600">
                Understand your requirements and provide expert advice
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Design & Quote
              </h3>
              <p className="text-gray-600">
                Create detailed designs and provide transparent pricing
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fabrication
              </h3>
              <p className="text-gray-600">
                Precise manufacturing using quality materials and tools
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Installation
              </h3>
              <p className="text-gray-600">
                Professional installation with quality assurance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us to discuss your specific requirements and get a
            personalized quote
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">
              Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
