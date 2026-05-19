import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ShieldOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// ── Primitives ───────────────────────────────────────────────────────────────

const Eyebrow = ({ children }) => (
  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium">{children}</span>
);

// ── Page ─────────────────────────────────────────────────────────────────────

const UnauthorizedPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Helmet><title>Access Denied | Scenture Lagos</title></Helmet>

      <div className="min-h-screen bg-[#FAF9F7] relative overflow-hidden flex items-center">

        {/* Ghost numeral background */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span
            className="font-['Cormorant_Garamond'] font-light text-[#0D0D0D]/[0.03] leading-none"
            style={{ fontSize: 'clamp(160px, 32vw, 400px)' }}
          >
            401
          </span>
        </div>

        {/* Accent rules */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[#C9A96E]/20" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A96E]/20" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 py-20">
          <div className="max-w-xl">

            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-14 h-14 border border-[#C9A96E]/35 flex items-center justify-center text-[#C9A96E] mb-8"
            >
              <ShieldOff size={20} strokeWidth={1.5} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Eyebrow>Error 401</Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.08 }}
              className="font-['Cormorant_Garamond'] font-light text-[#0D0D0D] leading-[0.95] tracking-tight mt-5"
              style={{ fontSize: 'clamp(48px, 7vw, 88px)' }}
            >
              Access<br />
              <em className="italic text-[#0D0D0D]/30 font-light">denied.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
              className="mt-6 text-[14px] sm:text-[15px] text-[#0D0D0D]/45 font-light leading-relaxed max-w-sm"
            >
              You don't have permission to view this page. If you believe this is a mistake, please contact our support team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.22 }}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link
                to={currentUser ? '/account' : '/'}
                className="group inline-flex items-center gap-2.5 bg-[#0D0D0D] text-[#FAF9F7] px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300"
              >
                {currentUser ? 'My Account' : 'Homepage'}
                <ArrowUpRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <button
                onClick={() => navigate(-1)}
                className="group inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium text-[#0D0D0D]/40 hover:text-[#0D0D0D] transition-colors border-b border-transparent hover:border-[#0D0D0D]/25 pb-0.5"
              >
                <ArrowLeft size={12} strokeWidth={1.5} />
                Go Back
              </button>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.35 }}
              className="mt-14 pt-8 border-t border-[#0D0D0D]/08"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#0D0D0D]/25 mb-5 font-medium">Navigate to</p>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {[
                  { to: '/shop',    label: 'Shop'      },
                  { to: '/about',   label: 'About Us'  },
                  { to: '/contact', label: 'Contact'   },
                  { to: '/login',   label: 'Sign In'   },
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="text-[12px] tracking-[0.12em] uppercase font-medium text-[#0D0D0D]/35 hover:text-[#C9A96E] transition-colors border-b border-transparent hover:border-[#C9A96E]/35 pb-0.5"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UnauthorizedPage;