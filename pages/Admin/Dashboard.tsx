import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Briefcase, BookOpen, Calendar, GraduationCap, 
  LogOut, Plus, Trash2, Edit, Save, X, Settings, Database, 
  IndianRupee, Bell, ExternalLink 
} from 'lucide-react';
import { Job, Note } from '../../types';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'notes' | 'exams' | 'scholarships'>('overview');
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [scholarships, setScholarships] = useState<any[]>([]);
  
  const [showModal, setShowModal] = useState(false);

  const safeParse = (key: string) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error(`Error parsing ${key}`, e);
      return [];
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (!auth) {
      navigate('/admin');
      return;
    }

    setJobs(safeParse('dynamicJobs'));
    setNotes(safeParse('dynamicNotes'));
    setExams(safeParse('dynamicExams'));
    setScholarships(safeParse('dynamicScholarships'));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  const saveData = (type: string, data: any) => {
    localStorage.setItem(`dynamic${type}`, JSON.stringify(data));
  };

  const deleteItem = (type: string, id: number) => {
    if(!window.confirm("Are you sure you want to delete this?")) return;
    
    let updated;
    if(activeTab === 'jobs') {
      updated = jobs.filter(j => j.id !== id);
      setJobs(updated);
      saveData('Jobs', updated);
    } else if(activeTab === 'notes') {
      updated = notes.filter(n => n.id !== id);
      setNotes(updated);
      saveData('Notes', updated);
    } else if(activeTab === 'exams') {
      updated = exams.filter(e => e.id !== id);
      setExams(updated);
      saveData('Exams', updated);
    } else {
      updated = scholarships.filter(s => s.id !== id);
      setScholarships(updated);
      saveData('Scholarships', updated);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newItem: any = { 
      id: Date.now(),
      postedDate: 'Just Now',
      status: 'Live',
      tags: [] 
    };

    formData.forEach((value, key) => {
      if(key === 'tags') {
        newItem[key] = (value as string).split(',').map(s => s.trim()).filter(s => s !== "");
      } else {
        newItem[key] = value;
      }
    });

    if(activeTab === 'jobs') {
      const updated = [newItem, ...jobs];
      setJobs(updated);
      saveData('Jobs', updated);
    } else if(activeTab === 'notes') {
      const updated = [newItem, ...notes];
      setNotes(updated);
      saveData('Notes', updated);
    } else if(activeTab === 'exams') {
      const updated = [newItem, ...exams];
      setExams(updated);
      saveData('Exams', updated);
    } else if(activeTab === 'scholarships') {
      const updated = [newItem, ...scholarships];
      setScholarships(updated);
      saveData('Scholarships', updated);
    }

    setShowModal(false);
  };

  const StatCard = ({ title, count, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{count}</h3>
      </div>
      <div className={`p-4 rounded-xl ${color}`}>
        <Icon size={24} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 border-b border-gray-800 flex items-center gap-2">
          <Database className="text-orange-500" />
          <span className="font-bold text-lg">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'jobs', label: 'Manage Jobs', icon: Briefcase },
            { id: 'notes', label: 'Trade Notes', icon: BookOpen },
            { id: 'exams', label: 'Exams/Results', icon: Calendar },
            { id: 'scholarships', label: 'Scholarships', icon: IndianRupee },
          ].map((item: any) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === item.id ? 'bg-blue-600 shadow-lg shadow-blue-900/50 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 min-h-screen">
        <header className="bg-white/80 backdrop-blur border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-40">
          <h1 className="text-lg font-bold text-gray-800 capitalize">{activeTab} Management</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">ITI Tech Admin</p>
              <p className="text-[10px] text-green-500 font-bold">● SYSTEM ONLINE</p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">A</div>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Job Postings" count={jobs.length} icon={Briefcase} color="bg-blue-50 text-blue-600" />
                <StatCard title="Trade Notes" count={notes.length} icon={BookOpen} color="bg-orange-50 text-orange-600" />
                <StatCard title="Exam Updates" count={exams.length} icon={Calendar} color="bg-green-50 text-green-600" />
                <StatCard title="Scholarships" count={scholarships.length} icon={IndianRupee} color="bg-purple-50 text-purple-600" />
              </div>
            </div>
          )}

          {activeTab !== 'overview' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Existing {activeTab}</h3>
                <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition">
                  <Plus size={18} /> New Entry
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Title / Name</th>
                      <th className="px-6 py-4">Secondary Info</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(activeTab === 'jobs' ? jobs : activeTab === 'notes' ? notes : activeTab === 'exams' ? exams : scholarships).map((item: any) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-bold text-gray-900">{item.title || item.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.company || item.subject || item.state || item.provider}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => deleteItem(activeTab, item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 size={18}/></button>
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

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleAddItem} className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
               <h2 className="text-xl font-bold text-gray-900">Add {activeTab}</h2>
               <button type="button" onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-200 rounded-full transition"><X/></button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title / Name</label>
                  <input name={activeTab === 'scholarships' ? 'name' : 'title'} required type="text" className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" />
               </div>
               
               {activeTab === 'jobs' && (
                 <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company</label>
                      <input name="company" required type="text" className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
                      <input name="location" required type="text" className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Type</label>
                    <select name="type" className="w-full border rounded-xl p-3 outline-none">
                      <option value="Government">Government</option>
                      <option value="Private">Private</option>
                      <option value="Apprenticeship">Apprenticeship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tags (e.g. ITI, Fitter)</label>
                    <input name="tags" type="text" placeholder="Electrician, ITI" className="w-full border rounded-xl p-3 outline-none" />
                  </div>
                 </>
               )}

               {activeTab === 'notes' && (
                 <>
                  <input name="branch" placeholder="Branch" required className="w-full border rounded-xl p-3 mb-2 outline-none" />
                  <input name="subject" placeholder="Subject" required className="w-full border rounded-xl p-3 mb-2 outline-none" />
                  <select name="semester" className="w-full border rounded-xl p-3 outline-none">
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                  </select>
                 </>
               )}

               {activeTab === 'exams' && (
                 <>
                  <input name="state" placeholder="State" required className="w-full border rounded-xl p-3 mb-2 outline-none" />
                  <input name="board" placeholder="Board" required className="w-full border rounded-xl p-3 mb-2 outline-none" />
                  <select name="type" className="w-full border rounded-xl p-3 mb-2 outline-none">
                    <option value="Schedule">Schedule</option>
                    <option value="Result">Result</option>
                  </select>
                  <input name="date" placeholder="Date String" required className="w-full border rounded-xl p-3 outline-none" />
                 </>
               )}

               {activeTab === 'scholarships' && (
                 <>
                  <input name="provider" placeholder="Provider" required className="w-full border rounded-xl p-3 mb-2 outline-none" />
                  <input name="amount" placeholder="Amount" required className="w-full border rounded-xl p-3 mb-2 outline-none" />
                  <input name="deadline" placeholder="Deadline" required className="w-full border rounded-xl p-3 outline-none" />
                 </>
               )}

               <textarea name="description" placeholder="Description or Link" rows={3} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
               <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition">Cancel</button>
               <button type="submit" className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition">Publish Live</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;