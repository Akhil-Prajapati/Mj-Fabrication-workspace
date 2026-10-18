import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationSection from "@/components/LocationSection";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import WhyChooseUs from "@/components/contact/WhyChooseUs";
import SEO from "@/components/SEO";

const Contact = () => {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact MJ Fabrication - Custom Metal Manufacturing & Fabrication",
    description:
      "Contact MJ Fabrication for industrial fabrication, customized sheet metal, raw material supply, and custom manufacturing from customer drawings in Naroda, Ahmedabad, Gujarat.",
    url: "https://mjfabrication.in/contact",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "MJ Fabrication",
      telephone: "+91-9712929748",
      email: "mjfabworld62@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "31, Maheshwari Park Society, Amarpark RCC Rd, Nava Naroda",
        addressLocality: "Naroda, Ahmedabad",
        addressRegion: "Gujarat",
        postalCode: "382330",
        addressCountry: "IN",
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Contact Us | Technical RFQ & Drawing Submission | MJ Fabrication"
        description="Contact MJ Fabrication for industrial fabrication, custom sheet metal manufacturing, raw material supply, and CNC laser cutting in Naroda, Ahmedabad, Gujarat. Submit your technical drawings for rapid RFQ."
        keywords="contact MJ Fabrication, metal fabrication RFQ Ahmedabad, industrial fabrication Gujarat, sheet metal enclosure manufacturer, raw material supply Jindal Steel, custom manufacturing drawings"
        canonicalUrl="https://mjfabrication.in/contact"
        jsonLd={contactJsonLd}
      />
      <Header />

      <ContactHero />

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <LocationSection />

      <WhyChooseUs />

      <Footer />
    </div>
  );
};

export default Contact;
