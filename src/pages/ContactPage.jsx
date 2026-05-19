import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, ArrowUpRight, Clock } from 'lucide-react';
import { siteImages } from '../lib/siteImages';
import PageHero from '../components/layout/PageHero';
import SafeImage from '../components/ui/SafeImage';

const Eyebrow = ({ children }) => (
  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium">{children}</span>
);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

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
      setStatus({
        submitting: false,
        success: true,
        message: "Your message has been received. We'll be in touch shortly.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus({ submitting: false, success: false, message: '' }), 6000);
    }, 1500);
  };

  return { formData, status, handleChange, handleSubmit };
};

const Field = React.memo(({ id, name, type = 'text', label, value, onChange, placeholder, as = 'input', rows = 5 }) => {
  const base =
    'w-full bg-white/60 border border-[#0D0D0D]/10 rounded-sm px-4 py-3.5 text-[14px] text-[#0D0D0D] placeholder-[#0D0D0D]/35 font-light focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/25 transition-all duration-300';
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[10px] tracking-[0.2em] uppercase text-[#0D0D0D]/55 font-medium">
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

const InfoCard = React.memo(({ icon: Icon, label, children }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
    }}
    className="flex items-start gap-4 p-5 bg-white/50 border border-[#0D0D0D]/06"
  >
    <div className="w-10 h-10 shrink-0 border border-[#C9A96E]/35 flex items-center justify-center text-[#C9A96E]">
      <Icon size={15} strokeWidth={1.5} />
    </div>
    <div>
      <p className="text-[10px] tracking-[0.2em] uppercase text-[#0D0D0D]/45 mb-1.5 font-medium">{label}</p>
      <div className="text-[14px] text-[#0D0D0D]/75 font-light leading-relaxed">{children}</div>
    </div>
  </motion.div>
));

const ContactForm = () => {
  const { formData, status, handleChange, handleSubmit } = useContactForm();

  return (
    <div className="border border-[#0D0D0D]/08 p-7 sm:p-10 lg:p-12 bg-white shadow-sm">
      <Eyebrow>Send a Message</Eyebrow>
      <h3 className="font-['Cormorant_Garamond'] text-[28px] sm:text-[36px] font-light text-[#0D0D0D] leading-tight mt-3 mb-8 sm:mb-10">
        How can we help?
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field id="name" name="name" label="Your Name" value={formData.name} onChange={handleChange} placeholder="Adebola Adeyemi" />
          <Field id="email" name="email" type="email" label="Email Address" value={formData.email} onChange={handleChange} placeholder="hello@example.com" />
        </div>
        <Field id="subject" name="subject" label="Subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" />
        <Field id="message" name="message" as="textarea" rows={5} label="Message" value={formData.message} onChange={handleChange} placeholder="Your message…" />

        <AnimatePresence>
          {status.message && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`text-[13px] font-light px-4 py-3 border rounded-sm overflow-hidden ${
                status.success
                  ? 'border-[#C9A96E]/40 text-[#0D0D0D]/70 bg-[#C9A96E]/08'
                  : 'border-red-200 text-red-800 bg-red-50'
              }`}
            >
              {status.message}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={status.submitting}
          className="group inline-flex items-center gap-2.5 bg-[#0D0D0D] text-[#FAF9F7] px-8 sm:px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-auto justify-center sm:justify-start"
        >
          {status.submitting ? (
            <>
              <span className="w-3.5 h-3.5 border border-[#FAF9F7]/40 border-t-[#FAF9F7] rounded-full animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <Send size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const ContactPage = () => {
  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/scenturelagos', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/scenturelagos', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/scenturelagos', label: 'Twitter' },
  ];

  const infoItems = [
    { icon: MapPin, label: 'Visit Us', content: <p>42 Admiralty Way<br />Lekki Phase 1, Lagos</p> },
    { icon: Mail, label: 'Write to Us', content: <a href="mailto:hello@scenturelagos.com" className="hover:text-[#C9A96E] transition-colors">hello@scenturelagos.com</a> },
    { icon: Phone, label: 'Call Us', content: <a href="tel:+2341234567890" className="hover:text-[#C9A96E] transition-colors">+234 123 456 7890</a> },
    { icon: Clock, label: 'Business Hours', content: <p>Mon – Fri: 9am – 6pm<br />Saturday: 10am – 4pm</p> },
  ];

  return (
    <div className="bg-[#FAF9F7]">
      <PageHero
        eyebrow="Get in Touch"
        title={
          <>
            We'd love to
            <br />
            <em className="italic text-[#C9A96E] font-light">hear from you.</em>
          </>
        }
        subtitle="Questions, collaborations, or just want to talk scent — we're here for all of it."
        image={siteImages.contactHero}
        imageAlt={siteImages.contactAccentAlt}
      />

      {/* Main */}
      <section className="py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              className="space-y-6"
            >
              <div>
                <Eyebrow>Contact Details</Eyebrow>
                <h2 className="font-['Cormorant_Garamond'] text-[32px] sm:text-[40px] font-light text-[#0D0D0D] mt-3 leading-tight">
                  Reach our team
                </h2>
                <p className="mt-4 text-[14px] text-[#0D0D0D]/55 font-light leading-relaxed max-w-md">
                  Visit our Lekki atelier, call during business hours, or send a note — we respond to every enquiry.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {infoItems.map(({ icon, label, content }) => (
                  <InfoCard key={label} icon={icon} label={label}>
                    {content}
                  </InfoCard>
                ))}
              </div>

              <div className="pt-4">
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#0D0D0D]/40 mb-4 font-medium">Follow Along</p>
                <div className="flex gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 border border-[#0D0D0D]/12 bg-white flex items-center justify-center text-[#0D0D0D]/40 hover:border-[#C9A96E]/50 hover:text-[#C9A96E] transition-all duration-300"
                    >
                      <Icon size={14} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="hidden lg:block relative aspect-[16/10] overflow-hidden mt-4">
                <SafeImage src={siteImages.contactAccent} alt={siteImages.contactAccentAlt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#0D0D0D]/50 flex items-end p-8">
                  <p className="font-['Cormorant_Garamond'] text-[22px] font-light text-[#FAF9F7] leading-snug">
                    Every message is read.
                    <br />
                    <em className="italic text-[#FAF9F7]/55">Every voice matters.</em>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      <motion.div className="border-t border-[#0D0D0D]/08 px-6 sm:px-10 lg:px-20 py-5 bg-[#F0EDE8]/50">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[12px] text-[#0D0D0D]/45 font-light">
            42 Admiralty Way, Lekki Phase 1 · Lagos, Nigeria
          </p>
          <a
            href="https://maps.google.com/?q=42+Admiralty+Way+Lekki+Phase+1+Lagos"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase font-medium text-[#0D0D0D]/50 hover:text-[#C9A96E] transition-colors"
          >
            Open in Maps
            <ArrowUpRight size={11} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
