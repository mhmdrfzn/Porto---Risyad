import { useState } from 'react';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")";

/**
 * GlobalBackground — video ambient sinematik (asap di ruang gelap)
 * fixed di belakang SELURUH page. Section dibuat translusen agar
 * gerakannya terasa di semua halaman tanpa mengorbankan keterbacaan.
 */
export default function GlobalBackground() {
  const [ready, setReady] = useState(false);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#141312]">
      <video
        src="/bg-ambient.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={() => setReady(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ${
          ready ? 'opacity-50' : 'opacity-0'
        } animate-bg-drift`}
      />

      {/* Overlay keterbacaan: gelap atas-bawah, napas di tengah */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#141312]/85 via-[#141312]/50 to-[#141312]/90" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 25%, rgba(20,19,18,0.6) 100%)',
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />
    </div>
  );
}
