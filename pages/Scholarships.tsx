import React, { useState } from 'react';
import { GraduationCap, Calendar, ExternalLink, Filter, Building2, Landmark, CheckCircle, Clock, Search, IndianRupee } from 'lucide-react';

interface Scholarship {
  id: number;
  name: string;
  provider: string;
  category: 'Government' | 'Private';
  eligibility: string[]; // 'ITI', '10th Pass', '12th Pass'
  amount: string;
  deadline: string;
  status: 'Live' | 'Upcoming';
  applyLink: string;
}

const scholarshipData: Scholarship[] = [
  {
    id: 1,
    name: 'NSP Post Matric Scholarship',
    provider: 'Govt of India',
    category: 'Government',
    eligibility: ['ITI', '11th', '12th'],
    amount: '₹12,000 - ₹20,000 per year',
    deadline: '31st Oct 2025',
    status: 'Live',
    applyLink: 'https://scholarships.gov.in/'
  },
  {
    id: 2,
    name: 'HDFC Badhte Kadam Scholarship',
    provider: 'HDFC Bank',
    category: 'Private',
    eligibility: ['10th Pass', '12th Pass', 'ITI'],
    amount: 'Up to ₹18,000',
    deadline: '15th Sep 2025',
    status: 'Live',
    applyLink: 'https://www.buddy4study.com/page/hdfc-bank-parivartan-ecss-programme'
  },
  {
    id: 3,
    name: 'Tata Trusts Vocational Scholarship',
    provider: 'Tata Trusts',
    category: 'Private',
    eligibility: ['ITI', 'Diploma'],
    amount: 'Tuition Fee Waiver',
    deadline: 'Rolling Basis',
    status: 'Live',
    applyLink: 'https://www.tatatrusts.org/'
  },
  {
    id: 4,
    name: 'LIC Golden Jubilee Scholarship',
    provider: 'LIC India',
    category: 'Private',
    eligibility: ['10th Pass', '12th Pass', 'ITI'],
    amount: '₹20,000 per year',
    deadline: 'December 2025',
    status: 'Upcoming',
    applyLink: 'https://licindia.in/'
  },
  {
    id: 5,
    name: 'Swami Vivekananda Merit-cum-Means',
    provider: 'Govt of West Bengal',
    category: 'Government',
    eligibility: ['11th', '12th', 'ITI', 'Polytechnic'],
    amount: '₹1,500 - ₹5,000 per month',
    deadline: 'November 2025',
    status: 'Upcoming',
    applyLink: 'https://svmcm.wbhed.gov.in/'
  },
  {
    id: 6,
    name: 'Reliance Foundation Scholarship',
    provider: 'Reliance Foundation',
    category: 'Private',
    eligibility: ['12th Pass', 'ITI'],
    amount: 'Up to ₹2 Lakhs',
    deadline: 'October 2025',
    status: 'Live',
    applyLink: 'https://www.reliancefoundation.org/'
  },
  {
    id: 7,
    name: 'Vidyasaarathi Scholarship',
    provider: 'NSDL',
    category: 'Private',
    eligibility: ['ITI', 'Diploma', 'UG'],
    amount: 'Varies by Scheme',
    deadline: 'Multiple Schemes',
    status: 'Live',
    applyLink: 'https://www.vidyasaarathi.co.in/'
  },
  {
    id: 8,
    name: 'Saksham Scholarship Scheme',
    provider: 'AICTE',
    category: 'Government',
    eligibility: ['ITI', 'Diploma', 'Specially Abled'],
    amount: '₹50,000 per year',
    deadline: '31st Oct 2025',
    status: 'Live',
    applyLink: 'https://scholarships.gov.in/'
  },
  {
    id: 9,
    name: 'Colgate Keep India Smiling',
    provider: 'Colgate',
    category: 'Private',
    eligibility: ['10th Pass', '12th Pass', 'ITI'],
    amount: '₹20,000 per year',
    deadline: 'August 2025',
    status: 'Upcoming',
    applyLink: 'https://www.buddy4study.com/'
  },
  {
    id: 10,
    name: 'ONGC Scholarship for SC/ST',
    provider: 'ONGC',
    category: 'Government',
    eligibility: ['ITI', 'Engg', 'MBBS'],
    amount: '₹48,000 per year',
    deadline: 'October 2025',
    status: 'Upcoming',
    applyLink: 'https://ongcscholar.org/'
  }
];

