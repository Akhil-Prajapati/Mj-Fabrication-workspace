
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocationSection from '@/components/LocationSection';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import WhyChooseUs from '@/components/contact/WhyChooseUs';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
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
