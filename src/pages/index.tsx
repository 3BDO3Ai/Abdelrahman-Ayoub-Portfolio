import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Hobbies from '../components/Hobbies';
import { Achievements } from '../components/Achievements';
import MobileNav from '../components/MobileNav';
import resumeData from '../data/resume';
import { motion, AnimatePresence } from 'framer-motion';
import scrollStyles from '../styles/ScrollFix.module.css';
import cardStyles from '../styles/CardFix.module.css';

interface HomeProps {
  toggleTheme?: () => void;
  isDarkTheme?: boolean;
}

// Define a type for section keys for better type safety
type SectionKey = 'about' | 'skills' | 'experience' | 'education' | 'projects' | 'hobbies' | 'achievements';

// Type the grid positions object
const GRID_POSITIONS: Record<SectionKey, string> = {
  about: 'about',
  skills: 'skills',
  experience: 'experience',
  education: 'education',
  projects: 'projects',
  hobbies: 'hobbies',
  achievements: 'achievements'
};

export default function Home({ toggleTheme = () => {}, isDarkTheme = true }: HomeProps) {
  const [activeSection, setActiveSection] = useState<SectionKey>('about');
  const [previousSection, setPreviousSection] = useState<SectionKey | null>(null);
  const [positions, setPositions] = useState<Record<SectionKey, string>>({ ...GRID_POSITIONS });
  
  // Function to handle section click
  const handleSectionClick = (id: SectionKey) => {
    if (id === activeSection) return; // Do nothing if clicking the active section
    
    // Save previous active section
    setPreviousSection(activeSection);
    
    // Update positions - swap the clicked section with about position
    // When clicking on the about section, return to default positions
    if (id === 'about') {
      // Reset to original positions
      setPositions({ ...GRID_POSITIONS });
    } else {
      // Swap positions between clicked section and current active section
      const newPositions = { ...positions };
      
      // If about is active, swap with clicked section
      if (activeSection === 'about') {
        newPositions[id] = 'about';
        newPositions['about'] = GRID_POSITIONS[id];
      } else {
        // If another section is active, swap the new clicked section with about 
        // and return the previous active section to its original position
        newPositions[id] = 'about';
        newPositions[activeSection] = GRID_POSITIONS[activeSection];
        newPositions['about'] = GRID_POSITIONS[id];
      }
      
      setPositions(newPositions);
    }
    
    // Update active section
    setActiveSection(id);
  };

  // Props for each section
  const getSectionProps = (id: SectionKey) => ({
    id,
    isActive: id === activeSection,
    isPrevious: id === previousSection,
    initialPosition: GRID_POSITIONS[id],
    targetPosition: positions[id], 
    onClick: () => handleSectionClick(id),
    className: `${cardStyles.card} ${cardStyles[`${id}Card`]}`,
    contentClassName: cardStyles.cardContent,
  });

  return (
    <>
      <Head>
        <title>{`${resumeData.personalInfo.name} - Resume`}</title>
        <meta name="description" content={`${resumeData.personalInfo.name}'s personal resume website`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Mobile Navigation - Only visible on mobile devices via CSS */}
      <MobileNav 
        activeSection={activeSection} 
        handleSectionClick={handleSectionClick as (id: string) => void} 
        toggleTheme={toggleTheme} 
        isDarkTheme={isDarkTheme} 
      />
      
      <div className={`main-responsive-layout ${scrollStyles.scrollableLayout}`}>
        <aside className={`sidebar ${scrollStyles.stickyHeader}`}>
          <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
        </aside>
        <main className={`content-area ${scrollStyles.scrollableContent}`}>
          <div className={`content-grid ${scrollStyles.scrollableGrid} ${cardStyles.cardContainer}`}>
            <About {...getSectionProps('about')} />
            <Skills {...getSectionProps('skills')} />
            <Experience {...getSectionProps('experience')} />
            <Education {...getSectionProps('education')} />
            <Projects {...getSectionProps('projects')} />
            <Hobbies {...getSectionProps('hobbies')} />
            <Achievements {...getSectionProps('achievements')} certifications={resumeData.certifications} awards={resumeData.awards} leadership={resumeData.leadership} />
          </div>
        </main>
      </div>
    </>
  );
}