
import React, { useState, useEffect } from 'react';
import { MapPin, Briefcase, Calendar, Building2, Zap, Settings, Wrench, Monitor, Globe, Loader2, ExternalLink } from 'lucide-react';
import { Job } from '../types';

const defaultJobs: Job[] = [
  { id: 1, title: 'RRB ALP & Technician Recruitment 2026', company: 'Indian Railways', location: 'Pan India', type: 'Government', postedDate: 'Just Now', tags: ['ITI', 'Electrical', 'Mechanical', 'Fitter'] },
  { id: 3, title: 'DRDO CEPTAM-11 (Technician A) 2026', company: 'DRDO', location: 'Multiple Locations', type: 'Government', postedDate: '1 day ago', tags: ['ITI', 'Fitter', 'Electrician', 'COPA'] },
  { id: 51, title: 'CW/TW Recruitment 2026', company: 'Maruti Suzuki India', location: 'Gurgaon / Manesar', type: 'Private', postedDate: '4 hours ago', tags: ['ITI', 'Fitter', 'Diesel Mech', 'Painter'] },
  { id: 20, title: 'Railway Apprentice 2026-27 (4000+ Slots)', company: 'Southern Railway', location: 'Chennai / Trichy', type: 'Apprenticeship', postedDate: 'Just Now', tags: ['ITI', 'All Trades'] },
];

const Jobs: React.FC = () => {
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = () => {
      try {
        const storedData = localStorage.getItem('iti_dynamic_jobs');
        let dynamicJobs: any[] = [];
        
        if (storedData) {
          const parsed = JSON.parse(storedData);
          dynamicJobs = Array.isArray(parsed) ? parsed : [];
        }
        
        // Merge dynamic and default
        const combined = [...dynamicJobs, ...defaultJobs];
        
        // Unique check
        const seen = new Set();
        const unique = combined.filter(el => {
          const duplicate = seen.has(el.id);
          seen.add(el.id);
          return !duplicate;
        });
        
        setJobs(unique);
      } catch (error) {
        console.error("Failed to load jobs:", error);
        setJobs(defaultJobs);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
    window.addEventListener('storage', loadJobs);
    return () => window.removeEventListener('storage', loadJobs);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const title = (job as any).title?.toLowerCase() || "";
    const company = (job as any).company?.toLowerCase() || "";
    const loc = (job as any).location?.toLowerCase() || "";
    const s = searchTerm.toLowerCase();

    const typeMatch = filterType === 'All' || job.type === filterType;
    const searchMatch = title.includes(s) || company.includes(s) || loc.includes(s) || 
                        (job.tags || []).some(tag => tag.toLowerCase().includes(s));
    return typeMatch && searchMatch;
  });

  const getTagIcon = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes('elect')) return <Zap size={12} />;
    if (t.includes('fitter') || t.includes('mech')) return <Settings size={12} />;
    return <Wrench size={12} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading Latest Jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8">
           <div className="mb-4 md:mb-0">
             <h1 className="text-3xl font-extrabold text-gray-900">Career Portal</h1>
             <p className="text-gray-500 mt-2 font-medium">Curated jobs and apprenticeships for technical professionals.</p>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Search job or company..." 
                className="px-6 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="bg-white p-1.5 rounded-xl shadow-sm border border-gray-100 inline-flex">
                  {['All', 'Government', 'Private', 'Apprentice'].map((type) => {
                    const label = type === 'Apprentice' ? 'Apprenticeship' : type;
                    const value = type === 'Apprentice' ? 'Apprenticeship' : type;
                    return (
                      <button
                          key={type}
                          onClick={() => setFilterType(value)}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            filterType === value ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                      >
                          {label}
                      </button>
                    );
                  })}
              </div>
           </div>
        </div>

        <div className="grid gap-5">
           {filteredJobs.length > 0 ? (
             filteredJobs.map((job: any) => (
                <div key={job.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 transition-all group relative">
                   <div className="flex flex-col md:flex-row justify-between md:items-center">
                      <div className="flex items-start gap-5">
                         <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                            job.type === 'Government' ? 'bg-green-50 text-green-600' :
                            job.type === 'Apprenticeship' ? 'bg-orange-50 text-orange-600' :
                            'bg-blue-50 text-blue-600'
                         }`}>
                            <Building2 size={32} />
                         </div>
                         <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">{job.title}</h3>
                                {job.postedDate === 'Just Now' && <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black rounded-full animate-pulse border border-red-100">NEW ALERT</span>}
                            </div>
                            <div className="flex flex-wrap gap-y-2 gap-x-5 mt-2 text-sm text-gray-500 font-medium">
                               <span className="flex items-center gap-1.5 text-slate-800"><Briefcase size={16} className="text-gray-400" /> {job.company}</span>
                               <span className="flex items-center gap-1.5"><MapPin size={16} className="text-gray-400" /> {job.location}</span>
                               <span className="flex items-center gap-1.5"><Calendar size={16} className="text-gray-400" /> {job.postedDate}</span>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                               {job.tags && job.tags.map((tag: string) => (
                                  <span key={tag} className="flex items-center gap-1 px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg bg-gray-50 text-gray-500 border border-gray-100">
                                     {getTagIcon(tag)} {tag}
                                  </span>
                               ))}
                            </div>
                         </div>
                      </div>
                      <div className="mt-6 md:mt-0">
                         {job.link ? (
                           <a 
                             href={job.link} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="w-full md:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                           >
                              Apply on Official Site <ExternalLink size={18} />
                           </a>
                         ) : (
                           <button className="w-full md:w-auto px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl opacity-50 cursor-not-allowed">
                             Link Not Provided
                           </button>
                         )}
                      </div>
                   </div>
                </div>
             ))
           ) : (
             <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
                 <Globe size={64} className="mx-auto text-gray-100 mb-6" />
                 <h3 className="text-xl font-bold text-gray-900">No matching vacancies found</h3>
                 <p className="text-gray-400 mt-2">Try changing your search or checking back later.</p>
                 <button onClick={() => {setSearchTerm(''); setFilterType('All')}} className="mt-6 text-blue-600 font-bold hover:underline">Clear Search Filter</button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
