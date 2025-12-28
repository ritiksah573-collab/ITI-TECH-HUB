import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, User, RefreshCw, Copy, Check, Mic, MicOff, Volume2, StopCircle, Languages, ShieldCheck, Loader2, Zap } from 'lucide-react';
import { getAITutorResponseStream, getGeminiSpeech } from '../services/geminiService';
import { ChatMessage } from '../types';

// Audio decoding helpers
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const AIBuddy: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I am ready. Ask me anything about ITI!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [autoRead, setAutoRead] = useState(false); 
  
  // Voice Input State
  const [isListening, setIsListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState<'en-US' | 'hi-IN'>('en-US');
  
  // Voice Output State
  const [speakingMessageId, setSpeakingMessageId] = useState<number | null>(null); // ID of msg being read
  const [isBuffering, setIsBuffering] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  
  // Audio Playback Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);
  const shouldStopRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      stopAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // --- AUDIO ENGINE ---

  const initAudioContext = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const stopAudio = () => {
    shouldStopRef.current = true;
    audioQueueRef.current = [];
    isPlayingRef.current = false;
    if (currentSourceRef.current) {
      currentSourceRef.current.stop();
      currentSourceRef.current = null;
    }
    setSpeakingMessageId(null);
    setIsBuffering(false);
  };

  const processAudioQueue = async () => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0 || shouldStopRef.current) {
        if (audioQueueRef.current.length === 0 && !isPlayingRef.current) {
            setSpeakingMessageId(null); // Queue finished
        }
        return;
    }

    isPlayingRef.current = true;
    setIsBuffering(true);
    
    const textChunk = audioQueueRef.current.shift(); // Get next sentence

    try {
        if (!textChunk) return;

        // 1. Fetch
        const base64Audio = await getGeminiSpeech(textChunk);
        
        if (shouldStopRef.current) return; // Check stop signal after await

        if (base64Audio) {
            setIsBuffering(false);
            const ctx = await initAudioContext();
            const audioBytes = decode(base64Audio);
            const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);

            // 2. Play
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            currentSourceRef.current = source;

            source.onended = () => {
                isPlayingRef.current = false;
                processAudioQueue(); // Trigger next
            };

            source.start();
        } else {
            isPlayingRef.current = false;
            processAudioQueue(); // Skip error
        }
    } catch (e) {
        console.error("Audio error", e);
        isPlayingRef.current = false;
        processAudioQueue();
    }
  };

  const queueAudioChunk = (text: string) => {
      if (!text.trim()) return;
      audioQueueRef.current.push(text);
      processAudioQueue();
  };

  // --- MAIN HANDLERS ---

  const handleSpeak = (text: string, index: number) => {
    // If clicking same button, toggle off
    if (speakingMessageId === index) {
        stopAudio();
        return;
    }

    stopAudio(); // Stop any current playback
    shouldStopRef.current = false;
    setSpeakingMessageId(index);
    setIsBuffering(true);

    // Smart Split: Split by sentence enders (. ! ? |) but keep the delimiter
    // This regex looks for sentence endings.
    const sentences = text.match(/[^.!?।\n]+[.!?।\n]+/g) || [text];

    // Initial load: Push first few sentences to queue immediately
    sentences.forEach(s => audioQueueRef.current.push(s));
    processAudioQueue();
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Stop any previous audio
    stopAudio();
    shouldStopRef.current = false;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Placeholder for AI
    const aiMsgIndex = messages.length + 1; // Index of the new AI message
    setMessages(prev => [...prev, { role: 'model', text: '' }]);
    
    // If Auto-Read is ON, set state to show we are "speaking" this new message
    if (autoRead) {
        setSpeakingMessageId(aiMsgIndex);
    }

    try {
      const stream = getAITutorResponseStream(input);
      let fullText = '';
      let sentenceBuffer = '';
      
      for await (const chunk of stream) {
        fullText += chunk;
        sentenceBuffer += chunk;

        // Check for sentence completion (simple heuristic)
        // Check for . ? ! or newline followed by space or end of chunk
        if (autoRead && (/[.!?।]\s$/.test(sentenceBuffer) || /\n$/.test(sentenceBuffer))) {
            queueAudioChunk(sentenceBuffer);
            sentenceBuffer = '';
        }

        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullText;
          return newMessages;
        });
      }
      
      // Queue remaining buffer
      if (autoRead && sentenceBuffer.trim()) {
          queueAudioChunk(sentenceBuffer);
      }

    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, network error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- VOICE INPUT ---
  const toggleListening = () => {
    if (isListening) stopListening();
    else startListening();
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = voiceLang; 
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results).map((result: any) => result[0].transcript).join('');
        if (event.results[0].isFinal) {
           setInput(prev => (prev ? prev + ' ' : '') + transcript);
        }
      };
      
      recognitionRef.current.start();
    } else {
      alert("Voice input is not supported in this browser. Please use Chrome or Edge.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const formatText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-indigo-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Sparkles size={20} />
            </div>
            <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">AI Buddy <span className="text-xs text-green-600 font-normal bg-green-50 px-1.5 py-0.5 rounded-full border border-green-100">Live</span></h1>
            <p className="text-xs text-gray-500">Fast Voice Response</p>
            </div>
        </div>
        
        {/* Auto-Read Toggle */}
        <button 
           onClick={() => {
             const newState = !autoRead;
             setAutoRead(newState);
             if (!newState) stopAudio();
           }}
           className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition border ${
              autoRead 
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
              : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
           }`}
        >
           <Zap size={14} className={autoRead ? "fill-current" : ""} />
           Auto-Read {autoRead ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[90%] sm:max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-indigo-600 text-white'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>

              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm sm:text-base leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.role === 'user' ? msg.text : formatText(msg.text)}
                  {msg.role === 'model' && msg.text === '' && (
                     <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                     </span>
                  )}
                </div>

                {/* Message Actions */}
                {msg.role === 'model' && msg.text !== '' && (
                  <div className="flex items-center gap-2 mt-2 ml-1">
                    <button 
                      onClick={() => handleCopy(msg.text, idx)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                      title="Copy"
                    >
                      {copiedIndex === idx ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                    
                    <button 
                      onClick={() => handleSpeak(msg.text, idx)}
                      className={`p-1.5 rounded-lg transition flex items-center gap-1 ${
                         speakingMessageId === idx
                         ? 'text-indigo-600 bg-indigo-50 ring-1 ring-indigo-200' 
                         : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                      }`}
                      title={speakingMessageId === idx ? "Stop" : "Listen"}
                    >
                      {speakingMessageId === idx ? (
                         isBuffering ? <Loader2 size={14} className="animate-spin" /> : <StopCircle size={14} className="animate-pulse" />
                      ) : (
                         <Volume2 size={14} />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto flex items-end gap-2 bg-gray-50 border border-gray-300 rounded-2xl p-2 shadow-inner focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
          
           <button
             onClick={() => setVoiceLang(prev => prev === 'en-US' ? 'hi-IN' : 'en-US')}
             className="hidden sm:flex items-center gap-1 h-10 px-3 text-xs font-bold text-gray-500 hover:bg-gray-200 rounded-xl transition"
             title="Switch Voice Input Language"
           >
             <Languages size={16} />
             {voiceLang === 'en-US' ? 'EN' : 'HI'}
           </button>

           <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isListening ? "Listening..." : "Ask ITI related doubt..."}
            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 py-2.5 px-2 max-h-32 overflow-y-auto resize-none"
            disabled={isLoading}
          />

          <button
            onClick={toggleListening}
            className={`p-2.5 rounded-xl transition-all duration-300 ${
                isListening 
                ? 'bg-red-500 text-white animate-pulse shadow-red-200 shadow-lg' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 transition shadow-md"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIBuddy;