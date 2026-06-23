import React from 'react';

const About = () => {
  return (
    <div className="container" style={{ padding: '80px 0', minHeight: '80vh' }}>
      <div className="sticker-container" style={{ padding: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '24px' }}>About Sarvuday</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
          Welcome to Sarvuday. We are dedicated to revolutionizing mental health care by making it accessible,
          approachable, and effective. Our platform bridges the gap between individuals seeking help and the professionals
          equipped to provide it, using modern technology and a compassionate approach.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
          Our mission is to foster a world where mental well-being is prioritized and stigma is eliminated. Through our
          platform, you can access guided meditations, connect with certified counselors, and engage in self-assessments
          designed to empower you on your journey to inner peace.
        </p>
        <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: '40px', marginBottom: '16px' }}>Our Values</h2>
        <ul style={{ paddingLeft: '20px', fontSize: '1.1rem', lineHeight: '1.6' }}>
          <li><strong>Compassion:</strong> We approach every interaction with empathy and understanding.</li>
          <li><strong>Accessibility:</strong> Mental health support should be available to everyone, anywhere.</li>
          <li><strong>Innovation:</strong> We continuously evolve to provide the best tools and resources for your mental health.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
