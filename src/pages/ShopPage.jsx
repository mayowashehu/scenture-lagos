import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, AlertCircle, ShoppingBag } from 'lucide-react';

import ProductService from '../services/product.service';
import ProductCard from '../components/product/ProductCard';
import PageHero from '../components/layout/PageHero';
import { siteImages } from '../lib/siteImages';

// ── Design-system primitives ────────────────────────────────────────────────

const Eyebrow = ({ children }) => (
  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium">
    {children}
  </span>
);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// ── State components ─────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="aspect-[3/4] bg-[#0D0D0D]/06 mb-5" />
    <div className="h-2.5 bg-[#0D0D0D]/06 rounded w-1/3 mb-3" />
    <div className="h-4 bg-[#0D0D0D]/06 rounded w-3/4 mb-2" />
    <div className="h-3 bg-[#0D0D0D]/06 rounded w-1/4" />
  </div>
);

/*
  EMPTY STATE PSYCHOLOGY:
  The original said "No products found. Try adjusting your filters."
  This is a dead end — it offers no psychological recovery.

  We reframe the empty state as a CURATION SIGNAL:
  "Your filters are very specific. That's a good sign."
  This validates the reader's taste (they're discerning) rather
  than implying they searched wrong. The CTA becomes "See Everything
  We Carry" — implying abundance and possibility, not a reset.

  This is the difference between a dead end and a redirect.
*/
const EmptyState = ({ onClear }) => (
  <div className="col-span-full flex flex-col items-center gap-5 py-24 text-center">
    <ShoppingBag size={32} strokeWidth={1} className="text-[#C9A96E]/30" />
    <div className="max-w-xs">
      <p className="font-['Cormorant_Garamond'] text-2xl font-light text-[#0D0D0D]">
        Your filters are very specific.
      </p>
      <p className="font-['Cormorant_Garamond'] text-lg italic text-[#0D0D0D]/40 mt-1">
        That's a good sign.
      </p>
      <p className="text-[13px] text-[#0D0D0D]/40 mt-4 font-light leading-relaxed">
        Nothing matched that combination — but the full collection has exactly what you're looking for.
      </p>
    </div>
    <button
      onClick={onClear}
      className="mt-2 text-[11px] tracking-[0.18em] uppercase font-medium text-[#0D0D0D] border-b border-[#0D0D0D]/30 hover:border-[#C9A96E] hover:text-[#C9A96E] pb-0.5 transition-colors"
    >
      See Everything We Carry
    </button>
  </div>
);

/*
  ERROR STATE PSYCHOLOGY:
  Technical errors break trust. The response must be immediate,
  human, and confident — not apologetic. "Something interrupted
  the connection" is honest without being alarming. The retry CTA
  is phrased as an action the user chooses, not a system fallback.
*/
const ErrorState = ({ error, onRetry }) => (
  <div className="col-span-full flex flex-col items-center gap-4 py-24 text-center">
    <AlertCircle size={28} strokeWidth={1.5} className="text-[#C9A96E]/50" />
    <div className="max-w-xs">
      <p className="font-['Cormorant_Garamond'] text-xl font-light text-[#0D0D0D]">
        Something interrupted the connection.
      </p>
      <p className="text-[13px] text-[#0D0D0D]/45 font-light mt-3 leading-relaxed">
        The collection is still here — this is a momentary issue.
      </p>
    </div>
    <button
      onClick={onRetry}
      className="text-[11px] tracking-[0.18em] uppercase font-medium text-[#0D0D0D] border-b border-[#0D0D0D]/30 hover:border-[#C9A96E] hover:text-[#C9A96E] pb-0.5 transition-colors"
    >
      Reload the Collection
    </button>
  </div>
);

// ── Category pill ─────────────────────────────────────────────────────────────

/*
  CATEGORY PILL PSYCHOLOGY:
  Pills are identity selectors, not just filters.
  The active state (black filled) signals commitment and belonging.
  The hover state should feel like permission, not a UI affordance.
*/
const CategoryPill = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`text-[11px] tracking-[0.16em] uppercase font-medium px-4 py-2 border transition-all duration-300 ${
      active
        ? 'bg-[#0D0D0D] text-[#FAF9F7] border-[#0D0D0D]'
        : 'bg-transparent text-[#0D0D0D]/50 border-[#0D0D0D]/15 hover:text-[#0D0D0D] hover:border-[#0D0D0D]/40'
    }`}
  >
    {label}
  </button>
);

