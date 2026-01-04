
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Briefcase, LogOut, Plus, Trash2, Edit, Save, X, Database, 
  IndianRupee, ExternalLink, Home as HomeIcon, MonitorPlay, FileText, 
  PenTool, FileSignature, Calendar, Search, Globe
} from 'lucide-react';
import { SiteConfig } from '../../types';

const STORAGE_KEYS = {
  JOBS: 'iti_dynamic_jobs',
  EXAMS: 'iti_dynamic_exams',
  SCHOLARSHIPS: 'iti_dynamic_scholarships',
  ADMISSIONS: 'iti_dynamic_admissions',
  HANDWRITTEN: 'iti_dynamic_handwritten',
  MACHINES: 'iti_dynamic_machines',
  PYQS: 'iti_dynamic_pyqs',
  CONFIG: 'iti_site_config'
};

const DEFAULT_CONFIG: SiteConfig = {
  heroTitle: "India’s Largest ITI Students Community",
  heroSubTitle: "Access premium trade theory notes, NCVT papers, job alerts, and apprenticeships. Empowering your technical skill journey.",
  marqueeUpdates: [
    "🔥 RRB ALP 2026 Notification Out (Technician Posts)",
    "🚀 Tata Motors ITI Apprentice 2026 Applications Open",
    "💼 DRDO CEPTAM-11 Technician-A Recruitment"
  ]
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [data, setData] = useState<any>({
    jobs: [],
    exams: [],
    scholarships: [],
    admissions: [],
    handwritten: [],
    machines: [],
    pyqs: []
  });
  
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [lastSaved, setLastSaved] = useState<string>('');

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (!auth) { navigate('/admin'); return; }

    const load = () => {
      const getLoad = (key: string) => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
      };

      setData({
        jobs: getLoad(STORAGE_KEYS.JOBS),
        exams: getLoad(STORAGE_KEYS.EXAMS),
        scholarships: getLoad(STORAGE_KEYS.SCHOLARSHIPS),
        admissions: getLoad(STORAGE_KEYS.ADMISSIONS),
        handwritten: getLoad(STORAGE_KEYS.HANDWRITTEN),
        machines: getLoad(STORAGE_KEYS.MACHINES),
        pyqs: getLoad(STORAGE_KEYS.PYQS)
      });
      
      const config = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (config) setSiteConfig(JSON.parse(config));
      
      setLastSaved(new Date().toLocaleTimeString());
    };

    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, [navigate]);

  const saveToStorage = (key: string, newData: any) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setLastSaved(new Date().toLocaleTimeString());
    window.dispatchEvent(new Event('storage'));
  };

  const handleDelete = (id: number) => {
    if(!window.confirm("Delete this entry forever? It will be removed from the live site immediately.")) return;
    const currentData = data[activeTab];
    const updated = currentData.filter((item: any) => item.id !== id);
    setData({ ...data, [activeTab]: updated });
    saveToStorage((STORAGE_KEYS as any)[activeTab.toUpperCase()], updated);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const item: any = editingItem ? { ...editingItem } : { id: Date.now(), postedDate: 'Just Now', status: 'Live' };

    formData.forEach((value, key) => {
      if(key === 'tags') item[key] = (value as string).split(',').map(s => s.trim()).filter(Boolean);
      else item[key] = value;
    });

    const currentList = data[activeTab];
    const updatedList = editingItem 
      ? currentList.map((i: any) => i.id === item.id ? item : i)
      : [item, ...currentList];

    setData({ ...data, [activeTab]: updatedList });
    saveToStorage((STORAGE_KEYS as any)[activeTab.toUpperCase()], updatedList);
    
    setShowModal(false);
    setEditingItem(null);
  };

  const updateHome = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newConfig: SiteConfig = {
      heroTitle: formData.get('heroTitle') as string,
      heroSubTitle: formData.get('heroSubTitle') as string,
      marqueeUpdates: (formData.get('marquee') as string).split('\n').filter(Boolean)
    };
    setSiteConfig(newConfig);
    saveToStorage(STORAGE_KEYS.CONFIG, newConfig);
    alert("Home Page updated!");
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'home', label: 'Home Setup', icon: HomeIcon },
    { id: 'exams', label: 'Exam & Results', icon: Calendar },
    { id: 'admissions', label: 'ITI Admission', icon: FileSignature },
    { id: 'handwritten', label: 'Hand Written Notes', icon: PenTool },
    { id: 'machines', label: 'Learn Machines', icon: MonitorPlay },
    { id: 'pyqs', label: 'Trade Papers', icon: FileText },
    { id: 'jobs', label: 'Jobs & Openings', icon: Briefcase },
    { id: 'scholarships', label: 'Scholarships', icon: IndianRupee },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">A</div>
          <span className="font-bold text-lg tracking-tight">Admin Console</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition text-sm font-bold mb-2">
            <Globe size={16} /> View Website
          </button>
          <button onClick={() => { localStorage.removeItem('isAdminAuthenticated'); navigate('/admin'); }} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition text-sm font-bold">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dashboard /</span>
            <h1 className="text-lg font-bold text-slate-800 capitalize">{activeTab.replace('_', ' ')}</h1>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black rounded-full border border-green-100 uppercase animate-pulse">Live Sync Active</div>
             <span className="text-xs text-gray-400 font-medium">{lastSaved}</span>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {menuItems.slice(2).map(m => (
                 <div key={m.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition cursor-pointer" onClick={() => setActiveTab(m.id)}>
                    <div className="p-4 bg-slate-50 text-blue-600 rounded-2xl"><m.icon size={28}/></div>
                    <div>
                       <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{m.label}</p>
                       <h3 className="text-3xl font-extrabold text-slate-900">{data[m.id]?.length || 0}</h3>
                    </div>
                 </div>
              ))}
            </div>
          )}

          {activeTab === 'home' && (
            <div className="max-w-4xl bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
               <h2 className="text-2xl font-bold text-slate-900 mb-6">Home Landing Page Configuration</h2>
               <form onSubmit={updateHome} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Primary Hero Title</label>
                    <input name="heroTitle" defaultValue={siteConfig.heroTitle} className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 focus:bg-white focus:border-blue-500 transition-all outline-none font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Secondary Sub-title Description</label>
                    <textarea name="heroSubTitle" defaultValue={siteConfig.heroSubTitle} rows={4} className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 focus:bg-white focus:border-blue-500 transition-all outline-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Live News Marquee (One Update Per Line)</label>
                    <textarea name="marquee" defaultValue={siteConfig.marqueeUpdates.join('\n')} rows={6} className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 focus:bg-white focus:border-blue-500 transition-all outline-none font-mono text-sm"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200">
                    Apply Homepage Changes
                  </button>
               </form>
            </div>
          )}

          {data[activeTab] && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-slate-800 text-xl">Manage {activeTab}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-md">{data[activeTab].length} items</span>
                  </div>
                  <button onClick={() => {setEditingItem(null); setShowModal(true);}} className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
                    <Plus size={18} /> Add New Entry
                  </button>
               </div>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-gray-50/80 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                     <tr>
                        <th className="px-8 py-5">Item Information</th>
                        <th className="px-8 py-5">Category / Metadata</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {data[activeTab].map((item: any) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-all group">
                          <td className="px-8 py-5">
                             <div className="font-bold text-slate-900 text-base">{item.title || item.name || item.examName}</div>
                             <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-black text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">ID: {item.id}</span>
                                {item.link && <span className="text-[10px] text-blue-600 flex items-center gap-0.5"><ExternalLink size={10}/> Linked</span>}
                             </div>
                          </td>
                          <td className="px-8 py-5">
                             <div className="text-sm font-semibold text-slate-500">
                                {item.company || item.trade || item.state || item.provider || item.board}
                             </div>
                             <div className="text-[10px] text-gray-400 mt-0.5">{item.subject || item.type || item.category || 'Standard Entry'}</div>
                          </td>
                          <td className="px-8 py-5">
                             <div className="flex justify-end gap-2">
                                <button onClick={() => { setEditingItem(item); setShowModal(true); }} className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit size={18}/></button>
                                <button onClick={() => handleDelete(item.id)} className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18}/></button>
                             </div>
                          </td>
                        </tr>
                     ))}
                   </tbody>
                 </table>
                 {data[activeTab].length === 0 && (
                   <div className="py-32 text-center text-gray-400">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6"><Database size={40} className="opacity-20"/></div>
                      <p className="font-bold">No entries created for {activeTab} yet.</p>
                      <button onClick={() => setShowModal(true)} className="mt-4 text-blue-600 font-bold hover:underline">Create your first entry</button>
                   </div>
                 )}
               </div>
            </div>
          )}
        </div>
      </main>

      {/* Dynamic Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <form onSubmit={handleSaveItem} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
                <div>
                   <h2 className="text-2xl font-black text-slate-900 capitalize tracking-tight">{editingItem ? 'Update' : 'New'} {activeTab.replace('_', ' ')}</h2>
                   <p className="text-sm text-slate-500 font-medium mt-1">Fill the details to publish live updates instantly.</p>
                </div>
                <button type="button" onClick={() => setShowModal(false)} className="p-3 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200 shadow-sm"><X/></button>
             </div>

             <div className="p-10 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
                {/* Title / Primary Name Field */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">
                    {['scholarships', 'admissions'].includes(activeTab) ? 'Program / Exam Name' : 'Main Title / Heading'}
                  </label>
                  <input 
                    name={activeTab === 'scholarships' ? 'name' : activeTab === 'admissions' ? 'examName' : 'title'} 
                    defaultValue={editingItem?.title || editingItem?.name || editingItem?.examName} 
                    required 
                    className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 focus:bg-white focus:border-blue-500 transition-all outline-none font-bold text-slate-800"
                    placeholder="e.g. RRB Technician Grade-1 Recruitment 2026"
                  />
                </div>

                {/* Module Specific Enhancements */}
                {activeTab === 'jobs' && (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-1">
                      <label className="block text-xs font-black text-slate-400 uppercase mb-2">Recruiting Body / Company</label>
                      <input name="company" defaultValue={editingItem?.company} required className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 font-bold" placeholder="e.g. DRDO / Maruti Suzuki" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-xs font-black text-slate-400 uppercase mb-2">Work Location</label>
                      <input name="location" defaultValue={editingItem?.location} required className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 font-bold" placeholder="e.g. Pan India / Delhi" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-black text-blue-500 uppercase mb-2">Official Job Link (Student will click this)</label>
                      <input name="link" defaultValue={editingItem?.link} required className="w-full border-2 border-blue-50 bg-blue-50 rounded-2xl p-4 font-bold focus:bg-white focus:border-blue-500 transition-all outline-none" placeholder="https://recruitment.company.com/apply" />
                    </div>
                    <div className="col-span-2">
                       <label className="block text-xs font-black text-slate-400 uppercase mb-2">Job Tags (Comma separated)</label>
                       <input name="tags" defaultValue={editingItem?.tags?.join(', ')} className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4" placeholder="ITI, Fitter, Electrician, Govt" />
                    </div>
                  </div>
                )}

                {activeTab === 'handwritten' && (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-1">
                      <label className="block text-xs font-black text-slate-400 uppercase mb-2">Specific Trade</label>
                      <input name="trade" defaultValue={editingItem?.trade} required className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 font-bold" placeholder="e.g. Electrician / Fitter" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-xs font-black text-slate-400 uppercase mb-2">Chapter / Subject</label>
                      <input name="subject" defaultValue={editingItem?.subject} required className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl p-4 font-bold" placeholder="e.g. AC Theory / Safety" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-black text-orange-600 uppercase mb-2">PDF Document URL (Drive/S3 Link)</label>
                      <input name="link" defaultValue={editingItem?.link} required className="w-full border-2 border-orange-50 bg-orange-50 rounded-2xl p-4 font-bold focus:bg-white focus:border-orange-500 transition-all outline-none" placeholder="Paste Google Drive PDF Link here" />
                    </div>
                  </div>
                )}

                {activeTab === 'scholarships' && (
                  <div className="grid grid-cols-2 gap-6">
                     <div className="col-span-1">
                       <label className="block text-xs font-black text-slate-400 uppercase mb-2">Scholarship Provider</label>
                       <input name="provider" defaultValue={editingItem?.provider} required className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 font-bold" />
                     </div>
                     <div className="col-span-1">
                       <label className="block text-xs font-black text-slate-400 uppercase mb-2">Amount (₹)</label>
                       <input name="amount" defaultValue={editingItem?.amount} required className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 font-bold" placeholder="e.g. ₹12,000" />
                     </div>
                     <div className="col-span-2">
                        <label className="block text-xs font-black text-green-600 uppercase mb-2">Official Application Link</label>
                        <input name="applyLink" defaultValue={editingItem?.applyLink} required className="w-full border-2 border-green-50 bg-green-50 rounded-2xl p-4 font-bold outline-none focus:bg-white focus:border-green-500 transition-all" />
                     </div>
                  </div>
                )}

                {activeTab === 'exams' && (
                   <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-1">
                        <label className="block text-xs font-black text-slate-400 uppercase mb-2">Board / Council</label>
                        <input name="board" defaultValue={editingItem?.board} required className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 font-bold" placeholder="e.g. NCVT / SCVT" />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-xs font-black text-slate-400 uppercase mb-2">State / Region</label>
                        <input name="state" defaultValue={editingItem?.state} required className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 font-bold" placeholder="e.g. Uttar Pradesh / Bihar" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-black text-blue-600 uppercase mb-2">Result/Notice Link</label>
                        <input name="link" defaultValue={editingItem?.link} required className="w-full border-2 border-blue-50 bg-blue-50 rounded-2xl p-4 font-bold" />
                      </div>
                   </div>
                )}

                {activeTab === 'admissions' && (
                   <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-1">
                        <label className="block text-xs font-black text-slate-400 uppercase mb-2">State Name</label>
                        <input name="state" defaultValue={editingItem?.state} required className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 font-bold" />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-xs font-black text-slate-400 uppercase mb-2">Admission Start Date</label>
                        <input name="startDate" defaultValue={editingItem?.startDate} required className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 font-bold" placeholder="e.g. June 2026" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-black text-red-600 uppercase mb-2">Portal Registration Link</label>
                        <input name="applyLink" defaultValue={editingItem?.applyLink} required className="w-full border-2 border-red-50 bg-red-50 rounded-2xl p-4 font-bold" />
                      </div>
                   </div>
                )}

                <div className="pt-8 border-t border-gray-100 flex justify-end gap-4">
                  <button type="button" onClick={() => setShowModal(false)} className="px-8 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all">Discard Changes</button>
                  <button type="submit" className="px-12 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-900/10 hover:bg-blue-700 transition-all flex items-center gap-2">
                    <Save size={20} /> {editingItem ? 'Update Live' : 'Publish Now'}
                  </button>
                </div>
             </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
