import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionWrapperProps {
  id: string;
  title: string;
  isActive: boolean;
  isPrevious: boolean;
  initialPosition: string;
  targetPosition: string;
  onClick: () => void;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  title,
  isActive,
  isPrevious,
  initialPosition,
  targetPosition,
  onClick,
  className = '',
  contentClassName = '',
  children
}) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  return (
    <motion.section 
      id={id} 
      className={`section section-${id} ${isActive ? 'section-active' : ''} ${className}`}
      onClick={onClick}
      layout
      layoutId={`section-${id}`}
      layoutDependency={isActive}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
        duration: 0.8,
        mass: 1,
        velocity: 0.5,
        restDelta: 0.001,
        restSpeed: 0.001
      }}
      style={{ 
        gridArea: targetPosition,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        height: isActive ? 'auto' : 'auto',
        minHeight: isActive ? (isMobile ? '350px' : '450px') : 'auto',
        overflow: 'visible',
        maxHeight: isActive ? '100%' : 'auto',
        transform: 'translateZ(0)', /* Force hardware acceleration */
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity, box-shadow'
      }}
      initial={false}
      animate={{
        scale: isActive ? (isMobile ? 1.02 : 1.05) : 1,
        zIndex: isActive ? 100 : 1,
        boxShadow: isActive 
          ? isMobile
            ? '0 15px 40px 0 rgba(249,177,122,0.25), 0 10px 20px 0 rgba(0,0,0,0.15)' 
            : '0 30px 70px 0 rgba(249,177,122,0.35), 0 15px 30px 0 rgba(0,0,0,0.2)' 
          : '0 2px 4px rgba(0, 0, 0, 0.1)',
        y: isActive ? (isMobile ? -6 : -12) : 0,
        x: isActive ? 0 : 0,
        borderColor: isActive ? 'rgba(249,177,122,0.4)' : 'var(--border-color)',
        borderWidth: isActive ? '2px' : '1px',
        borderRadius: isActive ? '16px' : 'var(--border-radius)',
        backgroundColor: isActive ? 'var(--card-background)' : 'var(--card-background)',
        transition: {
          type: 'spring',
          stiffness: isMobile ? 300 : 260,
          damping: isMobile ? 30 : 28,
          duration: isMobile ? 0.6 : 0.8
        }
      }}
      whileHover={isMobile ? {} : { 
        boxShadow: isActive 
          ? '0 35px 75px 0 rgba(249,177,122,0.38), 0 18px 35px 0 rgba(0,0,0,0.22)' 
          : '0 15px 35px rgba(0, 0, 0, 0.15)',
        y: isActive ? -14 : -7,
        scale: isActive ? 1.06 : 1.03,
        borderColor: isActive ? 'rgba(249,177,122,0.5)' : 'rgba(249,177,122,0.2)',
        borderRadius: isActive ? '18px' : 'calc(var(--border-radius) + 2px)',
        transition: {
          type: 'spring',
          stiffness: 250,
          damping: 18,
          mass: 1.1,
          restDelta: 0.001
        }
      }}
    >
      <h2 className="section-title" style={{ marginBottom: '0.7rem' }}>{title}</h2>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={`scrollable-${id}-${isActive ? 'active' : 'inactive'}`}
          className={`scrollable-container ${contentClassName}`}
          initial={{ opacity: 0.9, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.9, scale: 0.98 }}
          transition={{
            type: 'spring',
            stiffness: 250,
            damping: 25,
            delay: 0.1
          }}
          style={{ 
            overflowY: 'auto',
            height: (id === 'education' || id === 'projects' || id === 'skills') ? '100%' : 'auto',
            flex: 1,
            minHeight: '90%',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            paddingRight: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
};

export default SectionWrapper;
