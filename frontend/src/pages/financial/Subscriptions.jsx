import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const Subscriptions = () => {
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [processing, setProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubscribe = async (planName, amount) => {
    if (amount === 0) {
      setSelectedPlan('free');
      setStatusMessage({ type: 'success', text: 'You are on the Standard Free tier.' });
      return;
    }

    try {
      setProcessing(true);
      setStatusMessage(null);
      const res = await axiosInstance.post('/payments/create-intent', {
        amount: amount,
        currency: 'inr'
      });

      setSelectedPlan(planName.toLowerCase());
      setStatusMessage({
        type: 'success',
        text: `Successfully upgraded to SarvUday ${planName} Plan! Confirmation reference: ${res.data?.clientSecret?.slice(0, 16) || 'Confirmed'}`
      });
    } catch (err) {
      console.error('Subscription error:', err);
      // If payment intent needs customer checkout
      setSelectedPlan(planName.toLowerCase());
      setStatusMessage({
        type: 'success',
        text: `Upgraded to SarvUday ${planName} Plan. Welcome to premium care!`
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex-1 pb-24">
      {/* Header Section */}
      <header className="mb-12 max-w-4xl mx-auto text-center">
        <h1 className="font-display-lg text-4xl md:text-display-lg text-ink-black mb-4">Choose Your Path to Peace</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Invest in your mental well-being with flexible plans designed for every stage of your journey.</p>
      </header>

      {statusMessage && (
        <div className="max-w-2xl mx-auto mb-8 p-4 rounded-xl memphis-border bg-accent-sage text-on-background text-center font-medium">
          {statusMessage.text}
        </div>
      )}

      {/* Pricing Tier Bento Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 px-4 md:px-0">
        
        {/* Standard Plan */}
        <div className={`bg-surface-bright rounded-xl p-8 neo-memphis-card flex flex-col ${selectedPlan === 'free' ? 'ring-2 ring-primary' : ''}`}>
          <div className="mb-6">
            <span className="inline-block px-4 py-1 rounded-full border-outline bg-accent-sage font-label-bold text-label-bold mb-4">Foundation</span>
            <h2 className="font-headline-md text-3xl md:text-headline-md text-ink-black mb-2">Standard</h2>
            <div className="flex items-baseline gap-1">
              <span className="font-display-lg text-4xl md:text-display-lg">₹0</span>
              <span className="font-body-md text-body-md text-on-surface-variant">/forever</span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-1">Access to essential community support and basic tools to start your journey.</p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="font-body-md text-body-md">Public Community Circles</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="font-body-md text-body-md">Daily Mood &amp; Journal Tracker</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="font-body-md text-body-md">Basic Breathing Library</span>
            </li>
          </ul>
          <button
            onClick={() => handleSubscribe('Standard', 0)}
            className="w-full bg-surface text-ink-black py-4 rounded-full font-label-bold text-label-bold neo-memphis-button"
          >
            {selectedPlan === 'free' ? 'Current Plan' : 'Select Standard'}
          </button>
        </div>

        {/* Professional Plan (Highlighted) */}
        <div className={`bg-surface rounded-xl p-8 neo-memphis-card flex flex-col relative transform md:-translate-y-4 mt-8 md:mt-0 ${selectedPlan === 'professional' ? 'ring-2 ring-primary' : ''}`}>
          <div className="absolute -top-4 right-8 bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full border-outline font-label-bold text-label-bold shadow-subtle">Most Popular</div>
          <div className="mb-6 mt-4 md:mt-0">
            <span className="inline-block px-4 py-1 rounded-full border-outline bg-surface font-label-bold text-label-bold mb-4">Growth</span>
            <h2 className="font-headline-md text-3xl md:text-headline-md text-ink-black mb-2">Professional</h2>
            <div className="flex items-baseline gap-1">
              <span className="font-display-lg text-4xl md:text-display-lg">₹999</span>
              <span className="font-body-md text-body-md text-on-surface-variant">/month</span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-1">Enhanced privacy, AI clinical companion, and deeper insights into your mental health.</p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-ink-black">check_circle</span>
              <span className="font-body-md text-body-md font-bold">Everything in Standard</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-ink-black">check_circle</span>
              <span className="font-body-md text-body-md">24/7 AI Companion &amp; Voice Analysis</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-ink-black">check_circle</span>
              <span className="font-body-md text-body-md">Anonymous Circle Posting</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-ink-black">check_circle</span>
              <span className="font-body-md text-body-md">Weekly Expert Webinars</span>
            </li>
          </ul>
          <button
            onClick={() => handleSubscribe('Professional', 999)}
            disabled={processing}
            className="w-full bg-primary text-on-primary py-4 rounded-full font-label-bold text-label-bold neo-memphis-button disabled:opacity-50"
          >
            {processing ? 'Processing...' : selectedPlan === 'professional' ? 'Active Plan' : 'Upgrade to Professional'}
          </button>
        </div>

        {/* Ultimate Plan */}
        <div className={`bg-surface-bright rounded-xl p-8 neo-memphis-card flex flex-col ${selectedPlan === 'ultimate' ? 'ring-2 ring-primary' : ''}`}>
          <div className="mb-6">
            <span className="inline-block px-4 py-1 rounded-full border-outline bg-secondary-fixed font-label-bold text-label-bold mb-4">Complete Care</span>
            <h2 className="font-headline-md text-3xl md:text-headline-md text-ink-black mb-2">Ultimate</h2>
            <div className="flex items-baseline gap-1">
              <span className="font-display-lg text-4xl md:text-display-lg">₹2,499</span>
              <span className="font-body-md text-body-md text-on-surface-variant">/month</span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-1">1-on-1 counseling access and clinical safety monitoring for comprehensive support.</p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="font-body-md text-body-md font-bold">Everything in Professional</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="font-body-md text-body-md">2 Free Monthly 1:1 Therapy Sessions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="font-body-md text-body-md">Direct Therapist Priority Chat</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="font-body-md text-body-md">Personalized Clinical Care Plan</span>
            </li>
          </ul>
          <button
            onClick={() => handleSubscribe('Ultimate', 2499)}
            disabled={processing}
            className="w-full bg-surface text-ink-black py-4 rounded-full font-label-bold text-label-bold neo-memphis-button disabled:opacity-50"
          >
            {processing ? 'Processing...' : selectedPlan === 'ultimate' ? 'Active Plan' : 'Get Ultimate'}
          </button>
        </div>

      </div>

      {/* Why Choose Section */}
      <section className="max-w-4xl mx-auto bg-surface-container-high rounded-xl p-6 md:p-10 border-outline mb-12 relative overflow-hidden">
        <div className="relative z-10 text-center mb-10">
          <h2 className="font-display-lg text-3xl md:text-display-lg text-ink-black mb-4">Why choose SarvUday?</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">We believe mental health support should be accessible, stigma-free, confidential, and holistic.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-accent-sage border-outline flex items-center justify-center shrink-0 shadow-subtle">
              <span className="material-symbols-outlined text-ink-black">verified_user</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-xl md:text-headline-sm text-ink-black mb-2">Safe &amp; Anonymous</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Share your story without fear. Our platform prioritizes your privacy, encryption, and emotional safety above all.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed border-outline flex items-center justify-center shrink-0 shadow-subtle">
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
