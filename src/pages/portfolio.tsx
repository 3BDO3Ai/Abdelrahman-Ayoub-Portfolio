import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import resumeData from '../data/resume';
import { FaExternalLinkAlt, FaCode, FaChartLine, FaShoppingCart, FaPlane, FaStethoscope, FaUser, FaGlobe, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import scrollStyles from '../styles/ScrollFix.module.css';

interface PortfolioProps {
  toggleTheme?: () => void;
  isDarkTheme?: boolean;
}

interface GalleryState {
  isOpen: boolean;
  projectIndex: number;
  imageIndex: number;
}

export default function Portfolio({ toggleTheme = () => {}, isDarkTheme = true }: PortfolioProps) {
  const [gallery, setGallery] = useState<GalleryState>({
    isOpen: false,
    projectIndex: 0,
    imageIndex: 0
  });
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [previewImageIndex, setPreviewImageIndex] = useState<{ [key: number]: number }>({});

  // Project icons mapping
  const getProjectIcon = (title: string) => {
    if (title.toLowerCase().includes('data') || title.toLowerCase().includes('machine learning')) return <FaChartLine size={24} />;
    if (title.toLowerCase().includes('fashion') || title.toLowerCase().includes('ecommerce') || title.toLowerCase().includes('e-commerce')) return <FaShoppingCart size={24} />;
    if (title.toLowerCase().includes('tourism') || title.toLowerCase().includes('booking')) return <FaPlane size={24} />;
    if (title.toLowerCase().includes('medical') || title.toLowerCase().includes('pediatrician')) return <FaStethoscope size={24} />;
    if (title.toLowerCase().includes('portfolio') || title.toLowerCase().includes('personal')) return <FaUser size={24} />;
    if (title.toLowerCase().includes('business') || title.toLowerCase().includes('bilingual')) return <FaGlobe size={24} />;
    return <FaCode size={24} />;
  };

  // Get all images for a project (numbered sequence)
  const getProjectImages = (title: string) => {
    const folderMap: { [key: string]: string } = {
      'Data Analysis & Machine Learning Platform': 'Data Analysis & Machine Learning Platform',
      'Luxury Fashion E-commerce Store': 'Luxury Fashion E-commerce Store',
      'Multilingual Tourism Booking Platform': 'Multilingual Tourism Booking Platform',
      'Medical Landing Page for Pediatrician': 'Medical Landing Page for Pediatrician',
      'Personal Portfolio Website with Animations': 'Personal Portfolio Website with Animations',
      'Bilingual Business Website': 'Bilingual Business Website',
      'Modern Portfolio Website with Next.js': 'Modern Portfolio Website with Next.js',
      'Professional Responsive Portfolio': 'Professional Responsive Portfolio',
    };

    const folderName = folderMap[title];
    if (!folderName) return [];

    // Return numbered sequence of images - generate up to 15 possible images
    const images = [];
    for (let i = 1; i <= 15; i++) {
      images.push(`/images/projects/${folderName}/${i}.png`);
    }
    return images;
  };

  // Get cover image (always 1.png)
  const getCoverImage = (title: string) => {
    const folderMap: { [key: string]: string } = {
      'Data Analysis & Machine Learning Platform': 'Data Analysis & Machine Learning Platform',
      'Luxury Fashion E-commerce Store': 'Luxury Fashion E-commerce Store',
      'Multilingual Tourism Booking Platform': 'Multilingual Tourism Booking Platform',
      'Medical Landing Page for Pediatrician': 'Medical Landing Page for Pediatrician',
      'Personal Portfolio Website with Animations': 'Personal Portfolio Website with Animations',
      'Bilingual Business Website': 'Bilingual Business Website',
      'Modern Portfolio Website with Next.js': 'Modern Portfolio Website with Next.js',
      'Professional Responsive Portfolio': 'Professional Responsive Portfolio',
    };

    const folderName = folderMap[title];
    return folderName ? `/images/projects/${folderName}/1.png` : null;
  };

  // Project gradient colors for visual consistency
  const getProjectGradient = (index: number) => {
    const colors = [
      ['#667eea', '#764ba2'], // Data Analysis - Purple/Blue gradient
      ['#f093fb', '#f5576c'], // Fashion Store - Pink gradient
      ['#4facfe', '#00f2fe'], // Tourism - Blue/Cyan gradient
      ['#43e97b', '#38f9d7'], // Medical - Green/Mint gradient
      ['#fa709a', '#fee140'], // Portfolio - Pink/Yellow gradient
      ['#a8edea', '#fed6e3'], // Business - Light gradient
      ['#ffecd2', '#fcb69f'], // Modern Portfolio - Orange gradient
      ['#ff9a9e', '#fecfef'], // Professional Portfolio - Pink gradient
    ];
    
    return colors[index % colors.length];
  };

  // Initialize preview images for each project
  useEffect(() => {
    const initialPreview: { [key: number]: number } = {};
    resumeData.projects.forEach((_, index) => {
      initialPreview[index] = 0;
    });
    setPreviewImageIndex(initialPreview);
  }, []);

  const openGallery = (projectIndex: number, imageIndex: number = 0) => {
    const images = getProjectImages(resumeData.projects[projectIndex].title);
    setCurrentImages(images);
    setGallery({ isOpen: true, projectIndex, imageIndex });
  };

  const closeGallery = () => {
    setGallery({ isOpen: false, projectIndex: 0, imageIndex: 0 });
    setCurrentImages([]);
  };

  const nextImage = () => {
    if (currentImages.length > 0) {
      setGallery(prev => ({
        ...prev,
        imageIndex: (prev.imageIndex + 1) % currentImages.length
      }));
    }
  };

  const prevImage = () => {
    if (currentImages.length > 0) {
      setGallery(prev => ({
        ...prev,
        imageIndex: prev.imageIndex === 0 ? currentImages.length - 1 : prev.imageIndex - 1
      }));
    }
  };

  const scrollPreviewImages = (projectIndex: number, direction: 'left' | 'right') => {
    const images = getProjectImages(resumeData.projects[projectIndex].title);
    if (images.length === 0) return;

    setPreviewImageIndex(prev => {
      const currentIndex = prev[projectIndex] || 0;
      let newIndex;
      
      if (direction === 'right') {
        newIndex = (currentIndex + 1) % images.length;
      } else {
        newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      }
      
      return { ...prev, [projectIndex]: newIndex };
    });
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gallery.isOpen) {
        switch (e.key) {
          case 'Escape':
            closeGallery();
            break;
          case 'ArrowLeft':
            prevImage();
            break;
          case 'ArrowRight':
            nextImage();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gallery.isOpen, currentImages.length]);

  return (
    <>
      <Head>
        <title>{`${resumeData.personalInfo.name} - Portfolio`}</title>
        <meta name="description" content={`${resumeData.personalInfo.name}'s professional portfolio`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Mobile Navigation - Only visible on mobile devices via CSS */}
      <MobileNav 
        activeSection="portfolio" 
        handleSectionClick={() => {}} 
        toggleTheme={toggleTheme} 
        isDarkTheme={isDarkTheme} 
      />

      <div className={`main-responsive-layout ${scrollStyles.scrollableLayout}`}>
        <aside className={`sidebar ${scrollStyles.stickyHeader}`}>
          <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} currentPage="portfolio" />
        </aside>
        <main className={`content-area ${scrollStyles.scrollableContent}`}>
          <div style={{ 
            padding: '2rem clamp(1rem, 4vw, 3rem)',
            maxWidth: '1400px',
            margin: '0 auto',
            minHeight: '100vh'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 style={{ 
                fontSize: 'clamp(2rem, 5vw, 3rem)', 
                fontWeight: 700, 
                marginBottom: '1rem', 
                color: 'var(--text)',
                textAlign: 'center'
              }}>
                My Portfolio
              </h1>
              <p style={{ 
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', 
                color: 'var(--text-light)', 
                textAlign: 'center',
                marginBottom: '3rem',
                maxWidth: '800px',
                margin: '0 auto 3rem auto',
                lineHeight: 1.6
              }}>
                Explore my professional projects spanning data science, machine learning, full-stack web development, and e-commerce solutions. 
                Each project demonstrates my expertise in delivering high-quality, scalable solutions for diverse business needs.
              </p>
            </motion.div>

            {/* Projects Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))', 
              gap: 'clamp(1rem, 3vw, 2rem)',
              padding: '0'
            }}>
              {resumeData.projects.map((project, index) => {
                const gradientColors = getProjectGradient(index);
                const projectImages = getProjectImages(project.title);
                const currentPreviewIndex = previewImageIndex[index] || 0;
                const coverImage = projectImages[currentPreviewIndex] || getCoverImage(project.title);
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    style={{
                      background: 'var(--card-background)',
                      borderRadius: '20px',
                      padding: '0',
                      boxShadow: isDarkTheme 
                        ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
                        : '0 8px 32px rgba(0, 0, 0, 0.12)',
                      border: `1px solid ${isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'var(--border-color)'}`,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      position: 'relative' as const,
                      overflow: 'hidden'
                    }}
                    whileHover={{ 
                      transform: 'translateY(-8px)',
                      boxShadow: isDarkTheme 
                        ? '0 16px 40px rgba(0, 0, 0, 0.4)'
                        : '0 16px 40px rgba(0, 0, 0, 0.2)'
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => openGallery(index)}
                  >
                    {/* Project Image Section with Navigation */}
                    <div style={{
                      width: '100%',
                      height: 'clamp(200px, 30vw, 280px)',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '20px 20px 0 0',
                    }}>
                      {coverImage && (
                        <img
                          src={coverImage}
                          alt={project.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top center',
                            transition: 'transform 0.3s ease',
                            transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.style.background = `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`;
                              parent.style.display = 'flex';
                              parent.style.alignItems = 'center';
                              parent.style.justifyContent = 'center';
                              parent.style.color = 'white';
                              parent.style.fontSize = 'clamp(1rem, 2.5vw, 1.2rem)';
                              parent.style.fontWeight = '600';
                              parent.innerHTML = project.title.split(' ').slice(0, 2).join(' ');
                            }
                          }}
                        />
                      )}
                      
                      {/* Image Navigation Arrows */}
                      {projectImages.length > 1 && hoveredCard === index && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              scrollPreviewImages(index, 'left');
                            }}
                            style={{
                              position: 'absolute',
                              left: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'rgba(0, 0, 0, 0.7)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '50%',
                              width: '35px',
                              height: '35px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              zIndex: 10
                            }}
                          >
                            <FaChevronLeft size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              scrollPreviewImages(index, 'right');
                            }}
                            style={{
                              position: 'absolute',
                              right: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'rgba(0, 0, 0, 0.7)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '50%',
                              width: '35px',
                              height: '35px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              zIndex: 10
                            }}
                          >
                            <FaChevronRight size={14} />
                          </button>
                        </>
                      )}
                      
                      {/* Project Icon Overlay */}
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        width: 'clamp(45px, 8vw, 55px)',
                        height: 'clamp(45px, 8vw, 55px)',
                        background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        zIndex: 5
                      }}>
                        {getProjectIcon(project.title)}
                      </div>

                      {/* Image Counter */}
                      {projectImages.length > 1 && (
                        <div style={{
                          position: 'absolute',
                          bottom: '1rem',
                          right: '1rem',
                          background: 'rgba(0, 0, 0, 0.7)',
                          color: 'white',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          zIndex: 5
                        }}>
                          {(previewImageIndex[index] || 0) + 1} / {projectImages.length}
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: 'clamp(1.5rem, 4vw, 2rem)' }}>
                      {/* Decorative background element */}
                      <div style={{
                        position: 'absolute',
                        top: 'clamp(160px, 25vw, 200px)',
                        right: -50,
                        width: 120,
                        height: 120,
                        background: `linear-gradient(135deg, ${gradientColors[0]}15, ${gradientColors[1]}15)`,
                        borderRadius: '50%',
                        zIndex: 0
                      }} />

                      <h3 style={{
                        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        color: 'var(--text)',
                        lineHeight: 1.3,
                        position: 'relative' as const,
                        zIndex: 1
                      }}>
                        {project.title}
                      </h3>

                      <p style={{
                        color: 'var(--text-light)',
                        lineHeight: 1.7,
                        marginBottom: '2rem',
                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                        position: 'relative' as const,
                        zIndex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {project.description}
                      </p>

                      {project.technologies && (
                        <div style={{ marginBottom: '1rem', position: 'relative' as const, zIndex: 1 }}>
                          <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: 'clamp(0.3rem, 1vw, 0.5rem)' 
                          }}>
                            {project.technologies.slice(0, 4).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                style={{
                                  background: isDarkTheme
                                    ? `linear-gradient(135deg, ${gradientColors[0]}25, ${gradientColors[1]}25)`
                                    : `linear-gradient(135deg, ${gradientColors[0]}15, ${gradientColors[1]}15)`,
                                  color: 'var(--text)',
                                  padding: 'clamp(0.3rem, 1vw, 0.4rem) clamp(0.6rem, 2vw, 0.8rem)',
                                  borderRadius: '8px',
                                  fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                                  fontWeight: 600,
                                  border: `1px solid ${gradientColors[0]}30`,
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span style={{
                                color: 'var(--text-light)',
                                fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                                padding: 'clamp(0.3rem, 1vw, 0.4rem) clamp(0.6rem, 2vw, 0.8rem)',
                                alignSelf: 'center',
                                fontWeight: 500
                              }}>
                                +{project.technologies.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Click to view gallery hint */}
                      <div style={{
                        textAlign: 'center',
                        color: 'var(--text-light)',
                        fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                        fontStyle: 'italic',
                        marginTop: '1rem',
                        position: 'relative' as const,
                        zIndex: 1
                      }}>
                        Click to view gallery ({projectImages.length} images)
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Image Gallery Modal */}
            <AnimatePresence>
              {gallery.isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.95)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                  }}
                  onClick={closeGallery}
                >
                  {/* Close Button */}
                  <button
                    onClick={closeGallery}
                    style={{
                      position: 'absolute',
                      top: '2rem',
                      right: '2rem',
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      zIndex: 1001
                    }}
                  >
                    <FaTimes />
                  </button>

                  {/* Navigation Buttons */}
                  {currentImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        style={{
                          position: 'absolute',
                          left: '2rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '60px',
                          height: '60px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '1.5rem',
                          zIndex: 1001
                        }}
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        style={{
                          position: 'absolute',
                          right: '2rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '60px',
                          height: '60px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '1.5rem',
                          zIndex: 1001
                        }}
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  )}

                  {/* Main Image */}
                  <motion.div
                    key={gallery.imageIndex}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      maxWidth: '90vw',
                      maxHeight: '80vh',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {currentImages[gallery.imageIndex] && (
                      <img
                        src={currentImages[gallery.imageIndex]}
                        alt={`${resumeData.projects[gallery.projectIndex]?.title} - Image ${gallery.imageIndex + 1}`}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          borderRadius: '10px',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Image Counter */}
                  <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '25px',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    {gallery.imageIndex + 1} / {currentImages.length}
                  </div>

                  {/* Project Title */}
                  <div style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    color: 'white',
                    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                    fontWeight: '600',
                    maxWidth: '60%'
                  }}>
                    {resumeData.projects[gallery.projectIndex]?.title}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Mobile Responsive CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          aside {
            display: none !important;
          }
          main {
            display: block !important;
          }
        }
        
        @media (max-width: 480px) {
          .galleryImage {
            max-width: 95vw !important;
            max-height: 75vh !important;
          }
          
          .navButton {
            width: 45px !important;
            height: 45px !important;
            font-size: 1.1rem !important;
          }
          
          .closeButton {
            width: 45px !important;
            height: 45px !important;
            top: 1rem !important;
            right: 1rem !important;
          }
        }
      `}</style>
    </>
  );
}
