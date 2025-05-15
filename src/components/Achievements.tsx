import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Certification, Award, LeadershipRole } from '../data/resume';

interface AchievementsProps {
  id: string;
  isActive: boolean;
  isPrevious: boolean;
  initialPosition: string;
  targetPosition: string;
  onClick: () => void;
  certifications: Certification[];
  awards: Award[];
  leadership: LeadershipRole[];
}

export const Achievements = ({ id, isActive, isPrevious, initialPosition, targetPosition, onClick, certifications, awards, leadership }: AchievementsProps) => {
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
  }, [isActive]);

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

  return (
    <motion.section 
      id="achievements" 
      className={`section section-achievements ${isActive ? 'section-active' : ''}`}
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
      <h2 className="section-title" style={{ marginBottom: '0.7rem' }}>Achievements</h2>
      <div
        ref={scrollContainerRef}
        className={`scrollable-container ${hasOverflow ? 'has-overflow' : ''}`}
        style={{
          minHeight: isActive ? '200px' : '110px',
          maxHeight: isActive ? '500px' : '180px',
          overflowY: 'auto',
          height: 'auto',
          paddingBottom: hasOverflow ? '28px' : '0',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ marginTop: '0.2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
          {/* Certifications Section */}
          <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.8rem', color: 'var(--primary-color)', borderBottom: '1px solid rgba(16, 185, 129, 0.2)', paddingBottom: '0.4rem' }}>Certifications</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                  style={{
                    height: '100%',
                    padding: '0.7rem',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: 'var(--border-radius)',
                    backgroundColor: 'rgba(16, 185, 129, 0.03)',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(16, 185, 129, 0.06)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                    <h3 style={{ 
                      fontSize: '0.95rem', 
                      color: 'var(--primary-color)',
                      fontWeight: 600,
                      flex: 1
                    }}>
                      {cert.name}
                    </h3>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      color: 'var(--text-secondary)',
                      marginLeft: '1rem',
                      whiteSpace: 'nowrap'
                    }}>
                      {cert.date}
                    </span>
                  </div>
                  <p style={{ 
                    fontSize: '0.85rem', 
                    color: 'var(--text-color)',
                    opacity: 0.9
                  }}>
                    {cert.issuer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Awards Section */}
          <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.8rem', color: 'var(--primary-color)', borderBottom: '1px solid rgba(16, 185, 129, 0.2)', paddingBottom: '0.4rem' }}>Awards & Recognition</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {awards.map((award, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + certifications.length) * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                  style={{
                    height: '100%',
                    padding: '0.7rem',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: 'var(--border-radius)',
                    backgroundColor: 'rgba(16, 185, 129, 0.03)',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(16, 185, 129, 0.06)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                    <h3 style={{ 
                      fontSize: '0.95rem', 
                      color: 'var(--primary-color)',
                      fontWeight: 600,
                      flex: 1
                    }}>
                      {award.title}
                    </h3>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      color: 'var(--text-secondary)',
                      marginLeft: '1rem',
                      whiteSpace: 'nowrap'
                    }}>
                      {award.date}
                    </span>
                  </div>
                  <p style={{ 
                    fontSize: '0.85rem', 
                    color: 'var(--text-color)',
                    opacity: 0.9
                  }}>
                    {award.issuer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leadership Section */}
          <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.8rem', color: 'var(--primary-color)', borderBottom: '1px solid rgba(16, 185, 129, 0.2)', paddingBottom: '0.4rem' }}>Leadership</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {leadership.map((role, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + certifications.length + awards.length) * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                  style={{ 
                    height: '100%',
                    padding: '0.7rem',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: 'var(--border-radius)',
                    backgroundColor: 'rgba(16, 185, 129, 0.03)',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(16, 185, 129, 0.06)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                    <h3 style={{ 
                      fontSize: '0.95rem', 
                      color: 'var(--primary-color)',
                      fontWeight: 600,
                      flex: 1
                    }}>
                      {role.role}
                    </h3>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      color: 'var(--text-secondary)',
                      marginLeft: '1rem',
                      whiteSpace: 'nowrap'
                    }}>
                      {role.period}
                    </span>
                  </div>
                  <p style={{ 
                    fontSize: '0.85rem', 
                    color: 'var(--text-color)',
                    opacity: 0.9
                  }}>
                    {role.organization}
                  </p>
                  <ul style={{ listStyle: 'disc', paddingLeft: '1.2rem', marginTop: '0.4rem' }}>
                    {role.responsibilities.map((resp, i) => (
                      <li key={`resp-${i}`} style={{ fontSize: '0.85rem', marginBottom: '0.2rem', color: 'var(--text-color)' }}>{resp}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
