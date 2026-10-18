import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Factory, Mail, Phone, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 rounded-xl flex items-center justify-center border border-blue-400/30 shadow-md">
                <span className="text-white font-black text-xl">MJ</span>
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight">MJ Fabrication</h3>
                <p className="text-xs font-semibold text-blue-400 tracking-wider uppercase">20+ Years Experience • Est. 2003</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
              MJ Fabrication provides fabrication and customized metal manufacturing solutions tailored to customer requirements. Working strictly from customer drawings and genuine Jindal Steel materials.
            </p>
            <div className="text-xs font-mono text-slate-400">
              GSTIN: <span className="text-slate-200 font-bold">24AFZPP4386C1ZY</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/" className="text-slate-400 hover:text-blue-400 transition-colors">Home Page</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-blue-400 transition-colors">Services &amp; Capabilities</Link></li>
              <li><Link to="/gallery" className="text-slate-400 hover:text-blue-400 transition-colors">Projects &amp; Supply Portfolio</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-blue-400 transition-colors">Submit RFQ &amp; Drawings</Link></li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Our Services</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>Industrial Fabrication (Structures &amp; Skids)</li>
              <li>Sheet Metal Fabrication (Enclosures &amp; Frames)</li>
              <li>Raw Material Supply (Jindal Steel Pipes &amp; Plates)</li>
              <li>Custom Manufacturing (CAD Drawings to Part)</li>
              <li>Quality &amp; Timely Delivery</li>
              <li>12kW CNC Laser &amp; 250T Press Brake</li>
            </ul>
          </div>

          {/* Direct Inquiries & RFQ Desk */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Inquiries &amp; RFQ Desk</h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <a
                href="https://wa.me/919712929748?text=Hello%20MJ%20Fabrication,%20I%20have%20an%20RFQ%20and%20drawings."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors p-2.5 rounded-xl bg-slate-900 border border-slate-800"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <div className="flex-1">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">WhatsApp RFQ</div>
                  <div className="font-bold text-white text-xs">+91 97129 29748</div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href="mailto:mjfabworld62@gmail.com?subject=Technical%20RFQ%20%26%20CAD%20Drawing%20Submission"
                className="flex items-center gap-2.5 text-blue-400 hover:text-blue-300 transition-colors p-2.5 rounded-xl bg-slate-900 border border-slate-800"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <div className="flex-1">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Email CAD Drawings</div>
                  <div className="font-bold text-white text-xs break-all">mjfabworld62@gmail.com</div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <div className="text-slate-400 text-xs pt-1 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>31, Maheshwari Park Society, Nava Naroda, Ahmedabad, Gujarat 382330</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2025 MJ Fabrication. All rights reserved. | 20+ Years Manufacturing Excellence</p>
          <p className="font-mono">Equipped Fabrication Facility in Naroda, Gujarat, India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
