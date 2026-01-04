
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ExternalLink, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface AdmissionUpdate {
  id: number;
  examName: string;
  state: string;
  type: 'ITI';
  status: 'Active' | 'Upcoming' | 'Closed';
  startDate: string;
  endDate: string;
  applyLink: string;
  description: string;
}

const defaultAdmissions: AdmissionUpdate[] = [
  { id: 101, examName: 'UP ITI Admission 2026', state: 'Uttar Pradesh', type: 'ITI', status: 'Upcoming', startDate: 'June 2026', endDate: 'July 2026', applyLink: 'http://www.scvtup.in/', description: 'State Council for Vocational Training (SCVT) UP admission based on merit.' },
  { id: 102, examName: 'Bihar ITICAT 2026', state: 'Bihar', type: 'ITI', status: 'Upcoming', startDate: 'April 2026', endDate: 'May 2026', applyLink: 'https://bceceboard.bihar.gov.in/', description: 'Industrial Training Institute Competitive Admission Test for Bihar ITIs.' }
];

const Admissions: React.FC = () => {
  const [filterState, setFilterState] = useState('All');
  const [admissions, setAdmissions] = useState<AdmissionUpdate[]>([]);

  useEffect(() => {
    const load = () => {
      const stored = localStorage.getItem('iti_dynamic_admissions');
      const dynamic = stored ? JSON.parse(stored) : [];
      setAdmissions([...dynamic, ...defaultAdmissions]);
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const states = Array.from(new Set(admissions.map(item => item.state))).sort();

  const filteredData = admissions.filter(item => {
    const stateMatch = filterState === 'All' || item.state === filterState;
    return stateMatch;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200';
      case 'Upcoming': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Closed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">ITI Admission 2026-27</h1>
          <p className="text-gray-600 mt-2">Online Admission Forms & Counseling Updates for Government ITI Colleges.</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="text-gray-700 font-medium">Select State:</div>
           <div className="w-full md:w-64">
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white cursor-pointer" value={filterState} onChange={(e) => setFilterState(e.target.value)}>
                 <option value="All">All States</option>
                 {states.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredData.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col h-full relative overflow-hidden group">
                 <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-xs font-bold border-b border-l ${getStatusColor(item.status)}`}>
                    {item.status?.toUpperCase() || 'UPCOMING'}
                 </div>
                 <div className="p-6 flex-1">
                    <div className="mb-4">
                       <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 bg-orange-100 text-orange-700">ITI</span>
                       <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">{item.examName}</h3>
                       <div className="flex items-center gap-1 text-gray-500 text-sm mt-1"><MapPin size={14} /> {item.state}</div>
                    </div>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">{item.description}</p>
                    <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                       <div className="flex justify-between items-center"><span className="text-gray-500 flex items-center gap-1"><Calendar size={14}/> Start:</span><span className="font-medium">{item.startDate}</span></div>
                       <div className="flex justify-between items-center"><span className="text-gray-500 flex items-center gap-1"><Clock size={14}/> End:</span><span className="font-medium text-red-600">{item.endDate}</span></div>
                    </div>
                 </div>
                 <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <a href={item.applyLink} target="_blank" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold transition bg-blue-600 text-white hover:bg-blue-700">
                       Visit Portal <ExternalLink size={16} />
                    </a>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Admissions;
