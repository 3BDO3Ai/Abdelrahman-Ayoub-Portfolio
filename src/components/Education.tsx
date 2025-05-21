import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import resumeData from '../data/resume';
import ContentSection from './ContentSection';
import styles from '../styles/CardFix.module.css';

interface EducationProps {
  id: string;
  isActive: boolean;
  isPrevious: boolean;
  initialPosition: string;
  targetPosition: string;
  onClick: () => void;
  className?: string;
  contentClassName?: string;
}

const Education: React.FC<EducationProps> = ({ 
  id, 
  isActive, 
  isPrevious, 
  initialPosition, 
  targetPosition, 
  onClick,
  className = '',
  contentClassName = '' 
}) => {


  return (
    <ContentSection
      id={id}
      title="Education"
      isActive={isActive}
      isPrevious={isPrevious}
      initialPosition={initialPosition}
      targetPosition={targetPosition}
      onClick={onClick}
      className={`${className} ${styles.educationCard}`}
      contentClassName={`${contentClassName} ${styles.educationContent}`}
    >
        <motion.div 
          className={styles.educationSection} 
          style={{ 
            marginTop: '0.2rem', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            flex: 1
          }}
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {resumeData.education.map((edu, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              viewport={{ once: true }}
              style={{ 
                marginBottom: '1.2rem', // Increased margin
                borderLeft: '2px solid var(--accent)', 
                paddingLeft: '0.8rem', // Increased padding
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '100%',
                position: 'relative',
                zIndex: 2
              }}
            >
              <h3 style={{ fontSize: isActive ? '1rem' : '0.85rem', marginBottom: '0.4rem', transition: 'all 0.3s ease' }}>{edu.degree}</h3>
              <p style={{ fontSize: isActive ? '0.9rem' : '0.75rem', opacity: 0.9, marginBottom: '0.25rem', transition: 'all 0.3s ease' }}>
                {edu.institution}
              </p>
              <p style={{ fontSize: isActive ? '0.85rem' : '0.7rem', opacity: 0.7, marginBottom: '0.4rem', transition: 'all 0.3s ease' }}>
                {edu.location} • {edu.year}
              </p>
              <p style={{ fontSize: isActive ? '0.9rem' : '0.75rem', transition: 'all 0.3s ease' }}>
                {edu.description}
              </p>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
    </ContentSection>
  );
};

export default Education;