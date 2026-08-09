import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

import Navbar from './components/Navbar';
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
            scale: 1.1,
            boxShadow: '0 0 20px rgba(227, 213, 202, 0.2)',
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 p-3 sm:p-4 rounded-none bg-[var(--color-nocturne-surface)] border border-[var(--color-nocturne-sand)] text-[var(--color-nocturne-cream)] hover:bg-[var(--color-nocturne-sand)] hover:text-[var(--color-nocturne-base)] transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} strokeWidth={1.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="relative min-h-screen bg-[var(--color-nocturne-base)] font-sans">
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
