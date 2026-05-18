import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Search, X } from 'lucide-react';

import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { currentUser, isAuthenticated } = useAuth();
  const { cart } = useCart();
  const location = useLocation();

  useEffect(() => { setIsMenuOpen(false); setIsSearchOpen(false); }, [location.pathname]);
  useEffect(() => { document.body.style.overflow = isMenuOpen ? 'hidden' : ''; }, [isMenuOpen]);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const cartItemCount = cart?.totalItems || 0;
  const isActiveRoute = (path) => location.pathname === path;

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#0D0D0D] text-[#C9A96E] text-center py-2.5 text-[11px] tracking-[0.2em] uppercase font-light">
        Complimentary shipping on orders over ₦50,000
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled || isMenuOpen
            ? 'bg-[#FAF9F7]/95 backdrop-blur-md border-b border-[#0D0D0D]/10'
            : 'bg-[#FAF9F7] border-b border-[#0D0D0D]/08'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between h-[72px]">

            {/* Hamburger — mobile left */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex flex-col gap-[5px] group"
              aria-label="Toggle menu"
            >
              <span className={`block h-px w-6 bg-[#0D0D0D] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-px bg-[#0D0D0D] transition-all duration-300 ${isMenuOpen ? 'w-6 opacity-0' : 'w-4'}`} />
              <span className={`block h-px w-6 bg-[#0D0D0D] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>

            {/* Desktop nav — left */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.slice(0, 2).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-200 relative group ${
                    isActiveRoute(item.path) ? 'text-[#0D0D0D]' : 'text-[#0D0D0D]/50 hover:text-[#0D0D0D]'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-[#C9A96E] transition-all duration-300 ${isActiveRoute(item.path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}
            </nav>

            {/* Logo — center */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 font-['Cormorant_Garamond'] text-[22px] font-light tracking-[0.12em] text-[#0D0D0D] whitespace-nowrap"
            >
              SCENTURE <span className="italic text-[#C9A96E]">Lagos</span>
            </Link>

            {/* Desktop nav — right */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.slice(2).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-200 relative group ${
                    isActiveRoute(item.path) ? 'text-[#0D0D0D]' : 'text-[#0D0D0D]/50 hover:text-[#0D0D0D]'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-[#C9A96E] transition-all duration-300 ${isActiveRoute(item.path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden lg:block text-[#0D0D0D]/50 hover:text-[#0D0D0D] transition-colors"
                aria-label="Search"
              >
                <Search size={17} strokeWidth={1.5} />
              </button>

              <Link
                to={isAuthenticated ? '/account' : '/login'}
                className="hidden lg:block text-[#0D0D0D]/50 hover:text-[#0D0D0D] transition-colors"
                aria-label="Account"
              >
                <User size={17} strokeWidth={1.5} />
              </Link>

              <Link to="/cart" className="relative text-[#0D0D0D]/70 hover:text-[#0D0D0D] transition-colors" aria-label="Cart">
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

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-[#0D0D0D]/08 bg-[#FAF9F7]"
            >
              <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-5">
                <div className="relative max-w-2xl mx-auto">
                  <Search size={16} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#0D0D0D]/30" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search fragrances, candles, diffusers..."
                    className="w-full bg-transparent pl-7 pb-3 text-sm text-[#0D0D0D] placeholder-[#0D0D0D]/30 border-b border-[#0D0D0D]/20 focus:outline-none focus:border-[#C9A96E] transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 top-[109px] bg-[#FAF9F7] z-40 flex flex-col"
            >
              <nav className="flex flex-col px-8 pt-12 gap-0">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center justify-between py-5 border-b border-[#0D0D0D]/08 text-[13px] tracking-[0.15em] uppercase font-medium transition-colors ${
                        isActiveRoute(item.path) ? 'text-[#C9A96E]' : 'text-[#0D0D0D]'
                      }`}
                    >
                      {item.label}
                      <span className="text-[#0D0D0D]/20 text-xs font-light normal-case tracking-normal">0{i + 1}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="px-8 mt-auto pb-16 pt-8 flex items-center gap-6">
                <Link to={isAuthenticated ? '/account' : '/login'} className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#0D0D0D]/50">
                  <User size={16} strokeWidth={1.5} /> Account
                </Link>
                <span className="w-px h-4 bg-[#0D0D0D]/20" />
                <button className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#0D0D0D]/50">
                  <Search size={16} strokeWidth={1.5} /> Search
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}