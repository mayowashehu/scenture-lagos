import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, AlertTriangle } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toast';
import OrderService from '../services/order.service';
import { NIGERIAN_STATES } from '../lib/locations';

// ── Design-system primitives ────────────────────────────────────────────────

const Eyebrow = ({ children }) => (
  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium">{children}</span>
);

const Rule = ({ className = '' }) => (
  <div className={`w-10 h-px bg-[#C9A96E] ${className}`} />
);

// Bare underline input — consistent with the rest of the system
const Field = React.memo(({ id, name, type = 'text', label, value, onChange, required = true, as = 'input', children }) => {
  const base =
    'w-full bg-transparent border-b border-[#0D0D0D]/15 py-3 text-[14px] text-[#0D0D0D] placeholder-[#0D0D0D]/25 font-light focus:outline-none focus:border-[#C9A96E] transition-colors duration-300';
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[10px] tracking-[0.2em] uppercase text-[#0D0D0D]/40">
        {label}
      </label>
      {as === 'select' ? (
        <div className="relative">
          <select id={id} name={name} value={value} onChange={onChange} required={required} className={`${base} appearance-none pr-6 cursor-pointer`}>
            {children}
          </select>
          <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#0D0D0D]/35 pointer-events-none" />
        </div>
      ) : (
        <input id={id} name={name} type={type} value={value} onChange={onChange} required={required} className={base} />
      )}
    </div>
  );
});

// ── Progress indicator ────────────────────────────────────────────────────────

const STEPS = ['Shipping', 'Payment', 'Complete'];

