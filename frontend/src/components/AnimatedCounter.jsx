// src/components/AnimatedCounter.jsx
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const AnimatedCounter = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      let startTime;
      const startCount = 0;
      
      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * (end - startCount) + startCount));
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };
      
      requestAnimationFrame(updateCount);
    }
  }, [inView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a878d' }}
    >
      {prefix}{count}{suffix}
    </motion.div>
  );
};

export default AnimatedCounter;
