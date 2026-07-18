import React, { useState, useEffect } from 'react';

const GuidedMeditation = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + 0.5;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex-1 pb-24">
      <style>{`
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1);
        }
        .neo-shadow-active {
            box-shadow: 0px 0px 0px 0px rgba(26, 26, 26, 1);
            transform: translate(2px, 2px);
        }
        .neo-border {
            border: 1.5px solid #1A1A1A;
        }
        .neo-border-dashed {
            border: 1.5px dashed #1A1A1A;
        }
        .fill-icon {
            font-variation-settings: 'FILL' 1;
        }
      `}</style>

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-on-surface-variant font-label-md text-sm md:text-base">Meditations</span>
        <span className="material-symbols-outlined text-on-surface-variant text-sm">chevron_right</span>
        <span className="text-primary font-bold font-label-md text-sm md:text-base">Guided Session: Self-Compassion</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Immersive Audio Player Module (8/12) */}
        <section className="lg:col-span-8 space-y-6">
          {/* Audio Canvas Card */}
          <div className="relative bg-white neo-border rounded-[48px] overflow-hidden p-6 md:p-10 aspect-square md:aspect-video flex flex-col justify-between min-h-[400px]">
            {/* Background Decorative Element */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent-pink rounded-full opacity-20 blur-3xl"></div>
            
            {/* Illustration Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 h-full">
              <div className="w-48 h-48 md:w-64 md:h-64 neo-border rounded-[40px] overflow-hidden bg-accent-orange neo-shadow shrink-0">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Illustration" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyfhUDf4C2wg8nyrYecrSrU7TilZZFdfGNLEMUrFUajN6eLmzi4uNqxKnHxob50ZTxZCA6WBTGoJueeIAbF66Q21zZlqOmHlRDZt8uBocs109p-1nXUR7GlWOrKhRP7I4k3bVrj_oABTVBDSGNukVfVjfW_IY9CTr4-uYvqqFyWCbHlELiIbSD6Hw3LvoBk5jjUhda_PQeGIsk8TRmdsq5QH5EJ1HZ185-Q-wKdTsAf24TbVwCYKyRNA" 
                />
              </div>
              <div className="text-center md:text-left space-y-3 max-w-md">
                <h1 className="font-display-lg text-3xl md:text-5xl text-ink-black">Self-Compassion</h1>
                <p className="font-body-lg text-on-surface-variant">Guided by Dr. Sarah Chen • 12 Minutes</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-accent-sage neo-border rounded-full font-label-bold text-sm">Mindfulness</span>
                  <span className="px-3 py-1 bg-accent-pink neo-border rounded-full font-label-bold text-sm">Healing</span>
                </div>
              </div>
            </div>

            {/* Player Controls Bar */}
            <div className="relative z-10 w-full mt-auto space-y-3 pt-6">
              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between font-label-bold text-on-surface-variant text-sm">
                  <span>{Math.floor(12 * (progress/100)).toString().padStart(2, '0')}:{Math.floor(60 * ((12 * (progress/100)) % 1)).toString().padStart(2, '0')}</span>
                  <span>12:00</span>
                </div>
                <div className="w-full h-4 bg-surface-container neo-border rounded-full overflow-hidden relative">
                  <div className="h-full bg-secondary-container transition-all duration-300" style={{width: \`\${progress}%\`}}></div>
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white neo-border rounded-full shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] cursor-pointer hover:scale-110 transition-transform"
                    style={{left: \`calc(\${progress}% - 12px)\`}}
                  ></div>
                </div>
              </div>
              
              {/* Controls Cluster */}
              <div className="flex items-center justify-center gap-4 md:gap-6 pt-2">
                <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-ink-black text-2xl md:text-3xl">shuffle</span>
                </button>
                <button className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white neo-border rounded-2xl neo-shadow hover:-translate-y-1 transition-transform">
                  <span className="material-symbols-outlined text-ink-black text-2xl md:text-3xl">skip_previous</span>
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={\`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center neo-border rounded-[28px] neo-shadow hover:-translate-y-1 transition-transform \${isPlaying ? 'bg-primary text-white' : 'bg-white text-ink-black'}\`}
                >
                  <span className="material-symbols-outlined text-4xl md:text-5xl">{isPlaying ? 'pause' : 'play_arrow'}</span>
                </button>
                <button className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white neo-border rounded-2xl neo-shadow hover:-translate-y-1 transition-transform">
                  <span className="material-symbols-outlined text-ink-black text-2xl md:text-3xl">skip_next</span>
                </button>
                <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-ink-black text-2xl md:text-3xl">repeat</span>
                </button>
              </div>
            </div>
          </div>

          {/* Volume & Audio Settings */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white neo-border rounded-3xl p-6 md:px-10">
            <div className="flex items-center gap-4 w-full md:max-w-xs">
              <span className="material-symbols-outlined text-on-surface-variant">volume_up</span>
              <div className="flex-1 h-2 bg-surface-container neo-border rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[70%]"></div>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-surface-container rounded-xl transition-colors font-label-bold text-sm">
                <span className="material-symbols-outlined">timer</span>
                Sleep Timer
              </button>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-surface-container rounded-xl transition-colors font-label-bold text-sm">
                <span className="material-symbols-outlined">equalizer</span>
                Audio Settings
              </button>
            </div>
          </div>
        </section>

        {/* Right: Sidebar Modules (4/12) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Meditative Path Module */}
          <div className="bg-accent-sage neo-border rounded-[40px] p-6 md:p-8 neo-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white neo-border rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">timeline</span>
              </div>
              <h2 className="font-headline-sm text-2xl text-ink-black">Meditative Path</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 relative">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center neo-border text-sm font-bold z-10">1</div>
                  <div className="w-0.5 h-full bg-ink-black absolute top-8"></div>
                </div>
                <div className="pb-2">
                  <h3 className="font-label-bold text-ink-black text-base">Arriving in the Moment</h3>
                  <p className="font-body-md text-on-surface-variant text-sm mt-1">Focus on your natural breath and settle into your space.</p>
                </div>
              </div>
              
              <div className="flex gap-4 relative">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-secondary-container text-ink-black flex items-center justify-center neo-border text-sm font-bold z-10">2</div>
                  <div className="w-0.5 h-full bg-ink-black absolute top-8"></div>
                </div>
                <div className="pb-2">
                  <h3 className="font-label-bold text-ink-black text-base">Acknowledge Your Pain</h3>
                  <p className="font-body-md text-on-surface-variant text-sm mt-1">Identifying areas of tension without judgment or fear.</p>
                </div>
              </div>
              
              <div className="flex gap-4 relative">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-white text-on-surface-variant flex items-center justify-center neo-border text-sm font-bold z-10">3</div>
                </div>
                <div>
                  <h3 className="font-label-bold text-on-surface-variant text-base">Universal Kindness</h3>
                  <p className="font-body-md text-on-surface-variant text-sm mt-1">Sending warmth to yourself and others experiencing the same.</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-8 py-4 bg-white neo-border rounded-2xl neo-shadow font-label-bold hover:-translate-y-1 transition-transform">
              View Full Journey
            </button>
          </div>
          
          {/* Reflection Tips Module */}
          <div className="bg-white neo-border rounded-[40px] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent-pink neo-border rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary">lightbulb</span>
              </div>
              <h2 className="font-headline-sm text-2xl text-ink-black">Reflection Tips</h2>
            </div>
            
            <ul className="space-y-4">
              <li className="p-4 bg-surface-container-low rounded-2xl neo-border-dashed flex gap-3">
                <span className="material-symbols-outlined text-primary shrink-0">check_circle</span>
                <p className="font-body-md text-sm">Practice this session once a day for 5 days to see lasting calm.</p>
              </li>
              <li className="p-4 bg-surface-container-low rounded-2xl neo-border-dashed flex gap-3">
                <span className="material-symbols-outlined text-primary shrink-0">check_circle</span>
                <p className="font-body-md text-sm">Try journaling for 2 minutes immediately after finishing.</p>
              </li>
            </ul>
            
            <div className="mt-6 pt-6 border-t-[1.5px] border-ink-black">
              <p className="font-label-bold text-on-surface-variant mb-2">Up Next</p>
              <div className="flex items-center gap-3 p-3 hover:bg-surface-container rounded-xl transition-colors cursor-pointer group border-[1.5px] border-transparent hover:border-ink-black">
                <div className="w-12 h-12 bg-accent-orange neo-border rounded-lg shrink-0 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Next" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuASPHO2bLxM7KSpBaWklNmlXx6-9TfAMUz_dHDBU7j6m1TysKAP3EUhiXG94132cMREO9TOcZdMWzoLOztKhetFF1gGYG7Lao5lPuIhXDNYq43lsqQ5ULsn02Bh5sYprZtDgUIK-2PjIXcJ9eWzPs4tbIMKbq2eknxDl9yyZXTdMLVHdY7FEJcaZFSO0Dw0_aIwZLzWrLaLOq70f62A1ktvV3ICVbdhgu3HDTInAmEWmr03iFDShar7Lw" 
                  />
                </div>
                <div className="flex-1">
                  <p className="font-label-bold text-ink-black group-hover:text-primary transition-colors">Morning Affirmations</p>
                  <p className="font-label-md text-on-surface-variant text-xs">5 min • Dr. Sarah Chen</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">play_circle</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default GuidedMeditation;
