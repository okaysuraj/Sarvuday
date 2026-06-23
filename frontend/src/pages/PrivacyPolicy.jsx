import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container" style={{ padding: '80px 0', minHeight: '80vh' }}>
      <div className="sticker-container" style={{ padding: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '24px' }}>Privacy Policy</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
          Effective Date: {new Date().toLocaleDateString()}
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
          At Sarvuday, your privacy is our priority. This Privacy Policy outlines how we collect, use, and protect
          your personal information when you use our services.
        </p>
        
        <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>Information We Collect</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
          We collect information that you provide directly to us, such as your name, email address, and any mental health
          assessments or chat logs you choose to engage with. All sensitive data is securely stored and encrypted.
        </p>

        <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>How We Use Your Information</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
          Your data is used to provide, maintain, and improve our services. We use it to match you with counselors,
          personalize your meditation recommendations, and ensure a seamless experience. We do not sell your personal data to third parties.
        </p>

        <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>Data Security</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
          We implement rigorous security measures to protect your personal information against unauthorized access, alteration,
          or destruction. However, no method of transmission over the Internet is 100% secure.
        </p>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginTop: '40px' }}>
          If you have any questions about this Privacy Policy, please contact us at privacy@sarvuday.com.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
