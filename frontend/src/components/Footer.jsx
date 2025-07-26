import { FaPhone, FaEnvelope, FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const contactInfo = {
    email: "anikakitstore@gmail.com",
    phone: "+91-8708258249",
    whatsapp: "+91-8708258249",
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Side - Map */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Visit Our Store</h3>
            <div className="w-full h-64 lg:h-72 rounded-lg overflow-hidden shadow-lg">
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
            <p className="text-gray-300 text-sm">
              Anika Kit Store - Your trusted destination for quality products
            </p>
          </div>

          {/* Right Side - Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Get In Touch</h3>

            {/* Email */}
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                <FaEnvelope className="text-white text-base" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email us at</p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-white hover:text-blue-400 transition-colors font-medium"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center group-hover:bg-green-700 transition-colors">
                <FaPhone className="text-white text-base" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Call us</p>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-white hover:text-green-400 transition-colors font-medium"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors">
                <FaWhatsapp className="text-white text-base" />
              </div>
              <div>
                <p className="text-sm text-gray-400">WhatsApp us</p>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-400 transition-colors font-medium"
                >
                  {contactInfo.whatsapp}
                </a>
              </div>
            </div>

            {/* Business Hours & Follow Us - in flex */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-6 pt-4 border-t border-gray-700 pt-6">
              {/* Business Hours */}
              <div>
                <h4 className="text-lg font-medium mb-2">Business Hours</h4>
                <div className="space-y-1 text-gray-300 text-sm">
                  <p>Mon - Sat: 9:30 AM - 8:00 PM</p>
                  <p>Sunday: 9:30 AM - 5:00 PM</p>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-medium mb-2">Follow Us</h4>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="text-white text-sm" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-white text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Anika Kit Store. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
