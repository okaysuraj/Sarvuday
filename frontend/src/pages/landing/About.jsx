import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-[#FAF9F6] text-[#121214] min-h-[calc(100vh-64px)] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF3EC] text-[#244B36] text-xs font-medium border-[#D5E5D4]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#346538]"></span>
            Our Mission &amp; Purpose
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#121214]">
            A quiet digital harbor for mental wellness and human healing.
          </h1>
          <p className="text-base sm:text-lg text-[#6E6D7A] leading-relaxed max-w-2xl">
            SarvUday was created to dismantle the barrier between people facing emotional distress
            and the licensed clinical care they deserve.
          </p>
        </div>

        {/* Narrative Card */}
        <div className="bg-white border-[#EAEAEA] rounded-2xl p-8 sm:p-10 shadow-sm space-y-6 text-sm sm:text-base text-[#6E6D7A] leading-relaxed">
          <h2 className="text-xl font-semibold text-[#121214]">Why SarvUday Exists</h2>
          <p>
            Navigating psychological struggles is often accompanied by isolation and overwhelming
            complexity. Traditional care models are frequently out of reach, expensive, or burdened
            with bureaucratic friction.
          </p>
          <p>
            At SarvUday, we unite modern tele-health infrastructure with deeply compassionate
            clinical principles. By providing private WebRTC rooms, a 24/7 AI companion for
            de-escalation, and longitudinal mood analytics, we empower you to understand your
            emotional rhythms and connect with certified practitioners from the comfort of home.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-[#EAEAEA] rounded-2xl p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EDF3EC] text-[#244B36] flex items-center justify-center">
              <span className="material-symbols-rounded text-xl">favorite</span>
            </div>
            <h3 className="text-base font-semibold text-[#121214]">Deep Empathy</h3>
            <p className="text-xs sm:text-sm text-[#6E6D7A] leading-relaxed">
              Every feature, from our prompt library to session notes, is built with gentleness and
              emotional respect.
            </p>
          </div>

          <div className="bg-white border-[#EAEAEA] rounded-2xl p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF3F8] text-[#214467] flex items-center justify-center">
              <span className="material-symbols-rounded text-xl">lock</span>
            </div>
            <h3 className="text-base font-semibold text-[#121214]">Uncompromising Privacy</h3>
            <p className="text-xs sm:text-sm text-[#6E6D7A] leading-relaxed">
              Your mental health journey is strictly private. We adhere to rigorous HIPAA and GDPR
              encryption standards.
            </p>
          </div>

          <div className="bg-white border-[#EAEAEA] rounded-2xl p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F6F3EB] text-[#6B5524] flex items-center justify-center">
              <span className="material-symbols-rounded text-xl">psychology</span>
            </div>
            <h3 className="text-base font-semibold text-[#121214]">Clinical Integrity</h3>
            <p className="text-xs sm:text-sm text-[#6E6D7A] leading-relaxed">
              Our tools are rooted in evidence-informed cognitive-behavioral principles and guided
              by licensed counsellors.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#FAF9F6] border-[#EAEAEA] rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-xl font-semibold text-[#121214]">Ready to take the first step?</h2>
          <p className="text-xs sm:text-sm text-[#6E6D7A] max-w-md mx-auto">
            Explore our vetted counsellors or start an anonymous conversation with our 24/7 AI
            companion.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              to="/register"
              className="px-5 py-2.5 rounded-lg bg-[#18181B] text-white text-xs sm:text-sm font-medium hover:bg-[#27272A] transition-all"
            >
              Join SarvUday
            </Link>
            <Link
              to="/contact-us"
              className="px-5 py-2.5 rounded-lg border-[#EAEAEA] bg-white text-[#121214] text-xs sm:text-sm font-medium hover:bg-[#F5F4F0] transition-all"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
