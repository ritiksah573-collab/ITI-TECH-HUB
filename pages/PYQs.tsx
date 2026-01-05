
import React, { useState } from 'react';
import { Book, DownloadCloud, FileCheck, Zap, Settings, Building2, Monitor, Flame, Cpu, Search, Filter, Truck, Briefcase, Ruler, PenTool, Radio, Droplet, Wind, Scissors, Hammer } from 'lucide-react';

interface Paper {
  id: number;
  title: string;
  subject: string;
  category: 'ITI' | 'Govt Job';
  branch: string;
  year: string;
  board: string;
}

const allPapers: Paper[] = [
  // --- ITI ELECTRICIAN ---
  { id: 501, title: 'Electrician Trade Theory (Annual)', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Electrician', year: '2023', board: 'NCVT AITT' },
  { id: 502, title: 'Workshop Calculation & Science', subject: 'Workshop Calc', category: 'ITI', branch: 'ITI Electrician', year: '2022', board: 'NCVT' },
  { id: 503, title: 'Engineering Drawing - Electrician', subject: 'Engg Drawing', category: 'ITI', branch: 'ITI Electrician', year: '2023', board: 'SCVT' },

  // --- ITI FITTER ---
  { id: 601, title: 'Fitter Trade Theory (CBT Exam)', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Fitter', year: '2023', board: 'NCVT AITT' },
  { id: 603, title: 'Engineering Drawing - Fitter', subject: 'Engg Drawing', category: 'ITI', branch: 'ITI Fitter', year: '2023', board: 'SCVT' },

  // --- ITI COPA ---
  { id: 701, title: 'COPA Trade Theory', subject: 'Trade Theory', category: 'ITI', branch: 'ITI COPA', year: '2023', board: 'NCVT' },
  { id: 702, title: 'Employability Skills - 1st Year', subject: 'Employability Skills', category: 'ITI', branch: 'ITI COPA', year: '2022', board: 'NCVT' },

  // --- ITI WELDER ---
  { id: 801, title: 'Welder Trade Theory (Semester 1)', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Welder', year: '2023', board: 'NCVT' },

  // --- ITI DIESEL MECHANIC ---
  { id: 901, title: 'Diesel Mechanic Trade Theory', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Diesel Mechanic', year: '2022', board: 'NCVT' },

  // --- NEW TRADES PAPERS ---
  { id: 1201, title: 'Wireman Trade Theory', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Wireman', year: '2023', board: 'NCVT' },
  { id: 1301, title: 'Turner Trade Theory', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Turner', year: '2023', board: 'NCVT' },
  { id: 1401, title: 'Machinist Trade Theory', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Machinist', year: '2023', board: 'NCVT' },
  { id: 1501, title: 'Draughtsman Civil Theory', subject: 'Trade Theory', category: 'ITI', branch: 'Draughtsman Civil', year: '2022', board: 'NCVT' },
  { id: 1601, title: 'Motor Mechanic Vehicle (MMV) Theory', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Motor Mechanic', year: '2023', board: 'NCVT' },
  { id: 1701, title: 'RAC Trade Theory', subject: 'Trade Theory', category: 'ITI', branch: 'ITI RAC', year: '2023', board: 'NCVT' },
  { id: 1801, title: 'Plumber Trade Theory', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Plumber', year: '2022', board: 'SCVT' },

  // --- GOVT JOB PAPERS ---
  { id: 1001, title: 'RRB ALP - Stage 2 Technical Part B', subject: 'Technical', category: 'Govt Job', branch: 'All ITI Trades', year: '2019', board: 'RRB' },
  { id: 1003, title: 'DRDO CEPTAM 10 - Technician A', subject: 'Fitter/Electrician', category: 'Govt Job', branch: 'ITI Trades', year: '2022', board: 'DRDO' },
  { id: 1010, title: 'IOCL Apprentice Exam', subject: 'Technical', category: 'Govt Job', branch: 'ITI Trades', year: '2023', board: 'IOCL' },
];

const PYQs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');

  const tradeOptions = [
    "ITI Electrician", "ITI Fitter", "ITI COPA", "ITI Welder", "ITI Diesel Mechanic", 
    "ITI Motor Mechanic", "ITI Wireman", "ITI Turner", "ITI Machinist", 
    "Draughtsman Civil", "Draughtsman Mech", "Electronics Mechanic", "ITI RAC", 
    "ITI Plumber", "ITI Carpenter", "ITI Surveyor", "Instrument Mechanic"
  ];

  const filteredPapers = allPapers.filter(paper => {
    const searchMatch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        paper.board.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === 'All' || paper.category === selectedCategory;
    
    let branchMatch = true;
    if (selectedBranch !== 'All') {
        if (selectedBranch === 'ITI Trades') branchMatch = paper.category === 'ITI';
        else if (selectedBranch === 'Govt Job') branchMatch = paper.category === 'Govt Job';
        else branchMatch = paper.branch.includes(selectedBranch);
    }

    return searchMatch && categoryMatch && branchMatch;
  });

  const getIconForPaper = (branch: string) => {
    const b = branch.toLowerCase();
    if (b.includes('electrician') || b.includes('wireman')) return <Zap size={24} />;
    if (b.includes('fitter') || b.includes('turner') || b.includes('machinist')) return <Settings size={24} />;
    if (b.includes('civil') || b.includes('draughtsman')) return <Building2 size={24} />;
    if (b.includes('copa') || b.includes('it')) return <Monitor size={24} />;
    if (b.includes('welder')) return <Flame size={24} />;
    if (b.includes('electronics') || b.includes('radio')) return <Radio size={24} />;
    if (b.includes('diesel') || b.includes('motor')) return <Truck size={24} />;
    if (b.includes('plumber')) return <Droplet size={24} />;
    if (b.includes('rac')) return <Wind size={24} />;
    if (b.includes('carpenter')) return <Hammer size={24} />;
    if (b.includes('steno')) return <Scissors size={24} />;
    return <FileCheck size={24} />;
  }

  const handleDownload = (paper: Paper) => {
    const blob = new Blob(["Question Paper Content Loading..."], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${paper.subject.replace(/[^a-zA-Z0-9]/g, '_')}_${paper.year}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
           <h1 className="text-3xl font-bold text-gray-900">ITI & Trade Papers</h1>
           <p className="text-gray-600 mt-2">Access NCVT, SCVT and Competitive Exam Papers for ITI Students.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
             <div className="md:col-span-4 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by subject, trade or board..." 
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>

             <div className="md:col-span-4">
                <div className="relative">
                   <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
                   <select 
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white cursor-pointer"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                   >
                      <option value="All">All Categories</option>
                      <option value="ITI">ITI (NCVT/SCVT)</option>
                      <option value="Govt Job">Govt Job Exams</option>
                   </select>
                </div>
             </div>

             <div className="md:col-span-4">
                <div className="relative">
                   <Settings className="absolute left-3 top-3 text-gray-400" size={18} />
                   <select 
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white cursor-pointer"
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                   >
                      <option value="All">All Trades</option>
                      {tradeOptions.map(trade => <option key={trade} value={trade}>{trade}</option>)}
                      <option value="Govt Job">Govt Exams Only</option>
                   </select>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
           <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Available Papers ({filteredPapers.length})</h3>
           </div>
           
           <div className="divide-y divide-gray-100">
              {filteredPapers.length > 0 ? (
                  filteredPapers.map((paper) => (
                     <div key={paper.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-gray-50 transition group">
                        <div className="flex items-start gap-4 mb-4 sm:mb-0">
                           <div className={`p-3 rounded-lg ${
                              paper.category === 'ITI' ? 'bg-orange-50 text-orange-600' : 
                              paper.category === 'Govt Job' ? 'bg-green-50 text-green-600' : 
                              'bg-blue-50 text-blue-600'
                           } group-hover:scale-110 transition-transform`}>
                              {getIconForPaper(paper.branch)}
                           </div>
                           <div>
                              <h4 className="font-bold text-gray-900 text-lg">{paper.title}</h4>
                              <p className="text-sm text-gray-500">{paper.subject} • {paper.branch}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                 <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">{paper.board}</span>
                                 <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">{paper.year}</span>
                                 <span className={`text-xs font-semibold px-2 py-1 rounded border ${
                                     paper.category === 'ITI' ? 'bg-orange-100 text-orange-700 border-orange-200' : 
                                     'bg-green-100 text-green-700 border-green-200'
                                 }`}>
                                     {paper.category}
                                 </span>
                              </div>
                           </div>
                        </div>
                        <button 
                          onClick={() => handleDownload(paper)}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition shadow-sm"
                        >
                           <DownloadCloud size={18} /> Download
                        </button>
                     </div>
                  ))
              ) : (
                  <div className="p-12 text-center text-gray-500">
                      <FileCheck size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-lg">No papers found matching your criteria.</p>
                      <button onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setSelectedBranch('All')}} className="mt-2 text-blue-600 hover:underline">Clear Filters</button>
                  </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default PYQs;
