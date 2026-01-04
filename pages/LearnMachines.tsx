
import React, { useState, useEffect } from 'react';
import { MonitorPlay, Search, Filter, Wrench, Settings, Play } from 'lucide-react';

interface MachineTutorial {
  id: number;
  title: string;
  trade: string;
  category: string;
  description: string;
  searchQuery: string;
}

const defaultTutorials: MachineTutorial[] = [
  { id: 1, title: 'Lathe Machine Operations', trade: 'Fitter / Turner', category: 'Mechanical', description: 'Facing, plain turning, and step turning.', searchQuery: 'How to operate Lathe Machine ITI' },
  { id: 30, title: 'Digital Multimeter', trade: 'Electrician', category: 'Electrical', description: 'Testing Voltage and Resistance.', searchQuery: 'How to use digital multimeter' }
];

const LearnMachines: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tutorials, setTutorials] = useState<MachineTutorial[]>([]);

  useEffect(() => {
    const load = () => {
      const stored = localStorage.getItem('iti_dynamic_machines');
      const dynamic = stored ? JSON.parse(stored) : [];
      setTutorials([...dynamic, ...defaultTutorials]);
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const filteredTutorials = tutorials.filter(tut => (tut.title || "").toLowerCase().includes(searchTerm.toLowerCase()) || (tut.trade || "").toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-orange-100 text-orange-600 rounded-full mb-4"><MonitorPlay size={32} /></div>
          <h1 className="text-3xl font-bold text-gray-900">Machine Lab</h1>
          <p className="text-gray-600 mt-2">Industrial Machine & Tools Practical Library.</p>
        </div>

        <div className="max-w-3xl mx-auto mb-10 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input type="text" placeholder="Search Machine (e.g. Lathe, Multimeter)..." className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {filteredTutorials.map((tut) => (
             <div key={tut.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition flex flex-col group h-full">
                <div className="relative pt-[56.25%] bg-black">
                   <iframe className="absolute top-0 left-0 w-full h-full" src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(tut.searchQuery)}`} title={tut.title} frameBorder="0" allowFullScreen></iframe>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                   <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition">{tut.title}</h3>
                   <p className="text-gray-500 text-sm mb-4 line-clamp-2">{tut.description}</p>
                   <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">{tut.trade}</span>
                      <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(tut.searchQuery)}`} target="_blank" className="text-red-600 font-bold text-xs flex items-center gap-1 hover:underline"><Play size={12} fill="currentColor"/> Watch on YT</a>
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
