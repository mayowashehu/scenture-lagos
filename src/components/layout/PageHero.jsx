import React from 'react';
import { motion } from 'framer-motion';
import SafeImage from '../ui/SafeImage';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const Eyebrow = ({ children }) => (
  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium">{children}</span>
);

/**
 * Split editorial hero: copy left, full-height image right (stacks on mobile).
 */
export default function PageHero({ eyebrow, title, subtitle, image, imageAlt, children }) {
  return (
    <section className="border-b border-[#0D0D0D]/08 overflow-hidden bg-[#FAF9F7]">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 min-h-[min(520px,85svh)] lg:min-h-[58vh]"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-col justify-center px-6 sm:px-10 lg:px-20 py-16 lg:py-20 order-2 lg:order-1"
        >
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="font-['Cormorant_Garamond'] text-[clamp(40px,6vw,76px)] font-light text-[#0D0D0D] leading-[0.95] tracking-tight mt-5">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-[14px] sm:text-[15px] text-[#0D0D0D]/55 font-light max-w-md leading-relaxed">
              {subtitle}
            </p>
          )}
          {children}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="relative min-h-[320px] sm:min-h-[380px] lg:min-h-full order-1 lg:order-2 bg-[#E8E4DE]"
        >
          <SafeImage
            src={image}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-[#FAF9F7]/30 via-transparent to-transparent pointer-events-none" aria-hidden />
        </motion.div>
      </motion.div>
    </section>
  );
}
