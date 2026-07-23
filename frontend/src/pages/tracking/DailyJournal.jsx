import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const DailyJournal = () => {
  const [entry, setEntry] = useState('');
  const [recentEntries, setRecentEntries] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    fetchRecentEntries();
  }, []);

  const fetchRecentEntries = async () => {
    try {
      const response = await axiosInstance.get('/user/tracking/journal');
      setRecentEntries(response.data);
    } catch (error) {
      console.error('Failed to load recent journals', error);
    }
  };

  const handleSaveEntry = async () => {
    if (!entry.trim()) {
      toast.warning('Please write something before saving.');
      return;
    }
    
    setIsSaving(true);
    try {
      await axiosInstance.post('/user/tracking/journal', { text: entry });
      toast.success('Journal entry saved successfully!');
      setEntry('');
      fetchRecentEntries(); // Refresh the list
    } catch (error) {
      console.error('Error saving journal', error);
      toast.error('Failed to save journal entry.');
    } finally {
      setIsSaving(false);
    }
  };

  
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="flex-1 w-full bg-cream-bg p-margin-mobile md:p-margin-desktop flex flex-col gap-stack-lg">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <p className="font-label-bold text-label-bold text-primary mb-2 uppercase tracking-widest">Daily Reflection</p>
          <h2 className="font-display-lg text-display-lg text-ink-black">{today}</h2>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface-container-lowest border-[1.5px] border-ink-black p-3 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-ink-black">
            <span className="material-symbols-outlined">bookmark_add</span>
          </button>
          <button 
            onClick={handleSaveEntry}
            disabled={isSaving}
            className="bg-primary text-on-primary font-label-bold text-label-bold px-6 py-3 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : null}
            {isSaving ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        
        {/* Main Reflection Area (8 columns) */}
        <div className="lg:col-span-8 flex flex-col gap-stack-md h-full">
          {/* Prompt Card (Yellow Sticker) */}
          <div className="bg-secondary-fixed border-[1.5px] border-ink-black rounded-[24px] p-container-padding relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-4">
            <div className="absolute -top-4 -left-4 bg-primary text-on-primary font-label-bold text-label-bold px-4 py-2 rounded-full border-[1.5px] border-ink-black rotate-[-6deg]">
              Prompt of the Day
            </div>
            <div className="flex items-start gap-4 mt-2">
              <span className="material-symbols-outlined text-4xl text-ink-black">lightbulb</span>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-ink-black mb-2">What is one small victory you experienced today, and how did it make you feel?</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Even the tiniest steps forward are worth celebrating. Focus on the positive momentum.</p>
              </div>
            </div>
          </div>

          {/* Text Area Card */}
          <div className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] p-container-padding shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex-grow flex flex-col min-h-[400px]">
            <textarea 
              className="w-full h-full min-h-[400px] resize-none border-none focus:ring-0 font-body-lg text-body-lg text-ink-black placeholder:text-outline-variant bg-transparent outline-none" 
              placeholder="Start typing your reflection here... Let your thoughts flow freely without judgment."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Sidebar Context Area (4 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-stack-md mt-4 lg:mt-0">
          {/* Mood Tagging Card */}
          <div className="bg-accent-pink border-[1.5px] border-ink-black rounded-[24px] p-container-padding">
            <h4 className="font-headline-sm text-headline-sm text-ink-black mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">sentiment_satisfied</span>
              Today's Mood
            </h4>
            <div className="flex flex-wrap gap-2">
              <button className="bg-surface-container-lowest border-[1.5px] border-ink-black px-4 py-2 rounded-full font-label-bold text-label-bold text-ink-black hover:bg-primary hover:text-on-primary transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none">Calm</button>
              <button className="bg-primary border-[1.5px] border-ink-black px-4 py-2 rounded-full font-label-bold text-label-bold text-on-primary transition-colors translate-x-[1px] translate-y-[1px] shadow-none">Grateful</button>
              <button className="bg-surface-container-lowest border-[1.5px] border-ink-black px-4 py-2 rounded-full font-label-bold text-label-bold text-ink-black hover:bg-primary hover:text-on-primary transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none">Productive</button>
              <button className="bg-surface-container-lowest border-[1.5px] border-ink-black px-4 py-2 rounded-full font-label-bold text-label-bold text-ink-black hover:bg-primary hover:text-on-primary transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none">Anxious</button>
              <button className="bg-surface-container-lowest border-[1.5px] border-ink-black p-2 rounded-full text-ink-black hover:bg-primary hover:text-on-primary transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>

          {/* Previous Entries Card */}
          <div className="bg-accent-sage border-[1.5px] border-ink-black rounded-[24px] p-container-padding flex-grow">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-headline-sm text-headline-sm text-ink-black flex items-center gap-2">
                <span className="material-symbols-outlined">history</span>
                Recent
              </h4>
              <a className="font-label-bold text-label-bold text-primary hover:underline" href="#">View All</a>
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px] hide-scrollbar pr-2">
              {recentEntries.length === 0 ? (
                <p className="font-body-md text-on-surface-variant text-center py-4">No recent entries yet.</p>
              ) : (
                recentEntries.map((journal) => {
                  const dateObj = new Date(journal.created_at);
                  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  
                  return (
                    <div key={journal.id} className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-xl p-4 cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-label-bold text-label-bold text-ink-black">{dateStr}</span>
                        <span className="material-symbols-outlined text-sm text-outline">history_edu</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">{journal.content}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyJournal;
