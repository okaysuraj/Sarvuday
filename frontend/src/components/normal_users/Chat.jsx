import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] -m-8">
      <style>{`
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1);
        }
        .neo-shadow-sm {
            box-shadow: 2px 2px 0px 0px rgba(26, 26, 26, 1);
        }
        .neo-shadow-active:active {
            box-shadow: 0px 0px 0px 0px rgba(26, 26, 26, 1);
            transform: translate(2px, 2px);
        }
        .chat-scroll::-webkit-scrollbar {
            width: 8px;
        }
        .chat-scroll::-webkit-scrollbar-track {
            background: transparent;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
            background: #434655;
            border-radius: 10px;
            border: 2px solid #fbf8ff;
        }
      `}</style>
      
      {/* TopNavBar (Mobile Header if no sidebar, but we keep the chat header) */}
      <div className="flex h-full overflow-hidden w-full">
        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col bg-background relative overflow-hidden">
          {/* Chat Header */}
          <div className="h-20 border-b-[1.5px] border-ink-black flex items-center px-8 bg-surface-container shrink-0">
            <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-surface-container-high rounded-full transition-colors lg:hidden">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl border-[1.5px] border-ink-black bg-accent-pink overflow-hidden">
                  <img alt="Therapist" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCECgf632V1LB7h5KcVImix7Hd302P7xmbnabAijJ38yLb0GCO9QCju4ge0S9t2RvHymKFHzmCrgB65IRYXVstbn3zkiGe9YWVbdk9l1gVXzL5t2EPL-0DXbsHbwy1q2y9xJB1MAbRXOjTgwaqLi6Nkbbz4ZwdXkTa6P7DeW9XWYj3opK05C8InuGPpr7daonuqbJOokjEUuxettJEeao1BsZ8YI1z3SrAfHBfuW4e1qnZdLGuJa_g0lA"/>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary border-[1.5px] border-ink-black rounded-full"></div>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm leading-tight text-ink-black">Dr. Sarah Jenkins</h2>
                <p className="text-on-surface-variant text-label-md">Licensed Clinical Psychologist • Online</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <button className="p-2 border-[1.5px] border-ink-black rounded-xl hover:bg-surface-container-high neo-shadow-sm neo-shadow-active transition-all hidden sm:block">
                <span className="material-symbols-outlined">videocam</span>
              </button>
              <button className="p-2 border-[1.5px] border-ink-black rounded-xl hover:bg-surface-container-high neo-shadow-sm neo-shadow-active transition-all hidden sm:block">
                <span className="material-symbols-outlined">call</span>
              </button>
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors lg:hidden">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>

          {/* Chat Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-8 chat-scroll flex flex-col gap-6">
            {/* Date Divider */}
            <div className="flex justify-center items-center my-4">
              <span className="px-4 py-1 bg-surface-container-high border-[1px] border-ink-black rounded-full text-label-md font-label-bold">Today</span>
            </div>

            {/* Recipient Message */}
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black bg-accent-pink overflow-hidden shrink-0">
                <img alt="Recipient" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoP9dBMWBnQSgTZRqG-P3nwAdJcFOdjPVay8-H2e4QFUbIJLupd7XNrO33mvz5x0IbsBdjFsdjuFxFsQwrs2B_xEoDRKOxiWQ7TS5S9EEZcaEFZZQAn0gXDaX8vWOx43DRTtz4eEufDzsVQTr8Y7uDwOYnw5UdTdBjTvHhn0iYQAmMG1UnKtvsVTTasY1jfBscJW1bGpJmU00jIzpwj2ymK3kqHUp1yiFAhgLF0pWvVVO6Jo1FTCVPzQ"/>
              </div>
              <div className="bg-surface border-[1.5px] border-ink-black rounded-tr-3xl rounded-br-3xl rounded-bl-3xl p-6 neo-shadow">
                <p className="text-body-md text-ink-black">Good morning! How are you feeling after our session yesterday? I noticed we touched on some deeper topics regarding your work-life balance.</p>
                <span className="text-[10px] text-on-surface-variant mt-2 block font-label-bold">09:45 AM</span>
              </div>
            </div>

            {/* User Message */}
            <div className="flex gap-4 max-w-[80%] self-end flex-row-reverse">
              <div className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black bg-accent-sage overflow-hidden shrink-0">
                <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN7bMk5pAHb0-GRkqV5Nzq9uX5ankaFVfbKGZMWkl4q1YkliAkJlKa24e6QN7mdVkOU0hkQddZngyBHtr3waqRUi1kiiZH4CuVnrqpXqIGIlbwSluUaIIgArfQb4CVXKrmXDeXx0RXjTHxhZ3C8I9UWY2wME5tZl1mkK6flhmqI4bMSG7qwBJEFiNgwinM5eUf8-DVUSoAhplIE41G7R-ETtPDJFGWBU9sw9IHDSl2iINC-vMJPbFe_w"/>
              </div>
              <div className="bg-primary text-white border-[1.5px] border-ink-black rounded-tl-3xl rounded-bl-3xl rounded-br-3xl p-6 neo-shadow">
                <p className="text-body-md">Hey Dr. Sarah. Honestly, it was a bit overwhelming at first, but I feel lighter today. I started that breathing exercise you recommended whenever I felt my stress levels rising.</p>
                <span className="text-[10px] text-white opacity-80 mt-2 block font-label-bold">09:52 AM</span>
              </div>
            </div>

            {/* Recipient Message with Image Attachment */}
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black bg-accent-pink overflow-hidden shrink-0">
                <img alt="Recipient" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4bWLH2boMELdOK5hEG34kmlRm1YQRaE7U3fMxbkv48N88T_L3LqCpDOEwXwSLpPZm1m4gOpvSfpnORkOozmFrlpL0B1peqI4S5-G1ECB4sNmcUsOKQukFXkUGAyZahgDKTvWJsYQ-WgCy1cPaET5vUiOYl_nMiej06fx5SH0ob8-YK0L8CLLoAbP92cbl4OiNr9rzF4DdVjmu5wbFJz6Tj5r5eIac4UuYbciqx6b7UexK85LGrq7tCA"/>
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-surface border-[1.5px] border-ink-black rounded-tr-3xl rounded-br-3xl rounded-bl-3xl p-6 neo-shadow">
                  <p className="text-body-md text-ink-black">That's wonderful to hear! I've attached a simple visual guide for the 4-7-8 technique. You can keep this on your desktop as a reminder.</p>
                </div>
                <div className="w-64 aspect-square border-[1.5px] border-ink-black rounded-2xl overflow-hidden neo-shadow group cursor-pointer relative mt-2">
                  <img alt="Attachment" className="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF-NcvdhRKnuweLIXWEi56uY2Lpqe2DyFObK90Ba5xhSJ15IUGlMUKuQqvZkhZW98Ra4X7eim9Ft_h4KQyarcXEI4o4KPDojprZllLIvAYddsxmiKGoemxrmHyL0WezHJY9E5XCtmZKeKp0YmoRdRAD71n8fwuqFdzk7dlxXfT1rM-atcKJr1Cdavx5ZNfadEkf10L_m_O8rPDxUBo2UjvY79Sxkw0Zyo6M4e8ZUJagyEb92_hqWjXdA"/>
                  <div className="absolute inset-0 bg-ink-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-display-lg">download</span>
                  </div>
                </div>
                <span className="text-[10px] text-on-surface-variant mt-1 font-label-bold">10:05 AM</span>
              </div>
            </div>

            {/* User Message */}
            <div className="flex gap-4 max-w-[80%] self-end flex-row-reverse">
              <div className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black bg-accent-sage overflow-hidden shrink-0">
                <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRC_ruG3YDgJco2JDAIzx7SJU9_ISEmjIJNepsQOp2Xh-9MBhAvEVtWVJnvFoRl1KGHOMEEe0XI4qdp4tZrbqoPHZq63Phd7msmldvb74mhUvYRfc6Lslvuh9wo2A2QEoDcPwvU7hXeLUqRDxx9VlG0rEIU-1fuJsKrnqdvI8XlrBzj-TDTSfXkJMV6652dY2DFh9sMD19tc0O2FWFyqqZ5k6QM319-oHimT68Agd4TRiKCTaGTGUDMg"/>
              </div>
              <div className="bg-primary text-white border-[1.5px] border-ink-black rounded-tl-3xl rounded-bl-3xl rounded-br-3xl p-6 neo-shadow">
                <p className="text-body-md">This is perfect. I'm going to set it as my wallpaper. Thanks, Sarah!</p>
                <span className="text-[10px] text-white opacity-80 mt-2 block font-label-bold">10:12 AM</span>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-6 bg-surface-container border-t-[1.5px] border-ink-black">
            <div className="max-w-4xl mx-auto flex items-end gap-4">
              <button className="p-3 border-[1.5px] border-ink-black rounded-2xl bg-accent-orange neo-shadow-sm neo-shadow-active transition-all hidden sm:block">
                <span className="material-symbols-outlined">add</span>
              </button>
              <div className="flex-1 bg-white border-[1.5px] border-ink-black rounded-3xl px-6 py-3 min-h-[56px] flex items-center focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all">
                <textarea 
                  className="bg-transparent border-none focus:ring-0 text-body-md w-full resize-none h-8 chat-scroll placeholder:text-on-surface-variant outline-none" 
                  placeholder="Message Dr. Sarah..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button className="ml-2 material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors hidden sm:block">sentiment_satisfied</button>
              </div>
              <button className="p-3 bg-primary text-white border-[1.5px] border-ink-black rounded-2xl neo-shadow neo-shadow-active transition-all">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </main>

        {/* Right Column (Context & Insights) */}
        <aside className="hidden xl:flex flex-col w-80 bg-surface border-l-[1.5px] border-ink-black p-8 gap-8 overflow-y-auto chat-scroll shrink-0">
          {/* Mood Summary Section */}
          <section className="bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] p-6 neo-shadow">
            <h3 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2 text-ink-black">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mood</span>
              Mood Insight
            </h3>
            <div className="bg-white/50 border-[1.5px] border-ink-black rounded-2xl p-4 mb-4">
              <p className="text-label-md font-label-bold uppercase text-on-surface-variant mb-1">Weekly Trend</p>
              <div className="flex items-end gap-1 h-12">
                <div className="flex-1 bg-primary h-[60%] rounded-t-sm"></div>
                <div className="flex-1 bg-primary h-[40%] rounded-t-sm"></div>
                <div className="flex-1 bg-primary h-[55%] rounded-t-sm"></div>
                <div className="flex-1 bg-secondary-container h-[80%] rounded-t-sm"></div>
                <div className="flex-1 bg-secondary-container h-[90%] rounded-t-sm"></div>
              </div>
            </div>
            <p className="text-body-md leading-relaxed text-ink-black">You've been showing <strong>Steady Progress</strong>. Your average mood has improved by 15% this week.</p>
          </section>

          {/* Active Goals Section */}
          <section className="bg-secondary-container border-[1.5px] border-ink-black rounded-[32px] p-6 neo-shadow">
            <h3 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2 text-ink-black">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
              Active Goals
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-[1.5px] border-ink-black bg-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <span className="text-label-bold text-ink-black">Morning Meditation</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-[1.5px] border-ink-black bg-white/40 flex items-center justify-center"></div>
                <span className="text-label-bold text-ink-black">Digital Detox (2hrs)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-[1.5px] border-ink-black bg-white/40 flex items-center justify-center"></div>
                <span className="text-label-bold text-ink-black">Journal Entry</span>
              </li>
            </ul>
            <div className="mt-6 bg-white border-[1.5px] border-ink-black rounded-xl p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-label-bold uppercase text-ink-black">Daily Completion</span>
                <span className="text-[10px] font-label-bold text-ink-black">33%</span>
              </div>
              <div className="w-full h-3 bg-accent-sage border-[1.5px] border-ink-black rounded-full overflow-hidden">
                <div className="h-full bg-secondary-container w-1/3 border-r-[1.5px] border-ink-black"></div>
              </div>
            </div>
          </section>

          {/* Next Session Promo */}
          <section className="bg-accent-orange border-[1.5px] border-ink-black rounded-[32px] p-6 neo-shadow flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-headline-sm text-headline-sm mb-4 text-ink-black">Session Tip</h3>
              <p className="text-body-md italic mb-6 text-ink-black">"Take small breaks throughout the day to reset your focus. Even five minutes of standing and stretching can break the stress loop."</p>
            </div>
            <div>
              <div className="w-full aspect-[4/3] border-[1.5px] border-ink-black rounded-2xl overflow-hidden bg-white mb-4">
                <img alt="Tip Illustration" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYTINMwcFlBAuOkELqX3p6R6HRFb6lG3AU1yQ5FiQvBdxSqYt8AOLUcVKmVxHtAiuIDFUxYKgQdEwUq-RzbVZUUgeNctwF7e476Pq1kLBL93w5bAF79jkaMz8P5J1oW4Th9_EE-E2wgVYuAQL06NzthlZkIE_gY6w45yHEwAL6xOwf5EQvTqvdsGBV6FBUiBBuOmBMz2RUbBtEaWiIQglch1tb9-oN2wIJLiqt6bs-p7l212qTx0WcvA"/>
              </div>
              <button className="w-full bg-ink-black text-white py-3 rounded-xl text-label-bold hover:bg-on-surface-variant transition-colors">
                Explore Exercises
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Chat;
