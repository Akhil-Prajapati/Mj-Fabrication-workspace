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
    serviceType: "Industrial and Sheet Metal Fabrication",
    description:
      "Industrial fabrication, sheet metal manufacturing and custom metal work produced to customer drawings and exported to international markets.",
    // Regions only, so no individual country has to be substantiated.
    areaServed: [
      { "@type": "Place", name: "Europe" },
      { "@type": "Place", name: "Gulf and Middle East" },
      { "@type": "Country", name: "India" },
    ],
    offers: {
      "@type": "Offer",
      availability: "InStock",
      priceRange: "₹₹",
    },
  };

  const services = [
    {
      title: "Shade & Canopy Structure Fabrication",
      description:
        "Fabricated shade structures and canopies for industrial, commercial and residential sites. Weather-resistant assemblies produced to the spans, loadings and finishes specified for the project.",
      features: [
        "Custom sizing to drawing",
        "Galvanized MS for durability",
        "Weather & UV resistant coating",
        "Supplied for domestic and export projects",
      ],
      image: "/optimized/Shades&Canopies.png",
    },
    {
      title: "Metal Door Frame Manufacturing",
      description:
        "Precision-fabricated door frames for commercial, industrial and residential buildings. Heavy-gauge frames manufactured to the dimensions and tolerances supplied, for consistent fit on site.",
      features: [
        "Standard & custom sizes available",
        "Heavy gauge MS material",
        "Security-rated configurations",
        "Repeat production runs supported",
      ],
      image: "/optimized/Doorframe.png",
    },
    {
      title: "Window Frame & Assembly Fabrication",
      description:
        "Metal window frames and glazed assemblies for residential complexes, commercial buildings and industrial facilities, fabricated to the profile and opening sizes your drawings define.",
      features: [
        "Energy efficient designs",
        "Corrosion resistant coating",
        "Modern & traditional profiles",
        "Custom dimensions for any project",
      ],
      image: "/optimized/window.png",
    },
    {
      title: "Staircase & Access Structure Fabrication",
      description:
        "Fabricated staircases, platforms and access structures combining safety, function and finish. From single residential flights to industrial stair and walkway assemblies.",
      features: [
        "Fabricated to specified safety codes",
        "Architectural custom designs",
        "MS handrail options",
        "Anti-slip surface treatments",
      ],
      image: "/optimized/Staircases.png",
    },
    {
      title: "Custom Fabrication & Contract Manufacturing",
      description:
        "Custom fabrication for industrial and commercial requirements, including one-off parts, prototypes and repeat production. We manufacture for factories, warehouses and plant projects against supplied drawings.",
      features: [
        "Free consultation & design",
        "AutoCAD technical drawings",
        "Prototype development",
        "Complete production & installation",
      ],
      image: "/optimized/Custom.png",
    },
    {
      title: "Repair, Rework & Maintenance Fabrication",
      description:
        "Repair and maintenance for fabricated metal structures, including welding, surface treatment and restoration of doors, windows, shades and custom installations.",
      features: [
        "Rapid response scheduling",
        "On-site welding repairs",
        "Annual maintenance contracts",
        "Industrial breakdown support",
      ],
      image: "/optimized/Custom2.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Industrial & Sheet Metal Fabrication Services | Manufacturer & Exporter to Europe and the Gulf - MJ Fabrication"
        description="Industrial fabrication and sheet metal manufacturing services produced to customer drawings. Door frames, window assemblies, staircases, shade structures and custom welded assemblies, exported to European and Gulf markets. 15+ years experience."
        keywords="industrial fabrication services, sheet metal fabrication manufacturer, metal fabrication exporter Europe, fabrication supplier Europe, metal fabrication Gulf Middle East, contract manufacturing fabrication, welded assemblies manufacturer, custom metal fabrication exporter, door frame manufacturer exporter, staircase fabrication supplier"
        canonicalUrl="https://mjfabrication.in/services"
        jsonLd={servicesJsonLd}
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Industrial &amp; Sheet Metal Fabrication Services
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-4">
            Door frames, window assemblies, staircases, shade structures and
            custom welded assemblies — manufactured to your drawings and
            technical specifications, with 15+ years of fabrication
            experience.
          </p>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            GST Registered | Jindal Steel Material | Exporting to European
            &amp; Gulf Markets
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
