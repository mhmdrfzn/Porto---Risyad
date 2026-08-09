import { useRef, useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLanguage } from '../context/LanguageContext';
import * as THREE from 'three';

const roles = [
  "DEVELOPER.",
  "AI ENGINEER.",
  "UI DESIGNER.",
  "CREATIVE DEV."
];

// 3D Particles Component
function FloatingParticles({ count = 30 }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const scale = Math.random() * 0.5 + 0.1;
      const speed = Math.random() * 0.2 + 0.1;
      temp.push({ x, y, z, scale, speed });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      const time = state.clock.getElapsedTime();
      const t = time * particle.speed;
      dummy.position.set(
        particle.x + Math.sin(t) * 2,
        particle.y + Math.cos(t) * 2,
        particle.z
      );
      dummy.rotation.set(t, t, t);
      dummy.scale.set(particle.scale, particle.scale, particle.scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#E3D5CA" 
        wireframe 
        transparent 
        opacity={0.15}
      />
    </instancedMesh>
  );
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000); // Change role every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="beranda" className="relative min-h-screen w-full bg-[var(--color-nocturne-base)] pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 flex items-center overflow-hidden">
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none overflow-hidden">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#E3D5CA" />
          <FloatingParticles count={30} />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-12">
        
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full relative z-20 order-2 lg:order-1 text-center lg:text-left"
        >
          <span className="editorial-mono text-[10px] sm:text-xs text-cream-dim tracking-[0.2em] uppercase block mb-3 sm:mb-4 lg:mb-6">
            Mochamad Risyad Fauzan
          </span>
          <h1 className="editorial-heading text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[6rem] leading-[1.1] text-cream mb-4 sm:mb-6 tracking-tight flex flex-col h-[100px] sm:h-[130px] md:h-[150px] lg:h-[200px]">
            <span>SOFTWARE</span>
            <div className="relative h-full overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 50, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -50, opacity: 0, rotateX: 90 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[var(--color-nocturne-sand)] italic absolute left-0 w-full lg:w-auto"
                  style={{ transformOrigin: "50% 50% -50px" }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>
          <p className="editorial-body text-cream-dim text-sm sm:text-base md:text-lg max-w-md leading-relaxed font-light mb-8 sm:mb-10 mt-2 mx-auto lg:mx-0">
            Building digital experiences at the intersection of systematic engineering and refined visual design. Based in Indonesia.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start">
            <a 
              href="#proyek"
              className="border-b border-[var(--color-nocturne-elevated)] pb-2 editorial-mono text-[10px] sm:text-xs text-cream hover:text-[var(--color-nocturne-sand)] hover:border-[var(--color-nocturne-sand)] transition-all duration-300 tracking-widest"
            >
              EXPLORE WORKS
            </a>
            <a 
              href="#kontak"
              className="border-b border-[var(--color-nocturne-elevated)] pb-2 editorial-mono text-[10px] sm:text-xs text-cream-dim hover:text-[var(--color-nocturne-sand)] hover:border-[var(--color-nocturne-sand)] transition-all duration-300 tracking-widest"
            >
              CONTACT
            </a>
          </div>
        </motion.div>

        {/* Right: Photo */}
        <motion.div
          initial={{ opacity: 5, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[220px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[400px] relative z-10 order-1 lg:order-2 mb-4 sm:mb-6 lg:mb-0"
        >
          {/* Decorative accent line */}
          <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 sm:w-20 h-16 sm:h-20 border-t border-r border-[var(--color-nocturne-sand)] opacity-20 z-0" />
          <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-16 sm:w-20 h-16 sm:h-20 border-b border-l border-[var(--color-nocturne-sand)] opacity-20 z-0" />
          
          <div className="relative aspect-[3/4] w-full overflow-hidden z-10 bg-[var(--color-nocturne-base)]">
            <img
              src="/hero-portrait.png"
              alt="Mochamad Risyad Fauzan"
              className="w-full h-full object-cover object-bottom scale-115 opacity-90 contrast-125"
              style={{
                mixBlendMode: 'luminosity',
              }}
            />
            {/* Edge gradients for seamless blending — stronger for white bg */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to bottom, transparent 75%, var(--color-nocturne-base) 97%),
                  linear-gradient(to top, transparent 80%, var(--color-nocturne-base) 90%),
                  linear-gradient(to right, var(--color-nocturne-base) 0%, transparent 70%),
                  linear-gradient(to left, var(--color-nocturne-base) 0%, transparent 70%)
                `,
              }}
            />
            {/* Dark overlay to tame the white background */}
            <div 
              className="absolute inset-0 pointer-events-none bg-[var(--color-nocturne-base)] opacity-5"
              style={{
                mixBlendMode: 'multiply',
              }}
            />
          </div>

          {/* Label under photo */}
          {/* <div className="mt-3 sm:mt-4 flex items-center justify-between editorial-mono text-[9px] sm:text-[10px] text-cream-dim opacity-50">
            <span>PORTRAIT</span>
            <span className="w-8 sm:w-12 h-[1px] bg-[var(--color-nocturne-cream-dim)] opacity-30" />
            <span>2025</span>
          </div> */}
        </motion.div>

      </div>

      {/* Bottom absolute elements (hidden on mobile) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 sm:bottom-10 left-4 sm:left-6 md:left-12 hidden lg:flex gap-12 xl:gap-16 editorial-mono text-[10px] text-cream-dim"
      >
        <div className="flex flex-col gap-1">
          <span className="text-cream">ROLE</span>
          <span>Creative Dev</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-cream">LOCAL TIME</span>
          <span>(GMT+7)</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 sm:bottom-10 right-4 sm:right-6 md:right-12 hidden lg:flex items-center gap-4"
      >
        <span className="editorial-mono text-[10px] text-cream-dim">SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-12 h-[1px] bg-[var(--color-nocturne-cream-dim)]"
        />
      </motion.div>

    </section>
  );
}
