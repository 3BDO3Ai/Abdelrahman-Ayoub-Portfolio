import React from 'react';
import { motion } from 'framer-motion';

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
        stiffness: 220,
        damping: 30,
        duration: 1,
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
        minHeight: isActive ? '450px' : 'auto',
        overflow: 'visible',
        maxHeight: isActive ? '100%' : 'auto'
      }}
      initial={false}
      animate={{
        scale: isActive ? 1.05 : 1,
        zIndex: isActive ? 100 : 1,
        boxShadow: isActive 
          ? '0 30px 70px 0 rgba(249,177,122,0.35), 0 15px 30px 0 rgba(0,0,0,0.2)' 
          : '0 2px 4px rgba(0, 0, 0, 0.1)',
        y: isActive ? -12 : 0,
        x: isActive ? 0 : 0,
        borderColor: isActive ? 'rgba(249,177,122,0.4)' : 'var(--border-color)',
        borderWidth: isActive ? '2px' : '1px',
        borderRadius: isActive ? '16px' : 'var(--border-radius)',
        backgroundColor: isActive ? 'var(--card-background)' : 'var(--card-background)'
      }}
      whileHover={{ 
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
      
      <div 
        className={`scrollable-container ${contentClassName}`}
        style={{ 
          overflowY: 'auto',
          height: (id === 'education' || id === 'projects') ? '100%' : 'auto',
          flex: 1,
          minHeight: (id === 'education' || id === 'projects') ? '377px' : '100px',
          transition: 'all 0.3s ease',
          paddingRight: '0.5rem',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </div>
    </motion.section>
  );
};

export default SectionWrapper;
