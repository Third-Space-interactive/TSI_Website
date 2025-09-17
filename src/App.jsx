import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import AboutDetailed from './components/AboutDetailed.jsx';
import About from './components/About.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import Services from './components/Services.jsx';
import Projects from './components/Projects.jsx';
import Testimonials from './components/Testimonials.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ProjectPage from './components/ProjectPage.jsx';

// Hash scrolling hook
const useHashScrolling = () => {
  useEffect(() => {
    // Handle hash scrolling on page load
    const handleHashScrolling = () => {
      const hash = window.location.hash;
      if (hash) {
        // Remove the # from hash
        const elementId = hash.substring(1);
        
        // Wait for page to fully load, then scroll
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 500); // Longer delay to ensure all animations are loaded
      }
    };

    // Run on mount
    handleHashScrolling();
    
    // Also run when hash changes
    window.addEventListener('hashchange', handleHashScrolling);
    
    return () => {
      window.removeEventListener('hashchange', handleHashScrolling);
    };
  }, []);
};

// Main landing page component
const LandingPage = () => {
  useHashScrolling(); // Add hash scrolling to landing page
  
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
      <AboutDetailed />
      <About />
      <Projects />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/project/:projectId" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
};

export default App;