import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { PriceCalculator } from './components/PriceCalculator';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Portfolio } from './components/Portfolio';
import { Process } from './components/Process';
import { HowToOrder } from './components/HowToOrder';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackgroundEmbers } from './components/3d/BackgroundEmbers';
import { InteractiveCursor } from './components/InteractiveCursor';
import { ProjectModal } from './components/ProjectModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<'static' | 'dynamic' | 'custom'>('static');

  const handleStartProject = (type: 'static' | 'dynamic' | 'custom' = 'static') => {
    setSelectedPackage(type);
    setModalOpen(true);
  };

  const handleExploreWork = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenContactForm = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-white selection:bg-[#FF5A1F] selection:text-white font-['Plus_Jakarta_Sans']">
      {/* Interactive Cursor for Desktop */}
      <InteractiveCursor />

      {/* Ambient background floating embers */}
      <BackgroundEmbers />

      {/* Sticky Navigation */}
      <Navbar onOpenOrderModal={() => handleStartProject('static')} />

      {/* Hero Section */}
      <main id="home">
        <Hero
          onStartProject={() => handleStartProject('static')}
          onExploreWork={handleExploreWork}
        />

        {/* Services & Packages */}
        <Services onSelectPackage={(type) => handleStartProject(type)} />

        {/* Why Choose WEBX */}
        <WhyChooseUs />

        {/* Interactive Instant Price Calculator */}
        <PriceCalculator />

        {/* Portfolio Showcase */}
        <Portfolio />

        {/* 4-Step Development Process */}
        <Process />

        {/* How to Order Steps */}
        <HowToOrder onOpenContactForm={handleOpenContactForm} />

        {/* About WEBX & Mehul Roy */}
        <AboutSection />

        {/* Contact Form & WhatsApp Submission */}
        <ContactSection initialType={selectedPackage} />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Fast Track Project Onboarding Modal */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultType={selectedPackage}
      />
    </div>
  );
}
