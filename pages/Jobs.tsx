
import React, { useState, useEffect } from 'react';
import { MapPin, Briefcase, Calendar, Building2, Zap, Settings, Wrench, Loader2, ExternalLink, Globe } from 'lucide-react';
import { Job } from '../types';
import { dbService } from '../services/dbService';

const defaultJobs: Job[] = [
  { id: 1, title: 'RRB ALP & Technician Recruitment 2026', company: 'Indian Railways', location: 'Pan India', type: 'Government', postedDate: '1 Jan 2026', tags: ['ITI', 'Fitter'] },
];

const Jobs: React.FC = () => {
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = dbService.listenToCollection('jobs', (cloudJobs) => {
      setJobs(cloudJobs.length > 0 ? cloudJobs : defaultJobs);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const title = (job as any).title?.toLowerCase() || "";
    const s = searchTerm.toLowerCase();
    const typeMatch = filterType === 'All' || job.type === filterType;
    return typeMatch && title.includes(s);
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Cloud Jobs Portal</h1>
        <div className="grid gap-5">
           {filteredJobs.map((job: any) => (
              <div key={job.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-blue-300 transition-all">
                 <div className="flex justify-between items-center">
                    <div className="flex items-start gap-4">
                       <div className="p-4 bg-blue-50 text-blue-600 rounded-xl"><Building2 size={30} /></div>
                       <div>
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <p className="text-gray-500 font-medium">{job.company} • {job.location}</p>
                       </div>
                    </div>
                    {job.link && (
                       <a href={job.link} target="_blank" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-100">Apply Now</a>
                    )}
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
