import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const projectImages = [
  '/projects/news.png',
  '/projects/ecommerce.png',
  '/projects/queue.png',
  '/projects/billiard.png',
  '/projects/expert.png',
  '/projects/attendance.png',
];

const projectTags = ['WEB APP', 'MOBILE', 'SYSTEM', 'PLATFORM', 'AI / ML', 'TOOLS'];

const EASE = [0.16, 1, 0.3, 1];
const AUTOPLAY_MS = 4500;

/**
 * Gallery autoplay slide deck:
 * kartu berpindah SENDIRI tiap 4,5 detik (pause saat hover),
 * meluncur dari KIRI ke KANAN menutupi kartu sebelumnya.
 * Foto hitam-putih — berwarna + zoom saat di-hover (CSS murni).
 */
export default function Projects() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const items = t('projects.items').slice(0, 6);
  const N = items.length;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Autoplay: maju sendiri, timer reset tiap pindah manual
  useEffect(() => {
    if (paused || reduce) return;
    const timer = setTimeout(() => setActive((a) => (a + 1) % N), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [active, paused, reduce, N]);

  const select = (i) => setActive(((i % N) + N) % N);

  const cardState = (i) => {
    if (reduce) return { opacity: i === active ? 1 : 0, x: '0%', scale: 1 };
    if (i === active) return { opacity: 1, x: '0%', scale: 1 };
    if (i < active) return { opacity: 0, x: '45%', scale: 0.94 }; // keluar ke kanan
    return { opacity: 0, x: '-45%', scale: 0.94 }; // menunggu di kiri
  };

  return (
    <section id="proyek" className="relative bg-[#141312]/80 border-t border-[var(--color-nocturne-elevated)]">
      <div className="flex h-[100svh] w-full flex-col overflow-hidden">

        {/* Bar atas: label + counter */}
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 md:px-12 pt-20 sm:pt-24">
            <span className="editorial-mono text-[10px] sm:text-xs tracking-[0.3em] text-cream-dim">
              {t('ui.projects.eyebrow')}
            </span>
          <span className="editorial-mono text-[10px] sm:text-xs tracking-[0.3em] text-cream-dim tabular-nums">
            <span className="text-[var(--color-nocturne-sand)]">
              {String(active + 1).padStart(2, '0')}
            </span>
            {' / '}
            {String(N).padStart(2, '0')}
          </span>
        </div>

        {/* Progress: timer autoplay kartu aktif */}
        <div className="mx-auto mt-3 w-full max-w-7xl px-4 sm:px-6 md:px-12">
          <div className="h-px w-full bg-white/10">
            {!reduce && !paused && (
              <motion.div
                key={active}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                className="h-full w-full origin-left bg-[var(--color-nocturne-sand)]"
              />
            )}
          </div>
        </div>

        {/* Arena kartu (hover = jeda autoplay) */}
        <div
          className="relative flex-1"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {items.map((project, i) => (
            <motion.div
              key={project.title}
              initial={false}
              animate={cardState(i)}
              transition={{ duration: 0.85, ease: EASE }}
              style={{ zIndex: i === active ? 10 : 1 }}
              className={`absolute inset-0 flex items-center justify-center px-4 sm:px-8 will-change-transform ${
                i === active ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              <article className="group grid h-full max-h-[62svh] sm:max-h-[66svh] md:max-h-[70svh] w-full max-w-6xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#1A1918] shadow-[0_30px_80px_rgba(0,0,0,0.55)] md:grid-cols-[1.15fr_1fr]">
                {/* Gambar: hitam-putih, berwarna + zoom saat hover */}
                <div className="relative h-[24svh] sm:h-[26svh] md:h-auto overflow-hidden">
                  <img
                    src={projectImages[i % projectImages.length]}
                    alt={project.title}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#1A1918]/40" />
                  <span className="editorial-heading absolute left-4 top-3 sm:left-6 sm:top-5 select-none text-5xl sm:text-7xl leading-none text-white/15">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Teks */}
                <div className="flex min-h-0 flex-col justify-center gap-3 sm:gap-4 p-5 sm:p-8 lg:p-12">
                  <span className="editorial-mono w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] sm:text-[10px] tracking-[0.25em] text-[var(--color-nocturne-cream)]/80">
                    {projectTags[i % projectTags.length]}
                  </span>
                  <h3 className="editorial-heading text-2xl sm:text-4xl lg:text-5xl leading-[1.05] text-[var(--color-nocturne-cream)]">
                    {project.title}
                  </h3>
                  <p className="editorial-body text-xs sm:text-sm lg:text-base font-light leading-relaxed text-[var(--color-nocturne-cream)]/70 line-clamp-2 md:line-clamp-3">
                    {project.description}
                  </p>
                  <a
                    href="#kontak"
                    className="group/link mt-1 sm:mt-2 inline-flex w-fit items-center gap-2 border-b border-white/20 pb-1 editorial-mono text-[10px] sm:text-xs tracking-[0.25em] text-[var(--color-nocturne-cream)] transition-colors hover:border-[var(--color-nocturne-sand)] hover:text-[var(--color-nocturne-sand)]"
                  >
                    {t('ui.projects.viewCase')}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    />
                  </a>
                </div>
              </article>
            </motion.div>
          ))}
        </div>

        {/* Bar bawah: dots + prev/next */}
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 md:px-12 pb-6 sm:pb-8">
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => select(i)}
                  aria-label={`${t('ui.projects.goTo')} ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? 'w-8 bg-[var(--color-nocturne-sand)]' : 'w-3 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="editorial-mono hidden sm:inline text-[10px] tracking-[0.3em] text-white/40 mr-2">
              {paused ? t('ui.projects.paused') : t('ui.projects.autoplay')}
            </span>
            <button
              onClick={() => select(active - 1)}
              aria-label={t('ui.projects.prev')}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-cream-dim transition-colors hover:border-[var(--color-nocturne-sand)] hover:text-[var(--color-nocturne-sand)]"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => select(active + 1)}
              aria-label={t('ui.projects.next')}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-cream-dim transition-colors hover:border-[var(--color-nocturne-sand)] hover:text-[var(--color-nocturne-sand)]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
