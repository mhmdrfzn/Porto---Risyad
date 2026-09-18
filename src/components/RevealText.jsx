import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Parallax — teks MELAYANG KE ATAS secara perlahan mengikuti scroll.
 * Posisi y, opacity, dan blur terikat langsung pada posisi scroll elemen
 * di viewport (scroll-linked, bukan animasi sekali lewat):
 * - Di bawah viewport: samar (opacity rendah + blur)
 * - Naik perlahan ke atas sambil menjadi jelas
 * - distance: total setengah-jarak melayang (px). Makin besar makin terasa.
 */
export function Parallax({ children, className = '', distance = 110, fromOpacity = 0.15 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [fromOpacity, 1]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.45],
    ['blur(8px)', 'blur(0px)']
  );

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={`will-change-transform ${className}`} style={{ y, opacity, filter }}>
      {children}
    </motion.div>
  );
}

/**
 * RevealText — teks terbang ke atas kata-per-kata saat di-scroll,
 * berawal dari opacity samar + blur, lalu menjadi jelas perlahan.
 *
 * <RevealText as="h2" text="The Stack." className="..." />
 */
export default function RevealText({
  text,
  as: Tag = 'p',
  className = '',
  delay = 0,
  stagger = 0.045,
  once = true,
}) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '110%', opacity: 0, filter: 'blur(8px)' }}
            whileInView={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once, margin: '-10% 0px' }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Reveal — pembungkus blok bebas (judul campur <br/>, paragraf ber-tag)
 * dengan bahasa gerak yang sama: naik + samar/blur → jelas.
 */
export function Reveal({ children, className = '', delay = 0, y = 56, once = true }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ y, opacity: 0, filter: 'blur(10px)' }}
      whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-10% 0px' }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
