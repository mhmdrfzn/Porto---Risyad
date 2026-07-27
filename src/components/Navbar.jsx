import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), href: '#beranda' },
    { name: t('nav.about'), href: '#tentang' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#proyek' },
    { name: t('nav.contact'), href: '#kontak' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed w-full z-50 top-0 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.a
            href="#beranda"
            whileHover={{ scale: 1.05 }}
            className="group text-2xl font-bold text-white tracking-wider relative"
          >
            <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-accent-400 transition-all duration-300">
              Risyad
            </span>
            <span className="text-primary-500 group-hover:text-accent-400 transition-colors duration-300">.</span>
          </motion.a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08 }}
                className="hover-underline relative px-4 py-2 text-gray-400 hover:text-white font-medium text-sm transition-colors duration-300"
              >
                {link.name}
              </motion.a>
            ))}

            {/* Language toggle */}
            <motion.button
              onClick={toggleLang}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-700 text-gray-400 text-xs font-semibold hover:text-primary-400 hover:border-primary-500/30 transition-all duration-300"
              title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            >
              <Globe size={14} />
              <span className="uppercase">{lang === 'id' ? 'EN' : 'ID'}</span>
            </motion.button>

            {/* Contact button */}
            <motion.a
              href="#kontak"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 px-5 py-2 rounded-lg bg-primary-500/10 border border-primary-500/30 text-primary-400 text-sm font-semibold hover:bg-primary-500/20 hover:border-primary-500/50 transition-all duration-300"
            >
              {t('nav.cta')}
            </motion.a>
          </div>

          {/* Mobile: lang toggle + menu button */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              onClick={toggleLang}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-surface-700 text-gray-400 text-xs font-semibold hover:text-primary-400 transition-all"
            >
              <Globe size={13} />
              <span className="uppercase">{lang === 'id' ? 'EN' : 'ID'}</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-primary-400 p-2 rounded-lg hover:bg-surface-800/50 transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
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
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-300 hover:text-primary-400 hover:bg-primary-500/5 rounded-lg font-medium transition-all duration-200"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}