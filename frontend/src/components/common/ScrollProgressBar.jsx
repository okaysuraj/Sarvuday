// src/components/ScrollProgressBar.jsx
import { motion, useScroll } from 'framer-motion';

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #b365d5, #1a878d)',
        transformOrigin: '0%',
        zIndex: 1000,
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgressBar;
