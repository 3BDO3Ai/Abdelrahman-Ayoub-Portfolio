import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import resumeData from '../data/resume';
import styles from '../styles/CardFix.module.css';

interface SkillsProps {
  id: string;
  isActive: boolean;
  isPrevious: boolean;
  initialPosition: string;
  targetPosition: string;
  onClick: () => void;
}

const Skills: React.FC<SkillsProps> = ({ 
  id, 
  isActive, 
  isPrevious, 
  initialPosition, 
  targetPosition, 
  onClick 
}) => {
  const { skills, personalSkills } = resumeData;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  const checkIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 1024);
  }, []);

  // Initialize isMobile on mount and check on window resize
  useEffect(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [checkIsMobile]);
  
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

  const handleScrollIndicatorClick = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if (isAtBottom) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const newPosition = container.scrollTop + 60;
      container.scrollTo({ top: newPosition, behavior: 'smooth' });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };
  
  const renderSkillBar = (skillName: string, proficiency: number, uniqueKey: string) => (
    <div key={uniqueKey} style={{ marginBottom: '0.3rem', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.1rem' }}>
        <span style={{ fontSize: isActive ? '0.85rem' : '0.7rem', transition: 'all 0.3s ease' }}>{skillName}</span>
        <span style={{ fontSize: isActive ? '0.85rem' : '0.7rem', color: 'var(--accent)', transition: 'all 0.3s ease' }}>{proficiency}%</span>
      </div>
      <div style={{ 
        height: isActive ? '6px' : '5px', 
        backgroundColor: 'var(--primary-light)', 
        borderRadius: '3px',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ 
            height: '100%', 
            backgroundColor: 'var(--accent)',
            borderRadius: '3px'
          }}
        />
      </div>
    </div>
  );

  return (
    <motion.section 
      id="skills" 
      className={`section section-skills ${isActive ? 'section-active' : ''} ${styles.skillsCard}`}
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
        justifyContent: 'flex-start', 
        position: 'relative',
        cursor: 'pointer'
      }}
      initial={false}
      animate={{
        scale: isActive ? 1.02 : 1,
        zIndex: isActive ? 2 : 1,
        boxShadow: isActive 
          ? '0 16px 48px 0 rgba(249,177,122,0.22), 0 2px 16px 0 rgba(0,0,0,0.15)' 
          : '0 2px 4px rgba(0, 0, 0, 0.2)'
      }}
    >
      <h2 className="section-title" style={{ marginBottom: '0.4rem' }}>Skills</h2>
      <div style={{ 
        position: 'relative', 
        borderRadius: '0.3rem', 
        background: 'var(--card-background)', 
        minHeight: isActive ? '420px' : '90px', 
        maxHeight: isActive ? 'none' : '180px', 
        height: isActive ? 'auto' : 'auto', 
        overflow: 'visible', 
        transition: 'all 0.3s ease'
      }}>
        <div 
          ref={scrollContainerRef}
          className={styles.skillsContent}
          style={{ 
            overflowY: 'auto',
            height: '100%',
            padding: '0.5rem',
            scrollbarWidth: 'thin',
            position: 'relative',
            transition: 'all 0.3s ease',
            minHeight: isActive ? '400px' : 'auto'
          }}
        >
          <div style={{ marginBottom: '0.5rem' }}>
            <h3 style={{ marginBottom: '0.3rem', color: 'var(--secondary)', fontSize: isActive ? '0.95rem' : '0.8rem', transition: 'all 0.3s ease' }}>Personal Attributes</h3>
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}
            >
              {personalSkills.map((skill, index) => (
                <motion.div 
                  key={`${index}-${skill.name}`}
                  variants={item}
                  style={{ 
                    backgroundColor: 'var(--accent-transparent)',
                    padding: isActive ? '0.25rem 0.5rem' : '0.18rem 0.4rem',
                    borderRadius: '0.3rem',
                    border: '1px solid var(--accent)',
                    fontSize: isActive ? '0.8rem' : '0.65rem',
                    fontWeight: 500,
                    color: 'var(--text)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {skill.name}
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            {/* Show all skill categories, no filtering */}
            {skills.map((skillCategory, index) => (
              <motion.div 
                key={index}
                variants={item}
                style={{ marginBottom: '0.8rem' }}
              >
                <h3 style={{ marginBottom: '0.3rem', color: 'var(--secondary)', fontSize: isActive || isMobile ? '0.95rem' : '0.8rem', transition: 'all 0.3s ease' }}>{skillCategory.category}</h3>
                {skillCategory.category === 'Frameworks' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    {skillCategory.items.slice(0, isActive || isMobile ? undefined : 4).map((skill, skillIndex) => {
                      const proficiency = 95 - (skillIndex * 7);
                      const uniqueKey = `${skillCategory.category}-${skillIndex}`;
                      return renderSkillBar(skill, proficiency, uniqueKey);
                    })}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem' }}>
                    {skillCategory.items.slice(0, isActive || isMobile ? undefined : 6).map((skill, skillIndex) => (
                      <span 
                        key={`${skillCategory.category}-${skill}-${skillIndex}`}
                        className="skill-tag"
                        style={{ 
                          fontSize: isActive ? '0.8rem' : '0.65rem', 
                          transition: 'all 0.3s ease',
                          backgroundColor: 'var(--accent-transparent)',
                          color: 'var(--text)',
                          border: '1px solid var(--accent)'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* Modern scroll indicator - only show if has overflow and is active or mobile */}
        {hasOverflow && (isActive || isMobile) && (
          <div 
            className="scroll-indicator" 
            onClick={(e) => {
              e.stopPropagation();
              handleScrollIndicatorClick();
            }} 
            style={{ 
              cursor: 'pointer',
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--accent)',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 5px var(--shadow-color)',
              opacity: 0.9,
              zIndex: 5
            }}
          >
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '100%', 
                height: '100%',
                color: 'white'
              }}
            >
              {isAtBottom ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
            </motion.div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Skills;