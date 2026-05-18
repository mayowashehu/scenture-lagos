import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowUpRight, Plus, Minus, AlertTriangle } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { useCart } from '../contexts/CartContext';

// ── Design-system primitives ────────────────────────────────────────────────

const Eyebrow = ({ children }) => (
  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium">{children}</span>
);

// ── Cart item ─────────────────────────────────────────────────────────────────

const CartItem = React.memo(({ item, onUpdate, onRemove }) => {
  const isStockMaxed = item.quantity >= item.availableStock;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex gap-5 py-7 border-b border-[#0D0D0D]/08 last:border-0"
    >
      {/* Image */}
      <Link to={`/product/${item.productSlug}`} className="shrink-0 w-24 h-28 overflow-hidden bg-[#F0EDE8] block">
        <img
          src={item.productImage || 'https://via.placeholder.com/150?text=Scenture'}
          alt={item.productName}
          className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
          loading="lazy"
        />
      </Link>

      {/* Details */}
      <div className="flex-grow flex flex-col justify-between py-0.5 min-w-0">
        <div className="flex justify-between items-start gap-4">
          <div className="min-w-0">
            {item.category && (
              <p className="text-[10px] tracking-[0.18em] uppercase text-[#C9A96E] mb-1">{item.category}</p>
            )}
            <Link
              to={`/product/${item.productSlug}`}
              className="font-['Cormorant_Garamond'] text-[18px] font-light text-[#0D0D0D] leading-snug hover:text-[#0D0D0D]/60 transition-colors block truncate"
            >
              {item.productName}
            </Link>
          </div>

          <div className="text-right shrink-0">
            <p className={`font-['Cormorant_Garamond'] text-[20px] font-light text-[#0D0D0D] ${item.hasPriceChanged ? 'text-amber-600' : ''}`}>
              {formatPrice(item.price)}
            </p>
            {item.hasPriceChanged && (
              <p className="text-[11px] text-[#0D0D0D]/35 line-through">{formatPrice(item.oldPrice)}</p>
            )}
          </div>
        </div>

        {/* Alerts */}
        {item.hasPriceChanged && (
          <div className="flex items-center gap-2 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 mt-2">
            <AlertTriangle size={12} strokeWidth={1.5} />
            Price updated since you last viewed this item.
          </div>
        )}
        {item.quantity > item.availableStock && (
          <div className="flex items-center gap-2 text-[11px] text-red-600 bg-red-50 border border-red-200 px-3 py-2 mt-2">
            <AlertTriangle size={12} strokeWidth={1.5} />
            Adjusted to available stock.
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between mt-4">
          {/* Qty stepper */}
          <div className="flex items-center border border-[#0D0D0D]/12 gap-0">
            <button
              onClick={() => onUpdate({ itemId: item._id, quantity: item.quantity - 1 })}
              disabled={item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-[#0D0D0D]/40 hover:text-[#0D0D0D] hover:bg-[#0D0D0D]/04 disabled:text-[#0D0D0D]/15 disabled:cursor-not-allowed transition-colors"
            >
              <Minus size={13} strokeWidth={1.5} />
            </button>
            <span className="w-8 text-center text-[13px] font-medium text-[#0D0D0D]">{item.quantity}</span>
            <button
              onClick={() => onUpdate({ itemId: item._id, quantity: item.quantity + 1 })}
              disabled={isStockMaxed}
              className="w-8 h-8 flex items-center justify-center text-[#0D0D0D]/40 hover:text-[#0D0D0D] hover:bg-[#0D0D0D]/04 disabled:text-[#0D0D0D]/15 disabled:cursor-not-allowed transition-colors"
            >
              <Plus size={13} strokeWidth={1.5} />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => onRemove(item._id)}
            className="text-[#0D0D0D]/25 hover:text-red-500 transition-colors"
            title="Remove item"
          >
            <Trash2 size={15} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

// ── Order summary ─────────────────────────────────────────────────────────────

const OrderSummary = React.memo(({ cart }) => (
  <div className="border border-[#0D0D0D]/08 lg:sticky lg:top-[88px]">
    {/* Header */}
    <div className="px-7 py-5 border-b border-[#0D0D0D]/08">
      <Eyebrow>Order Summary</Eyebrow>
    </div>

    {/* Lines */}
    <div className="px-7 py-6 space-y-3.5">
      <div className="flex justify-between items-center">
        <span className="text-[13px] text-[#0D0D0D]/50 font-light">Subtotal</span>
        <span className="text-[14px] font-medium text-[#0D0D0D]">{formatPrice(cart.subtotal)}</span>
      </div>
      {cart.discount > 0 && (
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-[#0D0D0D]/50 font-light">Discount {cart.coupon?.code && `(${cart.coupon.code})`}</span>
          <span className="text-[14px] font-medium text-emerald-600">−{formatPrice(cart.discount)}</span>
        </div>
      )}
      <div className="flex justify-between items-center">
        <span className="text-[13px] text-[#0D0D0D]/50 font-light">Shipping</span>
        <span className="text-[12px] text-[#0D0D0D]/35 font-light italic">Calculated at checkout</span>
      </div>
    </div>

    {/* Total */}
    <div className="px-7 py-5 border-t border-[#0D0D0D]/08 flex justify-between items-baseline">
      <span className="text-[12px] tracking-[0.12em] uppercase font-medium text-[#0D0D0D]">Estimated Total</span>
      <span className="font-['Cormorant_Garamond'] text-[28px] font-light text-[#0D0D0D]">{formatPrice(cart.total)}</span>
    </div>

    {/* CTA */}
    <div className="px-7 pb-7">
      <Link
        to="/checkout"
        className="group flex items-center justify-center gap-2.5 w-full bg-[#0D0D0D] text-[#FAF9F7] py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300"
      >
        Proceed to Checkout
        <ArrowUpRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>

      <Link
        to="/shop"
        className="mt-3 block text-center text-[11px] tracking-[0.15em] uppercase font-medium text-[#0D0D0D]/35 hover:text-[#0D0D0D] transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  </div>
));

// ── Empty cart ────────────────────────────────────────────────────────────────

const EmptyCart = () => (
  <div className="min-h-[70vh] flex items-center justify-center px-8">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="text-center max-w-sm"
    >
      <ShoppingBag size={36} strokeWidth={1} className="text-[#0D0D0D]/15 mx-auto mb-6" />
      <h2 className="font-['Cormorant_Garamond'] text-[32px] font-light text-[#0D0D0D] leading-tight">
        Your cart is empty
      </h2>
      <p className="text-[13px] text-[#0D0D0D]/45 font-light leading-relaxed mt-3 mb-8">
        You haven't added anything yet. Explore our collections to find something you'll love.
      </p>
      <Link
        to="/shop"
        className="group inline-flex items-center gap-2.5 bg-[#0D0D0D] text-[#FAF9F7] px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300"
      >
        Explore Collection
        <ArrowUpRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.div>
  </div>
);

// ── Skeleton loader ───────────────────────────────────────────────────────────

const CartLoader = () => (
  <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-16 animate-pulse">
    <div className="h-8 w-1/4 bg-[#0D0D0D]/06 mb-14" />
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-12">
      <div className="space-y-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-5 py-7 border-b border-[#0D0D0D]/06">
            <div className="w-24 h-28 bg-[#0D0D0D]/06 shrink-0" />
            <div className="flex-1 space-y-4 py-1">
              <div className="h-3 w-1/4 bg-[#0D0D0D]/06 rounded" />
              <div className="h-5 w-3/5 bg-[#0D0D0D]/06 rounded" />
              <div className="h-8 w-24 bg-[#0D0D0D]/06 mt-4" />
            </div>
          </div>
        ))}
      </div>
      <div className="h-72 bg-[#0D0D0D]/04 border border-[#0D0D0D]/06" />
    </div>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

const CartPage = () => {
  const { cart, isLoading, updateCartItem, removeFromCart } = useCart();

  if (isLoading) return <div className="bg-[#FAF9F7] min-h-screen"><CartLoader /></div>;
  if (!cart?.items?.length) return <div className="bg-[#FAF9F7] min-h-screen"><EmptyCart /></div>;

  const handleUpdate = ({ itemId, quantity }) => {
    if (quantity < 1) { removeFromCart(itemId); return; }
    updateCartItem({ itemId, quantity });
  };

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
          <Eyebrow>Shopping Cart</Eyebrow>
          <h1 className="font-['Cormorant_Garamond'] text-[clamp(36px,5vw,64px)] font-light text-[#0D0D0D] leading-tight mt-4">
            Your Selection
          </h1>
          <p className="text-[13px] text-[#0D0D0D]/40 font-light mt-2">
            {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>
      </div>

      {/* Body */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-12 lg:py-16">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">

          {/* Items list */}
          <div>
            <AnimatePresence>
              {cart.items.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onUpdate={handleUpdate}
                  onRemove={removeFromCart}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            <OrderSummary cart={cart} />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;