const Scholarships: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQualification, setSelectedQualification] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredScholarships = scholarshipData.filter(item => {
    const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    const qualificationMatch = selectedQualification === 'All' || 
                               item.eligibility.some(e => e.includes(selectedQualification));

    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;

    return searchMatch && qualificationMatch && categoryMatch;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Scholarship Portal</h1>
          <p className="text-gray-600 mt-2">Find financial support for your ITI, 10th, and 12th studies.</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search scholarship name or provider..." 
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Qualification Filter */}
            <div className="md:col-span-3">
               <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 text-gray-400" size={18} />
                  <select 
                     className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white cursor-pointer"
                     value={selectedQualification}
                     onChange={(e) => setSelectedQualification(e.target.value)}
                  >
                     <option value="All">All Qualifications</option>
                     <option value="ITI">ITI</option>
                     <option value="10th">10th Pass</option>
                     <option value="12th">12th Pass</option>
                  </select>
               </div>
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
               <div className="relative">
                  <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
                  <select 
                     className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white cursor-pointer"
                     value={selectedCategory}
                     onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                     <option value="All">All Categories</option>
                     <option value="Government">Government</option>
                     <option value="Private">Private</option>
                  </select>
               </div>
            </div>
          </div>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
           {filteredScholarships.map((scholarship) => (
              <div key={scholarship.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group relative overflow-hidden">
                 {/* Status Ribbon */}
                 <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-xs font-bold ${
                    scholarship.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                 }`}>
                    {scholarship.status === 'Live' ? '● LIVE NOW' : '○ UPCOMING'}
                 </div>

                 <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${
                       scholarship.category === 'Government' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                    }`}>
                       {scholarship.category === 'Government' ? <Landmark size={28} /> : <Building2 size={28} />}
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">{scholarship.name}</h3>
                       <p className="text-gray-500 text-sm font-medium">{scholarship.provider}</p>
                    </div>
                 </div>

                 <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                       <span className="text-gray-500 flex items-center gap-2"><IndianRupee size={16} /> Amount:</span>
                       <span className="font-bold text-gray-800">{scholarship.amount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                       <span className="text-gray-500 flex items-center gap-2"><GraduationCap size={16} /> Eligibility:</span>
                       <span className="font-medium text-gray-800">{scholarship.eligibility.join(', ')}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                       <span className="text-gray-500 flex items-center gap-2"><Calendar size={16} /> Deadline:</span>
                       <span className={`font-bold ${scholarship.status === 'Live' ? 'text-red-600' : 'text-orange-600'}`}>
                          {scholarship.deadline}
                       </span>
                    </div>
                 </div>

                 <div className="pt-4 border-t border-gray-100 flex gap-3">
                    <a 
                       href={scholarship.applyLink} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-white transition ${
                          scholarship.status === 'Live' 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-gray-400 cursor-not-allowed'
                       }`}
                       onClick={(e) => scholarship.status !== 'Live' && e.preventDefault()}
                    >
                       {scholarship.status === 'Live' ? 'Apply Now' : 'Coming Soon'} <ExternalLink size={16} />
                    </a>
                 </div>
              </div>
           ))}
        </div>

        {filteredScholarships.length === 0 && (
             <div className="text-center py-20">
                 <p className="text-gray-500 text-lg">No scholarships found matching your criteria.</p>
             </div>
        )}
      </div>
    </div>
  );
};

export default Scholarships;