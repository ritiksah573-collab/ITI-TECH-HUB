
import React, { useState, useEffect } from 'react';
import { Calendar, Award, ExternalLink, MapPin, Clock, FileText, Loader2, Filter, AlertCircle, RefreshCw, Zap } from 'lucide-react';
import { dbService } from '../services/dbService';

const ExamResults: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Schedule' | 'Result'>('Schedule');
  const [selectedState, setSelectedState] = useState('All');
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Syncing with Exam Cloud...");
    const unsub = dbService.listenToCollection('exams', (cloudExams) => {
      setExams(cloudExams);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const states = Array.from(new Set(exams.map(item => item.state))).filter(Boolean).sort();

  const filteredData = exams.filter(item => {
    // If an item has NO type, we show it in 'Schedule' (Dates) by default
    const itemType = (item.type || "Schedule").trim().toLowerCase();
    const currentTab = activeTab.toLowerCase();
    
    const typeMatch = itemType === currentTab;
    const stateMatch = selectedState === 'All' || item.state === selectedState;
    
    return typeMatch && stateMatch;
  });

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={50} />
      <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest">Cloud Sync Active</h2>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Exams & Results</h1>
          <p className="text-slate-500 font-bold mt-2">Official ITI Time Tables and Results (Direct from Cloud).</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center mb-12 gap-6">
            <div className="flex p-2 bg-white rounded-3xl shadow-xl border border-gray-100">
                <button 
                  onClick={() => setActiveTab('Schedule')} 
                  className={`px-10 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === 'Schedule' ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Exam Dates
                </button>
                <button 
                  onClick={() => setActiveTab('Result')} 
                  className={`px-10 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === 'Result' ? 'bg-green-600 text-white shadow-xl shadow-green-200' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Merit Lists
                </button>
            </div>

            <div className="relative w-full md:w-72">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                    <MapPin size={20} />
                </div>
                <select 
                  className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-3xl outline-none font-black text-xs uppercase tracking-widest shadow-xl appearance-none cursor-pointer focus:ring-4 focus:ring-blue-100"
                  value={selectedState} 
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                    <option value="All">All India States</option>
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
            </div>
        </div>

        {/* If data exists in DB but not showing due to filtering, show a helper */}
        {exams.length > 0 && filteredData.length === 0 && (
           <div className="max-w-2xl mx-auto mb-12 p-8 bg-blue-50 border-2 border-dashed border-blue-200 rounded-[2.5rem] flex flex-col items-center text-center">
              <RefreshCw className="text-blue-500 mb-3" />
              <h3 className="text-lg font-black text-blue-900">Found {exams.length} entries in Cloud DB</h3>
              <p className="text-xs font-bold text-blue-600 mt-1">None match the "{activeTab}" filter for "{selectedState}". Try changing the state or switching tabs.</p>
           </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredData.map((item) => (
                <div key={item.id} className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-50 group hover:border-blue-400 transition-all flex flex-col relative overflow-hidden">
                    <div className="flex items-start gap-6 mb-8">
                        <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 shadow-inner ${ (item.type || "").toLowerCase().includes('result') ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600' }`}>
                            { (item.type || "").toLowerCase().includes('result') ? <Award size={40} /> : <FileText size={40} /> }
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${ (item.type || "").toLowerCase().includes('result') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700' }`}>
                                  {item.type || activeTab} Alert
                                </span>
                                {item.state && <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-xl border border-gray-100">{item.state}</span>}
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mt-3 leading-tight group-hover:text-blue-600 transition">{item.title || "New Update"}</h3>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">
                                {item.board || "NCVT/SCVT"} Board
                            </p>
                        </div>
                    </div>
                    <p className="text-slate-500 font-medium text-base mb-10 leading-relaxed flex-1">{item.description || "Official update regarding session schedules or results."}</p>
                    <div className="flex items-center justify-between pt-8 border-t border-gray-100 mt-auto">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Update Date</span>
                            <span className="text-lg font-black text-slate-900 flex items-center gap-2 mt-1"><Clock size={18} className="text-blue-500"/> {item.date || "Just Now"}</span>
                        </div>
                        <a 
                          href={item.link || "#"} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`flex items-center gap-3 px-10 py-5 rounded-[1.5rem] text-sm font-black text-white transition-all shadow-xl active:scale-95 ${activeTab === 'Schedule' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                          View Link <ExternalLink size={16} />
                        </a>
                    </div>
                </div>
            ))}
            
            {exams.length === 0 && (
              <div className="col-span-full py-40 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mb-8">
                    <Calendar size={48} />
                </div>
                <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest">No Cloud Data Found</h3>
                <p className="text-slate-400 font-bold mt-2">Check back later for ITI updates.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ExamResults;
