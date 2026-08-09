import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const projectImages = [
  '/projects/news.png',
  '/projects/ecommerce.png',
  '/projects/queue.png',
  '/projects/billiard.png',
  '/projects/expert.png',
  '/projects/attendance.png',
];

export default function Projects() {
  const { t } = useLanguage();
  const translatedProjects = t('projects.items').slice(0, 6); // Limit to 6 for grid layout

  return (
    <section id="proyek" className="relative py-16 sm:py-24 md:py-32 bg-[var(--color-nocturne-base)] border-t border-[var(--color-nocturne-elevated)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 md:mb-24 gap-4 sm:gap-6 md:gap-8"
        >
          <div>
            <span className="editorial-mono text-xs text-cream-dim block mb-4 md:mb-6">02 // SELECTED WORKS</span>
            <h2 className="editorial-heading text-3xl sm:text-4xl md:text-6xl lg:text-[4.5rem] text-cream leading-none">
              Gallery.
            </h2>
          </div>
          <div className="md:text-right max-w-sm">
            <p className="editorial-body text-cream-dim text-base md:text-lg">
              A collection of digital platforms, tools, and experiences designed with precision and built for scale.
            </p>
          </div>
        </motion.div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-10 sm:gap-y-16 md:gap-y-24 gap-x-6 sm:gap-x-8 lg:gap-x-12">
          {translatedProjects.map((project, index) => {
            // Logic for asymmetrical layout on large screens
            let colSpan = 'lg:col-span-12';
            let margin = '';
            
            if (index % 3 === 0) {
              colSpan = 'lg:col-span-7'; // Large left
            } else if (index % 3 === 1) {
              colSpan = 'lg:col-span-5 lg:col-start-8'; // Medium right
              margin = 'lg:mt-32';
            } else {
              colSpan = 'lg:col-span-6 lg:col-start-4'; // Medium center-left
              margin = 'lg:-mt-16';
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`${colSpan} ${margin} group cursor-pointer w-full`}
              >
                <div className="relative overflow-hidden bg-[var(--color-nocturne-surface)] aspect-[16/10] mb-5 md:mb-6">
                  {/* Reveal overlay */}
                  <motion.div
                    initial={{ scaleY: 1 }}
                    whileInView={{ scaleY: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0 bg-[var(--color-nocturne-sand)] z-20 origin-top"
                  />
                  
                  <img
                    src={projectImages[index]}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </div>

                <div className="flex flex-col gap-2 border-t border-[var(--color-nocturne-elevated)] pt-4">
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="editorial-heading text-xl md:text-2xl text-cream group-hover:text-white transition-colors duration-300 truncate">
                      {project.title}
                    </h3>
                    <span className="editorial-mono text-[10px] text-cream-dim shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="editorial-body text-sm text-cream-dim line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}