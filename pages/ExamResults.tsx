import React, { useState } from 'react';
import { Calendar, CheckCircle, ExternalLink, Filter, MapPin, Award, Clock, AlertTriangle, FileText, Download } from 'lucide-react';

interface ExamUpdate {
  id: number;
  title: string;
  board: string; // NCVT or SCVT
  state: string;
  type: 'Schedule' | 'Result';
  date: string;
  status: 'Released' | 'Upcoming' | 'Live' | 'Delayed';
  link: string;
  description: string;
}

const examData: ExamUpdate[] = [
  // ================= EXAM SCHEDULES (ALL STATES) =================
  {
    id: 1,
    title: 'NCVT AITT CTS Annual Exam Time Table 2026',
    board: 'NCVT',
    state: 'All India',
    type: 'Schedule',
    date: 'July 2026',
    status: 'Upcoming',
    link: 'https://ncvtmis.gov.in/',
    description: 'Computer Based Test (CBT) and Practical exam dates for 1st & 2nd Year trainees.'
  },
  {
    id: 2,
    title: 'UP ITI Semester Exam Date Sheet',
    board: 'SCVT UP',
    state: 'Uttar Pradesh',
    type: 'Schedule',
    date: 'June 2026',
    status: 'Upcoming',
    link: 'http://www.scvtup.in/',
    description: 'Final semester exams for all SCVT private and govt colleges in UP.'
  },
  {
    id: 3,
    title: 'Bihar ITI Practical Exam Schedule',
    board: 'BCECE',
    state: 'Bihar',
    type: 'Schedule',
    date: 'May 2026',
    status: 'Upcoming',
    link: 'https://bceceboard.bihar.gov.in/',
    description: 'Home center practical exam dates for Electrician & Fitter trades.'
  },
  {
    id: 4,
    title: 'Rajasthan ITI Supplementary Exam',
    board: 'SCVT Raj',
    state: 'Rajasthan',
    type: 'Schedule',
    date: 'March 2026',
    status: 'Live',
    link: 'http://livelihoods.rajasthan.gov.in/',
    description: 'Supplementary exams for back-paper students (Engineering Drawing/Practical).'
  },
  {
    id: 5,
    title: 'Maharashtra ITI (DVET) Time Table',
    board: 'DVET',
    state: 'Maharashtra',
    type: 'Schedule',
    date: 'August 2026',
    status: 'Upcoming',
    link: 'https://dvet.gov.in/',
    description: 'Annual pattern exams for 2-year trades.'
  },
  {
    id: 6,
    title: 'MP ITI Annual Exam Dates 2026',
    board: 'DSD MP',
    state: 'Madhya Pradesh',
    type: 'Schedule',
    date: 'July 2026',
    status: 'Upcoming',
    link: 'https://mpskills.gov.in/',
    description: 'Theory and Practical exam dates for MP SCVT trades.'
  },
  {
    id: 7,
    title: 'Haryana ITI Semester Exam Schedule',
    board: 'SDIT Haryana',
    state: 'Haryana',
    type: 'Schedule',
    date: 'June 2026',
    status: 'Upcoming',
    link: 'https://skilldevelopmentharyana.org/',
    description: 'Date sheet for 4th Semester and Annual system exams.'
  },
  {
    id: 8,
    title: 'Punjab ITI Final Exam Date Sheet',
    board: 'DTE Punjab',
    state: 'Punjab',
    type: 'Schedule',
    date: 'July 2026',
    status: 'Upcoming',
    link: 'http://itipunjab.nic.in/',
    description: 'Regular and Re-appear exam schedule for Punjab ITI students.'
  },
  {
    id: 9,
    title: 'Gujarat ITI GCVT Exam Schedule',
    board: 'GCVT',
    state: 'Gujarat',
    type: 'Schedule',
    date: 'June 2026',
    status: 'Upcoming',
    link: 'https://iti.gujarat.gov.in/',
    description: 'Gujarat Council for Vocational Training (GCVT) exam time table.'
  },
  {
    id: 10,
    title: 'Karnataka ITI Annual Exam Dates',
    board: 'DET Karnataka',
    state: 'Karnataka',
    type: 'Schedule',
    date: 'July 2026',
    status: 'Upcoming',
    link: 'https://empy.karnataka.gov.in/',
    description: 'Exam schedule for CTS trades in Karnataka.'
  },
  {
    id: 11,
    title: 'Tamil Nadu ITI Exam Time Table',
    board: 'DET TN',
    state: 'Tamil Nadu',
    type: 'Schedule',
    date: 'August 2026',
    status: 'Upcoming',
    link: 'https://skilltraining.tn.gov.in/',
    description: 'Schedule for Government and Private ITI exams in TN.'
  },
  {
    id: 12,
    title: 'West Bengal ITI Semester Routine',
    board: 'WBSCVT',
    state: 'West Bengal',
    type: 'Schedule',
    date: 'June 2026',
    status: 'Upcoming',
    link: 'https://scvtwb.in/',
    description: 'Routine for E-Group and M-Group semester exams.'
  },
  {
    id: 13,
    title: 'Odisha ITI Trade Test Schedule',
    board: 'DTET Odisha',
    state: 'Odisha',
    type: 'Schedule',
    date: 'July 2026',
    status: 'Upcoming',
    link: 'http://dtetodisha.gov.in/',
    description: 'All India Trade Test (AITT) schedule for Odisha trainees.'
  },
  {
    id: 14,
    title: 'Jharkhand ITI Annual Exam Dates',
    board: 'DECT Jharkhand',
    state: 'Jharkhand',
    type: 'Schedule',
    date: 'June 2026',
    status: 'Upcoming',
    link: 'https://iti.jharkhand.gov.in/',
    description: 'Examination notice for Regular/Ex-Regular candidates.'
  },
   {
    id: 15,
    title: 'Kerala ITI Exam Notification',
    board: 'DET Kerala',
    state: 'Kerala',
    type: 'Schedule',
    date: 'July 2026',
    status: 'Upcoming',
    link: 'https://det.kerala.gov.in/',
    description: 'Notification regarding NCVT/SCVT exam dates.'
  },
  {
    id: 16,
    title: 'Andhra Pradesh ITI Time Table',
    board: 'DET AP',
    state: 'Andhra Pradesh',
    type: 'Schedule',
    date: 'June 2026',
    status: 'Upcoming',
    link: 'https://iti.ap.gov.in/',
    description: 'Exam schedule for engineering and non-engineering trades.'
  },
  {
    id: 17,
    title: 'Telangana ITI Exam Dates',
    board: 'DET Telangana',
    state: 'Telangana',
    type: 'Schedule',
    date: 'July 2026',
    status: 'Upcoming',
    link: 'https://iti.telangana.gov.in/',
    description: 'CBT and Practical exam dates for Telangana ITIs.'
  },
  {
    id: 18,
    title: 'Delhi ITI Final Exam Schedule',
    board: 'DTTE Delhi',
    state: 'Delhi',
    type: 'Schedule',
    date: 'July 2026',
    status: 'Upcoming',
    link: 'https://itidelhi.admissions.nic.in/',
    description: 'Tentative dates for Delhi ITI annual exams.'
  },
   {
    id: 19,
    title: 'Uttarakhand ITI Semester Dates',
    board: 'DTE Uttarakhand',
    state: 'Uttarakhand',
    type: 'Schedule',
    date: 'June 2026',
    status: 'Upcoming',
    link: 'https://ukiti.nic.in/',
    description: 'Exam program for semester system trainees.'
  },
   {
    id: 20,
    title: 'Chhattisgarh ITI Time Table',
    board: 'DTE Chhattisgarh',
    state: 'Chhattisgarh',
    type: 'Schedule',
    date: 'May 2026',
    status: 'Upcoming',
    link: 'https://cgiti.cgstate.gov.in/',
    description: 'Annual exam schedule for CG ITI students.'
  },


  // ================= RESULTS (ALL STATES) =================
  {
    id: 50,
    title: 'NCVT AITT Annual Result 2025',
    board: 'NCVT',
    state: 'All India',
    type: 'Result',
    date: 'Declared: 15 Aug 2025',
    status: 'Released',
    link: 'https://ncvtmis.gov.in/Pages/MarkSheet/Validate.aspx',
    description: 'Final results for Session 2023-25 & 2024-25. Check Marksheet.'
  },
  {
    id: 51,
    title: 'MP ITI Training Officer Result',
    board: 'ESB MP',
    state: 'Madhya Pradesh',
    type: 'Result',
    date: 'Declared: Jan 2026',
    status: 'Released',
    link: 'https://esb.mp.gov.in/',
    description: 'Recruitment test results for TO vacancies.'
  },
  {
    id: 52,
    title: 'Bihar ITICAT 2026 Entrance Result',
    board: 'BCECE',
    state: 'Bihar',
    type: 'Result',
    date: 'Expected: June 2026',
    status: 'Upcoming',
    link: 'https://bceceboard.bihar.gov.in/',
    description: 'Rank card for ITI admission counselling.'
  },
  {
    id: 53,
    title: 'Haryana ITI Semester 4 Result',
    board: 'SCVT Haryana',
    state: 'Haryana',
    type: 'Result',
    date: 'Declared: Dec 2025',
    status: 'Released',
    link: 'https://skilldevelopmentharyana.org/',
    description: 'SCVT Semester system results for all trades.'
  },
  {
    id: 54,
    title: 'DRDO CEPTAM 10 Final Result',
    board: 'DRDO',
    state: 'All India',
    type: 'Result',
    date: 'Declared: Feb 2026',
    status: 'Released',
    link: 'https://www.drdo.gov.in/careers',
    description: 'Final merit list for Technician-A post.'
  },
  {
    id: 55,
    title: 'UP ITI Annual Result 2025',
    board: 'SCVT UP',
    state: 'Uttar Pradesh',
    type: 'Result',
    date: 'Declared: Sep 2025',
    status: 'Released',
    link: 'http://www.scvtup.in/',
    description: 'Annual results for SCVT trainees in UP.'
  },
  {
    id: 56,
    title: 'Rajasthan ITI Final Result',
    board: 'SCVT Raj',
    state: 'Rajasthan',
    type: 'Result',
    date: 'Declared: Aug 2025',
    status: 'Released',
    link: 'http://livelihoods.rajasthan.gov.in/',
    description: 'Result declaration for main exams 2025.'
  },
  {
    id: 57,
    title: 'Maharashtra ITI Result 2025',
    board: 'DVET',
    state: 'Maharashtra',
    type: 'Result',
    date: 'Declared: Sep 2025',
    status: 'Released',
    link: 'https://dvet.gov.in/',
    description: 'Statement of marks for DVET exams.'
  },
  {
    id: 58,
    title: 'West Bengal ITI Result 2025',
    board: 'WBSCVT',
    state: 'West Bengal',
    type: 'Result',
    date: 'Declared: Oct 2025',
    status: 'Released',
    link: 'https://scvtwb.in/',
    description: 'Semester results for WB ITI students.'
  },
  {
    id: 59,
    title: 'Punjab ITI Result 2025',
    board: 'DTE Punjab',
    state: 'Punjab',
    type: 'Result',
    date: 'Declared: Sep 2025',
    status: 'Released',
    link: 'http://itipunjab.nic.in/',
    description: 'Final trade test results.'
  },
   {
    id: 60,
    title: 'Gujarat ITI GCVT Result 2025',
    board: 'GCVT',
    state: 'Gujarat',
    type: 'Result',
    date: 'Declared: Aug 2025',
    status: 'Released',
    link: 'https://iti.gujarat.gov.in/',
    description: 'GCVT exam results for all semesters.'
  },
  {
    id: 61,
    title: 'Karnataka ITI Result 2025',
    board: 'DET Karnataka',
    state: 'Karnataka',
    type: 'Result',
    date: 'Declared: Sep 2025',
    status: 'Released',
    link: 'https://empy.karnataka.gov.in/',
    description: 'Results for annual and semester exams.'
  },
   {
    id: 62,
    title: 'Tamil Nadu ITI Result 2025',
    board: 'DET TN',
    state: 'Tamil Nadu',
    type: 'Result',
    date: 'Declared: Oct 2025',
    status: 'Released',
    link: 'https://skilltraining.tn.gov.in/',
    description: 'Publication of results for Govt/Private ITIs.'
  },
  {
    id: 63,
    title: 'Odisha ITI Result 2025',
    board: 'DTET Odisha',
    state: 'Odisha',
    type: 'Result',
    date: 'Declared: Sep 2025',
    status: 'Released',
    link: 'http://dtetodisha.gov.in/',
    description: 'AITT exam results for Odisha region.'
  },
  {
    id: 64,
    title: 'Jharkhand ITI Result 2025',
    board: 'DECT Jharkhand',
    state: 'Jharkhand',
    type: 'Result',
    date: 'Declared: Aug 2025',
    status: 'Released',
    link: 'https://iti.jharkhand.gov.in/',
    description: 'Annual exam results.'
  },
  {
    id: 65,
    title: 'Kerala ITI Result 2025',
    board: 'DET Kerala',
    state: 'Kerala',
    type: 'Result',
    date: 'Declared: Sep 2025',
    status: 'Released',
    link: 'https://det.kerala.gov.in/',
    description: 'Trade test results for Kerala ITIs.'
  },
  {
    id: 66,
    title: 'Andhra Pradesh ITI Result 2025',
    board: 'DET AP',
    state: 'Andhra Pradesh',
    type: 'Result',
    date: 'Declared: Aug 2025',
    status: 'Released',
    link: 'https://iti.ap.gov.in/',
    description: 'Results for regular trainees.'
  },
  {
    id: 67,
    title: 'Telangana ITI Result 2025',
    board: 'DET Telangana',
    state: 'Telangana',
    type: 'Result',
    date: 'Declared: Sep 2025',
    status: 'Released',
    link: 'https://iti.telangana.gov.in/',
    description: 'Semester and annual results.'
  },
   {
    id: 68,
    title: 'Delhi ITI Result 2025',
    board: 'DTTE Delhi',
    state: 'Delhi',
    type: 'Result',
    date: 'Declared: Aug 2025',
    status: 'Released',
    link: 'https://itidelhi.admissions.nic.in/',
    description: 'Result announcement for Delhi ITIs.'
  },
  {
    id: 69,
    title: 'Uttarakhand ITI Result 2025',
    board: 'DTE Uttarakhand',
    state: 'Uttarakhand',
    type: 'Result',
    date: 'Declared: Sep 2025',
    status: 'Released',
    link: 'https://ukiti.nic.in/',
    description: 'Semester exam results.'
  },
  {
    id: 70,
    title: 'Chhattisgarh ITI Result 2025',
    board: 'DTE Chhattisgarh',
    state: 'Chhattisgarh',
    type: 'Result',
    date: 'Declared: Aug 2025',
    status: 'Released',
    link: 'https://cgiti.cgstate.gov.in/',
    description: 'Annual exam result declaration.'
  },
   {
    id: 71,
    title: 'Himachal Pradesh ITI Result 2025',
    board: 'HP Tech Board',
    state: 'Himachal Pradesh',
    type: 'Result',
    date: 'Declared: Sep 2025',
    status: 'Released',
    link: 'http://www.hptechboard.com/',
    description: 'Results for HP ITI annual exams.'
  }
];

