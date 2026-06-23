// src/layouts/PublicLayout.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';
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
