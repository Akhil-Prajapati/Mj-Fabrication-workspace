import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, CheckCircle2, Factory, Layers, Truck, PencilRuler, BadgeCheck, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import MachineryInfrastructure from "@/components/home/MachineryInfrastructure";
import { LampContainer, AnimatedTabs, BackgroundGradient, TracingBeam } from "@/components/ui/aceternity";

const Services = () => {
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Industrial Fabrication & Customized Metal Manufacturing",
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
    serviceType: "Industrial Fabrication, Sheet Metal, Raw Material Supply & Custom Manufacturing",
    description:
      "MJ Fabrication provides fabrication and customized metal manufacturing solutions tailored to customer requirements. We work with customer drawings, technical specifications, and project needs to deliver practical and reliable fabrication solutions.",
    areaServed: [
      { "@type": "Place", name: "Europe" },
      { "@type": "Place", name: "Gulf and Middle East" },
      { "@type": "Country", name: "India" },
    ],
  };

  const coreServices = [
    {
      id: "industrial-fabrication",
      title: "Industrial Fabrication",
      badge: "Heavy Structural",
      icon: Factory,
      tagline: "Metal structures, welded assemblies, and industrial components.",
      description:
        "We manufacture heavy-duty steel structures, equipment base frames, machine skids, and industrial components strictly conforming to client engineering drawings and technical load specifications.",
      features: [
        "Heavy Welded Structural Frames & Skids",
        "MIG / TIG Certified Fabrication",
        "High Structural Rigidity & Load Capacity",
        "Built Strictly to Customer Drawings",
      ],
      image: "/video/welder.webp",
    },
    {
      id: "sheet-metal-fabrication",
      title: "Sheet Metal Fabrication",
      badge: "Precision CNC",
      icon: Layers,
      tagline: "Customized metal enclosures, frames, brackets, and sheet metal products.",
      description:
        "Precision multi-axis CNC press brake bending (250-ton capacity) and forming. We fabricate customized electrical enclosures, mounting frames, equipment brackets, consoles, and sheet metal assemblies.",
      features: [
        "Customized IP65 / IP66 Metal Enclosures",
        "Mounting Frames, Chassis & Brackets",
        "250-Ton Multi-Axis CNC Press Brake",
        "High-Tolerance Repeat Forming (±0.1mm)",
      ],
      image: "/optimized/sheet-metal-fabrication.webp",
    },
    {
      id: "raw-material-supply",
      title: "Raw Material Supply",
      badge: "Prime Material",
      icon: Truck,
      tagline: "Materials supplied according to project specifications and quality requirements.",
      description:
        "Reliable stocking and supply of genuine Jindal Steel plates, seamless pipes, heavy-wall structural tubes, and hot-rolled sections. We supply cut-to-size stock and bulk materials to engineering OEMs, infrastructure contractors, and automated equipment manufacturers.",
      features: [
        "Genuine Jindal Steel Stock",
        "Plates, Pipes, Tubes, Channels & Beams",
        "Custom Cut-to-Size Precision Lengths",
        "Full Heat-Number Mill Traceability",
      ],
      image: "/optimized/raw-material-supply.webp",
    },
    {
      id: "custom-manufacturing",
      title: "Custom Manufacturing",
      badge: "Build-To-Print",
      icon: PencilRuler,
      tagline: "Fabrication and manufacturing based on customer drawings and project requirements.",
      description:
        "Bespoke manufacturing from your 2D/3D CAD models. Utilizing high-capacity 12kW CNC fiber laser cutting, precision machining, and assembly to produce custom components, circular flanges, and contract sub-assemblies for equipment builders.",
      features: [
        "12kW Fiber Laser Cutting (up to 30mm)",
        "Precision Profile Blanks & Flange Rings",
        "Contract Component Supply for OEMs",
        "Strict Adherence to Tolerance & Finishes",
      ],
      image: "/optimized/oem-components.webp",
    },
    {
      id: "quality-delivery",
      title: "Quality & Timely Delivery",
      badge: "Execution Standard",
      icon: BadgeCheck,
      tagline: "A commitment to reliable workmanship, competitive pricing, and timely project completion.",
      description:
        "Every project undergoes comprehensive dimensional inspection, vernier verification, and weld examination before dispatch. We maintain strict delivery schedules, protective export packing, and competitive pricing for clients across India and global export destinations.",
      features: [
        "Multi-Stage Dimensional & Weld Inspection",
        "Protective Packaging for Domestic & Export Dispatch",
        "Competitive & Transparent Pricing",
        "Reliable, Guaranteed Project Completion",
      ],
      image: "/optimized/quality-timely-delivery.webp",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Technical Review",
      desc: "Detailed review of customer CAD drawings, bill of materials, and tolerance specifications.",
    },
    {
      step: "02",
      title: "Material Allocation",
      desc: "Allocation of genuine Jindal Steel plates, pipes, or structural sections with mill test records.",
    },
    {
      step: "03",
      title: "CNC Processing",
      desc: "12kW CNC fiber laser cutting and 250T press brake bending to drawing tolerances.",
    },
    {
      step: "04",
      title: "Welding & Assembly",
      desc: "Heavy bay structural assembly, certified MIG/TIG welding, and sub-assembly integration.",
    },
    {
      step: "05",
      title: "Quality & Dispatch",
      desc: "Comprehensive dimensional checks, protective crating, and timely logistics dispatch.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Industrial Fabrication & Customized Metal Manufacturing | MJ Fabrication"
        description="MJ Fabrication provides fabrication and customized metal manufacturing solutions tailored to customer requirements. Industrial fabrication, sheet metal fabrication, raw material supply, custom manufacturing, and timely delivery."
        keywords="industrial fabrication, customized metal manufacturing, sheet metal fabrication, raw material supply Jindal Steel, custom manufacturing to drawings, metal enclosures, welded assemblies"
        canonicalUrl="https://mjfabrication.in/services"
        jsonLd={servicesJsonLd}
      />
      <Header />

      {/* Lamp Hero Section */}
      <section className="bg-slate-950 text-white relative overflow-hidden pt-4 pb-12">
        <LampContainer className="pt-24 pb-8 min-h-[480px]">
          <motion.div
            initial={{ opacity: 0.5, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.7,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center max-w-5xl mx-auto text-center px-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold mb-6 tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              Reliable Metal Manufacturing &amp; Fabrication Solutions
            </div>
            <h1 className="bg-gradient-to-br from-white via-slate-100 to-slate-300 py-2 bg-clip-text text-center text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-transparent">
              Our Services &amp; Capabilities
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed font-normal">
              MJ Fabrication provides fabrication and customized metal manufacturing solutions tailored to customer requirements. We work with customer drawings, technical specifications, and project needs to deliver practical and reliable fabrication solutions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs sm:text-sm text-blue-200 font-medium">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">20+ Years Experience</span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">Genuine Jindal Steel</span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">Build to Drawing Specifications</span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">Domestic &amp; Export Supply</span>
            </div>
          </motion.div>
        </LampContainer>
      </section>

      {/* Core Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Our 5 Core Capabilities
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Tailored industrial solutions engineered from project specifications and customer drawings
            </p>
          </div>

          <div className="space-y-14">
            {coreServices.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 1;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="overflow-hidden bg-white border border-slate-200/90 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300">
                    <div className={`grid grid-cols-1 lg:grid-cols-12 items-center ${isEven ? "lg:flex-row-reverse" : ""}`}>
                      {/* Image block with glowing gradient border */}
                      <div className={`lg:col-span-5 relative h-72 sm:h-80 lg:h-full min-h-[340px] overflow-hidden bg-slate-950 ${isEven ? "lg:order-2" : ""}`}>
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                            {service.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content block */}
                      <div className={`lg:col-span-7 p-8 sm:p-10 ${isEven ? "lg:order-1" : ""}`}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
                            Service Pillar 0{index + 1}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight">
                          {service.title}
                        </h3>

                        <p className="text-base font-semibold text-slate-800 mb-3">
                          {service.tagline}
                        </p>

                        <p className="text-sm text-slate-600 leading-relaxed mb-6">
                          {service.description}
                        </p>

                        <div className="border-t border-slate-100 pt-5">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                            Key Capabilities &amp; Specifications:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {service.features.map((feature, fIdx) => (
                              <div
                                key={fIdx}
                                className="text-xs sm:text-sm font-medium text-slate-700 flex items-center gap-2"
                              >
                                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-4">
                          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl">
                            <Link to="/contact">
                              Request RFQ for {service.title} <ArrowRight className="w-4 h-4 ml-1.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Machinery Infrastructure Bento Grid */}
      <MachineryInfrastructure />

      {/* Industrial Execution Workflow */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <TracingBeam className="px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-3">
                Standardized Execution
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4">
                Our 5-Stage Execution Process
              </h2>
              <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
                From technical drawings to final dispatch, our process guarantees strict quality control and predictable timelines.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {workflowSteps.map((ws, i) => (
                <motion.div
                  key={ws.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 text-center hover:border-blue-500/40 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mx-auto mb-4 font-mono font-bold text-lg shadow-md">
                    {ws.step}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{ws.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{ws.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </TracingBeam>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Direct Estimating &amp; Technical Desk
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
            Have Project Drawings or Raw Material Inquiries?
          </h2>
          <p className="text-base md:text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Send CAD drawings (.dwg, .dxf, .step, .pdf) or bill of materials directly via WhatsApp or Email. Our engineering desk provides quotations within 24 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/919712929748?text=Hello%20MJ%20Fabrication,%20I%20have%20an%20RFQ%20and%20technical%20drawings%20to%20share."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-xl transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp RFQ (+91 97129 29748)</span>
            </a>

            <a
              href="mailto:mjfabworld62@gmail.com?subject=Technical%20RFQ%20%26%20Drawing%20Submission"
              className="flex items-center gap-2 px-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-xl transition-all hover:scale-[1.02]"
            >
              <Mail className="w-5 h-5" />
              <span>Email Drawings (mjfabworld62@gmail.com)</span>
            </a>

            <Button asChild size="lg" variant="outline" className="border-slate-700 hover:bg-slate-800 text-white font-bold px-7 py-6 rounded-xl text-base">
              <Link to="/contact">
                Online Form <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
