
import React, { useState, useEffect } from 'react';
import { Building2, Loader2, MapPin, Briefcase } from 'lucide-react';
import { dbService } from '../services/dbService';

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = dbService.listenToCollection('jobs', (data) => {
      setJobs(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <h1 className="text-4xl font-black text-slate-900 tracking-tight">Jobs Portal</h1>
           <p className="text-slate-500 font-semibold mt-2">Latest ITI Apprenticeships & Private Jobs from across India.</p>
        </div>

        <div className="grid gap-6">
           {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-primary transition-all flex flex-col md:flex-row justify-between items-center group">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 group-hover:text-primary transition-all">
                       <Briefcase size={32} />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-all">{job.title}</h3>
                       <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{job.company} • {job.type || 'Job'}</p>
                    </div>
                 </div>
                 <a href={job.link} target="_blank" className="mt-4 md:mt-0 px-10 py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-blue-100 transition-all hover:scale-105 active:scale-95">Apply Now</a>
              </div>
           ))}
           {jobs.length === 0 && <p className="text-center py-20 text-gray-400 font-black uppercase text-xs tracking-widest">No active jobs found in database.</p>}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
