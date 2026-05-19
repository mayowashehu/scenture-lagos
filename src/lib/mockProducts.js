import { productImageUrls } from './siteImages';

const img = (url, alt) => ({ url, alt, isMain: true, public_id: url });

const categories = [
  { _id: 'cat-fragrances', slug: 'fragrances', name: 'Fragrances' },
  { _id: 'cat-candles', slug: 'candles', name: 'Candles' },
  { _id: 'cat-diffusers', slug: 'diffusers', name: 'Diffusers' },
  { _id: 'cat-gift-sets', slug: 'gift-sets', name: 'Gift Sets' },
];

const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

export const mockProductsCatalog = [
  {
    _id: 'mock-1',
    slug: 'amber-elegance',
    name: 'Amber Elegance',
    description:
      'A warm amber accord layered with vanilla and soft woods — intimate, luminous, and unmistakably luxurious.',
    price: 18500,
    stockQuantity: 24,
    featured: true,
    category: categoryBySlug.fragrances,
    images: [img(productImageUrls.fragrance1, 'Amber Elegance perfume')],
    variants: [
      { _id: 'v1-50', size: '50ml', priceAdjustment: 0, stockQuantity: 12, isDefault: true },
      { _id: 'v1-100', size: '100ml', priceAdjustment: 8000, stockQuantity: 12, isDefault: false },
    ],
  },
  {
    _id: 'mock-2',
    slug: 'velvet-oud',
    name: 'Velvet Oud',
    description: 'Deep oud resin meets rose and saffron for a bold evening signature.',
    price: 22000,
    stockQuantity: 18,
    featured: true,
    category: categoryBySlug.fragrances,
    images: [img(productImageUrls.fragrance2, 'Velvet Oud perfume')],
    variants: [{ _id: 'v2-50', size: '50ml', priceAdjustment: 0, stockQuantity: 18, isDefault: true }],
  },
  {
    _id: 'mock-3',
    slug: 'midnight-jasmine',
    name: 'Midnight Jasmine',
    description: 'Hand-poured soy candle with night-blooming jasmine and white musk.',
    price: 12500,
    stockQuantity: 30,
    featured: true,
    category: categoryBySlug.candles,
    images: [img(productImageUrls.candle1, 'Midnight Jasmine candle')],
    variants: [],
  },
  {
    _id: 'mock-4',
    slug: 'citrus-breeze-diffuser',
    name: 'Citrus Breeze Diffuser',
    description: 'Bright bergamot and neroli reed diffuser — up to 90 days of steady release.',
    price: 14000,
    stockQuantity: 22,
    featured: false,
    category: categoryBySlug.diffusers,
    images: [img(productImageUrls.diffuser1, 'Citrus Breeze diffuser')],
    variants: [],
  },
  {
    _id: 'mock-5',
    slug: 'sandalwood-serenity',
    name: 'Sandalwood Serenity',
    description: 'Creamy sandalwood and cedar candle crafted for calm, unhurried evenings.',
    price: 16500,
    stockQuantity: 20,
    featured: false,
    category: categoryBySlug.candles,
    images: [img(productImageUrls.diffuser2, 'Sandalwood Serenity candle')],
    variants: [],
  },
  {
    _id: 'mock-6',
    slug: 'rose-garden-diffuser',
    name: 'Rose Garden Diffuser',
    description: 'Damask rose and peony in a sculptural glass vessel for living spaces.',
    price: 13500,
    stockQuantity: 16,
    featured: false,
    category: categoryBySlug.diffusers,
    images: [img(productImageUrls.diffuser1, 'Rose Garden diffuser')],
    variants: [],
  },
  {
    _id: 'mock-7',
    slug: 'vanilla-dreams',
    name: 'Vanilla Dreams',
    description: 'Madagascar vanilla, tonka, and amber in a slow-burn luxury candle.',
    price: 11000,
    stockQuantity: 35,
    featured: false,
    category: categoryBySlug.candles,
    images: [img(productImageUrls.candle1, 'Vanilla Dreams candle')],
    variants: [],
  },
  {
    _id: 'mock-8',
    slug: 'luxury-collection-set',
    name: 'Luxury Collection Set',
    description: 'Curated trio: 50ml signature scent, reed diffuser, and votive candle in gift packaging.',
    price: 45000,
    stockQuantity: 10,
    featured: true,
    category: categoryBySlug['gift-sets'],
    images: [img(productImageUrls.giftSet, 'Luxury Collection gift set')],
    variants: [],
  },
];

export const mockCategories = categories.map(({ _id, slug, name }) => ({ _id, slug, name }));

const sortProducts = (list, sort) => {
  const copy = [...list];
  switch (sort) {
    case 'price-asc':
    case 'price-low-high':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
    case 'price-high-low':
      return copy.sort((a, b) => b.price - a.price);
    case 'featured':
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
  return copy;
};

export function filterMockProducts(params = {}) {
  const { category, sort = 'newest', page = 1, limit = 12, search } = params;
  let list = [...mockProductsCatalog];

  if (category && category !== 'all') {
    list = list.filter((p) => p.category?.slug === category);
  }

  if (search?.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.name?.toLowerCase().includes(q)
    );
  }

  list = sortProducts(list, sort);
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * limit;
  const data = list.slice(start, start + limit);

  return {
    data,
    pagination: { total, totalPages, page: safePage, limit },
  };
}

export function getMockProductBySlug(slug) {
  const product = mockProductsCatalog.find((p) => p.slug === slug);
  if (!product) return null;

  const relatedProducts = mockProductsCatalog
    .filter((p) => p._id !== product._id && p.category?.slug === product.category?.slug)
    .slice(0, 4);

  return { product, relatedProducts };
}

export function getMockFeaturedProducts(limit = 4) {
  return mockProductsCatalog.filter((p) => p.featured).slice(0, limit);
}
