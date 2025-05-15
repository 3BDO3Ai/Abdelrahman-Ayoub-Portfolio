import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaLinkedin, FaGithub, FaEnvelope, FaDownload } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import resumeData from '../data/resume';

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
    
    // Small delay to allow menu closing animation
    setTimeout(() => {
      // Find the element to scroll to
      const element = document.getElementById(id);
      if (element) {
        // Calculate scroll position with offset for header
        const headerOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // Smooth scroll to the element
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // After scrolling, update active section
        handleSectionClick(id);
      } else {
        // If element not found, just update active section
        handleSectionClick(id);
      }
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
          >
            {isDarkTheme ? <BsSun size={18} /> : <BsMoon size={18} />}
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