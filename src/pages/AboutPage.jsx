import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Gem, Leaf, BrainCircuit } from 'lucide-react';

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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

// ── Data ────────────────────────────────────────────────────────────────────

const valuesData = [
  {
    icon: Gem,
    index: '01',
    title: 'Uncompromising Quality',
    description:
      'We source only the finest ingredients, ensuring each product meets our exacting standards of excellence and luxury.',
  },
  {
    icon: Leaf,
    index: '02',
    title: 'Sustainable Craft',
    description:
      "We're committed to environmentally conscious practices, from responsibly sourced materials to eco-friendly packaging.",
  },
  {
    icon: BrainCircuit,
    index: '03',
    title: 'Scent Innovation',
    description:
      'We continuously explore new scent profiles and artisan techniques, pushing the boundaries of olfactory creation.',
  },
];

const teamData = [
  {
    name: 'Adebola Adeyemi',
    role: 'Founder & Creative Director',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=761&q=80',
  },
  {
    name: 'Chioma Okonkwo',
    role: 'Head Perfumer',
    image:
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=687&q=80',
  },
  {
    name: 'Oluwaseun Adeyemi',
    role: 'Operations Director',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=687&q=80',
  },
  {
    name: 'Amara Nwosu',
    role: 'Marketing Director',
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=687&q=80',
  },
];

// ── Sub-components ───────────────────────────────────────────────────────────

const ValueCard = React.memo(({ icon: Icon, index, title, description }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 28 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
    }}
    className="group relative flex flex-col gap-6 p-8 lg:p-10 border border-[#0D0D0D]/08 hover:border-[#C9A96E]/35 transition-all duration-500 bg-[#FAF9F7]"
  >
    {/* Large index in background */}
    <span className="absolute top-6 right-8 font-['Cormorant_Garamond'] text-6xl font-light text-[#0D0D0D]/04 select-none leading-none">
      {index}
    </span>

    <div className="w-10 h-10 flex items-center justify-center border border-[#C9A96E]/40 text-[#C9A96E]">
      <Icon size={18} strokeWidth={1.5} />
    </div>

    <div>
      <h3 className="font-['Cormorant_Garamond'] text-[22px] font-light text-[#0D0D0D] mb-3 leading-snug">
        {title}
      </h3>
      <p className="text-[13px] text-[#0D0D0D]/55 leading-relaxed font-light">
        {description}
      </p>
    </div>
  </motion.div>
));

const TeamCard = React.memo(({ name, role, image }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 28 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
    }}
    className="group"
  >
    <div className="aspect-[3/4] overflow-hidden bg-[#F0EDE8] mb-5">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
        loading="lazy"
      />
    </div>
    <div className="pt-1 border-t border-[#0D0D0D]/08">
      <p className="font-['Cormorant_Garamond'] text-[19px] font-light text-[#0D0D0D] mt-3 leading-snug">
        {name}
      </p>
      <p className="text-[11px] tracking-[0.15em] uppercase text-[#C9A96E] mt-1">{role}</p>
    </div>
  </motion.div>
));

// ── Page ─────────────────────────────────────────────────────────────────────

const AboutPage = () => {
  return (
    <div className="bg-[#FAF9F7]">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* Full-bleed image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1599446794254-16ca8daa4c48?auto=format&fit=crop&w=1770&q=85"
            alt="Scenture Lagos atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-[#0D0D0D]/30 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 lg:px-20 pb-20 lg:pb-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}><Eyebrow>Est. Lagos, 2018</Eyebrow></motion.div>
            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="font-['Cormorant_Garamond'] text-[clamp(44px,7vw,88px)] font-light text-[#FAF9F7] leading-[0.95] tracking-tight mt-5"
            >
              Crafting memories,<br />
              <em className="italic text-[#C9A96E] font-light">one scent at a time.</em>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* ── STORY ─────────────────────────────────────────────────────────── */}
      <section className="py-28 lg:py-36 px-8 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-28 items-center">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1032&q=80"
                  alt="Scenture Lagos founder"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Accent corner ornament */}
              <div className="absolute -bottom-5 -right-5 w-16 h-16 border border-[#C9A96E]/35" />
              <div className="absolute -top-5 -left-5 w-16 h-16 border border-[#0D0D0D]/08" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}><Eyebrow>Our Story</Eyebrow></motion.div>
              <Rule className="my-6" />
              <motion.h2
                variants={fadeUp}
                className="font-['Cormorant_Garamond'] text-[clamp(34px,4vw,54px)] font-light text-[#0D0D0D] leading-[1.05] tracking-tight"
              >
                A workshop in<br />
                <em className="italic text-[#0D0D0D]/40 font-light">Victoria Island.</em><br />
                A vision for the world.
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="mt-8 space-y-5 text-[14px] text-[#0D0D0D]/55 leading-relaxed font-light max-w-[460px]"
              >
                <p>
                  Founded in 2018 by Adebola Adeyemi in a small workshop in Victoria Island, Scenture Lagos began as a personal quest to capture the essence of our vibrant culture through fragrance.
                </p>
                <p>
                  This passion for scent storytelling and commitment to quality quickly resonated with those seeking to elevate their everyday spaces. Today, Scenture Lagos stands as a proud testament to Nigerian craftsmanship — offering curated scent experiences that blend local inspiration with global excellence.
                </p>
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={fadeUp}
                className="mt-10 pt-8 border-t border-[#0D0D0D]/08 grid grid-cols-3 gap-6"
              >
                {[['2018', 'Founded'], ['15+', 'Signature Scents'], ['2K+', 'Happy Clients']].map(
                  ([num, label]) => (
                    <div key={label}>
                      <p className="font-['Cormorant_Garamond'] text-3xl font-light text-[#0D0D0D]">{num}</p>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-[#0D0D0D]/40 mt-0.5">{label}</p>
                    </div>
                  )
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────────────────── */}
      <section className="py-28 lg:py-36 px-8 lg:px-20 bg-[#F5F3EF]">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-16">
              <Eyebrow>Our Philosophy</Eyebrow>
              <Rule className="my-6" />
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(34px,4vw,54px)] font-light text-[#0D0D0D] leading-tight max-w-xl">
                The values that<br />
                <em className="italic text-[#0D0D0D]/40">guide our craft.</em>
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {valuesData.map((v) => (
                <ValueCard key={v.title} {...v} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────────────────── */}
      <section className="py-28 lg:py-36 px-8 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-16">
              <Eyebrow>Our Artisans</Eyebrow>
              <Rule className="my-6" />
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(34px,4vw,54px)] font-light text-[#0D0D0D] leading-tight">
                The faces behind<br />
                <em className="italic text-[#0D0D0D]/40">the fragrance.</em>
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
            >
              {teamData.map((m) => (
                <TeamCard key={m.name} {...m} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-28 lg:py-36 px-8 lg:px-20 bg-[#0D0D0D]">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow>Begin Your Journey</Eyebrow>
              <Rule className="my-6 bg-[#C9A96E]/40" />
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(36px,5vw,64px)] font-light text-[#FAF9F7] leading-[1.0] tracking-tight">
                Experience the<br />
                <em className="italic text-[#C9A96E]">Scenture difference.</em>
              </h2>
              <p className="mt-6 text-[14px] text-[#FAF9F7]/40 font-light leading-relaxed max-w-md">
                Transform your space into a sanctuary of luxury and distinction. Discover a fragrance that tells your story.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2.5 bg-[#C9A96E] text-[#0D0D0D] px-10 py-5 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#FAF9F7] transition-all duration-300"
              >
                Shop the Collection
                <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;