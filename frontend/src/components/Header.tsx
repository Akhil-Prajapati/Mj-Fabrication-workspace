import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3.5">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 rounded-xl flex items-center justify-center shadow-md shadow-blue-900/20 border border-blue-500/20">
              <span className="text-white font-black text-xl tracking-wider">MJ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-blue-700 bg-clip-text text-transparent tracking-tight">
                  MJ Fabrication
                </h1>
                <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 uppercase tracking-widest">
                  Est. 2003
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 tracking-wide">
                20+ Years Experience • Fabrication &amp; Customized Metal Solutions
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-2 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive(item.path)
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-slate-700 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2.5">
              <a
                href="https://wa.me/919712929748?text=Hello%20MJ%20Fabrication,%20I%20have%20an%20RFQ%20and%20drawings."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                title="WhatsApp Quick RFQ"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:mjfabworld62@gmail.com?subject=Technical%20RFQ%20Inquiry%20-%20MJ%20Fabrication"
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                title="Email CAD Drawings"
              >
                <Mail className="w-4 h-4" />
              </a>
              <Button
                asChild
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-600/20 rounded-xl"
              >
                <Link to="/contact">Submit RFQ</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3 space-y-3">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Direct RFQ Buttons */}
            <div className="pt-2 border-t border-slate-100 space-y-2 px-1">
              <a
                href="https://wa.me/919712929748?text=Hello%20MJ%20Fabrication,%20I%20have%20an%20RFQ%20to%20share."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +91 97129 29748</span>
              </a>
              <a
                href="mailto:mjfabworld62@gmail.com?subject=Technical%20RFQ%20%26%20Drawings"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Email: mjfabworld62@gmail.com</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
