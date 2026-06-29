// src/components/normal_users/Profile.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config/apiConfig';
import styles from './Profile.module.css';
import { toast } from 'react-toastify';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [reviewingBooking, setReviewingBooking] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();

  // Mock booking history
  const [bookings, setBookings] = useState([
    { id: 1, date: '2023-10-15', counsellor: 'Dr. Jane Smith', type: 'Video Session', status: 'Completed', review: null },
    { id: 2, date: '2023-11-02', counsellor: 'Dr. Alan Wake', type: 'Chat Session', status: 'Completed', review: null },
    { id: 3, date: '2023-12-10', counsellor: 'Sarah Connor', type: 'Voice Session', status: 'Upcoming', review: null }
  ]);

  const handleSubmitReview = () => {
    setBookings(bookings.map(b => 
      b.id === reviewingBooking.id 
        ? { ...b, review: { rating, text: reviewText } } 
        : b
    ));
    setReviewingBooking(null);
    setReviewText('');
    setRating(5);
    toast.success('Review submitted successfully!');
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get(`${BASE_URL}/user/dashboard/profile`, { headers });
      setProfileData(response.data);
      setEditableData(response.data);
    } catch (err) {
      setError('Failed to fetch profile data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditableData({...profileData});
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData({
      ...editableData,
      [name]: value
    });
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      
      setEditableData({
        ...editableData,
        profile_pic: file,
        profile_pic_preview: previewUrl
      });
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      
      // Don't set Content-Type header when sending FormData
      // Axios will automatically set the correct Content-Type with boundary
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // Create FormData object to match backend expectations
      const formData = new FormData();
      
      // Add fields to FormData exactly as expected by the backend
      if (editableData.name) formData.append('name', editableData.name);
      if (editableData.phone_number) formData.append('phone_number', editableData.phone_number);
      if (editableData.gender) formData.append('gender', editableData.gender);
      
      // Handle arrays by joining with commas
      if (editableData.preferred_languages) {
        const languages = Array.isArray(editableData.preferred_languages) 
          ? editableData.preferred_languages.join(',') 
          : editableData.preferred_languages;
        formData.append('preferred_languages', languages);
      }
      
      if (editableData.primary_concerns) {
        const concerns = Array.isArray(editableData.primary_concerns) 
          ? editableData.primary_concerns.join(',') 
          : editableData.primary_concerns;
        formData.append('primary_concerns', concerns);
      }
      
      // Add address fields
      if (editableData.country) formData.append('country', editableData.country);
      if (editableData.state) formData.append('state', editableData.state);
      if (editableData.city) formData.append('city', editableData.city);
      if (editableData.address) formData.append('address', editableData.address);
      if (editableData.pincode) formData.append('pincode', editableData.pincode);
      
      // If there's a profile picture file, add it
      if (editableData.profile_pic && editableData.profile_pic instanceof File) {
        formData.append('profile_pic', editableData.profile_pic);
      }
      
      // Log what we're sending for debugging
      console.log('Sending form data with fields:', 
        Array.from(formData.entries()).map(([key, value]) => key)
      );
      
      // Use PATCH method with FormData
      await axios.patch(`${BASE_URL}/user/dashboard/profile`, formData, { headers });
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      fetchProfileData(); // Refresh data from server
    } catch (err) {
      // Get detailed error information
      const errorMessage = err.response?.data?.detail || 'Failed to update profile';
      toast.error(errorMessage);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== profileData.email) {
      toast.error('Email confirmation does not match');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      await axios.delete(`${BASE_URL}/user/dashboard/profile`, { headers });
      
      // Clear local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userType');
      
      toast.success('Account deleted successfully');
      navigate('/');
    } catch (err) {
      toast.error('Failed to delete account');
      console.error(err);
    } finally {
      setLoading(false);
      setIsDeleting(false);
    }
  };

  if (loading && !profileData) return <div className={styles.loadingContainer}><div className={styles.loading}>Loading profile...</div></div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!profileData) return <div className={styles.noData}>No profile data available</div>;

  const {
    name,
    email,
    gender,
    phone_number,
    profile_pic,
    preferred_languages,
    primary_concerns,
    country,
    state,
    city,
    address,
    pincode,
    is_email_verified,
    is_phone_verified,
    terms_accepted,
    privacy_policy_accepted,
    last_login_at,
    total_sessions_attended,
    created_at,
  } = isEditing ? editableData : profileData;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>My Profile</h2>
        <div className={styles.actions}>
          {!isEditing && !isDeleting && (
            <>
              <button 
                className={`${styles.actionButton} ${styles.editButton}`} 
                onClick={handleEditToggle}
              >
                Edit Profile
              </button>
              <button 
                className={`${styles.actionButton} ${styles.deleteButton}`} 
                onClick={() => setIsDeleting(true)}
              >
                Delete Account
              </button>
            </>
          )}
          {isEditing && (
            <>
              <button 
                className={`${styles.actionButton} ${styles.saveButton}`} 
                onClick={handleSaveProfile}
              >
                Save Changes
              </button>
              <button 
                className={`${styles.actionButton} ${styles.cancelButton}`} 
                onClick={handleEditToggle}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {isDeleting ? (
        <div className={styles.deleteConfirmation}>
          <h3>Delete Account</h3>
          <p>This action cannot be undone. All your data will be permanently deleted.</p>
          <p>Please type your email <strong>{email}</strong> to confirm:</p>
          <input
            type="text"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
            className={styles.confirmationInput}
            placeholder="Enter your email"
          />
          <div className={styles.deleteActions}>
            <button 
              className={`${styles.actionButton} ${styles.deleteConfirmButton}`} 
              onClick={handleDeleteAccount}
            >
              Confirm Delete
            </button>
            <button 
              className={`${styles.actionButton} ${styles.cancelButton}`} 
              onClick={() => {
                setIsDeleting(false);
                setDeleteConfirmation('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.profileContent}>
          <div className={styles.profileHeader}>
            <div className={styles.profileImageContainer}>
              {isEditing && editableData.profile_pic_preview ? (
                <img
                  src={editableData.profile_pic_preview}
                  alt={`${name}'s profile preview`}
                  className={styles.profilePic}
                />
              ) : profile_pic ? (
                <img
                  src={profile_pic}
                  alt={`${name}'s profile`}
                  className={styles.profilePic}
                />
              ) : (
                <div className={styles.profileInitial}>
                  {name ? name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              {isEditing && (
                <label htmlFor="profile-pic-upload" className={styles.uploadOverlay}>
                  <span>Change Photo</span>
                  <input
                    id="profile-pic-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
              )}
            </div>
            <div className={styles.profileHeaderInfo}>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={name || ''}
                  onChange={handleInputChange}
                  className={styles.editInput}
                  placeholder="Your Name"
                />
              ) : (
                <h3 className={styles.userName}>{name}</h3>
              )}
              <p className={styles.userEmail}>{email}</p>
              <p className={styles.userLocation}>
                {city && state && country ? `${city}, ${state}, ${country}` : 'Location not specified'}
              </p>
            </div>
          </div>

          <div className={styles.profileGrid}>
            <div className={styles.profileCard}>
              <h4>Personal Information</h4>
              <div className={styles.cardContent}>
                <div className={styles.fieldGroup}>
                  <label>Email</label>
                  <p>{email}</p>
                </div>
                <div className={styles.fieldGroup}>
                  <label>Gender</label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={gender || ''}
                      onChange={handleInputChange}
                      className={styles.editInput}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p>{gender || 'Not specified'}</p>
                  )}
                </div>
                <div className={styles.fieldGroup}>
                  <label>Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone_number"
                      value={phone_number || ''}
                      onChange={handleInputChange}
                      className={styles.editInput}
                      placeholder="Phone Number"
                    />
                  ) : (
                    <p>{phone_number || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.profileCard}>
              <h4>Address</h4>
              <div className={styles.cardContent}>
                {isEditing ? (
                  <>
                    <div className={styles.fieldGroup}>
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        value={address || ''}
                        onChange={handleInputChange}
                        className={styles.editInput}
                        placeholder="Address"
                      />
                    </div>
                    <div className={styles.fieldRow}>
                      <div className={styles.fieldGroup}>
                        <label>City</label>
                        <input
                          type="text"
                          name="city"
                          value={city || ''}
                          onChange={handleInputChange}
                          className={styles.editInput}
                          placeholder="City"
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label>State</label>
                        <input
                          type="text"
                          name="state"
                          value={state || ''}
                          onChange={handleInputChange}
                          className={styles.editInput}
                          placeholder="State"
                        />
                      </div>
                    </div>
                    <div className={styles.fieldRow}>
                      <div className={styles.fieldGroup}>
                        <label>Country</label>
                        <input
                          type="text"
                          name="country"
                          value={country || ''}
                          onChange={handleInputChange}
                          className={styles.editInput}
                          placeholder="Country"
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label>Pincode</label>
                        <input
                          type="text"
                          name="pincode"
                          value={pincode || ''}
                          onChange={handleInputChange}
                          className={styles.editInput}
                          placeholder="Pincode"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.fieldGroup}>
                      <label>Full Address</label>
                      <p>{address || 'Not provided'}</p>
                    </div>
                    <div className={styles.fieldGroup}>
                      <label>City, State, Country</label>
                      <p>{city && state && country ? `${city}, ${state}, ${country}` : 'Not provided'}</p>
                    </div>
                    <div className={styles.fieldGroup}>
                      <label>Pincode</label>
                      <p>{pincode || 'Not provided'}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={styles.profileCard}>
              <h4>Preferences</h4>
              <div className={styles.cardContent}>
                <div className={styles.fieldGroup}>
                  <label>Preferred Languages</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="preferred_languages"
                      value={(preferred_languages || []).join(', ')}
                      onChange={(e) => {
                        const languages = e.target.value.split(',').map(lang => lang.trim());
                        setEditableData({
                          ...editableData,
                          preferred_languages: languages
                        });
                      }}
                      className={styles.editInput}
                      placeholder="Languages (comma separated)"
                    />
                  ) : (
                    <p>{(preferred_languages || []).join(', ') || 'None specified'}</p>
                  )}
                </div>
                <div className={styles.fieldGroup}>
                  <label>Primary Concerns</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="primary_concerns"
                      value={(primary_concerns || []).join(', ')}
                      onChange={(e) => {
                        const concerns = e.target.value.split(',').map(concern => concern.trim());
                        setEditableData({
                          ...editableData,
                          primary_concerns: concerns
                        });
                      }}
                      className={styles.editInput}
                      placeholder="Concerns (comma separated)"
                    />
                  ) : (
                    <p>{(primary_concerns || []).join(', ') || 'None specified'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.profileCard}>
              <h4>Account Information</h4>
              <div className={styles.cardContent}>
                <div className={styles.fieldGroup}>
                  <label>Email Verified</label>
                  <p className={is_email_verified ? styles.verified : styles.notVerified}>
                    {is_email_verified ? 'Yes' : 'No'}
                  </p>
                </div>
                <div className={styles.fieldGroup}>
                  <label>Phone Verified</label>
                  <p className={is_phone_verified ? styles.verified : styles.notVerified}>
                    {is_phone_verified ? 'Yes' : 'No'}
                  </p>
                </div>
                <div className={styles.fieldGroup}>
                  <label>Joined On</label>
                  <p>{new Date(created_at).toLocaleDateString()}</p>
                </div>
                <div className={styles.fieldGroup}>
                  <label>Last Login</label>
                  <p>{new Date(last_login_at).toLocaleString()}</p>
                </div>
                <div className={styles.fieldGroup}>
                  <label>Sessions Attended</label>
                  <p>{total_sessions_attended}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.historySection}>
            <div className={`sticker-container ${styles.profileCard}`} style={{marginTop: '2rem', width: '100%'}}>
              <h4>Booking History & Reviews</h4>
              <div className={styles.bookingList}>
                {bookings.map(booking => (
                  <div key={booking.id} className={styles.bookingItem}>
                    <div>
                      <strong>{booking.counsellor}</strong> - {booking.date}
                      <p style={{margin: '4px 0', fontSize: '14px', color: 'var(--color-on-surface-variant)'}}>{booking.type} • {booking.status}</p>
                      {booking.review && (
                        <p style={{fontSize: '14px', fontStyle: 'italic', color: 'var(--color-primary)'}}>
                          You rated {booking.review.rating}/5 - "{booking.review.text}"
                        </p>
                      )}
                    </div>
                    {booking.status === 'Completed' && !booking.review && (
                      <button 
                        className="btn-primary" 
                        onClick={() => setReviewingBooking(booking)}
                      >
                        Leave a Review
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewingBooking && (
        <div className={styles.modalOverlay}>
          <div className={`sticker-container ${styles.modalContent}`}>
            <h3>Leave a Review for {reviewingBooking.counsellor}</h3>
            <div className={styles.fieldGroup}>
              <label>Rating (1-5)</label>
              <select 
                className={styles.editInput} 
                value={rating} 
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value={5}>5 - Excellent</option>
                <option value={4}>4 - Very Good</option>
                <option value={3}>3 - Average</option>
                <option value={2}>2 - Poor</option>
                <option value={1}>1 - Terrible</option>
              </select>
            </div>
            <div className={styles.fieldGroup} style={{marginTop: '1rem'}}>
              <label>Comments</label>
              <textarea 
                className={styles.editInput} 
                rows="4" 
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="How was your experience?"
              ></textarea>
            </div>
            <div style={{display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end'}}>
              <button className="btn-secondary" onClick={() => setReviewingBooking(null)}>Cancel</button>
              <button className="btn-primary" onClick={handleSubmitReview}>Submit Review</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
