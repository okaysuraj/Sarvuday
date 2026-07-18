import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionNotes = () => {
  const navigate = useNavigate();
  
  const [takeaways, setTakeaways] = useState([
    "Practice deep breathing when work anxiety spikes.",
    "Journal for 10 minutes before bed to declutter the mind."
  ]);
  const [newTakeaway, setNewTakeaway] = useState('');
  
  const [mood, setMood] = useState(null);
  const [notes, setNotes] = useState('');

  const handleAddTakeaway = () => {
    if (newTakeaway.trim()) {
      setTakeaways([...takeaways, newTakeaway]);
      setNewTakeaway('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTakeaway();
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 font-body-md text-on-surface">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
        .active-click:active { transform: translate(2px, 2px); box-shadow: none !important; }
        .neo-border { border: 1.5px solid #1A1A1A; }
      `}</style>
      
      <div className="flex justify-between items-center mb-8 border-b-[1.5px] border-ink-black pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center mr-2 hover:bg-surface-container rounded-full">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="h-10 w-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-pink flex items-center justify-center text-xl font-bold">
            P
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-ink-black font-bold">In-Session Notes</h2>
            <p className="font-label-md text-label-md text-on-surface-variant">Session with Patient • Today</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="px-6 py-3 bg-primary text-white font-label-bold text-label-md rounded-xl neo-border neo-shadow active-click hover:bg-primary-container transition-all">
            Save Notes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Reflections Editor (Main Column) */}
        <section className="col-span-1 lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-[32px] neo-border min-h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-sm text-headline-sm text-ink-black flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
                Reflections
              </h3>
              <div className="flex gap-2">
                <button className="p-2 border-[1.5px] border-ink-black rounded-lg hover:bg-surface-container-low transition-all">
                  <span className="material-symbols-outlined text-sm">format_bold</span>
                </button>
                <button className="p-2 border-[1.5px] border-ink-black rounded-lg hover:bg-surface-container-low transition-all">
                  <span className="material-symbols-outlined text-sm">format_italic</span>
                </button>
                <button className="p-2 border-[1.5px] border-ink-black rounded-lg hover:bg-surface-container-low transition-all">
                  <span className="material-symbols-outlined text-sm">format_list_bulleted</span>
                </button>
              </div>
            </div>
            
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="flex-grow w-full border-none focus:ring-0 text-lg font-body-lg text-on-surface resize-none leading-relaxed placeholder:text-on-surface-variant/50 outline-none" 
              placeholder="Start typing your thoughts, feelings, and insights from today's session here..."
            ></textarea>
            
            <div className="mt-8 pt-6 border-t-[1.5px] border-ink-black border-dashed flex justify-between items-center text-on-surface-variant">
              <span className="font-label-md text-label-md">Auto-saved just now</span>
              <div className="flex gap-4">
                <span className="font-label-md text-label-md">{notes.split(/\s+/).filter(w => w.length > 0).length} words</span>
                <span className="font-label-md text-label-md">{notes.length} characters</span>
              </div>
            </div>
          </div>
          
          {/* Post-Session Mood Section */}
          <div className="bg-accent-sage p-8 rounded-[32px] neo-border flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="font-headline-sm text-headline-sm text-ink-black">Patient's State</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">How is the patient feeling post-session?</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setMood('subdued')}
                className={`group flex flex-col items-center gap-2 p-4 bg-white border-[1.5px] border-ink-black rounded-2xl active-click transition-all ${mood === 'subdued' ? 'bg-accent-orange translate-y-[2px] shadow-none' : 'neo-shadow hover:bg-surface-container-low'}`}
              >
                <span className="text-4xl">😔</span>
                <span className="font-label-bold text-label-md">Subdued</span>
              </button>
              <button 
                onClick={() => setMood('neutral')}
                className={`group flex flex-col items-center gap-2 p-4 bg-white border-[1.5px] border-ink-black rounded-2xl active-click transition-all ${mood === 'neutral' ? 'bg-secondary-container translate-y-[2px] shadow-none' : 'neo-shadow hover:bg-surface-container-low'}`}
              >
                <span className="text-4xl">😐</span>
                <span className="font-label-bold text-label-md">Neutral</span>
              </button>
              <button 
                onClick={() => setMood('relieved')}
                className={`group flex flex-col items-center gap-2 p-4 bg-white border-[1.5px] border-ink-black rounded-2xl active-click transition-all ${mood === 'relieved' ? 'bg-accent-sage translate-y-[2px] shadow-none' : 'neo-shadow hover:bg-surface-container-low'}`}
              >
                <span className="text-4xl">😊</span>
                <span className="font-label-bold text-label-md">Relieved</span>
              </button>
            </div>
          </div>
        </section>
        
        {/* Side Panel (Key Takeaways) */}
        <aside className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-accent-pink p-8 rounded-[32px] neo-border flex flex-col gap-6">
            <h3 className="font-headline-sm text-headline-sm text-ink-black flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              Key Takeaways
            </h3>
            
            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
              {takeaways.map((takeaway, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl neo-border flex gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                  <span className="material-symbols-outlined text-primary">circle</span>
                  <p className="font-body-md text-body-md">{takeaway}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <div className="relative">
                <input 
                  value={newTakeaway}
                  onChange={(e) => setNewTakeaway(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-white border-[1.5px] border-ink-black rounded-xl px-4 py-3 pr-12 focus:ring-0 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none transition-all" 
                  placeholder="Add takeaway..." 
                  type="text"
                />
                <button 
                  onClick={handleAddTakeaway}
                  className="absolute right-2 top-2 p-1.5 bg-primary text-white rounded-lg active-click hover:bg-primary-container"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
              <p className="mt-3 text-xs text-on-surface-variant italic">Press enter or click '+' to save a quick point.</p>
            </div>
          </div>
          
          {/* Session Context Card */}
          <div className="bg-white p-8 rounded-[32px] border-[1.5px] border-ink-black border-dashed">
            <h4 className="font-label-bold text-label-md text-on-surface-variant uppercase tracking-wider mb-4">Therapist Prompt</h4>
            <p className="font-body-md text-body-md text-on-surface">"Think about one way you can be more compassionate toward yourself this week."</p>
            <div className="mt-6 flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
              <span className="material-symbols-outlined text-secondary">lightbulb</span>
              <span className="font-label-md text-label-md">Related Topic: Self-Compassion</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SessionNotes;
