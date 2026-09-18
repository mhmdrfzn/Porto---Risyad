import { Parallax } from './RevealText';
import { useLanguage } from '../context/LanguageContext';

const techRow1 = [
  'React', 'Node.js', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Next.js', 'TypeScript', 'Flutter', 'Dart', 'Firebase'
];

const techRow2 = [
  'Laravel', 'PHP', 'Python', 'TensorFlow', 'MySQL', 'Git', 'Figma', 'REST API', 'Bootstrap', 'Vue.js', 'Supabase'
];

function MarqueeRow({ items, direction = 'left', speed = 30 }) {
  const repeated = [...items, ...items, ...items, ...items];
  const animationClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div className="overflow-hidden flex py-4">
      <div className={`flex shrink-0 ${animationClass}`} style={{ animationDuration: `${speed}s` }}>
        {repeated.map((item, i) => (
          <div
            key={i}
            className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 mx-1.5 sm:mx-2 md:mx-3 flex items-center justify-center hover:bg-[var(--color-nocturne-elevated)] transition-colors duration-500"
          >
            <span className="editorial-mono text-[10px] sm:text-xs md:text-sm text-cream tracking-widest">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative py-16 sm:py-24 md:py-32 bg-[#141312]/80 overflow-hidden border-t border-[var(--color-nocturne-elevated)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-8 sm:mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        
        <Parallax>
          <span className="editorial-mono text-xs text-cream-dim block mb-4 md:mb-6">{t('ui.skills.eyebrow')}</span>
          <h2 className="editorial-heading text-3xl sm:text-4xl md:text-6xl text-cream">
            {t('ui.skills.title')}
          </h2>
        </Parallax>

        <Parallax distance={80} className="max-w-sm">
          <p className="editorial-body text-cream-dim text-base md:text-lg">
            {t('ui.skills.desc')}
          </p>
        </Parallax>
      </div>

      {/* Marquee Container */}
      <div className="w-full relative py-8">
        {/* Gradients to fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--color-nocturne-base)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--color-nocturne-base)] to-transparent z-10 pointer-events-none" />
        
        <div className="transform -rotate-1 md:-rotate-2 scale-[1.02]">
          <MarqueeRow items={techRow1} direction="left" speed={45} />
          <MarqueeRow items={techRow2} direction="right" speed={50} />
        </div>
      </div>

    </section>
  );
}
