import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Factory,
  Cpu,
  Globe2,
  FileCheck2,
  MessageCircle,
} from "lucide-react";
import { Spotlight, FlipWords, MovingBorderButton } from "@/components/ui/aceternity";

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/optimized/raw-material-supply.webp",
      badge: "Raw Material Supply",
      title: "Raw Material Supply for Engineering & Manufacturing Projects",
      subtitle: "Materials Supplied According to Project Specifications & Quality Requirements",
      description:
        "Reliable sourcing and supply of genuine Jindal Steel plates, pipes, seamless tubes, and structural sections. Supplying engineering manufacturers, equipment builders, and industrial projects with custom cut-to-size stock.",
      primaryCta: "Inquire Material Supply",
      primaryLink: "/contact",
      secondaryCta: "View Services",
      secondaryLink: "/services",
      stats: "Jindal Steel Stock • Plates, Pipes & Sections • Cut-to-Size Supply",
    },
    {
      id: 2,
      image: "/video/welder.webp",
      badge: "Industrial Fabrication in Action",
      title: "Industrial Metal Structures & Heavy Welded Assemblies",
      subtitle: "Metal Structures, Welded Assemblies & Heavy Industrial Components",
      description:
        "Fabricating heavy structural steel, machine frames, equipment skids, and industrial assemblies built precisely to customer drawings, technical specifications, and structural requirements.",
      primaryCta: "Send Project Drawings",
      primaryLink: "/contact",
      secondaryCta: "Explore Capabilities",
      secondaryLink: "/services",
      stats: "Active Welding Bay • Certified MIG/TIG Welding • Drawing-to-Part Accuracy",
    },
    {
      id: 3,
      image: "/optimized/sheet-metal-fabrication.webp",
      badge: "Sheet Metal Fabrication",
      title: "Customized Metal Enclosures, Frames & Sheet Metal Products",
      subtitle: "Precision Enclosures, Structural Frames, Brackets & Formed Products",
      description:
        "High-tonnage 250T CNC press brake bending and precision forming. Fabricating custom mild steel and stainless steel enclosures, mounting frames, brackets, and sheet metal assemblies.",
      primaryCta: "Explore Sheet Metal",
      primaryLink: "/services",
      secondaryCta: "Request Component Quote",
      secondaryLink: "/contact",
      stats: "250T CNC Press Brake • IP65/IP66 Enclosures • Multi-Axis Bending",
    },
    {
      id: 4,
      image: "/optimized/oem-components.webp",
      badge: "Custom Manufacturing",
      title: "Custom Manufacturing Based on Customer Drawings",
      subtitle: "Fabrication & Component Supply for Equipment OEMs & Project Requirements",
      description:
        "Tailored metal manufacturing from your CAD drawings and technical specifications. Supplying precision laser-cut blanks, machined flanges, sub-assemblies, and customized components to equipment manufacturers.",
      primaryCta: "Upload Drawings for RFQ",
      primaryLink: "/contact",
      secondaryCta: "View Custom Capabilities",
      secondaryLink: "/services",
      stats: "12kW CNC Laser Cutting • Precision OEM Components • Build-to-Print",
    },
    {
      id: 5,
      image: "/video/factory.webp",
      badge: "Equipped Naroda Facility",
      title: "Reliable Workmanship & Timely Project Completion",
      subtitle: "A Commitment to Reliable Workmanship, Competitive Pricing & Timely Dispatch",
      description:
        "Equipped manufacturing facility in Naroda, Ahmedabad, Gujarat. Every project undergoes rigorous dimensional inspection and weld verification before dispatch. On-time delivery for engineering clients across India and export markets.",
      primaryCta: "Discuss Your Project",
      primaryLink: "/contact",
      secondaryCta: "About MJ Fabrication",
      secondaryLink: "/about",
      stats: "Equipped Plant Bay • Naroda Gujarat • Guaranteed Delivery Schedules",
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full overflow-hidden bg-slate-950">
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[
          Autoplay({
            delay: 6000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => {
            const isActive = index === current;
            return (
              <CarouselItem key={slide.id}>
                <div className="relative min-h-[640px] md:h-[85vh] md:min-h-[700px] overflow-hidden flex items-center">
                  {/* Background Image */}
                  <img
                    src={slide.image}
                    alt={`${slide.title} - MJ Fabrication & Heavy Engineering`}
                    className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out"
                    loading={index === 0 ? "eager" : "lazy"}
                  />

                  {/* Aceternity Dark Industrial Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-900/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

                  {/* Aceternity Spotlight Effect */}
                  <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#3b82f6" />

                  {/* Subtle Grid Pattern Overlay */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />

                  {/* Slide Content */}
                  <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-3xl">
                      {/* Animated Badge & Flip Words */}
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-wrap items-center gap-2 mb-6"
                          >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-inner">
                              <ShieldCheck className="w-4 h-4 text-blue-400" />
                              {slide.badge}
                            </span>
                            <span className="text-xs sm:text-sm text-slate-400 font-medium hidden sm:inline-flex items-center">
                              Serving <FlipWords words={["Equipment OEMs", "Machinery Builders", "EPC Contractors", "Infrastructure Projects", "Global Exporters"]} duration={2500} />
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Main Title */}
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-4"
                          >
                            {slide.title}
                          </motion.h1>
                        )}
                      </AnimatePresence>

                      {/* Subtitle */}
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-400 mb-4"
                          >
                            {slide.subtitle}
                          </motion.h2>
                        )}
                      </AnimatePresence>

                      {/* Description */}
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-sm sm:text-base md:text-lg text-slate-300 mb-6 leading-relaxed"
                          >
                            {slide.description}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Feature Metric Pill */}
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, delay: 0.35 }}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 text-xs font-mono mb-8"
                          >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            {slide.stats}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Action Buttons */}
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-wrap items-center gap-3 sm:gap-4"
                          >
                            <MovingBorderButton
                              as={Link}
                              to={slide.primaryLink}
                              duration={3500}
                              borderRadius="0.75rem"
                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3 text-base gap-2 flex items-center shadow-lg shadow-blue-600/30"
                            >
                              {slide.primaryCta}
                              <ArrowRight className="w-5 h-5 ml-1" />
                            </MovingBorderButton>
                            
                            <a
                              href="https://wa.me/919712929748?text=Hello%20MJ%20Fabrication,%20I%20have%20an%20RFQ%20and%20technical%20drawings%20to%20share."
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl shadow-lg text-sm sm:text-base transition-all hover:scale-[1.02]"
                            >
                              <MessageCircle className="w-5 h-5" />
                              <span>WhatsApp RFQ</span>
                            </a>

                            <Button
                              asChild
                              variant="outline"
                              size="lg"
                              className="border-slate-700 hover:border-slate-500 bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-800/80 font-semibold px-5 py-6 rounded-xl text-sm sm:text-base transition-all duration-200"
                            >
                              <Link to={slide.secondaryLink}>
                                {slide.secondaryCta}
                              </Link>
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="left-4 bg-slate-900/70 border-slate-700 text-white hover:bg-blue-600 hover:border-blue-600 transition-colors" />
        <CarouselNext className="right-4 bg-slate-900/70 border-slate-700 text-white hover:bg-blue-600 hover:border-blue-600 transition-colors" />
      </Carousel>

      {/* Enterprise Trust Ribbon below Hero Carousel */}
      <div className="bg-slate-900/90 border-t border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-400" />
            <span>20+ Years Track Record (Est. 2003)</span>
          </div>
          <div className="flex items-center gap-2">
            <Factory className="w-4 h-4 text-blue-400" />
            <span>Equipped Fabrication Facility in Naroda, Gujarat</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-blue-400" />
            <span>Genuine Jindal Steel Materials</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-blue-400" />
            <span>Supplying Indian OEMs &amp; Global Exporters</span>
          </div>
        </div>
      </div>

      {/* Carousel Slide Indicators */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2.5 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            aria-label={`Slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "w-8 bg-blue-500 shadow-md shadow-blue-500/50"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

