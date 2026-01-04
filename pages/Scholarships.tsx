
import React, { useState, useEffect } from 'react';
import { GraduationCap, Calendar, ExternalLink, Filter, Building2, Landmark, IndianRupee, Search } from 'lucide-react';

interface Scholarship {
  id: number;
  name: string;
  provider: string;
  category: 'Government' | 'Private';
  eligibility: string[];
  amount: string;
  deadline: string;
  status: 'Live' | 'Upcoming';
  applyLink: string;
}

const defaultScholarships: Scholarship[] = [
  { id: 1, name: 'NSP Post Matric Scholarship', provider: 'Govt of India', category: 'Government', eligibility: ['ITI', '11th', '12th'], amount: '₹12,000 - ₹20,000 per year', deadline: '31st Oct 2025', status: 'Live', applyLink: 'https://scholarships.gov.in/' },
  { id: 2, name: 'HDFC Badhte Kadam Scholarship', provider: 'HDFC Bank', category: 'Private', eligibility: ['10th Pass', '12th Pass', 'ITI'], amount: 'Up to ₹18,000', deadline: '15th Sep 2025', status: 'Live', applyLink: 'https://www.buddy4study.com/' }
];

const Scholarships: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQualification, setSelectedQualification] = useState('All');
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);

  useEffect(() => {
    const load = () => {
      const stored = localStorage.getItem('iti_dynamic_scholarships');
      const dynamic = stored ? JSON.parse(stored) : [];
      setScholarships([...dynamic, ...defaultScholarships]);
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const filteredScholarships = scholarships.filter(item => {
    const searchMatch = (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || (item.provider || "").toLowerCase().includes(searchTerm.toLowerCase());
    const qualificationMatch = selectedQualification === 'All' || (item.eligibility && item.eligibility.some(e => e.includes(selectedQualification)));
    return searchMatch && qualificationMatch;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Scholarship Portal</h1>
          <p className="text-gray-600 mt-2">Financial support for ITI, 10th, and 12th students.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input type="text" placeholder="Search scholarship..." className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="md:col-span-4">
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none bg-white" value={selectedQualification} onChange={(e) => setSelectedQualification(e.target.value)}>
                 <option value="All">All Qualifications</option>
                 <option value="ITI">ITI</option>
                 <option value="10th">10th Pass</option>
                 <option value="12th">12th Pass</option>
              </select>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {filteredScholarships.map((scholarship) => (
              <div key={scholarship.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group relative overflow-hidden">
                 <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-xs font-bold ${scholarship.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {scholarship.status?.toUpperCase() || 'LIVE'}
                 </div>
                 <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-blue-50 text-blue-600"><Landmark size={28} /></div>
                    <div>
                       <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">{scholarship.name}</h3>
                       <p className="text-gray-500 text-sm font-medium">{scholarship.provider}</p>
                    </div>
                 </div>
                 <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm"><span className="text-gray-500 flex items-center gap-2"><IndianRupee size={16} /> Amount:</span><span className="font-bold text-gray-800">{scholarship.amount}</span></div>
                    <div className="flex items-center justify-between text-sm"><span className="text-gray-500 flex items-center gap-2"><Calendar size={16} /> Deadline:</span><span className="font-bold text-red-600">{scholarship.deadline}</span></div>
                 </div>
                 <div className="pt-4 border-t border-gray-100"><a href={scholarship.applyLink} target="_blank" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-white transition bg-blue-600 hover:bg-blue-700">Apply Now <ExternalLink size={16} /></a></div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Scholarships;
