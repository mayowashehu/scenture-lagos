import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import AuthService from '../services/auth.service';
import { siteImages } from '../lib/siteImages';

// ── Primitives ───────────────────────────────────────────────────────────────

const Eyebrow = ({ children }) => (
  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium">{children}</span>
);

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ── Page ─────────────────────────────────────────────────────────────────────

const ForgotPasswordPage = () => {
  const [email,        setEmail]        = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError,    setFormError]    = useState('');
  const [isSuccess,    setIsSuccess]    = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!email) { setFormError('Please enter your email address.'); return; }
    try {
      setIsSubmitting(true);
      await AuthService.forgotPassword({ email });
      setIsSuccess(true);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to process your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet><title>Reset Password | Scenture Lagos</title></Helmet>

      <div className="min-h-screen bg-[#FAF9F7] grid grid-cols-1 lg:grid-cols-2">

        {/* ── LEFT — image panel ─────────────────────────────────────── */}
        <div className="hidden lg:flex relative overflow-hidden bg-[#0D0D0D] flex-col justify-between p-14">
          <img
            src={siteImages.authForgot}
            alt="Scenture Lagos"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="relative z-10">
            <Link to="/" className="font-['Cormorant_Garamond'] text-[18px] font-light tracking-[0.12em] text-[#FAF9F7]">
              SCENTURE <span className="italic text-[#C9A96E]">Lagos</span>
            </Link>
          </div>
          <div className="relative z-10">
            <p className="font-['Cormorant_Garamond'] text-[clamp(30px,3vw,46px)] font-light text-[#FAF9F7] leading-[1.05]">
              We've got you<br />
              <em className="italic text-[#C9A96E]">covered.</em>
            </p>
            <p className="text-[13px] text-[#FAF9F7]/35 font-light mt-4 max-w-xs leading-relaxed">
              Enter your email and we'll send you a link to reset your password within minutes.
            </p>
          </div>
        </div>

        {/* ── RIGHT — form panel ─────────────────────────────────────── */}
        <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-0">

          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Link to="/" className="font-['Cormorant_Garamond'] text-[18px] font-light tracking-[0.12em] text-[#0D0D0D]">
              SCENTURE <span className="italic text-[#C9A96E]">Lagos</span>
            </Link>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="w-full max-w-sm mx-auto lg:mx-0"
          >
            <AnimatePresence mode="wait">

              {/* ── Success state ─────────────────────────────────────── */}
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="space-y-8"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 border border-[#C9A96E]/40 flex items-center justify-center text-[#C9A96E]">
                    <Mail size={20} strokeWidth={1.5} />
                  </div>

                  <div>
                    <Eyebrow>Email Sent</Eyebrow>
                    <h1 className="font-['Cormorant_Garamond'] text-[clamp(34px,4vw,50px)] font-light text-[#0D0D0D] leading-tight mt-3">
                      Check your<br />
                      <em className="italic text-[#0D0D0D]/40 font-light">inbox.</em>
                    </h1>
                  </div>

                  <div className="border border-[#C9A96E]/25 bg-[#C9A96E]/04 px-5 py-4 text-[13px] text-[#0D0D0D]/60 font-light leading-relaxed">
                    We sent a reset link to{' '}
                    <span className="text-[#0D0D0D] font-medium">{email}</span>.
                    If it doesn't appear, check your spam folder.
                  </div>

                  <Link
                    to="/login"
                    className="group inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium text-[#0D0D0D]/40 hover:text-[#0D0D0D] transition-colors border-b border-transparent hover:border-[#0D0D0D]/25 pb-0.5"
                  >
                    <ArrowLeft size={12} strokeWidth={1.5} />
                    Back to Sign In
                  </Link>
                </motion.div>

              ) : (

                /* ── Form state ───────────────────────────────────────── */
                <motion.div key="form" className="space-y-0">
                  <motion.div variants={fadeUp}><Eyebrow>Password Reset</Eyebrow></motion.div>
                  <motion.h1
                    variants={fadeUp}
                    className="font-['Cormorant_Garamond'] text-[clamp(34px,4vw,50px)] font-light text-[#0D0D0D] leading-tight mt-3 mb-10"
                  >
                    Forgot your<br />
                    <em className="italic text-[#0D0D0D]/40 font-light">password?</em>
                  </motion.h1>

                  {/* Error */}
                  <AnimatePresence>
                    {formError && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 text-[12px] font-light px-4 py-3 border border-red-200 text-red-700 bg-red-50"
                      >
                        {formError}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-[10px] tracking-[0.2em] uppercase text-[#0D0D0D]/40 font-medium">
                        Email Address
                      </label>
                      <input
                        id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="hello@example.com" required
                        className="w-full bg-transparent border-b border-[#0D0D0D]/12 py-3.5 text-[14px] text-[#0D0D0D] placeholder-[#0D0D0D]/20 font-light focus:outline-none focus:border-[#C9A96E] transition-colors duration-300"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full flex items-center justify-center gap-2.5 bg-[#0D0D0D] text-[#FAF9F7] py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border border-[#FAF9F7]/40 border-t-[#FAF9F7] rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Reset Link
                          <ArrowUpRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </motion.form>

                  <motion.div variants={fadeUp} className="mt-8">
                    <Link
                      to="/login"
                      className="group inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium text-[#0D0D0D]/35 hover:text-[#0D0D0D] transition-colors border-b border-transparent hover:border-[#0D0D0D]/25 pb-0.5"
                    >
                      <ArrowLeft size={12} strokeWidth={1.5} />
                      Back to Sign In
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </>
  );
};

export default ForgotPasswordPage;