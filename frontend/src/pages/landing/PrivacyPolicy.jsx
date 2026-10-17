const PrivacyPolicy = () => {
  return (
    <div className="bg-[#FAF9F6] text-[#121214] min-h-[calc(100vh-64px)] py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white border-[#EAEAEA] rounded-2xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-[#EAEAEA] pb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              Confidentiality Standards
            </span>
            <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#121214] mt-2">
              Privacy &amp; Data Ethics Policy
            </h1>
            <p className="text-xs text-[#71717A] mt-2">
              Last updated: September 2026 &bull; Compliant with HIPAA &amp; Digital Health Ethics
            </p>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-[#6E6D7A]">
            <p className="text-base text-[#121214] font-medium">
              At SarvUday, protecting your mental wellness data is our most sacred obligation. We
              believe confidentiality is the absolute prerequisite for psychological safety.
            </p>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-[#121214]">1. Information We Collect</h2>
              <p>
                We only collect data necessary to provide effective tele-health and personalized
                tracking:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Identity credentials (name, verified email, telephone number).</li>
                <li>
                  Self-reported mood check-ins, journal reflections, and clinical intake history.
                </li>
                <li>
                  Telehealth connection metadata (video and audio streams are end-to-end encrypted).
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-[#121214]">
                2. How We Use and Protect Your Data
              </h2>
              <p>
                Your records are used strictly to coordinate appointments with your licensed
                counsellor and generate personal insights. We never monetize, sell, or disclose your
                clinical or emotional data to advertisers or third parties.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-[#121214]">
                3. AI Companion Ethics &amp; Safety
              </h2>
              <p>
                Conversations with the SarvUday AI Companion are securely processed in accordance
                with privacy safeguards. Sentiment tracking operates locally or via isolated secure
                endpoints to assist with de-escalation and crisis detection.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-[#121214]">4. Right to Erasure</h2>
              <p>
                Under GDPR and our user privacy mandate, you retain the permanent right to request
                full export or complete deletion of your session history, journals, and account
                records at any time via Account Settings.
              </p>
            </div>

            <div className="pt-4 border-t border-[#EAEAEA] text-xs text-[#71717A]">
              For inquiries regarding HIPAA compliance or privacy, contact us at{' '}
              <a href="mailto:privacy@sarvuday.com" className="text-[#121214] underline">
                privacy@sarvuday.com
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
