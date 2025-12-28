import React, { useState } from 'react';
import { MonitorPlay, Search, Filter, Wrench, Zap, Settings, Cpu, Flame, Truck, Play, ExternalLink, Ruler, Compass, Hammer, Scissors, Droplet } from 'lucide-react';

interface MachineTutorial {
  id: number;
  title: string;
  trade: string;
  category: string;
  description: string;
  searchQuery: string; // Dynamic query to find the best video
}

const tutorials: MachineTutorial[] = [
  // =================================================================================
  // 1. MECHANICAL (FITTER / TURNER / MACHINIST) - CUTTING & MACHINING
  // =================================================================================
  {
    id: 1,
    title: 'Lathe Machine Operations',
    trade: 'Fitter / Turner',
    category: 'Mechanical',
    description: 'Learn facing, plain turning, step turning, and knurling operations.',
    searchQuery: 'How to operate Lathe Machine ITI practical'
  },
  {
    id: 2,
    title: 'CNC Lathe (Turning Center)',
    trade: 'Machinist',
    category: 'Mechanical',
    description: 'CNC Lathe machine operating, offsets, and basic programming.',
    searchQuery: 'CNC Lathe machine operating tutorial hindi'
  },
  {
    id: 3,
    title: 'CNC Milling (VMC)',
    trade: 'Machinist',
    category: 'Mechanical',
    description: 'Vertical Machining Center (VMC) setting and operation.',
    searchQuery: 'VMC machine operating training'
  },
  {
    id: 4,
    title: 'Universal Milling Machine',
    trade: 'Machinist',
    category: 'Mechanical',
    description: 'Gear cutting and surface milling on a Universal Milling Machine.',
    searchQuery: 'Universal Milling Machine gear cutting operation'
  },
  {
    id: 5,
    title: 'Pillar Drilling Machine',
    trade: 'Fitter',
    category: 'Mechanical',
    description: 'Drilling, reaming, and tapping operations using Pillar Drill.',
    searchQuery: 'Pillar drilling machine operation ITI'
  },
  {
    id: 6,
    title: 'Radial Drilling Machine',
    trade: 'Fitter',
    category: 'Mechanical',
    description: 'Heavy duty drilling operations using Radial Arm Drill.',
    searchQuery: 'Radial drilling machine working principle'
  },
  {
    id: 7,
    title: 'Shaper Machine',
    trade: 'Machinist',
    category: 'Mechanical',
    description: 'Shaping flat surfaces and quick return mechanism.',
    searchQuery: 'Shaper machine operation ITI'
  },
  {
    id: 8,
    title: 'Slotter Machine',
    trade: 'Machinist',
    category: 'Mechanical',
    description: 'Cutting internal keyways and slots using a Slotter.',
    searchQuery: 'Slotter machine keyway cutting operation'
  },
  {
    id: 9,
    title: 'Surface Grinding Machine',
    trade: 'Fitter / Machinist',
    category: 'Mechanical',
    description: 'Precision finishing of flat surfaces using Surface Grinder.',
    searchQuery: 'Surface grinding machine working'
  },
  {
    id: 10,
    title: 'Pedestal / Bench Grinder',
    trade: 'Fitter',
    category: 'Mechanical',
    description: 'Sharpening single point cutting tools and drill bits.',
    searchQuery: 'Pedestal grinder tool sharpening'
  },
  {
    id: 11,
    title: 'Cylindrical Grinding Machine',
    trade: 'Machinist',
    category: 'Mechanical',
    description: 'Grinding external cylindrical surfaces to high precision.',
    searchQuery: 'Cylindrical grinding machine operation'
  },
  {
    id: 12,
    title: 'Power Hacksaw',
    trade: 'Fitter',
    category: 'Mechanical',
    description: 'Cutting metal bars and rods using Power Hacksaw.',
    searchQuery: 'Power hacksaw machine working'
  },

  // =================================================================================
  // 2. PRECISION INSTRUMENTS & TOOLS
  // =================================================================================
  {
    id: 20,
    title: 'Vernier Caliper',
    trade: 'All Mechanical',
    category: 'Measurement',
    description: 'How to read Vernier Caliper (Least Count 0.02mm).',
    searchQuery: 'How to read vernier caliper 0.02mm'
  },
  {
    id: 21,
    title: 'Micrometer (Screw Gauge)',
    trade: 'All Mechanical',
    category: 'Measurement',
    description: 'Taking precise outside measurements (LC 0.01mm).',
    searchQuery: 'How to read outside micrometer in hindi'
  },
  {
    id: 22,
    title: 'Vernier Height Gauge',
    trade: 'Fitter',
    category: 'Measurement',
    description: 'Marking layout lines and measuring height.',
    searchQuery: 'Vernier height gauge marking'
  },
  {
    id: 23,
    title: 'Universal Bevel Protractor',
    trade: 'Fitter',
    category: 'Measurement',
    description: 'Measuring angles with 5 minute accuracy.',
    searchQuery: 'Universal bevel protractor reading'
  },
  {
    id: 24,
    title: 'Dial Test Indicator (DTI)',
    trade: 'Fitter',
    category: 'Measurement',
    description: 'Checking surface flatness and runout.',
    searchQuery: 'How to use dial test indicator'
  },
  {
    id: 25,
    title: 'Sine Bar',
    trade: 'Fitter',
    category: 'Measurement',
    description: 'Setting angles using Sine Bar and Slip Gauges.',
    searchQuery: 'Sine bar angle measurement'
  },

  // =================================================================================
  // 3. ELECTRICAL MACHINES & INSTRUMENTS
  // =================================================================================
  {
    id: 30,
    title: 'Digital Multimeter',
    trade: 'Electrician',
    category: 'Electrical',
    description: 'Testing Voltage, Current, Resistance, and Continuity.',
    searchQuery: 'How to use digital multimeter electrician'
  },
  {
    id: 31,
    title: 'Clamp Meter (Tong Tester)',
    trade: 'Electrician',
    category: 'Electrical',
    description: 'Measuring high current without cutting the wire.',
    searchQuery: 'How to use clamp meter'
  },
  {
    id: 32,
    title: 'Megger (Insulation Tester)',
    trade: 'Electrician',
    category: 'Electrical',
    description: 'Testing insulation resistance of cables and windings.',
    searchQuery: 'Megger insulation resistance test'
  },
  {
    id: 33,
    title: 'Earth Tester',
    trade: 'Electrician',
    category: 'Electrical',
    description: 'Measuring earth electrode resistance (Earthing).',
    searchQuery: 'Digital earth resistance tester working'
  },
  {
    id: 34,
    title: 'Transformer Winding',
    trade: 'Wireman',
    category: 'Electrical',
    description: 'Manual and machine winding of transformers.',
    searchQuery: 'Transformer winding process'
  },
  {
    id: 35,
    title: 'Ceiling Fan Winding Machine',
    trade: 'Wireman',
    category: 'Electrical',
    description: 'Automatic stator winding machine operation.',
    searchQuery: 'Ceiling fan winding machine operation'
  },
  {
    id: 36,
    title: 'DC Motor Starter (3 Point)',
    trade: 'Electrician',
    category: 'Electrical',
    description: 'Connection and working of 3 Point Starter.',
    searchQuery: '3 point starter connection dc motor'
  },
  {
    id: 37,
    title: 'Star Delta Starter',
    trade: 'Electrician',
    category: 'Electrical',
    description: 'Automatic Star Delta Starter control wiring.',
    searchQuery: 'Star delta starter control wiring'
  },

  // =================================================================================
  // 4. WELDING & FABRICATION
  // =================================================================================
  {
    id: 40,
    title: 'Arc Welding Machine',
    trade: 'Welder',
    category: 'Welding',
    description: 'Shielded Metal Arc Welding (SMAW) setup and beads.',
    searchQuery: 'Arc welding for beginners'
  },
  {
    id: 41,
    title: 'MIG Welding (CO2)',
    trade: 'Welder',
    category: 'Welding',
    description: 'Gas Metal Arc Welding (GMAW) setup and operation.',
    searchQuery: 'MIG welding process'
  },
  {
    id: 42,
    title: 'TIG Welding (Argon)',
    trade: 'Welder',
    category: 'Welding',
    description: 'Tungsten Inert Gas welding for SS and Aluminium.',
    searchQuery: 'TIG welding tutorial'
  },
  {
    id: 43,
    title: 'Spot Welding Machine',
    trade: 'Welder',
    category: 'Welding',
    description: 'Resistance spot welding for sheet metal.',
    searchQuery: 'Spot welding machine operation'
  },
  {
    id: 44,
    title: 'Plasma Cutter',
    trade: 'Welder',
    category: 'Welding',
    description: 'Cutting thick metal plates using Plasma Arc.',
    searchQuery: 'Plasma cutter operation manual'
  },
  {
    id: 45,
    title: 'Oxy-Acetylene Gas Cutting',
    trade: 'Welder',
    category: 'Welding',
    description: 'Setting flame and cutting steel plates.',
    searchQuery: 'Oxy acetylene gas cutting'
  },

  // =================================================================================
  // 5. ELECTRONICS
  // =================================================================================
  {
    id: 50,
    title: 'CRO (Oscilloscope)',
    trade: 'Electronics',
    category: 'Electronics',
    description: 'Measuring Frequency and Amplitude of waveforms.',
    searchQuery: 'How to use CRO oscilloscope'
  },
  {
    id: 51,
    title: 'Function Generator',
    trade: 'Electronics',
    category: 'Electronics',
    description: 'Generating Sine, Square, and Triangle waves.',
    searchQuery: 'Function generator working'
  },
  {
    id: 52,
    title: 'SMD Soldering Station',
    trade: 'Electronics',
    category: 'Electronics',
    description: 'Soldering surface mount components using Hot Air Gun.',
    searchQuery: 'SMD soldering rework station'
  },
  {
    id: 53,
    title: 'LCR Meter',
    trade: 'Electronics',
    category: 'Electronics',
    description: 'Measuring Inductance, Capacitance, and Resistance.',
    searchQuery: 'How to use LCR meter'
  },

  // =================================================================================
  // 6. AUTOMOBILE (DIESEL / MOTOR MECHANIC)
  // =================================================================================
  {
    id: 60,
    title: '4-Stroke Diesel Engine',
    trade: 'Diesel Mech',
    category: 'Automobile',
    description: 'Dismantling and assembling of Diesel Engine.',
    searchQuery: '4 stroke diesel engine working animation'
  },
  {
    id: 61,
    title: 'Wheel Balancing Machine',
    trade: 'Motor Mech',
    category: 'Automobile',
    description: 'Balancing car wheels to remove vibrations.',
    searchQuery: 'Computerized wheel balancing machine training'
  },
  {
    id: 62,
    title: 'Tyre Changer Machine',
    trade: 'Motor Mech',
    category: 'Automobile',
    description: 'Removing and fitting tyres on rims automatically.',
    searchQuery: 'Tyre changer machine operation'
  },
  {
    id: 63,
    title: 'Hydraulic Car Lift',
    trade: 'Motor Mech',
    category: 'Automobile',
    description: 'Operating two-post hydraulic lift for underbody work.',
    searchQuery: 'Two post hydraulic car lift operation'
  },

  // =================================================================================
  // 7. CIVIL & SURVEYOR
  // =================================================================================
  {
    id: 70,
    title: 'Total Station',
    trade: 'Surveyor / Civil',
    category: 'Civil',
    description: 'Digital surveying and coordinate measurement.',
    searchQuery: 'Total station surveying training'
  },
  {
    id: 71,
    title: 'Auto Level',
    trade: 'Surveyor / Civil',
    category: 'Civil',
    description: 'Taking ground levels for construction.',
    searchQuery: 'Auto level surveying practical'
  },
  {
    id: 72,
    title: 'Theodolite',
    trade: 'Surveyor',
    category: 'Civil',
    description: 'Measuring horizontal and vertical angles.',
    searchQuery: 'Vernier theodolite surveying'
  },

  // =================================================================================
  // 8. OTHER TRADES (CARPENTER, PLUMBER, TEXTILE)
  // =================================================================================
  {
    id: 80,
    title: 'Wood Circular Saw',
    trade: 'Carpenter',
    category: 'Carpenter',
    description: 'Cutting wood planks safely using Table Saw.',
    searchQuery: 'Table saw woodworking for beginners'
  },
  {
    id: 81,
    title: 'Wood Planer Machine',
    trade: 'Carpenter',
    category: 'Carpenter',
    description: 'Surface planning of wood blocks.',
    searchQuery: 'Surface planer machine woodworking'
  },
  {
    id: 82,
    title: 'Pipe Threading Machine',
    trade: 'Plumber',
    category: 'Plumber',
    description: 'Cutting threads on GI pipes.',
    searchQuery: 'Pipe threading machine operation'
  },
  {
    id: 83,
    title: 'Industrial Sewing Machine',
    trade: 'Textile',
    category: 'Textile',
    description: 'Operating single needle lock stitch machine.',
    searchQuery: 'Industrial sewing machine operation'
  }
];

