import React, { useState, useEffect } from 'react';
import { MapPin, Briefcase, Calendar, Building2, Zap, Settings, Wrench, Monitor, Truck, Flame, Globe } from 'lucide-react';
import { Job } from '../types';

const defaultJobs: Job[] = [
  // --- GOVERNMENT / PSU JOBS (2026 Cycle) ---
  { id: 1, title: 'RRB ALP & Technician Recruitment 2026', company: 'Indian Railways', location: 'Pan India', type: 'Government', postedDate: 'Just Now', tags: ['ITI', 'Electrical', 'Mechanical', 'Fitter'] },
  { id: 3, title: 'DRDO CEPTAM-11 (Technician A) 2026', company: 'DRDO', location: 'Multiple Locations', type: 'Government', postedDate: '1 day ago', tags: ['ITI', 'Fitter', 'Electrician', 'COPA'] },
  { id: 5, title: 'Technician B (LPSC) 2026', company: 'ISRO', location: 'Valiamala/Bangalore', type: 'Government', postedDate: '5 hours ago', tags: ['ITI', 'Electronics', 'Electrician'] },
  { id: 7, title: 'Assistant Loco Shed Maintainer', company: 'Metro Railways (DMRC/BMRCL)', location: 'Metro Cities', type: 'Government', postedDate: '1 week ago', tags: ['ITI', 'Fitter', 'Electrician'] },
  { id: 8, title: 'Technician Grade-II (TG2)', company: 'UPPCL', location: 'Uttar Pradesh', type: 'Government', postedDate: '2 days ago', tags: ['ITI', 'Electrical'] },

  // --- PRIVATE SECTOR JOBS (2025-26 Hiring) ---
  { id: 51, title: 'CW/TW Recruitment 2026', company: 'Maruti Suzuki India', location: 'Gurgaon / Manesar', type: 'Private', postedDate: '4 hours ago', tags: ['ITI', 'Fitter', 'Diesel Mech', 'Painter'] },
  { id: 52, title: 'L&T Construction Skills Training 2026', company: 'Larsen & Toubro', location: 'Pan India Sites', type: 'Private', postedDate: '1 day ago', tags: ['ITI', 'Surveyor', 'Fitter'] },
  { id: 53, title: 'Production Associate - Mobile Division', company: 'Samsung India', location: 'Noida', type: 'Private', postedDate: '2 days ago', tags: ['ITI', 'Electronics', 'COPA'] },
  { id: 57, title: 'CNC/VMC Operator', company: 'Bharat Forge / Kalyani', location: 'Pune', type: 'Private', postedDate: '4 days ago', tags: ['ITI', 'Machinist', 'Turner'] },
  { id: 58, title: 'Welder (Structure & Pipe)', company: 'Godrej & Boyce', location: 'Mumbai', type: 'Private', postedDate: '1 week ago', tags: ['ITI', 'Welder'] },

  // --- APPRENTICESHIPS (2026-27 Session) ---
  { id: 20, title: 'Railway Apprentice 2026-27 (4000+ Slots)', company: 'Southern Railway', location: 'Chennai / Trichy', type: 'Apprenticeship', postedDate: 'Just Now', tags: ['ITI', 'All Trades'] },
  { id: 21, title: 'Trade Apprentice 2026', company: 'IOCL (Indian Oil)', location: 'Refineries Division', type: 'Apprenticeship', postedDate: '1 day ago', tags: ['ITI', 'Fitter', 'Electrician', 'Diesel Mech'] },
  { id: 23, title: 'Trade Apprentice (Data Entry/Fitter)', company: 'ONGC', location: 'Mumbai High / Gujarat', type: 'Apprenticeship', postedDate: '4 days ago', tags: ['ITI', 'COPA', 'Fitter'] },
  { id: 24, title: 'Dockyard Apprentice School 2026', company: 'Naval Dockyard', location: 'Mumbai / Vizag', type: 'Apprenticeship', postedDate: '1 week ago', tags: ['ITI', 'Electrician', 'Welder', 'Fitter'] },
];

const Jobs: React.FC = () => {
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Check if admin has posted any jobs, otherwise use defaults
    const dynamicJobs = JSON.parse(localStorage.getItem('dynamicJobs') || '[]');
    if (dynamicJobs.length > 0) {
      setJobs([...dynamicJobs, ...defaultJobs]);
    } else {
      setJobs(defaultJobs);
    }
  }, []);

  const filteredJobs = jobs.filter(job => {
    const typeMatch = filterType === 'All' || job.type === filterType;
    const searchMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return typeMatch && searchMatch;
  });

  const getTagIcon = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes('electrical') || t.includes('electrician') || t.includes('wireman')) return <Zap size={12} />;
    if (t.includes('mechanical') || t.includes('fitter') || t.includes('machinist') || t.includes('turner') || t.includes('automobile')) return <Settings size={12} />;
    if (t.includes('civil')) return <Building2 size={12} />;
    if (t.includes('computer') || t.includes('electronics') || t.includes('copa') || t.includes('cs') || t.includes('it')) return <Monitor size={12} />;
    if (t.includes('welder')) return <Flame size={12} />;
    if (t.includes('diesel') || t.includes('motor')) return <Truck size={12} />;
    return <Wrench size={12} />;
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
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="bg-white p-1 rounded-lg shadow-sm border border-gray-200 inline-flex overflow-x-auto">
                  {['All', 'Government', 'Private', 'Apprenticeship'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${
                          filterType === type 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'text-gray-600 hover:bg-gray-50'
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
                         <div className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            job.type === 'Government' ? 'bg-green-50 text-green-600' :
                            job.type === 'Apprenticeship' ? 'bg-orange-50 text-orange-600' :
                            'bg-blue-50 text-blue-600'
                         }`}>
                            <Building2 size={28} />
                         </div>
                         <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">{job.title}</h3>
                                {job.postedDate.includes('hour') || job.postedDate === 'Just Now' ? (
                                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full animate-pulse">NEW</span>
                                ) : null}
                            </div>
                            <div className="flex flex-wrap gap-y-2 gap-x-4 mt-2 text-sm text-gray-500">
                               <span className="flex items-center gap-1 font-medium text-gray-700"><Briefcase size={14} /> {job.company}</span>
                               <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                               <span className="flex items-center gap-1"><Calendar size={14} /> {job.postedDate}</span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                               <span className={`px-2 py-0.5 text-xs font-medium rounded border ${
                                  job.type === 'Government' ? 'bg-green-50 text-green-700 border-green-100' :
                                  job.type === 'Apprenticeship' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                  'bg-purple-50 text-purple-700 border-purple-100'
                               }`}>
                                  {job.type}
                               </span>
                               {job.tags && job.tags.map(tag => (
                                  <span key={tag} className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-600 border border-gray-200">
                                     {getTagIcon(tag)} {tag}
                                  </span>
                               ))}
                            </div>
                         </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col items-end gap-2">
                         <button className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-sm">
                            Apply Now
                         </button>
                      </div>
                   </div>
                </div>
             ))
           ) : (
             <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                 <Globe size={48} className="mx-auto text-gray-300 mb-4" />
                 <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                 <p className="text-gray-500">Try adjusting your search criteria</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;