import { FaPhone, FaEnvelope, FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { GiftIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const contactInfo = {
    email: "anikakitstore@gmail.com",
    phone: "+91-8708258249",
    whatsapp: "+91-8708258249",
  };

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Store Info - Centered */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full">
                <GiftIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Anika Kit Store</h3>
                <p className="text-gray-400 text-xs">Quality products for every need</p>
              </div>
            </div>
          </div>

          {/* Store Hours & Contact - Side by Side */}
          <div className="flex space-x-6 mb-6">
            {/* Store Hours - Left Side */}
            <div className="flex-1">
              <div className="space-y-1 text-xs text-gray-300 text-left">
                <p className="font-semibold text-white mb-2 text-sm">Store Hours</p>
                <p>Mon - Sat: 9:30 AM - 8:00 PM</p>
                <p>Sunday: 9:30 AM - 5:00 PM</p>
              </div>
            </div>

            {/* Contact Info - Right Side */}
            <div className="flex-1">
              <h4 className="text-white font-semibold text-left text-base mb-3">Contact Us</h4>
              
              <div className="space-y-2">
                {/* Email */}
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-white text-xs" />
                  </div>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-300 hover:text-white transition-colors text-xs break-all"
                  >
                    {contactInfo.email}
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-white text-xs" />
                  </div>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-gray-300 hover:text-white transition-colors text-xs"
                  >
                    {contactInfo.phone}
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp className="text-white text-xs" />
                  </div>
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors text-xs"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map & Social - Bottom */}
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <MapPinIcon className="h-4 w-4 text-primary-400" />
              <h4 className="text-white font-semibold text-base">Visit Our Store</h4>
            </div>
            
            {/* Compact Map */}
            <div className="bg-white/10 rounded-lg p-1">
              <div className="w-full h-28 rounded-md overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d307.9834916906168!2d75.72572547017694!3d29.151837810968452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3912339098e4ca3b%3A0xb017c269502c9bd6!2sAnika%20Kit%20Store!5e0!3m2!1sen!2sin!4v1753513505837!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Anika Kit Store Location"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center space-x-3">
              <span className="text-white font-medium text-xs">Follow:</span>
              <a
                href="#"
                className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-white text-xs" />
              </a>
              <a
                href="#"
                className="w-7 h-7 bg-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <FaInstagram className="text-white text-xs" />
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Store Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full">
                <GiftIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-white">Anika Kit Store</h3>
                <p className="text-gray-400 text-xs lg:text-sm">Quality products for every need</p>
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="space-y-1 text-xs lg:text-sm text-gray-300">
              <p className="font-semibold text-white mb-2 text-sm lg:text-base">Store Hours</p>
              <p>Mon - Sat: 9:30 AM - 8:00 PM</p>
              <p>Sunday: 9:30 AM - 5:00 PM</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-center md:text-left text-base lg:text-lg">Contact Us</h4>
            
            {/* Email */}
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <FaEnvelope className="text-white text-xs" />
              </div>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-gray-300 hover:text-white transition-colors text-xs lg:text-sm break-all"
              >
                {contactInfo.email}
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <FaPhone className="text-white text-xs" />
              </div>
              <a
                href={`tel:${contactInfo.phone}`}
                className="text-gray-300 hover:text-white transition-colors text-xs lg:text-sm"
              >
                {contactInfo.phone}
              </a>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <FaWhatsapp className="text-white text-xs" />
              </div>
              <a
                href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors text-xs lg:text-sm"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Location & Social */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <MapPinIcon className="h-4 w-4 lg:h-5 lg:w-5 text-primary-400" />
              <h4 className="text-white font-semibold text-base lg:text-lg">Visit Our Store</h4>
            </div>
            
            {/* Compact Map */}
            <div className="bg-white/10 rounded-lg p-1">
              <div className="w-full h-28 lg:h-36 rounded-md overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d307.9834916906168!2d75.72572547017694!3d29.151837810968452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3912339098e4ca3b%3A0xb017c269502c9bd6!2sAnika%20Kit%20Store!5e0!3m2!1sen!2sin!4v1753513505837!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Anika Kit Store Location"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <span className="text-white font-medium text-xs lg:text-sm">Follow:</span>
              <a
                href="#"
                className="w-7 h-7 lg:w-8 lg:h-8 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-white text-xs" />
              </a>
              <a
                href="#"
                className="w-7 h-7 lg:w-8 lg:h-8 bg-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <FaInstagram className="text-white text-xs" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/30 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 text-xs lg:text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <GiftIcon className="h-3 w-3 lg:h-4 lg:w-4 text-primary-400" />
              <span>© 2025 Anika Kit Store. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span>Bringing joy to families</span>
              <span className="hidden sm:inline">•</span>
              <span>Quality products, happy customers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