const CheckoutProgress = ({ step }) => {
  const current = STEPS.indexOf(step);
  return (
    <div className="flex items-center gap-0 mb-12 lg:mb-16">
      {STEPS.map((s, i) => {
        const done    = i < current;
        const active  = i === current;
        return (
          <React.Fragment key={s}>
            <div className="flex items-center gap-3">
              <div className={`w-7 h-7 flex items-center justify-center border transition-all duration-300 ${
                done   ? 'bg-[#C9A96E] border-[#C9A96E]' :
                active ? 'bg-[#0D0D0D] border-[#0D0D0D]' :
                         'bg-transparent border-[#0D0D0D]/20'
              }`}>
                {done ? (
                  <Check size={12} strokeWidth={2} className="text-[#0D0D0D]" />
                ) : (
                  <span className={`text-[11px] font-medium ${active ? 'text-[#FAF9F7]' : 'text-[#0D0D0D]/30'}`}>{i + 1}</span>
                )}
              </div>
              <span className={`text-[11px] tracking-[0.15em] uppercase font-medium transition-colors ${
                active ? 'text-[#0D0D0D]' : done ? 'text-[#C9A96E]' : 'text-[#0D0D0D]/25'
              }`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-6 transition-all duration-500 ${done ? 'bg-[#C9A96E]' : 'bg-[#0D0D0D]/10'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ── Spinner / full-page loader ────────────────────────────────────────────────

const PageLoader = ({ text }) => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 bg-[#FAF9F7]">
    <div className="w-8 h-8 border border-[#C9A96E]/40 border-t-[#C9A96E] rounded-full animate-spin" />
    {text && <p className="text-[11px] tracking-[0.2em] uppercase text-[#0D0D0D]/35">{text}</p>}
  </div>
);

// ── Shipping method card ──────────────────────────────────────────────────────

const ShippingCard = ({ method, selected, onSelect, subtotal }) => {
  const isFree = method.freeShippingThreshold && subtotal >= method.freeShippingThreshold;
  return (
    <label
      htmlFor={method.id}
      className={`flex items-center gap-4 px-5 py-4 border cursor-pointer transition-all duration-250 ${
        selected
          ? 'border-[#0D0D0D] bg-[#0D0D0D]/02'
          : 'border-[#0D0D0D]/12 hover:border-[#0D0D0D]/30'
      }`}
    >
      {/* Custom radio */}
      <div className={`w-4 h-4 border-2 flex items-center justify-center shrink-0 transition-all ${selected ? 'border-[#0D0D0D]' : 'border-[#0D0D0D]/25'}`}>
        {selected && <div className="w-2 h-2 bg-[#0D0D0D]" />}
      </div>
      <input type="radio" id={method.id} name="shippingMethod" value={method.id} checked={selected} onChange={() => onSelect(method.id)} className="sr-only" />
      <div className="flex-grow min-w-0">
        <p className="text-[13px] font-medium text-[#0D0D0D]">{method.name}</p>
        {method.description && <p className="text-[12px] text-[#0D0D0D]/40 font-light mt-0.5">{method.description}</p>}
      </div>
      <p className="text-[13px] font-medium text-[#0D0D0D] shrink-0">
        {isFree ? <span className="text-emerald-600 text-[11px] tracking-[0.1em] uppercase">Free</span> : formatPrice(method.price)}
      </p>
    </label>
  );
};

// ── Payment method card ───────────────────────────────────────────────────────

const PaymentCard = ({ method, selected, onSelect }) => (
  <label
    htmlFor={method.name}
    className={`flex items-center gap-4 px-5 py-4 border cursor-pointer transition-all duration-250 ${
      selected
        ? 'border-[#0D0D0D] bg-[#0D0D0D]/02'
        : 'border-[#0D0D0D]/12 hover:border-[#0D0D0D]/30'
    }`}
  >
    <div className={`w-4 h-4 border-2 flex items-center justify-center shrink-0 transition-all ${selected ? 'border-[#0D0D0D]' : 'border-[#0D0D0D]/25'}`}>
      {selected && <div className="w-2 h-2 bg-[#0D0D0D]" />}
    </div>
    <input type="radio" id={method.name} name="paymentMethod" value={method.name} checked={selected} onChange={() => onSelect(method.name)} className="sr-only" />
    <div className="flex-grow min-w-0">
      <p className="text-[13px] font-medium text-[#0D0D0D]">{method.displayName}</p>
      {method.description && <p className="text-[12px] text-[#0D0D0D]/40 font-light mt-0.5">{method.description}</p>}
    </div>
  </label>
);

// ── Order summary sidebar ─────────────────────────────────────────────────────

const OrderSummary = ({ cart, shippingFee, taxAmount, totalAmount, selectedShippingMethod }) => (
  <div className="border border-[#0D0D0D]/08 lg:sticky lg:top-[88px]">
    <div className="px-6 py-5 border-b border-[#0D0D0D]/08">
      <Eyebrow>Order Summary</Eyebrow>
    </div>

    {/* Items */}
    {cart?.items && (
      <div className="px-6 py-5 space-y-4 border-b border-[#0D0D0D]/08">
        {cart.items.map((item) => (
          <div key={item._id} className="flex items-center gap-3">
            <div className="w-12 h-14 bg-[#F0EDE8] overflow-hidden shrink-0">
              <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-[13px] text-[#0D0D0D] font-light leading-snug truncate">{item.productName}</p>
              <p className="text-[11px] text-[#0D0D0D]/35 mt-0.5">Qty {item.quantity}</p>
            </div>
            <p className="text-[13px] font-medium text-[#0D0D0D] shrink-0">{formatPrice(item.total)}</p>
          </div>
        ))}
      </div>
    )}

    {/* Totals */}
    <div className="px-6 py-5 space-y-3">
      <div className="flex justify-between text-[13px]">
        <span className="text-[#0D0D0D]/45 font-light">Subtotal</span>
        <span className="font-medium text-[#0D0D0D]">{formatPrice(cart?.subtotal)}</span>
      </div>
      <div className="flex justify-between text-[13px]">
        <span className="text-[#0D0D0D]/45 font-light">Shipping</span>
        <span className="font-medium text-[#0D0D0D]">{selectedShippingMethod ? formatPrice(shippingFee) : <span className="italic text-[#0D0D0D]/30 font-light text-[12px]">TBD</span>}</span>
      </div>
      <div className="flex justify-between text-[13px]">
        <span className="text-[#0D0D0D]/45 font-light">Tax (5%)</span>
        <span className="font-medium text-[#0D0D0D]">{formatPrice(taxAmount)}</span>
      </div>
    </div>

    <div className="px-6 py-5 border-t border-[#0D0D0D]/08 flex justify-between items-baseline">
      <span className="text-[11px] tracking-[0.12em] uppercase font-medium text-[#0D0D0D]">Total</span>
      <span className="font-['Cormorant_Garamond'] text-[28px] font-light text-[#0D0D0D]">{formatPrice(totalAmount)}</span>
    </div>
  </div>
);

// ── Section divider ───────────────────────────────────────────────────────────

const SectionTitle = ({ children }) => (
  <div className="mb-6">
    <Eyebrow>{children}</Eyebrow>
    <Rule className="mt-3" />
  </div>
);

// ── Main page ─────────────────────────────────────────────────────────────────

const CheckoutPage = () => {
  const { cart, loading: isCartLoading, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const { addToast } = useToast();

  const [formStep, setFormStep]                     = useState('Shipping');
  const [isProcessing, setIsProcessing]             = useState(false);
  const [order, setOrder]                           = useState(null);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: 'Lagos', postalCode: '', country: 'Nigeria',
  });

  const [shippingMethods, setShippingMethods]               = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [isLoadingShipping, setIsLoadingShipping]           = useState(false);
  const [paymentMethods, setPaymentMethods]                 = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod]   = useState('');

  // Pre-fill from auth
  useEffect(() => {
    if (currentUser) {
      setShippingInfo((p) => ({
        ...p,
        firstName: currentUser.firstName || currentUser.name?.split(' ')[0] || '',
        lastName:  currentUser.lastName  || currentUser.name?.split(' ').slice(1).join(' ') || '',
        email:     currentUser.email || '',
        phone:     currentUser.phone || '',
      }));
    }
  }, [currentUser]);

  // Handle Paystack redirect
  useEffect(() => {
    const ref = new URLSearchParams(location.search).get('reference');
    if (ref) { setFormStep('Verifying'); verifyPayment(ref); }
  }, [location.search]);

  // Redirect if cart empty
  useEffect(() => {
    const isVerifying = new URLSearchParams(location.search).has('reference');
    const isFinal = formStep === 'Complete' || formStep === 'Verifying';
    if (!isFinal && !isVerifying && !isCartLoading && (!cart || cart.items.length === 0)) {
      addToast('Your cart is empty.', 'warning');
      navigate('/cart');
    }
  }, [isCartLoading, cart, navigate, addToast, formStep, location.search]);

  // Fetch payment methods
  useEffect(() => {
    OrderService.getPaymentMethods()
      .then((methods) => {
        setPaymentMethods(methods);
        if (methods.length) setSelectedPaymentMethod(methods[0].name);
      })
      .catch((err) => addToast(err.message || 'Failed to fetch payment options.', 'error'));
  }, [addToast]);

  // Fetch shipping rates on state change
  useEffect(() => {
    if (!shippingInfo.state) return;
    setIsLoadingShipping(true);
    setSelectedShippingMethod(null);
    OrderService.getShippingRates(shippingInfo.state)
      .then((methods) => {
        setShippingMethods(methods);
        if (!methods.length) addToast('No shipping methods for your state.', 'warning');
      })
      .catch((err) => { addToast(err.message || 'Failed to fetch shipping.', 'error'); setShippingMethods([]); })
      .finally(() => setIsLoadingShipping(false));
  }, [shippingInfo.state, addToast]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setShippingInfo((p) => ({ ...p, [name]: value }));
  };

  const selectedRate = useMemo(
    () => shippingMethods.find((m) => m.id === selectedShippingMethod) || null,
    [selectedShippingMethod, shippingMethods]
  );

  const shippingFee = useMemo(() => {
    if (!selectedRate || !cart) return 0;
    const free = selectedRate.freeShippingThreshold && cart.subtotal >= selectedRate.freeShippingThreshold;
    return free ? 0 : selectedRate.price;
  }, [selectedRate, cart]);

  const taxAmount   = useMemo(() => ((cart?.subtotal || 0) * 5) / 100, [cart?.subtotal]);
  const totalAmount = useMemo(() => (cart?.subtotal || 0) + shippingFee + taxAmount, [cart?.subtotal, shippingFee, taxAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formStep === 'Shipping') {
      if (!selectedShippingMethod) return addToast('Please select a shipping method.', 'error');
      setFormStep('Payment');
    } else if (formStep === 'Payment') {
      if (!selectedPaymentMethod) return addToast('Please select a payment method.', 'error');
      await createOrderAndPay();
    }
  };

  const createOrderAndPay = async () => {
    setIsProcessing(true);
    try {
      const orderData = {
        items: cart.items.map((item) => ({ product: item.product, quantity: item.quantity, variant: item.variant?._id || null })),
        shippingAddress: { firstName: shippingInfo.firstName, lastName: shippingInfo.lastName, email: shippingInfo.email, phone: shippingInfo.phone, street: shippingInfo.address, city: shippingInfo.city, state: shippingInfo.state, postalCode: shippingInfo.postalCode, country: shippingInfo.country },
        paymentMethod: selectedPaymentMethod,
        shippingRateId: selectedShippingMethod,
      };
      const { order: created } = await OrderService.createOrder(orderData);
      if (!created) throw new Error('Failed to create order. Please try again.');
      setOrder(created);
      if (selectedPaymentMethod === 'paystack') {
        const pay = await OrderService.initializePayment(created._id);
        window.location.href = pay.authorization_url;
      } else {
        clearCart();
        setFormStep('Complete');
        addToast('Order placed successfully!', 'success');
      }
    } catch (err) {
      addToast(err.message || 'An error occurred while placing your order.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyPayment = async (reference) => {
    try {
      const { order: verified } = await OrderService.verifyPayment(reference);
      if (!verified) throw new Error('Invalid payment verification.');
      setOrder(verified);
      clearCart();
      setFormStep('Complete');
      addToast('Payment confirmed!', 'success');
      navigate(location.pathname, { replace: true });
    } catch (err) {
      addToast(err.message || 'Payment verification failed.', 'error');
      setFormStep('Payment');
      navigate(location.pathname, { replace: true });
    }
  };

  // ── Render states ──────────────────────────────────────────────────────────

  if (isCartLoading)          return <PageLoader />;
  if (formStep === 'Verifying') return <PageLoader text="Verifying your payment…" />;

  // ── Shipping form ──────────────────────────────────────────────────────────

  const ShippingForm = () => (
    <form onSubmit={handleSubmit} className="space-y-10">
      <SectionTitle>Delivery Details</SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
        <Field id="firstName" name="firstName" label="First Name"    value={shippingInfo.firstName} onChange={handleInput} />
        <Field id="lastName"  name="lastName"  label="Last Name"     value={shippingInfo.lastName}  onChange={handleInput} />
        <Field id="email"     name="email"     type="email" label="Email Address" value={shippingInfo.email} onChange={handleInput} />
        <Field id="phone"     name="phone"     type="tel"   label="Phone Number"  value={shippingInfo.phone} onChange={handleInput} />
      </div>

      <Field id="address" name="address" label="Street Address" value={shippingInfo.address} onChange={handleInput} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
        <Field id="city" name="city" label="City" value={shippingInfo.city} onChange={handleInput} />
        <Field id="state" name="state" label="State" as="select" value={shippingInfo.state} onChange={handleInput}>
          {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </Field>
      </div>

      {/* Shipping methods */}
      <div>
        <SectionTitle>Shipping Method</SectionTitle>
        {isLoadingShipping ? (
          <div className="flex items-center gap-3 py-6 text-[12px] text-[#0D0D0D]/40">
            <div className="w-4 h-4 border border-[#C9A96E]/40 border-t-[#C9A96E] rounded-full animate-spin" />
            Loading shipping rates…
          </div>
        ) : shippingMethods.length > 0 ? (
          <div className="space-y-3">
            {shippingMethods.map((m) => (
              <ShippingCard key={m.id} method={m} selected={selectedShippingMethod === m.id} onSelect={setSelectedShippingMethod} subtotal={cart?.subtotal || 0} />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-3 border border-amber-200 bg-amber-50 text-[12px] text-amber-700">
            <AlertTriangle size={13} strokeWidth={1.5} />
            No shipping methods available for the selected state.
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isProcessing || isLoadingShipping || !selectedShippingMethod}
        className="w-full flex items-center justify-center bg-[#0D0D0D] text-[#FAF9F7] py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue to Payment
      </button>
    </form>
  );

  // ── Payment form ───────────────────────────────────────────────────────────

  const PaymentForm = () => (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Shipping recap */}
      <div className="border border-[#0D0D0D]/08 px-5 py-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#0D0D0D]/35 mb-1.5">Shipping To</p>
            <p className="text-[13px] text-[#0D0D0D] font-light">{shippingInfo.firstName} {shippingInfo.lastName}</p>
            <p className="text-[12px] text-[#0D0D0D]/45 font-light mt-0.5">{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}</p>
            <p className="text-[12px] text-[#0D0D0D]/45 font-light">{shippingInfo.email}</p>
          </div>
          <button
            type="button"
            onClick={() => setFormStep('Shipping')}
            className="text-[11px] tracking-[0.15em] uppercase font-medium text-[#0D0D0D]/35 hover:text-[#C9A96E] transition-colors border-b border-transparent hover:border-[#C9A96E]/40 pb-0.5 shrink-0"
          >
            Edit
          </button>
        </div>
      </div>

      <div>
        <SectionTitle>Payment Method</SectionTitle>
        {paymentMethods.length > 0 ? (
          <div className="space-y-3">
            {paymentMethods.map((m) => (
              <PaymentCard key={m.id} method={m} selected={selectedPaymentMethod === m.name} onSelect={setSelectedPaymentMethod} />
            ))}
          </div>
        ) : (
          <p className="text-[13px] text-[#0D0D0D]/40 font-light">No payment methods available.</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full flex items-center justify-center bg-[#0D0D0D] text-[#FAF9F7] py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing…' : `Pay ${formatPrice(totalAmount)}`}
      </button>
    </form>
  );

  // ── Confirmation ───────────────────────────────────────────────────────────

  const Confirmation = () => (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="py-8 lg:py-12"
    >
      {/* Check mark */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-16 h-16 border border-[#C9A96E] flex items-center justify-center mb-7">
          <Check size={24} strokeWidth={1.5} className="text-[#C9A96E]" />
        </div>
        <Eyebrow>Order Confirmed</Eyebrow>
        <h2 className="font-['Cormorant_Garamond'] text-[clamp(32px,4vw,52px)] font-light text-[#0D0D0D] leading-tight mt-4">
          Thank you for your order.
        </h2>
        <p className="text-[13px] text-[#0D0D0D]/45 font-light max-w-sm mt-3 leading-relaxed">
          A confirmation has been sent to{' '}
          <span className="text-[#0D0D0D]">{order?.shippingAddress?.email}</span>. We will be in touch when your order ships.
        </p>
      </div>

      {/* Order detail */}
      <div className="max-w-lg mx-auto border border-[#0D0D0D]/08">
        <div className="px-6 py-4 border-b border-[#0D0D0D]/08 flex justify-between items-center">
          <p className="text-[10px] tracking-[0.18em] uppercase text-[#0D0D0D]/35">Order Reference</p>
          <p className="font-['Cormorant_Garamond'] text-[18px] font-light text-[#0D0D0D]">#{order?.orderNumber}</p>
        </div>

        <div className="px-6 py-5 space-y-3.5">
          {order?.items?.map((item) => (
            <div key={item._id} className="flex justify-between items-center text-[13px]">
              <span className="text-[#0D0D0D]/60 font-light">{item.name} × {item.quantity}</span>
              <span className="font-medium text-[#0D0D0D]">{formatPrice(item.price)}</span>
            </div>
          ))}
        </div>

        <div className="px-6 py-5 border-t border-[#0D0D0D]/08 space-y-2.5">
          {[
            ['Subtotal',  formatPrice(order?.subtotal)],
            ['Shipping',  formatPrice(order?.shippingFee)],
            ['Tax',       formatPrice(order?.taxAmount)],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between text-[13px]">
              <span className="text-[#0D0D0D]/45 font-light">{label}</span>
              <span className="font-medium text-[#0D0D0D]">{val}</span>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-[#0D0D0D]/08 flex justify-between items-baseline">
          <span className="text-[11px] tracking-[0.12em] uppercase font-medium text-[#0D0D0D]">Total</span>
          <span className="font-['Cormorant_Garamond'] text-[26px] font-light text-[#0D0D0D]">{formatPrice(order?.totalAmount)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <Link
          to="/shop"
          className="group inline-flex items-center justify-center gap-2 bg-[#0D0D0D] text-[#FAF9F7] px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300"
        >
          Continue Shopping
        </Link>
        <Link
          to={`/orders/${order?._id}`}
          className="inline-flex items-center justify-center gap-2 border border-[#0D0D0D]/20 text-[#0D0D0D] px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:border-[#0D0D0D] transition-all duration-300"
        >
          View Order
        </Link>
      </div>
    </motion.div>
  );

  const isComplete = formStep === 'Complete';

  return (
    <div className="bg-[#FAF9F7] min-h-screen">

      {/* Page header */}
      <div className="border-b border-[#0D0D0D]/08 px-8 lg:px-20 py-14 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-[1440px] mx-auto"
        >
          <Eyebrow>Secure Checkout</Eyebrow>
          <h1 className="font-['Cormorant_Garamond'] text-[clamp(36px,5vw,64px)] font-light text-[#0D0D0D] leading-tight mt-4">
            {isComplete ? 'Order Complete' : 'Checkout'}
            <span className="text-[#C9A96E]">.</span>
          </h1>
        </motion.div>
      </div>

      {/* Body */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-12 lg:py-16">
        <CheckoutProgress step={isComplete ? 'Complete' : formStep} />

        <div className={`grid grid-cols-1 ${!isComplete ? 'lg:grid-cols-[1fr_380px]' : ''} gap-12 lg:gap-16 items-start`}>

          {/* Main form */}
          <div className="bg-[#FAF9F7]">
            <AnimatePresence mode="wait">
              <motion.div
                key={formStep}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {formStep === 'Shipping' && <ShippingForm />}
                {formStep === 'Payment'  && <PaymentForm  />}
                {formStep === 'Complete' && <Confirmation />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar — hidden on confirmation */}
          {!isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
            >
              <OrderSummary
                cart={cart}
                shippingFee={shippingFee}
                taxAmount={taxAmount}
                totalAmount={totalAmount}
                selectedShippingMethod={selectedShippingMethod}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;