import React, { useState, useEffect } from 'react';
import { Search, FileText, Download, Eye, X, BookOpen, Settings, Zap, Building2, Monitor, Cpu, Wrench, Flame, Truck, PenTool, GraduationCap, Hammer, Filter, Anchor, Thermometer, PenTool as PenToolIcon, Ruler } from 'lucide-react';
import { Note } from '../types';
import { jsPDF } from "jspdf";

const mockNotes: Note[] = [
  // =========================================================================
  // 1. ITI ELECTRICIAN (2 Years)
  // =========================================================================
  { id: 101, title: 'Electrician Trade Theory (1st Year)', subject: 'Trade Theory', branch: 'ITI Electrician', semester: '1st Year', downloadUrl: '#' },
  { id: 102, title: 'Electrician Trade Theory (2nd Year)', subject: 'Trade Theory', branch: 'ITI Electrician', semester: '2nd Year', downloadUrl: '#' },
  { id: 103, title: 'Engineering Drawing Electrician (1st Year)', subject: 'Engineering Drawing', branch: 'ITI Electrician', semester: '1st Year', downloadUrl: '#' },
  { id: 104, title: 'Workshop Calculation Electrician (2nd Year)', subject: 'Workshop Calculation', branch: 'ITI Electrician', semester: '2nd Year', downloadUrl: '#' },

  // =========================================================================
  // 2. ITI FITTER (2 Years)
  // =========================================================================
  { id: 201, title: 'Fitter Trade Theory (1st Year)', subject: 'Trade Theory', branch: 'ITI Fitter', semester: '1st Year', downloadUrl: '#' },
  { id: 202, title: 'Fitter Trade Theory (2nd Year)', subject: 'Trade Theory', branch: 'ITI Fitter', semester: '2nd Year', downloadUrl: '#' },
  { id: 203, title: 'Engineering Drawing Fitter (1st Year)', subject: 'Engineering Drawing', branch: 'ITI Fitter', semester: '1st Year', downloadUrl: '#' },
  { id: 204, title: 'Workshop Science Fitter (2nd Year)', subject: 'Workshop Calculation', branch: 'ITI Fitter', semester: '2nd Year', downloadUrl: '#' },
  
  // =========================================================================
  // 3. ITI ELECTRONICS MECHANIC (2 Years)
  // =========================================================================
  { id: 301, title: 'Electronics Mechanic Theory (1st Year)', subject: 'Trade Theory', branch: 'ITI Electronics Mech', semester: '1st Year', downloadUrl: '#' },
  { id: 302, title: 'Electronics Mechanic Theory (2nd Year)', subject: 'Trade Theory', branch: 'ITI Electronics Mech', semester: '2nd Year', downloadUrl: '#' },
  
  // =========================================================================
  // 4. ITI WIREMAN (2 Years)
  // =========================================================================
  { id: 401, title: 'Wireman Trade Theory (1st Year)', subject: 'Trade Theory', branch: 'ITI Wireman', semester: '1st Year', downloadUrl: '#' },
  { id: 402, title: 'Wireman Trade Theory (2nd Year)', subject: 'Trade Theory', branch: 'ITI Wireman', semester: '2nd Year', downloadUrl: '#' },

  // =========================================================================
  // 5. ITI TURNER (2 Years)
  // =========================================================================
  { id: 501, title: 'Turner Trade Theory (1st Year)', subject: 'Trade Theory', branch: 'ITI Turner', semester: '1st Year', downloadUrl: '#' },
  { id: 502, title: 'Turner Trade Theory (2nd Year)', subject: 'Trade Theory', branch: 'ITI Turner', semester: '2nd Year', downloadUrl: '#' },

  // =========================================================================
  // 6. ITI MACHINIST (2 Years)
  // =========================================================================
  { id: 601, title: 'Machinist Trade Theory (1st Year)', subject: 'Trade Theory', branch: 'ITI Machinist', semester: '1st Year', downloadUrl: '#' },
  { id: 602, title: 'Machinist Trade Theory (2nd Year)', subject: 'Trade Theory', branch: 'ITI Machinist', semester: '2nd Year', downloadUrl: '#' },

  // =========================================================================
  // 7. ITI MOTOR MECHANIC VEHICLE (MMV) (2 Years)
  // =========================================================================
  { id: 701, title: 'Motor Mechanic Vehicle (1st Year)', subject: 'Trade Theory', branch: 'ITI Motor Mech', semester: '1st Year', downloadUrl: '#' },
  { id: 702, title: 'Motor Mechanic Vehicle (2nd Year)', subject: 'Trade Theory', branch: 'ITI Motor Mech', semester: '2nd Year', downloadUrl: '#' },

  // =========================================================================
  // 8. ITI DRAUGHTSMAN CIVIL (2 Years)
  // =========================================================================
  { id: 801, title: 'Draughtsman Civil Theory (1st Year)', subject: 'Trade Theory', branch: 'ITI Draughtsman Civil', semester: '1st Year', downloadUrl: '#' },
  { id: 802, title: 'Draughtsman Civil Theory (2nd Year)', subject: 'Trade Theory', branch: 'ITI Draughtsman Civil', semester: '2nd Year', downloadUrl: '#' },

  // =========================================================================
  // 9. ITI DRAUGHTSMAN MECHANICAL (2 Years)
  // =========================================================================
  { id: 901, title: 'Draughtsman Mech Theory (1st Year)', subject: 'Trade Theory', branch: 'ITI Draughtsman Mech', semester: '1st Year', downloadUrl: '#' },
  { id: 902, title: 'Draughtsman Mech Theory (2nd Year)', subject: 'Trade Theory', branch: 'ITI Draughtsman Mech', semester: '2nd Year', downloadUrl: '#' },

  // =========================================================================
  // 10. ITI RAC (REFRIGERATION & AC) (2 Years)
  // =========================================================================
  { id: 1001, title: 'Refrigeration & AC Theory (1st Year)', subject: 'Trade Theory', branch: 'ITI RAC', semester: '1st Year', downloadUrl: '#' },
  { id: 1002, title: 'Refrigeration & AC Theory (2nd Year)', subject: 'Trade Theory', branch: 'ITI RAC', semester: '2nd Year', downloadUrl: '#' },

  // =========================================================================
  // 11. ITI SURVEYOR (2 Years)
  // =========================================================================
  { id: 1106, title: 'Surveyor Trade Theory (1st Year)', subject: 'Trade Theory', branch: 'ITI Surveyor', semester: '1st Year', downloadUrl: '#' },
  { id: 1107, title: 'Surveyor Trade Theory (2nd Year)', subject: 'Trade Theory', branch: 'ITI Surveyor', semester: '2nd Year', downloadUrl: '#' },

  // =========================================================================
  // ONE YEAR TRADES
  // =========================================================================
  { id: 1101, title: 'COPA Trade Theory (Full Year)', subject: 'Trade Theory', branch: 'ITI COPA', semester: '1st Year', downloadUrl: '#' },
  { id: 1102, title: 'Welder Trade Theory (Full Year)', subject: 'Trade Theory', branch: 'ITI Welder', semester: '1st Year', downloadUrl: '#' },
  { id: 1103, title: 'Diesel Mechanic Theory (Full Year)', subject: 'Trade Theory', branch: 'ITI Diesel Mechanic', semester: '1st Year', downloadUrl: '#' },
  { id: 1104, title: 'Plumber Trade Theory (Full Year)', subject: 'Trade Theory', branch: 'ITI Plumber', semester: '1st Year', downloadUrl: '#' },
  { id: 1105, title: 'Carpenter Trade Theory (Full Year)', subject: 'Trade Theory', branch: 'ITI Carpenter', semester: '1st Year', downloadUrl: '#' },

  // =========================================================================
  // COMMON SUBJECTS
  // =========================================================================
  { id: 1201, title: 'Employability Skills (1st Year)', subject: 'Employability Skills', branch: 'All ITI Trades', semester: '1st Year', downloadUrl: '#' },
  { id: 1202, title: 'Employability Skills (2nd Year)', subject: 'Employability Skills', branch: 'All ITI Trades', semester: '2nd Year', downloadUrl: '#' },
  { id: 1203, title: 'Workshop Calculation & Science (Common)', subject: 'Workshop Calculation', branch: 'All ITI Trades', semester: '1st Year', downloadUrl: '#' },
];

