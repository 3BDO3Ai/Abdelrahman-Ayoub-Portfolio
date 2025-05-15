import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import resumeData from '../data/resume';

interface ProjectsProps {
  id: string;
  isActive: boolean;
  isPrevious: boolean;
  initialPosition: string;
  targetPosition: string;
  onClick: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ 
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
      id="projects" 
      className={`section section-projects ${isActive ? 'section-active' : ''}`}
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
      <h2 className="section-title" style={{ marginBottom: '0.7rem' }}>Projects</h2>
      <div 
        ref={scrollContainerRef}
        className="scrollable-container"
        style={{ 
          minHeight: isActive ? '200px' : '110px',
          maxHeight: isActive ? '500px' : '180px',
          overflowY: 'auto', 
          height: 'auto',
          paddingBottom: hasOverflow ? '28px' : '0',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ marginTop: '0.2rem' }}>
          {resumeData.projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              viewport={{ once: true }}
              style={{ 
                marginBottom: '0.9rem', // Increased margin
                padding: '0.6rem', // Increased padding
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: 'var(--border-radius)',
                backgroundColor: 'rgba(16, 185, 129, 0.03)'
              }}
            >
              <div>
                <h3 style={{ fontSize: '0.95rem', marginBottom: '0.3rem', color: 'var(--primary-color)' }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: isActive ? '0.9rem' : '0.75rem', lineHeight: '1.5', marginBottom: '0.5rem', transition: 'all 0.3s ease' }}>
                  {project.description}
                </p>
                {project.technologies && project.technologies.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.2rem 0.4rem',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          borderRadius: '4px',
                          color: 'var(--text-color)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Modern scroll indicator - only show if needed */}
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

export default Projects;