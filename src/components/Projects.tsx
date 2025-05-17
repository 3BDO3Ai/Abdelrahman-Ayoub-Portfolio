import React from 'react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume';
import ContentSection from './ContentSection';
import styles from '../styles/CardFix.module.css';

interface ProjectsProps {
  id: string;
  isActive: boolean;
  isPrevious: boolean;
  initialPosition: string;
  targetPosition: string;
  onClick: () => void;
  className?: string;
  contentClassName?: string;
}

const Projects: React.FC<ProjectsProps> = ({ 
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
      title="Projects"
      isActive={isActive}
      isPrevious={isPrevious}
      initialPosition={initialPosition}
      targetPosition={targetPosition}
      onClick={onClick}
      className={`${className} ${styles.projectsCard}`}
      contentClassName={`${contentClassName} ${styles.projectsContent}`}
    >
        <div style={{ marginTop: '0.2rem', height: '100%' }}>
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
    </ContentSection>
  );
};

export default Projects;