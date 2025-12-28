import React from 'react';
import { Award, Heart, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">About ITI Tech Hub</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We are a dedicated team of former ITI instructors and engineers who believe that quality trade education resources should be accessible to every ITI student, everywhere.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To bridge the gap between workshop training and industry requirements by providing top-notch trade theory notes, practical guides, and apprenticeship opportunities.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Student First</h3>
            <p className="text-gray-600">
              Every feature on this website, from NCVT Papers to the Community Forum, is built with the specific needs of ITI students in mind.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Excellence</h3>
            <p className="text-gray-600">
              We curate only the best study materials and verify job postings to ensure you spend less time searching and more time learning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;