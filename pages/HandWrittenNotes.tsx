import React, { useState } from 'react';
import { PenTool, BookOpen, FileQuestion, Search, FolderOpen, Zap, Settings, Monitor, Truck, Flame, Wrench, Hammer, Compass, Ruler, Scissors, Droplet, Download, Eye, FileText, HelpCircle, ArrowLeft, ChevronRight, AlertTriangle, Shield, CheckCircle, Info, XCircle, HeartPulse, Stethoscope, Calculator, Clock } from 'lucide-react';
import { jsPDF } from "jspdf";

// Data for Notes Section (Categorized by Trades)
const trades = [
  // New Common Subjects
  { id: 'eng-drawing', name: 'Engineering Drawing', icon: Ruler, color: 'text-indigo-700 bg-indigo-50', noteCount: 20 },
  { id: 'workshop-calc', name: 'Workshop Calculation & Science', icon: Calculator, color: 'text-emerald-700 bg-emerald-50', noteCount: 25 },
  
  // Existing Trades with "1st Year" added
  { id: 'electrician', name: 'Electrician 1st Year', icon: Zap, color: 'text-yellow-600 bg-yellow-50', noteCount: 15 },
  { id: 'fitter', name: 'Fitter 1st Year', icon: Wrench, color: 'text-orange-600 bg-orange-50', noteCount: 1 }, 
  { id: 'electronics', name: 'Electronics Mech 1st Year', icon: Monitor, color: 'text-blue-600 bg-blue-50', noteCount: 10 },
  { id: 'copa', name: 'COPA 1st Year', icon: Monitor, color: 'text-purple-600 bg-purple-50', noteCount: 18 },
  { id: 'wireman', name: 'Wireman 1st Year', icon: Zap, color: 'text-green-600 bg-green-50', noteCount: 8 },
  { id: 'diesel', name: 'Diesel Mechanic 1st Year', icon: Truck, color: 'text-red-600 bg-red-50', noteCount: 9 },
  { id: 'welder', name: 'Welder 1st Year', icon: Flame, color: 'text-rose-600 bg-rose-50', noteCount: 7 },
  { id: 'turner', name: 'Turner 1st Year', icon: Settings, color: 'text-gray-600 bg-gray-50', noteCount: 6 },
  { id: 'machinist', name: 'Machinist 1st Year', icon: Settings, color: 'text-indigo-600 bg-indigo-50', noteCount: 6 },
  { id: 'mmv', name: 'Motor Mechanic 1st Year', icon: Truck, color: 'text-teal-600 bg-teal-50', noteCount: 8 },
  { id: 'civil', name: 'Draughtsman Civil 1st Year', icon: Compass, color: 'text-cyan-600 bg-cyan-50', noteCount: 11 },
  { id: 'mech-drawing', name: 'Draughtsman Mech 1st Year', icon: Ruler, color: 'text-sky-600 bg-sky-50', noteCount: 9 },
  { id: 'surveyor', name: 'Surveyor 1st Year', icon: Compass, color: 'text-lime-600 bg-lime-50', noteCount: 5 },
  { id: 'plumber', name: 'Plumber 1st Year', icon: Droplet, color: 'text-blue-500 bg-blue-50', noteCount: 6 },
  { id: 'carpenter', name: 'Carpenter 1st Year', icon: Hammer, color: 'text-amber-600 bg-amber-50', noteCount: 5 },
  { id: 'fashion', name: 'Fashion Design 1st Year', icon: Scissors, color: 'text-pink-600 bg-pink-50', noteCount: 8 },
];

