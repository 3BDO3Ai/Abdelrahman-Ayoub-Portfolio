import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import styles from '../styles/CardFix.module.css';

interface ContentSectionProps {
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

const ContentSection: React.FC<ContentSectionProps> = ({
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [needsScroll, setNeedsScroll] = useState(false);
  
  // Check if content needs scrolling
  useEffect(() => {
    const checkContentHeight = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const containerHeight = contentRef.current.clientHeight;
        setNeedsScroll(contentHeight > containerHeight + 10);
      }
    };
    
    checkContentHeight();
    window.addEventListener('resize', checkContentHeight);
    
    return () => {
      window.removeEventListener('resize', checkContentHeight);
    };
  }, [children, isActive]);
  
  return (
    <SectionWrapper
      id={id}
      title={title}
      isActive={isActive}
      isPrevious={isPrevious}
      initialPosition={initialPosition}
      targetPosition={targetPosition}
      onClick={onClick}
      className={className}
      contentClassName={contentClassName}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          ref={contentRef}
          key={`${id}-content-${isActive ? 'active' : 'inactive'}`}
          className={`${styles.motionContainer} ${id === 'education' ? styles.educationSection : ''}`}
          initial={{ opacity: isActive ? 0.8 : 1, scale: isActive ? 0.95 : 1 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            height: isActive ? '100%' : 'auto',
            transition: { delay: isActive ? 0.15 : 0, duration: 0.6 }
          }}
          exit={{ opacity: 0.8, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 28,
            duration: 0.7,
          }}
          style={{ 
            height: isActive ? '100%' : 'auto',
            width: '100%',
            maxHeight: isActive ? 'none' : 'none',
            overflowY: isActive ? 'auto' : 'visible',
            minHeight: isActive ? (id === 'education' ? '350px' : id === 'skills' ? '400px' : id === 'projects' ? '377px' : id === 'hobbies' ? '350px' : '300px') : 'auto',
            willChange: 'transform, opacity',
            zIndex: isActive ? 5 : 1
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
};

export default ContentSection;
