import { FaPhone, FaEnvelope, FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { GiftIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const contactInfo = {
    email: "anikakitstore@gmail.com",
    phone: "+91-8708258249",
    whatsapp: "+91-8708258249",
  };

  const chip =
    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-soft transition-colors duration-200 ease-out-quart";

  return (
    <footer className="mt-20 bg-cream-100 border-t border-cream-200 pb-mobile-nav">
      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Store Info - Centered */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <div className="p-2 bg-brand-700 rounded-full shadow-soft">
                <GiftIcon className="h-5 w-5 text-cream-50" />
              </div>
              <div className="text-left">
                <h3 className="font-display text-xl text-brand-800">Anika Kit Store</h3>
                <p className="text-stone-500 text-xs">Quality products for every need</p>
              </div>
            </div>
          </div>

          {/* Store Hours & Contact - Side by Side */}
          <div className="flex space-x-6 mb-6">
            {/* Store Hours - Left Side */}
            <div className="flex-1">
              <p className="eyebrow text-brand-700 mb-2">Store Hours</p>
              <div className="space-y-1 text-xs text-stone-700 text-left">
                <p>Mon - Sat: 9:30 AM - 8:00 PM</p>
                <p>Sunday: 9:30 AM - 5:00 PM</p>
              </div>
            </div>

            {/* Contact Info - Right Side */}
            <div className="flex-1">
              <p className="eyebrow text-brand-700 mb-3">Contact Us</p>

              <div className="space-y-2">
                {/* Email */}
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 ${chip} bg-brand-700 text-cream-50`}>
                    <FaEnvelope className="text-xs" />
                  </div>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-stone-700 hover:text-brand-700 transition-colors text-xs break-all"
                  >
                    {contactInfo.email}
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 ${chip} bg-brand-700 text-cream-50`}>
                    <FaPhone className="text-xs" />
                  </div>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-stone-700 hover:text-brand-700 transition-colors text-xs"
                  >
                    {contactInfo.phone}
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 ${chip} bg-green-600 text-cream-50`}>
                    <FaWhatsapp className="text-xs" />
                  </div>
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-700 hover:text-green-700 transition-colors text-xs"
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
              <MapPinIcon className="h-4 w-4 text-brand-700" />
              <p className="eyebrow text-brand-700">Visit Our Store</p>
            </div>

            <div className="bg-cream-50 rounded-lg p-1 shadow-soft border border-cream-200">
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
              <span className="eyebrow text-stone-500">Follow</span>
              <a
                href="https://www.facebook.com/anikakitstore23/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-7 h-7 ${chip} bg-brand-700 text-cream-50 hover:bg-brand-800 active:scale-[0.98]`}
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xs" />
              </a>
              <a
                href="https://www.instagram.com/anikakitstore14/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-7 h-7 ${chip} bg-brand-700 text-cream-50 hover:bg-brand-800 active:scale-[0.98]`}
                aria-label="Instagram"
              >
                <FaInstagram className="text-xs" />
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Store Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="p-2 bg-brand-700 rounded-full shadow-soft">
                <GiftIcon className="h-5 w-5 text-cream-50" />
              </div>
              <div className="text-left">
                <h3 className="font-display text-xl lg:text-2xl text-brand-800">Anika Kit Store</h3>
                <p className="text-stone-500 text-xs lg:text-sm">Quality products for every need</p>
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <p className="eyebrow text-brand-700 mb-2">Store Hours</p>
              <div className="space-y-1 text-xs lg:text-sm text-stone-700">
                <p>Mon - Sat: 9:30 AM - 8:00 PM</p>
                <p>Sunday: 9:30 AM - 5:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <p className="eyebrow text-brand-700 text-center md:text-left">Contact Us</p>

            {/* Email */}
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className={`${chip} bg-brand-700 text-cream-50`}>
                <FaEnvelope className="text-xs" />
              </div>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-stone-700 hover:text-brand-700 transition-colors text-xs lg:text-sm break-all"
              >
                {contactInfo.email}
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className={`${chip} bg-brand-700 text-cream-50`}>
                <FaPhone className="text-xs" />
              </div>
              <a
                href={`tel:${contactInfo.phone}`}
                className="text-stone-700 hover:text-brand-700 transition-colors text-xs lg:text-sm"
              >
                {contactInfo.phone}
              </a>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className={`${chip} bg-green-600 text-cream-50`}>
                <FaWhatsapp className="text-xs" />
              </div>
              <a
                href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-700 hover:text-green-700 transition-colors text-xs lg:text-sm"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Location & Social */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <MapPinIcon className="h-4 w-4 lg:h-5 lg:w-5 text-brand-700" />
              <p className="eyebrow text-brand-700">Visit Our Store</p>
            </div>

            <div className="bg-cream-50 rounded-lg p-1 shadow-soft border border-cream-200">
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
              <span className="eyebrow text-stone-500">Follow</span>
              <a
                href="https://www.facebook.com/anikakitstore23/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-7 h-7 lg:w-8 lg:h-8 ${chip} bg-brand-700 text-cream-50 hover:bg-brand-800 active:scale-[0.98]`}
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xs" />
              </a>
              <a
                href="https://www.instagram.com/anikakitstore14/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-7 h-7 lg:w-8 lg:h-8 ${chip} bg-brand-700 text-cream-50 hover:bg-brand-800 active:scale-[0.98]`}
                aria-label="Instagram"
              >
                <FaInstagram className="text-xs" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 text-xs lg:text-sm text-stone-600">
            <div className="flex items-center space-x-2">
              <GiftIcon className="h-3 w-3 lg:h-4 lg:w-4 text-brand-700" />
              <span>© 2025 Anika Kit Store. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-3 text-stone-500">
              <span>Bringing joy to families</span>
              <span className="hidden sm:inline text-cream-300">•</span>
              <span>Quality products, happy customers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
