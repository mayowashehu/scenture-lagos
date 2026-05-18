import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  const linkColumns = [
    {
      title: 'Shop',
      links: [
        { to: '/shop?category=fragrances', label: 'Fragrances' },
        { to: '/shop?category=candles', label: 'Candles' },
        { to: '/shop?category=diffusers', label: 'Diffusers' },
        { to: '/shop?category=gift-sets', label: 'Gift Sets' },
      ],
    },
    {
      title: 'Company',
      links: [
        { to: '/about', label: 'About Us' },
        { to: '/contact', label: 'Contact' },
        { to: '/blog', label: 'Journal' },
        { to: '/faq', label: 'FAQs' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { to: '/privacy-policy', label: 'Privacy Policy' },
        { to: '/terms-of-service', label: 'Terms of Service' },
        { to: '/shipping-policy', label: 'Shipping' },
        { to: '/return-policy', label: 'Returns' },
      ],
    },
  ];

  return (
    <footer className="bg-[#0D0D0D] text-[#FAF9F7]">

      {/* Newsletter */}
      <div className="border-b border-[#FAF9F7]/08">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium">Stay in the circle</span>
              <h3 className="font-['Cormorant_Garamond'] text-[clamp(28px,3.5vw,48px)] font-light text-[#FAF9F7] leading-tight mt-4">
                The Scenture Letter —<br />
                <em className="italic text-[#FAF9F7]/40 font-light">arrivals &amp; stories.</em>
              </h3>
            </div>
            <div className="max-w-md">
              <p className="text-sm text-[#FAF9F7]/40 leading-relaxed font-light mb-6">
                First access to new releases, exclusive offers, and sensory stories from Lagos.
              </p>
              <div className="flex gap-0">
                <div className="relative flex-1">
                  <Mail size={14} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#FAF9F7]/30" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-transparent pl-6 pb-3 pt-1 text-[13px] text-[#FAF9F7] placeholder-[#FAF9F7]/25 border-b border-[#FAF9F7]/20 focus:outline-none focus:border-[#C9A96E] transition-colors"
                    aria-label="Email for newsletter"
                  />
                </div>
                <button
                  type="submit"
                  className="group flex items-center gap-2 ml-8 text-[11px] tracking-[0.18em] uppercase font-medium text-[#C9A96E] hover:text-[#FAF9F7] transition-colors pb-3 border-b border-[#C9A96E]/40 hover:border-[#FAF9F7]/40 shrink-0"
                >
                  Subscribe
                  <ArrowUpRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-12 lg:gap-8">

          {/* Brand */}
          <div>
            <Link to="/" className="font-['Cormorant_Garamond'] text-[20px] font-light tracking-[0.1em] text-[#FAF9F7]">
              SCENTURE <span className="italic text-[#C9A96E]">Lagos</span>
            </Link>
            <p className="mt-5 text-[13px] text-[#FAF9F7]/35 leading-relaxed font-light max-w-[260px]">
              Crafting olfactory journeys from the heart of Lagos. Where luxury meets lifestyle, and every scent tells a story.
            </p>
            <div className="mt-8 flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#FAF9F7]/30 hover:text-[#C9A96E] transition-colors duration-200"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {linkColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] tracking-[0.22em] uppercase text-[#FAF9F7]/35 font-medium mb-6">
                {col.title}
              </h4>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-[13px] font-light text-[#FAF9F7]/55 hover:text-[#FAF9F7] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#FAF9F7]/06">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#FAF9F7]/20 tracking-wide">
            © {currentYear} Scenture Lagos. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-[11px] text-[#FAF9F7]/20">Handcrafted in Lagos, Nigeria.</p>
            <Link to="/admin/login" className="text-[11px] text-[#FAF9F7]/15 hover:text-[#FAF9F7]/40 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}