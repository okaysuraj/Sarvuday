// src/layouts/PublicLayout.jsx
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* nested route content goes here */}
      <Footer />
    </>
  );
};

export default PublicLayout;
