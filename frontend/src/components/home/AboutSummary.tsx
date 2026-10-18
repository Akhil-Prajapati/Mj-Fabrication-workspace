import { Award, ShieldCheck, Factory, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect";
import { CardContainer, CardBody, CardItem } from "@/components/ui/aceternity/3d-card";

const AboutSummary = () => {
  const stats = [
    { number: "20+", label: "Years Industrial Experience", sub: "Established in 2003" },
    { number: "1,500+", label: "Projects Completed", sub: "OEM & Industrial Clients" },
    { number: "100%", label: "Genuine Jindal Steel", sub: "Traceable Prime Material" },
    { number: "Drawing-to-Part", label: "Custom Manufacturing", sub: "Strict Technical Compliance" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-4 tracking-wide uppercase">
            <Award className="w-4 h-4 text-blue-600" />
            20+ Years of Manufacturing Excellence • Est. 2003
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Fabrication &amp; Customized Metal Solutions
          </h2>
          
          <div className="max-w-4xl mx-auto mb-6">
            <TextGenerateEffect
              words="MJ Fabrication provides fabrication and customized metal manufacturing solutions tailored to customer requirements. We work with customer drawings, technical specifications, and project needs to deliver practical and reliable fabrication solutions."
              className="text-lg md:text-xl text-slate-800 font-semibold leading-relaxed"
              duration={0.4}
            />
          </div>

          <p className="text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Operating from our equipped fabrication facility in Naroda, Ahmedabad, Gujarat, we support equipment manufacturers, OEMs, engineering firms, and industrial projects with precision workmanship, raw material supply, and dependable on-time delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <CardContainer key={index} className="w-full">
              <CardBody className="bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 p-6 w-full h-auto flex flex-col justify-center text-center">
                <CardItem
                  translateZ={30}
                  className="w-full text-center text-3xl sm:text-4xl font-black text-blue-600 mb-2 tracking-tight"
                >
                  {stat.number}
                </CardItem>
                <CardItem
                  translateZ={20}
                  className="w-full text-center text-sm sm:text-base font-bold text-slate-800 mb-1"
                >
                  {stat.label}
                </CardItem>
                <CardItem
                  translateZ={15}
                  className="w-full text-center text-xs text-slate-500 font-medium"
                >
                  {stat.sub}
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSummary;

