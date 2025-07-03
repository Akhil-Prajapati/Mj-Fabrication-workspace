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
      title: "MS Windows Fabrication",
      subtitle: "Premium Quality Metal Window Frames",
      description:
        "Custom MS windows with precision engineering and modern design",
      cta: "Get Quote",
    },
    {
      id: 2,
      image: "/optimized/door.png",
      title: "MS Doors Manufacturing",
      subtitle: "Heavy Duty Metal Doors",
      description:
        "Robust MS doors for residential and commercial applications",
      cta: "View Products",
    },
    {
      id: 3,
      image: "/optimized/shade.png",
      title: "MS Shade Solutions",
      subtitle: "Industrial Shade Structures",
      description:
        "Durable metal shade solutions for parking and outdoor areas",
      cta: "Learn More",
    },
    {
      id: 4,
      image: "/optimized/railings.png",
      title: "MS Railings & Handrails",
      subtitle: "Safety with Style",
      description: "Custom MS railings for staircases, balconies, and walkways",
      cta: "Explore Designs",
    },
    {
      id: 5,
      image: "/optimized/gate.png",
      title: "MS Gates & Grills",
      subtitle: "Security & Aesthetics Combined",
      description:
        "Heavy-duty MS gates and decorative grills for complete security",
      cta: "Get Estimate",
    },
    {
      id: 6,
      image: "/optimized/window2.png",
      title: "MS Windows Fabrication",
      subtitle: "Premium Quality Metal Window Frames",
      description:
        "Custom MS windows with precision engineering and modern design 2",
      cta: "Get Quote",
    },
    {
      id: 7,
      image: "/optimized/gate2.png",
      title: "MS Gates & Grills",
      subtitle: "Security & Aesthetics Combined",
      description:
        "Heavy-duty MS gates and decorative grills for complete security 2",
      cta: "Get Estimate",
    },
    {
      id: 8,
      image: "/optimized/petrolpump.png",
      title: "MS Petrol Pump Structures",
      subtitle: "Durable and Safe Petrol Pump Structures",
      description:
        "Custom MS solutions for petrol pumps ensuring durability and safety",
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
              <div className="relative h-[80vh] min-h-[600px]">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
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
