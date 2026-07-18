import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const AIChatHome = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axiosInstance.get('/ai/sessions');
        setSessions(res.data || []);
      } catch (err) {
        console.error("Failed to fetch ai sessions", err);
      }
    };
    fetchSessions();
  }, []);
  return (
    <div className="flex-1 w-full bg-background p-margin-mobile md:p-margin-desktop space-y-stack-lg">
      <style>{`
        .neo-brutal-shadow { box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1); }
        .neo-brutal-shadow-active { box-shadow: none; transform: translate(2px, 2px); }
        .sticker-container { border: 1.5px solid #1A1A1A; transition: all 0.2s ease; }
        .neo-btn-primary {
            background-color: #002da5;
            color: #ffffff;
            border: 1.5px solid #1A1A1A;
            box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1);
            transition: all 0.2s ease;
        }
        .neo-btn-primary:active { box-shadow: none; transform: translate(2px, 2px); }
        .neo-btn-secondary {
            background-color: #fdd33f;
            color: #1A1A1A;
            border: 1.5px solid #1A1A1A;
            transition: all 0.2s ease;
        }
        .neo-btn-secondary:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1); }
      `}</style>
      
      {/* Hero Section: Neo-Memphis AI Bot */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center sticker-container rounded-[48px] bg-accent-sage p-container-padding overflow-hidden relative">
        {/* Abstract Deco Shapes */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 rounded-full translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-primary opacity-10 rounded-lg rotate-12"></div>
        
        <div className="lg:col-span-7 space-y-6 z-10">
          <div className="inline-flex items-center gap-2 bg-surface px-4 py-2 rounded-full border border-ink-black font-label-bold text-label-bold text-primary">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>spark</span>
            AI COMPANION ONLINE
          </div>
          <h1 className="font-display-lg text-display-lg text-ink-black">Hi, I'm Aura. <br/>How are you feeling today?</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            I'm your personal mental health companion, here 24/7 to listen, provide evidence-based tools, or just talk through your day.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/ai-chat/session" className="neo-btn-primary px-8 py-4 rounded-full font-label-bold text-label-bold flex items-center gap-2">
              <span className="material-symbols-outlined">chat</span>
              Start Deep Session
            </Link>
            <Link to="/mood-tracker" className="neo-btn-secondary px-8 py-4 rounded-full font-label-bold text-label-bold flex items-center justify-center">
              Check Daily Progress
            </Link>
          </div>
        </div>
        
        <div className="lg:col-span-5 flex justify-center items-center z-10 mt-8 lg:mt-0">
          <div className="relative w-72 h-72 md:w-96 md:h-96 group perspective-1000">
            <div className="absolute inset-0 bg-white rounded-[40px] border-[1.5px] border-ink-black neo-brutal-shadow rotate-3 translate-x-4 transition-transform duration-500 group-hover:rotate-6"></div>
            <div className="absolute inset-0 bg-accent-pink rounded-[40px] border-[1.5px] border-ink-black -rotate-2 transition-transform duration-500 group-hover:-rotate-4"></div>
            <div className="relative w-full h-full p-8 flex flex-col justify-center items-center gap-4 bg-surface-container-lowest rounded-[40px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] overflow-hidden">
              <div className="text-[120px] leading-none mb-4 animate-bounce">🤖</div>
              <p className="font-label-bold text-primary text-center">Ready to chat!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Mood Support */}
        <Link to="/ai-chat/session?topic=mood" className="sticker-container rounded-[32px] p-container-padding bg-surface-container-lowest hover:-translate-y-1 hover:neo-brutal-shadow transition-all group cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-accent-pink border border-ink-black flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-ink-black text-3xl">favorite</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm mb-2">Mood Support</h3>
          <p className="text-on-surface-variant font-body-md mb-6">Feeling overwhelmed? Let's walk through some immediate grounding exercises.</p>
          <div className="flex items-center text-primary font-label-bold group-hover:underline">
            Explore exercises <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </div>
        </Link>
        
        {/* CBT Tools */}
        <Link to="/ai-chat/session?topic=cbt" className="sticker-container rounded-[32px] p-container-padding bg-surface-container-lowest hover:-translate-y-1 hover:neo-brutal-shadow transition-all group cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-secondary-container border border-ink-black flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-ink-black text-3xl">architecture</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm mb-2">CBT Tools</h3>
          <p className="text-on-surface-variant font-body-md mb-6">Structured worksheets to help reframe negative thought patterns and gain clarity.</p>
          <div className="flex items-center text-primary font-label-bold group-hover:underline">
            Open toolbox <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </div>
        </Link>
        
        {/* Just Talk */}
        <Link to="/ai-chat/session?topic=vent" className="sticker-container rounded-[32px] p-container-padding bg-surface-container-lowest hover:-translate-y-1 hover:neo-brutal-shadow transition-all group cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-accent-sage border border-ink-black flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-ink-black text-3xl">forum</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm mb-2">Just Talk</h3>
          <p className="text-on-surface-variant font-body-md mb-6">No pressure, no goals. Just an open space to vent about your day in real-time.</p>
          <div className="flex items-center text-primary font-label-bold group-hover:underline">
            Start talking <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </div>
        </Link>
      </section>

      {/* Recent & Suggested Row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        {/* Recent Chats */}
        <div className="sticker-container rounded-[32px] bg-white overflow-hidden">
          <div className="p-6 md:p-8 border-b border-ink-black flex justify-between items-center bg-surface-container-high">
            <h2 className="font-headline-sm text-headline-sm flex items-center gap-3">
              <span className="material-symbols-outlined">history</span>
              Recent Conversations
            </h2>
            <button className="text-primary font-label-bold hover:underline">View all</button>
          </div>
          <div className="p-2">
            <div className="space-y-1">
              {sessions.length === 0 ? (
                <div className="p-4 text-center text-on-surface-variant font-body-md">No recent conversations.</div>
              ) : (
                sessions.slice(0, 3).map((session, idx) => (
                  <div key={session.session_id || idx} onClick={() => navigate(`/ai-chat/session?session_id=${session.session_id}`)} className="p-4 hover:bg-surface-container-low transition-colors rounded-2xl flex items-center gap-4 cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-accent-sage flex items-center justify-center border border-ink-black shrink-0">
                      <span className="material-symbols-outlined">chat</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-label-bold text-on-surface">Chat Session</p>
                      <p className="text-sm text-on-surface-variant truncate">Continued conversation...</p>
                    </div>
                    <div className="text-xs text-on-surface-variant">
                      {new Date(session.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Suggested Topics */}
        <div className="sticker-container rounded-[32px] bg-white p-container-padding flex flex-col justify-center">
          <h2 className="font-headline-sm text-headline-sm mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined">tips_and_updates</span>
            Suggested for You
          </h2>
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-3 rounded-full border border-ink-black bg-surface-container hover:bg-accent-orange transition-colors font-label-bold text-label-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">wb_sunny</span>
              Morning Intentions
            </button>
            <button className="px-6 py-3 rounded-full border border-ink-black bg-surface-container hover:bg-secondary-container transition-colors font-label-bold text-label-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">restaurant</span>
              Mindful Eating Habits
            </button>
            <button className="px-6 py-3 rounded-full border border-ink-black bg-surface-container hover:bg-accent-pink transition-colors font-label-bold text-label-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">diversity_3</span>
              Social Boundaries
            </button>
            <button className="px-6 py-3 rounded-full border border-ink-black bg-surface-container hover:bg-accent-sage transition-colors font-label-bold text-label-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">self_improvement</span>
              Deep Muscle Relaxation
            </button>
            <button className="px-6 py-3 rounded-full border border-ink-black bg-surface-container hover:bg-primary hover:text-white text-ink-black transition-colors font-label-bold text-label-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">add</span>
              Explore More
            </button>
          </div>
          {/* Atmospheric Micro-illustration */}
          <div className="mt-8 p-4 bg-background rounded-2xl border-dashed border-[1.5px] border-outline text-center">
            <p className="text-sm text-on-surface-variant italic">"Your mind is like a garden. If you don't tend to it, you can't expect it to bloom."</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIChatHome;
