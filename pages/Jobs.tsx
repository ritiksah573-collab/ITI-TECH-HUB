
import React, { useState, useEffect } from 'react';
import { MapPin, Briefcase, Calendar, Building2, Zap, Settings, Wrench, Monitor, Truck, Flame, Globe, Loader2 } from 'lucide-react';
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
        let dynamicJobs: Job[] = [];
        
        if (storedData) {
          const parsed = JSON.parse(storedData);
          dynamicJobs = Array.isArray(parsed) ? parsed : [];
        }
        
        // Merge with defaults, prioritizing dynamic ones
        const combined = [...dynamicJobs, ...defaultJobs];
        
        // Ensure unique IDs
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
    const title = job.title?.toLowerCase() || "";
    const company = job.company?.toLowerCase() || "";
    const loc = job.location?.toLowerCase() || "";
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
             <h1 className="text-3xl font-bold text-gray-900">ITI Jobs & Vacancies</h1>
             <p className="text-gray-600 mt-2">Latest Technician, Apprentice & Private jobs for ITI Holders.</p>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Search job, company..." 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="bg-white p-1 rounded-lg shadow-sm border border-gray-200 inline-flex">
                  {['All', 'Government', 'Private', 'Apprenticeship'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                          filterType === type ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        {type}
                    </button>
                  ))}
              </div>
           </div>
        </div>

        <div className="grid gap-4">
           {filteredJobs.length > 0 ? (
             filteredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-blue-300 transition group relative">
                   <div className="flex flex-col md:flex-row justify-between md:items-center">
                      <div className="flex items-start gap-4">
                         <div className={`w-14 h-14 rounded-lg flex items-center justify-center shrink-0 ${
                            job.type === 'Government' ? 'bg-green-50 text-green-600' :
                            job.type === 'Apprenticeship' ? 'bg-orange-50 text-orange-600' :
                            'bg-blue-50 text-blue-600'
                         }`}>
                            <Building2 size={28} />
                         </div>
                         <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">{job.title}</h3>
                                {job.postedDate === 'Just Now' && <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full animate-pulse">NEW</span>}
                            </div>
                            <div className="flex flex-wrap gap-y-2 gap-x-4 mt-2 text-sm text-gray-500">
                               <span className="flex items-center gap-1 font-medium text-gray-700"><Briefcase size={14} /> {job.company}</span>
                               <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                               <span className="flex items-center gap-1"><Calendar size={14} /> {job.postedDate}</span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                               {job.tags && job.tags.map(tag => (
                                  <span key={tag} className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-600 border border-gray-200">
                                     {getTagIcon(tag)} {tag}
                                  </span>
                               ))}
                            </div>
                         </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                         <button className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-sm">Apply Now</button>
                      </div>
                   </div>
                </div>
             ))
           ) : (
             <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                 <Globe size={48} className="mx-auto text-gray-300 mb-4" />
                 <h3 className="text-lg font-medium text-gray-900">No jobs found matching your criteria</h3>
                 <button onClick={() => {setSearchTerm(''); setFilterType('All')}} className="mt-4 text-blue-600 hover:underline">Reset Filters</button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
