import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Hero from './components/Hero';
import About from './components/About';
import AudioPlayer from './components/AudioPlayer';
import VideoGallery from './components/VideoGallery';
import ImageGallery from './components/ImageGallery';
import Services from './components/Services';
import Achievements from './components/Achievements';
import Training from './components/Training';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import LanguageToggle from './components/LanguageToggle';
import AdminDashboard from './components/AdminDashboard';
import SEO from './components/SEO';
import { Toaster } from './components/ui/toaster';
import './App.css';

const Home = () => {
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Check if device is not mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setShowCursor(!isMobile);
  }, []);

  return (
    <div className="relative">
      <SEO />
      {showCursor && <CustomCursor />}
      <ScrollProgress />
      <ScrollToTop />
      <LanguageToggle />
      <Hero />
      <About />
      <Services />
      <Achievements />
      <Training />
      <AudioPlayer />
      <VideoGallery />
      <ImageGallery />
      <Testimonials />
      <Contact />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </LanguageProvider>
  );
}

export default App;