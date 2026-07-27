import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Coffee } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { icon: Briefcase, label: t('about.stats.projects'), value: '10+', color: 'from-primary-500 to-primary-400' },
    { icon: GraduationCap, label: t('about.stats.study'), value: '3+', color: 'from-accent-500 to-accent-400' },
    { icon: Award, label: t('about.stats.certs'), value: '5+', color: 'from-purple-500 to-purple-400' },
    { icon: Coffee, label: t('about.stats.coffee'), value: '∞', color: 'from-amber-500 to-amber-400' },
  ];

  const timeline = t('about.timeline');

  return (
    <section id="tentang" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-mono text-sm tracking-wider uppercase">{t('about.label')}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-white font-heading">
            {t('about.title1')}<span className="gradient-text">{t('about.titleName')}</span>{t('about.title2')}
          </h2>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {t('about.bio1')}<span className="text-primary-400 font-semibold">{t('about.bioHighlight')}</span>{t('about.bio1end')}
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {t('about.bio2')}
              <span className="text-accent-400">React</span>,{' '}
              <span className="text-accent-400">Laravel</span>, dan{' '}
              <span className="text-accent-400">TensorFlow</span>
              {t('about.bio2end')}
            </p>

            {/* Timeline */}
            <div className="space-y-4">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ x: 8, transition: { duration: 0.2 } }}
                  className="group flex items-start gap-4 p-3 rounded-lg hover:bg-surface-800/50 transition-colors cursor-default"
                >
                  <span className="text-primary-400 font-mono font-bold text-sm mt-1 shrink-0 w-12 group-hover:text-accent-400 transition-colors">{item.year}</span>
                  <div className="border-l-2 border-surface-700 group-hover:border-primary-500 pl-4 transition-colors">
                    <h4 className="text-white font-semibold">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -8,
                    rotateX: 5,
                    rotateY: -5,
                    transition: { duration: 0.3 },
                  }}
                  className="glass-card p-6 text-center cursor-default group"
                  style={{ perspective: '1000px' }}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4 group-hover:shadow-lg group-hover:shadow-primary-500/20 transition-shadow duration-300`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="text-3xl font-black text-white mb-1 font-heading">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider" />
    </section>
  );
}
