import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { label: 'YEARS EXP.', value: '04' },
    { label: 'PROJECTS', value: '15+' },
    { label: 'AWARDS', value: '02' },
  ];

  return (
    <section id="tentang" className="relative py-24 md:py-32 bg-[var(--color-nocturne-base)] border-t border-[var(--color-nocturne-elevated)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Header & Stats - Left Column */}
          <div className="flex-1 lg:max-w-md flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="editorial-mono text-xs text-cream-dim block mb-4 md:mb-6">03 // PHILOSOPHY</span>
              <h2 className="editorial-heading text-4xl md:text-5xl lg:text-[3.5rem] text-cream leading-[1.1]">
                Engineering <br className="hidden md:block" />
                <span className="italic text-cream-dim block mt-2">meets</span> aesthetics.
              </h2>
            </motion.div>

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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="editorial-body text-lg md:text-xl leading-relaxed text-cream-dim"
            >
              <p className="mb-6 md:mb-8">
                I believe that exceptional digital experiences are born at the intersection of <strong className="text-cream font-normal">systematic engineering</strong> and <strong className="text-cream font-normal">refined visual design</strong>.
              </p>
              <p className="mb-6 md:mb-8">
                My approach is rooted in minimalism—stripping away the unnecessary to reveal the core purpose of a product. Whether it's architecting a complex backend in Laravel or crafting a fluid, immersive interface with React, Tailwind CSS, Vue and Next.js, the goal remains the same: <em className="text-cream not-italic">clarity through code</em>.
              </p>
              <p>
                Based in Indonesia, I partner with forward-thinking brands and teams to build platforms that don't just function flawlessly, but feel inherently right.
              </p>
            </motion.div>

            {/* Mobile Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid lg:hidden grid-cols-3 gap-4 mt-12 border-t border-[var(--color-nocturne-elevated)] pt-8"
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
