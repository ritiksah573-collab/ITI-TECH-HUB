
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, LogOut, Plus, Trash2, Edit, X, Database, 
  IndianRupee, Home as HomeIcon, MonitorPlay, FileText, 
  PenTool, FileSignature, Calendar, Globe, Loader2, Save, Settings, Info,
  Mail, Palette, UserCircle, Image as ImageIcon, Layout, CheckCircle2
} from 'lucide-react';
import { dbService } from '../../services/dbService';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('exams'); // Default to exams for checking
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
    if(!window.confirm("Delete this permanently?")) return;
    await dbService.deleteItem(activeTab, id);
    loadData();
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaveStatus('saving');
    const formData = new FormData(e.currentTarget);
    
    const item: any = editingItem ? { ...editingItem } : {};
    
    formData.forEach((value, key) => { 
      if (key === 'marqueeUpdates' && typeof value === 'string') {
        item[key] = value.split(',').map(s => s.trim()).filter(s => s !== "");
      } else {
        item[key] = typeof value === 'string' ? value.trim() : value; 
      }
    });
    
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
      alert("Failed to save to Cloud.");
    }
  };

  const menuItems = [
    { id: 'siteConfig', label: 'Website Control', icon: Layout },
    { id: 'contacts', label: 'Contact Leads', icon: Mail },
    { id: 'exams', label: 'Exams & Results', icon: Calendar },
    { id: 'admissions', label: 'Admissions', icon: FileSignature },
    { id: 'notes', label: 'Trade Notes', icon: Info },
    { id: 'handwritten', label: 'Handwritten', icon: PenTool },
    { id: 'pyqs', label: 'Trade Papers', icon: FileText },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'scholarships', label: 'Scholarships', icon: IndianRupee },
    { id: 'machines', label: 'Machines', icon: MonitorPlay },
    { id: 'profile', label: 'Admin Security', icon: UserCircle },
  ];

  const getFormFields = () => {
    // Explicit matching for 'exams' to avoid any fallback issues
    if (activeTab === 'exams') {
        return [
          { name: 'title', label: 'Exam Title (e.g. NCVT CBT)', type: 'text' },
          { name: 'type', label: 'Category', type: 'select', options: ['Schedule', 'Result'] },
          { name: 'state', label: 'State Name', type: 'text' },
          { name: 'board', label: 'Board (NCVT/SCVT)', type: 'text' },
          { name: 'date', label: 'Date/Year', type: 'text' },
          { name: 'link', label: 'Direct Link URL', type: 'text' },
          { name: 'description', label: 'Details', type: 'textarea' }
        ];
    }

    switch(activeTab) {
      case 'siteConfig':
        return [
          { name: 'siteName', label: 'Website Name', type: 'text' },
          { name: 'logoUrl', label: 'Logo Image URL', type: 'text' },
          { name: 'primaryColor', label: 'Brand Color', type: 'text' },
          { name: 'heroTitle', label: 'Headline', type: 'text' },
          { name: 'heroSubTitle', label: 'Sub Headline', type: 'textarea' },
          { name: 'marqueeUpdates', label: 'Marquee News (Comma separated)', type: 'text' }
        ];
      case 'jobs':
        return [
          { name: 'title', label: 'Job Title', type: 'text' },
          { name: 'company', label: 'Company', type: 'text' },
          { name: 'link', label: 'Apply URL', type: 'text' },
          { name: 'type', label: 'Govt/Private', type: 'text' }
        ];
      case 'notes':
        return [
           { name: 'title', label: 'Note Title', type: 'text' },
           { name: 'subject', label: 'Subject', type: 'text' },
           { name: 'branch', label: 'Trade', type: 'text' },
           { name: 'semester', label: 'Year', type: 'text' },
           { name: 'link', label: 'PDF Link', type: 'text' }
        ];
      default:
        return [
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'link', label: 'Link', type: 'text' }
        ];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 z-20 shadow-xl">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <Database size={24} className="text-blue-500" />
          <span className="font-black text-xl tracking-tighter">CLOUD CMS</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === item.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
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
            <h1 className="text-4xl font-black text-slate-900 capitalize tracking-tight">{activeTab} Control</h1>
            <p className="text-slate-400 font-bold mt-1">Live sync with ITI Hub Website.</p>
          </div>
          {['siteConfig', 'profile', 'contacts'].indexOf(activeTab) === -1 && (
            <button onClick={() => { setEditingItem(null); setShowModal(true); }} className="bg-blue-600 text-white px-8 py-4 rounded-2xl flex items-center gap-2 font-black shadow-xl hover:bg-blue-700 transition">
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
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Details</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="px-8 py-5">
                      <div className="font-black text-slate-900 text-lg">{item.title || item.examName || "Untitled"}</div>
                      <div className="text-xs text-slate-400 font-bold uppercase mt-1">
                        {item.type ? `[${item.type}] ` : '[NO CATEGORY] '} 
                        {item.state || item.subject || "Cloud Data"}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right flex justify-end gap-2">
                      <button onClick={() => { setEditingItem(item); setShowModal(true); }} className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition"><Edit size={20}/></button>
                      <button onClick={() => handleDelete(item.id)} className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition"><Trash2 size={20}/></button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={2} className="px-8 py-20 text-center text-slate-300 font-black uppercase text-xs tracking-widest">No cloud entries found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <form onSubmit={handleSave} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="px-10 py-8 border-b flex justify-between items-center bg-slate-50">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Manage {activeTab}</h2>
              <button type="button" onClick={() => setShowModal(false)} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-300 hover:text-red-500 transition"><X size={24}/></button>
            </div>
            <div className="p-10 space-y-6 max-h-[65vh] overflow-y-auto scrollbar-hide">
              {saveStatus === 'success' ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <CheckCircle2 size={64} className="text-green-500 mb-4 animate-bounce" />
                  <h3 className="text-2xl font-black text-slate-900">Success!</h3>
                  <p className="text-slate-400 font-bold">Cloud updated successfully.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getFormFields().map((field) => (
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
