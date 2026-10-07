import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const TherapistReviews = () => {
  const navigate = useNavigate();
  const { counsellorId } = useParams();
  const [counsellor, setCounsellor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, author: '', content: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let activeId = counsellorId;

        // If no ID passed in URL, fetch list of counsellors and take first
        if (!activeId) {
          const listRes = await axiosInstance.get('/content/counsellors');
          const list = listRes.data?.counsellors || [];
          if (list.length > 0) {
            activeId = list[0].user_id;
            setCounsellor(list[0]);
          }
        } else {
          const cRes = await axiosInstance.get(`/content/counsellors/${activeId}`);
          setCounsellor(cRes.data);
        }

        if (activeId) {
          const revRes = await axiosInstance.get(`/content/counsellors/${activeId}/reviews`);
          if (Array.isArray(revRes.data)) {
            setReviews(revRes.data);
          }
        }
      } catch (err) {
        console.error('Error fetching counsellor reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [counsellorId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.content.trim()) return;
    const targetId = counsellorId || counsellor?.user_id;
    if (!targetId) return;

    try {
      setSubmitting(true);
      await axiosInstance.post(`/content/counsellors/${targetId}/reviews`, newReview);
      setShowModal(false);
      setNewReview({ rating: 5, author: '', content: '' });
      // Refresh reviews
      const revRes = await axiosInstance.get(`/content/counsellors/${targetId}/reviews`);
      if (Array.isArray(revRes.data)) {
        setReviews(revRes.data);
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = counsellor?.average_rating || (reviews.length > 0 ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1) : '5.0');
  const totalReviewsCount = reviews.length;

  return (
    <div className="flex-1 min-h-screen px-4 md:px-margin-desktop py-10 max-w-[1400px] mx-auto bg-background text-on-surface font-body-md overflow-x-hidden">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="flex items-center gap-6 md:gap-8">
          <button onClick={() => navigate(-1)} className="md:hidden p-2 bg-surface-container rounded-full flex shrink-0">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl border border-stone-300 shadow-subtle overflow-hidden bg-primary text-on-primary flex items-center justify-center text-3xl font-bold shrink-0">
            {counsellor?.name ? counsellor.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'DR'}
          </div>
          
          <div>
            <nav className="flex flex-wrap gap-2 mb-2 md:mb-4">
              <span className="bg-accent-sage text-on-surface border border-stone-200 px-3 py-1 rounded-full text-xs font-label-bold">
                {counsellor?.specializations || 'Clinical Psychologist'}
              </span>
              <span className="bg-surface text-on-surface border border-stone-200 px-3 py-1 rounded-full text-xs font-label-bold">
                {counsellor?.experience_years ? `${counsellor.experience_years} Years Experience` : 'Certified Practitioner'}
              </span>
            </nav>
            <h2 className="font-display-lg text-primary text-3xl md:text-4xl mb-1">
              {counsellor?.name || 'Licensed Counsellor'}
            </h2>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-bold text-on-surface">{avgRating}</span>
              <span className="text-sm font-label-bold">• {totalReviewsCount} Verified Reviews</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-on-primary font-label-bold py-4 px-8 rounded-full border border-black shadow-subtle active:scale-[0.98] transition-all shrink-0"
        >
          <span className="material-symbols-outlined">rate_review</span>
          Write a Review
        </button>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Rating Breakdown */}
        <section className="col-span-1 lg:col-span-4 lg:sticky lg:top-10 h-fit mb-8 lg:mb-0">
          <div className="bg-white border border-stone-200 rounded-xl p-6">
            <h3 className="font-headline-sm text-on-surface mb-6">Patient Feedback</h3>
            <div className="space-y-4">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter((r) => r.rating === star).length;
                const pct = totalReviewsCount > 0 ? Math.round((count / totalReviewsCount) * 100) : star === 5 ? 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="w-4 text-xs font-bold">{star}</span>
                    <span className="material-symbols-outlined text-amber-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
                      <div className="bg-primary h-full transition-all" style={{ width: `${pct}%` }}></div>
                    </div>
                    <span className="w-8 text-right text-xs text-on-surface-variant">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Reviews List */}
        <main className="col-span-1 lg:col-span-8 space-y-6">
          {loading ? (
            <div className="py-12 text-center text-on-surface-variant">Loading verified reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-xl p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">forum</span>
              <p className="font-bold text-base mb-1">No reviews yet</p>
              <p className="text-xs text-on-surface-variant mb-4">Be the first to share your experience with this counsellor.</p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary text-on-primary text-xs font-bold px-6 py-2.5 rounded-full"
              >
                Write Review
              </button>
            </div>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-sm text-ink-black">{rev.author}</h4>
                    <div className="flex items-center gap-1 text-amber-500 text-xs mt-0.5">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-on-surface-variant">
                    {rev.created_at ? new Date(rev.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Verified Session'}
                  </span>
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">{rev.content}</p>
              </div>
            ))
          )}
        </main>
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-stone-300 shadow-dialog">
            <h3 className="font-headline-sm text-xl mb-4 text-ink-black">Share Your Experience</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">Your Name or Alias</label>
                <input
                  type="text"
                  placeholder="e.g. Priya M."
                  required
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: num })}
                      className={`flex-1 py-2 rounded-lg border text-sm font-bold transition-all ${
                        newReview.rating >= num ? 'bg-amber-100 border-amber-400 text-amber-900' : 'border-stone-200'
                      }`}
                    >
                      ★ {num}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">Your Review</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your session, techniques used, and how it helped..."
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-black resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Post Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TherapistReviews;
