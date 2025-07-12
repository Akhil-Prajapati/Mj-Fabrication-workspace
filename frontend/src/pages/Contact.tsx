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
    name: "Contact MJ Fabrication",
    description:
      "Contact MJ Fabrication for MS fabrication work in Naroda, Ahmedabad, Gujarat. Free consultation and quotes for doors, windows, shades, and custom fabrication.",
    url: "https://mjfabrication.in/contact",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "MJ Fabrication",
      telephone: "+91-XXXXXXXXXX",
      email: "info@mjfabrication.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Nava Naroda",
        addressLocality: "Naroda",
        addressRegion: "Gujarat",
        postalCode: "382330",
        addressCountry: "IN",
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Contact MJ Fabrication Naroda Ahmedabad | MS Fabrication Work Gujarat | Free Quote"
        description="Contact MJ Fabrication for professional MS fabrication work in Naroda, Ahmedabad, Gujarat. Free consultation, instant quotes for doors, windows, shades. Located in Nava Naroda. Call now!"
        keywords="contact MJ Fabrication, MS fabrication quote Ahmedabad, fabrication work consultation Naroda, metal fabrication contact Gujarat, door window quote Nikol, shade installation contact Ahmedabad"
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
