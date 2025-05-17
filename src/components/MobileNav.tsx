import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaSun, FaMoon } from 'react-icons/fa';
import resumeData from '../data/resume';
import { mobileScrollToSection } from '../utils/scrollUtils';

interface MobileNavProps {
  activeSection: string;
  handleSectionClick: (id: string) => void;
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({ 
  activeSection, 
  handleSectionClick, 
  toggleTheme, 
  isDarkTheme 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (id: string) => {
    // Close menu first
    setIsOpen(false);
    
    // Update active section immediately to trigger UI changes
    handleSectionClick(id);
    
    // Small delay to allow menu closing animation
    setTimeout(() => {
      // Use our optimized mobile scrolling utility
      mobileScrollToSection(id);
    }, 300);
  };

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'hobbies', label: 'Hobbies' }
  ];

  return (
    <div className="mobile-nav-container">
      <div className="mobile-nav-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            className="mobile-nav-toggle" 
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <FaBars size={20} />
          </button>
          <span style={{ marginLeft: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>Menu</span>
        </div>
        <div>
          <button 
            className="theme-toggle-mobile" 
            onClick={toggleTheme}
            aria-label={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              padding: '0.6rem',
              fontSize: '1.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.6rem',
              height: '2.6rem',
              margin: 0,
              borderRadius: '50%',
              backgroundColor: 'var(--background-lighter)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              border: 'none',
              color: isDarkTheme ? '#F9D71C' : '#5A5A5A'
            }}
          >
            {isDarkTheme ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-nav-menu"
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="mobile-nav-menu-header">
              <button 
                className="mobile-nav-close" 
                onClick={toggleMenu}
                aria-label="Close navigation menu"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            {/* Personal Info Section */}
            <div className="mobile-personal-info">
              <h1>{resumeData.personalInfo.name}</h1>
              <h2>{resumeData.personalInfo.title}</h2>
              
              <div className="mobile-contact-info">
                <div className="mobile-contact-item">
                  <FaEnvelope />
                  <span>{resumeData.personalInfo.email}</span>
                </div>
                <div className="mobile-contact-item">
                  <span style={{ fontSize: '1.2rem' }}>📱</span>
                  <span>{resumeData.personalInfo.phone}</span>
                </div>
                {resumeData.personalInfo.discord && (
                  <div className="mobile-contact-item">
                    <span style={{ fontSize: '1.2rem' }}>💬</span>
                    <span>Discord: {resumeData.personalInfo.discord}</span>
                  </div>
                )}
                <div className="mobile-contact-item">
                  <span style={{ fontSize: '1.2rem' }}>📍</span>
                  <span>{resumeData.personalInfo.location}</span>
                </div>
              </div>
              
              <div className="mobile-social-links">
                <a 
                  href={`mailto:${resumeData.personalInfo.email}`} 
                  aria-label="Email me"
                  className="mobile-social-link"
                >
                  <FaEnvelope size={18} />
                </a>
                <a 
                  href={`https://www.linkedin.com/in/${resumeData.personalInfo.linkedin}/`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="mobile-social-link"
                >
                  <FaLinkedin size={18} />
                </a>
                <a 
                  href={`https://github.com/${resumeData.personalInfo.github}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="mobile-social-link"
                >
                  <FaGithub size={18} />
                </a>
                <a 
                  href="/Abdelrahman Ahmed Karim Mohamed_CV_V5.pdf" 
                  download
                  className="mobile-social-link"
                  aria-label="Download CV"
                >
                  <FaDownload size={18} />
                </a>
              </div>
            </div>
            
            <div className="mobile-nav-divider"></div>
            
            <nav className="mobile-nav-links">
              {sections.map(section => (
                <button
                  key={section.id}
                  className={`mobile-nav-link ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(section.id)}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isOpen && (
        <motion.div 
          className="mobile-nav-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

export default MobileNav;