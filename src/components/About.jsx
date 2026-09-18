import { motion } from 'framer-motion';
import { Parallax } from './RevealText';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { label: t('about.stats.study'), value: '04' },
    { label: t('about.stats.projects'), value: '15+' },
    { label: t('about.stats.certs'), value: '02' },
  ];

  return (
    <section id="tentang" className="relative py-16 sm:py-24 md:py-32 bg-[#141312]/80 border-t border-[var(--color-nocturne-elevated)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-24">
          
          {/* Header & Stats - Left Column */}
          <div className="flex-1 lg:max-w-md flex flex-col justify-between">
            <Parallax>
              <span className="editorial-mono text-xs text-cream-dim block mb-4 md:mb-6">{t('ui.about.eyebrow')}</span>
              <h2 className="editorial-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-cream leading-[1.1]">
                {t('ui.about.titleA')} <br className="hidden md:block" />
                <span className="italic text-cream-dim block mt-2">{t('ui.about.titleB')}</span> {t('ui.about.titleC')}
              </h2>
            </Parallax>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:grid grid-cols-3 gap-6 mt-20 border-t border-[var(--color-nocturne-elevated)] pt-8"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="editorial-heading text-3xl text-cream mb-1">{stat.value}</span>
                  <span className="editorial-mono text-[9px] text-cream-dim">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Narrative - Right Column */}
          <div className="flex-1 flex flex-col justify-center">
            <Parallax
              distance={80}
              className="editorial-body text-base sm:text-lg md:text-xl leading-relaxed text-cream-dim"
            >
              <p className="mb-6 md:mb-8">
                {t('ui.about.p1pre')}<strong className="text-cream font-normal">{t('ui.about.p1s1')}</strong>{t('ui.about.p1mid')}<strong className="text-cream font-normal">{t('ui.about.p1s2')}</strong>{t('ui.about.p1post')}
              </p>
              <p className="mb-6 md:mb-8">
                {t('ui.about.p2pre')}<em className="text-cream not-italic">{t('ui.about.p2em')}</em>{t('ui.about.p2post')}
              </p>
              <p>
                {t('ui.about.p3')}
              </p>
            </Parallax>

            {/* Mobile Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid lg:hidden grid-cols-3 gap-3 sm:gap-4 mt-10 sm:mt-12 border-t border-[var(--color-nocturne-elevated)] pt-8"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="editorial-heading text-3xl text-cream mb-1">{stat.value}</span>
                  <span className="editorial-mono text-[9px] text-cream-dim">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
