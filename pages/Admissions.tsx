import React, { useState } from 'react';
import { Calendar, MapPin, ExternalLink, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface AdmissionUpdate {
  id: number;
  examName: string;
  state: string;
  type: 'ITI';
  status: 'Active' | 'Upcoming' | 'Closed';
  startDate: string;
  endDate: string;
  applyLink: string;
  description: string;
}

const admissionData: AdmissionUpdate[] = [
  // ================= ITI ADMISSIONS 2026 =================
  {
    id: 101,
    examName: 'UP ITI Admission 2026',
    state: 'Uttar Pradesh',
    type: 'ITI',
    status: 'Upcoming',
    startDate: 'June 2026',
    endDate: 'July 2026',
    applyLink: 'http://www.scvtup.in/',
    description: 'State Council for Vocational Training (SCVT) UP admission based on merit.'
  },
  {
    id: 102,
    examName: 'Bihar ITICAT 2026',
    state: 'Bihar',
    type: 'ITI',
    status: 'Upcoming',
    startDate: 'April 2026',
    endDate: 'May 2026',
    applyLink: 'https://bceceboard.bihar.gov.in/',
    description: 'Industrial Training Institute Competitive Admission Test for Bihar ITIs.'
  },
  {
    id: 103,
    examName: 'Maharashtra ITI Admission 2026',
    state: 'Maharashtra',
    type: 'ITI',
    status: 'Upcoming',
    startDate: 'June 2026',
    endDate: 'July 2026',
    applyLink: 'https://admission.dvet.gov.in/',
    description: 'Centralized online admission process for Government and Private ITIs.'
  },
  {
    id: 104,
    examName: 'Rajasthan ITI Admission 2026',
    state: 'Rajasthan',
    type: 'ITI',
    status: 'Upcoming',
    startDate: 'May 2026',
    endDate: 'June 2026',
    applyLink: 'http://livelihoods.rajasthan.gov.in/',
    description: 'Directorate of Technical Education (DTE) Rajasthan ITI admissions.'
  },
  {
    id: 105,
    examName: 'MP ITI Admission 2026',
    state: 'Madhya Pradesh',
    type: 'ITI',
    status: 'Upcoming',
    startDate: 'May 2026',
    endDate: 'June 2026',
    applyLink: 'https://iti.mponline.gov.in/',
    description: 'Online counselling and admission for MP Govt ITIs.'
  },
  {
    id: 106,
    examName: 'West Bengal ITI (M-Group/E-Group) 2026',
    state: 'West Bengal',
    type: 'ITI',
    status: 'Upcoming',
    startDate: 'March 2026',
    endDate: 'May 2026',
    applyLink: 'https://scvtwb.in/',
    description: 'Common Entrance Test (CET) for ITI admission in WB.'
  },
  {
    id: 107,
    examName: 'Delhi ITI Admission 2026',
    state: 'Delhi',
    type: 'ITI',
    status: 'Upcoming',
    startDate: 'June 2026',
    endDate: 'July 2026',
    applyLink: 'https://itidelhi.admissions.nic.in/',
    description: 'Online admission for Government ITIs in Delhi.'
  },
  {
    id: 108,
    examName: 'Jharkhand ITI Admission 2026',
    state: 'Jharkhand',
    type: 'ITI',
    status: 'Upcoming',
    startDate: 'April 2026',
    endDate: 'May 2026',
    applyLink: 'https://iti.jharkhand.gov.in/',
    description: 'Admission based on 8th/10th Merit list.'
  },
  {
    id: 109,
    examName: 'Haryana ITI Admission 2026',
    state: 'Haryana',
    type: 'ITI',
    status: 'Upcoming',
    startDate: 'June 2026',
    endDate: 'July 2026',
    applyLink: 'https://admissions.itiharyana.gov.in/',
    description: 'Online counseling for ITI trades in Haryana.'
  },
  {
    id: 110,
    examName: 'Punjab ITI Admission 2026',
    state: 'Punjab',
    type: 'ITI',
    status: 'Upcoming',
    startDate: 'June 2026',
    endDate: 'July 2026',
    applyLink: 'http://itipunjab.nic.in/',
    description: 'Merit based admission for Punjab ITIs.'
  }
];

const Admissions: React.FC = () => {
  const [filterState, setFilterState] = useState('All');

  const states = Array.from(new Set(admissionData.map(item => item.state))).sort();

  const filteredData = admissionData.filter(item => {
    const stateMatch = filterState === 'All' || item.state === filterState;
    return stateMatch;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200';
      case 'Upcoming': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Closed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">ITI Admission 2026-27</h1>
          <p className="text-gray-600 mt-2">
            Online Admission Forms & Counseling Updates for Government ITI Colleges.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="text-gray-700 font-medium">
               Select State for Admission Updates:
           </div>
           
           <div className="w-full md:w-64">
              <select 
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer"
                 value={filterState}
                 onChange={(e) => setFilterState(e.target.value)}
              >
                 <option value="All">All States</option>
                 {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                 ))}
              </select>
           </div>
        </div>

        {/* Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredData.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col h-full relative overflow-hidden group">
                 {/* Status Badge */}
                 <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-xs font-bold border-b border-l ${getStatusColor(item.status)}`}>
                    {item.status.toUpperCase()}
                 </div>
                 
                 <div className="p-6 flex-1">
                    <div className="mb-4">
                       <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 bg-orange-100 text-orange-700`}>
                          {item.type}
                       </span>
                       <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                          {item.examName}
                       </h3>
                       <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                          <MapPin size={14} /> {item.state}
                       </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                       {item.description}
                    </p>

                    <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                       <div className="flex justify-between items-center">
                          <span className="text-gray-500 flex items-center gap-1"><Calendar size={14}/> Start Date:</span>
                          <span className="font-medium text-gray-800">{item.startDate}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-gray-500 flex items-center gap-1"><Clock size={14}/> End Date:</span>
                          <span className="font-medium text-red-600">{item.endDate}</span>
                       </div>
                    </div>
                 </div>

                 <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <a 
                       href={item.applyLink} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold transition ${
                          item.status === 'Closed' 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow'
                       }`}
                       onClick={(e) => {
                          if (item.status === 'Closed') e.preventDefault();
                       }}
                    >
                       {item.status === 'Active' ? 'Apply Now' : item.status === 'Upcoming' ? 'View Details' : 'Closed'} 
                       <ExternalLink size={16} />
                    </a>
                 </div>
              </div>
           ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start gap-4">
           <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0">
              <AlertCircle size={24} />
           </div>
           <div>
              <h4 className="text-lg font-bold text-blue-900 mb-1">Stay Updated!</h4>
              <p className="text-blue-700">
                 Admission dates are tentative and based on the previous year's cycle. 
                 Official notifications for 2026-27 will be released by respective state boards starting January 2026.
                 Join our WhatsApp channel for instant alerts.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Admissions;