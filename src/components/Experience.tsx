import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import resumeData from '../data/resume';

interface ExperienceProps {
  id: string;
  isActive: boolean;
  isPrevious: boolean;
  initialPosition: string;
  targetPosition: string;
  onClick: () => void;
}

const Experience: React.FC<ExperienceProps> = ({ 
  id, 
  isActive, 
  isPrevious, 
  initialPosition, 
  targetPosition, 
  onClick 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const checkForOverflow = () => {
      const hasContentOverflow = container.scrollHeight > container.clientHeight + 5;
      setHasOverflow(hasContentOverflow);
      container.classList.toggle('has-overflow', hasContentOverflow);
    };
    
    const handleScroll = () => {
      if (!container) return;
      const isBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 10;
      setIsAtBottom(isBottom);
    };
    
    checkForOverflow();
    handleScroll();
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkForOverflow);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkForOverflow);
    };
  }, [isActive]); // Re-run when active state changes

  const handleScrollIndicatorClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent onClick
    
    const container = scrollContainerRef.current;
    if (!container) return;
    if (isAtBottom) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const newPosition = container.scrollTop + 60;
      container.scrollTo({ top: newPosition, behavior: 'smooth' });
    }
  };

  return (
    <motion.section 
      id="experience" 
      className={`section section-experience ${isActive ? 'section-active' : ''}`}
      onClick={onClick}
      layout
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 30,
        duration: 0.4
      }}
      style={{ 
        gridArea: targetPosition,
        padding: '0.7rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer'
      }}
      initial={false}
      animate={{
        scale: isActive ? 1.02 : 1,
        zIndex: isActive ? 2 : 1,
        boxShadow: isActive 
          ? '0 16px 48px 0 rgba(16,185,129,0.22), 0 2px 16px 0 rgba(0,0,0,0.13)' 
          : '0 2px 4px rgba(0, 0, 0, 0.2)'
      }}
      whileHover={{ 
        boxShadow: isActive 
          ? '0 16px 48px 0 rgba(16,185,129,0.22), 0 2px 16px 0 rgba(0,0,0,0.13)' 
          : '0 4px 8px rgba(0, 0, 0, 0.15)' 
      }}
    >
      <h2 className="section-title" style={{ marginBottom: '0.7rem' }}>Experience</h2>
      <div 
        ref={scrollContainerRef}
        className="scrollable-container"
        style={{ 
          minHeight: isActive ? '200px' : '90px',
          maxHeight: isActive ? '500px' : '180px',
          overflowY: 'auto', 
          height: 'auto',
          paddingBottom: hasOverflow ? '28px' : '0',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ marginTop: '0.2rem' }}>
          {resumeData.experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              viewport={{ once: true }}
              style={{ 
                marginBottom: '1.2rem', // Increased margin
                borderLeft: '2px solid var(--accent)', 
                paddingLeft: '0.7rem' // Increased padding
              }}
            >
              <h3 style={{ fontSize: isActive ? '1rem' : '0.85rem', marginBottom: '0.4rem', transition: 'all 0.3s ease' }}>{exp.title}</h3>
              <p style={{ fontSize: isActive ? '0.9rem' : '0.75rem', opacity: 0.9, marginBottom: '0.25rem', transition: 'all 0.3s ease' }}>
                {exp.company}
              </p>
              <p style={{ fontSize: isActive ? '0.85rem' : '0.7rem', opacity: 0.7, marginBottom: '0.4rem', transition: 'all 0.3s ease' }}>
                {exp.period}
              </p>
              <ul style={{ fontSize: isActive ? '0.9rem' : '0.75rem', paddingLeft: '1.2rem', marginTop: '0.4rem', transition: 'all 0.3s ease' }}>
                {exp.description.map((responsibility, respIndex) => (
                  <li key={respIndex} style={{ marginBottom: '0.3rem' }}>
                    {responsibility}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Modern scroll indicator */}
      {hasOverflow && (
        <div className="scroll-indicator" onClick={handleScrollIndicatorClick} style={{ cursor: 'pointer' }}>
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
          >
            {isAtBottom ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
          </motion.div>
        </div>
      )}
    </motion.section>
  );
};

export default Experience;