import React from 'react';

const MyRecords = () => {
  return (
    <div className="flex-1 overflow-y-auto p-margin-desktop bg-background flex flex-col lg:flex-row gap-gutter h-full">
      <style>{`
        .memphis-border { border: 1.5px solid #1A1A1A; }
        .memphis-shadow { box-shadow: 4px 4px 0px 0px #1A1A1A; }
        .memphis-shadow-hover:hover { box-shadow: 0px 0px 0px 0px #1A1A1A; transform: translate(2px, 2px); }
        
        .timeline-line::before {
            content: '';
            position: absolute;
            left: 20px;
            top: 40px;
            bottom: 0;
            width: 2px;
            background-color: #1A1A1A;
            z-index: 0;
        }
      `}</style>

      {/* Timeline Column */}
      <div className="flex-1 max-w-3xl">
        <header className="mb-stack-lg">
          <h1 className="font-display-lg text-display-lg text-on-background mb-4">Your Journey</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">Track your progress, review past sessions, and celebrate your mental health milestones.</p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-stack-md">
          <button className="bg-primary text-on-primary font-label-bold text-label-bold px-6 py-3 rounded-full memphis-border memphis-shadow memphis-shadow-hover transition-all">All Activity</button>
          <button className="bg-accent-sage text-on-background font-label-bold text-label-bold px-6 py-3 rounded-full memphis-border transition-all hover:bg-surface-variant">Moods</button>
          <button className="bg-accent-pink text-on-background font-label-bold text-label-bold px-6 py-3 rounded-full memphis-border transition-all hover:bg-surface-variant">Sessions</button>
          <button className="bg-accent-orange text-on-background font-label-bold text-label-bold px-6 py-3 rounded-full memphis-border transition-all hover:bg-surface-variant">Exercises</button>
        </div>

        {/* Timeline Container */}
        <div className="relative timeline-line pl-12">
          {/* Timeline Item 1 */}
          <div className="relative mb-stack-md">
            <div className="absolute -left-12 top-6 w-10 h-10 bg-secondary-container memphis-border rounded-full flex items-center justify-center z-10">
              <span className="material-symbols-outlined text-on-background">mood</span>
            </div>
            <div className="bg-surface-container-lowest p-container-padding rounded-[24px] memphis-border hover:-translate-y-1 transition-transform duration-200">
              <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
                <span className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">Today, 2:30 PM</span>
                <span className="bg-accent-sage px-3 py-1 rounded-full memphis-border font-label-md text-label-md text-on-background">Mood</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">Logged Mood: Happy</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">"Feeling really energized after the morning walk. The sun was out and it made a huge difference."</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-surface-variant px-3 py-1 rounded-full border border-outline-variant font-label-md text-label-md">#energy</span>
                <span className="bg-surface-variant px-3 py-1 rounded-full border border-outline-variant font-label-md text-label-md">#sunshine</span>
              </div>
            </div>
          </div>

          {/* Timeline Item 2 */}
          <div className="relative mb-stack-md">
            <div className="absolute -left-12 top-6 w-10 h-10 bg-primary-fixed memphis-border rounded-full flex items-center justify-center z-10">
              <span className="material-symbols-outlined text-primary">air</span>
            </div>
            <div className="bg-surface-container-lowest p-container-padding rounded-[24px] memphis-border hover:-translate-y-1 transition-transform duration-200">
              <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
                <span className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">Yesterday, 8:00 PM</span>
                <span className="bg-primary-fixed px-3 py-1 rounded-full memphis-border font-label-md text-label-md text-on-background">Exercise</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">Completed Breathing Exercise</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Completed the 10-minute 'Box Breathing' routine before bed to wind down.</p>
            </div>
          </div>

          {/* Timeline Item 3 */}
          <div className="relative mb-stack-md">
            <div className="absolute -left-12 top-6 w-10 h-10 bg-accent-pink memphis-border rounded-full flex items-center justify-center z-10">
              <span className="material-symbols-outlined text-on-background">calendar_month</span>
            </div>
            <div className="bg-accent-pink p-container-padding rounded-[24px] memphis-border hover:-translate-y-1 transition-transform duration-200">
              <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
                <span className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">Oct 12, 10:00 AM</span>
                <span className="bg-surface-container-lowest px-3 py-1 rounded-full memphis-border font-label-md text-label-md text-on-background">Session</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">Appointment with Dr. Smith</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">Discussed anxiety triggers and set goals for the upcoming week regarding mindfulness.</p>
              <button className="bg-surface-container-lowest text-on-background font-label-bold text-label-bold px-6 py-2 rounded-full memphis-border memphis-shadow memphis-shadow-hover transition-all mt-4">View Notes</button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center pb-8">
          <button className="text-primary font-label-bold text-label-bold hover:underline">Load Older Activity</button>
        </div>
      </div>

      {/* Stats Sidebar */}
      <aside className="w-full lg:w-[320px] flex flex-col gap-stack-md">
        {/* Streak Card */}
        <div className="bg-secondary-container p-6 rounded-[24px] memphis-border memphis-shadow">
          <h3 className="font-headline-sm text-headline-sm mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined">local_fire_department</span>
            Current Streak
          </h3>
          <div className="text-display-lg font-display-lg mb-1">14 Days</div>
          <p className="font-body-md text-body-md text-on-secondary-container">You've logged an activity every day for two weeks. Keep it up!</p>
        </div>

        {/* Mood Chart Placeholder Card */}
        <div className="bg-surface-container-lowest p-6 rounded-[24px] memphis-border">
          <h3 className="font-headline-sm text-headline-sm mb-4">Mood Trends</h3>
          <div className="h-48 bg-surface-variant rounded-lg border border-outline-variant relative overflow-hidden flex items-end p-2 gap-2">
            {/* Simple CSS Bar Chart */}
            <div className="w-full bg-accent-sage rounded-t-sm h-[40%] memphis-border"></div>
            <div className="w-full bg-accent-orange rounded-t-sm h-[60%] memphis-border"></div>
            <div className="w-full bg-secondary-container rounded-t-sm h-[80%] memphis-border"></div>
            <div className="w-full bg-secondary-container rounded-t-sm h-[70%] memphis-border"></div>
            <div className="w-full bg-accent-sage rounded-t-sm h-[50%] memphis-border"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[90%] memphis-border"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[100%] memphis-border"></div>
          </div>
          <div className="flex justify-between mt-2 font-label-md text-label-md text-on-surface-variant">
            <span>Mon</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Weekly Goal Card */}
        <div className="bg-surface-container-lowest p-6 rounded-[24px] memphis-border">
          <h3 className="font-headline-sm text-headline-sm mb-4">Weekly Goals</h3>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between font-label-md text-label-md mb-2">
                <span>Breathing Exercises</span>
                <span>2/3</span>
              </div>
              <div className="h-3 w-full bg-surface-variant rounded-full overflow-hidden memphis-border">
                <div className="h-full bg-primary w-[66%] border-r-[1.5px] border-ink-black"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-label-md text-label-md mb-2">
                <span>Mood Logs</span>
                <span>5/7</span>
              </div>
              <div className="h-3 w-full bg-surface-variant rounded-full overflow-hidden memphis-border">
                <div className="h-full bg-accent-orange w-[71%] border-r-[1.5px] border-ink-black"></div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MyRecords;
