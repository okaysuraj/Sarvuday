import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const PostCreation = () => {
  const navigate = useNavigate();
  const [alias, setAlias] = useState('bunny');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [allowComments, setAllowComments] = useState(true);
  const [incognito, setIncognito] = useState(false);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    try {
      await axiosInstance.post('/community/posts', {
        content,
        is_anonymous: incognito,
        has_trigger_warning: false,
        group_id: "" // For general feed
      });
      toast.success("Post created successfully!");
      navigate('/community');
    } catch (error) {
      console.error("Failed to create post", error);
      toast.error("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cream-bg text-on-surface font-body-md h-screen flex flex-col overflow-hidden">
      <style>{`
        .hard-shadow { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
        .hard-shadow-sm { box-shadow: 2px 2px 0px 0px rgba(0,0,0,1); }
        .active-sink:active { transform: translate(2px, 2px); box-shadow: none; }
        .active-sink-sm:active { transform: translate(1px, 1px); box-shadow: none; }
      `}</style>
      
      {/* Top Navigation */}
      <header className="flex justify-between items-center w-full px-8 h-20 bg-surface border-b-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0 z-50">
        <div className="font-headline-md text-headline-md font-bold text-primary">SerenityPath</div>
        <button onClick={() => navigate(-1)} className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined">close</span>
          Cancel
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full overflow-y-auto px-4 md:px-8 py-12 flex justify-center">
        <div className="max-w-3xl w-full flex flex-col gap-8 pb-12">
          
          {/* Header Section */}
          <div className="text-center mb-4">
            <h1 className="font-display-lg text-display-lg text-ink-black mb-2">Share Anonymously</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Your story matters. Share it in a safe, judgment-free space.</p>
          </div>
          
          {/* Guidelines Card */}
          <div className="bg-accent-sage border-[1.5px] border-ink-black rounded-[24px] p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-ink-black" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
              <h2 className="font-headline-sm text-headline-sm text-ink-black">Community Guidelines</h2>
            </div>
            <ul className="list-disc list-inside font-body-md text-body-md text-ink-black space-y-2 ml-2">
              <li>Be respectful and supportive of others' experiences.</li>
              <li>Avoid sharing personally identifiable information (PII).</li>
              <li>Do not post content that promotes self-harm or violence.</li>
              <li>Remember, this is a safe space for healing and connection.</li>
            </ul>
          </div>
          
          {/* Editor Section */}
          <form onSubmit={handlePost} className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-8 flex flex-col gap-8">
            
            {/* Alias Selection */}
            <div>
              <label className="block font-label-bold text-label-bold text-ink-black mb-3">Choose an Alias</label>
              <div className="flex flex-wrap gap-3">
                <button 
                  type="button"
                  onClick={() => setAlias('bunny')}
                  className={`border-[1.5px] border-ink-black rounded-full px-4 py-2 font-label-md text-label-md flex items-center gap-2 transition-colors ${alias === 'bunny' ? 'bg-primary-container text-on-primary-container hard-shadow-sm active-sink-sm' : 'bg-surface text-ink-black hover:bg-surface-variant'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">cruelty_free</span> Friendly Bunny
                </button>
                <button 
                  type="button"
                  onClick={() => setAlias('flower')}
                  className={`border-[1.5px] border-ink-black rounded-full px-4 py-2 font-label-md text-label-md flex items-center gap-2 transition-colors ${alias === 'flower' ? 'bg-primary-container text-on-primary-container hard-shadow-sm active-sink-sm' : 'bg-surface text-ink-black hover:bg-surface-variant'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">local_florist</span> Wild Flower
                </button>
                <button 
                  type="button"
                  onClick={() => setAlias('cloud')}
                  className={`border-[1.5px] border-ink-black rounded-full px-4 py-2 font-label-md text-label-md flex items-center gap-2 transition-colors ${alias === 'cloud' ? 'bg-primary-container text-on-primary-container hard-shadow-sm active-sink-sm' : 'bg-surface text-ink-black hover:bg-surface-variant'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">cloud</span> Gentle Cloud
                </button>
              </div>
            </div>
            
            {/* Text Area */}
            <div>
              <label className="block font-label-bold text-label-bold text-ink-black mb-3" htmlFor="postContent">Your Story</label>
              <textarea 
                id="postContent" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-4 font-body-md text-body-md text-ink-black focus:outline-none focus:border-primary focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] resize-none transition-all" 
                placeholder="What's on your mind today?" 
                rows="6"
              ></textarea>
            </div>
            
            {/* Toggles */}
            <div className="flex flex-col gap-4 bg-surface-container-low rounded-xl p-4 border-[1.5px] border-ink-black">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex flex-col">
                  <span className="font-label-bold text-label-bold text-ink-black">Allow Comments</span>
                  <span className="font-body-md text-body-md text-on-surface-variant text-[14px]">Let the community respond to your post.</span>
                </div>
                <div className="relative">
                  <input type="checkbox" checked={allowComments} onChange={() => setAllowComments(!allowComments)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border-[1.5px] border-ink-black"></div>
                </div>
              </label>
              
              <hr className="border-ink-black/20" />
              
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex flex-col">
                  <span className="font-label-bold text-label-bold text-ink-black">Incognito Mode</span>
                  <span className="font-body-md text-body-md text-on-surface-variant text-[14px]">Hide your alias entirely for this post.</span>
                </div>
                <div className="relative">
                  <input type="checkbox" checked={incognito} onChange={() => setIncognito(!incognito)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border-[1.5px] border-ink-black"></div>
                </div>
              </label>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-4">
              <button type="button" className="bg-surface text-ink-black border-[1.5px] border-ink-black rounded-lg px-6 py-3 font-label-bold text-label-bold hover:bg-surface-variant transition-colors active-sink-sm">
                Save Draft
              </button>
              <button type="submit" disabled={!content.trim() || isSubmitting} className="bg-primary text-white border-[1.5px] border-ink-black rounded-lg px-8 py-3 font-label-bold text-label-bold flex items-center gap-2 hard-shadow active-sink transition-all disabled:opacity-50 disabled:active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:active:translate-y-0">
                {isSubmitting ? 'Posting...' : 'Post Anonymously'}
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </div>
            
          </form>
        </div>
      </main>
    </div>
  );
};

export default PostCreation;
