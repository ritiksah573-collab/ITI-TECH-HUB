
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Notes from './pages/Notes';
import PYQs from './pages/PYQs';
import Jobs from './pages/Jobs';
import About from './pages/About';
import Contact from './pages/Contact';
import AIBuddy from './pages/AIBuddy';
import Admissions from './pages/Admissions';
import Scholarships from './pages/Scholarships';
import HandWrittenNotes from './pages/HandWrittenNotes';
import ExamResults from './pages/ExamResults';
import LearnMachines from './pages/LearnMachines';
import Login from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-gray-50">
        <Routes>
          {/* Admin Routes - No Navbar/Footer */}
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Public Routes - Wrapped in Layout */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <main className="flex-grow pb-16 md:pb-0">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/exams" element={<ExamResults />} />
                    <Route path="/admissions" element={<Admissions />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/handwritten-notes" element={<HandWrittenNotes />} />
                    <Route path="/learn-machines" element={<LearnMachines />} />
                    <Route path="/pyqs" element={<PYQs />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/scholarships" element={<Scholarships />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/aibuddy" element={<AIBuddy />} />
                    <Route path="*" element={<Home />} />
                  </Routes>
                </main>
                <Footer />
                <MobileNav />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
