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
    { role: 'model', text: 'Hi! I am your ITI Study Buddy. Ask me any trade-related doubts!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [autoRead, setAutoRead] = useState(false); 
  
  // Voice Input State
  const [isListening, setIsListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState<'en-US' | 'hi-IN'>('en-US');
  
  // Voice Output State
  const [speakingMessageId, setSpeakingMessageId] = useState<number | null>(null);
  const [isBuffering, setIsBuffering] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  
  // Audio Engine Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const textQueueRef = useRef<string[]>([]);
  const isFetchingRef = useRef(false);
  const nextStartTimeRef = useRef(0);
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
    textQueueRef.current = [];
    isFetchingRef.current = false;
    nextStartTimeRef.current = 0;
    
    activeSourcesRef.current.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    activeSourcesRef.current.clear();
    
    setSpeakingMessageId(null);
    setIsBuffering(false);
  };

  const processAudioStream = async () => {
    if (isFetchingRef.current || textQueueRef.current.length === 0 || shouldStopRef.current) {
      return;
    }

    isFetchingRef.current = true;
    
    // Process all items in queue sequentially without waiting for playback to finish
    while (textQueueRef.current.length > 0 && !shouldStopRef.current) {
      const textChunk = textQueueRef.current.shift();
      if (!textChunk) continue;

      try {
        const base64Audio = await getGeminiSpeech(textChunk);
        if (shouldStopRef.current || !base64Audio) continue;

        const ctx = await initAudioContext();
        const audioBytes = decode(base64Audio);
        const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);

        if (shouldStopRef.current) continue;

        // Precise Scheduling Logic
        const now = ctx.currentTime;
        // If we are behind, catch up to now
        if (nextStartTimeRef.current < now) {
          nextStartTimeRef.current = now + 0.05; // Small buffer to avoid click
        }

        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        
        source.start(nextStartTimeRef.current);
        
        // Track active sources to stop them if user clicks "Stop"
        activeSourcesRef.current.add(source);
        source.onended = () => {
          activeSourcesRef.current.delete(source);
          // Only clear speaking state if this was the last scheduled chunk
          if (activeSourcesRef.current.size === 0 && textQueueRef.current.length === 0) {
            setSpeakingMessageId(null);
          }
        };

        // Advance the clock by the exact duration of the clip
        nextStartTimeRef.current += audioBuffer.duration;
        setIsBuffering(false);

      } catch (e) {
        console.error("Audio worker error", e);
      }
    }

    isFetchingRef.current = false;
  };

  const handleSpeak = (text: string, index: number) => {
    if (speakingMessageId === index) {
        stopAudio();
        return;
    }

    stopAudio();
    shouldStopRef.current = false;
    setSpeakingMessageId(index);
    setIsBuffering(true);

    // Split by punctuation for smoother API requests
    const sentences = text.match(/[^.!?।\n]+[.!?।\n]+(?:\s|$)|[^.!?।\n]+$/g) || [text];
    
    // Combine very short sentences for more natural flow
    const combined: string[] = [];
    let current = "";
    sentences.forEach(s => {
      if ((current + s).length < 60) {
        current += s;
      } else {
        if (current) combined.push(current);
        current = s;
      }
    });
    if (current) combined.push(current);

    textQueueRef.current = combined;
    processAudioStream();
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    stopAudio();
    shouldStopRef.current = false;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiMsgIndex = messages.length + 1;
    setMessages(prev => [...prev, { role: 'model', text: '' }]);
    
    if (autoRead) {
        setSpeakingMessageId(aiMsgIndex);
    }

    try {
      const stream = getAITutorResponseStream(userMsg.text);
      let fullText = '';
      let audioProcessedIndex = 0;
      
      for await (const chunk of stream) {
        fullText += chunk;

        setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages[newMessages.length - 1]) {
            newMessages[newMessages.length - 1].text = fullText;
          }
          return newMessages;
        });

        if (autoRead) {
          const unprocessedText = fullText.slice(audioProcessedIndex);
          const sentenceRegex = /[^.!?।\n]+[.!?।\n]+(?:\s|$)/g;
          const matches = [...unprocessedText.matchAll(sentenceRegex)];
          
          for (const match of matches) {
            const sentence = match[0];
            textQueueRef.current.push(sentence);
            audioProcessedIndex += (match.index || 0) + sentence.length;
            processAudioStream(); // Trigger worker
          }
        }
      }
      
      if (autoRead && audioProcessedIndex < fullText.length) {
          const remaining = fullText.slice(audioProcessedIndex).trim();
          if (remaining) {
            textQueueRef.current.push(remaining);
            processAudioStream();
          }
      }

    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Connectivity issue. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

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
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={lineIdx} className="h-2"></div>;
      
      const isBullet = trimmed.startsWith('•') || trimmed.startsWith('*') || trimmed.startsWith('-');
      const content = isBullet ? trimmed.replace(/^[\s•*-]+/, '') : line;
      
      const parts = content.split(/(\*\*.*?\*\*)/g);
      const formatted = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={partIdx} className="font-bold text-indigo-900">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <div key={lineIdx} className={`${isBullet ? 'flex gap-2 ml-2' : ''} mb-1.5`}>
          {isBullet && <span className="text-indigo-500 font-bold">•</span>}
          <span className="flex-1 font-medium">{formatted}</span>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Sparkles size={20} className={isLoading ? "animate-spin" : ""} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">AI Buddy</h1>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Active Tutor
              </p>
            </div>
        </div>
        
        <button 
           onClick={() => {
             const newState = !autoRead;
             setAutoRead(newState);
             if (!newState) stopAudio();
           }}
           className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              autoRead 
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105' 
              : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300'
           }`}
        >
           <Zap size={14} className={autoRead ? "fill-current" : ""} />
           {autoRead ? 'Live Reading' : 'Silent Mode'}
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[90%] sm:max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm ${
                msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-indigo-600 text-white'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>

              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm sm:text-base leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.role === 'user' ? msg.text : formatText(msg.text)}
                  {msg.role === 'model' && msg.text === '' && (
                     <span className="inline-flex gap-1 ml-1">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-75"></span>
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></span>
                     </span>
                  )}
                </div>

                {msg.role === 'model' && msg.text !== '' && (
                  <div className="flex items-center gap-2 mt-2 ml-1 opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleCopy(msg.text, idx)}
                      className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition border border-transparent hover:border-gray-200"
                      title="Copy"
                    >
                      {copiedIndex === idx ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                    
                    <button 
                      onClick={() => handleSpeak(msg.text, idx)}
                      className={`p-1.5 rounded-lg transition flex items-center gap-1 border ${
                         speakingMessageId === idx
                         ? 'text-indigo-600 bg-indigo-50 border-indigo-200 shadow-sm' 
                         : 'text-gray-400 hover:text-indigo-600 hover:bg-white border-transparent hover:border-gray-200'
                      }`}
                      title={speakingMessageId === idx ? "Stop Reading" : "Read Aloud"}
                    >
                      {speakingMessageId === idx ? (
                         isBuffering ? <Loader2 size={14} className="animate-spin" /> : <StopCircle size={14} className="animate-pulse" />
                      ) : (
                         <Volume2 size={14} />
                      )}
                      {speakingMessageId === idx && !isBuffering && <span className="text-[10px] font-bold">LIVE</span>}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <div className="max-w-4xl mx-auto flex items-end gap-2 bg-gray-50 border border-gray-300 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white transition-all">
          
           <button
             onClick={() => setVoiceLang(prev => prev === 'en-US' ? 'hi-IN' : 'en-US')}
             className="hidden sm:flex items-center gap-1 h-10 px-3 text-xs font-bold text-gray-500 hover:bg-gray-200 rounded-xl transition"
             title="Language Toggle"
           >
             <Languages size={16} />
             {voiceLang === 'en-US' ? 'EN' : 'HI'}
           </button>

           <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isListening ? "Listening... Speak now" : "Ask about Trades, Exams, or Jobs..."}
            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 py-2.5 px-2 text-sm sm:text-base"
            disabled={isLoading}
          />

          <button
            onClick={toggleListening}
            className={`p-2.5 rounded-xl transition-all ${
                isListening 
                ? 'bg-red-500 text-white animate-pulse shadow-lg' 
                : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 transition-all shadow-md active:scale-95"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2">ITI AI Buddy can make mistakes. Verify important facts.</p>
      </div>
    </div>
  );
};

export default AIBuddy;