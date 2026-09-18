import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const EASE = [0.16, 1, 0.3, 1];
const DURATION = 3600; // loading lebih lama: ~3.6 detik

const COLS = 10;
const ROWS = 6;
const TILE_COUNT = COLS * ROWS;

function phaseLabel(count, t) {
  if (count < 35) return t('ui.preloader.p1');
  if (count < 70) return t('ui.preloader.p2');
  if (count < 100) return t('ui.preloader.p3');
  return t('ui.preloader.done');
}

/** Delay tiap ubin: melebar dari tengah + acak halus → mozaik menghilang perlahan. */
function tileDelay(i) {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  const dist = Math.hypot(row - (ROWS - 1) / 2, col - (COLS - 1) / 2);
  const pseudoRandom = ((i * 37) % 100) / 100;
  return dist * 0.09 + pseudoRandom * 0.3;
}

/**
 * Preloader — loading screen pembuka:
 * nama ter-reveal huruf-per-huruf, counter 0→100 ease-out (~3.6 dtk),
 * lalu keluar sebagai MOZAIK: puluhan ubin memudar/menyusut
 * dari tengah ke tepi hingga halaman tersingkap.
 */
export default function Preloader({ onReveal, onDone }) {
  const { t } = useLanguage();
  const [count, setCount] = useState(0);
  const [mosaic, setMosaic] = useState(false);
  const tiles = useMemo(() => Array.from({ length: TILE_COUNT }, (_, i) => i), []);

  useEffect(() => {
    let raf;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / DURATION, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Mozaik mulai + page di-mount di belakangnya agar ubin
        // menyingkap langsung ke konten, bukan ke background kosong
        setTimeout(() => {
          setMosaic(true);
          onReveal();
        }, 450);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onReveal]);

  // Setelah ubin terakhir hilang → lepas preloader
  useEffect(() => {
    if (!mosaic) return;
    const t = setTimeout(onDone, 1750);
    return () => clearTimeout(t);
  }, [mosaic, onDone]);

  const name = 'RISYAD'.split('');

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Lapisan mozaik: menutup layar saat loading, menghilang per ubin */}
      <div className="absolute inset-0 grid grid-cols-6 sm:grid-cols-10 grid-rows-6">
        {tiles.map((i) => (
          <motion.div
            key={i}
            initial={false}
            animate={mosaic ? { opacity: 0, scale: 0.65 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: mosaic ? tileDelay(i) : 0, ease: 'easeInOut' }}
            className="bg-[#141312]"
          />
        ))}
      </div>

      {/* Konten loading (memudar dulu sebelum mozaik berjalan) */}
      <motion.div
        animate={{ opacity: mosaic ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 flex flex-col justify-between px-5 sm:px-12 py-6 sm:py-10"
      >
        {/* Baris atas */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center justify-between editorial-mono text-[10px] sm:text-xs tracking-[0.3em] text-[var(--color-nocturne-cream-dim)]"
        >
          <span>MOCHAMAD RISYAD FAUZAN</span>
          <span>PORTFOLIO © {new Date().getFullYear()}</span>
        </motion.div>

        {/* Nama tengah */}
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <h1
            aria-label="RISYAD"
            className="editorial-heading flex overflow-hidden text-[18vw] sm:text-[10rem] leading-none tracking-tight text-[var(--color-nocturne-cream)]"
          >
            {name.map((letter, i) => (
              <motion.span
                key={i}
                aria-hidden
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease: EASE }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="editorial-mono text-[10px] sm:text-xs tracking-[0.35em] text-[var(--color-nocturne-sand)]"
          >
            {t('ui.preloader.subtitle')} — {phaseLabel(count, t)}
          </motion.p>
        </div>

        {/* Baris bawah: progress + counter */}
        <div className="flex items-end justify-between gap-6">
          <div className="flex-1 mb-3 sm:mb-5">
            <div className="h-px w-full bg-white/10 overflow-hidden">
              <div
                className="h-full origin-left bg-[var(--color-nocturne-sand)]"
                style={{ transform: `scaleX(${count / 100})` }}
              />
            </div>
            <div className="mt-3 flex justify-between editorial-mono text-[10px] tracking-[0.3em] text-[var(--color-nocturne-cream-dim)]">
              <span>{t('ui.preloader.loading')}</span>
              <span>{String(count).padStart(3, '0')}%</span>
            </div>
          </div>
          <span className="editorial-heading text-6xl sm:text-8xl leading-none text-white/[0.12] tabular-nums select-none">
            {count}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
