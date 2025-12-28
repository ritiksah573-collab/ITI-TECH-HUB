import React from 'react';
import { Course } from '../types';
import { PlayCircle, Clock, Award } from 'lucide-react';

const mockCourses: Course[] = [
  { id: 2, title: 'PLC & SCADA Automation', provider: 'SkillIndia', duration: '4 Weeks', price: 'Free', category: 'Electrician', image: 'https://picsum.photos/400/250?random=2' },
  { id: 3, title: 'CNC Programming Masterclass', provider: 'Industrial Hub', duration: '15 Hours', price: '₹999', category: 'Fitter/Turner', image: 'https://picsum.photos/400/250?random=3' },
  { id: 5, title: 'Residential Wiring Basics', provider: 'ITI Skills', duration: '1 Week', price: 'Free', category: 'Electrician', image: 'https://picsum.photos/400/250?random=5' },
  { id: 4, title: 'Python for Beginners', provider: 'Coursera', duration: '20 Hours', price: 'Free', category: 'COPA', image: 'https://picsum.photos/400/250?random=4' },
];

const Skills: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Skill Development</h1>
          <p className="text-gray-600 mt-2">Upgrade your skills with industry-relevant courses.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           {mockCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition flex flex-col">
                 <div className="relative">
                    <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-800">
                       {course.category}
                    </div>
                 </div>
                 <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{course.provider}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                       <span className="flex items-center gap-1"><Clock size={16} className="text-blue-500"/> {course.duration}</span>
                       <span className="flex items-center gap-1"><Award size={16} className="text-orange-500"/> Certificate</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                       <span className={`font-bold text-lg ${course.price === 'Free' ? 'text-green-600' : 'text-gray-900'}`}>
                          {course.price}
                       </span>
                       <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                          <PlayCircle size={16} /> Enroll
                       </button>
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;