import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Minus, Plus, Truck, Shield, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

import ProductCard from '../components/product/ProductCard';
import SafeImage from '../components/ui/SafeImage';
import { formatPrice } from '../lib/utils';
import { useCart } from '../contexts/CartContext';
import ProductService from '../services/product.service';
import { productImageUrls } from '../lib/siteImages';

const useProductDetail = (slug) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => ProductService.getProduct(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });

  return {
    product: data?.product,
    relatedProducts: data?.relatedProducts || [],
    isLoading,
    isError,
    error,
  };
};

const ProductImageGallery = React.memo(({ images = [], productName }) => {
  const [activeImage, setActiveImage] = useState(0);
  const list = images.length > 0 ? images : [{ url: productImageUrls.fragrance1, alt: productName }];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] bg-[#F0EDE8] overflow-hidden border border-[#0D0D0D]/08">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <SafeImage
              src={list[activeImage]?.url}
              alt={list[activeImage]?.alt || productName}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {list.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {list.map((image, index) => (
            <button
              key={image.public_id || index}
              type="button"
              onClick={() => setActiveImage(index)}
              className={`aspect-square overflow-hidden border transition-all duration-200 ${
                activeImage === index
                  ? 'border-[#C9A96E] ring-1 ring-[#C9A96E]/40'
                  : 'border-[#0D0D0D]/10 hover:border-[#0D0D0D]/30'
              }`}
            >
              <SafeImage
                src={image.url}
                alt={image.alt || `${productName} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

const ProductInfoPanel = React.memo(({ product }) => {
  const { addToCart, isLoading: isAddingToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const defaultVariant = useMemo(
    () => product.variants?.find((v) => v.isDefault) || product.variants?.[0],
    [product.variants]
  );
  const [selectedVariantId, setSelectedVariantId] = useState(defaultVariant?._id || null);

  const selectedVariant = useMemo(
    () => product.variants?.find((v) => v._id === selectedVariantId),
    [product.variants, selectedVariantId]
  );

  const currentPrice = useMemo(() => {
    const basePrice = product.price || 0;
    const adjustment = selectedVariant?.priceAdjustment || 0;
    return basePrice + adjustment;
  }, [product.price, selectedVariant]);

  const currentStock = selectedVariant ? selectedVariant.stockQuantity : product.stockQuantity;
  const isInStock = currentStock > 0;

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0 && newQuantity <= currentStock) setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      quantity,
      variantId: selectedVariantId,
      productName: product.name,
    });
  };

  return (
    <div className="space-y-8 lg:py-4">
      <div className="space-y-4">
        {product.category?.name && (
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#C9A96E] font-medium">
            {product.category.name}
          </span>
        )}
        <h1 className="font-['Cormorant_Garamond'] text-[clamp(32px,4vw,48px)] font-light text-[#0D0D0D] leading-tight">
          {product.name}
        </h1>
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-2xl font-light text-[#0D0D0D] tracking-wide">{formatPrice(currentPrice)}</p>
          <span
            className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1 border ${
              isInStock
                ? 'border-[#C9A96E]/40 text-[#0D0D0D]/70 bg-[#C9A96E]/08'
                : 'border-red-200 text-red-700 bg-red-50'
            }`}
          >
            {isInStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      {product.variants && product.variants.length > 0 && (
        <div className="space-y-3">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#0D0D0D]/45 font-medium">
            Size — <span className="text-[#0D0D0D] font-normal normal-case tracking-normal">{selectedVariant?.size}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant._id}
                type="button"
                onClick={() => setSelectedVariantId(variant._id)}
                disabled={variant.stockQuantity === 0}
                className={`px-4 py-2 text-[11px] tracking-[0.12em] uppercase border transition-all duration-200 ${
                  selectedVariantId === variant._id
                    ? 'bg-[#0D0D0D] text-[#FAF9F7] border-[#0D0D0D]'
                    : 'bg-transparent text-[#0D0D0D]/60 border-[#0D0D0D]/15 hover:border-[#0D0D0D]/40 disabled:opacity-40'
                }`}
              >
                {variant.size}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.description && (
        <p className="text-[15px] text-[#0D0D0D]/55 font-light leading-relaxed max-w-lg">{product.description}</p>
      )}

      <div className="space-y-5 pt-6 border-t border-[#0D0D0D]/08">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex items-center border border-[#0D0D0D]/15">
            <button
              type="button"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-3 text-[#0D0D0D]/50 hover:text-[#0D0D0D] disabled:opacity-30 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="w-12 text-center text-sm font-medium text-[#0D0D0D]">{quantity}</span>
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= currentStock}
              className="p-3 text-[#0D0D0D]/50 hover:text-[#0D0D0D] disabled:opacity-30 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isInStock || isAddingToCart}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0D0D0D] text-[#FAF9F7] px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-all duration-300 disabled:opacity-40"
          >
            {isAddingToCart ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ShoppingBag size={18} strokeWidth={1.5} />
            )}
            {isInStock ? `Add to Cart — ${formatPrice(currentPrice * quantity)}` : 'Out of Stock'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[12px] text-[#0D0D0D]/45 font-light">
          <div className="flex items-center gap-2">
            <Truck size={14} className="text-[#C9A96E] shrink-0" />
            Complimentary shipping over ₦50,000
          </div>
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-[#C9A96E] shrink-0" />
            Authentic Scenture Lagos product
          </div>
        </div>
      </div>
    </div>
  );
});

const ProductPageSkeleton = () => (
  <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 py-12 lg:py-16 animate-pulse">
    <div className="h-4 w-32 bg-[#0D0D0D]/08 mb-10" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      <div className="aspect-[4/5] bg-[#0D0D0D]/06" />
      <div className="space-y-6">
        <div className="h-10 w-3/4 bg-[#0D0D0D]/06" />
        <div className="h-8 w-1/3 bg-[#0D0D0D]/06" />
        <div className="h-24 w-full bg-[#0D0D0D]/06" />
        <div className="h-14 w-full bg-[#0D0D0D]/06" />
      </div>
    </div>
  </div>
);

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { product, relatedProducts, isLoading, isError, error } = useProductDetail(slug);

  if (isLoading) return <ProductPageSkeleton />;

  if (isError || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FAF9F7] px-6">
        <div className="text-center space-y-5 max-w-md">
          <ShoppingBag size={36} className="mx-auto text-[#0D0D0D]/25" strokeWidth={1.5} />
          <h2 className="font-['Cormorant_Garamond'] text-3xl font-light text-[#0D0D0D]">Product Not Found</h2>
          <p className="text-sm text-[#0D0D0D]/50 font-light">
            {error?.message || "The product you're looking for might have been moved or doesn't exist."}
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#0D0D0D] text-[#FAF9F7] px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F7]">
      <Helmet>
        <title>{`${product.name} | Scenture Lagos`}</title>
        <meta name="description" content={product.description?.substring(0, 160)} />
      </Helmet>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 py-10 lg:py-16">
        <Link
          to="/shop"
          className="inline-flex items-center text-[11px] tracking-[0.15em] uppercase font-medium text-[#0D0D0D]/50 hover:text-[#0D0D0D] transition-colors group mb-10"
        >
          <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          <ProductImageGallery images={product.images} productName={product.name} />
          <ProductInfoPanel product={product} />
        </div>

        {relatedProducts.length > 0 && (
          <section className="border-t border-[#0D0D0D]/08 pt-16">
            <div className="mb-10">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] font-medium">You May Also Like</span>
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(28px,3vw,40px)] font-light text-[#0D0D0D] mt-3">
                Complementary scents
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
