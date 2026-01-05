import React, { useState, useEffect } from 'react';
import { Search, FileText, Download, Eye, BookOpen, Zap, Wrench, Flame, Monitor, Truck, Ruler, Droplet, Wind, Radio, Scissors, Hammer, Loader2 } from 'lucide-react';
import { Note } from '../types';
import { dbService } from '../services/dbService';

const Notes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const tradeOptions = [
    "ITI Electrician", "ITI Fitter", "ITI COPA", "ITI Welder", "ITI Diesel Mechanic", 
    "ITI Motor Mechanic", "ITI Wireman", "ITI Turner", "ITI Machinist", 
    "Draughtsman Civil", "Draughtsman Mech", "Electronics Mechanic", "ITI RAC", 
    "ITI Plumber", "ITI Carpenter", "ITI Surveyor", "Instrument Mechanic", 
    "Information Technology", "Stenographer Hindi", "Stenographer English"
  ];

  useEffect(() => {
    const unsub = dbService.listenToCollection('notes', (cloudNotes) => {
      setNotes(cloudNotes);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filteredNotes = notes.filter(note => {
    const branchMatch = selectedBranch === 'All' || note.branch === selectedBranch;
    const searchMatch = (note.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || 
                        (note.subject?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    return branchMatch && searchMatch;
  });

  const getBranchIcon = (branch: string) => {
    const b = (branch || "").toLowerCase();
    if (b.includes('fitter') || b.includes('turner') || b.includes('machinist')) return <Wrench size={14} />;
    if (b.includes('electrician') || b.includes('wireman')) return <Zap size={14} />;
    if (b.includes('copa') || b.includes('it')) return <Monitor size={14} />;
    if (b.includes('welder')) return <Flame size={14} />;
    if (b.includes('diesel') || b.includes('motor')) return <Truck size={14} />;
    if (b.includes('civil') || b.includes('draughtsman')) return <Ruler size={14} />;
    if (b.includes('plumber')) return <Droplet size={14} />;
    if (b.includes('rac')) return <Wind size={14} />;
    if (b.includes('electronics')) return <Radio size={14} />;
    if (b.includes('steno')) return <Scissors size={14} />;
    if (b.includes('carpenter')) return <Hammer size={14} />;
    return <BookOpen size={14} />;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">ITI Trade Notes (Hindi Medium)</h1>
          <p className="text-gray-600 mt-2">सभी ट्रेड्स के प्रीमियम नोट्स - ट्रेड के नाम English में, पढ़ाई Hindi में।</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search Trade or Subject..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:col-span-4">
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white outline-none shadow-sm" value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                <option value="All">All Trades</option>
                {tradeOptions.map(trade => <option key={trade} value={trade}>{trade}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div key={note.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 group hover:border-blue-200 transition flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-lg bg-orange-50 text-orange-600">{getBranchIcon(note.branch)}</div>
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-50 text-blue-700">{note.semester}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">{note.title}</h3>
              <p className="text-sm text-gray-500 mb-4 flex-1">{note.subject}</p>
              <div className="flex gap-2 mt-auto">
                <a href={note.downloadUrl || (note as any).link} target="_blank" className="flex-1 py-2 text-sm font-medium bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center justify-center gap-2"><Eye size={16}/> View</a>
                <a href={note.downloadUrl || (note as any).link} target="_blank" className="flex-1 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition flex items-center justify-center gap-2 shadow-sm"><Download size={16}/> PDF</a>
              </div>
            </div>
          ))}
          {filteredNotes.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-400">
               <FileText size={48} className="mx-auto mb-4 opacity-20" />
               <p>No notes found in Cloud Database. Check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;