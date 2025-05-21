/**
 * Utility functions for handling scrolling behavior
 * These functions help ensure smooth scrolling works across different devices
 * and provide options for both smooth and immediate navigation
 */

/**
 * Scrolls to a specific section with configurable offset and smooth behavior
 * @param id - The ID of the element to scroll to
 * @param offset - Header offset in pixels
 */
export const scrollToSection = (id: string, offset: number = 70): void => {
  const element = document.getElementById(id);
  if (!element) return;

  // Get the position of the element relative to the viewport
  const elementPosition = element.getBoundingClientRect().top;
  // Add the current scroll position to get the absolute position
  const offsetPosition = elementPosition + window.scrollY - offset;
  
  // Use smooth scrolling if supported
  try {
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  } catch (error) {
    // Fallback for browsers that don't support smooth scrolling
    window.scrollTo(0, offsetPosition);
  }
};

/**
 * Specially optimized scrolling for mobile devices
 * @param id - The ID of the element to scroll to
 */
/**
 * FORCE jumps to a section with absolutely no animations
 * @param id - The ID of the element to scroll to
 * @param offset - Header offset in pixels
 */
export const directScrollToSection = (id: string, offset: number = 85): void => {
  const element = document.getElementById(id);
  if (!element) return;
  
  // Save original styles
  const htmlStyle = document.documentElement.style.cssText;
  const bodyStyle = document.body.style.cssText;
  
  // FORCE disable ALL animations and transitions completely
  document.documentElement.style.cssText = `
    scroll-behavior: auto !important;
    transition: none !important;
    animation: none !important;
  `;
  document.body.style.cssText = `
    scroll-behavior: auto !important;
    transition: none !important;
    animation: none !important;
  `;
  
  // Get element position
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const absolutePosition = rect.top + scrollTop - offset;
  
  // Use EVERY possible method to ensure immediate scrolling
  try {
    // Method 1: Direct property setting
    document.documentElement.scrollTop = absolutePosition;
    document.body.scrollTop = absolutePosition; // For Safari
    
    // Method 2: window.scrollTo with no behavior
    window.scrollTo(0, absolutePosition);
    
    // Method 3: element.scrollIntoView with alignToTop
    // But first override its smooth scrolling
    element.style.scrollBehavior = 'auto';
    setTimeout(() => {
      element.scrollIntoView({
        block: 'start',
        inline: 'nearest'
      });
      
      // Adjust for offset by scrolling back a bit
      setTimeout(() => {
        window.scrollBy(0, -offset);
      }, 0);
    }, 0);
  } catch (e) {
    console.error('Scroll error:', e);
  }
  
  // Restore original styles after a delay
  setTimeout(() => {
    document.documentElement.style.cssText = htmlStyle;
    document.body.style.cssText = bodyStyle;
  }, 500);
};

export const mobileScrollToSection = (id: string): void => {
  // Use a larger offset for mobile that accounts for the added top padding
  const isMobile = window.innerWidth <= 768;
  const headerOffset = isMobile ? 85 : 70; // Increased for better visibility with top padding
  
  // First ensure the target section exists
  const targetSection = document.getElementById(id);
  if (!targetSection) return;
  
  // Add 'section-active' class to the target section and remove from others
  // Also apply the peach accent color styles from the user's theme
  const allSections = document.querySelectorAll('.section');
  allSections.forEach(section => {
    const htmlSection = section as HTMLElement;
    if (section.id === id) {
      section.classList.add('section-active', 'focused');
      // Apply animation styles that match the user's preferred card transition
      htmlSection.style.transform = 'translateY(-8px) scale(1.03)';
      htmlSection.style.boxShadow = '0 25px 65px rgba(249, 177, 122, 0.25), 0 15px 30px rgba(0, 0, 0, 0.15)';
      htmlSection.style.borderColor = 'rgba(249, 177, 122, 0.3)';
      htmlSection.style.zIndex = '10';
    } else {
      section.classList.remove('section-active', 'focused');
      // Reset any inline styles
      htmlSection.style.transform = '';
      htmlSection.style.boxShadow = '';
      htmlSection.style.borderColor = '';
      htmlSection.style.zIndex = '';
    }
  });
  
  // Mobile specific positioning and scrolling
  if (isMobile) {
    // Calculate scroll position with optimized offset
    const elementPosition = targetSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
    // Use smooth scrolling with specific timing that matches the animation
    try {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } catch (error) {
      // Fallback for older browsers
      window.scrollTo(0, offsetPosition);
    }
    
    // Enhanced fallback with additional checks to ensure proper focus
    setTimeout(() => {
      // Get updated position (may have changed after initial scroll)
      const newElementPosition = targetSection.getBoundingClientRect().top;
      
      // If section isn't properly visible in viewport, adjust again
      if (Math.abs(newElementPosition - headerOffset) > 30) {
        const refinedOffset = targetSection.getBoundingClientRect().top + window.scrollY - headerOffset;
        // Use instant scrolling for immediate correction
        window.scrollTo(0, refinedOffset);
      }
      
      // Focus the element for accessibility and to ensure it's highlighted
      targetSection.setAttribute('tabindex', '-1');
      targetSection.focus({ preventScroll: true });
      
      // Final check in case everything else fails
      setTimeout(() => {
        if (Math.abs(targetSection.getBoundingClientRect().top - headerOffset) > 50) {
          // Last resort positioning
          window.scrollTo(0, targetSection.offsetTop - headerOffset);
        }
      }, 300);
    }, 500);
  } else {
    // Desktop scrolling - simpler version
    scrollToSection(id, headerOffset);
  }
};
