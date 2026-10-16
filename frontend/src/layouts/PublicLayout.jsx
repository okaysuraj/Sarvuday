// src/layouts/PublicLayout.jsx
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
      <Header />
      <main id="main-content"><Outlet /></main>
      <Footer />
    </>
  );
};

export default PublicLayout;
