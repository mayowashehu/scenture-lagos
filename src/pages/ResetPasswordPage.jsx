import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import AuthService from '../services/auth.service';
import { siteImages } from '../lib/siteImages';

// ── Primitives ───────────────────────────────────────────────────────────────

const Eyebrow = ({ children }) => (
  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium">{children}</span>
);

const inputBase =
  'w-full bg-transparent border-b border-[#0D0D0D]/12 py-3.5 text-[14px] text-[#0D0D0D] placeholder-[#0D0D0D]/20 font-light focus:outline-none focus:border-[#C9A96E] transition-colors duration-300';

const PasswordField = React.memo(({ id, name, label, value, onChange, hint }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[10px] tracking-[0.2em] uppercase text-[#0D0D0D]/40 font-medium">{label}</label>
      <div className="relative">
        <input
          id={id} name={name} type={show ? 'text' : 'password'}
          value={value} onChange={onChange} placeholder="••••••••" required
          className={`${inputBase} pr-8`}
        />
        <button
          type="button"
          onClick={() => setShow((p) => !p)}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[#0D0D0D]/25 hover:text-[#0D0D0D]/60 transition-colors"
          aria-label={show ? 'Hide' : 'Show'}
        >
          {show ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
        </button>
      </div>
      {hint && <p className="text-[11px] text-[#0D0D0D]/30 font-light">{hint}</p>}
    </div>
  );
});

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const fadeUp  = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } } };

// ── Page ─────────────────────────────────────────────────────────────────────

