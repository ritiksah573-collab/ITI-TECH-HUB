import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Briefcase, LogOut, Plus, Trash2, Edit, X, Database, 
  IndianRupee, Home as HomeIcon, MonitorPlay, FileText, 
  PenTool, FileSignature, Calendar, Globe, Loader2, Save, Settings, Info
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
    } else {
      dbService.listenToCollection(activeTab, (items) => {
        setData(items);
        setLoading(false);
      });
    }
  };

  const handleDelete = async (id: any) => {
    if(!window.confirm("Delete this item permanently?")) return;
    await dbService.deleteItem(activeTab, id);
    loadData();
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const item: any = editingItem ? { id: editingItem.id } : {};
    
    formData.forEach((value, key) => { 
      if (key === 'marqueeUpdates' && typeof value === 'string') {
        item[key] = value.split(',').map(s => s.trim());
      } else {
        item[key] = value; 
      }
    });
    
    if (activeTab === 'siteConfig') {
      await dbService.saveItem('settings', { ...item, id: 'siteConfig' });
    } else {
      await dbService.saveItem(activeTab, item);
    }
    
    setShowModal(false);
    setEditingItem(null);
    loadData();
  };

  const menuItems = [
    { id: 'siteConfig', label: 'Home Settings', icon: Settings },
    { id: 'notes', label: 'Trade Notes', icon: Info },
    { id: 'handwritten', label: 'Handwritten', icon: PenTool },
    { id: 'exams', label: 'Exams & Results', icon: Calendar },
    { id: 'admissions', label: 'Admissions', icon: FileSignature },
    { id: 'pyqs', label: 'Trade Papers', icon: FileText },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'scholarships', label: 'Scholarships', icon: IndianRupee },
    { id: 'machines', label: 'Machines', icon: MonitorPlay },
  ];

  const getFormFields = () => {
    switch(activeTab) {
      case 'siteConfig':
        return [
          { name: 'heroTitle', label: 'Main Title', type: 'text' },
          { name: 'heroSubTitle', label: 'Subtitle', type: 'textarea' },
          { name: 'marqueeUpdates', label: 'Marquee News (Comma separated)', type: 'text' }
        ];
      case 'notes':
        return [
          { name: 'title', label: 'Note Title', type: 'text' },
          { name: 'subject', label: 'Subject', type: 'text' },
          { name: 'branch', label: 'Trade Name', type: 'text' },
          { name: 'semester', label: 'Year/Semester', type: 'text' },
          { name: 'link', label: 'Download/View Link', type: 'text' }
        ];
      case 'exams':
        return [
          { name: 'title', label: 'Exam/Result Title', type: 'text' },
          { name: 'board', label: 'Board (NCVT/SCVT)', type: 'text' },
          { name: 'state', label: 'State', type: 'text' },
          { name: 'type', label: 'Type (Schedule/Result)', type: 'text' },
          { name: 'date', label: 'Date/Session', type: 'text' },
          { name: 'link', label: 'Check Link', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' }
        ];
      case 'admissions':
        return [
          { name: 'examName', label: 'Admission Name', type: 'text' },
          { name: 'state', label: 'State', type: 'text' },
          { name: 'startDate', label: 'Start Date', type: 'text' },
          { name: 'applyLink', label: 'Application Link', type: 'text' }
        ];
      case 'jobs':
        return [
          { name: 'title', label: 'Job Title', type: 'text' },
          { name: 'company', label: 'Company/Dept', type: 'text' },
          { name: 'location', label: 'Location', type: 'text' },
          { name: 'type', label: 'Type (Govt/Private)', type: 'text' },
          { name: 'link', label: 'Apply Link', type: 'text' }
        ];
      case 'scholarships':
        return [
          { name: 'name', label: 'Scholarship Name', type: 'text' },
          { name: 'provider', label: 'Provider', type: 'text' },
          { name: 'amount', label: 'Amount/Benefit', type: 'text' },
          { name: 'applyLink', label: 'Apply Link', type: 'text' }
        ];
      case 'machines':
        return [
          { name: 'title', label: 'Machine Name', type: 'text' },
          { name: 'trade', label: 'Related Trade', type: 'text' },
          { name: 'searchQuery', label: 'YouTube Search Query', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' }
        ];
      case 'handwritten':
        return [
          { name: 'title', label: 'Notes Title', type: 'text' },
          { name: 'trade', label: 'Trade', type: 'text' },
          { name: 'subject', label: 'Subject', type: 'text' },
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
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 shadow-2xl z-20">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Database size={18} />
          </div>
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
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-2 text-blue-400 text-sm font-bold hover:bg-slate-800 rounded-lg transition">
            <Globe size={16} /> Live Site
          </button>
          <button onClick={() => { localStorage.removeItem('isAdminAuthenticated'); navigate('/admin'); }} className="w-full flex items-center gap-3 px-4 py-2 text-red-400 text-sm font-bold hover:bg-red-900/20 rounded-lg transition">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 capitalize tracking-tight">{activeTab.replace(/([A-Z])/g, ' $1')}</h1>
            <p className="text-slate-400 text-sm font-medium">Manage and update {activeTab} real-time on Firebase Cloud.</p>
          </div>
          {activeTab !== 'siteConfig' && (
            <button 
              onClick={() => { setEditingItem(null); setShowModal(true); }}
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-black shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
            >
              <Plus size={20} /> Add Content
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <Loader2 className="animate-spin mb-4 text-blue-600" size={40} />
            <p className="font-bold uppercase tracking-widest text-xs">Syncing with Google Cloud...</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {activeTab === 'siteConfig' ? (
              <div className="p-8">
                {data[0] ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Hero Title</label>
                          <p className="text-lg font-bold text-slate-800">{data[0].heroTitle}</p>
                       </div>
                       <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Hero Subtitle</label>
                          <p className="text-sm font-medium text-slate-500">{data[0].heroSubTitle}</p>
                       </div>
                    </div>
                    <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
                        <label className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-2 block">Marquee Updates</label>
                        <p className="text-sm font-bold text-orange-900">{Array.isArray(data[0].marqueeUpdates) ? data[0].marqueeUpdates.join(' • ') : data[0].marqueeUpdates}</p>
                    </div>
                    <button 
                      onClick={() => { setEditingItem(data[0]); setShowModal(true); }}
                      className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition shadow-lg"
                    >
                      Update Site Branding
                    </button>
                  </div>
                ) : (
                   <div className="text-center py-10">
                      <p className="text-gray-400 mb-4">No config found in cloud.</p>
                      <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-6 py-2 rounded-xl">Initialize Config</button>
                   </div>
                )}
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Entry Details</th>
                    <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-8 py-5">
                        <div className="font-black text-slate-900 text-lg leading-tight">{item.title || item.name || item.examName}</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1 flex gap-2">
                           <span>{item.company || item.state || item.trade || item.subject}</span>
                           {item.semester && <span>• {item.semester}</span>}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-3">
                          <button onClick={() => { setEditingItem(item); setShowModal(true); }} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition"><Edit size={20}/></button>
                          <button onClick={() => handleDelete(item.id)} className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition"><Trash2 size={20}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan={2} className="px-8 py-20 text-center">
                         <div className="text-slate-300 mb-2"><Database size={48} className="mx-auto opacity-20" /></div>
                         <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No records in {activeTab} collection</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>

      {/* Entry Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <form onSubmit={handleSave} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">{editingItem ? 'Edit' : 'Create'} {activeTab}</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Cloud Database Entry</p>
              </div>
              <button type="button" onClick={() => setShowModal(false)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition"><X size={20}/></button>
            </div>
            
            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getFormFields().map((field) => (
                  <div key={field.name} className={field.type === 'textarea' || field.name === 'heroTitle' || field.name === 'marqueeUpdates' ? 'md:col-span-2' : ''}>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea 
                        name={field.name} 
                        defaultValue={editingItem?.[field.name]}
                        required 
                        rows={3}
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                      />
                    ) : (
                      <input 
                        name={field.name} 
                        defaultValue={field.name === 'marqueeUpdates' && Array.isArray(editingItem?.[field.name]) ? editingItem[field.name].join(', ') : editingItem?.[field.name]}
                        required 
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-800"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-8 py-6 bg-slate-50 border-t border-gray-100 flex justify-end gap-4">
              <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 text-sm font-black text-slate-400 hover:text-slate-600 transition">Discard Changes</button>
              <button type="submit" className="px-10 py-3 bg-blue-600 text-white text-sm font-black rounded-2xl flex items-center gap-2 shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all">
                <Save size={18}/> Push To Cloud
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;