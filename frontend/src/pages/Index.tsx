import HeroCarousel from "@/components/home/HeroCarousel";
import ServicesGrid from "@/components/home/ServicesGrid";
import IndustrialCapabilities from "@/components/home/IndustrialCapabilities";
import GlobalReach from "@/components/home/GlobalReach";
import AboutSummary from "@/components/home/AboutSummary";
import ProjectsGallery from "@/components/home/ProjectsGallery";
import ProcessSection from "@/components/home/ProcessSection";
import CustomerReviews from "@/components/home/CustomerReviews";
import AdminAccess from "@/components/home/AdminAccess";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "MJ Fabrication - Industrial & Sheet Metal Fabrication Manufacturer & Exporter",
    description:
      "Industrial and sheet metal fabrication manufacturer and exporter. Custom metal manufacturing from customer drawings using Jindal Steel material, supplying clients across European and Gulf markets. 15+ years experience. GST registered.",
    url: "https://mjfabrication.in/",
    mainEntity: {
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
      geo: {
        "@type": "GeoCoordinates",
        latitude: "23.0821",
        longitude: "72.6307",
      },
      // Only markets the business has confirmed. Europe and the Gulf are
      // declared as regions rather than as countries we cannot substantiate.
      areaServed: [
        { "@type": "Place", name: "Europe" },
        { "@type": "Place", name: "Gulf and Middle East" },
        { "@type": "Country", name: "India" },
      ],
      knowsLanguage: ["en", "hi", "gu"],
    },
  };

  return (
    <div className="min-h-screen">
      <SEO jsonLd={homeJsonLd} />
      <Header />
      <HeroCarousel />
      <ServicesGrid />
      <IndustrialCapabilities />
      <GlobalReach />
      <AboutSummary />
      <ProjectsGallery />
      <ProcessSection />
      <CustomerReviews />
      <AdminAccess />
      <Footer />
    </div>
  );
};

export default Index;
