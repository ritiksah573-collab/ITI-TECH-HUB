import React, { useState } from 'react';
import { Book, DownloadCloud, FileCheck, Zap, Settings, Building2, Monitor, Flame, Cpu, Search, Filter, Truck, Briefcase, Ruler, PenTool, Radio } from 'lucide-react';

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
  // =================================================================================
  // ITI TRADES PAPERS
  // =================================================================================

  // --- ITI ELECTRICIAN ---
  { id: 501, title: 'Electrician Trade Theory (Annual)', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Electrician', year: '2023', board: 'NCVT AITT' },
  { id: 502, title: 'Workshop Calculation & Science', subject: 'Workshop Calc', category: 'ITI', branch: 'ITI Electrician', year: '2022', board: 'NCVT' },
  { id: 503, title: 'Engineering Drawing - Electrician', subject: 'Engg Drawing', category: 'ITI', branch: 'ITI Electrician', year: '2023', board: 'SCVT' },
  { id: 504, title: 'Electrician Practical (Semester 1)', subject: 'Practical', category: 'ITI', branch: 'ITI Electrician', year: '2021', board: 'NCVT' },

  // --- ITI FITTER ---
  { id: 601, title: 'Fitter Trade Theory (CBT Exam)', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Fitter', year: '2023', board: 'NCVT AITT' },
  { id: 602, title: 'Fitter Workshop Calculation', subject: 'Workshop Calc', category: 'ITI', branch: 'ITI Fitter', year: '2022', board: 'NCVT' },
  { id: 603, title: 'Engineering Drawing - Fitter', subject: 'Engg Drawing', category: 'ITI', branch: 'ITI Fitter', year: '2023', board: 'SCVT' },
  { id: 604, title: 'Fitter Practical Exam Paper', subject: 'Practical', category: 'ITI', branch: 'ITI Fitter', year: '2022', board: 'NCVT' },

  // --- ITI COPA ---
  { id: 701, title: 'COPA Trade Theory', subject: 'Trade Theory', category: 'ITI', branch: 'ITI COPA', year: '2023', board: 'NCVT' },
  { id: 702, title: 'Employability Skills - 1st Year', subject: 'Employability Skills', category: 'ITI', branch: 'ITI COPA', year: '2022', board: 'NCVT' },
  { id: 703, title: 'Database & JavaScript', subject: 'Programming', category: 'ITI', branch: 'ITI COPA', year: '2021', board: 'NCVT' },

  // --- ITI WELDER ---
  { id: 801, title: 'Welder Trade Theory (Semester 1)', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Welder', year: '2023', board: 'NCVT' },
  { id: 802, title: 'Welding Fabrication Practical', subject: 'Practical', category: 'ITI', branch: 'ITI Welder', year: '2022', board: 'SCVT' },

  // --- ITI DIESEL MECHANIC ---
  { id: 901, title: 'Diesel Mechanic Trade Theory', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Diesel Mech', year: '2022', board: 'NCVT' },
  { id: 902, title: 'Diesel Engine Workshop Science', subject: 'Workshop Calc', category: 'ITI', branch: 'ITI Diesel Mech', year: '2023', board: 'NCVT' },

  // --- ITI WIREMAN (NEW) ---
  { id: 1201, title: 'Wireman Trade Theory', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Wireman', year: '2023', board: 'NCVT' },
  { id: 1202, title: 'Domestic Wiring Practical', subject: 'Practical', category: 'ITI', branch: 'ITI Wireman', year: '2022', board: 'SCVT' },

  // --- ITI TURNER (NEW) ---
  { id: 1301, title: 'Turner Trade Theory', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Turner', year: '2023', board: 'NCVT' },
  { id: 1302, title: 'Lathe Operations Practical', subject: 'Practical', category: 'ITI', branch: 'ITI Turner', year: '2021', board: 'NCVT' },

  // --- ITI MACHINIST (NEW) ---
  { id: 1401, title: 'Machinist Trade Theory', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Machinist', year: '2023', board: 'NCVT' },

  // --- ITI DRAUGHTSMAN (NEW) ---
  { id: 1501, title: 'Draughtsman Civil Theory', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Draughtsman', year: '2022', board: 'NCVT' },
  { id: 1502, title: 'Draughtsman Mechanical Theory', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Draughtsman', year: '2023', board: 'NCVT' },

  // --- ITI MOTOR MECHANIC (NEW) ---
  { id: 1601, title: 'Motor Mechanic Vehicle (MMV) Theory', subject: 'Trade Theory', category: 'ITI', branch: 'ITI Motor Mech', year: '2023', board: 'NCVT' },

  // =================================================================================
  // GOVT JOB PAPERS (ITI RELEVANT)
  // =================================================================================
  { id: 1001, title: 'RRB ALP - Stage 2 Technical Part B', subject: 'Technical', category: 'Govt Job', branch: 'All ITI Trades', year: '2019', board: 'RRB' },
  { id: 1003, title: 'DRDO CEPTAM 10 - Technician A', subject: 'Fitter/Electrician', category: 'Govt Job', branch: 'ITI Trades', year: '2022', board: 'DRDO' },
  { id: 1010, title: 'IOCL Apprentice Exam', subject: 'Technical', category: 'Govt Job', branch: 'ITI Trades', year: '2023', board: 'IOCL' },
  { id: 1008, title: 'Railway Technician Gr. III', subject: 'Technical', category: 'Govt Job', branch: 'ITI Trades', year: '2018', board: 'RRB' },
  { id: 1011, title: 'ISRO Technician B (Electrician)', subject: 'Trade Theory', category: 'Govt Job', branch: 'ITI Electrician', year: '2021', board: 'ISRO' },
];

const PYQs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');

  const filteredPapers = allPapers.filter(paper => {
    const searchMatch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        paper.board.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === 'All' || paper.category === selectedCategory;
    
    // Branch filtering logic
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
    if (b.includes('electrician') || b.includes('electrical') || b.includes('wireman')) return <Zap size={24} />;
    if (b.includes('fitter') || b.includes('mechanical') || b.includes('turner') || b.includes('machinist') || b.includes('diesel')) return <Settings size={24} />;
    if (b.includes('civil') || b.includes('draughtsman')) return <Building2 size={24} />;
    if (b.includes('computer') || b.includes('copa')) return <Monitor size={24} />;
    if (b.includes('welder')) return <Flame size={24} />;
    if (b.includes('electronics') || b.includes('isro') || b.includes('vlsi')) return <Cpu size={24} />;
    if (b.includes('diesel') || b.includes('motor')) return <Truck size={24} />;
    if (b.includes('govt') || b.includes('job') || b.includes('rrb')) return <Briefcase size={24} />;
    return <FileCheck size={24} />;
  }

  const getPaperContent = (paper: Paper): string => {
    const subject = paper.subject.toLowerCase();
    const branch = paper.branch.toLowerCase();
    
    // ITI Questions
    
    const elecQuestions = `
SECTION A (Objective - 2 Marks Each)
1. The unit of Capacitance is:
   a) Henry  b) Farad  c) Ohm  d) Watt
2. Which motor is used in a ceiling fan?
   a) Universal b) Capacitor Start c) Permanent Capacitor d) Shaded Pole
3. In a DC series motor, if load increases, speed:
   a) Increases b) Decreases c) Remains same d) Becomes zero
4. Ideally, the internal resistance of a voltmeter should be:
   a) Zero b) Infinite c) 100 Ohm d) Very Low
5. Which fault is detected by Buchholz Relay?
   a) Internal transformer fault b) Line fault c) Cable fault

SECTION B (Subjective)
1. Explain the working of a Transformer.
2. Draw the circuit diagram of a Staircase Wiring.
3. State Kirchhoff's Laws (KCL and KVL).
4. Describe the method of Plate Earthing.
5. Explain the working principle of a DC Generator.
`;

    const fitterQuestions = `
SECTION A (Objective)
1. Which file is used for filing wood and leather?
   a) Rasp cut b) Single cut c) Double cut d) Curved cut
2. Least count of a Vernier Caliper is:
   a) 0.10 mm b) 0.01 mm c) 0.02 mm d) 0.05 mm
3. The coolant used for drilling aluminium is:
   a) Soluble oil b) Kerosene c) Water d) Soda water
4. Included angle of a Lathe center is:
   a) 30 deg b) 45 deg c) 60 deg d) 90 deg

SECTION B (Theory)
1. Explain the different parts of a Lathe Machine.
2. Describe the process of Heat Treatment of Steel.
3. What is a Micrometer? Draw a neat sketch.
4. Explain the safety precautions to be taken in a workshop.
5. Differentiate between Drilling and Reaming.
`;

    const welderQuestions = `
SECTION A (Objective)
1. Which flame is used for welding brass?
   a) Neutral b) Oxidizing c) Carburizing d) None
2. The colour of the Oxygen cylinder is:
   a) Red b) Black c) Maroon d) White
3. TIG welding uses which electrode?
   a) Consumable b) Non-consumable Tungsten c) Copper

SECTION B (Theory)
1. Explain the principle of Arc Welding.
2. What are the defects in Welding?
3. Differentiate between TIG and MIG welding.
4. List the safety equipment used in Welding.
5. Explain the polarity in DC Welding.
`;

    const copaQuestions = `
SECTION A (Objective)
1. RAM stands for:
   a) Read Access Memory b) Random Access Memory c) Read Any Memory
2. Which tag is used for hyperlink in HTML?
   a) <a> b) <link> c) <href>
3. Shortcut for Copy command is:
   a) Ctrl+C b) Ctrl+V c) Ctrl+X

SECTION B (Theory)
1. Explain the different generations of computers.
2. What is MS Office? Explain its components.
3. Write a JavaScript function to validate an email form.
4. Explain the concept of Cloud Computing.
5. What is E-Commerce? Explain its types.
`;

    let content = `
${paper.board} - ${paper.year}
EXAM: ${paper.title.toUpperCase()}
SUBJECT: ${paper.subject.toUpperCase()}
TRADE: ${paper.branch.toUpperCase()}
Max Marks: 100 | Time: 2 Hours
================================================================

INSTRUCTIONS:
1. All questions are compulsory.
2. Figures to the right indicate full marks.
================================================================
`;

    if (branch.includes('copa')) {
        content += copaQuestions;
    } else if (branch.includes('fitter') || branch.includes('turner') || branch.includes('machinist') || branch.includes('diesel') || branch.includes('motor')) {
        content += fitterQuestions;
    } else if (branch.includes('electrical') || branch.includes('electrician') || branch.includes('wireman')) {
        content += elecQuestions;
    } else if (branch.includes('welder')) {
        content += welderQuestions;
    } else {
        // Generic fallback
        content += `
SECTION A - OBJECTIVE TYPE
Q1. Attempt any TEN of the following (2 Marks each).
   a) Question 1...
   b) Question 2...

SECTION B - SHORT ANSWER
Q2. Explain the working principle with a neat diagram.
Q3. State the advantages and disadvantages.
Q4. Define the basic terms related to ${paper.subject}.

SECTION C - LONG ANSWER
Q5. Describe in detail the construction and working.
`;
    }

    content += `
================================================================
* End of Paper *
    `;
    return content;
  };

  const handleDownload = (paper: Paper) => {
    const fileContent = getPaperContent(paper);
    const blob = new Blob([fileContent], { type: 'text/plain' });
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

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
             {/* Search */}
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

             {/* Category Filter */}
             <div className="md:col-span-4">
                <div className="relative">
                   <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
                   <select 
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white cursor-pointer"
                      value={selectedCategory}
                      onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          if(e.target.value === 'Govt Job') setSelectedBranch('Govt Job');
                          else setSelectedBranch('All');
                      }}
                   >
                      <option value="All">All Categories</option>
                      <option value="ITI">ITI (NCVT/SCVT)</option>
                      <option value="Govt Job">Govt Job Exams</option>
                   </select>
                </div>
             </div>

             {/* Branch Filter */}
             <div className="md:col-span-4">
                <div className="relative">
                   <Settings className="absolute left-3 top-3 text-gray-400" size={18} />
                   <select 
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white cursor-pointer"
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                   >
                      <option value="All">All Trades</option>
                      <option value="Electrician">Electrician</option>
                      <option value="Fitter">Fitter</option>
                      <option value="COPA">COPA</option>
                      <option value="Welder">Welder</option>
                      <option value="Diesel">Diesel Mechanic</option>
                      <option value="Wireman">Wireman</option>
                      <option value="Govt Job">Govt Exams</option>
                   </select>
                </div>
             </div>
          </div>
        </div>

        {/* Papers List */}
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