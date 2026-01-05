
import React, { useState, useEffect } from 'react';
import { Landmark, IndianRupee, Calendar, ExternalLink, Search, Loader2 } from 'lucide-react';
import { dbService } from '../services/dbService';

const Scholarships: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = dbService.listenToCollection('scholarships', (data) => {
      setScholarships(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filteredScholarships = scholarships.filter(item => {
    const name = (item.name || "").toLowerCase();
    const provider = (item.provider || "").toLowerCase();
    const s = searchTerm.toLowerCase();
    return name.includes(s) || provider.includes(s);
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Scholarship Portal</h1>
          <p className="text-gray-600 mt-2">Latest financial aid updates for ITI students across India.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 flex items-center gap-4">
          <Search className="text-gray-400" size={24} />
          <input 
            type="text" 
            placeholder="Search for scholarship name or provider..." 
            className="w-full py-2 outline-none font-bold text-slate-800" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {filteredScholarships.map((scholarship) => (
              <div key={scholarship.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group relative overflow-hidden">
                 <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-green-50 text-green-600 shadow-sm border border-green-100">
                      <Landmark size={28} />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">{scholarship.name}</h3>
                       <p className="text-gray-500 text-sm font-semibold">{scholarship.provider}</p>
                    </div>
                 </div>
                 <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest"><IndianRupee size={16} /> Benefit:</span>
                      <span className="font-black text-slate-900">{scholarship.amount}</span>
                    </div>
                 </div>
                 <div className="pt-2">
                    <a href={scholarship.applyLink} target="_blank" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-white transition bg-slate-900 hover:bg-black shadow-lg">
                      Official Application Link <ExternalLink size={16} />
                    </a>
                 </div>
              </div>
           ))}
           {filteredScholarships.length === 0 && (
             <div className="col-span-full py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">No cloud updates for scholarships found.</div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Scholarships;
