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
    <section id="beranda" className="relative min-h-screen w-full bg-[var(--color-nocturne-base)] pt-32 pb-16 flex items-center">
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none overflow-hidden">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#E3D5CA" />
          <FloatingParticles count={30} />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full relative z-20 order-2 lg:order-1"
        >
          <span className="editorial-mono text-xs text-cream-dim tracking-[0.2em] uppercase block mb-4 lg:mb-6">
            Mochamad Risyad Fauzan
          </span>
          <h1 className="editorial-heading text-6xl md:text-7xl lg:text-[6rem] leading-[1.1] text-cream mb-6 tracking-tight flex flex-col h-[130px] md:h-[150px] lg:h-[200px]">
            <span>SOFTWARE</span>
            <div className="relative h-full overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 50, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -50, opacity: 0, rotateX: 90 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[var(--color-nocturne-sand)] italic absolute left-0"
                  style={{ transformOrigin: "50% 50% -50px" }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>
          <p className="editorial-body text-cream-dim text-base md:text-lg max-w-md leading-relaxed font-light mb-10 mt-2">
            Building digital experiences at the intersection of systematic engineering and refined visual design. Based in Indonesia.
          </p>
          <div className="flex flex-wrap gap-6">
            <a 
              href="#proyek"
              className="border-b border-[var(--color-nocturne-elevated)] pb-2 editorial-mono text-xs text-cream hover:text-[var(--color-nocturne-sand)] hover:border-[var(--color-nocturne-sand)] transition-all duration-300 tracking-widest"
            >
              EXPLORE WORKS
            </a>
            <a 
              href="#kontak"
              className="border-b border-[var(--color-nocturne-elevated)] pb-2 editorial-mono text-xs text-cream-dim hover:text-[var(--color-nocturne-sand)] hover:border-[var(--color-nocturne-sand)] transition-all duration-300 tracking-widest"
            >
              CONTACT
            </a>
          </div>
        </motion.div>

        {/* Right: Photo */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] relative z-10 order-1 lg:order-2 mb-8 lg:mb-0"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--color-nocturne-surface)] border border-[var(--color-nocturne-elevated)] p-3 md:p-5">
            <img
              src="/hero-portrait.png"
              alt="Mochamad Risyad Fauzan"
              className="w-full h-full object-cover grayscale opacity-90 contrast-125"
              style={{
                maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
              }}
            />
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[var(--color-nocturne-cream-dim)] opacity-30" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[var(--color-nocturne-cream-dim)] opacity-30" />
          </div>
        </motion.div>

      </div>

      {/* Bottom absolute elements (hidden on mobile) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-10 left-6 md:left-12 hidden lg:flex gap-16 editorial-mono text-[10px] text-cream-dim"
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
        className="absolute bottom-10 right-6 md:right-12 hidden lg:flex items-center gap-4"
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
