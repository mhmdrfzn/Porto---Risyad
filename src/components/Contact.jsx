import { motion } from 'framer-motion';
import { Globe, Link, Mail, MapPin, Send, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const socialLinks = [
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:fauzan.risyad@gmail.com',
    color: 'hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/5 hover:shadow-red-400/10',
  },
  {
    icon: Globe,
    label: 'GitHub',
    href: 'https://github.com/mhmdrfzn',
    color: 'hover:text-gray-100 hover:border-gray-400/30 hover:bg-gray-400/5 hover:shadow-gray-400/10',
  },
  {
    icon: Link,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/mochamad-risyad-fauzan',
    color: 'hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/5 hover:shadow-blue-400/10',
  },
];

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="kontak" className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-mono text-sm tracking-wider uppercase">{t('contact.label')}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-white font-heading">
            {t('contact.title1')}<span className="gradient-text">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-10"
            >
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {t('contact.cta')} <br className="hidden sm:block" />
                {t('contact.ctaBreak')}
              </p>

              <motion.a
                href="mailto:emailkamu@gmail.com"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 40px rgba(16, 185, 129, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-surface-950 font-bold rounded-xl relative overflow-hidden transition-all duration-300"
              >
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                <span>{t('contact.sendMessage')}</span>
                {/* Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.a>
            </motion.div>

            {/* Social links */}
            <div className="flex justify-center gap-4 mb-10">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{
                      scale: 1.15,
                      y: -4,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-surface-700 text-gray-400 transition-all duration-300 hover:shadow-lg ${social.color}`}
                  >
                    <Icon size={24} />
                    <span className="text-xs font-medium">{social.label}</span>
                  </motion.a>
                );
              })}
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center justify-center gap-2 text-gray-500"
            >
              <MapPin size={16} className="text-primary-500/50" />
              <span className="text-sm">Garut, Jawa Barat</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16 pb-8"
        >
          <div className="section-divider mb-8" />
          <p className="text-gray-600 text-sm flex flex-wrap items-center justify-center gap-1.5">
            &copy; {new Date().getFullYear()} Mochamad Risyad. {t('contact.footer')}
            <Heart size={12} className="text-red-500/60 animate-pulse mx-1" />
            {t('contact.footerEnd')}
          </p>
        </motion.footer>
      </div>
    </section>
  );
}