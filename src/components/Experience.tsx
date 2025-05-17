import React from 'react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume';
import ContentSection from './ContentSection';

interface ExperienceProps {
  id: string;
  isActive: boolean;
  isPrevious: boolean;
  initialPosition: string;
  targetPosition: string;
  onClick: () => void;
  className?: string;
  contentClassName?: string;
}

const Experience: React.FC<ExperienceProps> = ({ 
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
      title="Experience"
      isActive={isActive}
      isPrevious={isPrevious}
      initialPosition={initialPosition}
      targetPosition={targetPosition}
      onClick={onClick}
      className={className}
      contentClassName={contentClassName}
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
    </ContentSection>
  );
};

export default Experience;