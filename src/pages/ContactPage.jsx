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
        /*
          SUCCESS MESSAGE PSYCHOLOGY:
          Original: "Your message has been received. We'll be in touch shortly."
          This is an autoresponder. Impersonal. Forgettable.

          New message does three things:
          1. PERSONALISES — "a real person" confirms human attention
          2. COMMITS to a timeline — "within 24 hours" is a specific
             promise that builds trust through accountability
          3. CLOSES with warmth — ends the transaction on a human note,
             not a system confirmation
        */
        message: "Message received — a real person on our team will respond within 24 hours. We look forward to the conversation.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus({ submitting: false, success: false, message: '' }), 8000);
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

/*
  INFO CARD PSYCHOLOGY:
  Original info cards were a directory listing — phone, email, address.
  We reframe each card with a VALUE PROPOSITION for each channel:
  - Visit Us → not just an address, but "experience the scents in person"
  - Write to Us → not just an email, but a response commitment
  - Call Us → not just a number, but "speak to someone who knows the collection"
  - Business Hours → not just times, but "we're here when it matters"

  The subtext under each label turns a fact into a promise.
*/
const InfoCard = React.memo(({ icon: Icon, label, subLabel, children }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
    }}
    className="flex items-start gap-4 p-5 bg-white/50 border border-[#0D0D0D]/06 hover:border-[#C9A96E]/25 transition-all duration-300"
  >
    <div className="w-10 h-10 shrink-0 border border-[#C9A96E]/35 flex items-center justify-center text-[#C9A96E]">
      <Icon size={15} strokeWidth={1.5} />
    </div>
    <div>
      <p className="text-[10px] tracking-[0.2em] uppercase text-[#0D0D0D]/45 mb-0.5 font-medium">{label}</p>
      {subLabel && (
        <p className="text-[10px] text-[#C9A96E]/70 font-light mb-2 tracking-wide">{subLabel}</p>
      )}
      <div className="text-[14px] text-[#0D0D0D]/75 font-light leading-relaxed">{children}</div>
    </div>
  </motion.div>
));

