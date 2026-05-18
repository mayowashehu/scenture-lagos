// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';

import ProductCard from '../components/product/ProductCard';
import ProductService from '../services/product.service';
import { testimonials } from '../lib/mockData';

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
      <section className="relative min-h-[100svh] grid grid-cols-1 lg:grid-cols-[1fr_1fr] overflow-hidden">

        {/* Left — editorial text block */}
        <div className="relative z-10 flex flex-col justify-end lg:justify-center px-8 lg:px-20 pt-32 pb-20 lg:py-0 bg-[#FAF9F7] lg:bg-transparent">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-lg"
          >
            <motion.div variants={fadeUp} custom={0}>
              <Eyebrow>Premium Fragrance · Lagos</Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="font-['Cormorant_Garamond'] text-[clamp(52px,8vw,96px)] font-light leading-[0.92] tracking-tight text-[#0D0D0D] mt-6"
            >
              Scent as<br />
              <em className="italic text-[#C9A96E] font-light">sanctuary.</em>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="mt-8 text-[15px] text-[#0D0D0D]/55 leading-relaxed max-w-[340px] font-light"
            >
              Each fragrance is an unhurried conversation between tradition and modernity — composed for those who live deliberately.
            </motion.p>

            <motion.div variants={fadeUp} custom={0.3} className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2.5 bg-[#0D0D0D] text-[#FAF9F7] px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300"
              >
                Explore Collection
                <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-[#0D0D0D]/50 hover:text-[#0D0D0D] transition-colors border-b border-transparent hover:border-[#0D0D0D]/30 pb-1 pt-4 sm:pt-0"
              >
                Our Story
              </Link>
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              variants={fadeUp}
              custom={0.4}
              className="mt-16 pt-6 border-t border-[#0D0D0D]/08 flex items-center gap-8"
            >
              {[['2K+', 'Happy Clients'], ['15+', 'Signature Scents'], ['100%', 'Handcrafted']].map(([num, label]) => (
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
          className="relative h-[60vw] lg:h-full min-h-[400px] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1032&q=90"
            alt="Luxury fragrance bottles"
            className="w-full h-full object-cover"
          />
          {/* Warm gradient overlay — blends left edge into bg on large screens */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#FAF9F7] to-transparent" />
          
          {/* Floating product note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-8 left-8 bg-[#FAF9F7]/90 backdrop-blur-sm px-5 py-4 max-w-[180px]"
          >
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#C9A96E] mb-1">Now Available</p>
            <p className="font-['Cormorant_Garamond'] text-[16px] font-light text-[#0D0D0D] leading-tight">Oud & Amber<br />Collection</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FEATURED PRODUCTS ───────────────────────────────────────── */}
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
              <Eyebrow>Coveted Scents</Eyebrow>
              <Rule />
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(36px,5vw,56px)] font-light text-[#0D0D0D] leading-tight">
                The Collection
              </h2>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium text-[#0D0D0D]/50 hover:text-[#0D0D0D] transition-colors border-b border-transparent hover:border-[#0D0D0D]/30 pb-1"
              >
                View All
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
                <img
                  src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
                  alt="Scenture Lagos atelier"
                  className="w-full h-full object-cover"
                />
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
                <Eyebrow>Our Story</Eyebrow>
              </motion.div>
              <motion.div variants={fadeUp} className="w-12 h-px bg-[#C9A96E]/40 my-6" />
              <motion.h2
                variants={fadeUp}
                className="font-['Cormorant_Garamond'] text-[clamp(36px,4.5vw,60px)] font-light text-[#FAF9F7] leading-[1.05] tracking-tight"
              >
                Born from a<br />
                <em className="italic text-[#C9A96E]">passion for</em><br />
                sensory excellence.
              </motion.h2>

              <motion.div variants={fadeUp} className="mt-8 space-y-5 text-[15px] text-[#FAF9F7]/50 leading-relaxed font-light max-w-[440px]">
                <p>
                  Scenture Lagos was founded with a singular vision: to create fragrances that tell stories, evoke emotions, and transform spaces into sanctuaries of luxury.
                </p>
                <p>
                  Each product is meticulously crafted using the finest ingredients, blending traditional techniques with modern innovation — an uncompromising commitment to distinction.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2.5 text-[11px] tracking-[0.2em] uppercase font-medium text-[#FAF9F7]/60 hover:text-[#C9A96E] transition-colors border-b border-[#FAF9F7]/20 hover:border-[#C9A96E]/50 pb-1"
                >
                  Learn More
                  <ArrowUpRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────────── */}
      <section className="py-28 lg:py-36 px-8 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center max-w-xl mx-auto mb-20">
            <Eyebrow>Testimonials</Eyebrow>
            <Rule />
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(32px,4vw,52px)] font-light text-[#0D0D0D] leading-tight">
              What our customers<br />
              <em className="italic text-[#0D0D0D]/40 font-light">are saying</em>
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
                  <span className="text-[12px] font-medium text-[#0D0D0D] tracking-wide">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── BOTTOM CTA STRIP ────────────────────────────────────────── */}
      <section className="border-t border-[#0D0D0D]/08 py-20 px-8 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="font-['Cormorant_Garamond'] text-[clamp(24px,3vw,40px)] font-light text-[#0D0D0D]">
            Ready to find your signature scent?
          </h3>
          <p className="text-sm text-[#0D0D0D]/45 mt-2 font-light">Explore the full collection, curated for distinction.</p>
        </div>
        <Link
          to="/shop"
          className="group shrink-0 inline-flex items-center gap-2.5 bg-[#0D0D0D] text-[#FAF9F7] px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300"
        >
          Shop Now
          <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </section>

    </div>
  );
};

export default HomePage;