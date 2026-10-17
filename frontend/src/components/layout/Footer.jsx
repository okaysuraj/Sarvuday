import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import sarvudayLogo from '../../assets/sarvuday_logo.png';

const Footer = () => {
  return (
    <footer className="w-full bg-[#FAF9F6] border-t border-[#EAEAEA] mt-auto text-[#121214]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-12 gap-x-4 gap-y-8 md:gap-10 lg:gap-12 pb-12 border-b border-[#EAEAEA]">
          {/* Brand & Mission */}
          <div className="col-span-12 md:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#EAEAEA] p-1 flex items-center justify-center shadow-xs overflow-hidden">
                <img src={sarvudayLogo} alt="SarvUday" className="w-full h-full object-contain" />
              </div>
              <span className="font-semibold text-lg tracking-tight text-[#121214]">SarvUday</span>
            </Link>
            <p className="text-sm text-[#6E6D7A] leading-relaxed max-w-sm">
              An evidence-informed mental wellness platform uniting licensed therapy, 24/7
              empathetic AI support, and compassionate daily tracking.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDF3EC] text-[#244B36] text-xs font-medium border-[#D5E5D4]">
              <span className="w-2 h-2 rounded-full bg-[#346538]"></span>
              Personal wellbeing and counselling
            </div>
          </div>

          {/* Care & Therapy */}
          <div className="md:col-span-2 sm:col-span-4 col-span-6 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#121214]">
              Care & Therapy
            </h4>
            <ul className="space-y-2 text-sm text-[#6E6D7A]">
              <li>
                <Link to="/therapists" className="hover:text-[#121214] transition-colors">
                  Find Therapists
                </Link>
              </li>
              <li>
                <Link to="/approved-counsellors" className="hover:text-[#121214] transition-colors">
                  Licensed Team
                </Link>
              </li>
              <li>
                <Link to="/assessments" className="hover:text-[#121214] transition-colors">
                  Self Assessments
                </Link>
              </li>
              <li>
                <Link to="/disorders" className="hover:text-[#121214] transition-colors">
                  Condition Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & AI */}
          <div className="md:col-span-3 sm:col-span-4 col-span-6 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#121214]">
              Tools & Daily Wellness
            </h4>
            <ul className="space-y-2 text-sm text-[#6E6D7A]">
              <li>
                <Link to="/ai-chat" className="hover:text-[#121214] transition-colors">
                  24/7 AI Companion
                </Link>
              </li>
              <li>
                <Link to="/mood-tracker" className="hover:text-[#121214] transition-colors">
                  Mood Tracking
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-[#121214] transition-colors">
                  Daily Reflections
                </Link>
              </li>
              <li>
                <Link to="/meditation" className="hover:text-[#121214] transition-colors">
                  Guided Breathwork
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-[#121214] transition-colors">
                  Support Groups
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Ethics */}
          <div className="md:col-span-3 sm:col-span-4 col-span-12 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#121214]">
              Ethics & Compliance
            </h4>
            <ul className="space-y-2 text-sm text-[#6E6D7A]">
              <li>
                <Link to="/about" className="hover:text-[#121214] transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-[#121214] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#121214] transition-colors">
                  Privacy & HIPAA Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#121214] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-[#8F2B26] font-medium hover:underline">
                  Emergency Resources
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>
            &copy; {new Date().getFullYear()} SarvUday Platform. Dedicated to human psychological
            peace.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link to="/emergency">Urgent support</Link>
            <div className="flex items-center gap-3 ml-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-[#121214] transition-colors"
              >
                <FaLinkedin size={15} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:text-[#121214] transition-colors"
              >
                <FaGithub size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
