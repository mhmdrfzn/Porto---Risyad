import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{
            scale: 1.15,
            rotate: -10,
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-surface-950 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-shadow duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-30 w-96 h-96 rounded-full opacity-[0.04] hidden lg:block"
      style={{
        background: 'radial-gradient(circle, rgba(16, 185, 129, 1) 0%, transparent 70%)',
        left: position.x - 192,
        top: position.y - 192,
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
      }}
    />
  );
}

function App() {
  return (
    <div className="relative min-h-screen bg-surface-950 font-sans">
      {/* Background effects */}
      <ParticleBackground />
      <CursorGlow />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
}

export default App;
