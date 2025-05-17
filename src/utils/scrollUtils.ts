/**
 * Utility functions for handling scrolling behavior
 * These functions help ensure smooth scrolling works across different devices
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
export const mobileScrollToSection = (id: string): void => {
  // Use a larger offset for mobile
  const isMobile = window.innerWidth <= 768;
  const headerOffset = isMobile ? 85 : 70;
  
  // Scroll to the section
  scrollToSection(id, headerOffset);
  
  // For mobile devices, we might need to handle additional behaviors
  if (isMobile) {
    // Some mobile browsers have issues with smooth scrolling - add a fallback
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offsetPosition = element.getBoundingClientRect().top + window.scrollY - headerOffset;
        // Check if element is visible in viewport
        if (Math.abs(element.getBoundingClientRect().top - headerOffset) > 50) {
          window.scrollTo(0, offsetPosition);
        }
      }
    }, 500);
  }
};
