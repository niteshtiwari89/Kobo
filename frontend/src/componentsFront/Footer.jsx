import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#FFD51980] py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:mt-10 lg:ml-7">
          {/* Logo Section */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mb-4 lg:mb-0">
            <Link to="/home">
              <img
                src="logo1.png"
                alt="Logo"
                className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto cursor-pointer"
              />
            </Link>
          </div>
          
          {/* Footer Links */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center lg:text-left">
            <div>
              <h4 className="font-bold mb-3 text-base sm:text-lg md:text-xl">About us</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li><Link to="/about" className="hover:underline">About us</Link></li>
                <li><Link to="/creators" className="hover:underline">Creators</Link></li>
                <li><Link to="/philosophy" className="hover:underline">Philosophy</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 text-base sm:text-lg md:text-xl">Company</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li><Link to="/team" className="hover:underline">Our team</Link></li>
                <li><Link to="/terms" className="hover:underline">Terms</Link></li>
                <li><Link to="/how-it-works" className="hover:underline">How it works</Link></li>
                <li><Link to="/blog" className="hover:underline">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 text-base sm:text-lg md:text-xl">Services</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li><Link to="/services/pickup" className="hover:underline">Pickup</Link></li>
                <li><Link to="/services/drop-off" className="hover:underline">Drop off</Link></li>
                <li><Link to="/services/laundry" className="hover:underline">Laundry</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 text-base sm:text-lg md:text-xl">Check us out</h4>
              <div className="flex justify-center lg:justify-start space-x-4">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-700"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-700"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-700"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;