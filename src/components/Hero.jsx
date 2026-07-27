import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const titlesMap = {
  id: ['Software Developer', 'Frontend Engineer', 'UI/UX Enthusiast', 'Tech Explorer'],
  en: ['Software Developer', 'Frontend Engineer', 'UI/UX Enthusiast', 'Tech Explorer'],
};

export default function Hero() {
  const { lang, t } = useLanguage();
  const titles = titlesMap[lang];
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setIsDeleting(false);
    setTitleIndex(0);
  }, [lang]);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout;

    if (!isDeleting && displayText === currentTitle) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentTitle.substring(0, displayText.length - 1)
            : currentTitle.substring(0, displayText.length + 1)
        );
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex, titles]);

  const floatingTags = [
    { label: 'React', x: -280, y: -120, delay: 0 },
    { label: 'JavaScript', x: 260, y: -100, delay: 0.5 },
    { label: 'Python', x: -240, y: 80, delay: 1 },
    { label: 'Laravel', x: 290, y: 100, delay: 1.5 },
    { label: 'TailwindCSS', x: -180, y: 160, delay: 2 },
    { label: 'TensorFlow', x: 200, y: -180, delay: 2.5 },
  ];

  return (
    <section id="beranda" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl animate-float-reverse pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Greeting badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles size={16} className="text-primary-400" />
          <span className="text-sm font-medium text-primary-300 font-mono">{t('hero.greeting')}</span>
        </motion.div>

        {/* Main heading with typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight font-heading">
            <span className="gradient-text">{displayText}</span>
            <span className="animate-typing-blink text-primary-400">|</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.subtitle1')}
          <span className="text-primary-400 font-medium">{t('hero.interactive')}</span>
          {t('hero.subtitle2')}
          <span className="text-accent-400 font-medium">{t('hero.responsive')}</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#proyek"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-surface-950 font-bold rounded-xl overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Code2 size={20} />
              {t('hero.ctaPrimary')}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </motion.a>

          <motion.a
            href="#kontak"
            whileHover={{ scale: 1.05, borderColor: 'rgba(16, 185, 129, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-surface-700 text-gray-300 font-semibold hover:text-primary-400 transition-all duration-300"
          >
            {t('hero.ctaSecondary')}
          </motion.a>
        </motion.div>

        {/* Floating tech tags (hidden on mobile) */}
        <div className="hidden lg:block">
          {floatingTags.map((tag, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + tag.delay * 0.3, duration: 0.5, type: 'spring' }}
              className="absolute px-3 py-1.5 rounded-full text-xs font-mono glass text-gray-400 hover:text-primary-400 hover:border-primary-500/30 transition-all duration-300 cursor-default"
              style={{
                left: `calc(50% + ${tag.x}px)`,
                top: `calc(50% + ${tag.y}px)`,
                animation: `float ${5 + i * 0.8}s ease-in-out ${tag.delay}s infinite`,
              }}
            >
              {tag.label}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 font-mono tracking-widest uppercase">{t('hero.scroll')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={20} className="text-primary-500/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