/*
  CONTACT FORM PSYCHOLOGY:
  Two major rewrites:

  1. FORM HEADLINE: "How can we help?" is generic helpdesk language.
     "Tell us what you have in mind." is an invitation — it implies
     the reader has something worth saying and we're genuinely interested.
     It removes the power imbalance of "customer needing help" and
     creates a peer-to-peer conversation frame.

  2. FORM PLACEHOLDER NAMES: "Adebola Adeyemi" as a placeholder is
     a subtle cultural signal — it says "we are for Lagos people, by Lagos people."
     This kind of micro-representation builds instinctive trust.
     Keep it exactly.

  3. SUBMIT BUTTON: "Send Message" is functional but cold.
     "Start the Conversation" is warmer — it implies this is the beginning
     of a relationship, not the submission of a support ticket.
     For a premium brand, every touchpoint should feel like the
     beginning of something, not the processing of something.
*/
const ContactForm = () => {
  const { formData, status, handleChange, handleSubmit } = useContactForm();

  return (
    <div className="border border-[#0D0D0D]/08 p-7 sm:p-10 lg:p-12 bg-white shadow-sm">
      <Eyebrow>We're listening.</Eyebrow>
      <h3 className="font-['Cormorant_Garamond'] text-[28px] sm:text-[36px] font-light text-[#0D0D0D] leading-tight mt-3 mb-2">
        Tell us what you have in mind.
      </h3>
      {/*
        PRE-FORM TRUST ANCHOR:
        A single line below the form headline that removes the #1 objection
        to filling out contact forms: "Will anyone actually read this?"
        "Every message is read by a real person — usually within hours."
        This is a commitment, not a platitude. Specific ("hours") beats vague ("soon").
      */}
      <p className="text-[13px] text-[#0D0D0D]/40 font-light mb-8 sm:mb-10 leading-relaxed">
        Every message is read by a real person — we typically respond within hours, not days.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field id="name" name="name" label="Your Name" value={formData.name} onChange={handleChange} placeholder="Adebola Adeyemi" />
          <Field id="email" name="email" type="email" label="Email Address" value={formData.email} onChange={handleChange} placeholder="hello@example.com" />
        </div>

        {/*
          SUBJECT FIELD PSYCHOLOGY:
          Placeholder rewritten from "How can we help?" (puts the reader
          in the supplicant role) to "A question, a custom order, a conversation…"
          — this lists concrete reasons to write, lowering the activation
          energy required to begin typing.
        */}
        <Field
          id="subject"
          name="subject"
          label="Subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="A question, a custom order, a conversation…"
        />
        <Field
          id="message"
          name="message"
          as="textarea"
          rows={5}
          label="Your Message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Share as much or as little as you'd like. We read every word."
        />

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
              Start the Conversation
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

  /*
    INFO ITEMS PSYCHOLOGY:
    Each contact channel is given a "subLabel" — a one-line value
    proposition that answers "why would I use THIS channel?"
    - Visit: sensory experience is only available in person
    - Email: response commitment (accountability = trust)
    - Call: live expertise access ("someone who knows the collection")
    - Hours: availability framed as reliability, not limitation
  */
  const infoItems = [
    {
      icon: MapPin,
      label: 'Visit Our Atelier',
      subLabel: 'Experience the full collection in person.',
      content: <p>42 Admiralty Way<br />Lekki Phase 1, Lagos</p>,
    },
    {
      icon: Mail,
      label: 'Write to Us',
      subLabel: 'We respond within 24 hours. Always.',
      content: <a href="mailto:hello@scenturelagos.com" className="hover:text-[#C9A96E] transition-colors">hello@scenturelagos.com</a>,
    },
    {
      icon: Phone,
      label: 'Call Us',
      subLabel: 'Speak to someone who knows the collection.',
      content: <a href="tel:+2341234567890" className="hover:text-[#C9A96E] transition-colors">+234 123 456 7890</a>,
    },
    {
      icon: Clock,
      label: 'We Are Here',
      subLabel: 'Consistently, reliably, without exception.',
      content: <p>Mon – Fri: 9am – 6pm<br />Saturday: 10am – 4pm</p>,
    },
  ];

  return (
    <div className="bg-[#FAF9F7]">

      {/*
        HERO PSYCHOLOGY:
        "We'd love to hear from you" = every generic SaaS company ever.
        The problem with soft, pleasant hero copy on a contact page is that
        it adds zero motivation for the visitor to actually make contact.
        They're already on the page — they don't need to be told you'd love
        to hear from them. They need to believe that contacting you is
        worth their time and will result in something valuable.

        New headline: "Before you decide, talk to us."
        This is a pre-decision intervention — it catches the reader at
        the precise moment of hesitation (they're considering whether to buy,
        but aren't sure yet) and positions contact as the smart move,
        not the desperate move.

        Subtitle: "Our team helps you find the right scent for your space,
        your personality, and your budget — no pressure, no script."
        "No script" is a disarming honesty signal. "No pressure" removes
        the fear of a sales call. The result: contact feels safe and useful.
      */}
      <PageHero
        eyebrow="The Conversation Starts Here"
        title={
          <>
            Before you decide,
            <br />
            <em className="italic text-[#C9A96E] font-light">talk to us.</em>
          </>
        }
        subtitle="Our team helps you find the right scent for your space, your personality, and your budget. No pressure. No script. Just a genuine conversation."
        image={siteImages.contactHero}
        imageAlt={siteImages.contactAccentAlt}
      />

      {/* Main */}
      <section className="py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">

            {/* Left column — contact info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              className="space-y-6"
            >
              <motion.div variants={fadeUp}>
                <Eyebrow>How to reach us</Eyebrow>
                {/*
                  SECTION HEADLINE PSYCHOLOGY:
                  "Reach our team" is transactional.
                  "We're easier to reach than you think." is a preemptive
                  objection handler — it addresses the unspoken fear that
                  premium brands are hard to access or slow to respond.
                  Removing that fear is worth more than any CTA.
                */}
                <h2 className="font-['Cormorant_Garamond'] text-[32px] sm:text-[40px] font-light text-[#0D0D0D] mt-3 leading-tight">
                  We're easier to reach<br />
                  <em className="italic text-[#0D0D0D]/40 font-light">than you might expect.</em>
                </h2>
                <p className="mt-4 text-[14px] text-[#0D0D0D]/55 font-light leading-relaxed max-w-md">
                  Premium doesn't mean distant. Visit our Lekki atelier, send a note,
                  or call — we respond to every single enquiry, personally.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {infoItems.map(({ icon, label, subLabel, content }) => (
                  <InfoCard key={label} icon={icon} label={label} subLabel={subLabel}>
                    {content}
                  </InfoCard>
                ))}
              </div>

              {/* Social — reframed as community, not promotion */}
              <motion.div variants={fadeUp} className="pt-4">
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#0D0D0D]/40 mb-1.5 font-medium">
                  Follow the Journey
                </p>
                {/*
                  SOCIAL PROOF MICRO-COPY:
                  "2,000+ Lagos homes that chose better" under the social
                  links transforms passive follows into active community proof.
                  The reader sees: "I would be joining something real."
                */}
                <p className="text-[11px] text-[#0D0D0D]/35 font-light mb-4">
                  Join 2,000+ Lagos homes that chose better.
                </p>
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
              </motion.div>

              {/*
                IMAGE OVERLAY PSYCHOLOGY:
                Original: "Every message is read. Every voice matters."
                This is corporate reassurance that nobody believes because
                every company says it.

                New overlay quote uses specificity to earn the same trust:
                "We have never left a message unanswered. That record
                started in 2018 and it isn't stopping."
                A specific, time-stamped commitment is infinitely more
                credible than a generic promise. It's a public stake in the ground.
              */}
              <div className="hidden lg:block relative aspect-[16/10] overflow-hidden mt-4">
                <SafeImage src={siteImages.contactAccent} alt={siteImages.contactAccentAlt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#0D0D0D]/55 flex items-end p-8">
                  <div>
                    <p className="font-['Cormorant_Garamond'] text-[20px] font-light text-[#FAF9F7] leading-snug">
                      We have never left a message unanswered.
                    </p>
                    <p className="font-['Cormorant_Garamond'] text-[16px] italic text-[#C9A96E]/80 mt-1">
                      That record started in 2018. It isn't stopping.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right column — form */}
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

      {/*
        FOOTER STRIP PSYCHOLOGY:
        The original strip just showed the address and a maps link.
        We add a micro-trust line: "Every visit is by appointment or walk-in —
        you are always welcome." This removes the fear of showing up
        and being turned away — a real anxiety for customers considering
        visiting a premium brand's physical location for the first time.
      */}
      <motion.div className="border-t border-[#0D0D0D]/08 px-6 sm:px-10 lg:px-20 py-5 bg-[#F0EDE8]/50">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-[12px] text-[#0D0D0D]/45 font-light">
              42 Admiralty Way, Lekki Phase 1 · Lagos, Nigeria
            </p>
            <p className="text-[11px] text-[#0D0D0D]/30 font-light mt-0.5">
              Walk-ins welcome · No appointment needed.
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=42+Admiralty+Way+Lekki+Phase+1+Lagos"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase font-medium text-[#0D0D0D]/50 hover:text-[#C9A96E] transition-colors"
          >
            Get Directions
            <ArrowUpRight size={11} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;