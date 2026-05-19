import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Search, X } from 'lucide-react';

import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/shop', label: 'Shop' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const HEADER_OFFSET = 'calc(2.5rem + 68px)';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { cart } = useCart();
  const location = useLocation();

  const closeAll = useCallback(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, []);

  useEffect(() => {
    closeAll();
  }, [location.pathname, closeAll]);

  const isOverlayOpen = isMenuOpen || isSearchOpen;

  useEffect(() => {
    document.body.style.overflow = isOverlayOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOverlayOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeAll();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeAll]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemCount = cart?.totalItems || 0;
  const isActiveRoute = (path) => location.pathname === path;

  const headerSurface =
    isScrolled || isOverlayOpen
      ? 'bg-[#FAF9F7]/98 backdrop-blur-xl border-b border-[#0D0D0D]/10 shadow-sm'
      : 'bg-[#FAF9F7]/95 backdrop-blur-md border-b border-[#0D0D0D]/08';

  const navLinkClass = (path) =>
    `text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-200 relative group ${
      isActiveRoute(path) ? 'text-[#0D0D0D]' : 'text-[#0D0D0D]/50 hover:text-[#0D0D0D]'
    }`;

  return (
    <>
      {/* Full-page blur overlay — tap anywhere to dismiss menu or search */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[40] bg-[#0D0D0D]/35 backdrop-blur-lg cursor-default"
            style={{ top: 0 }}
            aria-label="Close menu"
            onClick={closeAll}
          />
        )}
      </AnimatePresence>

      <div className="sticky top-0 z-[50]">
        <div className="bg-[#0D0D0D] text-[#C9A96E] text-center py-2.5 text-[11px] tracking-[0.2em] uppercase font-light relative z-[51]">
          Complimentary shipping on orders over ₦50,000
        </div>

        <header className={`relative z-[51] transition-all duration-300 ${headerSurface}`}>
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center h-[68px] sm:h-[72px] gap-3 lg:gap-6">
              <div className="flex items-center justify-start min-w-0 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    if (isMenuOpen) closeAll();
                    else {
                      setIsSearchOpen(false);
                      setIsMenuOpen(true);
                    }
                  }}
                  className="lg:hidden flex flex-col gap-[5px] shrink-0 p-1 -m-1"
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? (
                    <X size={22} strokeWidth={1.5} className="text-[#0D0D0D]" />
                  ) : (
                    <>
                      <span className="block h-px w-6 bg-[#0D0D0D]" />
                      <span className="block h-px w-4 bg-[#0D0D0D]" />
                      <span className="block h-px w-6 bg-[#0D0D0D]" />
                    </>
                  )}
                </button>

                <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
                  {NAV_ITEMS.slice(0, 2).map((item) => (
                    <Link key={item.path} to={item.path} className={navLinkClass(item.path)}>
                      {item.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-px bg-[#C9A96E] transition-all duration-300 ${
                          isActiveRoute(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                  ))}
                </nav>
              </div>

              <Link
                to="/"
                onClick={closeAll}
                className="justify-self-center font-['Cormorant_Garamond'] text-[18px] sm:text-[22px] font-light tracking-[0.1em] sm:tracking-[0.12em] text-[#0D0D0D] whitespace-nowrap px-1"
              >
                SCENTURE <span className="italic text-[#C9A96E]">Lagos</span>
              </Link>

              <div className="flex items-center justify-end gap-4 sm:gap-5 min-w-0">
                <nav className="hidden lg:flex items-center gap-8 xl:gap-10 mr-2 xl:mr-4">
                  {NAV_ITEMS.slice(2).map((item) => (
                    <Link key={item.path} to={item.path} className={navLinkClass(item.path)}>
                      {item.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-px bg-[#C9A96E] transition-all duration-300 ${
                          isActiveRoute(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                  ))}
                </nav>

                <button
                  type="button"
                  onClick={() => {
                    if (isSearchOpen) setIsSearchOpen(false);
                    else {
                      setIsMenuOpen(false);
                      setIsSearchOpen(true);
                    }
                  }}
                  className="text-[#0D0D0D]/50 hover:text-[#0D0D0D] transition-colors p-1"
                  aria-label={isSearchOpen ? 'Close search' : 'Search'}
                  aria-expanded={isSearchOpen}
                >
                  {isSearchOpen ? <X size={17} strokeWidth={1.5} /> : <Search size={17} strokeWidth={1.5} />}
                </button>

                <Link
                  to={isAuthenticated ? '/account' : '/login'}
                  className="hidden sm:block text-[#0D0D0D]/50 hover:text-[#0D0D0D] transition-colors"
                  aria-label="Account"
                >
                  <User size={17} strokeWidth={1.5} />
                </Link>

                <Link
                  to="/cart"
                  onClick={closeAll}
                  className="relative text-[#0D0D0D]/70 hover:text-[#0D0D0D] transition-colors shrink-0"
                  aria-label="Cart"
                >
                  <ShoppingBag size={17} strokeWidth={1.5} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 text-[9px] font-semibold text-[#FAF9F7] bg-[#0D0D0D] rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Search panel */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-[#0D0D0D]/08 bg-[#FAF9F7] relative z-[52]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 py-5">
                  <div className="relative max-w-2xl mx-auto">
                    <Search
                      size={16}
                      strokeWidth={1.5}
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-[#0D0D0D]/30"
                    />
                    <input
                      autoFocus
                      type="search"
                      placeholder="Search fragrances, candles, diffusers..."
                      className="w-full bg-transparent pl-7 pr-8 pb-3 text-sm text-[#0D0D0D] placeholder-[#0D0D0D]/30 border-b border-[#0D0D0D]/20 focus:outline-none focus:border-[#C9A96E] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-[#0D0D0D]/40 hover:text-[#0D0D0D] p-1"
                      aria-label="Close search"
                    >
                      <X size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Mobile menu — fixed panel, solid surface */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:hidden fixed left-0 right-0 z-[48] bg-[#FAF9F7] border-b border-[#0D0D0D]/10 shadow-xl flex flex-col overflow-y-auto"
              style={{ top: HEADER_OFFSET, maxHeight: `calc(100dvh - ${HEADER_OFFSET})` }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div className="flex flex-col px-6 sm:px-8 pt-8 pb-6">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <Link
                      to={item.path}
                      onClick={closeAll}
                      className={`flex items-center justify-between py-5 border-b border-[#0D0D0D]/08 text-[13px] tracking-[0.15em] uppercase font-medium ${
                        isActiveRoute(item.path) ? 'text-[#C9A96E]' : 'text-[#0D0D0D]'
                      }`}
                    >
                      {item.label}
                      <span className="text-[#0D0D0D]/25 text-xs font-light normal-case tracking-normal">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <div className="px-6 sm:px-8 py-6 mt-auto border-t border-[#0D0D0D]/08 flex flex-wrap items-center gap-6">
                <Link
                  to={isAuthenticated ? '/account' : '/login'}
                  onClick={closeAll}
                  className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#0D0D0D]/60"
                >
                  <User size={16} strokeWidth={1.5} /> Account
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#0D0D0D]/60"
                >
                  <Search size={16} strokeWidth={1.5} /> Search
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
