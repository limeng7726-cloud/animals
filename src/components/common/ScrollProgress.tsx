import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion';
import { Cat } from 'lucide-react';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Use state to force re-render when scroll changes for the icon position
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scaleX.on('change', (latest) => {
        setProgress(latest);
    });
  }, [scaleX]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-orange-100 z-[100]">
      <motion.div
        className="h-full bg-orange-500 origin-left"
        style={{ scaleX }}
      />
      <div 
        className="absolute top-0 -mt-2 text-orange-600 transition-transform duration-75 pointer-events-none"
        style={{ left: `${progress * 100}%`, transform: 'translateX(-50%)' }}
      >
        <Cat size={20} className="fill-orange-100 stroke-orange-600 animate-bounce" />
      </div>
    </div>
  );
};

export default ScrollProgress;
