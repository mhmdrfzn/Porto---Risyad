import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), href: '#beranda' },
    { name: t('nav.about'), href: '#tentang' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#proyek' },
    { name: t('nav.contact'), href: '#kontak' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 bg-[var(--color-nocturne-base)]/90 backdrop-blur-md border-b border-[var(--color-nocturne-elevated)] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 py-4 sm:py-5">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <motion.a
            href="#beranda"
            whileHover={{ scale: 1.05 }}
            className="group text-xl font-bold tracking-[0.2em] uppercase font-heading text-cream flex items-center gap-2"
          >
            RISYAD<span className="w-2 h-2 bg-[var(--color-nocturne-sand)] rounded-full block" />
          </motion.a>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  className="hover-underline relative text-cream-dim hover:text-cream editorial-mono text-xs tracking-widest transition-colors duration-300"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="w-px h-4 bg-surface-700" />

            {/* Language toggle */}
            <motion.button
              onClick={toggleLang}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-cream-dim hover:text-cream transition-colors duration-300"
              title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            >
              <Globe size={14} />
              <span className="editorial-mono text-xs font-semibold tracking-wider">{lang === 'id' ? 'EN' : 'ID'}</span>
            </motion.button>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden flex items-center gap-5">
            <button onClick={toggleLang} className="text-cream-dim hover:text-cream">
              <span className="editorial-mono text-xs font-bold">{lang === 'id' ? 'EN' : 'ID'}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cream-dim hover:text-cream transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-[var(--color-nocturne-base)] border-b border-[var(--color-nocturne-elevated)]"
          >
            <div className="flex flex-col py-4 sm:py-6 px-4 sm:px-6 gap-4 sm:gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-cream-dim hover:text-cream text-sm editorial-mono tracking-widest transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}