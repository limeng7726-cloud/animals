import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main Cursor (Paw) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:block mix-blend-multiply"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 15 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="text-orange-400 opacity-80">
           <path d="M12 2C10.9 2 10 2.9 10 4S10.9 6 12 6 14 5.1 14 4 13.1 2 12 2M7 5C5.9 5 5 5.9 5 7S5.9 9 7 9 9 8.1 9 7 8.1 5 7 5M17 5C15.9 5 15 5.9 15 7S15.9 9 17 9 19 8.1 19 7 18.1 5 17 5M12 8C8.13 8 5 11.13 5 15C5 17.5 6.45 19.74 8.55 20.89C9.56 21.44 10.74 21.78 12 21.78C13.26 21.78 14.44 21.44 15.45 20.89C17.55 19.74 19 17.5 19 15C19 11.13 15.87 8 12 8Z" />
        </svg>
      </motion.div>
      
      {/* Trailing Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-orange-200 rounded-full pointer-events-none z-[9998] hidden md:block opacity-60"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.8
        }}
      />
    </>
  );
};

export default CustomCursor;
