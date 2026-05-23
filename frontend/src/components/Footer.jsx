import { FaPhone, FaEnvelope, FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { MapPinIcon } from '@heroicons/react/24/outline';
import Typography from './ui/Typography';

const Footer = () => {
  const contactInfo = {
    email: "anikakitstore@gmail.com",
    phone: "+91-8708258249",
    whatsapp: "+91-8708258249",
  };

  return (
    <footer className="mt-20 border-t border-neutral-200/50 bg-surface-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Typography variant="h2" color="primary">Anika Kit Store</Typography>
            <Typography variant="body" color="secondary">
              Quality products, kids gifts, kitchen essentials, and organizers for every family.
            </Typography>
            <div className="pt-2 space-y-1">
              <Typography variant="label">Store Hours</Typography>
              <Typography variant="body-sm" color="secondary">Mon - Sat: 9:30 AM - 8:00 PM</Typography>
              <Typography variant="body-sm" color="secondary">Sunday: 9:30 AM - 5:00 PM</Typography>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <Typography variant="h4">Contact Us</Typography>
            <div className="space-y-3">
              <a href={`mailto:${contactInfo.email}`} className="flex items-center space-x-3 text-neutral-600 hover:text-primary-600 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center group-hover:bg-primary-50">
                  <FaEnvelope className="text-primary-500" />
                </div>
                <Typography variant="body-sm">{contactInfo.email}</Typography>
              </a>
              <a href={`tel:${contactInfo.phone}`} className="flex items-center space-x-3 text-neutral-600 hover:text-primary-600 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center group-hover:bg-primary-50">
                  <FaPhone className="text-primary-500" />
                </div>
                <Typography variant="body-sm">{contactInfo.phone}</Typography>
              </a>
              <a href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-neutral-600 hover:text-primary-600 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center group-hover:bg-green-50">
                  <FaWhatsapp className="text-green-500" />
                </div>
                <Typography variant="body-sm">WhatsApp Us</Typography>
              </a>
            </div>
          </div>

          {/* Location & Social */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPinIcon className="h-5 w-5 text-primary-500" />
              <Typography variant="h4">Visit Our Store</Typography>
            </div>
            
            <div className="bg-surface p-1 rounded-xl shadow-ambient-low">
              <div className="w-full h-32 rounded-lg overflow-hidden">
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

            <div className="flex items-center space-x-4 pt-2">
              <Typography variant="body-sm" color="secondary">Follow:</Typography>
              <a href="https://www.facebook.com/anikakitstore23/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/anikakitstore14/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                <FaInstagram />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-200/50 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <Typography variant="caption" color="secondary">
            © {new Date().getFullYear()} Anika Kit Store. All rights reserved.
          </Typography>
          <Typography variant="caption" color="secondary">
            You Demand We Fulfil.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
