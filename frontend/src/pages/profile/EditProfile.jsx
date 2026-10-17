import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';
import { profilePath, useSession } from '../../utils/session';

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone_number: '',
    bio: '',
  });

  const userType = useSession()?.userType;
  const endpoint = profilePath(userType);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(endpoint);
      setProfileData({
        name: res.data.name || '',
        email: res.data.email || '',
        phone_number: res.data.phone_number || '',
        bio: res.data.bio || '', // bio might not exist on all models, gracefully fallback
      });
    } catch (err) {
      console.error('Failed to load profile', err);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = new FormData();
      for (const key of ['name', 'phone_number', 'bio'])
        payload.append(key, profileData[key] || '');
      await axiosInstance.patch(endpoint, payload);
      toast.success('Profile updated successfully');
      navigate('/profile');
    } catch (err) {
      console.error('Failed to update profile', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">
          autorenew
        </span>
      </div>
    );
  }

  return (
    <div className="flex-1 py-12 px-6 md:px-10 max-w-4xl mx-auto w-full">
      <div className="mb-12">
        <h2 className="font-headline-md text-3xl font-bold text-ink-black">Edit Profile</h2>
        <p className="text-on-surface-variant font-body-lg">
          Keep your information up to date to get the best experience.
        </p>
      </div>

      <div className="bg-white border-outline rounded-xl p-8 md:p-12 relative overflow-hidden shadow-subtle">
        <div className="flex flex-col items-center mb-12">
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-full border-outline overflow-hidden bg-surface flex items-center justify-center text-4xl font-bold text-ink-black">
              {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full border-outline flex items-center justify-center shadow-subtle hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            </div>
          </div>
          <p className="mt-4 font-label-bold text-label-bold text-primary cursor-pointer hover:underline">
            Change Profile Picture
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label
                className="font-label-bold text-label-bold text-on-surface block"
                htmlFor="full-name"
              >
                Full Name
              </label>
              <input
                id="full-name"
                type="text"
                className="w-full bg-[#f9f8f3] border-outline rounded-xl px-4 py-3 text-body-md transition-all focus:ring-0 focus:border-primary focus:shadow-subtle"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label
                className="font-label-bold text-label-bold text-on-surface block"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                disabled
                className="w-full bg-[#e4e1e8] border-outline rounded-xl px-4 py-3 text-body-md transition-all opacity-70 cursor-not-allowed"
                value={profileData.email}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label
                className="font-label-bold text-label-bold text-on-surface block"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full bg-[#f9f8f3] border-outline rounded-xl px-4 py-3 text-body-md transition-all focus:ring-0 focus:border-primary focus:shadow-subtle"
                value={profileData.phone_number}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    phone_number: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label
                className="font-label-bold text-label-bold text-on-surface block"
                htmlFor="timezone"
              >
                Timezone
              </label>
              <select
                className="w-full bg-[#f9f8f3] border-outline rounded-xl px-4 py-3 text-body-md focus:ring-0 focus:border-primary focus:shadow-subtle"
                id="timezone"
              >
                <option>Pacific Time (PT)</option>
                <option>Eastern Time (ET)</option>
                <option>Greenwich Mean Time (GMT)</option>
              </select>
            </div>
          </div>

          {userType === 'counsellor' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  className="font-label-bold text-label-bold text-on-surface block"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <span className="text-label-md text-on-surface-variant">
                  {profileData.bio?.length || 0} / 300
                </span>
              </div>
              <textarea
                id="bio"
                rows="4"
                maxLength="300"
                className="w-full bg-[#f9f8f3] border-outline rounded-xl px-4 py-3 text-body-md transition-all resize-none focus:ring-0 focus:border-primary focus:shadow-subtle"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center gap-6 pt-6">
            <button
              type="submit"
              disabled={saving}
              className="w-full md:w-auto px-10 py-3 bg-primary text-white border-outline shadow-subtle font-bold rounded-xl active:scale-[0.98] transition-all disabled:opacity-70"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full md:w-auto px-10 py-3 bg-accent-sage text-ink-black border-outline font-bold rounded-xl hover:bg-surface-variant transition-colors active:translate-x-0.5 active:translate-y-0.5"
            >
              Discard Edits
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
