// src/components/admin/Profile.jsx

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
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get(`${BASE_URL}/admin/dashboard/profile`, { headers });
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
      
      // If there's a profile picture file, add it
      if (editableData.profile_pic && editableData.profile_pic instanceof File) {
        formData.append('profile_pic', editableData.profile_pic);
      }
      
      // Log what we're sending for debugging
      console.log('Sending form data with fields:', 
        Array.from(formData.entries()).map(([key, value]) => key)
      );
      
      // Use PATCH method with FormData
      await axios.patch(`${BASE_URL}/admin/dashboard/profile`, formData, { headers });
      
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

      await axios.delete(`${BASE_URL}/admin/dashboard/profile`, { headers });
      
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
    role,
    profile_pic,
    phone_number,
    gender,
    is_email_verified,
    is_phone_verified,
    last_login_at,
    created_at,
    permissions = []
  } = isEditing ? editableData : profileData;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Admin Profile</h2>
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
          <h3>Delete Admin Account</h3>
          <p>This action cannot be undone. Your admin account will be permanently deleted.</p>
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
                  {name ? name.charAt(0).toUpperCase() : 'A'}
                </div>
              )}
              {isEditing && (
                <label htmlFor="admin-profile-pic-upload" className={styles.uploadOverlay}>
                  <span>Change Photo</span>
                  <input
                    id="admin-profile-pic-upload"
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
              <div className={styles.adminBadge}>
                {role || 'Administrator'}
              </div>
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
                  <label>Role</label>
                  <p>{role || 'Administrator'}</p>
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
              </div>
            </div>

            <div className={styles.profileCard}>
              <h4>Permissions</h4>
              <div className={styles.cardContent}>
                {permissions && permissions.length > 0 ? (
                  <div className={styles.permissionsList}>
                    {permissions.map((permission, index) => (
                      <div key={index} className={styles.permissionItem}>
                        {permission}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Full administrative access</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;