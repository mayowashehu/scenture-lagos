import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Gem, Leaf, BrainCircuit } from 'lucide-react';
import { siteImages } from '../lib/siteImages';
import SafeImage from '../components/ui/SafeImage';
import PageHero from '../components/layout/PageHero';

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

/*
  VALUES PSYCHOLOGY:
  The original values described what Scenture *does*.
  These describe what Scenture *refuses to accept* — which is
  far more powerful. Each card opens with an indictment of the
  industry's default, then positions Scenture as the correction.
  This is the "Enemy Frame" — defining yourself against a villain
  (mass production, shortcuts, trend-chasing) makes your audience
  feel they are choosing a side. They will always choose the hero.
*/
const valuesData = [
  {
    icon: Gem,
    index: '01',
    title: 'Zero Tolerance for Ordinary',
    description:
      'The fragrance industry is flooded with products built to a price, not a standard. We built Scenture as our personal rejection of that. Every ingredient is chosen because it is the right one — not the cheapest one.',
  },
  {
    icon: Leaf,
    index: '02',
    title: 'Craft That Outlasts Trends',
    description:
      'Trends are built to expire. We are not interested in what is popular this season. We are obsessed with what is still extraordinary in ten years. That orientation changes every decision we make.',
  },
  {
    icon: BrainCircuit,
    index: '03',
    title: 'Scent as a Form of Intelligence',
    description:
      'Most people treat fragrance as an afterthought. We treat it as a strategic choice — the most intimate signal you send before you speak. Our formulas are developed for people who understand that distinction.',
  },
];

