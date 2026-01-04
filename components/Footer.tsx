import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">ITI <span className="text-orange-500">Tech</span> Hub</h3>
            <p className="text-gray-400 text-sm mb-4">
              India's largest and most active community for ITI students. Connecting you to trade theory, apprenticeships, and career opportunities.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/notes" className="hover:text-orange-500">Trade Notes</Link></li>
              <li><Link to="/jobs" className="hover:text-orange-500">Job Alerts</Link></li>
              <li><Link to="/pyqs" className="hover:text-orange-500">Trade Papers</Link></li>
              <li><Link to="/admin" className="text-gray-700 hover:text-gray-600 transition flex items-center gap-1 mt-4"><Shield size={12}/> Admin Panel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Student Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-orange-500">Success Stories</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500">Mentorship Program</Link></li>
              <li><a href="https://whatsapp.com/channel/0029Vb7wcUmFCCoR6zDELM07" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">WhatsApp Channel</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-orange-500" /> ititechhub@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-orange-500" /> +91 90066 95450
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-orange-500" /> Bihar, India
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} ITI Tech Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;