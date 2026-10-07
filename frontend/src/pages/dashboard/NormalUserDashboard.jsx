import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const NormalUserDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [weeklyMoods, setWeeklyMoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [dashRes, moodRes] = await Promise.allSettled([
          axiosInstance.get("/user/dashboard"),
          axiosInstance.get("/user/tracking/mood/history")
        ]);

        if (dashRes.status === "fulfilled") {
          setDashboardData(dashRes.value.data);
        }

        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const todayIdx = new Date().getDay(); // 0 is Sun
        const dayNamesOrdered = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        let userMoods = [];
        if (moodRes.status === "fulfilled" && Array.isArray(moodRes.value.data)) {
          userMoods = moodRes.value.data;
        }

        const calculatedWeek = days.map((day) => {
          // Find matching mood from recent entries
          const found = userMoods.find((m) => {
            if (!m.created_at) return false;
            const d = new Date(m.created_at);
            return dayNamesOrdered[d.getDay()].toLowerCase().startsWith(day.toLowerCase());
          });

          if (found) {
            const val = parseInt(found.mood) || 3;
            const score = val * 20;
            const label = val >= 4 ? "Elevated" : val === 3 ? "Balanced" : "Low";
            const color = val >= 4 ? "bg-[#D4E3F3]" : val === 3 ? "bg-[#D5E5D4]" : "bg-[#EFE9D8]";
            return { day, score, label, color };
          }

          return { day, score: 60, label: "Equilibrium", color: "bg-[#D5E5D4]" };
        });

        setWeeklyMoods(calculatedWeek);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#18181B] border-t-transparent animate-spin"></div>
        <span className="text-xs text-[#71717A]">Loading your sanctuary...</span>
      </div>
    );
  }

  const userName = dashboardData?.user?.name?.split(" ")[0] || "Friend";

  return (
    <div className="space-y-8">
      {/* 1. MORNING WELCOME CARD */}
      <section className="bg-white border-[#EAEAEA] rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EDF3EC] text-[#244B36] text-[11px] font-medium border-[#D5E5D4]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#346538]"></span>
              Daily Sanctuary Check-In
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#121214] tracking-tight">
              Good Morning, {userName}
            </h1>
            <p className="text-sm text-[#6E6D7A] leading-relaxed">
              &ldquo;Every day brings a fresh breath. Step forward gently and honor where your mind is right now.&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/mood-tracker/add"
              className="px-4 py-2.5 rounded-lg bg-[#18181B] text-white text-xs sm:text-sm font-medium hover:bg-[#27272A] active:scale-[0.98] transition-all inline-flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-rounded text-base">add_circle</span>
              <span>Log Today&apos;s Mood</span>
            </Link>

            <Link
              to="/ai-chat"
              className="px-4 py-2.5 rounded-lg bg-[#FAF9F6] border-[#EAEAEA] text-[#121214] text-xs sm:text-sm font-medium hover:bg-[#F5F4F0] active:scale-[0.98] transition-all inline-flex items-center gap-2"
            >
              <span className="material-symbols-rounded text-base text-[#71717A]">smart_toy</span>
              <span>Talk to Companion</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CORE BENTO: WEEKLY MOOD + QUICK ACTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Mood Snapshot (7 cols) */}
        <div className="lg:col-span-7 bg-white border-[#EAEAEA] rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-[#EAEAEA]">
            <div>
              <h2 className="text-base font-semibold text-[#121214]">Weekly Mood Snapshot</h2>
              <p className="text-xs text-[#71717A] mt-0.5">Average emotional equilibrium: 71%</p>
            </div>
            <Link
              to="/mood-tracker"
              className="text-xs font-medium text-[#121214] hover:underline flex items-center gap-1"
            >
              <span>Detailed Journal</span>
              <span className="material-symbols-rounded text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* Minimalist Bar Visualization */}
          <div className="py-8">
            <div className="flex items-end justify-between h-40 gap-2 sm:gap-4 px-2">
              {weeklyMoods.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="relative w-full flex items-end justify-center h-full">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-[#18181B] text-white text-[10px] px-2 py-0.5 rounded pointer-events-none whitespace-nowrap shadow-sm">
                      {item.day}: {item.label} ({item.score}%)
                    </div>
                    {/* The serene bar */}
                    <div
                      className={`w-full max-w-[32px] rounded-t-md transition-all duration-300 group-hover:opacity-80 ${item.color}`}
                      style={{ height: `${item.score}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-[#71717A]">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#EAEAEA] flex items-center justify-between text-xs text-[#71717A]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D4E3F3]"></span> Elevated
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D5E5D4]"></span> Calm
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#EFE9D8]"></span> Mild Stress
            </span>
          </div>
        </div>

        {/* AI Companion Quick Card (5 cols) */}
        <div className="lg:col-span-5 bg-white border-[#EAEAEA] rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF3F8] text-[#214467] flex items-center justify-center">
              <span className="material-symbols-rounded text-xl">smart_toy</span>
            </div>
            <h2 className="text-base font-semibold text-[#121214]">
              24/7 AI Companion
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6D7A] leading-relaxed">
              Have something weighing on your chest? Our empathetic AI companion listens, provides gentle CBT reflections, and helps you untangle thoughts.
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-[#EAEAEA]">
            <Link
              to="/ai-chat"
              className="w-full py-2.5 px-4 rounded-lg bg-[#FAF9F6] border-[#EAEAEA] text-[#121214] text-xs font-semibold hover:bg-[#F5F4F0] transition-colors flex items-center justify-center gap-2"
            >
              <span>Open Private Chat Room</span>
              <span className="material-symbols-rounded text-sm">chat</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. QUICK ACTIONS & INSIGHT */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Book Therapist Card (6 cols) */}
        <div className="md:col-span-6 bg-white border-[#EAEAEA] rounded-2xl p-6 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#EDF3EC] text-[#244B36] flex items-center justify-center shrink-0">
            <span className="material-symbols-rounded text-xl">calendar_month</span>
          </div>
          <div className="flex-grow space-y-1">
            <h3 className="text-sm font-semibold text-[#121214]">Consult a Professional</h3>
            <p className="text-xs text-[#6E6D7A] leading-relaxed">
              Schedule your next confidential WebRTC consultation with our vetted therapists.
            </p>
            <Link
              to="/therapists"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#121214] hover:underline pt-2"
            >
              <span>Browse Therapist Slots</span>
              <span className="material-symbols-rounded text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Weekly Mindfulness Insight (6 cols) */}
        <div className="md:col-span-6 bg-[#FAF9F6] border-[#EAEAEA] rounded-2xl p-6 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#F6F3EB] text-[#6B5524] flex items-center justify-center shrink-0">
            <span className="material-symbols-rounded text-xl">lightbulb</span>
          </div>
          <div className="flex-grow space-y-1">
            <h3 className="text-sm font-semibold text-[#121214]">Clinical Wellness Tip</h3>
            <p className="text-xs text-[#6E6D7A] leading-relaxed italic">
              &ldquo;Your logged stress dips on days with 7+ hours of sleep. Protecting your evening wind-down routine is creating a tangible protective buffer.&rdquo;
            </p>
            <Link
              to="/insights"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#121214] hover:underline pt-2"
            >
              <span>View Full Analytics</span>
              <span className="material-symbols-rounded text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. HEALTH ROUTINES & TOOLS */}
      <section className="bg-white border-[#EAEAEA] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EAEAEA]">
          <h2 className="text-sm font-semibold text-[#121214] uppercase tracking-wider">
            Daily Supportive Routines
          </h2>
          <span className="text-xs text-[#71717A]">Self-paced care</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/journal"
            className="p-4 rounded-xl border-[#EAEAEA] hover:border-outline/20 hover:bg-[#FAF9F6] transition-all text-center flex flex-col items-center gap-2 group"
          >
            <span className="material-symbols-rounded text-2xl text-[#214467] group-hover:scale-105 transition-transform">
              edit_note
            </span>
            <span className="text-xs font-medium text-[#121214]">Daily Journal</span>
          </Link>

          <Link
            to="/meditation"
            className="p-4 rounded-xl border-[#EAEAEA] hover:border-outline/20 hover:bg-[#FAF9F6] transition-all text-center flex flex-col items-center gap-2 group"
          >
            <span className="material-symbols-rounded text-2xl text-[#244B36] group-hover:scale-105 transition-transform">
              self_improvement
            </span>
            <span className="text-xs font-medium text-[#121214]">Guided Breathing</span>
          </Link>

          <Link
            to="/assessments"
            className="p-4 rounded-xl border-[#EAEAEA] hover:border-outline/20 hover:bg-[#FAF9F6] transition-all text-center flex flex-col items-center gap-2 group"
          >
            <span className="material-symbols-rounded text-2xl text-[#6B5524] group-hover:scale-105 transition-transform">
              assignment
            </span>
            <span className="text-xs font-medium text-[#121214]">Assessments</span>
          </Link>

          <Link
            to="/community"
            className="p-4 rounded-xl border-[#EAEAEA] hover:border-outline/20 hover:bg-[#FAF9F6] transition-all text-center flex flex-col items-center gap-2 group"
          >
            <span className="material-symbols-rounded text-2xl text-[#8F2B26] group-hover:scale-105 transition-transform">
              groups
            </span>
            <span className="text-xs font-medium text-[#121214]">Community Circles</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NormalUserDashboard;
