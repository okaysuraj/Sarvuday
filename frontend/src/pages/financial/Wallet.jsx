import React from 'react';

const Wallet = () => {
  return (
    <div className="flex-1 pb-24">
      <style>{`
        .sticker-card {
            border: 1.5px solid #1A1A1A;
            border-radius: 32px;
            padding: 32px;
            background-color: #fbf8ff;
        }
        
        .btn-primary {
            background-color: #002da5;
            color: #ffffff;
            border: 1.5px solid #1A1A1A;
            box-shadow: 4px 4px 0px 0px #1A1A1A;
            transition: all 0.2s ease;
        }
        
        .btn-primary:active, .btn-primary:hover {
            box-shadow: 0px 0px 0px 0px #1A1A1A;
            transform: translate(2px, 2px);
        }

        .btn-secondary {
            background-color: #fdd33f;
            color: #715b00;
            border: 1.5px solid #1A1A1A;
            box-shadow: 4px 4px 0px 0px #1A1A1A;
            transition: all 0.2s ease;
        }

        .btn-secondary:active, .btn-secondary:hover {
            box-shadow: 0px 0px 0px 0px #1A1A1A;
            transform: translate(2px, 2px);
        }
        
        .hard-shadow {
            box-shadow: 4px 4px 0px 0px #1A1A1A;
        }
      `}</style>

      {/* Header area for desktop canvas */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h2 className="font-display-lg text-4xl md:text-display-lg text-ink-black">Wallet</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Manage your funds and rewards securely.</p>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Main Balance Card (Spans full width on mobile, 8 cols on desktop) */}
        <div className="md:col-span-8 sticker-card bg-primary text-on-primary flex flex-col justify-between relative overflow-hidden min-h-[300px]">
          {/* Decorative element */}
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-primary-container rounded-full opacity-50 blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <p className="font-label-md text-label-md text-inverse-primary mb-2 uppercase tracking-widest">Total Balance</p>
            <h3 className="font-display-lg text-4xl md:text-display-lg leading-none">$4,250.00</h3>
          </div>
          
          <div className="relative z-10 flex flex-wrap gap-4 mt-12">
            <button className="btn-secondary py-3 px-6 rounded-xl font-label-bold text-label-bold flex items-center gap-2">
              <span className="material-symbols-outlined">add</span>
              Add Money
            </button>
            <button className="bg-surface-bright text-ink-black border-[1.5px] border-ink-black py-3 px-6 rounded-xl font-label-bold text-label-bold hard-shadow flex items-center gap-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
              <span className="material-symbols-outlined">arrow_downward</span>
              Withdraw
            </button>
          </div>
        </div>

        {/* Savings & Rewards Column (Spans 4 cols on desktop) */}
        <div className="md:col-span-4 flex flex-col gap-8">
          
          {/* Savings Card */}
          <div className="sticker-card bg-accent-sage flex-1 flex flex-col justify-center p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-surface-bright border-[1.5px] border-ink-black flex items-center justify-center">
                <span className="material-symbols-outlined text-ink-black">savings</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-ink-black">Vault</h4>
            </div>
            <p className="font-headline-md text-headline-md text-ink-black">$1,120.50</p>
            <div className="mt-4 w-full h-3 bg-surface-bright border-[1px] border-ink-black rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[65%] border-r-[1px] border-ink-black"></div>
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant mt-2 text-right">Goal: $2000</p>
          </div>

          {/* Rewards Card */}
          <div className="sticker-card bg-accent-orange flex-1 flex flex-col justify-center p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-surface-bright border-[1.5px] border-ink-black flex items-center justify-center">
                <span className="material-symbols-outlined text-ink-black">toll</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-ink-black">Points</h4>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="font-headline-md text-headline-md text-ink-black">12,450</p>
              <span className="font-label-bold text-label-bold text-error">pts</span>
            </div>
            <button className="mt-4 bg-surface-bright text-ink-black border-[1.5px] border-ink-black py-2 px-4 rounded-xl font-label-bold text-label-bold hard-shadow text-sm w-fit hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
              Redeem
            </button>
          </div>

        </div>

        {/* Recent Transactions (Full width below) */}
        <div className="col-span-1 md:col-span-12 sticker-card mt-6 p-6 md:p-8">
          <div className="flex justify-between items-end mb-6 pb-4 border-b-[1.5px] border-ink-black">
            <h3 className="font-headline-md text-2xl md:text-headline-md text-ink-black">Recent Activity</h3>
            <button className="font-label-bold text-label-bold text-primary hover:underline">View All</button>
          </div>
          
          <div className="flex flex-col gap-4">
            {/* Tx Item 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border-[1px] border-transparent hover:border-ink-black hover:bg-surface-container-low transition-all group gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-pink border-[1.5px] border-ink-black flex items-center justify-center group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <span className="material-symbols-outlined text-ink-black">shopping_cart</span>
                </div>
                <div>
                  <p className="font-label-bold text-label-bold text-ink-black text-lg">Therapy Session</p>
                  <p className="font-label-md text-label-md text-on-surface-variant">Today, 2:30 PM</p>
                </div>
              </div>
              <p className="font-headline-sm text-headline-sm text-ink-black sm:text-right">-$120.00</p>
            </div>
            
            {/* Tx Item 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border-[1px] border-transparent hover:border-ink-black hover:bg-surface-container-low transition-all group gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-sage border-[1.5px] border-ink-black flex items-center justify-center group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <span className="material-symbols-outlined text-ink-black">download</span>
                </div>
                <div>
                  <p className="font-label-bold text-label-bold text-ink-black text-lg">Top Up</p>
                  <p className="font-label-md text-label-md text-on-surface-variant">Yesterday, 9:00 AM</p>
                </div>
              </div>
              <p className="font-headline-sm text-headline-sm text-secondary sm:text-right">+ $500.00</p>
            </div>
            
            {/* Tx Item 3 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border-[1px] border-transparent hover:border-ink-black hover:bg-surface-container-low transition-all group gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-variant border-[1.5px] border-ink-black flex items-center justify-center group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <span className="material-symbols-outlined text-ink-black">subscriptions</span>
                </div>
                <div>
                  <p className="font-label-bold text-label-bold text-ink-black text-lg">Premium Subscription</p>
                  <p className="font-label-md text-label-md text-on-surface-variant">Oct 24, 2023</p>
                </div>
              </div>
              <p className="font-headline-sm text-headline-sm text-ink-black sm:text-right">-$14.99</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Wallet;
