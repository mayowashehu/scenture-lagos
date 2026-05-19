import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Helmet } from 'react-helmet-async';
import AuthService from '../services/auth.service';
import { siteImages } from '../lib/siteImages';

// ── Primitives ───────────────────────────────────────────────────────────────

const Eyebrow = ({ children }) => (
  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium">{children}</span>
);

const inputBase =
  'w-full bg-transparent border-b border-[#0D0D0D]/12 py-3 text-[14px] text-[#0D0D0D] placeholder-[#0D0D0D]/20 font-light focus:outline-none focus:border-[#C9A96E] transition-colors duration-300';

const Field = React.memo(({ id, name, type = 'text', label, value, onChange, placeholder, required = true, error }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-[10px] tracking-[0.2em] uppercase text-[#0D0D0D]/40 font-medium">
      {label}
    </label>
    <input
      id={id} name={name} type={type} value={value} onChange={onChange}
      placeholder={placeholder} required={required}
      className={`${inputBase} ${error ? 'border-red-400' : ''}`}
    />
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="text-[11px] text-red-500 font-light"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
));

const PasswordField = React.memo(({ id, name, label, value, onChange, placeholder, error }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[10px] tracking-[0.2em] uppercase text-[#0D0D0D]/40 font-medium">{label}</label>
      <div className="relative">
        <input
          id={id} name={name} type={show ? 'text' : 'password'}
          value={value} onChange={onChange} placeholder={placeholder} required
          className={`${inputBase} pr-8 ${error ? 'border-red-400' : ''}`}
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
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-[11px] text-red-500 font-light">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };
const fadeUp  = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } } };

// ── Page ─────────────────────────────────────────────────────────────────────

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [errors,      setErrors]      = useState({});
  const [formError,   setFormError]   = useState('');
  const [isSubmitting,setIsSubmitting]= useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (isAuthenticated) navigate('/account'); }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!formData.firstName.trim()) e.firstName = 'Required';
    if (!formData.lastName.trim())  e.lastName  = 'Required';
    if (!formData.email.trim())     e.email     = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email';
    if (!formData.password)         e.password  = 'Required';
    else if (formData.password.length < 6) e.password = 'At least 6 characters';
    if (!formData.confirmPassword)  e.confirmPassword = 'Required';
    else if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;
    try {
      setIsSubmitting(true);
      await AuthService.register({
        firstName: formData.firstName, lastName: formData.lastName,
        email: formData.email, phone: formData.phone, password: formData.password,
      });
      await login({ email: formData.email, password: formData.password });
      navigate('/account');
    } catch (err) {
      setFormError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet><title>Create Account | Scenture Lagos</title></Helmet>

      <div className="min-h-screen bg-[#FAF9F7] grid grid-cols-1 lg:grid-cols-2">

        {/* ── LEFT — image panel ─────────────────────────────────── */}
        <div className="hidden lg:flex relative overflow-hidden bg-[#0D0D0D] flex-col justify-between p-14">
          <img
            src={siteImages.authRegister}
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
              Join the<br />
              <em className="italic text-[#C9A96E]">Scenture circle.</em>
            </p>
            <p className="text-[13px] text-[#FAF9F7]/35 font-light mt-4 max-w-xs leading-relaxed">
              Create an account for faster checkout, order tracking, and exclusive early access to new collections.
            </p>
          </div>
        </div>

        {/* ── RIGHT — form panel ────────────────────────────────── */}
        <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 py-14 lg:py-12 overflow-y-auto">

          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
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
            <motion.div variants={fadeUp}><Eyebrow>New Account</Eyebrow></motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-['Cormorant_Garamond'] text-[clamp(32px,4vw,48px)] font-light text-[#0D0D0D] leading-tight mt-3 mb-8"
            >
              Create your<br />
              <em className="italic text-[#0D0D0D]/40 font-light">account.</em>
            </motion.h1>

            {/* Global error */}
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

            <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-6">
              {/* Name row */}
              <div className="grid grid-cols-2 gap-x-5 gap-y-6">
                <Field id="firstName" name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} placeholder="Adebola" error={errors.firstName} />
                <Field id="lastName"  name="lastName"  label="Last Name"  value={formData.lastName}  onChange={handleChange} placeholder="Adeyemi"  error={errors.lastName}  />
              </div>

              <Field id="email" name="email" type="email" label="Email Address"
                value={formData.email} onChange={handleChange} placeholder="hello@example.com" error={errors.email} />

              <Field id="phone" name="phone" type="tel" label="Phone (optional)"
                value={formData.phone} onChange={handleChange} placeholder="+234 800 000 0000" required={false} />

              <PasswordField id="password" name="password" label="Password"
                value={formData.password} onChange={handleChange} placeholder="Min. 6 characters" error={errors.password} />

              <PasswordField id="confirmPassword" name="confirmPassword" label="Confirm Password"
                value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" error={errors.confirmPassword} />

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full flex items-center justify-center gap-2.5 bg-[#0D0D0D] text-[#FAF9F7] py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border border-[#FAF9F7]/40 border-t-[#FAF9F7] rounded-full animate-spin" />
                    Creating Account…
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowUpRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </motion.form>

            <motion.p variants={fadeUp} className="mt-7 text-[13px] text-[#0D0D0D]/40 font-light text-center lg:text-left">
              Already have an account?{' '}
              <Link to="/login" className="text-[#0D0D0D] font-medium hover:text-[#C9A96E] transition-colors border-b border-[#0D0D0D]/20 hover:border-[#C9A96E]/40 pb-0.5">
                Sign in
              </Link>
            </motion.p>

            <motion.p variants={fadeUp} className="mt-4 text-[11px] text-[#0D0D0D]/25 font-light text-center lg:text-left leading-relaxed">
              By creating an account you agree to our{' '}
              <Link to="/terms-of-service" className="hover:text-[#C9A96E] transition-colors underline underline-offset-2">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy-policy" className="hover:text-[#C9A96E] transition-colors underline underline-offset-2">Privacy Policy</Link>.
            </motion.p>
          </motion.div>
        </div>

      </div>
    </>
  );
};

export default RegisterPage;