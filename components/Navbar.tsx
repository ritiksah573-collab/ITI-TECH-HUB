
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, Sparkles, Phone, Home, FileText, BookOpen, Briefcase, Info, FileSignature, ArrowRight, IndianRupee, PenTool, CalendarCheck, MonitorPlay } from 'lucide-react';
import { dbService } from '../services/dbService';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<any>({ siteName: 'ITI Tech Hub', logoUrl: null });
  const location = useLocation();

  useEffect(() => {
    const unsub = dbService.listenToConfig((cloudConfig) => {
      if (cloudConfig) setConfig(cloudConfig);
    });
    return () => unsub();
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const activeClass = "text-primary bg-blue-50";
  const inactiveClass = "text-gray-600 hover:text-primary hover:bg-gray-50";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              {config.logoUrl ? (
                <img src={config.logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
              ) : (
                <GraduationCap className="h-8 w-8 text-primary" />
              )}
              <span className="font-bold text-xl tracking-tight text-gray-900">
                {config.siteName}
              </span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-100 shadow-xl z-40 max-h-[85vh] overflow-y-auto">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link to="/" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${isActive('/') ? activeClass : inactiveClass}`}><Home size={20} /> Home</Link>
            <Link to="/exams" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${isActive('/exams') ? 'text-primary bg-blue-50' : 'text-gray-600 hover:bg-blue-50'}`}><CalendarCheck size={20} /> Exam & Results</Link>
            <Link to="/admissions" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${isActive('/admissions') ? 'text-red-700 bg-red-50' : 'text-red-600 hover:bg-red-50'}`}><FileSignature size={20} /> ITI Admission</Link>
            <Link to="/notes" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${isActive('/notes') ? activeClass : inactiveClass}`}><BookOpen size={20} /> Trade Notes</Link>
            <Link to="/handwritten-notes" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${isActive('/handwritten-notes') ? activeClass : inactiveClass}`}><PenTool size={20} /> Hand Written Notes</Link>
            <Link to="/learn-machines" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${isActive('/learn-machines') ? 'text-orange-700 bg-orange-50' : 'text-gray-600 hover:bg-orange-50'}`}><MonitorPlay size={20} /> Learn Machines</Link>
            <Link to="/pyqs" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${isActive('/pyqs') ? activeClass : inactiveClass}`}><FileText size={20} /> Trade Papers</Link>
            <Link to="/jobs" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${isActive('/jobs') ? activeClass : inactiveClass}`}><Briefcase size={20} /> Jobs</Link>
            <Link to="/scholarships" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${isActive('/scholarships') ? activeClass : inactiveClass}`}><IndianRupee size={20} /> Scholarship</Link>
            <Link to="/aibuddy" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-bold text-indigo-700 bg-indigo-50"><Sparkles size={20} /> Your AIbuddy</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full text-center px-3 py-3 mt-4 rounded-md text-base font-medium text-white bg-primary hover:opacity-90 shadow-sm"><Phone size={20} /> Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
