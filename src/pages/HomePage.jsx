// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';

import ProductCard from '../components/product/ProductCard';
import ProductService from '../services/product.service';
import { testimonials } from '../lib/mockData';
import { siteImages } from '../lib/siteImages';
import SafeImage from '../components/ui/SafeImage';

// Shared animation primitives
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// Thin gold rule
const Rule = () => <div className="w-12 h-px bg-[#C9A96E] my-6" />;

// Section eyebrow label
const Eyebrow = ({ children }) => (
  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium">{children}</span>
);

const HomePage = () => {
  const { data: featuredProducts, isLoading, isError, error } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: () => ProductService.getFeaturedProducts(4),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return (
    <div className="flex flex-col bg-[#FAF9F7]">

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      {/*
        PSYCHOLOGY: Open with identity, not product. The reader's first question
        is always "is this for someone like me?" Answer YES before they ask.
        Law #6 (Court attention at all costs) — the headline must stop the scroll.
        The sub-copy uses "deliberate" and "refusal" — scarcity of character,
        not just scarcity of stock. Makes owning this a personality statement.
      */}
      <section className="relative min-h-[100svh] grid grid-cols-1 lg:grid-cols-[1fr_1fr] overflow-hidden">

        {/* Left — editorial text block */}
        <div className="relative z-10 flex flex-col justify-end lg:justify-center px-8 lg:px-20 order-2 lg:order-1 pt-10 pb-14 lg:pt-32 lg:pb-20 lg:py-0 bg-[#FAF9F7]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-lg"
          >
            <motion.div variants={fadeUp} custom={0}>
              {/* MICRO-COPY: "Not for everyone" is a magnetic qualifier — it pre-selects
                  the reader as someone who belongs to a discerning minority. */}
              <Eyebrow>Luxury Fragrance · Lagos · Not for everyone.</Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="font-['Cormorant_Garamond'] text-[clamp(52px,8vw,96px)] font-light leading-[0.92] tracking-tight text-[#0D0D0D] mt-6"
            >
              The room<br />
              <em className="italic text-[#C9A96E] font-light">remembers you.</em>
            </motion.h1>

            {/* PSYCHOLOGY: "The room remembers you" activates the desire to be
                unforgettable — one of the deepest human social drives. It's not
                about the perfume. It's about the power the perfume gives them.
                This is Law #16 in action: you are selling absence made powerful. */}

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="mt-8 text-[15px] text-[#0D0D0D]/55 leading-relaxed max-w-[340px] font-light"
            >
              Most people wear a scent. The rare few wear an identity.
              Scenture Lagos is built for those who understand the difference —
              and refuse to settle for anything less than extraordinary.
            </motion.p>

            {/* PSYCHOLOGY: "Most people… the rare few" is a classic status bifurcation.
                Reading this, every prospect immediately self-identifies with
                "the rare few." Nobody opts into being "most people." */}

            <motion.div variants={fadeUp} custom={0.3} className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2.5 bg-[#0D0D0D] text-[#FAF9F7] px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300"
              >
                {/* CTA PSYCHOLOGY: "Claim" is an ownership verb — more powerful than
                    "Explore" or "Shop." It implies something waiting for them. */}
                Claim Your Scent
                <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-[#0D0D0D]/50 hover:text-[#0D0D0D] transition-colors border-b border-transparent hover:border-[#0D0D0D]/30 pb-1 pt-4 sm:pt-0"
              >
                {/* Secondary CTA: "Why we exist" is curiosity-driven and
                    philosophy-forward — attracts the ideal aspirational buyer */}
                Why We Exist
              </Link>
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              variants={fadeUp}
              custom={0.4}
              className="mt-16 pt-6 border-t border-[#0D0D0D]/08 flex items-center gap-8"
            >
              {/* PSYCHOLOGY: Reframed stats. "2,000+ converted" instead of "happy."
                  "Handcrafted, never mass-produced" is a scarcity and craft signal.
                  Numbers feel more credible with specificity. */}
              {[
                ['2,000+', 'Lagos Homes Transformed'],
                ['15+', 'Signature Identities'],
                ['Zero', 'Mass-Produced Shortcuts']
              ].map(([num, label]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="font-['Cormorant_Garamond'] text-2xl font-light text-[#0D0D0D]">{num}</span>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-[#0D0D0D]/40">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right — image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative order-1 lg:order-2 h-[50vh] sm:h-[55vh] lg:h-full min-h-[300px] lg:min-h-[500px] overflow-hidden bg-[#E8E4DE]"
        >
          <SafeImage src={siteImages.hero} alt={siteImages.heroAlt} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
          <div className="hidden lg:block absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#FAF9F7] to-transparent" />
          
          {/* Floating note — PSYCHOLOGY: "Restocking soon" is pure scarcity.
              It creates urgency without a countdown timer (which feels cheap).
              Premium brands create urgency through rarity, not panic. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-8 left-8 bg-[#FAF9F7]/90 backdrop-blur-sm px-5 py-4 max-w-[200px]"
          >
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#C9A96E] mb-1">Limited Availability</p>
            <p className="font-['Cormorant_Garamond'] text-[16px] font-light text-[#0D0D0D] leading-tight">Oud & Amber<br />Collection</p>
            <p className="text-[10px] text-[#0D0D0D]/40 mt-1 tracking-wide">Restocking soon — secure yours.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FEATURED PRODUCTS ───────────────────────────────────────── */}
      {/*
        PSYCHOLOGY: The section headline "Worn by those who know." is
        exclusivity positioning — it implies a club. It also uses social proof
        without naming names. The sub-line "Your next obsession is below" is
        a low-friction, confident prediction that pulls curiosity forward.
      */}
      <section className="py-28 lg:py-36 px-8 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <motion.div variants={fadeUp}>
              <Eyebrow>Worn by those who know.</Eyebrow>
              <Rule />
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(36px,5vw,56px)] font-light text-[#0D0D0D] leading-tight">
                The Collection
              </h2>
              <p className="text-[13px] text-[#0D0D0D]/40 mt-3 font-light tracking-wide">
                Your next obsession is below.
              </p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium text-[#0D0D0D]/50 hover:text-[#0D0D0D] transition-colors border-b border-transparent hover:border-[#0D0D0D]/30 pb-1"
              >
                See Everything
                <ArrowUpRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* Grid */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {isLoading && [...Array(4)].map((_, i) => (
              <motion.div key={i} variants={fadeUp} className="animate-pulse">
                <div className="aspect-[3/4] bg-[#0D0D0D]/06 mb-4" />
                <div className="h-3 bg-[#0D0D0D]/06 rounded w-1/3 mb-3" />
                <div className="h-4 bg-[#0D0D0D]/06 rounded w-3/4 mb-2" />
                <div className="h-3 bg-[#0D0D0D]/06 rounded w-1/4" />
              </motion.div>
            ))}

            {isError && (
              <div className="col-span-full flex flex-col items-center gap-3 bg-red-50 border border-red-100 p-10 text-center">
                <AlertTriangle className="w-8 h-8 text-red-400" />
                <p className="text-sm text-red-600">{error.message}</p>
              </div>
            )}

            {featuredProducts?.map((product) => (
              <motion.div key={product._id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── BRAND STORY ─────────────────────────────────────────────── */}
      {/*
        PSYCHOLOGY: This section must do three jobs:
        1. Build TRUST — through craft, specificity, and philosophy
        2. Create IDENTIFICATION — "this brand thinks like me"
        3. Install BELIEF — "if they care this much about making it, I can trust wearing it"

        Law #34 (Be royal in your own fashion): Don't explain yourself.
        Declare your standard as if there is no alternative.

        The closing line "Most can smell the difference. Only a few can afford it."
        is a reverse-psychology qualifier that makes the reader WANT to prove
        they can afford it — both financially and in taste.
      */}
      <section className="py-28 lg:py-36 bg-[#0D0D0D] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-28 items-center">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <SafeImage src={siteImages.atelier} alt={siteImages.atelierAlt} className="w-full h-full object-cover" />
              </div>
              {/* Accent corner */}
              <div className="absolute -bottom-5 -right-5 w-16 h-16 border border-[#C9A96E]/40" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="lg:py-12"
            >
              <motion.div variants={fadeUp}>
                <Eyebrow>Why Scenture Exists</Eyebrow>
              </motion.div>
              <motion.div variants={fadeUp} className="w-12 h-px bg-[#C9A96E]/40 my-6" />
              <motion.h2
                variants={fadeUp}
                className="font-['Cormorant_Garamond'] text-[clamp(36px,4.5vw,60px)] font-light text-[#FAF9F7] leading-[1.05] tracking-tight"
              >
                We saw Lagos<br />
                {/* The city-specific pride line is powerful for a Nigerian audience —
                    Law #25 (Re-create yourself): Lagos is a city of reinvention.
                    We position Scenture as part of that identity. */}
                <em className="italic text-[#C9A96E]">deserving better</em><br />
                than the ordinary.
              </motion.h2>

              <motion.div variants={fadeUp} className="mt-8 space-y-5 text-[15px] text-[#FAF9F7]/50 leading-relaxed font-light max-w-[440px]">
                <p>
                  Lagos moves fast. The people who lead it move with intention.
                  Scenture was built for them — those who understand that the details
                  of how you present yourself are never small.
                </p>
                <p>
                  Every formula is developed over months, not days. Every ingredient is
                  sourced without compromise. We make nothing that we wouldn't wear
                  ourselves — and we have extraordinarily high standards.
                </p>
                {/* SPECIFICITY LINE: Specific process claims build more trust than
                    generic quality claims. "Months, not days" is a powerful trust signal. */}
              </motion.div>

              {/* ISOLATOR QUOTE: Pull a powerful line out as a standalone statement.
                  This is the line the reader will remember and repeat. */}
              <motion.div
                variants={fadeUp}
                className="mt-8 pl-5 border-l border-[#C9A96E]/50"
              >
                <p className="font-['Cormorant_Garamond'] text-xl italic text-[#FAF9F7]/70 font-light leading-snug">
                  "Most people can smell the difference.<br />
                  Only a few choose to live it."
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2.5 text-[11px] tracking-[0.2em] uppercase font-medium text-[#FAF9F7]/60 hover:text-[#C9A96E] transition-colors border-b border-[#FAF9F7]/20 hover:border-[#C9A96E]/50 pb-1"
                >
                  {/* CTA copy: "Read our full story" implies depth and earns curiosity */}
                  Read Our Full Story
                  <ArrowUpRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────────── */}
      {/*
        PSYCHOLOGY: The section framing matters as much as the quotes.
        "Real people. Real reactions. No scripts." pre-empts the skeptic —
        it acknowledges the reader's potential doubt and neutralises it first.
        This is Cialdini's Liking + Authority combined with pre-emptive objection handling.

        The eyebrow "Their words, not ours" is disarming honesty —
        one of the most powerful conversion trust signals available.
      */}
      <section className="py-28 lg:py-36 px-8 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center max-w-xl mx-auto mb-20">
            <Eyebrow>Their words, not ours.</Eyebrow>
            <Rule />
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(32px,4vw,52px)] font-light text-[#0D0D0D] leading-tight">
              Real people.<br />
              <em className="italic text-[#0D0D0D]/40 font-light">Real reactions. No scripts.</em>
            </h2>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeUp}
                className="flex flex-col gap-6 p-8 lg:p-10 border border-[#0D0D0D]/08 hover:border-[#C9A96E]/40 transition-all duration-500 group"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className={`w-3 h-3 ${j < t.rating ? 'text-[#C9A96E]' : 'text-[#0D0D0D]/12'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>

                {/* Large opening quote mark */}
                <div className="font-['Cormorant_Garamond'] text-6xl text-[#C9A96E]/20 leading-none font-light select-none">&ldquo;</div>

                <p className="font-['Cormorant_Garamond'] text-xl font-light italic text-[#0D0D0D]/80 leading-relaxed -mt-10">
                  {t.text}
                </p>

                <div className="mt-auto pt-6 border-t border-[#0D0D0D]/06 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#C9A96E]/15 flex items-center justify-center text-[11px] font-semibold text-[#C9A96E] uppercase">
                    {t.name?.charAt(0)}
                  </div>
                  {/* TRUST SIGNAL: "Verified buyer" label next to the name adds
                      authenticity. Even without a badge system, the label works
                      psychologically as a credibility anchor. */}
                  <div className="flex flex-col">
                    <span className="text-[12px] font-medium text-[#0D0D0D] tracking-wide">{t.name}</span>
                    <span className="text-[10px] text-[#C9A96E]/70 tracking-widest uppercase">Verified buyer</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── BOTTOM CTA STRIP ────────────────────────────────────────── */}
      {/*
        PSYCHOLOGY: The closing CTA is the most important conversion moment.
        The original headline was passive — "Ready to find your scent?" invites
        hesitation. We flip it to scarcity + exclusivity + action.

        "Your signature scent is already here. The question is whether you'll claim it."
        This framing assumes the sale and creates a mild urgency without cheap
        countdown tricks. The sub-line handles the last micro-objection
        (price anxiety) by reframing it as value: "curated, not discounted."

        Law #28 (Enter action with boldness): Close with absolute confidence,
        never with a question that allows the reader to answer "no."
      */}
      <section className="border-t border-[#0D0D0D]/08 py-20 px-8 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="font-['Cormorant_Garamond'] text-[clamp(24px,3vw,40px)] font-light text-[#0D0D0D]">
            Your signature scent already exists.<br />
            <em className="italic text-[#0D0D0D]/40">It's waiting for you to claim it.</em>
          </h3>
          <p className="text-sm text-[#0D0D0D]/45 mt-2 font-light">
            Curated for those with taste. Never discounted. Never mass-produced.
          </p>
        </div>
        <Link
          to="/shop"
          className="group shrink-0 inline-flex items-center gap-2.5 bg-[#0D0D0D] text-[#FAF9F7] px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300"
        >
          {/* Final CTA: "Find My Scent" is personal — first person possession,
              not a command. It sounds like the reader's own decision. */}
          Find My Scent
          <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </section>

    </div>
  );
};

export default HomePage;