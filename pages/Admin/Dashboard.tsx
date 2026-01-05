
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Briefcase, LogOut, Plus, Trash2, Edit, X, Database, 
  IndianRupee, Home as HomeIcon, MonitorPlay, FileText, 
  PenTool, FileSignature, Calendar, Globe, AlertTriangle, ShieldAlert, Copy, Check
} from 'lucide-react';
import { SiteConfig } from '../../types';
import { dbService, onPermissionError } from '../../services/dbService';
import { db } from '../../services/firebase';

const DEFAULT_CONFIG: SiteConfig = {
  heroTitle: "India’s Largest ITI Students Community",
  heroSubTitle: "Access premium trade theory notes, NCVT papers, job alerts, and apprenticeships.",
  marqueeUpdates: ["🔥 New Updates Loading..."]
};

const AdminDashboard = () => {
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
  const [permissionError, setPermissionError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (!auth) { navigate('/admin'); return; }

    onPermissionError(() => setPermissionError(true));

    const unsubscribers: any[] = [];

    // Listen to all collections
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

    return () => unsubscribers.forEach(u => u());
  }, [navigate]);

  const handleDelete = async (id: any) => {
    if(!window.confirm("Delete globally?")) return;
    await dbService.deleteItem(activeTab, id);
  };

  const handleSaveItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const item: any = editingItem ? { ...editingItem } : { status: 'Live' };
    formData.forEach((value, key) => {
      item[key] = value;
    });
    await dbService.saveItem(activeTab, item);
    setShowModal(false);
    setEditingItem(null);
  };

  const copyRules = () => {
    const rules = `rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /{document=**} {\n      allow read, write: if true;\n    }\n  }\n}`;
    navigator.clipboard.writeText(rules);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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

      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-40">
          <h1 className="text-lg font-bold text-slate-800 capitalize">{activeTab} Management</h1>
          <div className="flex items-center gap-3">
             <div className={`px-3 py-1 ${db ? (permissionError ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100') : 'bg-orange-50 text-orange-700 border-orange-100'} text-[10px] font-black rounded-full border uppercase`}>
                {permissionError ? 'Permission Denied (Check Rules)' : db ? 'Cloud Online' : 'Connecting...'}
             </div>
             <span className="text-xs text-gray-400">Sync: {lastSaved}</span>
          </div>
        </header>

        {permissionError && (
          <div className="m-8 bg-red-50 border-2 border-red-100 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-start">
             <div className="p-4 bg-red-100 text-red-600 rounded-2xl"><ShieldAlert size={40} /></div>
             <div className="flex-1">
                <h2 className="text-xl font-black text-red-800 mb-2">Cloud Database Error: Permissions Denied</h2>
                <p className="text-red-700 mb-4 font-medium">Your Firestore is locked. To fix this, copy the rules below and paste them into your **Firebase Console > Firestore > Rules**:</p>
                <div className="bg-slate-900 rounded-2xl p-4 relative group">
                   <pre className="text-blue-300 text-xs font-mono overflow-x-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`}
                   </pre>
                   <button onClick={copyRules} className="absolute top-4 right-4 p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition">
                      {isCopied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                   </button>
                </div>
             </div>
          </div>
        )}

        <div className="p-8 flex-1">
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

          {activeTab !== 'overview' && activeTab !== 'home' && (
             <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                   <h3 className="font-bold text-slate-800 text-xl capitalize">All {activeTab}</h3>
                   <button onClick={() => {setEditingItem(null); setShowModal(true);}} className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-blue-700 transition">
                     <Plus size={18} /> New Entry
                   </button>
                </div>
                <div className="p-8">
                   {data[activeTab]?.length === 0 ? (
                      <div className="text-center py-20 text-gray-400">
                         <AlertTriangle className="mx-auto mb-4" size={40} />
                         <p className="font-bold">No data found in cloud. Add your first item!</p>
                      </div>
                   ) : (
                      <div className="divide-y divide-gray-100">
                         {data[activeTab]?.map((item: any) => (
                            <div key={item.id} className="py-4 flex justify-between items-center group">
                               <div>
                                  <p className="font-bold text-slate-900">{item.title || item.name || item.examName}</p>
                                  <p className="text-xs text-gray-400">{item.company || item.state || item.trade}</p>
                               </div>
                               <div className="flex gap-2">
                                  <button onClick={() => { setEditingItem(item); setShowModal(true); }} className="p-2 text-slate-400 hover:text-blue-600"><Edit size={18}/></button>
                                  <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={18}/></button>
                               </div>
                            </div>
                         ))}
                      </div>
                   )}
                </div>
             </div>
          )}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <form onSubmit={handleSaveItem} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden">
             <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-2xl font-black text-slate-900 capitalize">{editingItem ? 'Edit' : 'Add'} {activeTab}</h2>
                <button type="button" onClick={() => setShowModal(false)} className="text-gray-400 hover:text-slate-900"><X/></button>
             </div>
             <div className="p-10 space-y-6 max-h-[70vh] overflow-y-auto">
                <input 
                  name={activeTab === 'scholarships' ? 'name' : activeTab === 'admissions' ? 'examName' : 'title'} 
                  defaultValue={editingItem?.title || editingItem?.name || editingItem?.examName} 
                  required 
                  className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl p-4 font-bold outline-none focus:border-blue-500 transition-all"
                  placeholder="Heading / Name"
                />
                
                {activeTab === 'jobs' && (
                  <div className="grid grid-cols-2 gap-4">
                    <input name="company" defaultValue={editingItem?.company} placeholder="Company" className="border-2 border-gray-50 bg-gray-50 p-4 rounded-xl font-bold" />
                    <input name="location" defaultValue={editingItem?.location} placeholder="Location" className="border-2 border-gray-50 bg-gray-50 p-4 rounded-xl font-bold" />
                    <input name="link" defaultValue={editingItem?.link} placeholder="Application URL" className="border-2 border-gray-50 bg-gray-50 p-4 rounded-xl col-span-2 font-bold" />
                  </div>
                )}
                
                <div className="pt-8 flex justify-end gap-4">
                  <button type="button" onClick={() => setShowModal(false)} className="px-8 py-4 font-bold text-gray-400">Cancel</button>
                  <button type="submit" className="px-12 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-lg hover:bg-blue-700 transition">
                    {editingItem ? 'Update Cloud' : 'Save To Cloud'}
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
