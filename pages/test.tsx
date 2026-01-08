
import React, { useState, useEffect, useRef } from 'react';
import { Timer, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

interface Question {
  q: string;
  a: string[];
  correct: number;
}

const examData: Question[] = [
  { q: "What is the full form of ITI?", a: ["Industrial Training Institute", "Indian Trade Institute", "International Trade Industry"], correct: 0 },
  { q: "Which tool is used for tightening nuts and bolts?", a: ["Hammer", "Spanner", "Screwdriver"], correct: 1 },
  { q: "What color is the 'Phase' wire in a 3-phase system (India)?", a: ["Blue", "Green", "Red/Yellow/Blue"], correct: 2 },
  { q: "Which safety sign is circular with a blue background?", a: ["Warning Sign", "Mandatory Sign", "Prohibition Sign"], correct: 1 },
  { q: "Unit of Electrical Power is?", a: ["Ohm", "Volt", "Watt"], correct: 2 }
];

const MockTest: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(examData.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isFinished, setIsFinished] = useState(false);
  
  // Fix: Using any type for the timer reference to avoid NodeJS namespace issues in browser environment
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endTest();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, isFinished]);

  const endTest = () => {
    setIsFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resetTest = () => {
    setCurrentIdx(0);
    setAnswers(new Array(examData.length).fill(null));
    setTimeLeft(600);
    setIsFinished(false);
  };

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = optionIdx;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    return answers.reduce((score, ans, idx) => {
      return ans === examData[idx].correct ? (score as number) + 1 : score;
    }, 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isFinished) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 text-center border border-gray-100 animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Exam Finished!</h1>
          <p className="text-slate-500 font-bold mb-8">NIMI Pattern Mock Test Results</p>
          
          <div className="bg-slate-50 rounded-3xl p-8 mb-8">
            <div className="text-5xl font-black text-blue-600 mb-2">{score} / {examData.length}</div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Your Final Score</p>
          </div>

          <button 
            onClick={resetTest}
            className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-black transition shadow-xl"
          >
            <RotateCcw size={20} /> Re-attempt Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row h-full min-h-[600px]">
        
        {/* Main Content Area */}
        <div className="flex-1 p-8 md:p-12 flex flex-col">
          <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">CBT Online Exam</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NIMI Mock Test Series</p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-sm ${timeLeft < 60 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-blue-50 text-blue-600'}`}>
              <Timer size={18} /> {formatTime(timeLeft)}
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg uppercase tracking-widest">Question {currentIdx + 1} of {examData.length}</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-4 leading-snug">
                {examData[currentIdx].q}
              </h2>
            </div>

            <div className="space-y-4 mb-10">
              {examData[currentIdx].a.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`w-full p-5 rounded-2xl text-left font-bold transition-all border-2 flex justify-between items-center group ${
                    answers[currentIdx] === i 
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md' 
                    : 'border-transparent bg-slate-50 text-slate-600 hover:border-slate-200'
                  }`}
                >
                  <span>{option}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    answers[currentIdx] === i ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white group-hover:border-slate-400'
                  }`}>
                    {answers[currentIdx] === i && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-8 border-t border-gray-100">
            <button 
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(prev => prev - 1)}
              className="flex items-center gap-2 px-6 py-3 font-black text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition"
            >
              <ArrowLeft size={18} /> Previous
            </button>
            
            {currentIdx === examData.length - 1 ? (
              <button 
                onClick={endTest}
                className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-green-100 hover:bg-green-700 transition flex items-center gap-2"
              >
                Submit Exam <CheckCircle size={18} />
              </button>
            ) : (
              <button 
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition flex items-center gap-2"
              >
                Next Question <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar Palette */}
        <div className="w-full md:w-80 bg-slate-50 p-8 border-l border-gray-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Question Palette</h3>
          <div className="grid grid-cols-5 gap-3">
            {examData.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-all ${
                  currentIdx === i 
                  ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-100' 
                  : answers[i] !== null 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-400'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-green-500"></div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Answered</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-white border border-slate-200"></div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Not Answered</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-blue-600"></div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Current</span>
            </div>
          </div>

          <div className="mt-auto pt-10">
             <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-3">
                <AlertCircle size={20} className="text-orange-500 shrink-0" />
                <p className="text-[10px] font-bold text-orange-700 leading-tight">Exam will auto-submit when time reaches zero. Do not refresh the page.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockTest;