import { confirmPasswordReset } from 'firebase/auth';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import sarvudayLogo from '../../assets/sarvuday_logo.png';
import { auth } from '../../config/firebase';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const oobCode = searchParams.get('oobCode');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }
    if (!oobCode) {
      toast.error('Invalid or missing password reset code.');
      return;
    }
    setIsLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      toast.success('Password successfully reset! You can now log in.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  };

  const inputWrapperStyle = {
    position: 'relative',
  };

  const iconStyle = {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: 'var(--color-on-surface-variant)',
  };

  const toggleBtnStyle = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--color-on-surface-variant)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-background)',
        padding: '24px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)',
            padding: '40px 32px',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
                textDecoration: 'none',
              }}
            >
              <img
                src={sarvudayLogo}
                alt="SarvUday"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  objectFit: 'contain',
                  padding: '2px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--color-surface)',
                }}
              />
              <span
                style={{
                  fontWeight: 600,
                  fontSize: '18px',
                  color: 'var(--color-on-surface)',
                  letterSpacing: '-0.02em',
                }}
              >
                SarvUday
              </span>
            </Link>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-sage-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <span
                className="material-symbols-rounded"
                style={{
                  fontSize: '24px',
                  color: 'var(--color-sage-text)',
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                key
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--color-on-surface)',
                letterSpacing: '-0.025em',
                marginBottom: '8px',
              }}
            >
              Create new password
            </h1>

            <p
              style={{
                fontSize: '14px',
                color: 'var(--color-on-surface-variant)',
                lineHeight: '1.6',
              }}
            >
              Choose a strong password for your account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div style={inputGroupStyle}>
              <label
                htmlFor="new-password"
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-on-surface)',
                }}
              >
                New password
              </label>
              <div style={inputWrapperStyle}>
                <span className="material-symbols-rounded" style={iconStyle}>
                  lock
                </span>
                <input
                  className="input-field"
                  id="new-password"
                  placeholder="Enter new password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingLeft: '42px', paddingRight: '42px' }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={toggleBtnStyle}
                  type="button"
                >
                  <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div style={inputGroupStyle}>
              <label
                htmlFor="confirm-password"
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-on-surface)',
                }}
              >
                Confirm password
              </label>
              <div style={inputWrapperStyle}>
                <span className="material-symbols-rounded" style={iconStyle}>
                  lock_reset
                </span>
                <input
                  className="input-field"
                  id="confirm-password"
                  placeholder="Confirm new password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{ paddingLeft: '42px', paddingRight: '42px' }}
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={toggleBtnStyle}
                  type="button"
                >
                  <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>
                    {showConfirmPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              className="btn-primary"
              type="submit"
              disabled={isLoading}
              style={{ width: '100%', padding: '12px 20px', marginTop: '4px' }}
            >
              {isLoading ? 'Resetting…' : 'Reset password'}
              {!isLoading && (
                <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>
                  arrow_forward
                </span>
              )}
            </button>

            <div style={{ textAlign: 'center', paddingTop: '8px' }}>
              <Link
                to="/login"
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-on-surface-variant)',
                  transition: 'color 0.15s ease',
                }}
              >
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
