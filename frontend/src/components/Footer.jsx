import { FaPhone, FaEnvelope, FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { GiftIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const contactInfo = {
    email: "anikakitstore@gmail.com",
    phone: "+91-8708258249",
    whatsapp: "+91-8708258249",
  };

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Background with gradient - more saturated warm tones */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-50"></div>
      
      {/* Decorative elements for visual separation */}
      <div className="absolute top-0 left-0 right-0">
        <div className="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"></div>
        <div className="h-px bg-gradient-to-r from-primary-300 via-secondary-300 to-accent-300"></div>
      </div>
      
      {/* Content container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 mt-2">
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Store Info - Centered */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full shadow-medium">
                <GiftIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Anika Kit Store</h3>
                <p className="text-gray-600 text-xs font-medium">Quality products for every need</p>
              </div>
            </div>
          </div>

          {/* Store Hours & Contact - Side by Side */}
          <div className="flex space-x-6 mb-6">
            {/* Store Hours - Left Side */}
            <div className="flex-1">
              <div className="space-y-1 text-xs text-gray-700 text-left">
                <p className="font-bold text-primary-700 mb-2 text-sm">Store Hours</p>
                <p className="font-medium">Mon - Sat: 9:30 AM - 8:00 PM</p>
                <p className="font-medium">Sunday: 9:30 AM - 5:00 PM</p>
              </div>
            </div>

            {/* Contact Info - Right Side */}
            <div className="flex-1">
              <h4 className="text-gray-800 font-bold text-left text-base mb-3">Contact Us</h4>
              
              <div className="space-y-2">
                {/* Email */}
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-soft">
                    <FaEnvelope className="text-white text-xs" />
                  </div>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-700 hover:text-primary-600 transition-colors text-xs break-all font-medium"
                  >
                    {contactInfo.email}
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-soft">
                    <FaPhone className="text-white text-xs" />
                  </div>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-gray-700 hover:text-secondary-600 transition-colors text-xs font-medium"
                  >
                    {contactInfo.phone}
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-soft">
                    <FaWhatsapp className="text-white text-xs" />
                  </div>
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-green-600 transition-colors text-xs font-medium"
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
              <MapPinIcon className="h-4 w-4 text-primary-500" />
              <h4 className="text-gray-800 font-bold text-base">Visit Our Store</h4>
            </div>
            
            {/* Compact Map */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-1 shadow-soft">
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
              <span className="text-gray-800 font-bold text-xs">Follow:</span>
              <a
                href="#"
                className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-soft"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-white text-xs" />
              </a>
              <a
                href="#"
                className="w-7 h-7 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-soft"
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
              <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full shadow-medium">
                <GiftIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Anika Kit Store</h3>
                <p className="text-gray-600 text-xs lg:text-sm font-medium">Quality products for every need</p>
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="space-y-1 text-xs lg:text-sm text-gray-700">
              <p className="font-bold text-primary-700 mb-2 text-sm lg:text-base">Store Hours</p>
              <p className="font-medium">Mon - Sat: 9:30 AM - 8:00 PM</p>
              <p className="font-medium">Sunday: 9:30 AM - 5:00 PM</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-gray-800 font-bold text-center md:text-left text-base lg:text-lg">Contact Us</h4>
            
            {/* Email */}
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center shadow-soft">
                <FaEnvelope className="text-white text-xs" />
              </div>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-gray-700 hover:text-primary-600 transition-colors text-xs lg:text-sm break-all font-medium"
              >
                {contactInfo.email}
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center shadow-soft">
                <FaPhone className="text-white text-xs" />
              </div>
              <a
                href={`tel:${contactInfo.phone}`}
                className="text-gray-700 hover:text-secondary-600 transition-colors text-xs lg:text-sm font-medium"
              >
                {contactInfo.phone}
              </a>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-soft">
                <FaWhatsapp className="text-white text-xs" />
              </div>
              <a
                href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-green-600 transition-colors text-xs lg:text-sm font-medium"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Location & Social */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <MapPinIcon className="h-4 w-4 lg:h-5 lg:w-5 text-primary-500" />
              <h4 className="text-gray-800 font-bold text-base lg:text-lg">Visit Our Store</h4>
            </div>
            
            {/* Compact Map */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-1 shadow-soft">
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
              <span className="text-gray-800 font-bold text-xs lg:text-sm">Follow:</span>
              <a
                href="https://www.facebook.com/anikakitstore23/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 lg:w-8 lg:h-8 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-soft"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-white text-xs" />
              </a>
              <a
                href="https://www.instagram.com/anikakitstore14/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-soft"
                aria-label="Instagram"
              >
                <FaInstagram className="text-white text-xs" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative bg-gradient-to-r from-orange-200/60 via-amber-100/60 to-orange-100/60 border-t-2 border-primary-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 text-xs lg:text-sm text-gray-800">
            <div className="flex items-center space-x-2">
              <GiftIcon className="h-3 w-3 lg:h-4 lg:w-4 text-primary-600" />
              <span className="font-semibold">© 2025 Anika Kit Store. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-3 text-xs font-semibold">
              <span>Bringing joy to families</span>
              <span className="hidden sm:inline text-primary-500">•</span>
              <span>Quality products, happy customers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
