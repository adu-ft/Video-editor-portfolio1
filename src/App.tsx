import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeaderBanner } from './components/HeaderBanner';
import { HeroHeadline } from './components/HeroHeadline';
import { AboutSection } from './components/AboutSection';
import { FeaturedWork, ProjectItem } from './components/FeaturedWork';
import { StatsSection } from './components/StatsSection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { CinematicFadeIn } from './components/CinematicFadeIn';

export default function App() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isShowreel, setIsShowreel] = useState(false);

  const [initialServiceInquiry, setInitialServiceInquiry] = useState<string>('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenShowreel = () => {
    setSelectedProject(null);
    setIsShowreel(true);
    setIsVideoModalOpen(true);
  };

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsShowreel(false);
    setIsVideoModalOpen(true);
  };

  const handleSelectService = (serviceName: string) => {
    setInitialServiceInquiry(serviceName);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col selection:bg-[#FF4625] selection:text-white">
      {/* Fixed Horizontal Navigation Bar */}
      <Navbar
        onContactClick={() => scrollToSection('contact')}
        onProjectsClick={() => scrollToSection('projects')}
        onOpenShowreel={handleOpenShowreel}
      />

      {/* 1. Top Cinematic Hero Header Banner */}
      <div className="pt-16 sm:pt-20">
        <CinematicFadeIn direction="down" duration={800}>
          <HeaderBanner
            onContactClick={() => scrollToSection('contact')}
            onProjectsClick={() => scrollToSection('projects')}
          />
        </CinematicFadeIn>
      </div>

      {/* 2. Main Hero Headline & Partner Recognition */}
      <CinematicFadeIn direction="up" delay={150} duration={850}>
        <HeroHeadline
          onContactClick={() => scrollToSection('contact')}
          onViewProjectsClick={() => scrollToSection('projects')}
          onPreviewReelClick={handleOpenShowreel}
        />
      </CinematicFadeIn>

      {/* 3. High-Contrast White About Me Section */}
      <CinematicFadeIn direction="up" duration={800}>
        <AboutSection
          onContactClick={() => scrollToSection('contact')}
          onPlayShowreel={handleOpenShowreel}
        />
      </CinematicFadeIn>

      {/* 4. Featured Work Showcase Grid */}
      <CinematicFadeIn direction="up" duration={800}>
        <FeaturedWork onSelectProject={handleSelectProject} />
      </CinematicFadeIn>

      {/* 5. Stats & Facts Impact Numbers */}
      <CinematicFadeIn direction="up" duration={750}>
        <StatsSection />
      </CinematicFadeIn>

      {/* 7. Pro Services with Pricing Cards */}
      <CinematicFadeIn direction="up" duration={800}>
        <ServicesSection onSelectService={handleSelectService} />
      </CinematicFadeIn>

      {/* 8. Client Testimonials ("Voices About Me") */}
      <CinematicFadeIn direction="up" duration={800}>
        <TestimonialsSection />
      </CinematicFadeIn>

      {/* 9. Contact Section ("Let's collaborate on your next video project") */}
      <CinematicFadeIn direction="up" duration={800}>
        <ContactSection initialService={initialServiceInquiry} />
      </CinematicFadeIn>

      {/* 10. Frequently Asked Questions & Desk Setup */}
      <CinematicFadeIn direction="up" duration={800}>
        <FAQSection />
      </CinematicFadeIn>

      {/* 11. Footer with Big Brand Name and Nav */}
      <CinematicFadeIn direction="up" duration={750}>
        <Footer
          onAboutClick={() => scrollToSection('about')}
          onContactClick={() => scrollToSection('contact')}
          onProjectsClick={() => scrollToSection('projects')}
        />
      </CinematicFadeIn>

      {/* Video Lightbox / Reel Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        project={selectedProject}
        isShowreel={isShowreel}
      />
    </div>
  );
}
