import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const SettingsLayout = () => {
  return (
    <div className="flex-1 min-h-screen bg-background">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1); }
        .neo-shadow-sm { box-shadow: 2px 2px 0px 0px rgba(26, 26, 26, 1); }
        .active-tab { background-color: #002da5; color: white; border: 1.5px solid #1A1A1A; }
        .inactive-tab { background-color: transparent; color: #1b1b20; border: 1.5px solid transparent; }
        .inactive-tab:hover { background-color: #eae7ee; border: 1.5px solid #1A1A1A; }
      `}</style>
      
      {/* Settings Navigation Tabs */}
      <div className="px-4 md:px-margin-desktop py-6 border-b-[1.5px] border-ink-black sticky top-0 z-30 bg-background/95 backdrop-blur-sm">
        <h2 className="font-display-lg text-3xl md:text-display-lg text-ink-black mb-6">Settings</h2>
        <div className="flex flex-wrap gap-2 md:gap-4">
          <NavLink 
            to="/settings/privacy" 
            className={({ isActive }) => `px-6 py-2 rounded-full font-label-bold transition-all ${isActive ? 'active-tab neo-shadow-sm' : 'inactive-tab'}`}
          >
            Privacy & Security
          </NavLink>
          <NavLink 
            to="/settings/reminders" 
            className={({ isActive }) => `px-6 py-2 rounded-full font-label-bold transition-all ${isActive ? 'active-tab neo-shadow-sm' : 'inactive-tab'}`}
          >
            Notifications & Reminders
          </NavLink>
          <NavLink 
            to="/settings/data" 
            className={({ isActive }) => `px-6 py-2 rounded-full font-label-bold transition-all ${isActive ? 'active-tab neo-shadow-sm' : 'inactive-tab'}`}
          >
            Account & Data
          </NavLink>
        </div>
      </div>

      {/* Main Settings Content Area */}
      <div className="p-4 md:p-margin-desktop max-w-7xl mx-auto w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
