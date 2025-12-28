import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, FileText, ChevronRight, Zap, GraduationCap } from 'lucide-react';

const Home: React.FC = () => {
  const trendingUpdates = [
    "🔥 RRB ALP 2026 Notification Out (Technician Posts)",
    "🚀 Tata Motors ITI Apprentice 2026 Applications Open",
    "💼 DRDO CEPTAM-11 Technician-A Recruitment",
    "🔧 Railway Apprentice 2026-27 Batches Announced",
    "⚡ UPPCL TG-2 (Technician) Vacancy Coming Soon"
  ];

  const branches = [
    { name: 'ITI Electrician', icon: '🔌', color: 'bg-yellow-50 text-yellow-700' },
    { name: 'ITI Fitter', icon: '🔧', color: 'bg-orange-100 text-orange-600' },
    { name: 'ITI Welder', icon: '🔥', color: 'bg-red-100 text-red-600' },
    { name: 'ITI COPA', icon: '🖥️', color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Diesel Mechanic', icon: '🚛', color: 'bg-green-100 text-green-700' },
    { name: 'Motor Mechanic', icon: '🚗', color: 'bg-blue-100 text-blue-600' },
    { name: 'Wireman', icon: '⚡', color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Turner', icon: '⚙️', color: 'bg-gray-100 text-gray-700' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-16 md:py-24 px-4 overflow-hidden">
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" 
            alt="Engineering Work" 
            className="w-full h-full object-cover"
          />
          {/* Semi-transparent Overlay for text readability */}
          <div className="absolute inset-0 bg-blue-900/10"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 md:mb-6 text-white drop-shadow-md">
            India’s Largest <span className="text-orange-400">ITI Students</span> <br/>Community
          </h1>
          <p className="text-lg md:text-2xl font-bold mb-8 max-w-4xl mx-auto text-white leading-relaxed tracking-wide font-serif drop-shadow-sm">
            Access premium trade theory notes, NCVT papers, job alerts, and apprenticeships. Empowering your technical skill journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <Link to="/notes" className="px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold text-white shadow-lg transition transform hover:-translate-y-1 border border-orange-400">
              Trade Notes
            </Link>
            <Link to="/jobs" className="px-8 py-3 bg-white text-blue-900 hover:bg-gray-100 rounded-full font-semibold shadow-lg transition transform hover:-translate-y-1">
              Latest ITI Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Ticker */}
      <div className="bg-orange-50 border-b border-orange-100 py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          <span className="bg-orange-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded mr-3 shrink-0">NEW</span>
          <div className="whitespace-nowrap overflow-hidden relative flex-1">
             <div className="animate-marquee inline-block text-orange-800 text-sm font-medium">
                {trendingUpdates.join(" ••• ")}
             </div>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600 text-center mb-10 font-['Caveat']">Everything You Must Need</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-center">
            {[
              { icon: BookOpen, label: 'Trade Notes', link: '/notes', color: 'text-blue-500' },
              { icon: FileText, label: 'NCVT Papers', link: '/pyqs', color: 'text-red-500' },
              { icon: Briefcase, label: 'Jobs & Apprentice', link: '/jobs', color: 'text-green-500' },
              { icon: GraduationCap, label: 'Scholarships', link: '/scholarships', color: 'text-purple-500' },
            ].map((item, idx) => (
              <Link key={idx} to={item.link} className="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition text-center group border border-gray-100">
                <div className={`mx-auto w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-50 mb-3 md:mb-4 group-hover:scale-110 transition ${item.color}`}>
                  <item.icon size={20} className="md:w-6 md:h-6" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm md:text-base">{item.label}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Branches */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
               <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular ITI Trades</h2>
               <p className="text-sm md:text-base text-gray-500 mt-1">Find resources specific to your trade</p>
            </div>
            <Link to="/notes" className="text-blue-600 font-medium text-sm md:text-base flex items-center hover:underline">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {branches.map((branch, idx) => (
              <Link key={idx} to="/notes" className="block p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-md transition group">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-xl mb-3 ${branch.color} group-hover:scale-110 transition-transform`}>
                  {branch.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">{branch.name}</h3>
                <p className="text-xs text-gray-500 mt-1">Theory & Practical</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
         <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Join us on WhatsApp</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-sm md:text-base">Get instant updates about ITI exams, results, and job openings directly on your phone. Don't miss out!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="https://whatsapp.com/channel/0029Vb7wcUmFCCoR6zDELM07" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition"
              >
                 <Zap size={20} /> Join WhatsApp Channel
              </a>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;