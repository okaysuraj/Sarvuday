import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Interactive 4-7-8 Breathing Circle State
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('idle'); // 'idle' | 'inhale' | 'hold' | 'exhale'
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    let timer;
    if (breathingActive) {
      const cycle = () => {
        setBreathPhase('inhale');
        setSecondsLeft(4);
        timer = setTimeout(() => {
          setBreathPhase('hold');
          setSecondsLeft(7);
          timer = setTimeout(() => {
            setBreathPhase('exhale');
            setSecondsLeft(8);
            timer = setTimeout(() => {
              if (breathingActive) cycle();
            }, 8000);
          }, 7000);
        }, 4000);
      };
      cycle();
    } else {
      setBreathPhase('idle');
      setSecondsLeft(0);
    }
    return () => clearTimeout(timer);
  }, [breathingActive]);

  return (
    <div className="bg-[#FAF9F6] text-[#121214] min-h-screen selection:bg-[#18181B] selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden border-b border-[#EAEAEA]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF3EC] text-[#244B36] text-xs font-medium border-[#D5E5D4]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#346538]"></span>
                CLINICALLY BACKED • CONFIDENTIAL TELEHEALTH
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#121214] leading-[1.12]">
                Therapy and mental wellness, designed for quiet human peace.
              </h1>

              <p className="text-base sm:text-lg text-[#6E6D7A] leading-relaxed max-w-xl">
                Connect with licensed counsellors, track your daily emotional rhythm, and access an
                empathetic 24/7 companion whenever you need support.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-lg bg-[#18181B] text-white text-sm font-medium hover:bg-[#27272A] active:scale-[0.98] transition-all shadow-sm inline-flex items-center gap-2"
                >
                  <span>Begin Your Journey</span>
                  <span className="material-symbols-rounded text-base">arrow_forward</span>
                </Link>

                <Link
                  to="/therapists"
                  className="px-6 py-3 rounded-lg bg-white border-[#EAEAEA] text-[#121214] text-sm font-medium hover:bg-[#F5F4F0] active:scale-[0.98] transition-all inline-flex items-center gap-2"
                >
                  <span className="material-symbols-rounded text-base text-[#71717A]">
                    stethoscope
                  </span>
                  <span>Explore Therapists</span>
                </Link>
              </div>

              {/* Trust Metric Micro-strip */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#71717A]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-rounded text-emerald-600 text-base">
                    verified_user
                  </span>
                  <span>Personal wellbeing tools</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-rounded text-emerald-600 text-base">lock</span>
                  <span>256-Bit Encrypted WebRTC</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-rounded text-emerald-600 text-base">
                    psychology
                  </span>
                  <span>Licensed Practitioners</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Serenity Box (Breathing Exercise Widget) */}
            <div className="lg:col-span-5">
              <div className="bg-white border-[#EAEAEA] rounded-2xl p-7 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-[#EAEAEA]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded text-emerald-700 text-lg">air</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#121214]">
                      Instant Grounding Tool
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#71717A]">4-7-8 Breathing</span>
                </div>

                <div className="py-10 flex flex-col items-center justify-center text-center">
                  <div className="relative flex items-center justify-center w-48 h-48 my-2">
                    {/* Outer Breathing Ring */}
                    <div
                      className={`absolute inset-0 rounded-full border-emerald-500/20 transition-transform duration-[4000ms] ease-out ${
                        breathPhase === 'inhale'
                          ? 'scale-110 bg-[#EDF3EC]/50'
                          : breathPhase === 'hold'
                            ? 'scale-110 bg-[#EDF3EC]/70'
                            : breathPhase === 'exhale'
                              ? 'scale-90 bg-transparent'
                              : 'scale-100 bg-[#F5F4F0]/60'
                      }`}
                    ></div>

                    {/* Inner Center Circle */}
                    <div className="relative z-10 w-28 h-28 rounded-full bg-white border-[#EAEAEA] shadow-sm flex flex-col items-center justify-center p-2">
                      <span className="text-xs uppercase tracking-widest text-[#71717A] font-medium">
                        {breathPhase === 'idle'
                          ? 'Ready'
                          : breathPhase === 'inhale'
                            ? 'Inhale'
                            : breathPhase === 'hold'
                              ? 'Hold'
                              : 'Exhale'}
                      </span>
                      {breathingActive && (
                        <span className="text-lg font-mono font-semibold text-[#121214] mt-1">
                          {secondsLeft}s
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#71717A] mt-4 max-w-xs">
                    {breathingActive
                      ? 'Inhale through your nose (4s), hold gently (7s), exhale slowly (8s).'
                      : 'Take one quiet minute to regulate your autonomic nervous system.'}
                  </p>

                  <button
                    onClick={() => setBreathingActive(!breathingActive)}
                    className={`mt-5 px-5 py-2 rounded-lg text-xs font-medium transition-all ${
                      breathingActive
                        ? 'bg-[#FDEBEC] text-[#8F2B26] hover:bg-[#FADBDC]'
                        : 'bg-[#EDF3EC] text-[#244B36] hover:bg-[#DCEADA]'
                    }`}
                  >
                    {breathingActive ? 'Stop Breathing Exercise' : 'Start 1-Min Calm Practice'}
                  </button>
                </div>

                <div className="bg-[#FAF9F6] -mx-7 -mb-7 p-4 border-t border-[#EAEAEA] flex items-center justify-between text-xs text-[#71717A]">
                  <span>Feeling distressed right now?</span>
                  <Link
                    to="/emergency"
                    className="text-[#8F2B26] font-medium hover:underline flex items-center gap-1"
                  >
                    <span>Emergency SOS</span>
                    <span className="material-symbols-rounded text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & COMPLIANCE BAR */}
      <section className="py-6 border-b border-[#EAEAEA] bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-[#EAEAEA]">
            <div className="py-2 px-4">
              <span className="block text-xl font-semibold text-[#121214]">Your account</span>
              <span className="text-xs text-[#71717A]">Personal records</span>
            </div>
            <div className="py-2 px-4">
              <span className="block text-xl font-semibold text-[#121214]">Chat</span>
              <span className="text-xs text-[#71717A]">Empathetic AI Companion</span>
            </div>
            <div className="py-2 px-4">
              <span className="block text-xl font-semibold text-[#121214]">Find</span>
              <span className="text-xs text-[#71717A]">Approved counsellors</span>
            </div>
            <div className="py-2 px-4">
              <span className="block text-xl font-semibold text-[#121214]">Support</span>
              <span className="text-xs text-[#71717A]">Saved emergency contacts</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ASYMMETRICAL BENTO FEATURE GRID */}
      <section className="py-20 md:py-28 max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
            Comprehensive Clinical Care
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#121214] mt-2">
            Four pillars designed for your mental sanctuary.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Tele-Counselling (Col 7) */}
          <div className="md:col-span-7 bg-white border-[#EAEAEA] rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:border-outline/20 transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#EDF3EC] text-[#244B36] flex items-center justify-center">
                <span className="material-symbols-rounded text-xl">videocam</span>
              </div>
              <h3 className="text-xl font-semibold text-[#121214]">One-on-One Tele-Counselling</h3>
              <p className="text-sm text-[#6E6D7A] leading-relaxed">
                Connect face-to-face or via private audio with licensed psychotherapists. Seamless
                WebRTC telehealth rooms, calendar slot-locking, and confidential session notes.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EAEAEA] flex items-center justify-between">
              <span className="text-xs text-[#71717A]">Verified practitioners</span>
              <Link
                to="/therapists"
                className="text-xs font-semibold text-[#121214] flex items-center gap-1 hover:underline"
              >
                <span>Browse Therapists</span>
                <span className="material-symbols-rounded text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Card 2: 24/7 AI Companion (Col 5) */}
          <div className="md:col-span-5 bg-white border-[#EAEAEA] rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:border-outline/20 transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#EEF3F8] text-[#214467] flex items-center justify-center">
                <span className="material-symbols-rounded text-xl">smart_toy</span>
              </div>
              <h3 className="text-xl font-semibold text-[#121214]">24/7 AI Companion</h3>
              <p className="text-sm text-[#6E6D7A] leading-relaxed">
                When anxious thoughts arise at 3 AM, our trained AI companion listens without
                judgment, provides structured CBT prompts, and monitors sentiment safety.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EAEAEA] flex items-center justify-between">
              <span className="text-xs text-[#71717A]">Always available</span>
              <Link
                to="/ai-chat"
                className="text-xs font-semibold text-[#121214] flex items-center gap-1 hover:underline"
              >
                <span>Talk Now</span>
                <span className="material-symbols-rounded text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Card 3: Emotion & Sleep Tracking (Col 5) */}
          <div className="md:col-span-5 bg-white border-[#EAEAEA] rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:border-outline/20 transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#F6F3EB] text-[#6B5524] flex items-center justify-center">
                <span className="material-symbols-rounded text-xl">query_stats</span>
              </div>
              <h3 className="text-xl font-semibold text-[#121214]">Mood &amp; Sleep Analytics</h3>
              <p className="text-sm text-[#6E6D7A] leading-relaxed">
                Log morning sentiment, track restorative sleep, and correlate stress triggers. Turn
                subtle emotional shifts into actionable personal insights.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EAEAEA] flex items-center justify-between">
              <span className="text-xs text-[#71717A]">Visual health trends</span>
              <Link
                to="/mood-tracker"
                className="text-xs font-semibold text-[#121214] flex items-center gap-1 hover:underline"
              >
                <span>Track Mood</span>
                <span className="material-symbols-rounded text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Card 4: Safe Community & Crisis Helpline (Col 7) */}
          <div className="md:col-span-7 bg-white border-[#EAEAEA] rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:border-outline/20 transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#FDEBEC] text-[#8F2B26] flex items-center justify-center">
                <span className="material-symbols-rounded text-xl">support</span>
              </div>
              <h3 className="text-xl font-semibold text-[#121214]">
                Moderated Circles &amp; Crisis Protocol
              </h3>
              <p className="text-sm text-[#6E6D7A] leading-relaxed">
                Browse peer support groups and keep an emergency contact saved in your profile.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EAEAEA] flex items-center justify-between">
              <span className="text-xs text-[#71717A]">You are never alone</span>
              <Link
                to="/community"
                className="text-xs font-semibold text-[#121214] flex items-center gap-1 hover:underline"
              >
                <span>Join Circles</span>
                <span className="material-symbols-rounded text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLINICAL PHILOSOPHY QUOTE */}
      <section className="py-16 bg-[#F5F4F0] border-y border-[#EAEAEA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
            Our Care Philosophy
          </span>
          <blockquote className="text-2xl sm:text-3xl font-serif italic text-[#121214] leading-snug">
            &ldquo;Mental health care shouldn&apos;t feel like an impersonal clinical maze. We built
            SarvUday as a calm digital harbor where healing begins with dignity and genuine human
            listening.&rdquo;
          </blockquote>
          <p className="text-xs text-[#71717A]">
            SarvUday Clinical Advisory Board &bull; Licensed Psychological Care Standards
          </p>
        </div>
      </section>

      {/* 5. CRISIS REASSURANCE BANNER */}
      <section className="py-14 bg-white border-b border-[#EAEAEA]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="bg-[#FAF9F6] border-[#EAEAEA] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FDEBEC] text-[#8F2B26] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-rounded text-xl">emergency</span>
              </div>
              <div>
                <h4 className="font-semibold text-base text-[#121214]">
                  In immediate crisis or feeling unsafe?
                </h4>
                <p className="text-xs sm:text-sm text-[#6E6D7A] mt-1">
                  Help is free, confidential, and available 24 hours a day, 7 days a week.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="tel:988"
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg bg-[#8F2B26] text-white text-xs font-semibold hover:bg-[#782420] text-center transition-colors"
              >
                Call or Text 988
              </a>
              <Link
                to="/emergency"
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg border-[#EAEAEA] bg-white text-xs font-semibold text-[#121214] hover:bg-[#F5F4F0] text-center transition-colors"
              >
                View SOS Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-20 md:py-28 max-w-[1240px] mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#121214]">
            Take the first step toward peace of mind.
          </h2>
          <p className="text-sm sm:text-base text-[#6E6D7A] leading-relaxed">
            Create an account in less than two minutes. Confidential, personalized, and backed by
            licensed care.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              to="/register"
              className="px-6 py-3 rounded-lg bg-[#18181B] text-white text-sm font-medium hover:bg-[#27272A] active:scale-[0.98] transition-all shadow-sm"
            >
              Get Started Free
            </Link>
            <Link
              to="/assessments"
              className="px-6 py-3 rounded-lg border-[#EAEAEA] bg-white text-[#121214] text-sm font-medium hover:bg-[#F5F4F0] active:scale-[0.98] transition-all"
            >
              Take Free Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
