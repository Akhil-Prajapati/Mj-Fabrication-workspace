import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Award, Factory, CheckCircle2, Globe2, Target, ShieldCheck, Truck, PencilRuler } from "lucide-react";
import MachineryInfrastructure from "@/components/home/MachineryInfrastructure";
import SEO from "@/components/SEO";
import { SparklesCore, WobbleCard, CardContainer, CardBody, CardItem } from "@/components/ui/aceternity";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About Us | MJ Fabrication - 20+ Years Custom Metal Manufacturing & Fabrication"
        description="MJ Fabrication provides fabrication and customized metal manufacturing solutions tailored to customer requirements. Working with customer drawings, technical specifications, and genuine Jindal Steel materials."
        canonicalUrl="https://mjfabrication.in/about"
      />
      <Header />

      {/* Hero Section with SparklesCore */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white py-24 relative overflow-hidden">
        <div className="w-full absolute inset-0 h-full pointer-events-none">
          <SparklesCore
            id="tsparticlesabout"
            background="transparent"
            minSize={0.6}
            maxSize={2.0}
            particleDensity={40}
            className="w-full h-full"
            particleColor="#60a5fa"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold mb-6 tracking-wide uppercase">
            <Award className="w-4 h-4 text-blue-400" />
            20+ Years of Manufacturing Excellence (Est. 2003)
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            About MJ Fabrication
          </h1>
          <p className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            MJ Fabrication provides fabrication and customized metal manufacturing solutions tailored to customer requirements. We work with customer drawings, technical specifications, and project needs to deliver practical and reliable fabrication solutions.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                Company Background
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Two Decades of Reliable Metal Manufacturing &amp; Fabrication Solutions
              </h2>
              <p className="text-base text-slate-700 mb-5 leading-relaxed font-semibold">
                MJ Fabrication provides fabrication and customized metal manufacturing solutions tailored to customer requirements. We work with customer drawings, technical specifications, and project needs to deliver practical and reliable fabrication solutions.
              </p>
              <p className="text-sm sm:text-base text-slate-600 mb-5 leading-relaxed">
                Operating from our equipped fabrication facility in Naroda, Ahmedabad, Gujarat, we support equipment manufacturers, engineering firms, and EPC contractors. Our manufacturing capabilities include a high-capacity 12kW CNC fiber laser cutting system, 250-ton multi-axis CNC press brake bending, heavy crane bays, and certified structural welding.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We work with genuine Jindal Steel raw materials (plates, pipes, seamless tubes, and structural sections) with traceable mill test reports. From initial drawing review to scheduled dispatches across India and international markets, our team is dedicated to practical engineering and reliable delivery.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-950 group">
              <img
                src="/video/factory.webp"
                alt="MJ Fabrication Plant Floor - Naroda Facility"
                className="w-full h-[440px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              
              <div className="absolute top-4 right-4">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-emerald-400 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Plant Operations
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 text-white flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-blue-400 mb-1 uppercase tracking-wider">
                    Equipped Manufacturing Facility • Naroda, Gujarat
                  </div>
                  <div className="text-base sm:text-lg font-bold">Heavy Bay Assembly &amp; Certified Welding</div>
                </div>
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-blue-400/40 hidden sm:block shadow-lg shrink-0">
                  <img src="/video/welder.webp" alt="Welding Operations" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machinery Infrastructure Component */}
      <MachineryInfrastructure />

      {/* Operational Pillars */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Our Core Operational Pillars
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              Standards that ensure consistent quality across every batch and assembly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <WobbleCard
              containerClassName="bg-slate-900 border border-slate-800"
              className="p-8"
            >
              <div className="w-14 h-14 bg-blue-500/20 border border-blue-400/30 rounded-2xl flex items-center justify-center mb-6 text-blue-400">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Drawing-to-Part Accuracy
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Manufacturing based directly on customer 2D drawings, 3D CAD models, and technical specifications, ensuring precision fitment.
              </p>
            </WobbleCard>

            <WobbleCard
              containerClassName="bg-slate-900 border border-slate-800"
              className="p-8"
            >
              <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl flex items-center justify-center mb-6 text-emerald-400">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Genuine Jindal Steel
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                We work with genuine Jindal Steel plates, pipes, and structural sections with full heat-number mill test traceability.
              </p>
            </WobbleCard>

            <WobbleCard
              containerClassName="bg-slate-900 border border-slate-800"
              className="p-8"
            >
              <div className="w-14 h-14 bg-purple-500/20 border border-purple-400/30 rounded-2xl flex items-center justify-center mb-6 text-purple-400">
                <Globe2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Timely Delivery &amp; Logistics
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                A commitment to reliable workmanship, competitive pricing, and timely project completion across domestic and export markets.
              </p>
            </WobbleCard>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
