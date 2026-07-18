import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const CommunityFeed = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/community/feed');
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to load community feed', err);
      toast.error('Could not load community feed');
    } finally {
      setLoading(false);
    }
  };

  const handleInteract = async (postId, action) => {
    try {
      await axiosInstance.post(`/community/posts/${postId}/interact`, { action });
      fetchFeed();
    } catch (error) {
      console.error('Interaction failed', error);
      toast.error('Failed to record interaction');
    }
  };

  const filters = [
    { id: 'all', label: 'All Posts' },
    { id: 'reflections', label: 'Daily Reflections' },
    { id: 'victories', label: 'Victories' },
    { id: 'advice', label: 'Seeking Advice' },
  ];

  return (
    <div className="flex-1 p-margin-desktop bg-cream-bg min-h-screen font-body-lg text-body-lg">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px #1A1A1A; }
        .neo-border { border: 1.5px solid #1A1A1A; }
        .neo-active:active { box-shadow: none; transform: translate(2px, 2px); }
        .sticker-card { border-radius: 24px; }
      `}</style>
      
      {/* Header */}
      <header className="flex justify-between items-end mb-stack-lg border-b-[1.5px] border-ink-black pb-stack-sm">
        <div>
          <h2 className="font-display-lg text-display-lg text-ink-black mb-2">Community Feed</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">A safe space to share, reflect, and support one another anonymously.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/community/new')}
            className="hidden md:flex bg-primary text-on-primary font-label-bold text-label-bold py-3 px-6 rounded-xl neo-border neo-shadow neo-active transition-all items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">edit_square</span>
            Post Anonymously
          </button>
          
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">search</span>
            <input className="pl-10 pr-4 py-3 bg-[#f9f8f3] rounded-xl neo-border focus:border-primary focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none transition-all font-body-md text-body-md" placeholder="Search posts..." type="text"/>
          </div>
        </div>
      </header>

      {/* Filters (Chips) */}
      <div className="flex flex-wrap gap-3 mb-stack-lg">
        {filters.map(f => (
          <button 
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-6 py-2 rounded-full neo-border font-label-bold text-label-bold transition-all ${filter === f.id ? 'bg-primary text-on-primary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] neo-active' : 'bg-surface-bright text-on-surface hover:bg-accent-sage'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Bento Grid Feed */}
      {loading ? (
        <div className="flex justify-center items-center h-40"><span className="material-symbols-outlined animate-spin text-4xl text-primary">autorenew</span></div>
      ) : posts.length === 0 ? (
        <div className="text-center p-8 bg-white neo-border rounded-3xl">No posts found. Be the first to share!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-md">
          {posts.map((post, i) => (
            <article key={post.id} className={`col-span-1 md:col-span-12 lg:col-span-${i === 0 ? '8' : i === 1 ? '4' : '6'} bg-surface-bright sticker-card neo-border p-container-padding flex flex-col gap-4 relative overflow-hidden`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent-sage flex items-center justify-center neo-border">
                    <span className="material-symbols-outlined text-primary">psychology</span>
                  </div>
                  <div>
                    <span className="font-label-bold text-label-bold text-ink-black block">{post.is_anonymous ? 'Anonymous' : 'User'}</span>
                    <span className="font-label-md text-label-md text-on-surface-variant">{new Date(post.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant flex-1 whitespace-pre-wrap">{post.content}</p>
              
              <div className="flex gap-4 mt-4 border-t-[1.5px] border-ink-black pt-4">
                <button onClick={() => handleInteract(post.id, 'hug')} className="flex items-center gap-2 text-primary font-label-bold text-label-bold hover:bg-primary-fixed rounded-full px-4 py-2 transition-colors">
                  <span className="material-symbols-outlined">favorite</span>
                  <span>{post.hugs || 0} Hugs</span>
                </button>
                <button onClick={() => handleInteract(post.id, 'relate')} className="flex items-center gap-2 text-on-surface-variant font-label-bold text-label-bold hover:bg-surface-variant rounded-full px-4 py-2 transition-colors">
                  <span className="material-symbols-outlined">handshake</span>
                  <span>{post.relates || 0} Relates</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      
      {/* Mobile Post Button */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <button 
          onClick={() => navigate('/community/new')}
          className="w-14 h-14 bg-primary text-on-primary rounded-full neo-border neo-shadow flex items-center justify-center neo-active"
        >
          <span className="material-symbols-outlined">edit_square</span>
        </button>
      </div>
    </div>
  );
};

export default CommunityFeed;
