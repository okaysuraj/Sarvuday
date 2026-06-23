// src/components/counsellors/Profile.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config/apiConfig';
import styles from './Profile.module.css';
import { toast } from 'react-toastify';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Authentication required. Please login.');
        setLoading(false);
        return;
      }
      const res = await axios.get(`${BASE_URL}/counsellor/dashboard/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
      setEditableData(res.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditableData({...profile});
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData({
      ...editableData,
      [name]: value
    });
  };

  const handleArrayInputChange = (e, field) => {
    const values = e.target.value.split(',').map(item => item.trim()).filter(item => item);
    setEditableData({
      ...editableData,
      [field]: values
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
      
      // Add basic fields to FormData
      if (editableData.name) formData.append('name', editableData.name);
      if (editableData.phone_number) formData.append('phone_number', editableData.phone_number);
      if (editableData.gender) formData.append('gender', editableData.gender);
      if (editableData.bio) formData.append('bio', editableData.bio);
      
      // Add location fields
      if (editableData.country) formData.append('country', editableData.country);
      if (editableData.state) formData.append('state', editableData.state);
      if (editableData.city) formData.append('city', editableData.city);
      
      // Add session details
      if (editableData.session_fee) formData.append('session_fee', editableData.session_fee);
      if (editableData.session_duration) formData.append('session_duration', editableData.session_duration);
      if (editableData.experience_years) formData.append('experience_years', editableData.experience_years);
      
      // Handle arrays by joining with commas
      if (editableData.certifications && editableData.certifications.length > 0) {
        formData.append('certifications', editableData.certifications.join(','));
      }
      
      if (editableData.specializations && editableData.specializations.length > 0) {
        formData.append('specializations', editableData.specializations.join(','));
      }
      
      if (editableData.education_qualifications && editableData.education_qualifications.length > 0) {
        formData.append('education_qualifications', editableData.education_qualifications.join(','));
      }
      
      if (editableData.languages && editableData.languages.length > 0) {
        formData.append('languages', editableData.languages.join(','));
      }
      
      // If there's a profile picture file, add it
      if (editableData.profile_pic && editableData.profile_pic instanceof File) {
        formData.append('profile_pic', editableData.profile_pic);
      }
      
      // Log what we're sending for debugging
      console.log('Sending form data with fields:', 
        Array.from(formData.entries()).map(([key, value]) => key)
      );
      
      // Use PATCH method with FormData
      await axios.patch(`${BASE_URL}/counsellor/dashboard/profile`, formData, { headers });
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      fetchProfile(); // Refresh data from server
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
    if (deleteConfirmation !== profile.email) {
      toast.error('Email confirmation does not match');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      
      await axios.delete(`${BASE_URL}/counsellor/dashboard/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
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

  if (loading && !profile) return <div className={styles.loadingContainer}><div className={styles.loading}>Loading profile...</div></div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!profile) return <div className={styles.noData}>No profile data available.</div>;

  const {
    profile_pic,
    name,
    email,
    gender,
    phone_number,
    bio,
    certifications,
    specializations,
    education_qualifications,
    languages,
    session_fee,
    session_duration,
    experience_years,
    country,
    state,
    city,
    average_rating,
    total_reviews,
    is_email_verified,
    is_phone_verified,
    is_approved,
    is_featured,
    created_at,
  } = isEditing ? editableData : profile;

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h2 className={styles.pageTitle}>Counsellor Profile</h2>
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
          <div className={styles.header}>
            <div className={styles.avatarContainer}>
              {isEditing ? (
                <div className={styles.editableAvatar}>
                  <img
                    src={editableData.profile_pic_preview || profile_pic || '/default-profile.png'}
                    alt={`${name}'s profile`}
                    className={styles.avatar}
                  />
                  <label htmlFor="counsellor-profile-pic-upload" className={styles.uploadOverlay}>
                    <span>Change Photo</span>
                    <input
                      id="counsellor-profile-pic-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              ) : (
                <img
                  src={profile_pic || '/default-profile.png'}
                  alt={`${name}'s profile`}
                  className={styles.avatar}
                />
              )}
            </div>
            <div className={styles.basicInfo}>
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
                <h1 className={styles.name}>{name}</h1>
              )}
              <p className={styles.email}>{email}</p>
              <p className={styles.location}>
                {isEditing ? (
                  <div className={styles.locationInputs}>
                    <input
                      type="text"
                      name="city"
                      value={city || ''}
                      onChange={handleInputChange}
                      className={styles.editInput}
                      placeholder="City"
                    />
                    <input
                      type="text"
                      name="state"
                      value={state || ''}
                      onChange={handleInputChange}
                      className={styles.editInput}
                      placeholder="State"
                    />
                    <input
                      type="text"
                      name="country"
                      value={country || ''}
                      onChange={handleInputChange}
                      className={styles.editInput}
                      placeholder="Country"
                    />
                  </div>
                ) : (
                  `${city || ''}, ${state || ''}, ${country || ''}`
                )}
              </p>
            </div>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{average_rating?.toFixed(1) || 'N/A'}</span>
                <span className={styles.statLabel}>Rating</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{total_reviews || 0}</span>
                <span className={styles.statLabel}>Reviews</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{experience_years || 0}</span>
                <span className={styles.statLabel}>Years Exp.</span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2>About Me</h2>
            {isEditing ? (
              <textarea
                name="bio"
                value={bio || ''}
                onChange={handleInputChange}
                className={styles.bioTextarea}
                placeholder="Write about yourself, your approach, and experience..."
                rows={5}
              />
            ) : (
              <p className={styles.bio}>{bio || 'No bio available.'}</p>
            )}
          </div>

          <div className={styles.sectionGrid}>
            <div className={styles.card}>
              <h3>Contact & Verification</h3>
              <div className={styles.cardContent}>
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
              </div>
            </div>

            <div className={styles.card}>
              <h3>Professional Info</h3>
              <div className={styles.cardContent}>
                <div className={styles.fieldGroup}>
                  <label>Certifications</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={(certifications || []).join(', ')}
                      onChange={(e) => handleArrayInputChange(e, 'certifications')}
                      className={styles.editInput}
                      placeholder="Certifications (comma separated)"
                    />
                  ) : (
                    <p>{certifications?.length ? certifications.join(', ') : 'None'}</p>
                  )}
                </div>
                <div className={styles.fieldGroup}>
                  <label>Specializations</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={(specializations || []).join(', ')}
                      onChange={(e) => handleArrayInputChange(e, 'specializations')}
                      className={styles.editInput}
                      placeholder="Specializations (comma separated)"
                    />
                  ) : (
                    <p>{specializations?.length ? specializations.join(', ') : 'None'}</p>
                  )}
                </div>
                <div className={styles.fieldGroup}>
                  <label>Education</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={(education_qualifications || []).join(', ')}
                      onChange={(e) => handleArrayInputChange(e, 'education_qualifications')}
                      className={styles.editInput}
                      placeholder="Education (comma separated)"
                    />
                  ) : (
                    <p>{education_qualifications?.length ? education_qualifications.join(', ') : 'None'}</p>
                  )}
                </div>
                <div className={styles.fieldGroup}>
                  <label>Languages</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={(languages || []).join(', ')}
                      onChange={(e) => handleArrayInputChange(e, 'languages')}
                      className={styles.editInput}
                      placeholder="Languages (comma separated)"
                    />
                  ) : (
                    <p>{languages?.length ? languages.join(', ') : 'None'}</p>
                  )}
                </div>
                <div className={styles.fieldGroup}>
                  <label>Experience (years)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="experience_years"
                      value={experience_years || 0}
                      onChange={handleInputChange}
                      className={styles.editInput}
                      min="0"
                    />
                  ) : (
                    <p>{experience_years} year(s)</p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3>Session Details</h3>
              <div className={styles.cardContent}>
                <div className={styles.fieldGroup}>
                  <label>Fee (₹)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="session_fee"
                      value={session_fee || 0}
                      onChange={handleInputChange}
                      className={styles.editInput}
                      min="0"
                    />
                  ) : (
                    <p>₹{session_fee}</p>
                  )}
                </div>
                <div className={styles.fieldGroup}>
                  <label>Duration (minutes)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="session_duration"
                      value={session_duration || 30}
                      onChange={handleInputChange}
                      className={styles.editInput}
                      min="15"
                      step="15"
                    />
                  ) : (
                    <p>{session_duration} minute(s)</p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3>Account Status</h3>
              <div className={styles.cardContent}>
                <div className={styles.fieldGroup}>
                  <label>Approval Status</label>
                  <p className={is_approved ? styles.verified : styles.notVerified}>
                    {is_approved ? 'Approved' : 'Pending Approval'}
                  </p>
                </div>
                <div className={styles.fieldGroup}>
                  <label>Featured Status</label>
                  <p className={is_featured ? styles.verified : styles.standard}>
                    {is_featured ? 'Featured' : 'Standard'}
                  </p>
                </div>
                <div className={styles.fieldGroup}>
                  <label>Member Since</label>
                  <p>{new Date(created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
