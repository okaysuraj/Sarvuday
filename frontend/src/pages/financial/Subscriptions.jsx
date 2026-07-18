import React from 'react';

const Subscriptions = () => {
  return (
    <div className="flex-1 pb-24">
      <style>{`
        .neo-memphis-card {
            border: 1.5px solid #1A1A1A;
            box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
            transition: all 0.2s ease;
        }
        .neo-memphis-card:hover {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
        }
        .neo-memphis-button {
            border: 1.5px solid #1A1A1A;
            box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
            transition: all 0.1s ease;
        }
        .neo-memphis-button:active {
            transform: translate(4px, 4px);
            box-shadow: 0px 0px 0px 0px rgba(0,0,0,1);
        }
      `}</style>

      {/* Header Section */}
      <header className="mb-12 max-w-4xl mx-auto text-center">
        <h1 className="font-display-lg text-4xl md:text-display-lg text-ink-black mb-4">Choose Your Path to Peace</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Invest in your mental well-being with flexible plans designed for every stage of your journey.</p>
      </header>

      {/* Pricing Tier Bento Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 px-4 md:px-0">
        
        {/* Standard Plan */}
        <div className="bg-surface-bright rounded-[32px] p-8 neo-memphis-card flex flex-col">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 rounded-full border border-ink-black bg-accent-sage font-label-bold text-label-bold mb-4">Foundation</span>
            <h2 className="font-headline-md text-3xl md:text-headline-md text-ink-black mb-2">Standard</h2>
            <div className="flex items-baseline gap-1">
              <span className="font-display-lg text-4xl md:text-display-lg">$0</span>
              <span className="font-body-md text-body-md text-on-surface-variant">/forever</span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-1">Access to essential community support and basic tools to start your journey.</p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              <span className="font-body-md text-body-md">Public Community Forums</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              <span className="font-body-md text-body-md">Daily Mood Tracker</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              <span className="font-body-md text-body-md">Basic Resource Library</span>
            </li>
          </ul>
          <button className="w-full bg-surface text-ink-black py-4 rounded-full font-label-bold text-label-bold neo-memphis-button">Get Started</button>
        </div>

        {/* Professional Plan (Highlighted) */}
        <div className="bg-accent-pink rounded-[40px] p-8 neo-memphis-card flex flex-col relative transform md:-translate-y-4 mt-8 md:mt-0">
          <div className="absolute -top-4 right-8 bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full border-[1.5px] border-ink-black font-label-bold text-label-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Most Popular</div>
          <div className="mb-6 mt-4 md:mt-0">
            <span className="inline-block px-4 py-1 rounded-full border border-ink-black bg-surface font-label-bold text-label-bold mb-4">Growth</span>
            <h2 className="font-headline-md text-3xl md:text-headline-md text-ink-black mb-2">Professional</h2>
            <div className="flex items-baseline gap-1">
              <span className="font-display-lg text-4xl md:text-display-lg">$19</span>
              <span className="font-body-md text-body-md text-on-surface-variant">/month</span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-1">Enhanced privacy, guided support, and deeper insights into your mental health.</p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-ink-black" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              <span className="font-body-md text-body-md font-bold">Everything in Standard</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-ink-black" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              <span className="font-body-md text-body-md">Private Support Groups</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-ink-black" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              <span className="font-body-md text-body-md">Anonymous Posting</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-ink-black" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              <span className="font-body-md text-body-md">Weekly Expert Seminars</span>
            </li>
          </ul>
          <button className="w-full bg-primary text-on-primary py-4 rounded-full font-label-bold text-label-bold neo-memphis-button">Upgrade Now</button>
        </div>

        {/* Ultimate Plan */}
        <div className="bg-surface-bright rounded-[32px] p-8 neo-memphis-card flex flex-col">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 rounded-full border border-ink-black bg-secondary-fixed font-label-bold text-label-bold mb-4">Complete Care</span>
            <h2 className="font-headline-md text-3xl md:text-headline-md text-ink-black mb-2">Ultimate</h2>
            <div className="flex items-baseline gap-1">
              <span className="font-display-lg text-4xl md:text-display-lg">$49</span>
              <span className="font-body-md text-body-md text-on-surface-variant">/month</span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-1">1-on-1 counseling access and premium therapeutic tools for comprehensive support.</p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              <span className="font-body-md text-body-md font-bold">Everything in Pro</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              <span className="font-body-md text-body-md">Monthly 1:1 Therapy Session</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              <span className="font-body-md text-body-md">Direct Messaging with Experts</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              <span className="font-body-md text-body-md">Custom Care Plan</span>
            </li>
          </ul>
          <button className="w-full bg-surface text-ink-black py-4 rounded-full font-label-bold text-label-bold neo-memphis-button">Get Ultimate</button>
        </div>

      </div>

      {/* Why Choose Section */}
      <section className="max-w-4xl mx-auto bg-surface-container-high rounded-[48px] p-6 md:p-10 border-[1.5px] border-ink-black mb-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-orange rounded-full border-[1.5px] border-ink-black opacity-50 blur-sm"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary-fixed rounded-lg border-[1.5px] border-ink-black rotate-12 opacity-50 blur-sm"></div>
        
        <div className="relative z-10 text-center mb-10">
          <h2 className="font-display-lg text-3xl md:text-display-lg text-ink-black mb-4">Why choose SerenityPath?</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">We believe mental health support should be accessible, stigma-free, and effective.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-accent-sage border-[1.5px] border-ink-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="material-symbols-outlined text-ink-black">verified_user</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-xl md:text-headline-sm text-ink-black mb-2">Safe & Anonymous</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Share your story without fear. Our platform prioritizes your privacy and emotional safety above all.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed border-[1.5px] border-ink-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="material-symbols-outlined text-ink-black">favorite</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-xl md:text-headline-sm text-ink-black mb-2">Community Driven</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Find solace in shared experiences. Connect with others who truly understand what you're going through.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Subscriptions;
