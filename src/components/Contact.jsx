import { useState } from 'react';
import { motion } from 'framer-motion';
import { Parallax } from './RevealText';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function FloatingInput({ type, name, label, required = true }) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative mb-8">
      <input
        type={type}
        name={name}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className="w-full bg-transparent border-b border-[var(--color-nocturne-elevated)] py-4 text-cream editorial-body focus:outline-none focus:border-[var(--color-nocturne-cream)] transition-colors duration-300"
      />
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none editorial-mono text-xs ${
          isFocused || hasValue
            ? '-top-2 text-cream-dim'
            : 'top-4 text-cream-dim/50'
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="kontak" className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 bg-[#141312]/80 min-h-[90vh] flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 md:gap-24 items-end">
          
          {/* Header */}
          <Parallax distance={90} className="pb-8">
            <span className="editorial-mono text-xs text-cream-dim block mb-6">{t('ui.contact.eyebrow')}</span>
            <h2 className="editorial-heading text-4xl sm:text-6xl md:text-[6rem] text-cream leading-[0.9] tracking-tight">
              {t('ui.contact.titleA')}<br/> {t('ui.contact.titleB')}
            </h2>
          </Parallax>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full max-w-md lg:ml-auto"
          >
            <form className="flex flex-col">
              <FloatingInput type="text" name="name" label={t('ui.contact.nameLabel')} />
              <FloatingInput type="email" name="email" label={t('ui.contact.emailLabel')} />
              
              <div className="relative mb-12">
                <textarea
                  name="message"
                  required
                  rows={1}
                  onFocus={(e) => e.target.parentElement.classList.add('focused')}
                  onBlur={(e) => {
                    e.target.parentElement.classList.remove('focused');
                    if(e.target.value.length > 0) e.target.parentElement.classList.add('has-value');
                    else e.target.parentElement.classList.remove('has-value');
                  }}
                  className="w-full bg-transparent border-b border-[var(--color-nocturne-elevated)] py-4 text-cream editorial-body focus:outline-none focus:border-[var(--color-nocturne-cream)] transition-colors duration-300 resize-none overflow-hidden"
                />
                <label className="absolute left-0 top-4 transition-all duration-300 pointer-events-none editorial-mono text-xs text-cream-dim/50 label-text">
                  {t('ui.contact.msgLabel')}
                </label>
                <style>{`
                  .focused .label-text, .has-value .label-text {
                    top: -8px !important;
                    color: var(--color-nocturne-cream-dim) !important;
                  }
                `}</style>
              </div>

              <button
                type="button"
                className="group flex items-center justify-between w-full border-b border-[var(--color-nocturne-elevated)] pb-4 hover:border-cream transition-colors duration-300"
              >
                <span className="editorial-mono text-xs text-cream tracking-widest">{t('ui.contact.send')}</span>
                <ArrowRight size={16} className="text-cream group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </form>
          </motion.div>
        </div>

      </div>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-20 sm:mt-32 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 editorial-mono text-[10px] text-cream-dim">
        <div className="flex gap-4 sm:gap-8">
          <a href="https://www.linkedin.com/in/mochamad-risyad-fauzan/" className="hover:text-cream transition-colors">LINKEDIN</a>
          <a href="https://github.com/mhmdrfzn" className="hover:text-cream transition-colors">GITHUB</a>
          <a href="https://www.instagram.com/mhmdrfzn_/" className="hover:text-cream transition-colors">INSTAGRAM</a>
        </div>
        <div>
          &copy; {new Date().getFullYear()} MOCHAMAD RISYAD. {t('ui.contact.rights')}
        </div>
      </footer>
    </section>
  );
}