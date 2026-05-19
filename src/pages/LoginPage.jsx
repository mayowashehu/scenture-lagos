import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { siteImages } from '../lib/siteImages';
import { Helmet } from 'react-helmet-async';

// ── Primitives ───────────────────────────────────────────────────────────────

const Eyebrow = ({ children }) => (
  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium">{children}</span>
);

const Field = React.memo(({ id, name, type = 'text', label, value, onChange, placeholder, children }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <label htmlFor={id} className="text-[10px] tracking-[0.2em] uppercase text-[#0D0D0D]/40 font-medium">
        {label}
      </label>
      {children}
    </div>
    <input
      id={id} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder}
      className="w-full bg-transparent border-b border-[#0D0D0D]/12 py-3.5 text-[14px] text-[#0D0D0D] placeholder-[#0D0D0D]/20 font-light focus:outline-none focus:border-[#C9A96E] transition-colors duration-300"
      required
    />
  </div>
));

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ── Page ─────────────────────────────────────────────────────────────────────

const LoginPage = () => {
  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe,   setRememberMe]   = useState(false);
  const [formError,    setFormError]    = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated, loading, error: authError } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/account';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!email || !password) { setFormError('Please enter both email and password.'); return; }
    try {
      setIsSubmitting(true);
      await login({ email, password, rememberMe });
    } catch (err) {
      setFormError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const error = formError || authError;

  return (
    <>
      <Helmet><title>Sign In | Scenture Lagos</title></Helmet>

      <div className="min-h-screen bg-[#FAF9F7] grid grid-cols-1 lg:grid-cols-2">

        {/* ── LEFT — editorial image panel ───────────────────────────── */}
        <div className="hidden lg:flex relative overflow-hidden bg-[#0D0D0D] flex-col justify-between p-14">
          <img
            src={siteImages.authLogin}
            alt="Scenture Lagos"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative z-10">
            <Link to="/" className="font-['Cormorant_Garamond'] text-[18px] font-light tracking-[0.12em] text-[#FAF9F7]">
              SCENTURE <span className="italic text-[#C9A96E]">Lagos</span>
            </Link>
          </div>
          <div className="relative z-10">
            <p className="font-['Cormorant_Garamond'] text-[clamp(32px,3.5vw,48px)] font-light text-[#FAF9F7] leading-[1.05]">
              Every scent tells<br />
              <em className="italic text-[#C9A96E]">a story.</em>
            </p>
            <p className="text-[13px] text-[#FAF9F7]/35 font-light mt-4 max-w-xs leading-relaxed">
              Sign in to access your orders, wishlist, and curated recommendations.
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
            <motion.div variants={fadeUp}><Eyebrow>Welcome Back</Eyebrow></motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-['Cormorant_Garamond'] text-[clamp(36px,4vw,52px)] font-light text-[#0D0D0D] leading-tight mt-3 mb-10"
            >
              Sign in to<br />
              <em className="italic text-[#0D0D0D]/40 font-light">your account.</em>
            </motion.h1>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 text-[12px] font-light px-4 py-3 border border-red-200 text-red-700 bg-red-50"
              >
                {error}
              </motion.div>
            )}

            <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-7">
              <Field id="email" name="email" type="email" label="Email Address"
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@example.com" />

              {/* Password with toggle + forgot link */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-[10px] tracking-[0.2em] uppercase text-[#0D0D0D]/40 font-medium">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-[11px] tracking-[0.12em] uppercase font-medium text-[#0D0D0D]/35 hover:text-[#C9A96E] transition-colors border-b border-transparent hover:border-[#C9A96E]/35 pb-0.5"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password" type={showPassword ? 'text' : 'password'} value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                    className="w-full bg-transparent border-b border-[#0D0D0D]/12 py-3.5 pr-10 text-[14px] text-[#0D0D0D] placeholder-[#0D0D0D]/20 font-light focus:outline-none focus:border-[#C9A96E] transition-colors duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-[#0D0D0D]/25 hover:text-[#0D0D0D]/60 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={15} strokeWidth={1.5} /> : <Eye size={15} strokeWidth={1.5} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-3 cursor-pointer group w-fit">
                <div
                  onClick={() => setRememberMe((p) => !p)}
                  className={`w-4 h-4 border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    rememberMe ? 'bg-[#0D0D0D] border-[#0D0D0D]' : 'border-[#0D0D0D]/20 group-hover:border-[#0D0D0D]/40'
                  }`}
                >
                  {rememberMe && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="#FAF9F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-[12px] text-[#0D0D0D]/45 font-light select-none">Remember me</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="group w-full flex items-center justify-center gap-2.5 bg-[#0D0D0D] text-[#FAF9F7] py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSubmitting || loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border border-[#FAF9F7]/40 border-t-[#FAF9F7] rounded-full animate-spin" />
                    Signing In…
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowUpRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </motion.form>

            <motion.p variants={fadeUp} className="mt-8 text-[13px] text-[#0D0D0D]/40 font-light text-center lg:text-left">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#0D0D0D] font-medium hover:text-[#C9A96E] transition-colors border-b border-[#0D0D0D]/20 hover:border-[#C9A96E]/40 pb-0.5">
                Create one
              </Link>
            </motion.p>
          </motion.div>
        </div>

      </div>
    </>
  );
};

export default LoginPage;