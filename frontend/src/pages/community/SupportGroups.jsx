import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const SupportGroups = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axiosInstance.get('/community/groups');
        setGroups(res.data || []);
      } catch (err) {
        console.error('Failed to load support groups', err);
        toast.error('Could not load support groups');
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  return (
    <div className="flex-1 p-margin-desktop overflow-y-auto bg-cream-bg min-h-screen">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(26,26,26,1); }
        .neo-shadow-sm { box-shadow: 2px 2px 0px 0px rgba(26,26,26,1); }
        .neo-border { border: 1.5px solid #1A1A1A; }
        .active-neo:active { box-shadow: none; transform: translate(4px, 4px); }
        .active-neo-sm:active { box-shadow: none; transform: translate(2px, 2px); }
      `}</style>

      {/* Header Section */}
      <div className="mb-stack-lg flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="font-display-lg text-display-lg text-ink-black mb-2">Support Groups</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Find your tribe. Connect with others who understand exactly what you're going through in a safe, moderated environment.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input className="pl-12 pr-4 py-3 bg-[#f9f8f3] neo-border rounded-[12px] font-body-md focus:outline-none focus:border-primary focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all w-full md:w-64" placeholder="Search groups..." type="text"/>
          </div>
          <button className="hidden sm:flex bg-secondary-container text-ink-black font-label-bold text-label-bold py-3 px-6 rounded-[12px] neo-border neo-shadow active-neo transition-all items-center gap-2">
            <span className="material-symbols-outlined">filter_list</span>
            Filters
          </button>
        </div>
      </div>

      {/* Groups Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-40"><span className="material-symbols-outlined animate-spin text-4xl text-primary">autorenew</span></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, i) => {
            const bgs = ['bg-surface-lowest', 'bg-accent-pink', 'bg-secondary-container', 'bg-accent-sage', 'bg-accent-orange'];
            const bgClass = bgs[i % bgs.length];
            return (
              <div key={group.id} className={`${bgClass} rounded-[32px] neo-border p-container-padding flex flex-col justify-between hover:brightness-95 transition-all relative overflow-hidden group-hover`}>
                <div>
                  <div className="w-16 h-16 rounded-[16px] bg-white neo-border flex items-center justify-center mb-6 relative z-10">
                    <span className="material-symbols-outlined text-[32px] text-ink-black" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 text-xs font-label-bold bg-white/50 text-ink-black rounded-full border border-ink-black">Active</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-ink-black mb-3 relative z-10">{group.name}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3 relative z-10">{group.description}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-ink-black/20 relative z-10">
                  <div className="flex items-center gap-2 text-ink-black">
                    <span className="material-symbols-outlined text-[20px]">groups</span>
                    <span className="font-label-bold text-label-bold">{group.member_count} Members</span>
                  </div>
                  <button 
                    onClick={() => navigate(`/community/groups/${group.id}`)}
                    className="bg-surface text-ink-black font-label-bold text-label-bold py-2 px-6 rounded-[12px] neo-border neo-shadow-sm active-neo-sm transition-all"
                  >
                    Join
                  </button>
                </div>
              </div>
            );
          })}
          
          {/* Card 5: Empty State / Create New */}
        <div className="bg-surface-container rounded-[32px] neo-border border-dashed p-container-padding flex flex-col items-center justify-center text-center hover:bg-surface-variant transition-colors min-h-[350px]">
          <div className="w-20 h-20 rounded-full bg-white neo-border flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[40px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-ink-black mb-2">Don't see your tribe?</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">Create a new support group and invite others to join your space.</p>
          <button className="bg-primary text-on-primary font-label-bold text-label-bold py-3 px-8 rounded-[12px] neo-border neo-shadow active-neo transition-all">
            Create Group
          </button>
        </div>
        </div>
      )}
    </div>
  );
};

export default SupportGroups;
