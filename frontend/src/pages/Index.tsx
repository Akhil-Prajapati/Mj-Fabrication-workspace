
import HeroCarousel from '@/components/home/HeroCarousel';
import ServicesGrid from '@/components/home/ServicesGrid';
import AboutSummary from '@/components/home/AboutSummary';
import ProjectsGallery from '@/components/home/ProjectsGallery';
import ProcessSection from '@/components/home/ProcessSection';
import CustomerReviews from '@/components/home/CustomerReviews';
import AdminAccess from '@/components/home/AdminAccess';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
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
