import React, { useState } from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => setSubmitted(true), 500);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">Get in Touch</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-sm overflow-hidden">
          
          <div className="p-10 bg-blue-600 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <p className="text-blue-100 mb-8">
                Have a question about notes, facing issues with the website, or want to partner with us? Fill out the form or reach us directly.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="text-blue-200" />
                  <span>polytechhub18@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-blue-200" />
                  <span>+91 90066 95450</span>
                </div>
                <div className="flex items-center gap-4">
                  <MessageCircle className="text-blue-200" />
                  <span>WhatsApp: +91 90066 95450</span>
                </div>
              </div>
            </div>

            <div className="mt-12">
               <h3 className="font-semibold mb-4">Follow us</h3>
               <div className="flex space-x-4">
                  {/* Social Icons Placeholder */}
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 cursor-pointer">IG</div>
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 cursor-pointer">TG</div>
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 cursor-pointer">YT</div>
               </div>
            </div>
          </div>

          <div className="p-10">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle size={32} />
                 </div>
                 <h3 className="text-2xl font-bold text-gray-800">Message Sent!</h3>
                 <p className="text-gray-600 mt-2">Thank you for reaching out. We'll get back to you shortly.</p>
                 <button onClick={() => setSubmitted(false)} className="mt-6 text-blue-600 font-medium hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition shadow-md hover:shadow-lg"
                >
                  Send Message
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