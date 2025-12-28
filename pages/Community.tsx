import React, { useState, useRef, useEffect } from 'react';
import { ForumPost, ChatMessage } from '../types';
import { MessageSquare, User, Clock, Send, Bot, Sparkles, X } from 'lucide-react';
import { getAITutorResponse } from '../services/geminiService';

const mockPosts: ForumPost[] = [
  { id: 1, author: 'Rahul Verma', title: 'Best youtube channel for Electrician Theory?', category: 'Trade Theory', replies: 12, views: 340, timeAgo: '2 hours ago' },
  { id: 2, author: 'Priya Singh', title: 'Is CTI/CITS necessary after ITI for teaching job?', category: 'Career Guidance', replies: 8, views: 210, timeAgo: '5 hours ago' },
  { id: 3, author: 'Amit Patel', title: 'DRDO CEPTAM exam date expected?', category: 'Govt Jobs', replies: 25, views: 890, timeAgo: '1 day ago' },
];

const Community: React.FC = () => {
  // Forum State
  const [activeCategory, setActiveCategory] = useState('All');
  
  // AI Chat State
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi there! I am your AI Study Buddy. Ask me anything about your ITI trade, exam tips, or career advice!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if(isAiOpen) scrollToBottom();
  }, [messages, isAiOpen]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getAITutorResponse(input);
      const aiMsg: ChatMessage = { role: 'model', text: responseText };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Main Forum Area */}
          <div className="flex-1">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">ITI Student Community</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm">
                   + New Discussion
                </button>
             </div>

             {/* Categories */}
             <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
                {['All', 'Trade Theory', 'Exam Tips', 'Apprentice', 'Govt Jobs', 'Off-Topic'].map(cat => (
                   <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                         activeCategory === cat ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                   >
                      {cat}
                   </button>
                ))}
             </div>

             {/* Posts List */}
             <div className="space-y-4">
                {mockPosts.map((post) => (
                   <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer">
                      <div className="flex items-start gap-4">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                            {post.author.charAt(0)}
                         </div>
                         <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">{post.title}</h3>
                            <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                               <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium text-gray-700">{post.category}</span>
                               <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                               <span className="flex items-center gap-1"><Clock size={14} /> {post.timeAgo}</span>
                            </div>
                         </div>
                         <div className="text-center hidden sm:block">
                            <div className="flex flex-col items-center justify-center bg-gray-50 p-2 rounded-lg">
                               <MessageSquare size={18} className="text-gray-400 mb-1" />
                               <span className="text-sm font-bold text-gray-700">{post.replies}</span>
                            </div>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-6">
             {/* AI Promo Card */}
             <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                   <Sparkles size={120} />
                </div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                   <Bot /> AI Study Buddy
                </h3>
                <p className="text-indigo-100 text-sm mb-4">
                   Stuck on a concept? Need quick exam tips? Ask our AI Tutor instantly!
                </p>
                <button 
                  onClick={() => setIsAiOpen(true)}
                  className="w-full py-2 bg-white text-indigo-700 font-bold rounded-lg hover:bg-indigo-50 transition"
                >
                   Start Chatting
                </button>
             </div>

             <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-4">Community Guidelines</h4>
                <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                   <li>Be respectful to others.</li>
                   <li>No spam or self-promotion.</li>
                   <li>Post in relevant categories.</li>
                   <li>Help juniors with doubts.</li>
                </ul>
             </div>
          </div>
        </div>
      </div>

      {/* AI Chat Modal/Overlay */}
      {isAiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col h-[600px] overflow-hidden">
            {/* Header */}
            <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6" />
                <div>
                  <h3 className="font-bold">ITI AI Tutor</h3>
                  <p className="text-xs text-indigo-200">Powered by Gemini 2.5</p>
                </div>
              </div>
              <button onClick={() => setIsAiOpen(false)} className="hover:bg-indigo-700 p-1 rounded transition">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask a question..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-indigo-600 text-white p-2.5 rounded-full hover:bg-indigo-700 disabled:bg-gray-300 transition"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;