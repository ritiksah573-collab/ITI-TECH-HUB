
import React, { useState, useEffect } from 'react';
import { PenTool, BookOpen, FileQuestion, Search, FolderOpen, Zap, Settings, Monitor, Truck, Flame, Wrench, Hammer, Compass, Ruler, Scissors, Droplet, Download, Eye, FileText, HelpCircle, ArrowLeft, ChevronRight, AlertTriangle, Shield, CheckCircle, Info, XCircle, HeartPulse, Stethoscope, Calculator, Clock } from 'lucide-react';
import { jsPDF } from "jspdf";

// Default Trades for initial view
const defaultTrades = [
  { id: 'electrician', name: 'Electrician 1st Year', icon: Zap, color: 'text-yellow-600 bg-yellow-50' },
  { id: 'fitter', name: 'Fitter 1st Year', icon: Wrench, color: 'text-orange-600 bg-orange-50' }, 
  { id: 'copa', name: 'COPA 1st Year', icon: Monitor, color: 'text-purple-600 bg-purple-50' },
  { id: 'eng-drawing', name: 'Engineering Drawing', icon: Ruler, color: 'text-indigo-700 bg-indigo-50' },
  { id: 'workshop-calc', name: 'Workshop Science', icon: Calculator, color: 'text-emerald-700 bg-emerald-50' },
];

const HandWrittenNotes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Notes' | 'Questions'>('Notes');
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);
  const [dynamicNotes, setDynamicNotes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = () => {
      const stored = localStorage.getItem('iti_dynamic_handwritten');
      if (stored) {
        setDynamicNotes(JSON.parse(stored));
      }
    };
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  // Extract unique trades from dynamic data
  // Fix: Convert trade to string and cast Array.from result to string[] to avoid 'unknown' type issues
  const dynamicTrades = (Array.from(new Set(dynamicNotes.map(n => String(n.trade || '')))) as string[])
    .filter(name => name.length > 0)
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name: name,
      icon: BookOpen,
      color: 'text-blue-600 bg-blue-50'
    }));

  const allTrades = [...defaultTrades, ...dynamicTrades].filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);

  const handleTradeClick = (tradeName: string) => {
    setSelectedTrade(tradeName);
  };

  const notesForTrade = dynamicNotes.filter(n => n.trade === selectedTrade);

  if (selectedTrade) {
     return (
        <div className="bg-gray-50 min-h-screen py-10">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <button onClick={() => setSelectedTrade(null)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium mb-6">
                 <ArrowLeft size={18} /> Back to All Trades
              </button>

              <div className="flex items-center gap-4 mb-8">
                 <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                    <PenTool size={32} />
                 </div>
                 <div>
                    <h1 className="text-3xl font-bold text-gray-900">{selectedTrade} Notes</h1>
                    <p className="text-gray-600">Premium handwritten notes managed by Admin.</p>
                 </div>
              </div>

              <div className="grid gap-4">
                 {notesForTrade.length > 0 ? notesForTrade.map((note) => (
                    <div key={note.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition flex items-center justify-between group">
                       <div className="flex items-start gap-4">
                          <div className="p-3 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                             <FileText size={24} />
                          </div>
                          <div>
                             <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">{note.title}</h3>
                             <p className="text-sm text-gray-500 mt-1">{note.subject}</p>
                          </div>
                       </div>
                       <a href={note.link} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold hover:bg-blue-700 transition">
                          <Download size={18} /> View PDF
                       </a>
                    </div>
                 )) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-400">No notes uploaded for this trade yet. Please check back later or contact admin.</p>
                    </div>
                 )}
              </div>
           </div>
        </div>
     );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
           <div className="inline-block p-3 bg-purple-100 text-purple-600 rounded-full mb-4">
              <PenTool size={32} />
           </div>
           <h1 className="text-3xl font-bold text-gray-900">Hand Written Notes Portal</h1>
           <p className="text-gray-600 mt-2">Access high-quality topper handwritten notes digitized for ITI Students.</p>
        </div>

        <div className="max-w-2xl mx-auto mb-10 relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for your trade..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Fix: Cast t.name to string to resolve 'unknown' type error in toLowerCase() */}
            {allTrades.filter(t => (t.name as string).toLowerCase().includes(searchTerm.toLowerCase())).map((trade) => (
                <div 
                  key={trade.id} 
                  /* Fix: Cast trade.name to string to match handleTradeClick expected parameter type */
                  onClick={() => handleTradeClick(trade.name as string)}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition group cursor-pointer flex flex-col items-center text-center relative overflow-hidden"
                >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${trade.color}`}>
                        <trade.icon size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">{trade.name}</h3>
                    <div className="mt-2 text-xs font-bold text-gray-400 flex items-center gap-1">
                         <FolderOpen size={12} /> Click to Open
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HandWrittenNotes;
