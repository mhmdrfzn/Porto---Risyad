import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Newspaper, ShoppingCart, Brain, MapPin, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function ProjectCard({ project, index, translatedProject }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
  const { t } = useLanguage();

  const Icon = project.icon;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 15);
    setRotateY((centerX - x) / 15);
    setGlowX((x / rect.width) * 100);
    setGlowY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full"
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative glass-card overflow-hidden transition-all duration-200 ease-out h-full flex flex-col"
        style={{
          transform: `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Mouse glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${project.accentColor}, transparent 60%)`,
          }}
        />

        {/* Top gradient bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="p-6 relative z-10 flex flex-col flex-1">
          {/* Icon + number */}
          <div className="flex items-center justify-between mb-5">
            <div
              className={`p-2.5 rounded-xl bg-gradient-to-br ${project.iconColor} group-hover:shadow-lg transition-all duration-300`}
              style={{ transform: 'translateZ(30px)' }}
            >
              <Icon size={20} className="text-white" />
            </div>
            <span
              className="text-4xl font-black text-surface-800/60 group-hover:text-surface-700/80 transition-colors duration-500 select-none font-heading"
              style={{ transform: 'translateZ(10px)' }}
            >
              {String(project.id).padStart(2, '0')}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-base font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300 font-heading line-clamp-2"
            style={{ transform: 'translateZ(25px)' }}
          >
            {translatedProject.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 mb-5 leading-relaxed text-sm line-clamp-3" style={{ transform: 'translateZ(15px)' }}>
            {translatedProject.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-5 mt-auto" style={{ transform: 'translateZ(20px)' }}>
            {project.tech.map((t, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-surface-800/80 text-gray-300 border border-surface-700/50 hover:border-primary-500/40 hover:text-primary-400 transition-all duration-300 cursor-default"
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3" style={{ transform: 'translateZ(25px)' }}>
            <motion.a
              href={project.link}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold hover:from-primary-500/20 hover:to-accent-500/20 hover:border-primary-500/40 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300"
            >
              <ExternalLink size={14} />
              {t('projects.viewDetail')}
            </motion.a>
            <motion.a
              href={project.github}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-surface-700 text-gray-400 text-xs font-medium hover:text-white hover:border-gray-600 transition-all duration-300"
            >
              <Code2 size={14} />
              Code
            </motion.a>
          </div>
        </div>

        {/* Hover background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useLanguage();

  const projectData = [
    {
      id: 1,
      tech: ['Laravel', 'Bootstrap', 'MySQL', 'JavaScript'],
      link: '#',
      github: '#',
      icon: Newspaper,
      gradient: 'from-red-500/20 to-rose-500/10',
      iconColor: 'from-red-500 to-rose-400',
      accentColor: 'rgba(239, 68, 68, 0.4)',
    },
    {
      id: 2,
      tech: ['Flutter', 'Dart', 'Supabase', 'REST API'],
      link: '#',
      github: '#',
      icon: ShoppingCart,
      gradient: 'from-primary-500/20 to-accent-500/10',
      iconColor: 'from-primary-500 to-accent-400',
      accentColor: 'rgba(16, 185, 129, 0.4)',
    },
    {
      id: 3,
      tech: ['PHP', 'MySQL', 'Bootstrap'],
      link: '#',
      github: '#',
      icon: Brain,
      gradient: 'from-blue-500/20 to-indigo-500/10',
      iconColor: 'from-blue-500 to-indigo-400',
      accentColor: 'rgba(59, 130, 246, 0.4)',
    },
    {
      id: 4,
      tech: ['Laravel', 'Tailwind CSS', 'JavaScript'],
      link: '#',
      github: '#',
      icon: ExternalLink,
      gradient: 'from-accent-500/20 to-purple-500/10',
      iconColor: 'from-accent-500 to-purple-400',
      accentColor: 'rgba(34, 211, 238, 0.4)',
    },
    {
      id: 5,
      tech: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
      link: '#',
      github: '#',
      icon: Brain,
      gradient: 'from-purple-500/20 to-violet-500/10',
      iconColor: 'from-purple-500 to-violet-400',
      accentColor: 'rgba(167, 139, 250, 0.4)',
    },
    {
      id: 6,
      tech: ['Laravel', 'Leaflet.js', 'MySQL', 'Geolocation API'],
      link: '#',
      github: '#',
      icon: MapPin,
      gradient: 'from-amber-500/20 to-orange-500/10',
      iconColor: 'from-amber-500 to-orange-400',
      accentColor: 'rgba(245, 158, 11, 0.4)',
    },
    {
      id: 7,
      tech: ['Python', 'TensorFlow', 'Scikit-Learn'],
      link: '#',
      github: '#',
      icon: Code2,
      gradient: 'from-emerald-500/20 to-teal-500/10',
      iconColor: 'from-emerald-500 to-teal-400',
      accentColor: 'rgba(16, 185, 129, 0.4)',
    },
    {
      id: 8,
      tech: ['Python', 'TensorFlow', 'Scikit-Learn', 'Pandas'],
      link: '#',
      github: '#',
      icon: Activity,
      gradient: 'from-pink-500/20 to-rose-500/10',
      iconColor: 'from-pink-500 to-rose-400',
      accentColor: 'rgba(236, 72, 153, 0.4)',
    },
  ];

  const translatedProjects = t('projects.items');

  return (
    <section id="proyek" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-mono text-sm tracking-wider uppercase">{t('projects.label')}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-white font-heading">
            {t('projects.title1')}<span className="gradient-text">{t('projects.titleHighlight')}</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {projectData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} translatedProject={translatedProjects[index]} />
          ))}
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-24" />
    </section>
  );
}