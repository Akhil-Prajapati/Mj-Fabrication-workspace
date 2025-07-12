import HeroCarousel from "@/components/home/HeroCarousel";
import ServicesGrid from "@/components/home/ServicesGrid";
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
    name: "MJ Fabrication - MS Fabrication Work Naroda Ahmedabad Gujarat",
    description:
      "Leading MS fabrication company in Naroda, Ahmedabad, Gujarat. Expert in doors, windows, shades, railings, staircases. 15+ years experience. GST registered.",
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
    },
  };

  return (
    <div className="min-h-screen">
      <SEO jsonLd={homeJsonLd} />
      <Header />
      <HeroCarousel />
      <ServicesGrid />
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
