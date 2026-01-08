
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, LogOut, Plus, Trash2, Edit, X, Database, 
  IndianRupee, Home as HomeIcon, MonitorPlay, FileText, 
  PenTool, FileSignature, Calendar, Globe, Loader2, Save, Settings, Info,
  Mail, Palette, UserCircle, Image as ImageIcon, Layout, CheckCircle2, ShieldCheck
} from 'lucide-react';
import { dbService } from '../../services/dbService';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('exams'); 
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (!auth) { navigate('/admin'); return; }
    loadData();
  }, [activeTab, navigate]);

  const loadData = () => {
    setLoading(true);
    if (activeTab === 'siteConfig') {
      dbService.listenToConfig((config) => {
        setData([config]);
        setLoading(false);
      });
    } else if (activeTab === 'profile') {
      dbService.getAdminProfile().then(p => {
        setData([p]);
        setLoading(false);
      });
    } else {
      dbService.listenToCollection(activeTab, (items) => {
        setData(items);
        setLoading(false);
      });
    }
  };

  const handleDelete = async (id: any) => {
    if(!window.confirm("Are you sure? This will remove it from live site.")) return;
    await dbService.deleteItem(activeTab, id);
    loadData();
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaveStatus('saving');
    const formData = new FormData(e.currentTarget);
    const item: any = editingItem ? { ...editingItem } : {};
    
    formData.forEach((value, key) => { 
      item[key] = typeof value === 'string' ? value.trim() : value; 
    });
    
    // Safety check for exams
    if (activeTab === 'exams') {
      if (!item.type) item.type = 'Schedule';
      if (!item.state) item.state = 'All India';
    }
    
    let res;
    if (activeTab === 'siteConfig') {
      res = await dbService.saveItem('settings', { ...item, id: 'siteConfig' });
    } else if (activeTab === 'profile') {
      await dbService.saveAdminProfile(item);
      res = { success: true };
    } else {
      res = await dbService.saveItem(activeTab, item);
    }
    
    if (res?.success) {
      setSaveStatus('success');
      setTimeout(() => {
        setShowModal(false);
        setEditingItem(null);
        setSaveStatus('idle');
        loadData();
      }, 1000);
    } else {
      setSaveStatus('error');
      alert("Cloud Connection Failed!");
    }
  };

  const menuItems = [
    { id: 'siteConfig', label: 'Website Control', icon: Layout },
    { id: 'exams', label: 'Exams & Results', icon: Calendar },
    { id: 'jobs', label: 'Jobs Portal', icon: Briefcase },
    { id: 'notes', label: 'Trade Notes', icon: Info },
    { id: 'pyqs', label: 'Old Papers', icon: FileText },
    { id: 'admissions', label: 'Admissions', icon: FileSignature },
    { id: 'scholarships', label: 'Scholarships', icon: IndianRupee },
    { id: 'handwritten', label: 'Handwritten', icon: PenTool },
    { id: 'machines', label: 'Machine Lab', icon: MonitorPlay },
    { id: 'contacts', label: 'Leads', icon: Mail },
    { id: 'profile', label: 'Admin Access', icon: UserCircle },
  ];

  const getFields = (tab: string) => {
    const fields: Record<string, any[]> = {
      exams: [
        { name: 'title', label: 'Update Title (e.g. Bihar ITI Result)', type: 'text' },
        { name: 'type', label: 'Select Category', type: 'select', options: ['Schedule', 'Result'] },
        { name: 'state', label: 'State (e.g. Bihar, Uttar Pradesh)', type: 'text' },
        { name: 'board', label: 'Board (NCVT/SCVT)', type: 'text' },
        { name: 'date', label: 'Display Date', type: 'text' },
        { name: 'link', label: 'PDF/Link URL', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' }
      ],
      jobs: [
        { name: 'title', label: 'Job Title', type: 'text' },
        { name: 'company', label: 'Company Name', type: 'text' },
        { name: 'type', label: 'Job Type', type: 'text' },
        { name: 'link', label: 'Apply URL', type: 'text' }
      ],
      notes: [
        { name: 'title', label: 'Note Title', type: 'text' },
        { name: 'subject', label: 'Subject', type: 'text' },
        { name: 'branch', label: 'Trade', type: 'text' },
        { name: 'link', label: 'PDF URL', type: 'text' }
      ]
    };
    return fields[tab] || [{ name: 'title', label: 'Title', type: 'text' }, { name: 'link', label: 'Link', type: 'text' }];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 z-20">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <ShieldCheck size={24} className="text-blue-500" />
          <span className="font-black text-xl tracking-tighter">CLOUD CMS</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-bold">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => { localStorage.removeItem('isAdminAuthenticated'); navigate('/admin'); }} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 font-bold hover:bg-red-900/10 rounded-xl transition"><LogOut size={18} /> Logout</button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Managing {menuItems.find(m => m.id === activeTab)?.label}</h1>
            <p className="text-slate-400 font-bold mt-1 uppercase text-xs tracking-widest">Active Collection: <span className="text-blue-600 font-black">{activeTab}</span></p>
          </div>
          {['siteConfig', 'profile', 'contacts'].indexOf(activeTab) === -1 && (
            <button onClick={() => { setEditingItem(null); setShowModal(true); }} className="bg-blue-600 text-white px-8 py-4 rounded-2xl flex items-center gap-2 font-black shadow-xl hover:bg-blue-700 transition active:scale-95">
              <Plus size={20} /> Add New Entry
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Entry</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="px-8 py-5">
                      <div className="font-black text-slate-900 text-lg">{item.title || item.examName || "Untitled Entry"}</div>
                      <div className="text-xs text-slate-400 font-bold uppercase mt-1 flex gap-2">
                        <span className="text-blue-600 font-black">[{item.type || 'N/A'}]</span>
                        <span>•</span>
                        <span>{item.state || item.subject || "Cloud DB"}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right flex justify-end gap-2">
                      <button onClick={() => { setEditingItem(item); setShowModal(true); }} className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition"><Edit size={20}/></button>
                      <button onClick={() => handleDelete(item.id)} className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition"><Trash2 size={20}/></button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr><td colSpan={2} className="px-8 py-20 text-center text-slate-300 font-black uppercase text-xs tracking-widest">Database is empty for this tab.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <form onSubmit={handleSave} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="px-10 py-8 border-b flex justify-between items-center bg-slate-50">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Cloud Form: {activeTab}</h2>
              <button type="button" onClick={() => setShowModal(false)} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 transition"><X size={24}/></button>
            </div>
            <div className="p-10 space-y-6 max-h-[65vh] overflow-y-auto scrollbar-hide">
              {saveStatus === 'success' ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <CheckCircle2 size={64} className="text-green-500 mb-4 animate-bounce" />
                  <h3 className="text-2xl font-black text-slate-900">Push Successful!</h3>
                  <p className="text-slate-400 font-bold">The website has been updated live.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getFields(activeTab).map((field) => (
                    <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">{field.label}</label>
                      {field.type === 'textarea' ? (
                        <textarea name={field.name} defaultValue={editingItem?.[field.name] || ''} required rows={3} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium" />
                      ) : field.type === 'select' ? (
                        <select name={field.name} defaultValue={editingItem?.[field.name] || field.options?.[0]} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-800 appearance-none">
                          {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input name={field.name} defaultValue={editingItem?.[field.name] || ''} required className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-800" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {saveStatus !== 'success' && (
              <div className="px-10 py-8 bg-slate-50 border-t flex justify-end gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-8 py-4 text-slate-400 font-black text-sm">Cancel</button>
                <button type="submit" disabled={saveStatus === 'saving'} className="px-12 py-4 bg-blue-600 text-white text-sm font-black rounded-2xl shadow-xl hover:bg-blue-700 transition flex items-center gap-2">
                  {saveStatus === 'saving' ? <Loader2 size={18} className="animate-spin" /> : <Save size={18}/>}
                  {saveStatus === 'saving' ? 'Syncing...' : 'Push Updates'}
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
