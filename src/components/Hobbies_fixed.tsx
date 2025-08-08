import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContentSection from './ContentSection';
import { FaMusic, FaImage, FaCode, FaLaptop, FaChevronDown, FaChevronUp, FaCamera, FaBook, FaMountain, FaChess } from 'react-icons/fa';
import resumeData from '../data/resume';
import styles from '../styles/CardFix.module.css';

interface HobbiesProps {
  id: string;
  isActive: boolean;
  isPrevious: boolean;
  initialPosition: string;
  targetPosition: string;
  onClick: () => void;
}

const Hobbies: React.FC<HobbiesProps> = ({ 
  id, 
  isActive, 
  isPrevious, 
  initialPosition, 
  targetPosition, 
  onClick 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const checkForOverflow = () => {
      const hasContentOverflow = container.scrollHeight > container.clientHeight + 5;
      setHasOverflow(hasContentOverflow);
      container.classList.toggle('has-overflow', hasContentOverflow);
    };
    
    const checkForMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      if (!container) return;
      const isBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 10;
      setIsAtBottom(isBottom);
    };
    
    checkForOverflow();
    checkForMobile();
    handleScroll();
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkForOverflow);
    window.addEventListener('resize', checkForMobile);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkForOverflow);
      window.removeEventListener('resize', checkForMobile);
    };
  }, [isActive]); // Re-run when active state changes

  const handleScrollIndicatorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const container = scrollContainerRef.current;
    if (!container) return;
    if (isAtBottom) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const newPosition = container.scrollTop + 60;
      container.scrollTo({ top: newPosition, behavior: 'smooth' });
    }
  };

  // Function to get icon component based on icon name
  const getIcon = (iconName: string | undefined) => {
    if (!iconName) return null;
    
    switch (iconName) {
      case 'music': return <FaMusic />;
      case 'image': return <FaImage />;
      case 'code': return <FaCode />;
      case 'computer': return <FaLaptop />;
      case 'camera': return <FaCamera />;
      case 'book': return <FaBook />;
      case 'mountain': return <FaMountain />;
      case 'chess': return <FaChess />;
      default: return null;
    }
  };

  // Function to render skill level with emoji indicators
  const renderSkillLevel = (level: number, maxLevel: number = 5, emoji: string) => {
    const indicators = [];
    for (let i = 1; i <= maxLevel; i++) {
      indicators.push(
        <span 
          key={i} 
          style={{ 
            opacity: i <= level ? 1 : 0.25,
            marginLeft: '2px',
            filter: i <= level ? 'none' : 'grayscale(100%)'
          }}
        >
          {emoji}
        </span>
      );
    }
    return indicators;
  };

  return (
    <ContentSection
      id={id}
      title="Hobbies & Other Skills"
      isActive={isActive}
      isPrevious={isPrevious}
      initialPosition={initialPosition}
      targetPosition={targetPosition}
      onClick={isMobile ? undefined : onClick}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={`hobbies-content-${isActive ? 'active' : 'inactive'}`}
          ref={scrollContainerRef}
          className={`${!hasOverflow ? styles.noScroll : ''}`}
          initial={{ opacity: 0.9, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.9, scale: 0.98 }}
          transition={{
            type: 'spring',
            stiffness: 250,
            damping: 25
          }}
          style={{
            overflowY: 'auto',
            height: '100%',
            flex: '1 1 auto',
            minHeight: isActive ? '100px' : 'auto',
            maxHeight: '100%',
            transition: '0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            paddingRight: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            position: 'relative',
            paddingBottom: hasOverflow ? '28px' : '0'
          }}
        >
          {/* Interests section */}
          <div style={{ marginBottom: '1.2rem' }}>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '0.8rem',
              justifyContent: 'flex-start'
            }}>
              {resumeData.hobbies.map((hobby, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  viewport={{ once: true }}
                  style={{
                    padding: isActive && !isMobile ? '0.6rem 0.8rem' : '0.5rem 0.7rem',
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    borderRadius: 'var(--border-radius)',
                    fontSize: isActive && !isMobile ? '0.95rem' : '0.85rem',
                    border: '1px solid rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {hobby.icon && (
                    <span style={{ 
                      fontSize: isActive && !isMobile ? '1.1rem' : '0.9rem', 
                      transition: 'all 0.3s ease' 
                    }}>
                      {getIcon(hobby.icon)}
                    </span>
                  )}
                  {hobby.name}
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Unmentioned skills section */}
          <div>
            {resumeData.unmentiondSkills.map((skill, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
                style={{
                  padding: '0.7rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.05)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: isActive && !isMobile ? '0.95rem' : '0.8rem',
                  border: '1px solid rgba(16, 185, 129, 0.1)',
                  marginBottom: '0.7rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ 
                      fontSize: isActive && !isMobile ? '1.25rem' : '1rem', 
                      transition: 'all 0.3s ease' 
                    }}>
                      {skill.emoji}
                    </span>
                    <span>{skill.skill}</span>
                  </div>
                  <div style={{ 
                    fontSize: isActive && !isMobile ? '0.95rem' : '0.8rem',
                    marginLeft: '0.6rem',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease'
                  }}>
                    {renderSkillLevel(skill.level, 5, skill.emoji)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Modern scroll indicator */}
      {hasOverflow && (
        <div className={styles.scrollIndicator} onClick={handleScrollIndicatorClick} style={{ cursor: 'pointer' }}>
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '100%', 
              height: '100%',
              color: 'var(--primary-color)'
            }}
          >
            {isAtBottom ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
          </motion.div>
        </div>
      )}
    </ContentSection>
  );
};

export default Hobbies;
