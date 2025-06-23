
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">MJ</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">MJ Fabrication</h3>
                <p className="text-gray-300">Quality Fabrication Solutions</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Leading fabrication company specializing in shades, door frames, window frames, 
              staircases, and custom fabrication work. Quality craftsmanship with modern technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Fabrication Shades</li>
              <li>Door Frames</li>
              <li>Window Frames</li>
              <li>Staircase Fabrication</li>
              <li>Custom Fabrication</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 MJ Fabrication. All rights reserved. | GST Registered Company
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