const ExamResults: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Schedule' | 'Result'>('Schedule');
  const [selectedState, setSelectedState] = useState('All');

  // Extract unique states
  const states = ['All', 'All India', ...Array.from(new Set(examData.map(d => d.state).filter(s => s !== 'All India'))).sort()];

  const filteredData = examData.filter(item => {
    const typeMatch = item.type === activeTab;
    const stateMatch = selectedState === 'All' || item.state === selectedState;
    return typeMatch && stateMatch;
  });

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Released': return 'bg-green-100 text-green-700 border-green-200';
      case 'Live': return 'bg-red-100 text-red-700 border-red-200 animate-pulse';
      case 'Upcoming': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Delayed': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Exams & Results</h1>
          <p className="text-gray-600 mt-2">
            One-stop portal for ITI Time Tables, Hall Tickets, and Results (NCVT & SCVT) for all Indian States.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
            <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 inline-flex">
                <button
                    onClick={() => setActiveTab('Schedule')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                        activeTab === 'Schedule' 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <Calendar size={20} /> Exam Dates
                </button>
                <button
                    onClick={() => setActiveTab('Result')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                        activeTab === 'Result' 
                        ? 'bg-green-600 text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <Award size={20} /> Results
                </button>
            </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-800 font-medium">
                <Filter size={20} className="text-blue-600" />
                Filter by State:
            </div>
            <div className="w-full md:w-72 relative">
                <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400" />
                <select 
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white cursor-pointer"
                >
                    {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredData.length > 0 ? (
                filteredData.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group relative overflow-hidden">
                        {/* Status Badge */}
                        <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl text-xs font-bold border-b border-l ${getStatusStyle(item.status)}`}>
                            {item.status.toUpperCase()}
                        </div>

                        <div className="flex items-start gap-4 mb-4">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                                activeTab === 'Schedule' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                            }`}>
                                {activeTab === 'Schedule' ? <FileText size={28} /> : <Award size={28} />}
                            </div>
                            <div className="pr-16">
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition leading-tight">
                                    {item.title}
                                </h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200">
                                        {item.board}
                                    </span>
                                    <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200 flex items-center gap-1">
                                        <MapPin size={10} /> {item.state}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            {item.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <Clock size={16} className="text-orange-500" />
                                {item.date}
                            </div>
                            <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white transition shadow-sm ${
                                    activeTab === 'Schedule' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                                }`}
                            >
                                {activeTab === 'Schedule' ? 'View Schedule' : 'Check Result'}
                                {activeTab === 'Schedule' ? <Download size={16} /> : <ExternalLink size={16} />}
                            </a>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <AlertTriangle size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No updates found</h3>
                    <p className="text-gray-500">Try changing the state filter.</p>
                </div>
            )}
        </div>

        {/* Important Info Box */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h4 className="text-lg font-bold text-yellow-800 mb-2 flex items-center gap-2">
                <AlertTriangle size={20} /> Important Note
            </h4>
            <p className="text-yellow-700 text-sm leading-relaxed">
                Exam dates and Results are subject to change by the respective boards (NCVT/SCVT). 
                We provide the latest available information, but students are advised to verify details on the official NCVT MIS portal or their college notice board.
                <br/><br/>
                <strong>For Verification:</strong> Visit <a href="https://ncvtmis.gov.in" target="_blank" rel="noopener noreferrer" className="underline font-bold">ncvtmis.gov.in</a>
            </p>
        </div>

      </div>
    </div>
  );
};

export default ExamResults;