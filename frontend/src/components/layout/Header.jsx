import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import sarvudayLogo from "../../assets/sarvuday_logo.png";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);

    if (token) {
      const storedUserType = localStorage.getItem("userType");
      setUserType(storedUserType || "normal_user");
    }
  }, []);

  const getDashboardUrl = () => {
    switch (userType) {
      case "counsellor":
        return "/counsellor-dashboard";
      case "admin":
        return "/admin-dashboard";
      default:
        return "/normal-user-dashboard";
    }
  };

  const navLinks = [
    { label: "Therapists", path: "/therapists" },
    { label: "AI Companion", path: "/ai-chat" },
    { label: "Track Mood", path: "/mood-tracker" },
    { label: "Assessments", path: "/assessments" },
    { label: "Community", path: "/community" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#EAEAEA] transition-all duration-200">
      <div className="max-w-[1240px] mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#EAEAEA] p-1 flex items-center justify-center shadow-xs overflow-hidden group-hover:scale-105 transition-all">
              <img src={sarvudayLogo} alt="SarvUday" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[17px] tracking-tight text-[#121214] leading-tight">
                SarvUday
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#71717A] font-medium leading-none">
                Mental Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 text-[14px] rounded-lg transition-colors font-medium ${
                    isActive
                      ? "text-[#121214] bg-black/[0.04]"
                      : "text-[#6E6D7A] hover:text-[#121214] hover:bg-black/[0.02]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Crisis SOS Pill */}
          <Link
            to="/emergency"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FDEBEC] text-[#8F2B26] border-[#F6D0D2] hover:bg-[#FADBDC] transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8F2B26] animate-pulse"></span>
            24/7 Crisis Help
          </Link>

          {isLoggedIn ? (
            <Link
              to={getDashboardUrl()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-[#18181B] text-white hover:bg-[#27272A] active:scale-[0.98] transition-all shadow-sm"
            >
              <span>Dashboard</span>
              <span className="material-symbols-rounded text-[16px]">arrow_forward</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-xs sm:text-sm font-medium text-[#6E6D7A] hover:text-[#121214] transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-lg bg-[#18181B] text-white hover:bg-[#27272A] active:scale-[0.98] transition-all shadow-sm"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg text-[#121214] hover:bg-black/[0.04] transition-colors"
          >
            <span className="material-symbols-rounded text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#EAEAEA] bg-[#FAF9F6] px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 text-[15px] rounded-lg transition-colors font-medium flex items-center justify-between ${
                    isActive
                      ? "text-[#121214] bg-black/[0.05]"
                      : "text-[#6E6D7A] hover:text-[#121214]"
                  }`
                }
              >
                <span>{link.label}</span>
                <span className="material-symbols-rounded text-sm text-[#A1A1AA]">chevron_right</span>
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EAEAEA] flex flex-col gap-2.5">
            <Link
              to="/emergency"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium bg-[#FDEBEC] text-[#8F2B26] border-[#F6D0D2]"
            >
              <span className="w-2 h-2 rounded-full bg-[#8F2B26]"></span>
              24/7 Crisis Support Lifeline
            </Link>

            {!isLoggedIn && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium rounded-lg border-[#EAEAEA] bg-white text-[#121214]"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium rounded-lg bg-[#18181B] text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
