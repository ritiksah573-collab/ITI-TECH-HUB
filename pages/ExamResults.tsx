
import React, { useState, useEffect } from 'react';
import { Calendar, Award, ExternalLink, MapPin, Clock, FileText, Loader2, Filter } from 'lucide-react';
import { dbService } from '../services/dbService';

const ExamResults: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Schedule' | 'Result'>('Schedule');
  const [selectedState, setSelectedState] = useState('All');
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = dbService.listenToCollection('exams', (cloudExams) => {
      setExams(cloudExams);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const states = Array.from(new Set(exams.map(item => item.state))).filter(Boolean).sort();

  const filteredData = exams.filter(item => {
    // Robust type checking in case of casing issues or spaces
    const itemType = (item.type || "").trim();
    const typeMatch = itemType === activeTab;
    const stateMatch = selectedState === 'All' || item.state === selectedState;
    return typeMatch && stateMatch;
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Exams & Results</h1>
          <p className="text-slate-500 font-bold mt-2">Official portal for ITI Time Tables and Results (Cloud Synced).</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center mb-8 gap-4">
            <div className="flex p-1.5 bg-white rounded-2xl shadow-sm border border-gray-100">
                <button 
                  onClick={() => setActiveTab('Schedule')} 
                  className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${activeTab === 'Schedule' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Exam Dates
                </button>
                <button 
                  onClick={() => setActiveTab('Result')} 
                  className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${activeTab === 'Result' ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Results
                </button>
            </div>

            <div className="relative w-full md:w-64">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Filter size={18} />
                </div>
                <select 
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none font-black text-xs uppercase tracking-widest shadow-sm appearance-none cursor-pointer"
                  value={selectedState} 
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                    <option value="All">All India</option>
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredData.map((item) => (
                <div key={item.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 group relative hover:border-blue-200 transition-all">
                    <div className="flex items-start gap-5 mb-6">
                        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-inner ${activeTab === 'Schedule' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                            {activeTab === 'Schedule' ? <FileText size={32} /> : <Award size={32} />}
                        </div>
                        <div>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${activeTab === 'Schedule' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                              {activeTab} Update
                            </span>
                            <h3 className="text-xl font-black text-slate-900 mt-2 leading-tight group-hover:text-blue-600 transition">{item.title}</h3>
                            <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                <MapPin size={12} /> {item.state} • {item.board}
                            </div>
                        </div>
                    </div>
                    <p className="text-slate-500 font-medium text-sm mb-8 leading-relaxed">{item.description}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date / Session</span>
                            <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5 mt-0.5"><Clock size={16}/> {item.date}</span>
                        </div>
                        <a 
                          href={item.link} 
                          target="_blank" 
                          className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl text-xs font-black text-white transition-all hover:scale-105 active:scale-95 shadow-lg ${activeTab === 'Schedule' ? 'bg-blue-600 shadow-blue-100' : 'bg-green-600 shadow-green-100'}`}
                        >
                          Check Official Link <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            ))}
            {filteredData.length === 0 && (
              <div className="col-span-full py-32 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mb-6">
                    <Calendar size={40} />
                </div>
                <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">No Updates Found</h3>
                <p className="text-slate-400 text-sm mt-2 font-bold">No active {activeTab} matches your filter criteria.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ExamResults;