/*
  TEAM PSYCHOLOGY:
  Roles are rewritten as *mastery descriptors*, not job titles.
  "Head Perfumer" becomes "The Nose Behind Every Formula."
  This transforms the team section from an org chart into a
  gallery of experts — which triggers Cialdini's Authority
  principle and makes the reader feel they are in exceptionally
  capable hands.
*/
const teamData = [
  {
    name: 'Adebola Adeyemi',
    role: 'Founder · The Vision',
    subRole: 'The person who saw Lagos deserved better — and built the answer.',
    image: siteImages.team1,
  },
  {
    name: 'Chioma Okonkwo',
    role: 'Head Perfumer · The Nose',
    subRole: 'The creative mind behind every formula we have ever produced.',
    image: siteImages.team2,
  },
  {
    name: 'Oluwaseun Adeyemi',
    role: 'Operations · The Standard',
    subRole: 'The reason our quality never varies — regardless of demand.',
    image: siteImages.team3,
  },
  {
    name: 'Amara Nwosu',
    role: 'Marketing · The Voice',
    subRole: 'The person who ensures the right people find us — and stay.',
    image: siteImages.team4,
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

const TeamCard = React.memo(({ name, role, subRole, image }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 28 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
    }}
    className="group"
  >
    <div className="aspect-[3/4] overflow-hidden bg-[#F0EDE8] mb-5 relative">
      <SafeImage
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
      />
      {/* Overlay on hover — reveals the sub-role descriptor.
          PSYCHOLOGY: Rewarding curiosity (hover = reveal) creates a
          micro-commitment. Small acts of engagement prime larger ones. */}
      <div className="absolute inset-0 bg-[#0D0D0D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
        <p className="font-['Cormorant_Garamond'] text-[15px] italic font-light text-[#FAF9F7]/80 leading-snug">
          {subRole}
        </p>
      </div>
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

      {/*
        HERO PSYCHOLOGY:
        The original hero said "Crafting memories, one scent at a time."
        This is a sweet line — but it is soft. It describes an activity.
        We replace it with a PROVOCATION: "Lagos has always had taste.
        It just lacked the right house to match it."

        This does three things simultaneously:
        1. Flatters Lagos readers — their taste was always there (identity validation)
        2. Positions Scenture as the answer they were waiting for (authority)
        3. Creates a "before/after" narrative in one line (story compression)

        The subtitle shifts from describing the brand to describing the READER'S
        transformation — from "someone who lives in Lagos" to "someone whose
        environment finally matches who they are."
      */}
      <PageHero
        eyebrow="Est. Lagos, 2018 · Built with Intention"
        title={
          <>
            Lagos always had taste.
            <br />
            <em className="italic text-[#C9A96E] font-light">We built it a home.</em>
          </>
        }
        subtitle="Scenture exists for one reason: because the people of this city deserve a fragrance house that matches their ambition, their refinement, and their refusal to accept the ordinary."
        image={siteImages.aboutHero}
        imageAlt={siteImages.aboutHeroAlt}
      />

      {/* ── STORY ─────────────────────────────────────────────────────────── */}
      {/*
        ORIGIN STORY PSYCHOLOGY:
        The original story was a LinkedIn bio — dates, locations, achievements.
        Conversion copy tells the ORIGIN WOUND first:
        "What was wrong with the world that made this necessary?"
        Then the REFUSAL: "We decided not to accept it."
        Then the RESULT: implied by what you see today.

        This structure mirrors the Hero's Journey, which humans are
        neurologically wired to find compelling (Joseph Campbell, narrative
        psychology). The reader doesn't just learn about Scenture —
        they root for it.

        Stats are reframed: "2018" becomes "Six years of refusal to compromise."
        This reframes time as proof of stubbornness in the pursuit of quality.
      */}
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
                <SafeImage
                  src={siteImages.aboutDetail}
                  alt="Scenture Lagos fragrance atelier"
                  className="w-full h-full object-cover"
                />
              </div>
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
              <motion.div variants={fadeUp}><Eyebrow>Why We Exist</Eyebrow></motion.div>
              <Rule className="my-6" />

              {/*
                HEADLINE PSYCHOLOGY: "A workshop in VI" is a humble origin
                detail that BUILDS credibility — it signals that this was built
                from passion, not capital. "A conviction that became a standard"
                reframes growth not as scale, but as proof of rightness.
                Law #34: Be royal in your own fashion. The conviction was never
                in doubt — only the world's readiness to receive it.
              */}
              <motion.h2
                variants={fadeUp}
                className="font-['Cormorant_Garamond'] text-[clamp(34px,4vw,54px)] font-light text-[#0D0D0D] leading-[1.05] tracking-tight"
              >
                A workshop in VI.<br />
                <em className="italic text-[#0D0D0D]/40 font-light">A conviction that became</em><br />
                a standard.
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="mt-8 space-y-5 text-[14px] text-[#0D0D0D]/55 leading-relaxed font-light max-w-[460px]"
              >
                {/*
                  PARAGRAPH 1 — The Problem (Origin Wound):
                  Open with what was wrong. This creates narrative tension
                  and makes the reader lean in. "Beautiful city. Uninspired
                  options" is a diagnosis the reader has already felt —
                  we are simply naming it for them. Named feelings create trust.
                */}
                <p>
                  In 2018, Adebola Adeyemi sat in a workshop in Victoria Island and asked a question
                  that had no satisfying answer: why does one of Africa's most sophisticated cities
                  have so few fragrance options worthy of the people who live here?
                </p>

                {/*
                  PARAGRAPH 2 — The Refusal:
                  The pivot from problem to action. "Refused to wait" is stronger
                  than "founded a company." Founders who act from refusal, not
                  ambition, are instinctively trusted more — it reads as mission,
                  not business.
                */}
                <p>
                  He refused to wait for someone else to solve it. Starting with a single formula,
                  a standard that could not be diluted, and a belief that Lagos deserved
                  a fragrance house built in its own image — Scenture was born.
                </p>

                {/*
                  PARAGRAPH 3 — The Present (Proof):
                  Don't brag about growth. Let the numbers do it and frame them
                  as validation of the original conviction — not as corporate success.
                */}
                <p>
                  Six years later, the conviction hasn't changed. Only the reach has.
                </p>
              </motion.div>

              {/* PULL QUOTE: Extracted as a standalone statement.
                  This is the line that lives in the reader's memory after they
                  close the tab. Shareable. Quotable. Reflective of their own values. */}
              <motion.div
                variants={fadeUp}
                className="mt-8 pl-5 border-l border-[#C9A96E]/50"
              >
                <p className="font-['Cormorant_Garamond'] text-[19px] italic text-[#0D0D0D]/60 font-light leading-snug">
                  "We didn't build a fragrance brand.<br />
                  We built an answer to a city's unspoken demand."
                </p>
              </motion.div>

              {/* Stats — reframed for emotional resonance */}
              <motion.div
                variants={fadeUp}
                className="mt-10 pt-8 border-t border-[#0D0D0D]/08 grid grid-cols-3 gap-6"
              >
                {[
                  ['2018', 'Year the refusal began'],
                  ['15+', 'Formulas, zero shortcuts'],
                  ['2,000+', 'Homes transformed'],
                ].map(([num, label]) => (
                  <div key={label}>
                    <p className="font-['Cormorant_Garamond'] text-3xl font-light text-[#0D0D0D]">{num}</p>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-[#0D0D0D]/40 mt-0.5 leading-snug">{label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── THE STANDARD (formerly "Values") ──────────────────────────────── */}
      {/*
        SECTION RENAME PSYCHOLOGY:
        "Our Philosophy" is passive and academic. It says "here are our
        beliefs" — which readers skim.
        "The Standard We Refuse to Lower" is a gauntlet. It announces
        something is being protected with force. Readers instinctively
        respect a brand that guards its standard like territory.

        The sub-headline "Why most fragrance houses don't impress us —
        and why ours does" is direct competitive positioning. It names
        the category and positions Scenture above it without naming
        a single competitor. Law #1: Never outshine the master —
        but you can simply outclass the field without a fight.
      */}
      <section className="py-28 lg:py-36 px-8 lg:px-20 bg-[#F5F3EF]">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-16 max-w-2xl">
              <Eyebrow>The Standard We Refuse to Lower</Eyebrow>
              <Rule className="my-6" />
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(34px,4vw,54px)] font-light text-[#0D0D0D] leading-tight">
                Why most fragrance houses<br />
                <em className="italic text-[#0D0D0D]/40">don't impress us.</em>
              </h2>
              <p className="mt-5 text-[14px] text-[#0D0D0D]/50 leading-relaxed font-light max-w-[480px]">
                The industry's defaults — cost-cutting, trend-chasing, mass production —
                are not our problem to inherit. Here is what we chose instead.
              </p>
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

      {/* ── INTERSTITIAL TENSION BREAK ────────────────────────────────────── */}
      {/*
        PSYCHOLOGY: A full-bleed dark interstitial between sections serves
        three conversion functions:
        1. PATTERN INTERRUPT — breaks the scroll rhythm, forcing attention
        2. BELIEF INSTALLATION — a single, powerful statement delivered in
           isolation carries disproportionate psychological weight
        3. IDENTITY MIRROR — "You already know which category you belong to"
           forces self-identification. Nobody reads that and thinks
           "I'm in the ordinary category." They always self-select up.

        This technique is borrowed from long-form sales copy (the "bucket
        brigade" break) applied to editorial design.
      */}
      <section className="bg-[#0D0D0D] py-24 px-8 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl"
          >
            <p className="font-['Cormorant_Garamond'] text-[clamp(28px,4vw,52px)] font-light text-[#FAF9F7] leading-[1.15] tracking-tight">
              There are two kinds of people in Lagos: those who settle for what is available —
              and those who <em className="italic text-[#C9A96E]">demand what they actually deserve.</em>
            </p>
            <p className="mt-6 text-[13px] text-[#FAF9F7]/35 font-light tracking-[0.15em] uppercase">
              You already know which category you belong to.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────────────────── */}
      {/*
        TEAM SECTION PSYCHOLOGY:
        "Our Artisans" is a good word. We keep it but add a sub-headline
        that reframes the team from "people who work here" to "the reason
        you can trust every product that leaves here."

        This triggers Cialdini's Authority principle at scale — instead of
        one expert vouching for the product, an entire team of visible,
        named experts does. Each person's role is rewritten as a mastery
        descriptor (see teamData above) that the reader experiences as
        a quality guarantee.

        The hover micro-interaction (revealing a conviction statement)
        rewards curiosity with depth — small interactions that build
        emotional investment before the purchase.
      */}
      <section className="py-28 lg:py-36 px-8 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-16 max-w-2xl">
              <Eyebrow>The People Behind the Product</Eyebrow>
              <Rule className="my-6" />
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(34px,4vw,54px)] font-light text-[#0D0D0D] leading-tight">
                The reason you can trust<br />
                <em className="italic text-[#0D0D0D]/40">every bottle that leaves us.</em>
              </h2>
              <p className="mt-5 text-[14px] text-[#0D0D0D]/50 leading-relaxed font-light max-w-[460px]">
                Behind every formula is a person who has staked their reputation on it.
                These are the obsessives who make Scenture what it is.
              </p>
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

      {/* ── CLOSING CTA ───────────────────────────────────────────────────── */}
      {/*
        CLOSING CTA PSYCHOLOGY:
        The original CTA was "Experience the Scenture difference."
        This is passive and vague. "Difference" from what? It assumes the
        reader already believes — but CTA sections exist precisely because
        they don't yet.

        We replace it with a two-part structure:
        1. CONSEQUENCE FRAMING: What happens if they don't act?
           "Every day your space is ordinary is a day your presence is
           underestimated." This is not fear — it is gentle, aspirational urgency.
           It speaks to ambition, not anxiety.
        2. PERMISSION CLOSE: "You've read this far. You already know."
           This is a presupposition technique from sales psychology —
           it assumes the decision has already been made internally
           and positions the CTA as simply the formal expression of it.
           Law #28 (Enter action with boldness): Close with certainty.
           The brand that hesitates at the close loses the room.
      */}
      <section className="py-28 lg:py-36 px-8 lg:px-20 bg-[#0D0D0D]">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow>The decision has already been made.</Eyebrow>
              <Rule className="my-6 bg-[#C9A96E]/40" />
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(36px,5vw,64px)] font-light text-[#FAF9F7] leading-[1.0] tracking-tight">
                Every day your space<br />
                is ordinary is a day<br />
                <em className="italic text-[#C9A96E]">you are underestimated.</em>
              </h2>
              <p className="mt-6 text-[14px] text-[#FAF9F7]/40 font-light leading-relaxed max-w-md">
                You have read this far. You already know what you want.
                The collection is waiting — and it will not wait forever.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4 items-start lg:items-end">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2.5 bg-[#C9A96E] text-[#0D0D0D] px-10 py-5 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#FAF9F7] transition-all duration-300"
              >
                {/* CTA verb: "Claim" over "Shop" — ownership language signals
                    a decision being made, not a transaction being processed */}
                Claim Your Scent
                <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              {/* SECONDARY ANCHOR: A softer option for those not yet ready.
                  Never leave a hesitant reader with only a hard close.
                  Give them a low-friction next step that keeps them in orbit. */}
              <Link
                to="/shop"
                className="text-[11px] tracking-[0.15em] uppercase text-[#FAF9F7]/25 hover:text-[#FAF9F7]/50 transition-colors font-light"
              >
                Or browse the full collection →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;