// Data for Questions Section
const questions = [
  { id: 1, title: 'Electrician 1st Year - Important VIVA Questions', trade: 'Electrician', type: 'VIVA' },
  { id: 2, title: 'Fitter Trade Theory - 500 Most Repeated MCQs', trade: 'Fitter', type: 'MCQ' },
  { id: 3, title: 'Employability Skills - Interview Q&A Handwritten', trade: 'All Trades', type: 'Interview' },
  { id: 4, title: 'Workshop Calculation - Formula Book', trade: 'Common', type: 'Formula' },
  { id: 5, title: 'Engineering Drawing - Freehand Sketching Practice', trade: 'Engineering', type: 'Drawing' },
  { id: 6, title: 'COPA - HTML & JavaScript Important Code Snippets', trade: 'COPA', type: 'Practical' },
  { id: 7, title: 'Electronics Components Identification Guide', trade: 'Electronics', type: 'Practical' },
  { id: 8, title: 'Diesel Mechanic - Engine Parts Q&A', trade: 'Diesel Mech', type: 'Theory' },
  { id: 9, title: 'Wireman - House Wiring Circuit Diagrams', trade: 'Wireman', type: 'Diagrams' },
  { id: 10, title: 'Welder - Safety Precautions & Tool Names', trade: 'Welder', type: 'Theory' },
];

// === HANDWRITTEN CONTENT DATA ===
interface ChapterContent {
  id: string;
  title: string;
  pages: React.ReactNode;
}

