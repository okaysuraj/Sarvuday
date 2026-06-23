import React from 'react';

const Terms = () => {
  return (
    <div className="container" style={{ padding: '80px 0', minHeight: '80vh' }}>
      <div className="sticker-container" style={{ padding: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '24px' }}>Terms of Service</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
          Effective Date: {new Date().toLocaleDateString()}
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
          Welcome to Sarvuday. By accessing or using our website and application, you agree to comply with and be bound by
          these Terms of Service. If you do not agree, please do not use our services.
        </p>

        <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>1. Use of Services</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
          You must be at least 18 years old to use our services independently. You agree to use the platform only for lawful
          purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment
          of the platform.
        </p>

        <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>2. Medical Disclaimer</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
          The content on Sarvuday is for informational purposes only and is not a substitute for professional medical advice,
          diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any
          questions you may have regarding a medical condition.
        </p>

        <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>3. User Accounts</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
          You are responsible for maintaining the confidentiality of your account credentials and for all activities that
          occur under your account. We reserve the right to suspend or terminate accounts that violate these terms.
        </p>

        <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>4. Changes to Terms</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
          We may modify these terms at any time. Your continued use of the platform following the posting of changes constitutes
          your acceptance of the revised terms.
        </p>
      </div>
    </div>
  );
};

export default Terms;
