
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, LogOut, Plus, Trash2, Edit, X, Database, 
  IndianRupee, Home as HomeIcon, MonitorPlay, FileText, 
  PenTool, FileSignature, Calendar, Globe, Loader2, Save, Settings, Info,
  Mail, Palette, UserCircle, Image as ImageIcon, Layout
} from 'lucide-react';
import { dbService } from '../../services/dbService';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('jobs');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

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
    const formData = new FormData(e.currentTarget);
    const item: any = editingItem?.id ? { id: editingItem.id } : {};
    
    formData.forEach((value, key) => { 
      if (key === 'marqueeUpdates' && typeof value === 'string') {
        item[key] = value.split(',').map(s => s.trim());
      } else {
        item[key] = value; 
      }
    });
    
    if (activeTab === 'siteConfig') {
      await dbService.saveItem('settings', { ...item, id: 'siteConfig' });
    } else if (activeTab === 'profile') {
      await dbService.saveAdminProfile(item);
    } else {
      await dbService.saveItem(activeTab, item);
    }
    
    setShowModal(false);
    setEditingItem(null);
    loadData();
  };

  const menuItems = [
    { id: 'siteConfig', label: 'Website Control', icon: Layout },
    { id: 'contacts', label: 'Contact Leads', icon: Mail },
    { id: 'notes', label: 'Trade Notes', icon: Info },
    { id: 'handwritten', label: 'Handwritten', icon: PenTool },
    { id: 'exams', label: 'Exams & Results', icon: Calendar },
    { id: 'admissions', label: 'Admissions', icon: FileSignature },
    { id: 'pyqs', label: 'Trade Papers', icon: FileText },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'scholarships', label: 'Scholarships', icon: IndianRupee },
    { id: 'machines', label: 'Machines', icon: MonitorPlay },
    { id: 'profile', label: 'Admin Security', icon: UserCircle },
  ];

  const getFormFields = () => {
    switch(activeTab) {
      case 'siteConfig':
        return [
          { name: 'siteName', label: 'Website Name', type: 'text' },
          { name: 'logoUrl', label: 'Logo Image URL', type: 'text' },
          { name: 'primaryColor', label: 'Brand Color (Hex: #2563eb)', type: 'text' },
          { name: 'heroTitle', label: 'Main Headline', type: 'text' },
          { name: 'heroSubTitle', label: 'Sub Headline', type: 'textarea' },
          { name: 'aboutText', label: 'About Us Page Text', type: 'textarea' },
          { name: 'marqueeUpdates', label: 'Marquee News (Comma separated)', type: 'text' },
          { name: 'contactEmail', label: 'Official Email', type: 'text' },
          { name: 'contactPhone', label: 'Official Phone', type: 'text' },
          { name: 'contactAddress', label: 'Official Address', type: 'text' }
        ];
      case 'profile':
        return [
          { name: 'username', label: 'Login Username', type: 'text' },
          { name: 'password', label: 'New Password', type: 'text' }
        ];
      case 'jobs':
        return [
          { name: 'title', label: 'Job Title', type: 'text' },
          { name: 'company', label: 'Company', type: 'text' },
          { name: 'link', label: 'Apply URL', type: 'text' },
          { name: 'type', label: 'Job Type (Govt/Apprentice/Private)', type: 'text' }
        ];
      case 'notes':
        return [
           { name: 'title', label: 'Note Title', type: 'text' },
           { name: 'subject', label: 'Subject', type: 'text' },
           { name: 'branch', label: 'Trade (ITI Electrician, etc)', type: 'text' },
           { name: 'semester', label: 'Semester/Year', type: 'text' },
           { name: 'link', label: 'PDF Link', type: 'text' }
        ];
      default:
        return [
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'link', label: 'Link', type: 'text' },
          { name: 'subject', label: 'Subject', type: 'text' }
        ];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 shadow-2xl z-20">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Database size={18} /></div>
          <span className="font-bold text-lg">Cloud CMS</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-2 text-blue-400 text-sm font-bold hover:bg-slate-800 rounded-lg"><Globe size={16} /> Live Site</button>
          <button onClick={() => { localStorage.removeItem('isAdminAuthenticated'); navigate('/admin'); }} className="w-full flex items-center gap-3 px-4 py-2 text-red-400 text-sm font-bold hover:bg-red-900/20 rounded-lg"><LogOut size={16} /> Logout</button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 capitalize">{activeTab.replace(/([A-Z])/g, ' $1').trim()}</h1>
            <p className="text-slate-400 text-sm">Full Administrative Control via Firebase Cloud.</p>
          </div>
          {['siteConfig', 'profile', 'contacts'].indexOf(activeTab) === -1 && (
            <button onClick={() => { setEditingItem(null); setShowModal(true); }} className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-black shadow-xl hover:bg-blue-700 transition">
              <Plus size={20} /> Add New Entry
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {activeTab === 'contacts' ? (
              <div className="p-4 space-y-4">
                 {data.map(lead => (
                   <div key={lead.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-start">
                      <div>
                         <h3 className="font-bold text-slate-900">{lead.name}</h3>
                         <p className="text-sm text-blue-600 font-bold">{lead.email}</p>
                         <p className="mt-3 text-slate-600 font-medium">{lead.message}</p>
                         <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase">{lead.createdAt}</p>
                      </div>
                      <button onClick={() => handleDelete(lead.id)} className="text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                   </div>
                 ))}
                 {data.length === 0 && <p className="text-center py-10 text-gray-400 font-bold uppercase tracking-widest text-xs">No customer inquiries found.</p>}
              </div>
            ) : activeTab === 'siteConfig' || activeTab === 'profile' ? (
              <div className="p-12 text-center">
                 <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    {activeTab === 'siteConfig' ? <Settings size={48} /> : <UserCircle size={48} />}
                 </div>
                 <h2 className="text-2xl font-black text-slate-900 mb-2">Configure {activeTab === 'siteConfig' ? 'Website Appearance' : 'Admin Account'}</h2>
                 <p className="text-slate-400 mb-8 font-medium">Click below to update your global website parameters or security settings.</p>
                 <button onClick={() => { setEditingItem(data[0]); setShowModal(true); }} className="px-12 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-lg hover:bg-black transition">Edit Configuration</button>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Details</th>
                    <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="px-8 py-5">
                        <div className="font-black text-slate-900 text-lg">{item.title || item.name || item.examName}</div>
                        <div className="text-xs text-slate-400 font-bold uppercase mt-1">{item.company || item.subject || item.branch || item.state}</div>
                      </td>
                      <td className="px-8 py-5 text-right flex justify-end gap-3">
                        <button onClick={() => { setEditingItem(item); setShowModal(true); }} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition"><Edit size={20}/></button>
                        <button onClick={() => handleDelete(item.id)} className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition"><Trash2 size={20}/></button>
                      </td>
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan={2} className="px-8 py-12 text-center text-gray-300 font-black uppercase text-xs tracking-widest">No entries found in this collection.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <form onSubmit={handleSave} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="px-8 py-6 border-b flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Manage {activeTab}</h2>
              <button type="button" onClick={() => setShowModal(false)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-red-500 transition"><X size={20}/></button>
            </div>
            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getFormFields().map((field) => (
                  <div key={field.name} className={field.type === 'textarea' || field.name === 'heroTitle' || field.name === 'marqueeUpdates' || field.name === 'logoUrl' || field.name === 'siteName' ? 'md:col-span-2' : ''}>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea name={field.name} defaultValue={editingItem?.[field.name]} required rows={3} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium" />
                    ) : (
                      <input name={field.name} defaultValue={field.name === 'marqueeUpdates' && Array.isArray(editingItem?.[field.name]) ? editingItem[field.name].join(', ') : editingItem?.[field.name]} required className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-800" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="px-8 py-6 bg-slate-50 border-t flex justify-end gap-4">
              <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 text-slate-400 font-black text-sm">Cancel</button>
              <button type="submit" className="px-10 py-3 bg-blue-600 text-white text-sm font-black rounded-2xl shadow-xl hover:bg-blue-700 transition-all flex items-center gap-2"><Save size={18}/> Push Updates</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