const LearnMachines: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTutorials = tutorials.filter(tutorial => {
    const searchMatch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        tutorial.trade.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === 'All' || tutorial.category === selectedCategory;
    
    return searchMatch && categoryMatch;
  });

  const getIconForCategory = (cat: string) => {
    switch(cat) {
      case 'Electrical': return <Zap size={18} />;
      case 'Mechanical': return <Settings size={18} />;
      case 'Welding': return <Flame size={18} />;
      case 'Electronics': return <Cpu size={18} />;
      case 'Automobile': return <Truck size={18} />;
      case 'Measurement': return <Ruler size={18} />;
      case 'Civil': return <Compass size={18} />;
      case 'Carpenter': return <Hammer size={18} />;
      case 'Plumber': return <Droplet size={18} />;
      case 'Textile': return <Scissors size={18} />;
      default: return <Wrench size={18} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-orange-100 text-orange-600 rounded-full mb-4">
             <MonitorPlay size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Learn Machine Operations</h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Practical video library for 50+ Industrial Machines & Tools. 
            <br/><span className="text-xs text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded-full mt-2 inline-block">Powered by YouTube Search</span>
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 sticky top-16 z-30">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search */}
            <div className="md:col-span-8 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search machine (e.g., Lathe, Welding, Multimeter)..." 
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="md:col-span-4 relative">
               <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
               <select 
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
               >
                  <option value="All">All Categories</option>
                  <option value="Mechanical">Mechanical (Cutting/CNC)</option>
                  <option value="Measurement">Measurement Tools</option>
                  <option value="Electrical">Electrical (Machines)</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Welding">Welding</option>
                  <option value="Automobile">Automobile</option>
                  <option value="Civil">Civil / Surveyor</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Plumber">Plumber</option>
               </select>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {filteredTutorials.map((tut) => (
             <div key={tut.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition flex flex-col group h-full">
                {/* 
                   Dynamic Search Embed 
                   Using listType=search ensures we always get a valid list of videos for the query.
                   No more broken IDs!
                */}
                <div className="relative pt-[56.25%] bg-black group-hover:shadow-inner transition">
                   <iframe 
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(tut.searchQuery)}&origin=${window.location.origin}`}
                      title={tut.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                   ></iframe>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                   <div className="flex justify-between items-start mb-2">
                      <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-600`}>
                          {getIconForCategory(tut.category)} {tut.category}
                      </span>
                   </div>
                   
                   <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition">
                      {tut.title}
                   </h3>
                   
                   <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {tut.description}
                   </p>

                   <div className="mt-auto pt-4 border-t border-gray-100 space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                         <span className="flex items-center gap-1 font-medium">
                            <Wrench size={14} className="text-orange-500"/> {tut.trade}
                         </span>
                      </div>
                      
                      {/* Robust Fallback Button */}
                      <a 
                         href={`https://www.youtube.com/results?search_query=${encodeURIComponent(tut.searchQuery)}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center justify-center gap-2 w-full py-2 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-100 transition"
                      >
                          <Play size={12} fill="currentColor" /> Watch on YouTube App
                      </a>
                   </div>
                </div>
             </div>
           ))}
        </div>
        
        {filteredTutorials.length === 0 && (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No videos found for "{searchTerm}".</p>
                <button onClick={() => {setSearchTerm(''); setSelectedCategory('All')}} className="mt-2 text-blue-600 hover:underline">
                    View All Videos
                </button>
            </div>
        )}

      </div>
    </div>
  );
};

export default LearnMachines;