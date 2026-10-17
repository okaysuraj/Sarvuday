const Terms = () => {
  return (
    <div className="bg-[#FAF9F6] text-[#121214] min-h-[calc(100vh-64px)] py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white border-[#EAEAEA] rounded-2xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-[#EAEAEA] pb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              Terms of Care &amp; Platform Access
            </span>
            <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#121214] mt-2">
              Terms of Service
            </h1>
            <p className="text-xs text-[#71717A] mt-2">
              Effective Date: September 2026 &bull; SarvUday Platform
            </p>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-[#6E6D7A]">
            <div className="p-4 rounded-xl bg-[#FDEBEC] border-[#F6D0D2] text-xs text-[#8F2B26]">
              <strong>Emergency Medical Disclaimer:</strong> SarvUday is a tele-counselling platform
              and supportive tool. It is not an emergency psychiatric hospital or acute suicide
              prevention facility. If you are experiencing thoughts of self-harm or a
              life-threatening medical emergency, call <strong>988</strong> or your local emergency
              services immediately.
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-[#121214]">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the SarvUday platform, you confirm your agreement to these
                Terms of Service. If you do not agree to all terms, you should discontinue use of
                the platform.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-[#121214]">
                2. Clinical Relationship &amp; Telehealth
              </h2>
              <p>
                Therapy sessions booked via SarvUday establish a professional client-counsellor
                relationship directly with the licensed provider. Counsellors maintain their own
                clinical independence and licensure requirements.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-[#121214]">
                3. AI Companion Limitations
              </h2>
              <p>
                The 24/7 AI Companion is an emotional support and psychoeducational tool powered by
                conversational algorithms. It does not issue clinical psychiatric diagnoses, medical
                prescriptions, or replace human medical care.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-[#121214]">4. Account Responsibility</h2>
              <p>
                You are responsible for safeguarding your login credentials and maintaining privacy
                during telehealth video calls.
              </p>
            </div>

            <div className="pt-4 border-t border-[#EAEAEA] text-xs text-[#71717A]">
              For questions regarding these terms, contact{' '}
              <a href="mailto:legal@sarvuday.com" className="text-[#121214] underline">
                legal@sarvuday.com
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
