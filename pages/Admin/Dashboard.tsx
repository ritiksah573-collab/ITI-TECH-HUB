
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Briefcase, LogOut, Plus, Trash2, Edit, Save, X, Database, 
  IndianRupee, ExternalLink, Home as HomeIcon, MonitorPlay, FileText, 
  PenTool, FileSignature, Calendar, Search, Globe, Share2, Download, Upload, AlertCircle
} from 'lucide-react';
import { SiteConfig } from '../../types';
import { dbService } from '../../services/dbService';

const DEFAULT_CONFIG: SiteConfig = {
  heroTitle: "India’s Largest ITI Students Community",
  heroSubTitle: "Access premium trade theory notes, NCVT papers, job alerts, and apprenticeships.",
  marqueeUpdates: ["🔥 New Updates Loading..."]
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [data, setData] = useState<any>({
    jobs: [], exams: [], scholarships: [], admissions: [],
    handwritten: [], machines: [], pyqs: []
  });
  
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [lastSaved, setLastSaved] = useState<string>('');
  const [isCloudActive, setIsCloudActive] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (!auth) { navigate('/admin'); return; }

    const unsubscribers: any[] = [];

    // Listen to all collections in real-time from Cloud
    Object.keys(data).forEach(key => {
      const unsub = dbService.listenToCollection(key, (items) => {
        setData((prev: any) => ({ ...prev, [key]: items }));
        setLastSaved(new Date().toLocaleTimeString());
      });
      unsubscribers.push(unsub);
    });

    const unsubConfig = dbService.listenToConfig((config) => {
      if (config) setSiteConfig(config);
    });
    unsubscribers.push(unsubConfig);

    // Check if real database is connected
    import('../../services/firebase').then(fb => {
        setIsCloudActive(!!fb.db);
    });

    return () => unsubscribers.forEach(u => u());
  }, [navigate]);

  const handleDelete = async (id: any) => {
    if(!window.confirm("Delete globally? This will remove it for all users across India.")) return;
    await dbService.deleteItem(activeTab, id);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const item: any = editingItem ? { ...editingItem } : { status: 'Live' };

    formData.forEach((value, key) => {
      if(key === 'tags') item[key] = (value as string).split(',').map(s => s.trim()).filter(Boolean);
      else item[key] = value;
    });

    await dbService.saveItem(activeTab, item);
    setShowModal(false);
    setEditingItem(null);
  };

  const updateHome = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newConfig: SiteConfig = {
      heroTitle: formData.get('heroTitle') as string,
      heroSubTitle: formData.get('heroSubTitle') as string,
      marqueeUpdates: (formData.get('marquee') as string).split('\n').filter(Boolean)
    };
    await dbService.saveConfig(newConfig);
    alert("Homepage Global Updates Applied!");
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
          <span className="font-bold text-lg tracking-tight">Cloud Admin</span>
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
            <Globe size={16} /> Live Site
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
            <h1 className="text-lg font-bold text-slate-800 capitalize tracking-tight">{activeTab} Management</h1>
          </div>
          <div className="flex items-center gap-3">
             <div className={`px-3 py-1 ${isCloudActive ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100'} text-[10px] font-black rounded-full border uppercase`}>
                {isCloudActive ? 'Cloud Database Connected' : 'Local Sandbox Mode'}
             </div>
             <span className="text-xs text-gray-400 font-medium">Sync: {lastSaved}</span>
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
               <h2 className="text-2xl font-bold text-slate-900 mb-6">Cloud Content Config</h2>
               <form onSubmit={updateHome} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Main Title</label>
                    <input name="heroTitle" defaultValue={siteConfig.heroTitle} className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Sub Title</label>
                    <textarea name="heroSubTitle" defaultValue={siteConfig.heroSubTitle} rows={3} className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">News Marquee (One per line)</label>
                    <textarea name="marquee" defaultValue={siteConfig.marqueeUpdates.join('\n')} rows={5} className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 font-mono text-sm"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all">
                    Update Global Site Appearance
                  </button>
               </form>
            </div>
          )}

          {data[activeTab] && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="font-bold text-slate-800 text-xl capitalize">Manage {activeTab}</h3>
                  <button onClick={() => {setEditingItem(null); setShowModal(true);}} className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-blue-700 transition">
                    <Plus size={18} /> Add Entry
                  </button>
               </div>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-gray-50/80 text-gray-400 text-[10px] font-black uppercase">
                     <tr>
                        <th className="px-8 py-5">Title</th>
                        <th className="px-8 py-5">Info</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {data[activeTab].map((item: any) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-all">
                          <td className="px-8 py-5 font-bold text-slate-900">
                             {item.title || item.name || item.examName}
                          </td>
                          <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                             {item.company || item.trade || item.state || item.board}
                          </td>
                          <td className="px-8 py-5">
                             <div className="flex justify-end gap-2">
                                <button onClick={() => { setEditingItem(item); setShowModal(true); }} className="p-2 text-slate-400 hover:text-blue-600"><Edit size={18}/></button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={18}/></button>
                             </div>
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

      {/* Modal remains same but calls dbService */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <form onSubmit={handleSaveItem} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden">
             <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-900 capitalize">{editingItem ? 'Edit' : 'New'} {activeTab}</h2>
                <button type="button" onClick={() => setShowModal(false)}><X/></button>
             </div>
             <div className="p-10 space-y-6 max-h-[70vh] overflow-y-auto">
                <input 
                  name={activeTab === 'scholarships' ? 'name' : activeTab === 'admissions' ? 'examName' : 'title'} 
                  defaultValue={editingItem?.title || editingItem?.name || editingItem?.examName} 
                  required 
                  className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 font-bold"
                  placeholder="Title or Heading"
                />
                
                {/* Specific Fields (same as before) */}
                {activeTab === 'jobs' && (
                  <div className="grid grid-cols-2 gap-4">
                    <input name="company" defaultValue={editingItem?.company} placeholder="Company" className="border-2 border-gray-50 bg-gray-50 p-4 rounded-xl" />
                    <input name="link" defaultValue={editingItem?.link} placeholder="Job Link" className="border-2 border-gray-50 bg-gray-50 p-4 rounded-xl col-span-2" />
                  </div>
                )}
                
                <div className="pt-8 flex justify-end gap-4">
                  <button type="button" onClick={() => setShowModal(false)} className="px-8 py-4 font-bold text-gray-400">Cancel</button>
                  <button type="submit" className="px-12 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-lg">
                    {editingItem ? 'Update Globally' : 'Publish Live'}
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
