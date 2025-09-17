import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Main landing page component
const LandingPage = () => {
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