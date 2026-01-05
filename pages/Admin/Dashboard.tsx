
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Briefcase, LogOut, Plus, Trash2, Edit, X, Database, 
  IndianRupee, Home as HomeIcon, MonitorPlay, FileText, 
  PenTool, FileSignature, Calendar, Globe, Loader2, Save
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
    dbService.listenToCollection(activeTab, (items) => {
      setData(items);
      setLoading(false);
    });
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
    formData.forEach((value, key) => { item[key] = value; });
    
    await dbService.saveItem(activeTab, item);
    setShowModal(false);
    setEditingItem(null);
    loadData();
  };

  const menuItems = [
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'admissions', label: 'Admissions', icon: FileSignature },
    { id: 'scholarships', label: 'Scholarships', icon: IndianRupee },
    { id: 'handwritten', label: 'Handwritten', icon: PenTool },
    { id: 'machines', label: 'Machines', icon: MonitorPlay },
    { id: 'pyqs', label: 'Papers', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <Database className="text-blue-500" />
          <span className="font-bold text-lg">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-2 text-blue-400 text-sm font-bold">
            <Globe size={16} /> Live Site
          </button>
          <button onClick={() => { localStorage.removeItem('isAdminAuthenticated'); navigate('/admin'); }} className="w-full flex items-center gap-3 px-4 py-2 text-red-400 text-sm font-bold mt-2">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800 capitalize">{activeTab} Management</h1>
          <button 
            onClick={() => { setEditingItem(null); setShowModal(true); }}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-lg hover:bg-blue-700 transition"
          >
            <Plus size={18} /> Add New
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="animate-spin mb-2" />
            <p>Syncing with Database...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Item Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{item.title || item.name || item.examName}</div>
                      <div className="text-xs text-gray-400">{item.company || item.state || item.trade}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => { setEditingItem(item); setShowModal(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18}/></button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={2} className="px-6 py-10 text-center text-gray-400">No entries found. Click 'Add New' to start.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Entry Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <form onSubmit={handleSave} className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">{editingItem ? 'Edit' : 'Add'} Entry</h2>
              <button type="button" onClick={() => setShowModal(false)} className="text-gray-400 hover:text-slate-900"><X/></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title / Name</label>
                <input 
                  name={activeTab === 'scholarships' ? 'name' : activeTab === 'admissions' ? 'examName' : 'title'} 
                  defaultValue={editingItem?.title || editingItem?.name || editingItem?.examName}
                  required 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-500 transition"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category / Trade</label>
                  <input name={activeTab === 'jobs' ? 'company' : activeTab === 'admissions' ? 'state' : 'trade'} defaultValue={editingItem?.company || editingItem?.state || editingItem?.trade} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Link / Info</label>
                  <input name={activeTab === 'handwritten' || activeTab === 'pyqs' ? 'link' : 'applyLink'} defaultValue={editingItem?.link || editingItem?.applyLink} placeholder="https://..." className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-bold text-gray-400">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg flex items-center gap-2">
                <Save size={16}/> Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
