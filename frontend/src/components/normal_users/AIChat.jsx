import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AIChat = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12 max-w-7xl mx-auto py-8">
      <style>{`
        .neo-brutal-shadow {
            box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1);
        }
        .sticker-container {
            border: 1.5px solid #1A1A1A;
            transition: all 0.2s ease;
        }
        .neo-btn-primary {
            background-color: #002da5;
            color: #ffffff;
            border: 1.5px solid #1A1A1A;
            box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1);
            transition: all 0.2s ease;
        }
        .neo-btn-primary:active {
            box-shadow: none;
            transform: translate(2px, 2px);
        }
        .neo-btn-secondary {
            background-color: #fdd33f;
            color: #1A1A1A;
            border: 1.5px solid #1A1A1A;
            transition: all 0.2s ease;
        }
        .neo-btn-secondary:hover {
            transform: translate(-2px, -2px);
            box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1);
        }
      `}</style>

      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-full max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">search</span>
          <input className="w-full pl-12 pr-4 py-2 bg-surface-container-low border-[1.5px] border-ink-black rounded-full focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="Search insights or tools..." type="text"/>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative hover:bg-surface-container-high p-2 rounded-full transition-colors">
            <span className="material-symbols-outlined text-primary">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Hero Section: Neo-Memphis AI Bot */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center sticker-container rounded-[48px] bg-accent-sage p-8 md:p-12 overflow-hidden relative">
        {/* Abstract Deco Shapes */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 rounded-full translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-primary opacity-10 rounded-lg rotate-12"></div>
        
        <div className="lg:col-span-7 space-y-6 z-10">
          <div className="inline-flex items-center gap-2 bg-surface px-4 py-2 rounded-full border border-ink-black font-label-bold text-label-bold text-primary">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>sparkles</span>
            AI COMPANION ONLINE
          </div>
          <h1 className="font-display-lg text-display-lg text-ink-black">Hi, I'm Aura. <br/>How are you feeling today?</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            I'm your personal mental health companion, here 24/7 to listen, provide evidence-based tools, or just talk through your day.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button onClick={() => navigate('/chat')} className="neo-btn-primary px-8 py-4 rounded-full font-label-bold text-label-bold flex items-center gap-2">
              <span className="material-symbols-outlined">chat</span>
              Start Deep Session
            </button>
            <button className="neo-btn-secondary px-8 py-4 rounded-full font-label-bold text-label-bold">
              Check Daily Progress
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-5 flex justify-center items-center z-10 mt-12 lg:mt-0">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-white rounded-[40px] border-[1.5px] border-ink-black neo-brutal-shadow rotate-3 translate-x-4"></div>
            <div className="absolute inset-0 bg-accent-pink rounded-[40px] border-[1.5px] border-ink-black -rotate-2"></div>
            <div className="relative w-full h-full p-8 flex flex-col justify-center items-center gap-4">
              <img alt="Aura Bot" className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDouPL05Qxg-cqW4SF_VeuwQob7Z7V-Q8zbi2v87BR5rd0tXSwH37UFN3rssbbStqPuCjuufjkxUS1aA05sSdue6S9aShQoa5Ato0BvXRdKGSSH_zMXrufahylABNQtOfcBHLKwB9EJn2NH9cr8wKYXa0Or7yl6IcFfuOCz9ZNmrsTPZ2xFxBwGpPHcYoatbKzlsvt_BAdH1XiAJOLIyJTy3oATxuALtAlRM6OWVzY-GXj8peRa3mDN_A"/>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mood Support */}
        <div onClick={() => navigate('/chat')} className="sticker-container rounded-[32px] p-8 bg-surface-container-lowest hover:-translate-y-2 transition-transform group cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-accent-pink border border-ink-black flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-ink-black text-3xl">favorite</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm mb-2">Mood Support</h3>
          <p className="text-on-surface-variant font-body-md mb-6">Feeling overwhelmed? Let's walk through some immediate grounding exercises.</p>
          <div className="flex items-center text-primary font-label-bold group-hover:underline">
            Explore exercises <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </div>
        </div>

        {/* CBT Tools */}
        <div className="sticker-container rounded-[32px] p-8 bg-surface-container-lowest hover:-translate-y-2 transition-transform group cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-secondary-container border border-ink-black flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-ink-black text-3xl">architecture</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm mb-2">CBT Tools</h3>
          <p className="text-on-surface-variant font-body-md mb-6">Structured worksheets to help reframe negative thought patterns and gain clarity.</p>
          <div className="flex items-center text-primary font-label-bold group-hover:underline">
            Open toolbox <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </div>
        </div>

        {/* Just Talk */}
        <div onClick={() => navigate('/chat')} className="sticker-container rounded-[32px] p-8 bg-surface-container-lowest hover:-translate-y-2 transition-transform group cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-accent-sage border border-ink-black flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-ink-black text-3xl">forum</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm mb-2">Just Talk</h3>
          <p className="text-on-surface-variant font-body-md mb-6">No pressure, no goals. Just an open space to vent about your day in real-time.</p>
          <div className="flex items-center text-primary font-label-bold group-hover:underline">
            Start talking <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </div>
        </div>
      </section>

      {/* Recent & Suggested Row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Chats */}
        <div className="sticker-container rounded-[32px] bg-white overflow-hidden">
          <div className="p-8 border-b border-ink-black flex justify-between items-center bg-surface-container-high">
            <h2 className="font-headline-sm flex items-center gap-3">
              <span className="material-symbols-outlined">history</span>
              Recent Conversations
            </h2>
            <button className="text-primary font-label-bold hover:underline">View all</button>
          </div>
          <div className="p-4 space-y-2">
            <div className="p-4 hover:bg-surface-container-low transition-colors rounded-2xl flex items-center gap-4 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-accent-pink flex items-center justify-center border border-ink-black shrink-0">
                <span className="material-symbols-outlined">sentiment_dissatisfied</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-label-bold text-on-surface truncate">Managing Work Anxiety</p>
                <p className="text-sm text-on-surface-variant truncate">"We identified three triggers related to your project..."</p>
              </div>
              <div className="text-xs text-on-surface-variant whitespace-nowrap">2h ago</div>
            </div>
            
            <div className="p-4 hover:bg-surface-container-low transition-colors rounded-2xl flex items-center gap-4 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center border border-ink-black shrink-0">
                <span className="material-symbols-outlined">nights_stay</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-label-bold text-on-surface truncate">Sleep Routine Reflection</p>
                <p className="text-sm text-on-surface-variant truncate">"The 4-7-8 breathing technique really helped you..."</p>
              </div>
              <div className="text-xs text-on-surface-variant whitespace-nowrap">Yesterday</div>
            </div>
          </div>
        </div>

        {/* Suggested Topics */}
        <div className="sticker-container rounded-[32px] bg-white p-8 flex flex-col justify-center">
          <h2 className="font-headline-sm mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined">tips_and_updates</span>
            Suggested for You
          </h2>
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-3 rounded-full border border-ink-black bg-surface-container hover:bg-accent-orange transition-colors font-label-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">wb_sunny</span>
              Morning Intentions
            </button>
            <button className="px-6 py-3 rounded-full border border-ink-black bg-surface-container hover:bg-secondary-container transition-colors font-label-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">restaurant</span>
              Mindful Eating Habits
            </button>
            <button className="px-6 py-3 rounded-full border border-ink-black bg-surface-container hover:bg-accent-pink transition-colors font-label-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">diversity_3</span>
              Social Boundaries
            </button>
            <button className="px-6 py-3 rounded-full border border-ink-black bg-surface-container hover:bg-accent-sage transition-colors font-label-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">self_improvement</span>
              Deep Muscle Relaxation
            </button>
          </div>
          
          <div className="mt-8 p-4 bg-background rounded-2xl border-dashed border-[1.5px] border-ink-black/20 text-center">
            <p className="text-sm italic text-on-surface-variant">"Your mind is like a garden. If you don't tend to it, you can't expect it to bloom."</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIChat;
