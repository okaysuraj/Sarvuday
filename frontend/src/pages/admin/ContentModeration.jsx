import React from 'react';

const ContentModeration = () => {
  return (
    <div className="flex-1 p-margin-desktop gap-8 bg-cream-bg flex flex-col xl:flex-row">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1); }
        .neo-shadow-active:active { box-shadow: 0px 0px 0px 0px rgba(26, 26, 26, 1); transform: translate(2px, 2px); }
        .sticker-container { border: 1.5px solid #1A1A1A; background-color: white; transition: all 0.2s ease; }
      `}</style>

      {/* Left Column: Flagged Content Queue */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-4">
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-primary text-white font-bold rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">All Queue</button>
            <button className="px-6 py-2 bg-white text-ink-black font-bold rounded-xl border-[1.5px] border-ink-black hover:bg-surface-container-high transition-all">High Priority</button>
          </div>
          <div className="flex items-center gap-2 border-[1.5px] border-ink-black rounded-xl bg-[#f9f8f3] px-4 py-2 w-full sm:w-auto">
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
            <input className="bg-transparent border-none outline-none text-label-md w-full focus:ring-0" placeholder="Search incidents..." type="text"/>
          </div>
        </div>

        {/* Flagged Cards Queue */}
        <div className="space-y-4">
          
          {/* Card 1 */}
          <div className="sticker-container rounded-[32px] p-6 sm:p-8 flex flex-col gap-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(26,26,26,0.1)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-[1.5px] border-ink-black bg-accent-sage flex items-center justify-center font-bold text-lg">
                  AR
                </div>
                <div>
                  <h3 className="font-headline-sm text-ink-black">@alex_rivera</h3>
                  <p className="text-[12px] text-on-surface-variant">Posted 14m ago • Community Forum</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-error-container text-on-error-container text-[12px] font-bold rounded-full border-[1px] border-ink-black uppercase tracking-wider">HATE SPEECH</span>
                <span className="px-3 py-1 bg-accent-orange text-ink-black text-[12px] font-bold rounded-full border-[1px] border-ink-black uppercase tracking-wider">AI 94% RISK</span>
              </div>
            </div>
            <div className="p-4 sm:p-6 bg-surface-container rounded-2xl border-[1.5px] border-ink-black italic text-body-lg">
              "I honestly can't stand how people from [Redacted Community] are always trying to push their agenda here. It's disgusting and they should be banned from the platform entirely."
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex w-full sm:w-auto gap-2 sm:gap-4">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-accent-sage text-ink-black font-bold rounded-xl border-[1.5px] border-ink-black neo-shadow neo-shadow-active">
                  <span className="material-symbols-outlined">check_circle</span> Approve
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-accent-pink text-ink-black font-bold rounded-xl border-[1.5px] border-ink-black neo-shadow neo-shadow-active">
                  <span className="material-symbols-outlined">delete</span> Remove
                </button>
              </div>
              <button className="w-full sm:w-auto px-6 py-3 bg-ink-black text-white font-bold rounded-xl border-[1.5px] border-ink-black neo-shadow neo-shadow-active">
                Suspend User
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="sticker-container rounded-[32px] p-6 sm:p-8 flex flex-col gap-6 opacity-80 scale-[0.98]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-[1.5px] border-ink-black bg-secondary-fixed flex items-center justify-center font-bold">JD</div>
                <div>
                  <h3 className="font-headline-sm text-ink-black">@jordan_doe</h3>
                  <p className="text-[12px] text-on-surface-variant">Posted 32m ago • Private Message (Flagged)</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-accent-pink text-ink-black text-[12px] font-bold rounded-full border-[1px] border-ink-black uppercase">SELF-HARM</span>
                <span className="px-3 py-1 bg-accent-orange text-ink-black text-[12px] font-bold rounded-full border-[1px] border-ink-black uppercase">AI 82% RISK</span>
              </div>
            </div>
            <div className="p-4 sm:p-6 bg-surface-container rounded-2xl border-[1.5px] border-ink-black italic text-body-lg">
              "Everything feels too heavy right now. I don't know if I can keep going with this treatment, it feels like there's no way out for me anymore..."
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl border-[1.5px] border-ink-black neo-shadow neo-shadow-active">Escalate to Crisis Team</button>
                <button className="px-6 py-3 bg-white text-ink-black font-bold rounded-xl border-[1.5px] border-ink-black border-dashed hover:bg-surface-container transition-colors">Mark as Safe</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Right Column: User Profile Sidebar */}
      <aside className="w-full xl:w-[400px] flex flex-col gap-6 mt-8 xl:mt-0">
        <div className="sticker-container rounded-[48px] p-8 sm:p-10 flex flex-col items-center text-center xl:sticky xl:top-28 bg-white neo-shadow">
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-full border-[2px] border-ink-black bg-primary flex items-center justify-center text-white text-3xl font-bold">
              AR
            </div>
            <div className="absolute -bottom-2 -right-2 bg-secondary-container p-1 rounded-lg border-[1.5px] border-ink-black">
              <span className="material-symbols-outlined text-[16px] font-bold">verified</span>
            </div>
          </div>
          <h2 className="font-headline-md text-headline-md mb-1">Alex Rivera</h2>
          <p className="text-on-surface-variant font-label-md mb-6">Member since Jan 2023</p>
          
          {/* Trust Score Gauge */}
          <div className="w-full bg-surface-container-high rounded-3xl p-6 border-[1.5px] border-ink-black mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-label-bold text-ink-black">Trust Score</span>
              <span className="text-error font-extrabold text-2xl">34/100</span>
            </div>
            <div className="w-full h-4 bg-white rounded-full border-[1.5px] border-ink-black overflow-hidden">
              <div className="h-full bg-error w-[34%] border-r-[1.5px] border-ink-black"></div>
            </div>
            <p className="text-[12px] mt-4 text-on-surface-variant">Low trust score due to repeated community guideline strikes in the last 30 days.</p>
          </div>
          
          {/* Previous Violations */}
          <div className="w-full space-y-4 text-left">
            <h4 className="font-label-bold uppercase tracking-widest text-[11px] text-on-surface-variant px-2">Violation History</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-accent-pink/30 rounded-xl border border-ink-black/20">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-error">warning</span>
                  <span className="text-label-md">Harassment</span>
                </div>
                <span className="text-[11px] font-bold">Feb 12</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-accent-orange/30 rounded-xl border border-ink-black/20">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">error</span>
                  <span className="text-label-md">Spamming</span>
                </div>
                <span className="text-[11px] font-bold">Jan 28</span>
              </div>
            </div>
          </div>
          
          {/* Behavior Flags */}
          <div className="w-full mt-8 text-left">
            <h4 className="font-label-bold uppercase tracking-widest text-[11px] text-on-surface-variant px-2 mb-4">Recent Behavior Flags</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-surface-container-highest rounded-full text-[12px] border-[1px] border-ink-black">Aggressive Tone</span>
              <span className="px-3 py-1 bg-surface-container-highest rounded-full text-[12px] border-[1px] border-ink-black">Late Night Activity</span>
              <span className="px-3 py-1 bg-surface-container-highest rounded-full text-[12px] border-[1px] border-ink-black">Keyword: "Disgusting"</span>
            </div>
          </div>
          <button className="w-full mt-10 py-4 bg-ink-black text-white font-bold rounded-2xl border-[1.5px] border-ink-black neo-shadow neo-shadow-active flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">description</span> Full History Report
          </button>
        </div>
      </aside>
    </div>
  );
};

export default ContentModeration;
