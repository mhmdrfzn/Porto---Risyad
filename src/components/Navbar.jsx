import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('beranda');
  const { lang, toggleLang, t } = useLanguage();

  const navLinks = [
    { id: 'beranda', name: t('nav.home'), href: '#beranda' },
    { id: 'tentang', name: t('nav.about'), href: '#tentang' },
    { id: 'skills', name: t('nav.skills'), href: '#skills' },
    { id: 'proyek', name: t('nav.projects'), href: '#proyek' },
    { id: 'kontak', name: t('nav.contact'), href: '#kontak' },
  ];

  // Glass menguat setelah user mulai scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scrollspy ringan: tandai link section yang sedang terlihat
  useEffect(() => {
    const els = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-x-0 top-3 sm:top-5 z-50 flex flex-col items-center px-3 sm:px-6"
    >
      {/* Floating glass pill */}
      <nav
        className={[
          'pointer-events-auto w-full max-w-3xl rounded-full border transition-all duration-500',
          scrolled
            ? 'bg-[#1A1918]/75 backdrop-blur-2xl border-[#E3D5CA]/15 shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]'
            : 'bg-white/[0.04] backdrop-blur-lg border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]',
        ].join(' ')}
      >
        <div className="flex items-center justify-between gap-2 pl-4 sm:pl-6 pr-2 sm:pr-3 py-2">
          {/* Logo */}
          <motion.a
            href="#beranda"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-base sm:text-lg font-bold tracking-[0.2em] uppercase font-heading text-cream flex items-center gap-2 shrink-0"
          >
            RISYAD<span className="w-2 h-2 bg-[var(--color-nocturne-sand)] rounded-full block" />
          </motion.a>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 editorial-mono text-xs tracking-widest transition-colors duration-300 ${
                    isActive ? 'text-[#141312]' : 'text-cream-dim hover:text-cream'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 rounded-full bg-[var(--color-nocturne-cream)]"
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language toggle */}
            <motion.button
              onClick={toggleLang}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-cream-dim hover:text-cream hover:border-white/20 transition-colors duration-300"
              title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            >
              <Globe size={13} />
              <span className="editorial-mono text-[11px] font-semibold tracking-wider">
                {lang === 'id' ? 'EN' : 'ID'}
              </span>
            </motion.button>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 text-cream-dim hover:text-cream transition-colors"
            >
              {isOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown — panel kaca di bawah pill */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto lg:hidden w-full max-w-3xl mt-2 rounded-3xl border border-[#E3D5CA]/12 bg-[#1A1918]/80 backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.07)] overflow-hidden"
          >
            <div className="flex flex-col p-2">
              {navLinks.map((link, i) => {
                const isActive = active === link.id;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                    className={`flex items-center justify-between rounded-2xl px-5 py-3.5 editorial-mono text-sm tracking-widest transition-colors ${
                      isActive
                        ? 'bg-[var(--color-nocturne-cream)] text-[#141312]'
                        : 'text-cream-dim hover:text-cream hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                    <span className={`text-[10px] ${isActive ? 'opacity-60' : 'opacity-30'}`}>
                      0{i + 1}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
