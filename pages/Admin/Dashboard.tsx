
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Briefcase, BookOpen, Calendar, GraduationCap, 
  LogOut, Plus, Trash2, Edit, Save, X, Settings, Database, 
  IndianRupee, Bell, ExternalLink, Home as HomeIcon, CheckCircle2, RotateCcw
} from 'lucide-react';
import { Job, Note, SiteConfig } from '../../types';

const STORAGE_KEYS = {
  JOBS: 'iti_dynamic_jobs',
  NOTES: 'iti_dynamic_notes',
  EXAMS: 'iti_dynamic_exams',
  SCHOLARSHIPS: 'iti_dynamic_scholarships',
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
  const [activeTab, setActiveTab] = useState<'overview' | 'home' | 'jobs' | 'notes' | 'exams' | 'scholarships'>('overview');
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [lastSaved, setLastSaved] = useState<string>('');

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (!auth) {
      navigate('/admin');
      return;
    }

    const load = (key: string, fallback: any) => {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    };

    setJobs(load(STORAGE_KEYS.JOBS, []));
    setNotes(load(STORAGE_KEYS.NOTES, []));
    setExams(load(STORAGE_KEYS.EXAMS, []));
    setScholarships(load(STORAGE_KEYS.SCHOLARSHIPS, []));
    setSiteConfig(load(STORAGE_KEYS.CONFIG, DEFAULT_CONFIG));
    setLastSaved(new Date().toLocaleTimeString());
  }, [navigate]);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
    setLastSaved(new Date().toLocaleTimeString());
  };

  const handleDelete = (type: string, id: number) => {
    if(!window.confirm("Are you sure? This change is live immediately.")) return;
    
    let updated;
    if(type === 'jobs') { updated = jobs.filter(j => j.id !== id); setJobs(updated); saveToStorage(STORAGE_KEYS.JOBS, updated); }
    if(type === 'notes') { updated = notes.filter(n => n.id !== id); setNotes(updated); saveToStorage(STORAGE_KEYS.NOTES, updated); }
    if(type === 'exams') { updated = exams.filter(e => e.id !== id); setExams(updated); saveToStorage(STORAGE_KEYS.EXAMS, updated); }
    if(type === 'scholarships') { updated = scholarships.filter(s => s.id !== id); setScholarships(updated); saveToStorage(STORAGE_KEYS.SCHOLARSHIPS, updated); }
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data: any = editingItem ? { ...editingItem } : { id: Date.now(), postedDate: 'Just Now', status: 'Live' };

    formData.forEach((value, key) => {
      if(key === 'tags') data[key] = (value as string).split(',').map(s => s.trim()).filter(Boolean);
      else data[key] = value;
    });

    if(activeTab === 'jobs') {
      const updated = editingItem ? jobs.map(j => j.id === data.id ? data : j) : [data, ...jobs];
      setJobs(updated); saveToStorage(STORAGE_KEYS.JOBS, updated);
    } else if(activeTab === 'notes') {
      const updated = editingItem ? notes.map(n => n.id === data.id ? data : n) : [data, ...notes];
      setNotes(updated); saveToStorage(STORAGE_KEYS.NOTES, updated);
    } else if(activeTab === 'exams') {
      const updated = editingItem ? exams.map(ex => ex.id === data.id ? data : ex) : [data, ...exams];
      setExams(updated); saveToStorage(STORAGE_KEYS.EXAMS, updated);
    } else if(activeTab === 'scholarships') {
      const updated = editingItem ? scholarships.map(s => s.id === data.id ? data : s) : [data, ...scholarships];
      setScholarships(updated); saveToStorage(STORAGE_KEYS.SCHOLARSHIPS, updated);
    }

    setShowModal(false);
    setEditingItem(null);
  };

  const updateSiteConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newConfig: SiteConfig = {
      heroTitle: formData.get('heroTitle') as string,
      heroSubTitle: formData.get('heroSubTitle') as string,
      marqueeUpdates: (formData.get('marquee') as string).split('\n').filter(Boolean)
    };
    setSiteConfig(newConfig);
    saveToStorage(STORAGE_KEYS.CONFIG, newConfig);
    alert("Home Page Updated Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 border-b border-gray-800 flex items-center gap-2">
          <Database className="text-orange-500" />
          <span className="font-bold text-lg">ITI Tech CMS</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'home', label: 'Home Controls', icon: HomeIcon },
            { id: 'jobs', label: 'Manage Jobs', icon: Briefcase },
            { id: 'notes', label: 'Trade Notes', icon: BookOpen },
            { id: 'exams', label: 'Exams/Results', icon: Calendar },
            { id: 'scholarships', label: 'Scholarships', icon: IndianRupee },
          ].map((item: any) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === item.id ? 'bg-blue-600 shadow-lg text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-400 hover:bg-blue-500/10 transition mb-2">
            <ExternalLink size={20} /> View Site
          </button>
          <button onClick={() => { localStorage.removeItem('isAdminAuthenticated'); navigate('/admin'); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-40">
          <h1 className="text-lg font-bold text-gray-800 capitalize">{activeTab} Control</h1>
          <div className="flex items-center gap-4">
            <div className="text-right flex items-center gap-2">
              <div className="text-right">
                <p className="text-xs text-gray-400 font-medium">Last Saved: {lastSaved}</p>
                <p className="text-[10px] text-green-500 font-bold flex items-center gap-1 justify-end">
                   <CheckCircle2 size={10} /> SYNCED
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm">Active Jobs</p>
                <h3 className="text-3xl font-bold mt-1">{jobs.length}</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm">Notes Uploaded</p>
                <h3 className="text-3xl font-bold mt-1">{notes.length}</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm">Exam Updates</p>
                <h3 className="text-3xl font-bold mt-1">{exams.length}</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm">Scholarships</p>
                <h3 className="text-3xl font-bold mt-1">{scholarships.length}</h3>
              </div>
            </div>
          )}

          {activeTab === 'home' && (
            <div className="max-w-3xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                <HomeIcon size={24} className="text-blue-600"/> Home Page Live Content
              </h2>
              <form onSubmit={updateSiteConfig} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Main Hero Title</label>
                  <input name="heroTitle" defaultValue={siteConfig.heroTitle} className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Hero Sub-heading</label>
                  <textarea name="heroSubTitle" defaultValue={siteConfig.heroSubTitle} rows={3} className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Scrolling Marquee News (One per line)</label>
                  <textarea name="marquee" defaultValue={siteConfig.marqueeUpdates.join('\n')} rows={5} className="w-full border rounded-xl p-3 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>
                <button type="submit" className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition flex items-center gap-2">
                  <Save size={20} /> Update Home Page
                </button>
              </form>
            </div>
          )}

          {['jobs', 'notes', 'exams', 'scholarships'].includes(activeTab) && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
               <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">Live {activeTab} Data</h3>
                  <button onClick={() => {setEditingItem(null); setShowModal(true);}} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold hover:bg-blue-700 transition">
                    <Plus size={18} /> New Entry
                  </button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-4 text-left">Content Title</th>
                        <th className="px-6 py-4 text-left">Category/Detail</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(activeTab === 'jobs' ? jobs : activeTab === 'notes' ? notes : activeTab === 'exams' ? exams : scholarships).map((item: any) => (
                        <tr key={item.id} className="hover:bg-gray-50 group">
                          <td className="px-6 py-4 font-bold text-gray-900">{item.title || item.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{item.company || item.branch || item.board || item.provider}</td>
                          <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                            <button onClick={() => { setEditingItem(item); setShowModal(true); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"><Edit size={16}/></button>
                            <button onClick={() => handleDelete(activeTab, item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 size={16}/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>
          )}
        </div>
      </main>

      {/* Dynamic Modal for Editing/Adding */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleSaveItem} className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
               <h2 className="text-xl font-bold text-gray-900">{editingItem ? 'Edit' : 'Add New'} {activeTab}</h2>
               <button type="button" onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-200 rounded-full transition"><X/></button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title / Heading</label>
                  <input name={activeTab === 'scholarships' ? 'name' : 'title'} defaultValue={editingItem?.title || editingItem?.name} required type="text" className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" />
               </div>

               {activeTab === 'jobs' && (
                 <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company</label>
                       <input name="company" defaultValue={editingItem?.company} required className="w-full border rounded-xl p-3" />
                    </div>
                    <div className="col-span-1">
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
                       <input name="location" defaultValue={editingItem?.location} required className="w-full border rounded-xl p-3" />
                    </div>
                 </div>
               )}
               
               {activeTab === 'notes' && (
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Trade</label>
                        <input name="branch" defaultValue={editingItem?.branch} required className="w-full border rounded-xl p-3" />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subject</label>
                        <input name="subject" defaultValue={editingItem?.subject} required className="w-full border rounded-xl p-3" />
                     </div>
                  </div>
               )}

               <div className="flex justify-end gap-3 pt-4">
                 <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition">Discard</button>
                 <button type="submit" className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition flex items-center gap-2">
                   <Save size={18} /> {editingItem ? 'Save Changes' : 'Publish Live'}
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
