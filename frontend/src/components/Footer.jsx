import { FaPhone, FaEnvelope, FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { GiftIcon, SparklesIcon, HeartIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const contactInfo = {
    email: "anikakitstore@gmail.com",
    phone: "+91-8708258249",
    whatsapp: "+91-8708258249",
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Main Footer */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary-500 rounded-full blur-xl"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-secondary-500 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-accent-500 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full">
                  <GiftIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Anika Kit Store
                  </h2>
                  <p className="text-primary-300 text-sm">Your trusted shopping destination</p>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-base max-w-2xl mx-auto">
              Discover amazing products from kids gifts and toys to storage solutions, 
              hair accessories, and seasonal items - all in one place!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Store Location */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-500/20 rounded-lg">
                  <MapPinIcon className="h-5 w-5 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Visit Our Store</h3>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-1 border border-white/10">
                <div className="w-full h-48 lg:h-56 rounded-xl overflow-hidden shadow-lg">
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
              
              <div className="flex items-center space-x-2 text-gray-300">
                <SparklesIcon className="h-4 w-4 text-primary-400" />
                <p className="text-sm">
                  Come visit us for an amazing in-store shopping experience!
                </p>
              </div>
            </div>

            {/* Right Side - Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary-500/20 rounded-lg">
                  <HeartIcon className="h-5 w-5 text-secondary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Get In Touch</h3>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <div className="group flex items-center space-x-4 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaEnvelope className="text-white text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-1">Email us at</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-white hover:text-primary-400 transition-colors font-medium text-sm break-all"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="group flex items-center space-x-4 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaPhone className="text-white text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-1">Call us</p>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-white hover:text-green-400 transition-colors font-medium text-sm"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="group flex items-center space-x-4 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaWhatsapp className="text-white text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-1">WhatsApp us</p>
                    <a
                      href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-green-400 transition-colors font-medium text-sm"
                    >
                      {contactInfo.whatsapp}
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours & Social */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Business Hours */}
                <div className="space-y-2">
                  <h4 className="text-base font-semibold text-white flex items-center">
                    <SparklesIcon className="h-4 w-4 mr-2 text-primary-400" />
                    Store Hours
                  </h4>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div className="flex justify-between">
                      <span>Mon - Sat:</span>
                      <span className="text-primary-300">9:30 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="text-primary-300">9:30 AM - 5:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-2">
                  <h4 className="text-base font-semibold text-white flex items-center">
                    <HeartIcon className="h-4 w-4 mr-2 text-secondary-400" />
                    Follow Us
                  </h4>
                  <div className="flex space-x-3">
                    <a
                      href="#"
                      className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                      aria-label="Facebook"
                    >
                      <FaFacebookF className="text-white text-xs" />
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-pink-500/25"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="text-white text-xs" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/70 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2 text-gray-200 text-sm">
              <GiftIcon className="h-4 w-4 text-primary-400" />
              <span>© 2025 Anika Kit Store. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-3 text-xs text-gray-300">
              <span className="flex items-center space-x-1">
                <SparklesIcon className="h-3 w-3 text-primary-400" />
                <span>Bringing joy to families</span>
              </span>
              <span className="hidden sm:inline text-gray-500">•</span>
              <span className="flex items-center space-x-1">
                <HeartIcon className="h-3 w-3 text-secondary-400" />
                <span>Quality products, happy customers</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
