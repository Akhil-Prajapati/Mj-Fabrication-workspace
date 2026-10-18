import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/optimized/window.png",
      title: "Industrial Fabrication Manufacturer & Exporter",
      subtitle: "Supplying European and Gulf Markets from India",
      description:
        "Fabricated metal structures, welded assemblies and sheet metal components, manufactured to your drawings and specifications.",
      cta: "Request a Quotation",
    },
    {
      id: 2,
      image: "/optimized/door.png",
      title: "Metal Door Frames & Heavy-Duty Doors",
      subtitle: "Built to Drawing, Supplied to Specification",
      description:
        "Heavy-gauge door frames and metal doors for commercial and industrial buildings, produced in the sizes and tolerances your project requires.",
      cta: "View Capabilities",
    },
    {
      id: 3,
      image: "/optimized/shade.png",
      title: "Industrial Shade & Canopy Structures",
      subtitle: "Fabricated Steel Structures for Industrial Sites",
      description:
        "Weather-resistant shade structures and canopies for factories, parking areas and outdoor installations.",
      cta: "Discuss Your Project",
    },
    {
      id: 4,
      image: "/optimized/railings.png",
      title: "Railings, Handrails & Safety Barriers",
      subtitle: "Fabricated to Project Safety Requirements",
      description:
        "Railings and handrail systems for staircases, walkways and platforms, fabricated to the standards specified for your site.",
      cta: "Send Your Drawings",
    },
    {
      id: 5,
      image: "/optimized/gate.png",
      title: "Industrial Gates, Grills & Barriers",
      subtitle: "Access and Perimeter Fabrication",
      description:
        "Heavy-duty gates, grills and perimeter components for industrial and commercial premises, made to order.",
      cta: "Get Technical Details",
    },
    {
      id: 6,
      image: "/optimized/window2.png",
      title: "Sheet Metal Enclosures & Frames",
      subtitle: "Custom Sheet Metal Manufacturing",
      description:
        "Enclosures, frames, brackets and formed sheet metal parts, manufactured from your technical drawings.",
      cta: "Contact Our Team",
    },
    {
      id: 7,
      image: "/optimized/gate2.png",
      title: "Fabrication for Factories & Warehouses",
      subtitle: "Industrial-Grade Welded Assemblies",
      description:
        "Structural and access fabrication for factories, warehouses and plant facilities, supplied for domestic and export projects.",
      cta: "Request Industrial Quote",
    },
    {
      id: 8,
      image: "/optimized/petrolpump.png",
      title: "Petrol Pump & Forecourt Structures",
      subtitle: "Durable Fabricated Canopy Systems",
      description:
        "Fabricated canopy and forecourt structures engineered for durability and site safety.",
      cta: "Learn More",
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
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[80vh] min-h-[600px] overflow-hidden">
                <img
                  src={slide.image}
                  alt={`${slide.title} - MJ Fabrication, industrial fabrication manufacturer and exporter`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 flex items-center justify-center h-full">
                  <div className="text-center text-white max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                      {slide.title}
                    </h1>
                    <h2 className="text-xl md:text-2xl mb-6 text-blue-200">
                      {slide.subtitle}
                    </h2>
                    <p className="text-lg md:text-xl mb-8 text-gray-200">
                      {slide.description}
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Link to="/contact">{slide.cta}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
