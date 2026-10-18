import HeroCarousel from "@/components/home/HeroCarousel";
import ServicesGrid from "@/components/home/ServicesGrid";
import MachineryInfrastructure from "@/components/home/MachineryInfrastructure";
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
    name: "MJ Fabrication - Fabrication & Customized Metal Manufacturing Solutions",
    description:
      "MJ Fabrication provides fabrication and customized metal manufacturing solutions tailored to customer requirements. Industrial fabrication, sheet metal fabrication, raw material supply, custom manufacturing, and timely delivery.",
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
      <MachineryInfrastructure />
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