const ResetPasswordPage = () => {
  const { token }   = useParams();
  const navigate    = useNavigate();

  const [formData,     setFormData]     = useState({ password: '', confirmPassword: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError,    setFormError]    = useState('');
  const [isSuccess,    setIsSuccess]    = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);

  useEffect(() => {
    if (!token) { setIsValidToken(false); setFormError('Invalid or missing reset token.'); return; }
    AuthService.verifyResetToken(token).catch(() => {
      setIsValidToken(false);
      setFormError('This reset link is invalid or has expired.');
    });
  }, [token]);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (formData.password.length < 6)                           return setFormError('Password must be at least 6 characters.');
    if (formData.password !== formData.confirmPassword)         return setFormError('Passwords do not match.');
    try {
      setIsSubmitting(true);
      await AuthService.resetPassword({ token, password: formData.password });
      setIsSuccess(true);
      setTimeout(() => navigate('/login'), 3500);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet><title>Reset Password | Scenture Lagos</title></Helmet>

      <div className="min-h-screen bg-[#FAF9F7] grid grid-cols-1 lg:grid-cols-2">

        {/* ── LEFT — image panel ─────────────────────────────────── */}
        <div className="hidden lg:flex relative overflow-hidden bg-[#0D0D0D] flex-col justify-between p-14">
          <img
            src={siteImages.authReset}
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
              A fresh start<br />
              <em className="italic text-[#C9A96E]">awaits you.</em>
            </p>
            <p className="text-[13px] text-[#FAF9F7]/35 font-light mt-4 max-w-xs leading-relaxed">
              Choose a strong new password to secure your Scenture Lagos account.
            </p>
          </div>
        </div>

        {/* ── RIGHT — form panel ────────────────────────────────── */}
        <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-0">

          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Link to="/" className="font-['Cormorant_Garamond'] text-[18px] font-light tracking-[0.12em] text-[#0D0D0D]">
              SCENTURE <span className="italic text-[#C9A96E]">Lagos</span>
            </Link>
          </div>

          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <AnimatePresence mode="wait">

              {/* ── Success ──────────────────────────────────────── */}
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="space-y-7"
                >
                  <div className="w-14 h-14 border border-[#C9A96E] flex items-center justify-center text-[#C9A96E]">
                    <Check size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <Eyebrow>All Done</Eyebrow>
                    <h1 className="font-['Cormorant_Garamond'] text-[clamp(34px,4vw,50px)] font-light text-[#0D0D0D] leading-tight mt-3">
                      Password reset<br />
                      <em className="italic text-[#0D0D0D]/40 font-light">successfully.</em>
                    </h1>
                  </div>
                  <p className="text-[13px] text-[#0D0D0D]/45 font-light leading-relaxed">
                    Your password has been updated. You'll be redirected to the sign-in page shortly.
                  </p>
                  <Link
                    to="/login"
                    className="group inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium text-[#0D0D0D]/40 hover:text-[#0D0D0D] transition-colors border-b border-transparent hover:border-[#0D0D0D]/25 pb-0.5"
                  >
                    <ArrowLeft size={12} strokeWidth={1.5} />
                    Sign In Now
                  </Link>
                </motion.div>

              ) : !isValidToken ? (

                /* ── Invalid token ───────────────────────────────── */
                <motion.div
                  key="invalid"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="space-y-7"
                >
                  <div>
                    <Eyebrow>Link Expired</Eyebrow>
                    <h1 className="font-['Cormorant_Garamond'] text-[clamp(34px,4vw,50px)] font-light text-[#0D0D0D] leading-tight mt-3">
                      Invalid<br />
                      <em className="italic text-[#0D0D0D]/40 font-light">reset link.</em>
                    </h1>
                  </div>
                  <div className="text-[12px] font-light px-4 py-3 border border-amber-200 text-amber-700 bg-amber-50">
                    {formError || 'This link is invalid or has expired. Please request a new one.'}
                  </div>
                  <Link
                    to="/forgot-password"
                    className="group inline-flex items-center gap-2.5 bg-[#0D0D0D] text-[#FAF9F7] px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300"
                  >
                    Request New Link
                    <ArrowUpRight size={13} strokeWidth={1.5} />
                  </Link>
                  <Link
                    to="/login"
                    className="group inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium text-[#0D0D0D]/35 hover:text-[#0D0D0D] transition-colors border-b border-transparent hover:border-[#0D0D0D]/25 pb-0.5"
                  >
                    <ArrowLeft size={12} strokeWidth={1.5} /> Back to Sign In
                  </Link>
                </motion.div>

              ) : (

                /* ── Form ────────────────────────────────────────── */
                <motion.div key="form" initial="hidden" animate="visible" variants={stagger}>
                  <motion.div variants={fadeUp}><Eyebrow>Set New Password</Eyebrow></motion.div>
                  <motion.h1
                    variants={fadeUp}
                    className="font-['Cormorant_Garamond'] text-[clamp(34px,4vw,50px)] font-light text-[#0D0D0D] leading-tight mt-3 mb-9"
                  >
                    Create a new<br />
                    <em className="italic text-[#0D0D0D]/40 font-light">password.</em>
                  </motion.h1>

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

                  <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-7">
                    <PasswordField id="password" name="password" label="New Password"
                      value={formData.password} onChange={handleChange} hint="Minimum 6 characters" />
                    <PasswordField id="confirmPassword" name="confirmPassword" label="Confirm New Password"
                      value={formData.confirmPassword} onChange={handleChange} />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full flex items-center justify-center gap-2.5 bg-[#0D0D0D] text-[#FAF9F7] py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border border-[#FAF9F7]/40 border-t-[#FAF9F7] rounded-full animate-spin" />
                          Resetting…
                        </>
                      ) : (
                        <>
                          Reset Password
                          <ArrowUpRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </motion.form>

                  <motion.div variants={fadeUp} className="mt-8">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium text-[#0D0D0D]/35 hover:text-[#0D0D0D] transition-colors border-b border-transparent hover:border-[#0D0D0D]/25 pb-0.5"
                    >
                      <ArrowLeft size={12} strokeWidth={1.5} /> Back to Sign In
                    </Link>
                  </motion.div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

      </div>
    </>
  );
};

export default ResetPasswordPage;