// ── Main ─────────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filters = {
    page:     Number(searchParams.get('page')) || 1,
    sort:     searchParams.get('sort') || 'featured',
    category: searchParams.get('category') || 'all',
    limit:    12,
  };

  const updateFilters = (newFilters) => {
    const p = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
    if (newFilters.category || newFilters.sort) p.set('page', '1');
    setSearchParams(p, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategory = (slug) => updateFilters({ category: slug === 'all' ? null : slug });
  const handleSort     = (e)    => updateFilters({ sort: e.target.value });
  const handlePage     = (n)    => updateFilters({ page: n });
  const clearFilters   = ()     => setSearchParams({}, { replace: true });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn:  ProductService.getCategories,
    staleTime: 1000 * 60 * 60,
  });
  const categories = [{ slug: 'all', name: 'Full Collection' }, ...(categoriesData || [])];

  const { data: productsData, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['products', filters],
    queryFn:  () => ProductService.getProducts(filters),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });

  const totalPages    = productsData?.pagination?.totalPages || 1;
  const totalProducts = productsData?.pagination?.total || 0;
  const showing       = productsData?.data?.length || 0;

  return (
    <div className="bg-[#FAF9F7] min-h-screen">

      {/*
        HERO PSYCHOLOGY:
        "Our Fragrances." is a label, not a lure.
        We replace it with a desire-activating declaration:
        "The only collection in Lagos built around you — not the market."

        This does two things:
        1. FLATTERS the reader — built around *you*, not a trend
        2. INDICTS competitors — "not the market" implies everyone
           else chases trends; Scenture chases the individual

        The subtitle shifts from describing products to describing
        the OUTCOME of owning them: transformation of presence,
        not just "elevated everyday."

        The eyebrow adds urgency: "Handcrafted · Limited Quantities"
        — scarcity signal delivered before the grid even loads.
      */}
      <PageHero
        eyebrow="Handcrafted · Limited Quantities"
        title={
          <>
            Built around<span className="text-[#C9A96E]"> you</span>,<br />
            not the market.
          </>
        }
        subtitle="Each piece in this collection was made to transform how a room feels when you enter it — and how people feel when you leave."
        image={siteImages.shopHero}
        imageAlt={siteImages.shopHeroAlt}
      />

      {/* ── TOOLBAR ──────────────────────────────────────────────────────── */}
      {/*
        TOOLBAR PSYCHOLOGY:
        Sort options are reframed as INTENT signals, not mechanical choices.
        "What's New" beats "Newest." "Most Sought-After" beats "Featured" —
        it implies others have already decided these are the best options,
        triggering social proof at the point of selection.
        "Investment Pieces First" reframes high price as aspiration, not cost.
        "Start Within Reach" makes the low price option feel like an
        onramp to the brand, not a compromise.

        The product count copy shifts from "12 of 47 products" to
        "47 signature pieces · showing 12" — "signature" elevates
        every item before the reader sees it.
      */}
      <div className="border-b border-[#0D0D0D]/08 px-8 lg:px-20 py-5">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          {/* Category pills — desktop */}
          <div className="hidden lg:flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <CategoryPill
                key={cat.slug}
                label={cat.name}
                active={filters.category === cat.slug || (filters.category === 'all' && cat.slug === 'all')}
                onClick={() => handleCategory(cat.slug)}
              />
            ))}
          </div>

          {/* Mobile filter trigger */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase font-medium text-[#0D0D0D]/60 hover:text-[#0D0D0D] transition-colors"
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            Refine Selection
          </button>

          <div className="flex items-center gap-6">
            {/* Count — reframed as curation signal */}
            <p className="text-[12px] text-[#0D0D0D]/35 font-light">
              {isFetching
                ? 'Curating…'
                : `${totalProducts} signature piece${totalProducts !== 1 ? 's' : ''} · showing ${showing}`}
            </p>

            {/* Sort — reframed as intent */}
            <div className="relative flex items-center gap-2">
              <label htmlFor="sort" className="text-[11px] tracking-[0.12em] uppercase text-[#0D0D0D]/40 hidden sm:block">
                Show
              </label>
              <div className="relative">
                <select
                  id="sort"
                  value={filters.sort}
                  onChange={handleSort}
                  className="appearance-none bg-transparent border-b border-[#0D0D0D]/20 text-[12px] text-[#0D0D0D] py-1 pl-0 pr-6 focus:outline-none focus:border-[#C9A96E] transition-colors cursor-pointer"
                >
                  <option value="featured">Most Sought-After</option>
                  <option value="newest">What's New</option>
                  <option value="price-high-low">Investment Pieces First</option>
                  <option value="price-low-high">Start Within Reach</option>
                </select>
                <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#0D0D0D]/40 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TRUST STRIP ──────────────────────────────────────────────────── */}
      {/*
        NEW SECTION — CONVERSION PSYCHOLOGY:
        A thin strip immediately above the product grid that delivers
        three rapid-fire trust signals before the customer sees a single price.
        This is a "pre-suasion" technique (Cialdini) — context set before
        evaluation changes how the evaluation is made.

        Seeing "Handcrafted in Lagos · No mass production" before viewing
        a ₦35,000 bottle makes the price feel like fair exchange, not a barrier.
        "Free delivery on orders over ₦50,000" anchors a spend threshold
        and nudges the reader to reach it.
        "Every batch is numbered" is an exclusivity and authenticity signal
        that adds perceived value to every product before it's even seen.
      */}
      <div className="bg-[#0D0D0D] px-8 lg:px-20 py-3">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center sm:text-left">
          {[
            'Handcrafted in Lagos · No mass production',
            'Free delivery on orders over ₦50,000',
            'Every batch is numbered · Never replicated',
          ].map((item) => (
            <p key={item} className="text-[10px] tracking-[0.18em] uppercase text-[#FAF9F7]/40 font-light">
              {item}
            </p>
          ))}
        </div>
      </div>

      {/* ── PRODUCT GRID ─────────────────────────────────────────────────── */}
      <div className="px-8 lg:px-20 py-16 lg:py-20 max-w-[1440px] mx-auto">
        <motion.div
          key={`${filters.page}-${filters.category}-${filters.sort}`}
          variants={stagger}
          initial="hidden"
          animate="visible"
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 transition-opacity duration-300 ${isFetching ? 'opacity-60' : 'opacity-100'}`}
        >
          {isLoading && [...Array(filters.limit)].map((_, i) => <SkeletonCard key={i} />)}
          {isError  && <ErrorState error={error} onRetry={() => window.location.reload()} />}
          {!isLoading && !isError && productsData?.data.length === 0 && <EmptyState onClear={clearFilters} />}
          {!isLoading && !isError && productsData?.data.map((product) => (
            <motion.div key={product._id} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── PAGINATION ─────────────────────────────────────────────────── */}
        {/*
          PAGINATION PSYCHOLOGY:
          "← Prev" / "Next →" are mechanical. We reframe page navigation
          as discovery: "← Back" / "More to Discover →"
          Small language change — significant subconscious effect.
          "More to discover" implies abundance and rewards the reader
          for continuing, rather than simply advancing a counter.
        */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-20 pt-10 border-t border-[#0D0D0D]/08">
            <button
              disabled={filters.page === 1}
              onClick={() => handlePage(filters.page - 1)}
              className="px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-medium text-[#0D0D0D]/40 hover:text-[#0D0D0D] disabled:opacity-20 disabled:cursor-not-allowed transition-colors border-b border-transparent hover:border-[#0D0D0D]/30 pb-1 mr-4"
            >
              ← Back
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePage(i + 1)}
                className={`w-9 h-9 text-[12px] font-medium transition-all duration-200 ${
                  filters.page === i + 1
                    ? 'bg-[#0D0D0D] text-[#FAF9F7]'
                    : 'text-[#0D0D0D]/40 hover:text-[#0D0D0D] hover:bg-[#0D0D0D]/05'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={filters.page === totalPages}
              onClick={() => handlePage(filters.page + 1)}
              className="px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-medium text-[#0D0D0D]/40 hover:text-[#0D0D0D] disabled:opacity-20 disabled:cursor-not-allowed transition-colors border-b border-transparent hover:border-[#0D0D0D]/30 pb-1 ml-4"
            >
              More to Discover →
            </button>
          </div>
        )}

        {/*
          BOTTOM-OF-GRID CONVERSION SAFETY NET:
          A reader who scrolls to the bottom of the grid without
          clicking is one of the highest-intent visitors on your site —
          they saw everything and still haven't left.
          This small reassurance strip catches them before they bounce.
          "Still deciding? That's the right approach." validates their
          hesitation rather than fighting it — disarming, not pushy.
          Then it offers the softest possible next step: talk to us.
        */}
        {!isLoading && !isError && productsData?.data?.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#0D0D0D]/06 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="font-['Cormorant_Garamond'] text-xl font-light text-[#0D0D0D]">
                Still deciding? That's the right approach.
              </p>
              <p className="text-[13px] text-[#0D0D0D]/40 font-light mt-1">
                Our team helps you find the exact scent for your space and personality — no pressure.
              </p>
            </div>
            <a
              href="/contact"
              className="shrink-0 text-[11px] tracking-[0.18em] uppercase font-medium text-[#0D0D0D] border-b border-[#0D0D0D]/30 hover:border-[#C9A96E] hover:text-[#C9A96E] pb-0.5 transition-colors"
            >
              Ask for a Recommendation →
            </a>
          </div>
        )}
      </div>

      {/* ── MOBILE FILTER DRAWER ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#0D0D0D]/40 backdrop-blur-sm"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 left-0 z-50 h-full w-full max-w-[320px] bg-[#FAF9F7] flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer header */}
              <div className="flex justify-between items-center px-8 py-6 border-b border-[#0D0D0D]/08">
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase font-medium text-[#0D0D0D]">Refine Selection</p>
                  <p className="text-[10px] text-[#0D0D0D]/35 font-light mt-0.5">Find exactly what you want.</p>
                </div>
                <button onClick={() => setIsMobileFilterOpen(false)} className="text-[#0D0D0D]/40 hover:text-[#0D0D0D] transition-colors">
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10">
                {/* Categories */}
                <div>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#0D0D0D]/35 mb-5">Category</p>
                  <div className="flex flex-col gap-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => { handleCategory(cat.slug); setIsMobileFilterOpen(false); }}
                        className={`text-left py-3 border-b border-[#0D0D0D]/06 text-[13px] font-light transition-colors ${
                          filters.category === cat.slug
                            ? 'text-[#0D0D0D] font-medium'
                            : 'text-[#0D0D0D]/50 hover:text-[#0D0D0D]'
                        }`}
                      >
                        {filters.category === cat.slug && (
                          <span className="inline-block w-3 h-px bg-[#C9A96E] mr-3 translate-y-[-1px]" />
                        )}
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#0D0D0D]/35 mb-5">Show First</p>
                  <div className="flex flex-col gap-1">
                    {[
                      { value: 'featured',       label: 'Most Sought-After' },
                      { value: 'newest',         label: "What's New" },
                      { value: 'price-high-low', label: 'Investment Pieces First' },
                      { value: 'price-low-high', label: 'Start Within Reach' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { updateFilters({ sort: opt.value }); setIsMobileFilterOpen(false); }}
                        className={`text-left py-3 border-b border-[#0D0D0D]/06 text-[13px] font-light transition-colors ${
                          filters.sort === opt.value
                            ? 'text-[#0D0D0D] font-medium'
                            : 'text-[#0D0D0D]/50 hover:text-[#0D0D0D]'
                        }`}
                      >
                        {filters.sort === opt.value && (
                          <span className="inline-block w-3 h-px bg-[#C9A96E] mr-3 translate-y-[-1px]" />
                        )}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8">
                <button
                  onClick={() => { clearFilters(); setIsMobileFilterOpen(false); }}
                  className="w-full py-4 border border-[#0D0D0D]/15 text-[11px] tracking-[0.18em] uppercase font-medium text-[#0D0D0D]/50 hover:border-[#0D0D0D]/40 hover:text-[#0D0D0D] transition-all"
                >
                  View Full Collection
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}