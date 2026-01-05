
import React, { useState, useEffect } from 'react';
import { FileText, Download, Search, Loader2, Zap } from 'lucide-react';
import { dbService } from '../services/dbService';

const PYQs: React.FC = () => {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsub = dbService.listenToCollection('pyqs', (data) => {
      setPapers(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filtered = papers.filter(p => (p.title || "").toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Trade Papers (PYQs)</h1>
          <p className="text-slate-500 font-semibold mt-2">Access NCVT, SCVT and Competitive Exam Papers.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10 flex items-center gap-4 max-w-2xl mx-auto">
          <Search className="text-gray-400" />
          <input type="text" placeholder="Search paper title..." className="w-full font-bold outline-none" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>

        <div className="grid gap-5">
           {filtered.map((paper) => (
              <div key={paper.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center group hover:border-primary transition">
                 <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center"><FileText size={24}/></div>
                    <div>
                       <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition">{paper.title}</h3>
                       <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{paper.subject} • {paper.year}</p>
                    </div>
                 </div>
                 <a href={paper.link} target="_blank" className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black hover:bg-black flex items-center gap-2"><Download size={18}/> PDF</a>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default PYQs;
