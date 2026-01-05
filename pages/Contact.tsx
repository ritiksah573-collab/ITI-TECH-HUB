
import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Send, CheckCircle, Loader2 } from 'lucide-react';
import { dbService } from '../services/dbService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await dbService.saveItem('contacts', formData);
    setLoading(false);
    if (res?.success) setSubmitted(true);
    else alert("Submission failed. Try again.");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-center text-slate-900 mb-12 tracking-tight">Get in Touch</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden border border-gray-100">
          <div className="p-12 bg-primary text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-black mb-6 tracking-tight">Contact Info</h2>
              <p className="text-blue-100 mb-10 font-medium">Have queries about notes or careers? Our team is live from Cloud to assist you.</p>
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><Mail className="text-white" /></div>
                  <span className="font-bold">polytechhub18@gmail.com</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><Phone className="text-white" /></div>
                  <span className="font-bold">+91 90066 95450</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-12">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in">
                 <CheckCircle size={80} className="text-green-500 mb-6" />
                 <h3 className="text-3xl font-black text-slate-900 mb-2">Message Sent!</h3>
                 <p className="text-slate-500 font-bold">Admin will review your message soon.</p>
                 <button onClick={() => setSubmitted(false)} className="mt-8 text-primary font-black uppercase text-xs tracking-widest hover:underline">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Your Name</label>
                  <input required type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 outline-none focus:border-primary focus:bg-white transition-all font-bold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                  <input required type="email" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 outline-none focus:border-primary focus:bg-white transition-all font-bold" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">How can we help?</label>
                  <textarea required rows={4} className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 outline-none focus:border-primary focus:bg-white transition-all font-medium" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Push To Cloud</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
