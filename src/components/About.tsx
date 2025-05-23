import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import SectionWrapper from './SectionWrapper';

interface AboutProps {
  id: string;
  isActive: boolean;
  isPrevious: boolean;
  initialPosition: string;
  targetPosition: string;
  onClick: () => void;
  className?: string;
  contentClassName?: string;
}

const About: React.FC<AboutProps> = ({ 
  id, 
  isActive, 
  isPrevious, 
  initialPosition, 
  targetPosition, 
  onClick,
  className = '',
  contentClassName = ''
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
    <SectionWrapper
      id={id}
      title="About Me"
      isActive={isActive}
      isPrevious={isPrevious}
      initialPosition={initialPosition}
      targetPosition={targetPosition}
      onClick={onClick}
      className={className}
      contentClassName={contentClassName}
    >
      <div 
        ref={scrollContainerRef}
        style={{ 
          overflowY: 'auto',
          height: 'auto',
          width: '100%',
          paddingBottom: hasOverflow ? '28px' : '0',
          transition: 'all 0.3s ease'
        }}
      >
        <motion.div
          layout
          style={{ lineHeight: 1.6, fontSize: isActive ? '1rem' : '0.9rem', transition: 'all 0.3s ease' }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="about-paragraph"
            style={{ marginBottom: '0.75rem' }}
          >
            I'm an AI Engineer and Researcher currently pursuing a Bachelor of Engineering in Artificial Intelligence 
            at New Mansoura University. Ranked 4th among my peers with a 3.472 GPA, I've established myself as a 
            dedicated researcher in the field of Natural Language Processing, specifically focusing on Arabic text summarization.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="about-paragraph"
            style={{ marginBottom: '0.75rem' }}
          >
            My research has been published in prestigious IEEE conferences, including the 2024 International Conference on 
            Computing and Informatics (ICCI) and the 2024 International Mobile, Intelligent, and Ubiquitous Computing Conference (MIUCC). 
            I specialize in deep learning techniques, particularly with the Multilingual T5 model for Arabic NLP tasks.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="about-paragraph"
          >
            Beyond academia, I've developed practical AI solutions including an Egyptian dialect Arabic speech recognition system, 
            AGRIBOT for plant disease detection, and a brain tumor detection model with 90% accuracy. I'm also actively involved in 
            leadership roles, serving as Technology Director for the NMU Student Union and Head of the Programmers Committee for the Innovators Club.
          </motion.p>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.6rem',
            marginTop: '1rem' 
          }}>
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid var(--accent)',
              borderRadius: 'var(--border-radius)',
              padding: '0.6rem 0.8rem',
              fontSize: isActive ? '0.95rem' : '0.85rem',
              flex: 1,
              transition: 'all 0.3s ease'
            }}>
              <h3 style={{ fontSize: isActive ? '1rem' : '0.9rem', color: 'var(--accent)', marginBottom: '0.4rem', transition: 'all 0.3s ease' }}>
                AI Engineer - Researcher
              </h3>
              <p style={{ fontSize: isActive ? '0.9rem' : '0.8rem', transition: 'all 0.3s ease' }}>
                Specializing in NLP and deep learning for Arabic language processing
              </p>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid var(--accent)',
              borderRadius: 'var(--border-radius)',
              padding: '0.6rem 0.8rem',
              fontSize: isActive ? '0.95rem' : '0.85rem',
              flex: 1,
              transition: 'all 0.3s ease'
            }}>
              <h3 style={{ fontSize: isActive ? '1rem' : '0.9rem', color: 'var(--accent)', marginBottom: '0.4rem', transition: 'all 0.3s ease' }}>
                Academic Excellence
              </h3>
              <p style={{ fontSize: isActive ? '0.9rem' : '0.8rem', transition: 'all 0.3s ease' }}>
                IEEE published researcher with expertise in machine learning & computer vision
              </p>
            </div>
          </div>
        </motion.div>
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
    </SectionWrapper>
  );
};

export default About;