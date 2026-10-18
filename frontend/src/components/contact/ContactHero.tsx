import { ShieldCheck, MapPin, Clock, FileCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aceternity";

const ContactHero = () => {
  return (
    <section className="relative overflow-hidden">
      <AuroraBackground className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold mb-6 tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              Enterprise RFQ &amp; Technical Inquiry Desk
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white">
              Contact MJ Fabrication
            </h1>

            <p className="text-base md:text-xl text-slate-300 max-w-4xl mx-auto mb-8 leading-relaxed font-normal">
              MJ Fabrication provides fabrication and customized metal manufacturing solutions tailored to customer requirements. We work with customer drawings, technical specifications, and project needs to deliver practical and reliable fabrication solutions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Plant: Nava Naroda, Ahmedabad, Gujarat</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Response Within 24 Hours</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
                <FileCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>CAD Drawing Confidentiality (NDA)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
                <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Domestic &amp; Export Dispatch</span>
              </div>
            </div>
          </motion.div>
        </div>
      </AuroraBackground>
    </section>
  );
};

export default ContactHero;
