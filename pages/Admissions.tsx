
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ExternalLink, Clock, Loader2 } from 'lucide-react';
import { dbService } from '../services/dbService';

const Admissions: React.FC = () => {
  const [filterState, setFilterState] = useState('All');
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to admissions collection in cloud
    const unsub = dbService.listenToCollection('admissions', (data) => {
      setAdmissions(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const states = Array.from(new Set(admissions.map(item => item.state))).sort();

  const filteredData = admissions.filter(item => {
    const stateMatch = filterState === 'All' || item.state === filterState;
    return stateMatch;
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">ITI Admission 2026-27</h1>
          <p className="text-gray-600 mt-2">Global Cloud Updates: Online Admission Forms & Counseling Updates.</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="text-gray-700 font-bold uppercase text-xs tracking-widest">Filter by State:</div>
           <div className="w-full md:w-64">
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white cursor-pointer font-bold" value={filterState} onChange={(e) => setFilterState(e.target.value)}>
                 <option value="All">All India</option>
                 {states.map(state => <option key={state as string} value={state as string}>{state as string}</option>)}
              </select>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredData.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col h-full relative overflow-hidden group">
                 <div className="p-6 flex-1">
                    <div className="mb-4">
                       <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 bg-orange-100 text-orange-700">ITI ADMISSION</span>
                       <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">{item.examName}</h3>
                       <div className="flex items-center gap-1 text-gray-500 text-sm mt-1 font-bold"><MapPin size={14} /> {item.state}</div>
                    </div>
                    <div className="space-y-3 text-sm border-t border-gray-100 pt-4 font-semibold">
                       <div className="flex justify-between items-center"><span className="text-gray-400 flex items-center gap-1"><Calendar size={14}/> Start:</span><span className="text-slate-800">{item.startDate}</span></div>
                    </div>
                 </div>
                 <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <a href={item.applyLink} target="_blank" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black transition bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100">
                       Apply Now <ExternalLink size={16} />
                    </a>
                 </div>
              </div>
           ))}
           {filteredData.length === 0 && (
             <div className="col-span-full py-20 text-center text-gray-400 font-bold">No active admissions for the selected state.</div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Admissions;
