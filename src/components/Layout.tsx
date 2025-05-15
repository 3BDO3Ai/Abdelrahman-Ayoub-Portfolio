import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import resumeData from '../data/resume';
import { ThemeName } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeName>('dark');

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme') as ThemeName;
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme);
    } else {
      // Check for system preference if no saved preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    // Apply theme to document root element
    document.documentElement.setAttribute('data-theme', theme);
    
    // Also apply theme to the body element for extra compatibility
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
    
    console.log('Theme changed to:', theme); // Debug log
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    console.log('Toggling theme from', theme, 'to', newTheme); // Debug log
    setTheme(newTheme);
  };

  // Clone children with theme props
  const childrenWithProps = React.Children.map(children, child => {
    // Check if the child is a valid React element
    if (React.isValidElement<{ toggleTheme?: () => void; isDarkTheme?: boolean }>(child)) {
      // Pass the props to the child element
      return React.cloneElement(child, { 
        toggleTheme, 
        isDarkTheme: theme === 'dark' 
      });
    }
    return child;
  });

  return (
    <>
      <Head>
        <title>{resumeData.personalInfo.name} - Resume</title>
        <meta name="description" content={`Resume of ${resumeData.personalInfo.name}, ${resumeData.personalInfo.title}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="main-container"
      >
        {childrenWithProps}
      </motion.div>
    </>
  );
};

export default Layout;