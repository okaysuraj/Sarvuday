import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import sarvudayLogo from '../../assets/sarvuday_logo.png';
import { auth } from '../../config/firebase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email.');
      return;
    }
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent! Please check your inbox.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
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
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)',
            padding: '40px 32px',
            boxShadow: 'var(--shadow-card)',
            textAlign: 'center',
          }}
        >
          {/* Brand Logo */}
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

          {/* Icon */}
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-sky-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <span
              className="material-symbols-rounded"
              style={{
                fontSize: '24px',
                color: 'var(--color-sky-text)',
                fontVariationSettings: "'FILL' 1",
              }}
            >
              lock_reset
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
            Forgot your password?
          </h1>

          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-on-surface-variant)',
              lineHeight: '1.6',
              marginBottom: '28px',
              maxWidth: '320px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            No worries. Enter your email and we'll send you a secure link to reset it.
          </p>

          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <label
              htmlFor="email"
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--color-on-surface)',
                marginBottom: '6px',
                display: 'block',
              }}
            >
              Email address
            </label>
            <input
              className="input-field"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: '20px' }}
            />

            <button
              className="btn-primary"
              type="submit"
              disabled={isLoading}
              style={{ width: '100%', padding: '12px 20px' }}
            >
              {isLoading ? 'Sending…' : 'Send reset link'}
            </button>
          </form>

          <div
            style={{
              marginTop: '24px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-color)',
            }}
          >
            <Link
              to="/login"
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--color-on-surface-variant)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.15s ease',
              }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: '16px' }}>
                arrow_back
              </span>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
