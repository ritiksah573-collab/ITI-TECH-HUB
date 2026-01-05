
import React, { useState, useEffect } from 'react';
import { MonitorPlay, Search, Play, Loader2 } from 'lucide-react';
import { dbService } from '../services/dbService';

const LearnMachines: React.FC = () => {
  const [tutorials, setTutorials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsub = dbService.listenToCollection('machines', (data) => {
      setTutorials(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filtered = tutorials.filter(t => (t.title || "").toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Machine Lab</h1>
          <p className="text-slate-500 font-semibold mt-2">Visual practical library for industrial machines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {filtered.map((tut) => (
             <div key={tut.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition flex flex-col h-full group">
                <div className="relative pt-[56.25%] bg-black">
                   <iframe className="absolute top-0 left-0 w-full h-full" src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(tut.searchQuery || tut.title)}`} frameBorder="0" allowFullScreen></iframe>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                   <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-primary transition">{tut.title}</h3>
                   <p className="text-slate-500 text-sm mb-6 line-clamp-2">{tut.description}</p>
                   <div className="mt-auto pt-6 border-t flex items-center justify-between">
                      <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1.5 rounded-xl uppercase tracking-widest">{tut.trade}</span>
                      <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(tut.searchQuery || tut.title)}`} target="_blank" className="text-red-600 font-black text-xs flex items-center gap-1 hover:underline"><Play size={12} fill="currentColor"/> Watch on YT</a>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default LearnMachines;