const Notes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  
  // Viewer State
  const [viewingNote, setViewingNote] = useState<Note | null>(null);
  const [noteContent, setNoteContent] = useState<string>('');

  const filteredNotes = mockNotes.filter(note => {
    // 1. Branch Filter
    const branchMatch = selectedBranch === 'All' || note.branch === selectedBranch;
    
    // 2. Semester Filter
    const normalizedNoteSem = note.semester.toLowerCase();
    const normalizedSelectedSem = selectedSemester.toLowerCase().replace(' sem', '').replace(' year', '');
    const semesterMatch = selectedSemester === 'All' || 
                          note.semester === selectedSemester || 
                          normalizedNoteSem.includes(normalizedSelectedSem);

    // 3. Search Filter
    const searchMatch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        note.subject.toLowerCase().includes(searchTerm.toLowerCase());

    return branchMatch && semesterMatch && searchMatch;
  });

  const getBranchIcon = (branch: string) => {
    const b = branch.toLowerCase();
    if (b.includes('mechanical') || b.includes('turner') || b.includes('machinist')) return <Settings size={14} />;
    if (b.includes('electrical') || b.includes('electrician') || b.includes('wireman')) return <Zap size={14} />;
    if (b.includes('computer') || b.includes('copa') || b.includes('electronics')) return <Monitor size={14} />;
    if (b.includes('fitter') || b.includes('plumber')) return <Wrench size={14} />;
    if (b.includes('welder')) return <Flame size={14} />;
    if (b.includes('diesel') || b.includes('automobile') || b.includes('motor')) return <Truck size={14} />;
    if (b.includes('civil') || b.includes('draughtsman') || b.includes('surveyor')) return <Building2 size={14} />;
    if (b.includes('carpenter')) return <Hammer size={14} />;
    if (b.includes('rac') || b.includes('refrigeration')) return <Thermometer size={14} />;
    return <BookOpen size={14} />;
  };

  const getNoteContent = (note: Note): string => {
    const subjectLower = note.subject.toLowerCase();
    const branchLower = note.branch.toLowerCase();
    const semesterLower = note.semester.toLowerCase();
    
    let selectedChapters: string[] = [];

    // --- 1. Engineering Drawing Chapters ---
    const edCommonFirstYear = [
        "Introduction to Engineering Drawing & Instruments",
        "Free Hand Drawing (Lines, Polygons, Ellipse)",
        "Lettering & Numbering (Single Stroke)",
        "Dimensioning Systems & Practice",
        "Geometrical Construction",
        "Construction of Scales (Plain, Diagonal)",
        "Projection of Points & Lines",
        "Orthographic Projection (1st & 3rd Angle)",
        "Isometric Projection",
        "Free Hand Sketching of Hand Tools"
    ];

    const edMechSecondYear = [
        "Construction of Solids (Cones, Pyramids)",
        "Sectional Views of Solids",
        "Development of Surfaces",
        "Intersection of Surfaces",
        "Fasteners (Nuts, Bolts, Screws, Rivets)",
        "Keys, Cotters, and Joints",
        "Couplings and Bearings",
        "Assembly Drawing of Machine Parts",
        "Piping Symbols & Joints"
    ];

    const edElecSecondYear = [
        "Electrical Symbols (ISI Standards)",
        "Electronic Components Symbols",
        "Wiring Diagrams (Staircase, Tunnel, Godown)",
        "Electrical Measuring Instruments Sketches",
        "DC Machine Parts (Armature, Commutator)",
        "Transformer Construction Details",
        "AC Motor Windings & Starters",
        "Transmission & Distribution Layouts",
        "Alternator & Synchronous Motor Sketches",
        "Control Panel Layouts"
    ];

    // --- 2. Workshop Calculation & Science Chapters ---
    const wcsCommonFirstYear = [
        "Systems of Units (FPS, CGS, MKS, SI)",
        "Fractions & Decimals",
        "Square Root, Cube Root, Ratio & Proportion",
        "Percentage & Algebra Basics",
        "Material Science (Metals, Non-metals, Properties)",
        "Mass, Weight, Volume & Density",
        "Speed, Velocity, Work, Power & Energy",
        "Heat & Temperature (Scales, Transmission)",
        "Basic Electricity (Ohm's Law, Series/Parallel)",
        "Mensuration (Area & Perimeter of 2D Figures)",
        "Levers & Simple Machines",
        "Trigonometry Basics"
    ];

    const wcsMechSecondYear = [
        "Friction & Lubrication",
        "Centre of Gravity (Centroid)",
        "Area of Cut-out Sections",
        "Algebra (Quadratic Equations)",
        "Elasticity & Stress-Strain",
        "Heat Treatment Processes",
        "Mensuration (Volume & Surface Area of 3D Solids)",
        "Estimation & Costing (Machining, Fabrication)",
        "Graphing & Statistics"
    ];

    const wcsElecSecondYear = [
        "DC Circuits & Kirchhoff's Laws Calculations",
        "Magnetism & Electromagnetism Calculations",
        "AC Circuit Calculations (RL, RC, RLC)",
        "Polyphase Systems (Star/Delta)",
        "Battery Charging Calculations",
        "Transformer Efficiency & Losses",
        "DC/AC Motor Torque & Speed Calculations",
        "Basic Electronics Calculations",
        "Commercial Wiring Estimation & Costing"
    ];

    // --- 3. Trade Theory Chapters ---
    const itiElectricianChapters = [
      "Safety Practice & Hand Tools", "Basic Electricity & Ohm's Law", "Conductors, Insulators, Cables",
      "Soldering & DC Circuits", "Magnetism & Electromagnetism", "AC Circuits & Polyphase System",
      "Cells & Batteries", "Electrical Wiring Systems", "Earthing / Grounding", "Illumination & Lighting",
      "Measuring Instruments", "Domestic Appliances", "Transformer Basics", "DC Generators", "DC Motors",
      "AC Motors (1-Phase & 3-Phase)", "Alternators", "Synchronous Motors", "Converter & Inverter",
      "Control Panel Wiring", "Power Generation (Thermal, Hydro, Nuclear)", "Transmission & Distribution",
      "Circuit Breakers & Relays", "Industrial Wiring", "Basic Electronics (Diodes, Transistors)",
      "Digital Electronics Basics", "CRO & Oscillators", "Power Electronics (SCR, TRIAC)",
      "Electric Drives", "Renewable Energy (Solar, Wind)"
    ];

    const itiFitterChapters = [
        "Occupational Safety & Health", "Hand Tools & Marking Tools", "Measuring Instruments (Steel Rule/Calipers)", 
        "Precision Instruments (Vernier/Micrometer)", "Files: Types & Uses", "Hacksawing & Filing Practice", 
        "Drilling Machines & Drill Bits", "Reaming & Tapping", "Dies & Thread Cutting", "Metals & Properties", 
        "Heat Treatment of Steel", "Forging Processes", "Sheet Metal Work", "Soldering, Brazing & Riveting", 
        "Welding Basics (Arc/Gas)", "Lathe Machine Parts & Operations", "Turning, Facing & Taper Turning", 
        "Screw Cutting on Lathe", "Grinding Machines & Wheels", "Limits, Fits & Tolerances", "Gauges & Templates", 
        "Surface Finish & Lapping", "Hydraulics & Pneumatics", "Power Transmission (Belts/Gears)", 
        "Bearings & Lubrication", "Preventive Maintenance", "Jigs & Fixtures", "Pipe Fitting", "Industrial Safety"
    ];

    const itiCopaChapters = [
        "Safe Working Practices", "Computer Fundamentals & Hardware", "Operating Systems (Windows/Linux)", 
        "Installation of Software", "MS Word: Document Formatting", "MS Excel: Formulas & Functions", 
        "MS PowerPoint: Presentations", "MS Access: Database Basics", "Computer Networks & Internet", 
        "Web Browsing & Email", "HTML & CSS Web Design", "JavaScript Fundamentals", "Cyber Security & Antivirus", 
        "E-Commerce & Online Transactions", "Cloud Computing Concepts", "Python Programming Basics", 
        "Smart Accounting (Tally)", "Typing Skills", "Employability Skills", "Communication Skills", "Entrepreneurship Skills"
    ];

    const itiWelderChapters = [
        "Importance of Safety in Welding", "Welding Tools & Equipment", "Types of Welding Joints", 
        "Shielded Metal Arc Welding (SMAW)", "Arc Welding Power Sources", "Electrodes: Coding & Selection", 
        "Oxy-Acetylene Gas Welding", "Gas Cutting & Flame Types", "Brazing & Soldering", 
        "Weld Defects & Inspection", "Distortion & Control", "MIG/MAG Welding (GMAW)", "TIG Welding (GTAW)", 
        "Resistance Welding", "Submerged Arc Welding", "Plasma Arc Cutting", "Thermit Welding", 
        "Welding Symbols & Blueprint Reading", "Heat Treatment of Welds", "Testing of Welds (DT/NDT)", 
        "Pipe Welding", "Welding of Cast Iron", "Welding of Aluminium", "Welding of Stainless Steel"
    ];

    const itiElectronicsChapters = [
        "Trade Safety & Hand Tools", "AC & DC Measuring Instruments", "Soldering & Desoldering",
        "Resistors, Capacitors & Inductors", "Semiconductor Diodes", "Transistor Basics (BJT)",
        "Amplifiers & Oscillators", "Power Supply Circuits", "Digital Electronics & Logic Gates",
        "Flip Flops, Counters & Registers", "Operational Amplifiers (Op-Amp)", "555 Timer IC Applications",
        "SMPS & Inverter Technology", "LCD & LED Display Technology", "Microprocessors & Microcontrollers",
        "Sensors & Transducers", "Communication Systems", "Fiber Optics", "Mobile Phone Repairing"
    ];

    const itiMechanicMotorChapters = [
        "Workshop Safety & Tools", "Automobile Engines Basics (SI & CI)", "Engine Construction & Parts",
        "Cooling & Lubrication Systems", "Intake & Exhaust Systems", "Fuel Supply Systems (Petrol/Diesel)",
        "Ignition Systems", "Transmission System (Clutch, Gearbox)", "Propeller Shaft & Differential",
        "Suspension & Steering Systems", "Braking Systems (Hydraulic/Air/ABS)", "Wheels & Tyres",
        "Automotive Electrical Systems", "Battery & Charging System", "Starting System",
        "Emission Control", "MPFI & CRDI Systems", "Hybrid & Electric Vehicles"
    ];

    const itiCivilChapters = [
        "Drawing Instruments & Standards", "Lines, Lettering & Dimensioning", "Geometrical Construction",
        "Scales (Plain, Diagonal)", "Projection of Points & Lines", "Orthographic Projection",
        "Building Materials (Bricks, Cement)", "Building Construction (Foundation, Walls)",
        "Doors, Windows & Arches", "Stairs & Staircases", "Surveying Basics (Chain, Compass)",
        "Levelling & Theodolite", "AutoCAD 2D Drafting", "Building Bye-laws", "Estimating & Costing",
        "Total Station Survey", "GPS & GIS Applications"
    ];

    const employabilityChapters = [
        "Behavioral Skills", "English Literacy", "Communication Skills", "IT Literacy", "Entrepreneurship Skills",
        "Maintain Efficiency at Workplace", "Occupational Safety, Health and Environment Education", "Essential Skills for Success",
        "Labor Welfare Legislation", "Quality Management", "Preparation for World of Work", "Customer Interaction / Service"
    ];
    
    // === SELECTION LOGIC ===
    if (subjectLower.includes('employability')) {
        selectedChapters = employabilityChapters;
    } 
    // Handle Engineering Drawing
    else if (subjectLower.includes('drawing')) {
        if (semesterLower.includes('1st') || semesterLower.includes('first')) {
            selectedChapters = edCommonFirstYear;
        } else {
            // 2nd Year Specifics
            if (branchLower.includes('electrician') || branchLower.includes('wireman') || branchLower.includes('electronic') || branchLower.includes('copa')) {
                 selectedChapters = edElecSecondYear;
            } else {
                 selectedChapters = edMechSecondYear; // Default to Mechanical for Fitter, Turner etc.
            }
        }
    } 
    // Handle Workshop Calculation
    else if (subjectLower.includes('workshop') || subjectLower.includes('calculation') || subjectLower.includes('science')) {
        if (semesterLower.includes('1st') || semesterLower.includes('first')) {
            selectedChapters = wcsCommonFirstYear;
        } else {
            // 2nd Year Specifics
            if (branchLower.includes('electrician') || branchLower.includes('wireman') || branchLower.includes('electronic') || branchLower.includes('copa')) {
                 selectedChapters = wcsElecSecondYear;
            } else {
                 selectedChapters = wcsMechSecondYear;
            }
        }
    } 
    // Handle Trade Theory (Fallback)
    else if (branchLower.includes('electrician') || branchLower.includes('wireman')) {
        selectedChapters = itiElectricianChapters;
    } else if (branchLower.includes('fitter') || branchLower.includes('turner') || branchLower.includes('machinist')) {
        selectedChapters = itiFitterChapters;
    } else if (branchLower.includes('electronics')) {
        selectedChapters = itiElectronicsChapters;
    } else if (branchLower.includes('motor') || branchLower.includes('diesel')) {
        selectedChapters = itiMechanicMotorChapters;
    } else if (branchLower.includes('copa')) {
        selectedChapters = itiCopaChapters;
    } else if (branchLower.includes('welder')) {
        selectedChapters = itiWelderChapters;
    } else if (branchLower.includes('civil') || branchLower.includes('surveyor')) {
        selectedChapters = itiCivilChapters;
    } else {
       selectedChapters = itiElectricianChapters; // Default fallback
    }

    let content = `ITI TECH HUB PREMIUM NOTES\n`;
    content += `(Based on NCVT Syllabus)\n\n`;
    content += `TITLE: ${note.title.toUpperCase()}\n`;
    content += `SUBJECT: ${note.subject.toUpperCase()}\n`;
    content += `TRADE: ${note.branch.toUpperCase()}\n`;
    content += `YEAR: ${note.semester}\n`;
    content += `================================================================\n\n`;
    
    content += `TABLE OF CONTENTS\n`;
    content += `----------------------------------------------------------------\n`;
    selectedChapters.forEach((chap, idx) => {
        content += `${idx + 1}. ${chap}\n`;
    });
    content += `\n================================================================\n\n`;

    selectedChapters.forEach((chap, idx) => {
        content += `\nMODULE ${idx + 1}: ${chap.toUpperCase()}\n`;
        content += `----------------------------------------------------------------\n`;
        
        content += `1. Introduction:\n`;
        content += `   In this module, we will learn about "${chap}". This is essential for your trade practicals and exams.\n\n`;
        
        content += `2. Key Concepts:\n`;
        content += `   • Important definition or tool name.\n`;
        content += `   • Safety precaution related to this topic.\n`;
        content += `   • Standard measurements (if applicable).\n\n`;
        
        content += `3. Practical Procedure:\n`;
        content += `   Step 1: Preparation of tools/materials.\n`;
        content += `   Step 2: Execution of the task.\n`;
        content += `   Step 3: Finishing and inspection.\n\n`;
        
        content += `4. NCVT Exam Points:\n`;
        content += `   • Remember the units and symbols.\n`;
        content += `   • Common viva questions from this topic.\n\n`;
        
        content += `*** End of Module ${idx+1} ***\n\n`;
    });

    return content;
  };

  const generateHighResCover = (title: string, subject: string, branch: string): string => {
    const canvas = document.createElement('canvas');
    const width = 1200;
    const height = 1600;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1e3a8a'); 
    gradient.addColorStop(1, '#ea580c'); 
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 15;
    for(let i=0; i<8; i++) {
        ctx.beginPath();
        ctx.arc(width, height, 400 + i*80, 0, Math.PI * 2);
        ctx.stroke();
    }
    for(let i=0; i<8; i++) {
        ctx.beginPath();
        ctx.arc(0, 0, 300 + i*80, 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = 'bold 50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("ITI TECH HUB", width/2, 100);
    
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '30px Arial';
    ctx.fillText("NCVT Study Material", width/2, 150);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 50;
    ctx.fillRect(100, 400, width - 200, 600);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#1e3a8a';
    ctx.font = 'bold 70px Arial';
    
    const words = title.split(' ');
    let line = '';
    let y = 550;
    const lineHeight = 80;
    
    for(let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > width - 300 && n > 0) {
        ctx.fillText(line, width/2, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, width/2, y);

    y += 100;
    ctx.font = 'italic 40px Arial';
    ctx.fillStyle = '#ea580c'; 
    ctx.fillText(`${subject}`, width/2, y);
    y += 60;
    ctx.fillStyle = '#4b5563'; 
    ctx.font = 'bold 35px Arial';
    ctx.fillText(`${branch}`, width/2, y);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 30px Courier';
    ctx.fillText("TRADE THEORY & PRACTICAL", width/2, height - 100);

    return canvas.toDataURL('image/jpeg', 0.85); 
  };

  const generatePDF = (note: Note) => {
    const doc = new jsPDF();
    const content = getNoteContent(note);
    const lines = content.split('\n');
    let y = 20; 
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;

    const coverImage = generateHighResCover(note.title, note.subject, note.branch);
    if (coverImage) {
        doc.addImage(coverImage, 'JPEG', 0, 0, 210, 297);
        doc.addPage();
    }

    doc.setFont("times", "normal");
    doc.setFontSize(11);

    lines.forEach((line) => {
        if (line.startsWith('MODULE') || line.startsWith('CHAPTER')) {
            if (y > 40) {
                doc.addPage();
                y = 20;
            }
            doc.setFont("times", "bold");
            doc.setFontSize(16);
            doc.setTextColor(234, 88, 12); // Orange/Red for Main Headers
        } else if (line.includes('TITLE:') || line.startsWith('===')) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
        } else if (/^\d+\.\s/.test(line.trim())) { 
             // Sub-headings like "1. Introduction"
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(30, 58, 138); // Deep Blue for Subheadings
        } else if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            // Main Points (Bullets) - Distinct Font & Color
            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            doc.setTextColor(75, 0, 130); // Indigo/Purple for Main Points
        } else if (line.trim().startsWith('Step')) {
            // Steps - Monospace Look
            doc.setFont("courier", "bold");
            doc.setFontSize(11);
            doc.setTextColor(20, 83, 45); // Dark Green
        } else if (line.trim().startsWith('Note:') || line.trim().startsWith('Tip:') || line.trim().startsWith('Important Term:')) {
            // Notes & Important Terms
            doc.setFont("times", "bolditalic");
            doc.setFontSize(11);
            doc.setTextColor(185, 28, 28); // Red
        } else if (line.includes('=')) {
             // Formulas
            doc.setFont("courier", "bold");
            doc.setFontSize(11);
            doc.setTextColor(22, 101, 52); // Green for Formulas/Math
        } else {
            // Normal Text
            doc.setFont("times", "normal");
            doc.setFontSize(11);
            doc.setTextColor(30, 30, 30);
        }

        if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
        }

        const splitText = doc.splitTextToSize(line, 180);
        doc.text(splitText, 15, y);
        y += splitText.length * 6; 
    });

    const pageCount = doc.getNumberOfPages();
    for (let i = 2; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(150);
        doc.text(`Page ${i-1} of ${pageCount-1} - ${note.title}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
        doc.text("ITI Tech Hub Premium Notes", 15, pageHeight - 10);
    }

    doc.save(`${note.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
  };

  const handleDownload = (note: Note) => {
     generatePDF(note);
  };

  const handleViewOnline = (note: Note) => {
    let content = getNoteContent(note);
    setViewingNote(note);
    setNoteContent(content);
  };

  const itiFilters = ['All', '1st Year', '2nd Year'];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">ITI Trade Notes</h1>
          <p className="text-gray-600 mt-2">Access high-quality study resources for all trades (1st & 2nd Year).</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search trade, subject, topic..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Dynamic Branch/Trade Dropdown */}
            <div className="md:col-span-4">
              <div className="relative">
                <select 
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white cursor-pointer"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  <option value="All">All Trades</option>
                  <option value="ITI Electrician">Electrician</option>
                  <option value="ITI Fitter">Fitter</option>
                  <option value="ITI Electronics Mech">Electronics Mech</option>
                  <option value="ITI Wireman">Wireman</option>
                  <option value="ITI Turner">Turner</option>
                  <option value="ITI Machinist">Machinist</option>
                  <option value="ITI Motor Mech">Motor Mechanic (MMV)</option>
                  <option value="ITI Diesel Mechanic">Diesel Mechanic</option>
                  <option value="ITI Welder">Welder</option>
                  <option value="ITI COPA">COPA</option>
                  <option value="ITI Draughtsman Civil">Draughtsman Civil</option>
                  <option value="ITI Draughtsman Mech">Draughtsman Mech</option>
                  <option value="ITI RAC">Refrigeration & AC</option>
                  <option value="ITI Surveyor">Surveyor</option>
                  <option value="ITI Plumber">Plumber</option>
                  <option value="ITI Carpenter">Carpenter</option>
                </select>
              </div>
            </div>
          </div>

          {/* Dynamic Semester/Year Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            {itiFilters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => setSelectedSemester(filter)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                        selectedSemester === filter
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                    }`}
                >
                    {filter}
                </button>
            ))}
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div key={note.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition p-6 group">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg bg-orange-50 text-orange-600 group-hover:scale-110 transition-transform`}>
                    {getBranchIcon(note.branch)}
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      note.semester.includes('1st') ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {note.semester}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition line-clamp-2">
                  {note.title}
                </h3>
                
                <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  {note.subject}
                </p>

                <div className="flex gap-2">
                    <button 
                        onClick={() => handleViewOnline(note)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                    >
                        <Eye size={16} /> View
                    </button>
                    <button 
                        onClick={() => handleDownload(note)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-white rounded-lg transition shadow-sm bg-orange-500 hover:bg-orange-600`}
                    >
                        <Download size={16} /> PDF
                    </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No notes found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Online Viewer Modal */}
      {viewingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-4xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 line-clamp-1">{viewingNote.title}</h2>
                        <p className="text-xs text-gray-500">Online Viewer Mode</p>
                    </div>
                    <button onClick={() => setViewingNote(null)} className="p-2 hover:bg-gray-200 rounded-full transition">
                        <X size={20} className="text-gray-600" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-8 bg-white text-gray-800 font-serif leading-relaxed whitespace-pre-wrap">
                    {noteContent}
                </div>
                <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
                    <button 
                        onClick={() => handleDownload(viewingNote)}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
                    >
                        <Download size={18} /> Download Full PDF
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Notes;