const fitterChapters: ChapterContent[] = [
  {
    id: 'fitter_ch1_safety',
    title: 'Chapter 1: Safety (सुरक्षा) & First Aid',
    pages: (
      <div className="space-y-8 font-sans text-gray-800" id="content-to-pdf">
        {/* Intro */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-900 mb-3 border-b border-blue-200 pb-2">1. Safety (सुरक्षा)</h2>
          <p className="text-lg leading-relaxed">
            <strong>Safety (सुरक्षा):</strong> सुरक्षा एक क्रिया है जो कि हमारे सभी कार्यों को ऐसे नियंत्रित / व्यवस्थित करती है जिससे हम स्वयं दुर्घटना से बच सकते है तथा दूसरों को भी बचा सकते है।
          </p>
        </div>

        {/* Types of Safety */}
        <div className="space-y-4">
           <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
             <Shield className="text-orange-500" /> सुरक्षा के प्रकार (Types of Safety):
           </h3>
           <ul className="list-decimal list-inside space-y-2 text-lg ml-2 font-medium text-gray-700 bg-white p-4 rounded-lg shadow-sm">
             <li>निजी सुरक्षा (Personal Safety)</li>
             <li>मशीनों की सुरक्षा (Machinery Safety)</li>
             <li>साधारण सुरक्षा (General Safety)</li>
           </ul>
        </div>

        {/* Detailed Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
              <h4 className="font-bold text-lg text-yellow-800 mb-3">1. निजी सुरक्षा (Personal Safety)</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                 <li>मशीनों में कार्य करते समय कभी भी ढीले कपड़े नहीं पहनने चाहिए।</li>
                 <li>कारखानों में नंगे पाँव काम नहीं करना चाहिए।</li>
                 <li>चप्पल / खुले जूते नहीं पहनना चाहिए।</li>
                 <li>कार्य पूरी लगन / ध्यान / रूचि से करना चाहिए, न कि गुस्से से।</li>
                 <li>घड़ी, अंगूठी, टाई आदि नहीं पहनना चाहिए।</li>
                 <li>चलती मशीन को कभी हाथ से नहीं छूना चाहिए।</li>
              </ul>
           </div>

           <div className="bg-green-50 p-5 rounded-xl border border-green-200">
              <h4 className="font-bold text-lg text-green-800 mb-3">2. साधारण सुरक्षा (General Safety)</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                 <li>चलती मशीनों की कभी भी मरम्मत नहीं करनी चाहिए।</li>
                 <li>मरम्मत के बाद गार्ड उचित स्थान पर लगाकर ही मशीन चलानी चाहिए।</li>
                 <li>वर्कशॉप के फर्श पर लोहे का बुरादा नहीं बिखरा होना चाहिए।</li>
                 <li>फर्श पर तेल आदि नहीं गिरा होना चाहिए।</li>
                 <li>प्रत्येक औज़ार को उचित स्थान पर रखें।</li>
                 <li>कभी भी बिजली के नंगे तार को नहीं छूना चाहिए।</li>
              </ul>
           </div>
           
           <div className="bg-red-50 p-5 rounded-xl border border-red-200 md:col-span-2">
              <h4 className="font-bold text-lg text-red-800 mb-3">3. मशीनों की सुरक्षा (Machine Safety)</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                 <li>मशीनों को हमेशा साफ़-सुथरा रखना चाहिए।</li>
                 <li>जिस मशीन पर कार्य करना हो उसकी पूर्ण जानकारी होनी चाहिए।</li>
                 <li>कार्य करने से पूर्व प्रतिदिन मशीन का निरिक्षण (Inspection) कर लेना चाहिए।</li>
                 <li>चलती मशीन से कभी भी किसी मापक यंत्र (Measuring Tool) से माप नहीं लेनी चाहिए।</li>
                 <li>कारीगर को मशीन पर कार्य करते समय ध्यान केवल मशीन पर होना चाहिए।</li>
              </ul>
           </div>
        </div>

        {/* Safety Signs */}
        <div>
           <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-500" /> सुरक्षा चिन्ह (Safety Signs)
           </h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-l-4 border-red-500 bg-white p-4 shadow-sm rounded-r-lg">
                 <div className="flex items-center gap-2 text-red-600 font-bold mb-1">
                    <XCircle size={20} /> निषेधात्मक (Prohibition)
                 </div>
                 <p className="text-sm text-gray-600"><strong>आकार:</strong> गोलाकार (Circular)</p>
                 <p className="text-sm text-gray-600"><strong>रंग:</strong> लाल किनारा तथा Cross bar</p>
                 <p className="text-sm text-gray-600"><strong>अर्थ:</strong> वर्जित (Forbidden)</p>
              </div>
              
              <div className="border-l-4 border-blue-500 bg-white p-4 shadow-sm rounded-r-lg">
                 <div className="flex items-center gap-2 text-blue-600 font-bold mb-1">
                    <CheckCircle size={20} /> आदेशात्मक (Mandatory)
                 </div>
                 <p className="text-sm text-gray-600"><strong>आकार:</strong> गोलाकार (Circular)</p>
                 <p className="text-sm text-gray-600"><strong>रंग:</strong> नीले पृष्ठ पर सफ़ेद चिन्ह</p>
                 <p className="text-sm text-gray-600"><strong>अर्थ:</strong> करना अनिवार्य है (Must do)</p>
              </div>

              <div className="border-l-4 border-yellow-400 bg-white p-4 shadow-sm rounded-r-lg">
                 <div className="flex items-center gap-2 text-yellow-600 font-bold mb-1">
                    <AlertTriangle size={20} /> चेतावनी (Warning)
                 </div>
                 <p className="text-sm text-gray-600"><strong>आकार:</strong> त्रिभुजाकार (Triangular)</p>
                 <p className="text-sm text-gray-600"><strong>रंग:</strong> पीले पृष्ठ पर काला बॉर्डर</p>
                 <p className="text-sm text-gray-600"><strong>अर्थ:</strong> खतरे / संकट की सूचना</p>
              </div>

              <div className="border-l-4 border-green-500 bg-white p-4 shadow-sm rounded-r-lg">
                 <div className="flex items-center gap-2 text-green-600 font-bold mb-1">
                    <Info size={20} /> सूचनात्मक (Information)
                 </div>
                 <p className="text-sm text-gray-600"><strong>आकार:</strong> वर्गाकार (Square)</p>
                 <p className="text-sm text-gray-600"><strong>रंग:</strong> हरे पृष्ठ पर सफ़ेद चिन्ह</p>
                 <p className="text-sm text-gray-600"><strong>अर्थ:</strong> सूचना देना (उदा. First Aid)</p>
              </div>
           </div>
        </div>

        {/* First Aid Section */}
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
           <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
              <HeartPulse className="text-purple-600" /> प्राथमिक चिकित्सा (First Aid)
           </h3>
           <p className="mb-4">
              किसी दुर्घटनाग्रस्त इंसान को हॉस्पिटल पहुँचने या डॉक्टर के आने से पूर्व दी गयी चिकित्सकीय सहायता 'प्राथमिक चिकित्सा' कहलाती है।
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div className="bg-white p-4 rounded-lg shadow-sm">
                   <h5 className="font-bold text-purple-800">उद्देश्य (Objectives):</h5>
                   <ul className="list-disc list-inside text-sm text-gray-700">
                       <li>व्यक्ति के जीवन को सुरक्षित रखना।</li>
                       <li>डॉक्टर के आने से पूर्व हर संभावित सहायता देना।</li>
                       <li>हालत बिगड़ने से रोकना।</li>
                   </ul>
               </div>
               <div className="bg-white p-4 rounded-lg shadow-sm">
                   <h5 className="font-bold text-purple-800">ABC of First Aid:</h5>
                   <ul className="list-none space-y-1 text-sm text-gray-700">
                       <li><strong>A - Airway:</strong> श्वास नली की रुकावट दूर करना।</li>
                       <li><strong>B - Breathing:</strong> साँस नहीं आ रही तो Mouth-to-Mouth Respiration देना।</li>
                       <li><strong>C - Circulation:</strong> नाड़ी (Pulse) चेक करना और रक्तस्राव (Bleeding) रोकना।</li>
                   </ul>
               </div>
           </div>
        </div>

        {/* Fire Classes Table */}
        <div>
           <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Flame className="text-orange-500" /> आग के प्रकार (Classes of Fire)
           </h3>
           <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                 <thead className="bg-gray-100 text-gray-700">
                    <tr>
                       <th className="py-2 px-4 text-left">Class</th>
                       <th className="py-2 px-4 text-left">Fuel Source (Indhan)</th>
                       <th className="py-2 px-4 text-left">Extinguisher (Agni Shamak)</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                    <tr>
                       <td className="py-2 px-4 font-bold text-green-600">Class A</td>
                       <td className="py-2 px-4">Wood, Paper, Clothes (ठोस पदार्थ)</td>
                       <td className="py-2 px-4">Water (जल), Soda Acid</td>
                    </tr>
                    <tr>
                       <td className="py-2 px-4 font-bold text-red-600">Class B</td>
                       <td className="py-2 px-4">Flammable Liquids (Diesel, Petrol)</td>
                       <td className="py-2 px-4">Foam (झाग), CO2</td>
                    </tr>
                    <tr>
                       <td className="py-2 px-4 font-bold text-blue-600">Class C</td>
                       <td className="py-2 px-4">Gas (LPG, Acetylene)</td>
                       <td className="py-2 px-4">Dry Powder</td>
                    </tr>
                    <tr>
                       <td className="py-2 px-4 font-bold text-yellow-600">Class D</td>
                       <td className="py-2 px-4">Metals, Electric Fire</td>
                       <td className="py-2 px-4">CTC (Carbon Tetra Chloride)</td>
                    </tr>
                     <tr>
                       <td className="py-2 px-4 font-bold text-gray-600">Class K</td>
                       <td className="py-2 px-4">Vegetarian Oil (Cooking Oil)</td>
                       <td className="py-2 px-4">Wet Chemical</td>
                    </tr>
                 </tbody>
              </table>
           </div>
           
           <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200 text-sm text-gray-800">
                <strong>Extinguisher Types:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Water Type:</strong> सिर्फ Class A आग के लिए।</li>
                    <li><strong>Foam Type:</strong> Class B (Liquid) आग के लिए। इसमें 2 कंटेनर होते हैं (Outer: Sodium Bicarbonate, Inner: Alum. Sulphate).</li>
                    <li><strong>Dry Powder:</strong> इसे 'ABC' extinguisher भी कहते हैं।</li>
                    <li><strong>CO2:</strong> इलेक्ट्रिकल उपकरणों की आग के लिए उत्तम।</li>
                    <li><strong>CTC (Halon):</strong> बिजली द्वारा लगी आग के लिए। पीतल का हैंडल होता है।</li>
                </ul>
           </div>
        </div>

         {/* Waste Bin Codes */}
        <div className="bg-gray-800 text-white p-6 rounded-xl">
           <h3 className="text-lg font-bold mb-4">कचरे सामग्री के लिए डब्बे (Bin Color Code)</h3>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                 <span>Paper (कागज) - Blue</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-white"></div>
                 <span>Plastic (प्लास्टिक) - Yellow</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-white"></div>
                 <span>Metal (धातु) - Red</span>
              </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
                 <span>Glass (काँच) - Green</span>
              </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-black border-2 border-white"></div>
                 <span>Food (खाद्य) - Black</span>
              </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-sky-400 border-2 border-white"></div>
                 <span>Others (अन्य) - Sky Blue</span>
              </div>
           </div>
        </div>

      </div>
    )
  }
];


const HandWrittenNotes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Notes' | 'Questions'>('Notes');
  const [selectedTradeId, setSelectedTradeId] = useState<string | null>(null);
  const [viewingChapter, setViewingChapter] = useState<ChapterContent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Navigation Handlers
  const handleTradeClick = (tradeId: string) => {
    // Only Fitter has content for now
    if (tradeId === 'fitter') {
       setSelectedTradeId(tradeId);
    } else {
       alert('Handwritten notes for this trade are being digitized. Please check Fitter trade for demo.');
    }
  };

  const handleChapterClick = (chapter: ChapterContent) => {
    setViewingChapter(chapter);
  };

  const handleBackToTrades = () => {
    setSelectedTradeId(null);
    setViewingChapter(null);
  };

  const handleBackToChapters = () => {
    setViewingChapter(null);
  };

  // PDF Generation Function
  const generatePDF = (chapter: ChapterContent) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 15;
    let y = 20;

    // Helper to check page break
    const checkPageBreak = (heightNeeded: number) => {
        if (y + heightNeeded > pageHeight - margin) {
            doc.addPage();
            y = 20;
        }
    };

    // Title
    doc.setFontSize(22);
    doc.setTextColor(0, 51, 102);
    doc.text("ITI Tech Hub - Handwritten Notes", pageWidth / 2, y, { align: 'center' });
    y += 15;

    doc.setFontSize(16);
    doc.setTextColor(230, 81, 0); // Orange
    doc.text(chapter.title, margin, y);
    y += 10;
    
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 15;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    // --- CONTENT GENERATION ---
    // Note: Since we can't easily parse the React Node structure back to text for PDF,
    // We will manually reconstruct the text structure for the PDF here based on the known content of Chapter 1.
    // In a real app, this data would come from a structured JSON object.

    const addSectionTitle = (title: string) => {
        checkPageBreak(15);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(0, 51, 153);
        doc.text(title, margin, y);
        y += 8;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
    };

    const addText = (text: string) => {
        const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
        checkPageBreak(lines.length * 7);
        doc.text(lines, margin, y);
        y += lines.length * 7;
    };

    const addBullet = (text: string) => {
        const lines = doc.splitTextToSize(text, pageWidth - 2 * margin - 5);
        checkPageBreak(lines.length * 7);
        doc.text("•", margin, y);
        doc.text(lines, margin + 5, y);
        y += lines.length * 7;
    };

    // 1. Intro
    addSectionTitle("1. Safety (Suraksha)");
    addText("Safety is a process that controls our actions to prevent accidents to ourselves and others.");
    y += 5;

    // 2. Types
    addSectionTitle("Types of Safety");
    addBullet("Personal Safety (Niji Suraksha)");
    addBullet("Machinery Safety (Machine Ki Suraksha)");
    addBullet("General Safety (Sadharan Suraksha)");
    y += 5;

    // 3. Personal Safety Rules
    addSectionTitle("Personal Safety Rules");
    addBullet("Do not wear loose clothes while working on machines.");
    addBullet("Do not work barefoot in the workshop.");
    addBullet("Do not wear slippers or open shoes.");
    addBullet("Work with dedication, not in anger.");
    addBullet("Do not wear watches, rings, or ties.");
    y += 5;

    // 4. Machine Safety
    addSectionTitle("Machine Safety Rules");
    addBullet("Keep machines clean.");
    addBullet("Know the machine fully before operating.");
    addBullet("Inspect machine daily before use.");
    addBullet("Do not use measuring tools on a running machine.");
    y += 5;

    // 5. Safety Signs
    addSectionTitle("Safety Signs");
    addBullet("Prohibition (Nishedhatmak): Circular shape, Red border/crossbar. Meaning: Forbidden.");
    addBullet("Mandatory (Adeshatmak): Circular shape, Blue background, White symbol. Meaning: Must do.");
    addBullet("Warning (Chetavni): Triangular shape, Yellow background, Black border. Meaning: Hazard warning.");
    addBullet("Information (Suchnatmak): Square shape, Green background. Meaning: Safety info (e.g. First Aid).");
    y += 5;

    // 6. First Aid
    addSectionTitle("First Aid (Prathmik Chikitsa)");
    addText("Immediate care given to an injured person before the doctor arrives.");
    addText("ABC Rule:");
    addBullet("A - Airway: Clear blockage in windpipe.");
    addBullet("B - Breathing: Give artificial respiration (Mouth-to-Mouth).");
    addBullet("C - Circulation: Check pulse and stop bleeding.");
    y += 5;

    // 7. Fire Classes
    addSectionTitle("Classes of Fire");
    addBullet("Class A: Wood, Paper, Cloth. Extinguisher: Water, Soda Acid.");
    addBullet("Class B: Flammable Liquids (Diesel, Petrol). Extinguisher: Foam, CO2.");
    addBullet("Class C: Gas (LPG). Extinguisher: Dry Powder.");
    addBullet("Class D: Metals/Electric. Extinguisher: CTC, CO2, Dry Powder.");
    y += 5;

    // 8. Bin Colors
    addSectionTitle("Dustbin Color Codes");
    addBullet("Paper: Blue Bin");
    addBullet("Plastic: Yellow Bin");
    addBullet("Metal: Red Bin");
    addBullet("Glass: Green Bin");
    addBullet("Food: Black Bin");
    
    // Footer
    const pageCount = doc.getNumberOfPages();
    for(let i=1; i<=pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth/2, pageHeight - 10, {align:'center'});
    }

    doc.save(`${chapter.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
  };

  // Filter Logic
  const filteredTrades = trades.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredQuestions = questions.filter(q => 
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.trade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- RENDER CONTENT ---

  // 1. Chapter Viewer (Reading Mode)
  if (viewingChapter) {
     return (
        <div className="bg-gray-50 min-h-screen pb-12">
           <div className="sticky top-16 z-20 bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center gap-3">
              <button onClick={handleBackToChapters} className="p-2 hover:bg-gray-100 rounded-full transition">
                 <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <div>
                 <h2 className="font-bold text-gray-900 text-lg leading-tight">{viewingChapter.title}</h2>
                 <p className="text-xs text-gray-500">Handwritten Notes Digital Edition</p>
              </div>
              <button 
                onClick={() => generatePDF(viewingChapter)}
                className="ml-auto p-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2 text-sm font-bold"
              >
                 <Download size={18} /> <span className="hidden sm:inline">PDF</span>
              </button>
           </div>
           
           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-200 min-h-[80vh]">
                  {viewingChapter.pages}
                  
                  <div className="mt-12 pt-8 border-t border-gray-100 text-center text-gray-400 font-hand text-lg">
                      - End of Chapter 1 -
                  </div>
              </div>
           </div>
        </div>
     );
  }

  // 2. Chapter List for Selected Trade
  if (selectedTradeId === 'fitter') {
     return (
        <div className="bg-gray-50 min-h-screen py-10">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <button 
                onClick={handleBackToTrades}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium mb-6 transition"
              >
                 <ArrowLeft size={18} /> Back to All Trades
              </button>

              <div className="flex items-center gap-4 mb-8">
                 <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                    <Wrench size={32} />
                 </div>
                 <div>
                    <h1 className="text-3xl font-bold text-gray-900">Fitter Trade Notes</h1>
                    <p className="text-gray-600">Digitized handwritten notes by topper students.</p>
                 </div>
              </div>

              <div className="grid gap-4">
                 {fitterChapters.map((chapter) => (
                    <div 
                      key={chapter.id}
                      onClick={() => handleChapterClick(chapter)} 
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition cursor-pointer flex items-center justify-between group"
                    >
                       <div className="flex items-start gap-4">
                          <div className="p-3 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-600 transition">
                             <FileText size={24} />
                          </div>
                          <div>
                             <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition">{chapter.title}</h3>
                             <p className="text-sm text-gray-500 mt-1">Includes Theory, Safety Signs & Diagrams</p>
                          </div>
                       </div>
                       <ChevronRight className="text-gray-300 group-hover:text-orange-500" />
                    </div>
                 ))}
                 
                 {/* Placeholder for future chapters */}
                 {[2, 3, 4, 5].map((num) => (
                    <div key={num} className="bg-gray-50 p-6 rounded-xl border border-gray-200 border-dashed flex items-center gap-4 opacity-60">
                       <div className="p-3 bg-gray-100 rounded-lg text-gray-400">
                          <FileText size={24} />
                       </div>
                       <div>
                          <h3 className="text-lg font-bold text-gray-500">Chapter {num}: Coming Soon</h3>
                          <p className="text-sm text-gray-400">Uploading in progress...</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
     );
  }

  // 3. Default View (Trade Grid & Questions)
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-10">
           <div className="inline-block p-3 bg-purple-100 text-purple-600 rounded-full mb-4">
              <PenTool size={32} />
           </div>
           <h1 className="text-3xl font-bold text-gray-900">Hand Written Resources</h1>
           <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
             Premium handwritten study material digitized for you. Select your category below.
           </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
            <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 inline-flex">
                <button
                    onClick={() => setActiveTab('Notes')}
                    className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${
                        activeTab === 'Notes' 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <BookOpen size={20} /> Notes (By Trade)
                </button>
                <button
                    onClick={() => setActiveTab('Questions')}
                    className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${
                        activeTab === 'Questions' 
                        ? 'bg-purple-600 text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <FileQuestion size={20} /> Questions
                </button>
            </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10 relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder={activeTab === 'Notes' ? "Search for your trade (e.g. Electrician, Fitter)..." : "Search for questions..."}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Content Section */}
        {activeTab === 'Notes' ? (
            /* ============ NOTES SECTION (TRADES GRID) ============ */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredTrades.map((trade) => (
                    <div 
                      key={trade.id} 
                      onClick={() => handleTradeClick(trade.id)}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition group cursor-pointer flex flex-col items-center text-center relative overflow-hidden"
                    >
                        {trade.id === 'fitter' ? (
                           <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                              NEW UPLOAD
                           </div>
                        ) : (
                           <div className="absolute top-0 right-0 bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                              COMING SOON
                           </div>
                        )}
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${trade.color}`}>
                            <trade.icon size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">{trade.name}</h3>
                        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                             {trade.id === 'fitter' ? (
                                <><FolderOpen size={12} /> {trade.noteCount} PDFs Inside</>
                             ) : (
                                <><Clock size={12} /> Uploading...</>
                             )}
                        </div>
                    </div>
                ))}
                
                {filteredTrades.length === 0 && (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500">No trades found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        ) : (
            /* ============ QUESTIONS SECTION (LIST) ============ */
            <div className="space-y-4 max-w-4xl mx-auto">
                {filteredQuestions.map((q) => (
                    <div key={q.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-purple-50 text-purple-600 p-3 rounded-lg shrink-0">
                                <HelpCircle size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg hover:text-purple-600 transition">{q.title}</h3>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">{q.trade}</span>
                                    <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">{q.type}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                                <Eye size={16} /> View
                            </button>
                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition shadow-sm">
                                <Download size={16} /> PDF
                            </button>
                        </div>
                    </div>
                ))}

                {filteredQuestions.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No question papers found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        )}

      </div>
    </div>
  );
};

export default HandWrittenNotes;