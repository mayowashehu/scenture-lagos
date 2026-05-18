import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, ArrowUpRight } from 'lucide-react';

// ── Design-system primitives ────────────────────────────────────────────────

const Eyebrow = ({ children }) => (
  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium">
    {children}
  </span>
);

const Rule = ({ className = '' }) => (
  <div className={`w-12 h-px bg-[#C9A96E] ${className}`} />
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ── Custom hook ──────────────────────────────────────────────────────────────

const useContactForm = () => {
  const [formData, setFormData] = React.useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = React.useState({ submitting: false, success: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, message: '' });
    setTimeout(() => {
      setStatus({ submitting: false, success: true, message: "Your message has been received. We\u2019ll be in touch shortly." });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus({ submitting: false, success: false, message: '' }), 6000);
    }, 1500);
  };

  return { formData, status, handleChange, handleSubmit };
};

// ── Input component ──────────────────────────────────────────────────────────

const Field = React.memo(({ id, name, type = 'text', label, value, onChange, placeholder, as = 'input', rows = 5 }) => {
  const base =
    'w-full bg-transparent border-b border-[#0D0D0D]/15 py-3 text-[14px] text-[#0D0D0D] placeholder-[#0D0D0D]/25 font-light focus:outline-none focus:border-[#C9A96E] transition-colors duration-300';

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[10px] tracking-[0.2em] uppercase text-[#0D0D0D]/40">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea id={id} name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows} className={`${base} resize-none`} />
      ) : (
        <input id={id} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} className={base} />
      )}
    </div>
  );
});

// ── Info row ─────────────────────────────────────────────────────────────────

const InfoRow = React.memo(({ icon: Icon, label, children }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
    }}
    className="flex items-start gap-5 py-6 border-b border-[#0D0D0D]/08 last:border-0"
  >
    <div className="w-9 h-9 border border-[#C9A96E]/35 flex items-center justify-center text-[#C9A96E] shrink-0 mt-0.5">
      <Icon size={15} strokeWidth={1.5} />
    </div>
    <div>
      <p className="text-[10px] tracking-[0.18em] uppercase text-[#0D0D0D]/35 mb-1.5">{label}</p>
      <div className="text-[13px] text-[#0D0D0D]/70 font-light leading-relaxed">{children}</div>
    </div>
  </motion.div>
));

// ── Contact form ─────────────────────────────────────────────────────────────

const ContactForm = () => {
  const { formData, status, handleChange, handleSubmit } = useContactForm();

  return (
    <div className="border border-[#0D0D0D]/08 p-8 lg:p-12 bg-[#FAF9F7]">
      <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] mb-2">Message Us</p>
      <h3 className="font-['Cormorant_Garamond'] text-[32px] font-light text-[#0D0D0D] leading-tight mb-10">
        Send a message
      </h3>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Field id="name"    name="name"    label="Your Name"    value={formData.name}    onChange={handleChange} placeholder="Adebola Adeyemi" />
          <Field id="email"   name="email"   type="email" label="Email Address" value={formData.email}   onChange={handleChange} placeholder="hello@example.com" />
        </div>
        <Field   id="subject" name="subject" label="Subject"      value={formData.subject} onChange={handleChange} placeholder="How can we help?" />
        <Field   id="message" name="message" as="textarea" rows={6} label="Message" value={formData.message} onChange={handleChange} placeholder="Your message…" />

        {/* Status */}
        <AnimatePresence>
          {status.message && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`text-[12px] font-light px-4 py-3 border ${
                status.success
                  ? 'border-[#C9A96E]/40 text-[#0D0D0D]/70 bg-[#C9A96E]/06'
                  : 'border-red-200 text-red-700 bg-red-50'
              }`}
            >
              {status.message}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-2">
          <button
            type="submit"
            disabled={status.submitting}
            className="group inline-flex items-center gap-2.5 bg-[#0D0D0D] text-[#FAF9F7] px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status.submitting ? (
              'Sending…'
            ) : (
              <>
                Send Message
                <Send size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────

const ContactPage = () => {
  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/scenturelagos', label: 'Instagram' },
    { icon: Facebook,  href: 'https://facebook.com/scenturelagos',  label: 'Facebook'  },
    { icon: Twitter,   href: 'https://twitter.com/scenturelagos',   label: 'Twitter'   },
  ];

  return (
    <div className="bg-[#FAF9F7]">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative py-28 lg:py-36 overflow-hidden px-8 lg:px-20 border-b border-[#0D0D0D]/08">
        {/* Decorative large text */}
        <div
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 font-['Cormorant_Garamond'] text-[clamp(120px,18vw,240px)] font-light text-[#0D0D0D]/03 leading-none select-none pointer-events-none whitespace-nowrap"
        >
          Contact
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-[1440px] mx-auto relative z-10"
        >
          <motion.div variants={fadeUp}><Eyebrow>Get in Touch</Eyebrow></motion.div>
          <motion.h1
            variants={fadeUp}
            custom={0.1}
            className="font-['Cormorant_Garamond'] text-[clamp(44px,7vw,88px)] font-light text-[#0D0D0D] leading-[0.95] tracking-tight mt-5 max-w-3xl"
          >
            We'd love to<br />
            <em className="italic text-[#C9A96E] font-light">hear from you.</em>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={0.2}
            className="mt-6 text-[14px] text-[#0D0D0D]/50 font-light max-w-sm leading-relaxed"
          >
            Questions, collaborations, or just want to talk scent — we're here for all of it.
          </motion.p>
        </motion.div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <section className="py-28 lg:py-36 px-8 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 lg:gap-24 items-start">

            {/* Left — info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <InfoRow icon={MapPin} label="Visit Us">
                <p>42 Admiralty Way<br />Lekki Phase 1, Lagos</p>
              </InfoRow>
              <InfoRow icon={Mail} label="Write to Us">
                <p>hello@scenturelagos.com</p>
              </InfoRow>
              <InfoRow icon={Phone} label="Call Us">
                <p>+234 123 456 7890</p>
              </InfoRow>
              <InfoRow icon={Phone} label="Business Hours">
                <p>Mon – Fri: 9am – 6pm<br />Saturday: 10am – 4pm</p>
              </InfoRow>

              {/* Social */}
              <div className="pt-8">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#0D0D0D]/35 mb-5">Follow Us</p>
                <div className="flex gap-4">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 border border-[#0D0D0D]/12 flex items-center justify-center text-[#0D0D0D]/40 hover:border-[#C9A96E]/50 hover:text-[#C9A96E] transition-all duration-300"
                    >
                      <Icon size={15} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <ContactForm />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── MAP / LOCATION STRIP ──────────────────────────────────────────── */}
      <div className="h-px bg-[#0D0D0D]/08" />
      <div className="px-8 lg:px-20 py-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#0D0D0D]/35 font-light">
            42 Admiralty Way, Lekki Phase 1 · Lagos, Nigeria
          </p>
          <a
            href="https://maps.google.com/?q=Lekki+Phase+1+Lagos"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase font-medium text-[#0D0D0D]/40 hover:text-[#C9A96E] transition-colors border-b border-transparent hover:border-[#C9A96E]/40 pb-0.5"
          >
            Open in Maps
            <ArrowUpRight size={12} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

    </div>
  );
};

export default ContactPage;