import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon, FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaPaperclip, FaDiscord, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import resumeData from '../data/resume';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

// TimeBox component with hover effects
const TimeBox: React.FC<{ large?: boolean; style?: React.CSSProperties }> = ({ large, style }) => {
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const [now, setNow] = React.useState(new Date());
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'var(--background)',
        borderRadius: 18,
        boxShadow: isHovered ? '0 4px 16px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.07)',
        padding: isMobile ? '1rem' : '1.2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        border: '1px solid var(--border-color)',
        cursor: 'default',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        marginLeft: '0.5rem',
        width: '100%',
        maxWidth: isMobile ? '100%' : '350px',
        ...style
      }}
    >
      <span style={{ fontSize: '1rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Current Time</span>
      <span style={{ 
        fontSize: '2.5rem', 
        fontWeight: 700, 
        letterSpacing: 2, 
        color: 'var(--accent)',
        transition: 'color 0.3s'
      }}>
        {hours}:{minutes}
      </span>
      <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>Mansoura, Egypt</span>
    </div>
  );
};

const LocationBox: React.FC<{ large?: boolean; style?: React.CSSProperties; isDarkTheme: boolean }> = ({ large, style, isDarkTheme }) => {
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const [isHovered, setIsHovered] = React.useState(false);
  const location = "Mansoura Qism 2, Mansoura, Egypt";
  const googleMapsUrl = `https://www.google.com/maps/place/${location}`;
  
  return (
    <a 
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'var(--background)',
        borderRadius: 18,
        boxShadow: isHovered ? '0 4px 16px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.07)',
        padding: isMobile ? '1rem' : '1.2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        border: '1px solid var(--border-color)',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        textDecoration: 'none',
        marginLeft: '0.5rem',
        width: '100%',
        maxWidth: isMobile ? '100%' : '350px',
        ...style
      }}
    >
      <span style={{ fontSize: '1rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Location</span>
      <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.75rem' }}>
        Mansoura
      </span>
      <div style={{ 
        borderRadius: 12, 
        overflow: 'hidden', 
        boxShadow: '0 1px 8px rgba(0,0,0,0.1)', 
        width: '100%', 
        height: isMobile ? '120px' : '130px',
        maxWidth: '100%',
        position: 'relative',
        background: '#f5f5f5',
        marginTop: '0.5rem'
      }}>
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=31.3351%2C31.0283%2C31.4152%2C31.0683&amp;layer=mapnik&amp;marker=31.0483%2C31.3751"
          width="100%"
          height="130"
          frameBorder="0"
          loading="lazy"
          style={{
            border: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            filter: isDarkTheme ? 'brightness(0.8) contrast(1.1)' : 'none',
            objectFit: 'cover'
          }}
        />
        {isHovered && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 600
          }}>
            View on Google Maps
          </div>
        )}
      </div>
    </a>
  );
};

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkTheme }) => {
  const { personalInfo } = resumeData;

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    document.body.classList.toggle('mobile-nav-open');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={`header-content ${styles.headerContent}`}>
          <div className={styles.themeToggle}>
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkTheme ? <FaSun className="icon-sun" size={20} /> : <FaMoon className="icon-moon" size={20} />}
              <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem' }}>
                {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
          </div>
          
          <div className={styles.personalInfo}>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ marginBottom: '0.4rem', fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)' }}
            >
              {personalInfo.name}
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              style={{ 
                fontSize: '1rem', 
                fontWeight: 400, 
                color: 'var(--text-light)',
                marginBottom: '1rem'
              }}
            >
              {personalInfo.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              style={{ fontSize: '0.85rem', marginBottom: '1rem' }}
            >
              <div className={styles.contactItem}>
                <FaEnvelope className={styles.contactIcon}/>
                <span className={styles.contactText}>{personalInfo.email}</span>
              </div>
              <div className={styles.contactItem}>
                <FaPhone className={styles.contactIcon}/>
                <span className={styles.contactText}>{personalInfo.phone}</span>
              </div>
              {personalInfo.discord && (
                <div className={styles.contactItem}>
                  <FaDiscord className={styles.contactIcon}/>
                  <span className={styles.contactText}>Discord: {personalInfo.discord}</span>
                </div>
              )}
              <div className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.contactIcon}/>
                <span className={styles.contactText}>{personalInfo.location}</span>
              </div>
            </motion.div>
          </div>

          <div className={styles.socialLinks}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className={`social-links ${styles.socialLinksContainer}`}
            >
              <a 
                href={`mailto:${personalInfo.email}`} 
                aria-label="Email me"
                className={`icon-button ${styles.iconButton}`}
              >
                <FaEnvelope />
              </a>
              <a 
                href={`https://www.linkedin.com/in/${personalInfo.linkedin}/`} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`icon-button ${styles.iconButton}`}
                aria-label="LinkedIn profile"
              >
                <FaLinkedin />
              </a>
              <a 
                href={`https://github.com/${personalInfo.github}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`icon-button ${styles.iconButton}`}
                aria-label="GitHub profile"
              >
                <FaGithub />
              </a>
              <button 
                className={styles.themeButton}
                onClick={toggleTheme}
                aria-label={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkTheme ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
            </motion.div>
            
            {resumeData.availableForHire && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className={styles.hireBox}
                >
                  <h3 className={styles.hireTitle}>Available for hire</h3>
                  <p className={styles.hireText}>
                    Open to freelance or part-time
                  </p>
                  <a 
                    href={`mailto:${personalInfo.email}?subject=Job Opportunity`}
                    className={`button ${styles.hireButton}`}
                  >
                    Contact me
                  </a>
                </motion.div>

                {/* Time and Location Boxes */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className={styles.timeLocationContainer}
                >
                  <TimeBox large style={{ width: '100%' }} />
                  <LocationBox large style={{ width: '100%' }} isDarkTheme={isDarkTheme} />
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
