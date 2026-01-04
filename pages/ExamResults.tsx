import React, { useState, useEffect } from 'react';
import { Calendar, Award, ExternalLink, MapPin, Clock, AlertTriangle, FileText, Download, Filter } from 'lucide-react';

const defaultExams: any[] = [
  { id: 1, title: 'NCVT AITT CTS Annual Exam Time Table 2026', board: 'NCVT', state: 'All India', type: 'Schedule', date: 'July 2026', status: 'Upcoming', link: '#', description: 'Annual exam dates for 1st & 2nd Year trainees.' },
  { id: 50, title: 'NCVT AITT Annual Result 2025', board: 'NCVT', state: 'All India', type: 'Result', date: 'Declared: 15 Aug 2025', status: 'Released', link: '#', description: 'Final results for Session 2023-25. Check Marksheet.' }
];

const ExamResults: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Schedule' | 'Result'>('Schedule');
  const [selectedState, setSelectedState] = useState('All');
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    const dynamicExams = JSON.parse(localStorage.getItem('dynamicExams') || '[]');
    setExams([...dynamicExams, ...defaultExams]);
  }, []);

  const filteredData = exams.filter(item => {
    const typeMatch = item.type === activeTab;
    const stateMatch = selectedState === 'All' || item.state === selectedState;
    return typeMatch && stateMatch;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Exams & Results</h1>
          <p className="text-gray-600 mt-2">Official portal for ITI Time Tables and Results.</p>
        </div>

        <div className="flex justify-center mb-8 gap-2">
            <button onClick={() => setActiveTab('Schedule')} className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'Schedule' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200'}`}>Dates</button>
            <button onClick={() => setActiveTab('Result')} className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'Result' ? 'bg-green-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200'}`}>Results</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredData.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 group relative">
                    <div className="flex items-start gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${activeTab === 'Schedule' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                            {activeTab === 'Schedule' ? <FileText size={28} /> : <Award size={28} />}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">{item.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">{item.state} • {item.board}</p>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-6">{item.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm font-medium flex items-center gap-1"><Clock size={16}/> {item.date}</span>
                        <a href={item.link} target="_blank" className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white transition ${activeTab === 'Schedule' ? 'bg-blue-600' : 'bg-green-600'}`}>Check Now</a>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExamResults;