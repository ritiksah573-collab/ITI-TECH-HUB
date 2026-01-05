
import React, { useState, useEffect } from 'react';
import { PenTool, Search, BookOpen, FileText, Download, Loader2, ArrowLeft } from 'lucide-react';
import { dbService } from '../services/dbService';

const HandWrittenNotes: React.FC = () => {
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);
  const [dynamicNotes, setDynamicNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Real-time listener from Cloud Firestore
    const unsub = dbService.listenToCollection('handwritten', (data) => {
      setDynamicNotes(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Extract unique trades from uploaded notes
  const availableTrades = Array.from(new Set(dynamicNotes.map(n => n.trade))).filter(Boolean).sort();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  if (selectedTrade) {
     const notesForTrade = dynamicNotes.filter(n => n.trade === selectedTrade);
     return (
        <div className="bg-gray-50 min-h-screen py-10">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <button onClick={() => setSelectedTrade(null)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-black uppercase text-xs tracking-widest mb-8 bg-white px-4 py-2 rounded-lg shadow-sm">
                 <ArrowLeft size={16} /> Back to Trade Selection
              </button>

              <div className="flex items-center gap-5 mb-10">
                 <div className="w-20 h-20 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center shadow-xl shadow-blue-200">
                    <PenTool size={36} />
                 </div>
                 <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">{selectedTrade} Notes</h1>
                    <p className="text-blue-600 font-bold">Direct from Classroom Toppers • Cloud Verified</p>
                 </div>
              </div>

              <div className="grid gap-5">
                 {notesForTrade.map((note) => (
                    <div key={note.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-300 transition-all flex items-center justify-between group">
                       <div className="flex items-center gap-5">
                          <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                             <FileText size={28} />
                          </div>
                          <div>
                             <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">{note.title}</h3>
                             <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1 opacity-60">{note.subject}</p>
                          </div>
                       </div>
                       <a href={note.link} target="_blank" rel="noopener noreferrer" className="bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center gap-2 font-black hover:bg-black transition shadow-lg">
                          <Download size={20} /> View Document
                       </a>
                    </div>
                 ))}
                 {notesForTrade.length === 0 && (
                   <div className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest">No Cloud PDF files for this trade.</div>
                 )}
              </div>
           </div>
        </div>
     );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <div className="inline-block p-4 bg-blue-100 text-blue-600 rounded-[2rem] mb-6 shadow-sm"><PenTool size={40} /></div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight">Handwritten Topper Notes</h1>
           <p className="text-gray-500 font-semibold mt-2">Premium digitised notes for ITI students, updated live from Cloud.</p>
        </div>

        <div className="max-w-2xl mx-auto mb-12 relative">
            <Search className="absolute left-5 top-4.5 text-gray-400" size={24} />
            <input 
              type="text" 
              placeholder="Search trade (e.g. Electrician, Fitter)..."
              className="w-full pl-14 pr-6 py-4.5 border-2 border-transparent bg-white rounded-2xl outline-none shadow-xl focus:border-blue-500 transition-all font-bold text-slate-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {availableTrades.filter(t => (t as string).toLowerCase().includes(searchTerm.toLowerCase())).map((trade) => (
                <div 
                  key={trade as string} 
                  onClick={() => setSelectedTrade(trade as string)}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all group cursor-pointer flex flex-col items-center text-center relative"
                >
                    <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-5 transition-transform group-hover:scale-110 shadow-inner">
                        <BookOpen size={36} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600">{trade as string}</h3>
                    <div className="mt-4 px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-all">Open Folder</div>
                </div>
            ))}
            {availableTrades.length === 0 && (
              <div className="col-span-full py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">Waiting for Admin to upload cloud notes...</div>
            )}
        </div>
      </div>
    </div>
  );
};

export default HandWrittenNotes;
