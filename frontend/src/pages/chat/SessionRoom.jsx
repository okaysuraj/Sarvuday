import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const SessionRoom = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'clinician', text: 'Hello! I am ready when you are.', time: '10:00 AM' }
  ]);

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // In a real app, we would fetch the session details using the sessionId
    // For now we assume sessionId is appointmentId or session_id
    const fetchSession = async () => {
      try {
        const res = await axiosInstance.get(`/user/appointments/${sessionId}`);
        setAppointment(res.data);
      } catch (err) {
        console.error('Failed to load session', err);
        // Fallback to dummy data for demo purposes if not found
        setAppointment({
          counsellor: { name: 'Dr. Aris Varma', profile_pic: '' },
          user: { name: 'Patient' }
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSession();
  }, [sessionId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEndCall = () => {
    navigate('/session/summary', { state: { appointment } });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    setMessages([
      ...messages, 
      { 
        id: Date.now(), 
        sender: 'user', 
        text: chatMessage, 
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
      }
    ]);
    setChatMessage('');
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-cream-bg">
        <span className="material-symbols-outlined animate-spin text-primary text-6xl">autorenew</span>
      </div>
    );
  }

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeString = `${mins}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-cream-bg font-body-md text-on-background relative">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1); }
        .neo-shadow-active:active { transform: translate(2px, 2px); box-shadow: none; }
        .video-overlay-gradient {
          background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.4) 100%);
        }
      `}</style>
      
      {/* MAIN CANVAS (Full Video Feed) */}
      <main className="relative flex-grow h-full bg-ink-black flex items-center justify-center overflow-hidden">
        
        {/* Clinician Feed (Background Image Placeholder) */}
        <div className="absolute inset-0 w-full h-full">
          <div className="w-full h-full bg-surface-variant flex items-center justify-center flex-col relative">
            <span className="material-symbols-outlined text-9xl text-on-surface-variant mb-4 opacity-50">person</span>
            <span className="text-on-surface-variant font-headline-sm">{appointment?.counsellor?.name || 'Therapist'}</span>
          </div>
          <div className="absolute inset-0 video-overlay-gradient pointer-events-none"></div>
        </div>
        
        {/* TOP BAR */}
        <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-20">
          <div className="bg-background border-[1.5px] border-ink-black px-6 py-3 rounded-xl neo-shadow flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-ink-black leading-tight">{appointment?.counsellor?.name || 'Dr. Therapist'}</span>
              <span className="font-label-md text-label-md text-on-surface-variant">Clinical Psychologist</span>
            </div>
          </div>
          
          <div className="bg-secondary-container border-[1.5px] border-ink-black px-6 py-3 rounded-xl neo-shadow flex items-center gap-3">
            <span className="material-symbols-outlined text-on-secondary-container">timer</span>
            <span className="font-headline-sm text-headline-sm text-on-secondary-container tabular-nums">
              {timeString}
            </span>
          </div>
        </div>
        
        {/* SELF PREVIEW (Picture-in-Picture) */}
        <div className="absolute top-28 right-8 w-72 aspect-video bg-surface-container border-[1.5px] border-ink-black rounded-[24px] overflow-hidden neo-shadow group z-20">
          <div className="w-full h-full bg-ink-black flex items-center justify-center relative">
            {isVideoOff ? (
              <span className="material-symbols-outlined text-white text-4xl">videocam_off</span>
            ) : (
              <span className="material-symbols-outlined text-white text-4xl">face</span>
            )}
          </div>
          <div className="absolute bottom-3 right-3 bg-ink-black/40 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] text-white font-bold uppercase tracking-widest">
            You
          </div>
        </div>
        
        {/* BOTTOM CONTROL BAR */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-30">
          <div className="bg-background border-[1.5px] border-ink-black p-3 rounded-[32px] neo-shadow flex items-center gap-4">
            {/* Mute */}
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`w-14 h-14 border-[1.5px] border-ink-black rounded-full flex items-center justify-center neo-shadow-active transition-all ${isMuted ? 'bg-error text-white' : 'bg-surface-container-high text-ink-black hover:bg-surface-variant'}`}
            >
              <span className="material-symbols-outlined text-[28px]">{isMuted ? 'mic_off' : 'mic'}</span>
            </button>
            
            {/* Video Toggle */}
            <button 
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`w-14 h-14 border-[1.5px] border-ink-black rounded-full flex items-center justify-center neo-shadow-active transition-all ${isVideoOff ? 'bg-error text-white' : 'bg-surface-container-high text-ink-black hover:bg-surface-variant'}`}
            >
              <span className="material-symbols-outlined text-[28px]">{isVideoOff ? 'videocam_off' : 'videocam'}</span>
            </button>
            
            {/* End Call */}
            <button 
              onClick={handleEndCall}
              className="px-8 h-14 bg-error text-white border-[1.5px] border-ink-black rounded-full flex items-center justify-center gap-2 neo-shadow hover:opacity-90 neo-shadow-active transition-all mx-2"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>call_end</span>
              <span className="font-label-bold text-label-bold">End Session</span>
            </button>
            
            {/* Chat Toggle */}
            <button 
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`w-14 h-14 border-[1.5px] border-ink-black rounded-full flex items-center justify-center neo-shadow-active transition-all ${isChatOpen ? 'bg-accent-pink' : 'bg-surface-container-high'} text-ink-black`}
            >
              <span className="material-symbols-outlined text-[28px]">chat_bubble</span>
            </button>
          </div>
        </div>
      </main>
      
      {/* RIGHT SIDEBAR (Chat) */}
      <aside className={`${isChatOpen ? 'w-96' : 'w-0'} overflow-hidden bg-background border-l-[1.5px] border-ink-black transition-all duration-300 flex flex-col shrink-0`}>
        <div className="p-6 border-b-[1.5px] border-ink-black flex justify-between items-center bg-surface-container-low whitespace-nowrap">
          <h2 className="font-headline-sm text-headline-sm">Session Chat</h2>
          <button onClick={() => setIsChatOpen(false)} className="w-10 h-10 border-[1.5px] border-ink-black rounded-lg flex items-center justify-center hover:bg-surface-variant">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-grow p-6 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex flex-col gap-1 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`border-[1.5px] border-ink-black p-3 max-w-[85%] ${
                msg.sender === 'user' 
                ? 'bg-primary text-white rounded-2xl rounded-tr-none' 
                : 'bg-surface-container-high text-ink-black rounded-2xl rounded-tl-none'
              }`}>
                <p className="font-body-md text-body-md">{msg.text}</p>
              </div>
              <span className={`text-[10px] text-on-surface-variant font-bold ${msg.sender === 'user' ? 'mr-1' : 'ml-1'}`}>
                {msg.time}
              </span>
            </div>
          ))}
        </div>
        
        {/* Chat Input */}
        <div className="p-6 border-t-[1.5px] border-ink-black bg-surface-container-low min-w-[24rem]">
          <form onSubmit={handleSendMessage} className="relative">
            <input 
              value={chatMessage}
              onChange={e => setChatMessage(e.target.value)}
              className="w-full bg-white border-[1.5px] border-ink-black rounded-xl py-4 pl-4 pr-12 focus:ring-0 focus:border-primary neo-shadow transition-all font-body-md" 
              placeholder="Type a message..." 
              type="text"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:scale-110 transition-transform disabled:opacity-50" disabled={!chatMessage.trim()}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
};

export default SessionRoom;
