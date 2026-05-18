import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, Heart, Settings, LogOut, MapPin, Shield, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// ── Utilities ────────────────────────────────────────────────────────────────

const formatPrice = (price) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(price);

// ── Design-system primitives ─────────────────────────────────────────────────

const Eyebrow = ({ children }) => (
  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium">
    {children}
  </span>
);

const Rule = ({ className = '' }) => (
  <div className={`w-10 h-px bg-[#C9A96E] ${className}`} />
);

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
  }),
};

// ── Data hook ────────────────────────────────────────────────────────────────

const useAccountData = () => {
  const { currentUser, loading, logout, updateUserDetails } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !currentUser) navigate('/login');
  }, [loading, currentUser, navigate]);

  const user = React.useMemo(() => {
    if (!currentUser?.user) return null;
    const { user: u } = currentUser;
    const address = u.address ? `${u.address.city}, ${u.address.country}` : 'Not specified';
    return {
      name:       u.fullName || `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Guest',
      email:      u.email,
      avatar:     u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.fullName || 'User')}&background=0D0D0D&color=FAF9F7`,
      joined:     new Date(u.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      location:   address,
      memberTier: (u.role === 'admin' || u.role === 'superadmin') ? 'Admin' : 'Member',
    };
  }, [currentUser]);

  const [orders] = useState([
    {
      id: 'ORD-2025-1234',
      date: 'July 15, 2025',
      status: 'Processing',
      total: 110000,
      items: [{ id: '1', name: 'Oud & Amber No. 3', qty: 1, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=200' }],
    },
    {
      id: 'ORD-2025-0891',
      date: 'June 02, 2025',
      status: 'Delivered',
      total: 58000,
      items: [{ id: '2', name: 'Midnight Jasmine Candle', qty: 2, image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=200' }],
    },
  ]);

  const [wishlist] = useState([
    { id: '3', name: 'Midnight Jasmine Candle', price: 28000, image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=400' },
  ]);

  return {
    user,
    orders,
    wishlist,
    loading: loading || !user,
    handleLogout: logout,
    handleUpdateProfile: updateUserDetails,
  };
};

// ── Nav config ───────────────────────────────────────────────────────────────

const navItems = [
  { id: 'profile',  label: 'Profile',    icon: User    },
  { id: 'orders',   label: 'My Orders',  icon: Package },
  { id: 'wishlist', label: 'Wishlist',   icon: Heart   },
  { id: 'settings', label: 'Settings',   icon: Settings},
];

// ── Sidebar ──────────────────────────────────────────────────────────────────

const AccountSidebar = React.memo(({ activeTab, setActiveTab, user, handleLogout }) => (
  <aside className="lg:sticky lg:top-[88px]">
    {/* Avatar block */}
    <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[#0D0D0D]/08">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-12 h-12 object-cover"
      />
      <div className="min-w-0">
        <p className="font-['Cormorant_Garamond'] text-[17px] font-light text-[#0D0D0D] truncate">{user.name}</p>
        <p className="text-[11px] tracking-[0.15em] uppercase text-[#C9A96E]">{user.memberTier}</p>
      </div>
    </div>

    {/* Nav */}
    <nav className="flex lg:flex-col gap-1">
      {navItems.map(({ id, label, icon: Icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`group flex items-center gap-3 w-full text-left px-3 py-3 transition-colors duration-200 border-l-2 ${
              active
                ? 'border-[#C9A96E] text-[#0D0D0D] bg-[#0D0D0D]/03'
                : 'border-transparent text-[#0D0D0D]/45 hover:text-[#0D0D0D] hover:bg-[#0D0D0D]/03'
            }`}
          >
            <Icon size={15} strokeWidth={1.5} className="shrink-0" />
            <span className="hidden lg:block text-[12px] tracking-[0.12em] uppercase font-medium">{label}</span>
          </button>
        );
      })}

      <div className="hidden lg:block h-px bg-[#0D0D0D]/08 my-2" />

      <button
        onClick={handleLogout}
        className="group flex items-center gap-3 w-full text-left px-3 py-3 transition-colors duration-200 border-l-2 border-transparent text-[#0D0D0D]/30 hover:text-red-500 hover:bg-red-50/60"
      >
        <LogOut size={15} strokeWidth={1.5} className="shrink-0" />
        <span className="hidden lg:block text-[12px] tracking-[0.12em] uppercase font-medium">Sign Out</span>
      </button>
    </nav>
  </aside>
));

// ── Profile tab ───────────────────────────────────────────────────────────────

const ProfileTab = React.memo(({ user, orders, wishlist, handleUpdateProfile }) => {
  const [formData, setFormData] = useState({ name: user.name, email: user.email });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => setFormData({ name: user.name, email: user.email }), [user]);

  const handleChange  = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit  = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try { await handleUpdateProfile({ fullName: formData.name, email: formData.email }); }
    catch (err) { console.error(err); }
    finally { setIsSubmitting(false); }
  };

  const stats = [
    { label: 'Total Orders',  value: orders.length,  icon: Package },
    { label: 'Wishlist Items',value: wishlist.length, icon: Heart   },
    { label: 'Member Tier',   value: user.memberTier, icon: Shield  },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-10">

      {/* User header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-[#0D0D0D]/08">
        <img src={user.avatar} alt={user.name} className="w-16 h-16 object-cover" />
        <div>
          <h2 className="font-['Cormorant_Garamond'] text-[28px] font-light text-[#0D0D0D] leading-tight">{user.name}</h2>
          <p className="text-[13px] text-[#0D0D0D]/45 font-light mt-0.5">{user.email}</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-[12px] text-[#0D0D0D]/35">
            <MapPin size={11} strokeWidth={1.5} />{user.location}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-0 border border-[#0D0D0D]/08">
        {stats.map(({ label, value, icon: Icon }, i) => (
          <div key={label} className={`flex flex-col gap-2 px-6 py-5 ${i < stats.length - 1 ? 'border-r border-[#0D0D0D]/08' : ''}`}>
            <Icon size={14} strokeWidth={1.5} className="text-[#C9A96E]" />
            <p className="font-['Cormorant_Garamond'] text-2xl font-light text-[#0D0D0D]">{value}</p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#0D0D0D]/35">{label}</p>
          </div>
        ))}
      </div>

      {/* Edit form */}
      <div>
        <div className="mb-6">
          <Eyebrow>Personal Information</Eyebrow>
          <Rule className="mt-4" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
          {[
            { id: 'name',  label: 'Full Name',      type: 'text'  },
            { id: 'email', label: 'Email Address',  type: 'email' },
          ].map(({ id, label, type }) => (
            <div key={id} className="flex flex-col gap-2">
              <label htmlFor={id} className="text-[10px] tracking-[0.2em] uppercase text-[#0D0D0D]/40">{label}</label>
              <input
                id={id} name={id} type={type}
                value={formData[id]}
                onChange={handleChange}
                className="bg-transparent border-b border-[#0D0D0D]/15 py-3 text-[14px] text-[#0D0D0D] font-light focus:outline-none focus:border-[#C9A96E] transition-colors"
              />
            </div>
          ))}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex items-center gap-2.5 bg-[#0D0D0D] text-[#FAF9F7] px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
});

// ── Orders tab ────────────────────────────────────────────────────────────────

const statusColors = {
  Delivered:  'text-emerald-700 bg-emerald-50 border-emerald-200',
  Processing: 'text-[#C9A96E] bg-[#C9A96E]/08 border-[#C9A96E]/25',
  Shipped:    'text-blue-700 bg-blue-50 border-blue-200',
};

const OrdersTab = React.memo(({ orders }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8">
    <div className="mb-6">
      <Eyebrow>Order History</Eyebrow>
      <Rule className="mt-4" />
    </div>

    {orders.length === 0 ? (
      <div className="py-16 text-center">
        <Package size={28} strokeWidth={1} className="text-[#0D0D0D]/20 mx-auto mb-4" />
        <p className="font-['Cormorant_Garamond'] text-xl font-light text-[#0D0D0D]">No orders yet</p>
        <p className="text-[13px] text-[#0D0D0D]/40 mt-1 font-light">Your order history will appear here.</p>
      </div>
    ) : (
      orders.map((order) => (
        <div key={order.id} className="border border-[#0D0D0D]/08 hover:border-[#0D0D0D]/18 transition-colors duration-300">
          {/* Order header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 px-6 py-4 border-b border-[#0D0D0D]/06">
            <div>
              <p className="text-[11px] tracking-[0.15em] uppercase text-[#0D0D0D]/35">{order.date}</p>
              <p className="font-['Cormorant_Garamond'] text-[18px] font-light text-[#0D0D0D] mt-0.5">{order.id}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-[10px] tracking-[0.15em] uppercase font-medium px-3 py-1.5 border ${statusColors[order.status] || 'text-[#0D0D0D]/50 bg-transparent border-[#0D0D0D]/15'}`}>
                {order.status}
              </span>
              <p className="font-['Cormorant_Garamond'] text-[20px] font-light text-[#0D0D0D]">{formatPrice(order.total)}</p>
            </div>
          </div>

          {/* Order items */}
          <div className="px-6 py-4 flex items-center gap-3">
            {order.items.map((item) => (
              <div key={item.id} className="w-12 h-12 overflow-hidden bg-[#F0EDE8] shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
            <div className="ml-2 flex-1 min-w-0">
              <p className="text-[13px] text-[#0D0D0D]/60 font-light truncate">
                {order.items.map((i) => i.name).join(', ')}
              </p>
            </div>
            <button className="group hidden sm:inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase font-medium text-[#0D0D0D]/35 hover:text-[#C9A96E] transition-colors border-b border-transparent hover:border-[#C9A96E]/40 pb-0.5 shrink-0">
              Details
              <ArrowUpRight size={12} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      ))
    )}
  </motion.div>
));

// ── Wishlist tab ──────────────────────────────────────────────────────────────

const WishlistTab = React.memo(({ wishlist }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8">
    <div className="mb-6">
      <Eyebrow>Saved Items</Eyebrow>
      <Rule className="mt-4" />
    </div>
    {wishlist.length === 0 ? (
      <div className="py-16 text-center">
        <Heart size={28} strokeWidth={1} className="text-[#0D0D0D]/20 mx-auto mb-4" />
        <p className="font-['Cormorant_Garamond'] text-xl font-light text-[#0D0D0D]">Your wishlist is empty</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {wishlist.map((item) => (
          <div key={item.id} className="group flex gap-4 border border-[#0D0D0D]/08 p-4 hover:border-[#0D0D0D]/18 transition-colors">
            <div className="w-20 h-24 bg-[#F0EDE8] overflow-hidden shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
            </div>
            <div className="flex flex-col justify-between py-1 min-w-0">
              <p className="font-['Cormorant_Garamond'] text-[17px] font-light text-[#0D0D0D] leading-snug truncate">{item.name}</p>
              <p className="text-[13px] font-medium text-[#0D0D0D]">{formatPrice(item.price)}</p>
              <button className="text-[10px] tracking-[0.15em] uppercase font-medium text-[#0D0D0D]/40 hover:text-[#C9A96E] transition-colors text-left border-b border-transparent hover:border-[#C9A96E]/40 pb-0.5 w-fit">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </motion.div>
));

// ── Settings tab ──────────────────────────────────────────────────────────────

const SettingsTab = React.memo(() => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
    <div className="mb-8">
      <Eyebrow>Preferences</Eyebrow>
      <Rule className="mt-4" />
    </div>
    <div className="border border-[#0D0D0D]/08 p-8 text-center">
      <Settings size={24} strokeWidth={1} className="text-[#0D0D0D]/20 mx-auto mb-4" />
      <p className="font-['Cormorant_Garamond'] text-xl font-light text-[#0D0D0D]">Settings coming soon</p>
      <p className="text-[13px] text-[#0D0D0D]/40 mt-1 font-light">Account preferences and notifications will appear here.</p>
    </div>
  </motion.div>
));

// ── Loading state ─────────────────────────────────────────────────────────────

const AccountLoader = () => (
  <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border border-[#C9A96E]/40 border-t-[#C9A96E] rounded-full animate-spin" />
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#0D0D0D]/35">Loading Account…</p>
    </div>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, orders, wishlist, loading, handleLogout, handleUpdateProfile } = useAccountData();

  if (loading) return <AccountLoader />;

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':  return <ProfileTab  user={user} orders={orders} wishlist={wishlist} handleUpdateProfile={handleUpdateProfile} />;
      case 'orders':   return <OrdersTab   orders={orders} />;
      case 'wishlist': return <WishlistTab wishlist={wishlist} />;
      case 'settings': return <SettingsTab />;
      default:         return null;
    }
  };

  return (
    <div className="bg-[#FAF9F7] min-h-screen">

      {/* Page header */}
      <div className="border-b border-[#0D0D0D]/08 px-8 lg:px-20 py-14 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-[1440px] mx-auto"
        >
          <Eyebrow>My Account</Eyebrow>
          <h1 className="font-['Cormorant_Garamond'] text-[clamp(36px,5vw,64px)] font-light text-[#0D0D0D] leading-tight mt-4">
            Welcome back,{' '}
            <em className="italic text-[#C9A96E] font-light">{user.name.split(' ')[0]}.</em>
          </h1>
        </motion.div>
      </div>

      {/* Body */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <AccountSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              user={user}
              handleLogout={handleLogout}
            />
          </motion.div>

          {/* Content panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
          >
            <div className="min-h-[480px]">
              <AnimatePresence mode="wait">
                <div key={activeTab}>{renderContent()}</div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AccountPage;