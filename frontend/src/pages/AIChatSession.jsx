import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const AIChatSession = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const topic = searchParams.get('topic');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isCrisisMode, setIsCrisisMode] = useState(topic === 'crisis');
  const chatEndRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!sessionId) {
        setMessages([
          {
            id: 1,
            sender: 'ai',
            text: "Hello, I'm here for you. What's on your mind today?"
          }
        ]);
        setLoading(false);
        return;
      }
      try {
        const res = await axiosInstance.get(`/ai/chat/${sessionId}`);
        if (res.data && res.data.length > 0) {
          setMessages(res.data.map((msg, idx) => ({
            id: idx + 1,
            sender: msg.role === 'user' ? 'user' : 'ai',
            text: msg.content
          })));
        } else {
           setMessages([
            {
              id: 1,
              sender: 'ai',
              text: "Hello, I'm here for you. What's on your mind today?"
            }
          ]);
        }
      } catch (err) {
        console.error("Failed to load chat history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [sessionId]);

  const handleSend = async () => {
    if (inputValue.trim()) {
      const userMsg = { id: Date.now(), sender: 'user', text: inputValue };
      setMessages((prev) => [...prev, userMsg]);
      const currentInput = inputValue;
      setInputValue('');
      
      try {
        const res = await axiosInstance.post('/ai/chat', {
          message: currentInput,
          session_id: sessionId
        });
        
        if (res.data.is_crisis) {
          setIsCrisisMode(true);
        }
        
        // Only update URL with session_id if it's a new session
        if (!sessionId && res.data.session_id) {
           const url = new URL(window.location);
           url.searchParams.set('session_id', res.data.session_id);
           window.history.pushState({}, '', url);
        }
        
        setMessages((prev) => [
          ...prev, 
          { 
            id: Date.now(), 
            sender: 'ai', 
            text: res.data.reply
          }
        ]);
      } catch (err) {
        console.error('Failed to send message', err);
        toast.error('Failed to get response');
      }
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 w-full flex flex-col bg-cream-bg relative min-h-0 h-full p-margin-mobile md:p-margin-desktop">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1); }
        .neo-shadow-active { box-shadow: 0px 0px 0px 0px rgba(26, 26, 26, 1); }
        .chat-bubble-left { border-radius: 24px 24px 24px 4px; }
        .chat-bubble-right { border-radius: 24px 24px 4px 24px; }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .float-animation { animation: float 4s ease-in-out infinite; }
      `}</style>

      {/* Crisis Detection Header */}
      {isCrisisMode && (
        <div className="z-10 pb-stack-md shrink-0">
          <div className="bg-error-container border-[1.5px] border-ink-black rounded-[32px] p-container-padding flex flex-col md:flex-row justify-between items-center gap-gutter neo-shadow">
            <div className="flex items-center gap-gutter">
              <div className="w-16 h-16 bg-error flex items-center justify-center rounded-full border-[1.5px] border-ink-black float-animation shrink-0">
                <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              </div>
              <div>
                <h1 className="font-headline-md text-headline-md text-on-error-container">Emergency Help</h1>
                <p className="font-body-md text-body-md text-on-error-container opacity-80">We've detected you might be in distress. Please know you are not alone.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-stack-sm mt-4 md:mt-0">
              <button className="bg-error text-white font-label-bold text-label-bold px-6 py-4 rounded-xl border-[1.5px] border-ink-black neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:neo-shadow-active transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">call</span>
                Call Emergency
              </button>
              <button className="bg-white text-ink-black font-label-bold text-label-bold px-6 py-4 rounded-xl border-[1.5px] border-ink-black neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:neo-shadow-active transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">chat_bubble</span>
                Text Crisis Line
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface Bento Layout */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Chat Window (Main Column) */}
        <div className="col-span-1 lg:col-span-8 flex flex-col bg-white border-[1.5px] border-ink-black rounded-[40px] overflow-hidden neo-shadow h-[calc(100vh-250px)] lg:h-auto">
          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-container-padding flex flex-col gap-stack-md">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-stack-sm max-w-[90%] md:max-w-[80%] ${msg.sender === 'user' ? 'self-end' : ''}`}>
                {msg.sender === 'ai' && (
                  <div className="w-10 h-10 rounded-full bg-accent-sage border-[1.5px] border-ink-black flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">smart_toy</span>
                  </div>
                )}
                
                <div className={`${msg.sender === 'user' ? 'bg-primary text-on-primary chat-bubble-right' : 'bg-surface-container-low text-on-surface chat-bubble-left'} border-[1.5px] border-ink-black p-4`}>
                  <p className="text-body-md">{msg.text}</p>
                </div>
                
                {msg.sender === 'user' && (
                  <div className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden flex-shrink-0 bg-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-ink-black">person</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          
          {/* Quick Actions */}
          <div className="px-4 md:px-container-padding pb-stack-sm flex flex-wrap gap-base">
            <button className="bg-secondary-container text-on-secondary-container border-[1.5px] border-ink-black px-4 py-2 rounded-full text-xs md:text-label-bold font-label-bold neo-shadow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">
              Grounding Exercise
            </button>
            <button className="bg-accent-pink text-tertiary border-[1.5px] border-ink-black px-4 py-2 rounded-full text-xs md:text-label-bold font-label-bold neo-shadow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">
              Breathing Guide
            </button>
            <button className="bg-accent-sage text-primary border-[1.5px] border-ink-black px-4 py-2 rounded-full text-xs md:text-label-bold font-label-bold neo-shadow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">
              Contact a Friend
            </button>
          </div>
          
          {/* Input Area */}
          <div className="p-4 md:p-container-padding pt-base shrink-0">
            <div className="flex items-center gap-stack-sm bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-2xl p-2 focus-within:shadow-[4px_4px_0px_0px_rgba(0,45,165,1)] transition-all">
              <input 
                className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-body-md outline-none" 
                placeholder="Type your thoughts here..." 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                className="bg-primary text-white p-3 rounded-xl border-[1.5px] border-ink-black neo-shadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center shrink-0"
                onClick={handleSend}
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Side Panels (Right Column) */}
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-gutter h-[calc(100vh-250px)] lg:h-auto overflow-y-auto">
          {/* Safety Plan Sticker */}
          <div className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-container-padding neo-shadow shrink-0">
            <h2 className="font-headline-sm text-headline-sm mb-stack-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">verified_user</span>
              Your Safety Plan
            </h2>
            <ul className="space-y-stack-sm">
              <li className="flex items-center gap-3 p-3 bg-surface-container rounded-xl border-[1px] border-ink-black">
                <span className="w-6 h-6 rounded-full bg-secondary-container border-[1px] border-ink-black flex items-center justify-center font-bold text-xs">1</span>
                <span className="text-label-md">Call Maria (Sister)</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-surface-container rounded-xl border-[1px] border-ink-black">
                <span className="w-6 h-6 rounded-full bg-secondary-container border-[1px] border-ink-black flex items-center justify-center font-bold text-xs">2</span>
                <span className="text-label-md">Listen to 'Calm' Playlist</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-surface-container rounded-xl border-[1px] border-ink-black opacity-50">
                <span className="w-6 h-6 rounded-full bg-surface border-[1px] border-ink-black flex items-center justify-center font-bold text-xs">3</span>
                <span className="text-label-md">Go for a 5-min walk</span>
              </li>
            </ul>
          </div>

          {/* Progress/Bio Feedback Card */}
          <div className="bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] p-container-padding flex-1 relative overflow-hidden neo-shadow shrink-0 min-h-[300px]">
            <div className="relative z-10 flex flex-col h-full">
              <h2 className="font-headline-sm text-headline-sm mb-stack-sm">Breathing Pacer</h2>
              <p className="text-label-md mb-stack-md">Match your breath to the expanding circle.</p>
              <div className="flex items-center justify-center py-stack-lg flex-1">
                <div className="w-32 h-32 bg-white rounded-full border-[1.5px] border-ink-black flex items-center justify-center animate-pulse" style={{ animationDuration: '4s' }}>
                  <div className="w-24 h-24 bg-primary-container opacity-20 rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="mt-auto pt-4">
                <span className="text-label-bold uppercase">Current Heart Rate</span>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold">92</span>
                  <span className="text-label-md mb-1 opacity-70">BPM</span>
                </div>
              </div>
            </div>
            {/* Background abstract shape */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white opacity-20 rounded-full border-[1.5px] border-ink-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatSession;
