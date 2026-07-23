import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TherapistReviews = () => {
  const navigate = useNavigate();
  const { counsellorId } = useParams();

  const reviews = [
    {
      id: 1,
      author: "Michael R.",
      time: "2 days ago",
      rating: 5,
      content: "Dr. Jenkins has been instrumental in helping me manage my social anxiety. Her approach is very practical and she provides actionable steps to take between sessions. I feel more confident than I have in years. Highly recommend her for anyone struggling with similar issues.",
      helpfulCount: 12,
      avatarBg: "bg-secondary-fixed",
      avatarImage: null // Use initials if no image
    },
    {
      id: 2,
      author: "Elena V.",
      time: "1 week ago",
      rating: 4,
      content: "Very professional and empathetic. She really takes the time to listen and doesn't rush through the session. The initial intake process was smooth, and her office (even virtually) feels like a safe space.",
      helpfulCount: 8,
      avatarBg: "bg-accent-orange",
      avatarImage: null
    },
    {
      id: 3,
      author: "Anita K.",
      time: "2 weeks ago",
      rating: 5,
      content: "I've seen several therapists over the years, and Dr. Sarah is by far the most attentive. She remembers small details from previous sessions which makes me feel truly heard and valued. The CBT exercises she assigned were life-changing for my daily routine.",
      helpfulCount: 24,
      avatarBg: "bg-accent-sage",
      avatarImage: null
    }
  ];

  return (
    <div className="flex-1 min-h-screen px-4 md:px-margin-desktop py-10 max-w-[1400px] mx-auto bg-cream-bg text-on-surface font-body-md overflow-x-hidden">
      <style>{`
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; vertical-align: middle; }
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1); }
        .neo-shadow-sm { box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 1); }
        .active-press:active { transform: translate(2px, 2px); box-shadow: none; }
      `}</style>
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="flex items-center gap-6 md:gap-8">
          <button onClick={() => navigate(-1)} className="md:hidden p-2 bg-surface-container rounded-full flex shrink-0">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] border-[1.5px] border-on-surface neo-shadow overflow-hidden bg-accent-pink flex items-center justify-center text-4xl font-bold shrink-0">
            {/* Real app would fetch image based on counsellorId */}
            SJ
          </div>
          
          <div>
            <nav className="flex flex-wrap gap-2 mb-2 md:mb-4">
              <span className="bg-accent-sage text-on-surface border-[1.5px] border-on-surface px-3 py-1 rounded-full text-xs font-label-bold">Clinical Psychologist</span>
              <span className="bg-accent-pink text-on-surface border-[1.5px] border-on-surface px-3 py-1 rounded-full text-xs font-label-bold">CBT Specialist</span>
            </nav>
            <h2 className="font-display-lg text-primary text-3xl md:text-4xl mb-1">Dr. Sarah Jenkins</h2>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-bold text-on-surface">4.8</span>
              <span className="text-sm font-label-bold">• 128 Reviews</span>
            </div>
          </div>
        </div>
        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-on-primary font-label-bold py-4 px-8 rounded-full border-[1.5px] border-on-surface neo-shadow active-press transition-all shrink-0">
          <span className="material-symbols-outlined">rate_review</span>
          Write a Review
        </button>
      </header>

      {/* Main Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        
        {/* Rating Breakdown Card */}
        <section className="col-span-1 lg:col-span-4 lg:sticky lg:top-10 h-fit mb-8 lg:mb-0">
          <div className="bg-white border-[1.5px] border-on-surface rounded-[40px] p-container-padding">
            <h3 className="font-headline-sm text-on-surface mb-8">Rating Breakdown</h3>
            <div className="space-y-6">
              
              {/* Star Rows */}
              {[
                { star: 5, pct: 75, width: '75%' },
                { star: 4, pct: 15, width: '15%' },
                { star: 3, pct: 6, width: '6%' },
                { star: 2, pct: 2, width: '2%' },
                { star: 1, pct: 2, width: '2%' }
              ].map((row) => (
                <div key={row.star} className="flex items-center gap-4">
                  <span className="w-4 font-label-bold">{row.star}</span>
                  <span className="material-symbols-outlined text-secondary-container text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <div className="flex-1 h-3 bg-surface-container rounded-full border-[1.5px] border-on-surface overflow-hidden">
                    <div className="bg-primary h-full transition-all" style={{ width: row.width }}></div>
                  </div>
                  <span className="w-10 text-right text-xs font-label-bold">{row.pct}%</span>
                </div>
              ))}
              
            </div>
            
            <div className="mt-10 p-6 bg-accent-sage/30 rounded-3xl border-[1.5px] border-dashed border-on-surface">
              <p className="text-sm italic text-on-surface-variant leading-relaxed">
                "Dr. Jenkins is highly recommended for anxiety management. 92% of her patients report significant progress within 4 sessions."
              </p>
            </div>
          </div>
        </section>

        {/* User Reviews List */}
        <section className="col-span-1 lg:col-span-8 space-y-gutter">
          
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white border-[1.5px] border-on-surface rounded-3xl sm:rounded-full px-6 py-3 gap-4">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 w-full sm:w-auto">
              <button className="bg-secondary-container border-[1.5px] border-on-surface px-4 py-1.5 rounded-full text-xs font-label-bold neo-shadow-sm active-press">Most Recent</button>
              <button className="hover:bg-surface-container px-4 py-1.5 rounded-full text-xs font-label-bold transition-colors">Highest Rated</button>
              <button className="hover:bg-surface-container px-4 py-1.5 rounded-full text-xs font-label-bold transition-colors">Critical</button>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto bg-surface-container-low sm:bg-transparent rounded-full px-4 sm:px-0 py-2 sm:py-0 border-[1.5px] border-ink-black sm:border-none">
              <span className="material-symbols-outlined text-on-surface-variant">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm font-label-bold w-full sm:w-48 outline-none" placeholder="Search reviews..." type="text"/>
            </div>
          </div>
          
          {/* Review Cards */}
          {reviews.map((review) => (
            <article key={review.id} className="bg-white border-[1.5px] border-on-surface rounded-[32px] p-6 md:p-8 neo-shadow transition-transform hover:-translate-y-1">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full border-[1.5px] border-on-surface overflow-hidden flex items-center justify-center font-bold text-lg ${review.avatarBg}`}>
                    {review.avatarImage ? (
                      <img src={review.avatarImage} alt={review.author} className="w-full h-full object-cover" />
                    ) : (
                      review.author.charAt(0)
                    )}
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-lg">{review.author}</h4>
                    <p className="text-on-surface-variant text-sm font-label-bold">{review.time}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`material-symbols-outlined ${star <= review.rating ? 'text-secondary-container' : 'text-outline'}`} style={{ fontVariationSettings: star <= review.rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                  ))}
                </div>
              </div>
              <p className="text-body-lg text-on-surface mb-6 leading-relaxed">
                {review.content}
              </p>
              <div className="flex items-center gap-6 border-t-[1.5px] border-surface-container pt-6">
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-bold text-sm">
                  <span className="material-symbols-outlined text-xl">thumb_up</span> Helpful ({review.helpfulCount})
                </button>
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-bold text-sm">
                  <span className="material-symbols-outlined text-xl">reply</span> Reply
                </button>
              </div>
            </article>
          ))}
          
          {/* Load More */}
          <div className="flex justify-center pt-6 lg:pt-10 pb-20">
            <button className="flex items-center gap-3 bg-white text-on-surface font-label-bold py-4 px-8 md:px-12 rounded-full border-[1.5px] border-on-surface neo-shadow active-press transition-all">
              Load More Reviews
              <span className="material-symbols-outlined">expand_more</span>
            </button>
          </div>
          
        </section>
      </div>
    </div>
  );
};

export default TherapistReviews;
