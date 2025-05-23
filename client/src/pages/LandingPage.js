import React from 'react';
import Header from '../components/common/Landing/Header';
import Hero from '../components/common/Landing/Hero';
import AboutPods from '../components/common/Landing/AboutPods';
import HowItWorks from '../components/common/Landing/HowItWorks';
import Features from '../components/common/Landing/Features';
import MissionVision from '../components/common/Landing/MissionVision';
import DownloadApp from '../components/common/Landing/DownloadApp';
import Footer from '../components/common/Landing/Footer';

const LandingPage = () => {
  return (
    <div className="landing-bg min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <AboutPods />
        <HowItWorks />
        <Features />
        <MissionVision />
        <DownloadApp />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage; 