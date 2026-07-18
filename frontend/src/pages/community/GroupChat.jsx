import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const GroupChat = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Anonymous Bear',
      time: '10:42 AM',
      content: "Hey everyone. I'm feeling a bit overwhelmed today. The breathing exercises we discussed yesterday aren't really helping.",
      isSelf: false,
      avatar: 'pets',
      color: 'bg-accent-sage',
      iconColor: 'text-outline-variant',
      reactions: []
    },
    {
      id: 2,
      sender: 'Calm River',
      time: '10:45 AM',
      content: "I've been there, Bear. Sometimes focusing on the breath just makes me more anxious. Have you tried grounding with the 5-4-3-2-1 method instead?",
      isSelf: false,
      avatar: 'water_drop',
      color: 'bg-tertiary-fixed',
      iconColor: 'text-tertiary',
      reactions: [{ emoji: '❤️', count: 3 }]
    },
    {
      id: 3,
      sender: 'You',
      time: '10:48 AM',
      content: "The 5-4-3-2-1 method is great. If that feels like too much right now, maybe just try holding something cold? An ice cube or a cold glass of water works wonders for snapping out of a spiral.",
      isSelf: true,
      avatar: 'person',
      color: 'bg-primary-fixed',
      iconColor: 'text-primary',
      reactions: []
    }
  ]);

  useEffect(() => {
    fetchFeed();
  }, [groupId]);

  const fetchFeed = async () => {
    try {
      const res = await axiosInstance.get(`/community/groups/${groupId}/feed`);
      setMessages(res.data.map(p => ({
        id: p.id,
        sender: p.is_anonymous ? 'Anonymous' : 'User',
        time: new Date(p.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: p.content,
        isSelf: p.user_id === localStorage.getItem('userId'), // We might not have userId in localstorage exactly, assume false for now if not matching
        avatar: 'person',
        color: 'bg-accent-sage',
        iconColor: 'text-outline-variant',
        reactions: []
      })));
    } catch (err) {
      console.error('Failed to load group feed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (message.trim()) {
      try {
        await axiosInstance.post('/community/posts', {
          content: message,
          is_anonymous: false,
          has_trigger_warning: false,
          group_id: groupId
        });
        setMessage('');
        fetchFeed();
      } catch (err) {
        console.error('Failed to send message', err);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-80px)] bg-cream-bg">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1); }
        .neo-shadow-sm { box-shadow: 2px 2px 0px 0px rgba(26, 26, 26, 1); }
        .neo-border { border: 1.5px solid #1A1A1A; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* Chat Header */}
      <div className="px-4 md:px-margin-desktop py-4 border-b-[1.5px] border-ink-black bg-surface-bright flex items-center justify-between shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/community/groups')} className="md:hidden p-2 text-on-surface hover:bg-surface-container rounded-full">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="w-14 h-14 rounded-2xl bg-accent-pink neo-border neo-shadow-sm flex items-center justify-center rotate-[-3deg] shrink-0">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>self_improvement</span>
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-ink-black flex items-center gap-2 flex-wrap">
              Mindful Circle
              <span className="px-2 py-0.5 rounded-full border border-ink-black bg-secondary-container text-on-secondary-container text-xs font-label-bold">Verified</span>
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 neo-border"></span>
              124 members online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button className="p-2 rounded-xl border-[1.5px] border-ink-black bg-surface hover:bg-accent-sage transition-colors">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="p-2 rounded-xl border-[1.5px] border-ink-black bg-surface hover:bg-accent-sage transition-colors">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-margin-desktop flex flex-col gap-6">
        
        {/* Date Divider */}
        <div className="flex justify-center my-4">
          <span className="px-4 py-1 rounded-full border-[1.5px] border-ink-black bg-surface-variant text-on-surface-variant font-label-bold text-label-bold text-xs">Today</span>
        </div>

        {messages.map((msg, idx) => (
          <div key={msg.id} className={`flex items-start gap-4 max-w-2xl ${msg.isSelf ? 'self-end flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-full ${msg.color} neo-border flex items-center justify-center shrink-0`}>
              <span className={`material-symbols-outlined ${msg.iconColor}`}>{msg.avatar}</span>
            </div>
            
            <div className={`flex flex-col gap-1 ${msg.isSelf ? 'items-end' : ''}`}>
              <div className={`flex items-baseline gap-2 ${msg.isSelf ? 'flex-row-reverse' : ''}`}>
                <span className="font-label-bold text-label-bold text-ink-black">{msg.sender}</span>
                <span className="text-xs text-on-surface-variant">{msg.time}</span>
              </div>
              
              <div className={`${msg.isSelf ? 'bg-primary-fixed text-on-surface rounded-tr-sm' : 'bg-surface text-ink-black rounded-tl-sm'} border-[1.5px] border-ink-black rounded-2xl p-4 neo-shadow-sm`}>
                <p className="font-body-lg text-body-lg">{msg.content}</p>
              </div>
              
              {/* Reactions */}
              {msg.reactions && msg.reactions.length > 0 && (
                <div className={`flex gap-2 mt-1 ${msg.isSelf ? 'justify-end' : ''}`}>
                  {msg.reactions.map((r, i) => (
                    <button key={i} className="px-2 py-1 rounded-full border-[1.5px] border-ink-black bg-secondary-fixed text-sm flex items-center gap-1 hover:bg-secondary-fixed-dim transition-colors">
                      {r.emoji} <span className="font-label-bold">{r.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* System Message */}
        <div className="flex justify-center my-6">
          <div className="flex items-center gap-2 bg-accent-sage/30 px-4 py-2 rounded-full border border-dashed border-outline-variant">
            <span className="material-symbols-outlined text-sm text-outline-variant">campaign</span>
            <span className="font-label-md text-label-md text-on-surface-variant text-center">Reminder: Group meditation starts in 15 minutes.</span>
          </div>
        </div>
        
        {/* Typing indicator (hardcoded) */}
        <div className="flex items-start gap-4 max-w-2xl">
          <div className="w-10 h-10 rounded-full bg-accent-sage neo-border flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-outline-variant">pets</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="font-label-bold text-label-bold text-ink-black">Anonymous Bear</span>
            </div>
            <div className="bg-surface border-[1.5px] border-ink-black rounded-2xl rounded-tl-sm p-4 neo-shadow-sm flex items-center gap-1 w-16">
              <div className="w-2 h-2 bg-outline rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-outline rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-outline rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
        
        <div className="h-4"></div>
      </div>
      
      {/* Input Area */}
      <div className="px-4 md:px-margin-desktop pb-4 md:pb-margin-desktop pt-4 bg-cream-bg shrink-0">
        
        {/* Quick Replies */}
        <div className="flex gap-3 mb-4 overflow-x-auto scrollbar-hide pb-2">
          {['"I hear you."', '"Take your time."', '"You\'re not alone in this."'].map((reply, i) => (
            <button 
              key={i}
              onClick={() => setMessage(reply.replace(/"/g, ''))}
              className="shrink-0 px-4 py-2 rounded-full border-[1.5px] border-ink-black bg-surface hover:bg-accent-sage transition-colors font-label-md text-label-md"
            >
              {reply}
            </button>
          ))}
        </div>
        
        {/* Input Bar */}
        <div className="flex items-end gap-2 md:gap-4 bg-surface border-[1.5px] border-ink-black rounded-2xl p-2 neo-shadow focus-within:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-within:translate-x-[2px] focus-within:translate-y-[2px] transition-all">
          <button className="p-2 md:p-3 text-outline hover:text-primary transition-colors shrink-0">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 font-body-md text-body-md max-h-32 overflow-y-auto" 
            placeholder="Share your thoughts anonymously..." 
            rows="1"
            style={{ height: 'auto' }}
          ></textarea>
          
          <div className="flex items-center gap-1 md:gap-2 shrink-0 pr-1 md:pr-2 pb-1">
            <button className="hidden sm:block p-2 text-outline hover:text-primary transition-colors">
              <span className="material-symbols-outlined">mood</span>
            </button>
            <button 
              onClick={handleSend}
              disabled={!message.trim()}
              className="p-2 bg-primary text-on-primary rounded-xl border-[1.5px] border-ink-black hover:bg-primary-container transition-colors flex items-center justify-center disabled:opacity-50"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-outline-variant mt-3 hidden md:block">Messages are anonymous and end-to-end encrypted.</p>
      </div>
    </div>
  );
};

export default GroupChat;
