import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import IndustrialCapabilities from "@/components/home/IndustrialCapabilities";

const Services = () => {
  // SEO data for Services page
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "MS Fabrication Services",
    provider: {
      "@type": "LocalBusiness",
      name: "MJ Fabrication",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Nava Naroda",
        addressLocality: "Naroda",
        addressRegion: "Gujarat",
        postalCode: "382330",
        addressCountry: "IN",
      },
    },
    serviceType: "MS Fabrication Work",
    description:
      "Professional MS fabrication services including doors, windows, shades, railings, and custom metal work in Naroda, Ahmedabad, Gujarat.",
    areaServed: ["Ahmedabad", "Gujarat", "Naroda", "Nikol"],
    offers: {
      "@type": "Offer",
      availability: "InStock",
      priceRange: "₹₹",
    },
  };

  const services = [
    {
      title: "MS Shade Fabrication & Installation - Naroda Ahmedabad",
      description:
        "Premium MS shade structures and canopies for residential, commercial, and industrial use in Naroda, Nikol, and Ahmedabad. Weather-resistant shades with custom design options for parking areas, factories, and outdoor spaces across Gujarat.",
      features: [
        "Custom sizing for any space",
        "Galvanized MS for durability",
        "Weather & UV resistant coating",
        "Professional installation in Gujarat",
      ],
      image: "/optimized/Shades&Canopies.png",
    },
    {
      title: "MS Door Frame Manufacturing - Ahmedabad Gujarat",
      description:
        "Precision-crafted MS door frames for residential and commercial properties in Ahmedabad. Heavy-duty door frames with security features, perfect fit guarantee, and long-lasting performance for properties in Naroda, Nikol area.",
      features: [
        "Standard & custom sizes available",
        "Heavy gauge MS material",
        "Anti-theft security features",
        "Expert installation in Ahmedabad",
      ],
      image: "/optimized/Doorframe.png",
    },
    {
      title: "MS Window Frame Fabrication - Naroda Nikol",
      description:
        "High-quality MS window frames that combine functionality with modern design. Perfect for residential complexes, commercial buildings, and industrial facilities in Naroda, Nikol, and across Ahmedabad, Gujarat.",
      features: [
        "Energy efficient designs",
        "Corrosion resistant coating",
        "Modern & traditional styles",
        "Custom dimensions for any project",
      ],
      image: "/optimized/window.png",
    },
    {
      title: "MS Staircase Fabrication - Ahmedabad Gujarat",
      description:
        "Custom MS staircases combining safety, functionality, and architectural beauty. From simple residential stairs to complex industrial staircases for buildings across Ahmedabad, including Naroda, Nikol, Vastral areas.",
      features: [
        "IS code safety compliance",
        "Architectural custom designs",
        "MS handrail options",
        "Anti-slip surface treatments",
      ],
      image: "/optimized/Staircases.png",
    },
    {
      title: "Custom MS Fabrication Work - Gujarat",
      description:
        "Specialized custom MS fabrication services for unique industrial and residential requirements across Gujarat. We design and manufacture custom MS solutions for factories, warehouses, and residential projects in Ahmedabad region.",
      features: [
        "Free consultation & design",
        "AutoCAD technical drawings",
        "Prototype development",
        "Complete production & installation",
      ],
      image: "/optimized/Custom.png",
    },
    {
      title: "MS Fabrication Repair & Maintenance - Ahmedabad",
      description:
        "Professional repair and maintenance services for all types of MS fabricated structures in Ahmedabad. Expert welding, painting, and restoration services for doors, windows, shades, and custom installations across Gujarat.",
      features: [
        "24/7 emergency response",
        "On-site welding repairs",
        "Annual maintenance contracts",
        "Industrial breakdown services",
      ],
      image: "/optimized/Custom2.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="MS Fabrication Services Naroda Ahmedabad | Door Window Shade Manufacturing Gujarat - MJ Fabrication"
        description="Professional MS fabrication services in Naroda, Ahmedabad. Expert door, window, shade, railing & staircase fabrication. 15+ years experience in Gujarat. GST registered company. Call for free quote."
        keywords="MS fabrication services Ahmedabad, door frame manufacturing Naroda, window fabrication Nikol, shade structure Gujarat, staircase fabrication Ahmedabad, railing work Naroda, custom MS fabrication Gujarat, metal fabrication services Ahmedabad"
        canonicalUrl="https://mjfabrication.in/services"
        jsonLd={servicesJsonLd}
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            MS Fabrication Services in Naroda, Ahmedabad | Gujarat's Best
            Fabrication Work
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-4">
            Professional MS fabrication services in Naroda, Nikol, and across
            Ahmedabad. Expert door, window, shade, and staircase fabrication
            with 15+ years experience.
          </p>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            GST Registered | ISO Certified | Serving Gujarat with Quality MS
            Fabrication Solutions
          </p>
        </div>
      </section>

      <IndustrialCapabilities />

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
                    loading="lazy"
                    decoding="async"
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
