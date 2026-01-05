
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Briefcase, Zap, GraduationCap } from 'lucide-react';
import { SiteConfig } from '../types';
import { dbService } from '../services/dbService';

// Fix: Added missing required 'siteName' property to match the SiteConfig interface
const DEFAULT_CONFIG: SiteConfig = {
  siteName: "ITI Tech Hub",
  heroTitle: "India’s Largest ITI Students Community",
  heroSubTitle: "Access premium trade theory notes, NCVT papers, job alerts, and apprenticeships.",
  marqueeUpdates: [
    "🔥 Loading latest updates from Cloud...",
  ]
};

const Home: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    const unsub = dbService.listenToConfig((cloudConfig) => {
      if (cloudConfig) {
        // Parse marquee if it comes as a JSON string from MySQL
        let updates = cloudConfig.marqueeUpdates;
        if (typeof updates === 'string') {
          try { updates = JSON.parse(updates); } catch(e) { updates = [updates]; }
        }
        setConfig({
          ...cloudConfig,
          marqueeUpdates: Array.isArray(updates) ? updates : [updates]
        });
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative text-white py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" 
            alt="Engineering" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-xl">
             {config.heroTitle}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-blue-50 font-medium">
            {config.heroSubTitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/notes" className="px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-bold text-white shadow-lg transition transform hover:-translate-y-1">
              Trade Notes
            </Link>
            <Link to="/jobs" className="px-8 py-3 bg-white text-blue-900 hover:bg-gray-100 rounded-full font-bold shadow-lg transition transform hover:-translate-y-1">
              Latest Jobs
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-orange-50 border-b border-orange-100 py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded mr-3 shrink-0 uppercase tracking-tighter">LATEST NEWS</span>
          <div className="whitespace-nowrap overflow-hidden relative flex-1">
             <div className="animate-marquee inline-block text-orange-900 text-sm font-bold">
                {config.marqueeUpdates.join(" ••• ")}
             </div>
          </div>
        </div>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Quick Student Resources</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: BookOpen, label: 'Trade Notes', link: '/notes', color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: FileText, label: 'Trade Papers', link: '/pyqs', color: 'text-red-600', bg: 'bg-red-50' },
              { icon: Briefcase, label: 'Job Alerts', link: '/jobs', color: 'text-green-600', bg: 'bg-green-50' },
              { icon: GraduationCap, label: 'Scholarships', link: '/scholarships', color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map((item, idx) => (
              <Link key={idx} to={item.link} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all text-center border border-gray-100 group">
                <div className={`mx-auto w-14 h-14 flex items-center justify-center rounded-2xl ${item.bg} mb-4 group-hover:scale-110 transition ${item.color}`}>
                  <item.icon size={28} />
                </div>
                <h3 className="font-bold text-gray-800">{item.label}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
