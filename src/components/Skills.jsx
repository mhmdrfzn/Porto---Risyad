import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Palette, Server, Cpu, Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function SkillBar({ name, level, delay }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-gray-300 font-medium">{name}</span>
        <span className="text-gray-500 font-mono text-xs">{level}%</span>
      </div>
      <div className="h-1.5 bg-surface-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
        />
      </div>
    </div>
  );
}

function SkillCard({ category, index, translatedTitle }) {
  const Icon = category.icon;
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 12);
    setRotateY((centerX - x) / 12);
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-default"
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative glass-card p-6 transition-all duration-200 ease-out"
        style={{
          transform: `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Mouse glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${category.borderHover}, transparent 60%)`,
          }}
        />

        {/* Background gradient */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.iconBg} group-hover:shadow-lg transition-shadow duration-300`}
              style={{ transform: 'translateZ(20px)' }}
            >
              <Icon size={22} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white font-heading">{translatedTitle}</h3>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            {category.skills.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={0.3 + i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  const skillCategories = [
    {
      titleKey: 'frontend',
      icon: Palette,
      color: 'from-primary-500/20 to-primary-500/5',
      iconBg: 'from-primary-500 to-primary-400',
      borderHover: 'rgba(16, 185, 129, 0.4)',
      skills: [
        { name: 'React', level: 85 },
        { name: 'JavaScript', level: 90 },
        { name: 'Tailwind CSS', level: 88 },
        { name: 'HTML/CSS', level: 95 },
      ],
    },
    {
      titleKey: 'backend',
      icon: Server,
      color: 'from-accent-500/20 to-accent-500/5',
      iconBg: 'from-accent-500 to-accent-400',
      borderHover: 'rgba(34, 211, 238, 0.4)',
      skills: [
        { name: 'Laravel', level: 82 },
        { name: 'PHP', level: 80 },
        { name: 'MySQL', level: 78 },
        { name: 'REST API', level: 75 },
      ],
    },
    {
      titleKey: 'dataml',
      icon: Cpu,
      color: 'from-purple-500/20 to-purple-500/5',
      iconBg: 'from-purple-500 to-purple-400',
      borderHover: 'rgba(167, 139, 250, 0.4)',
      skills: [
        { name: 'Python', level: 80 },
        { name: 'TensorFlow', level: 70 },
        { name: 'Scikit-Learn', level: 72 },
        { name: 'Data Analysis', level: 68 },
      ],
    },
    {
      titleKey: 'tools',
      icon: Wrench,
      color: 'from-amber-500/20 to-amber-500/5',
      iconBg: 'from-amber-500 to-amber-400',
      borderHover: 'rgba(245, 158, 11, 0.4)',
      skills: [
        { name: 'Git & GitHub', level: 85 },
        { name: 'VS Code', level: 90 },
        { name: 'Figma', level: 65 },
        { name: 'Linux', level: 70 },
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-mono text-sm tracking-wider uppercase">{t('skills.label')}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-white font-heading">
            {t('skills.title1')}<span className="gradient-text">{t('skills.titleHighlight')}</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.titleKey} category={category} index={index} translatedTitle={t(`skills.categories.${category.titleKey}`)} />
          ))}
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-24" />
    </section>
  );
}
