// src/components/product/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import { useCart } from '../../contexts/CartContext';
import SafeImage from '../ui/SafeImage';
import { productImageUrls } from '../../lib/siteImages';

const ProductCard = React.memo(({ product }) => {
  const { addToCart, isLoading: isAddingToCart } = useCart();

  if (!product) return null;

  const mainImage = product.images?.find((img) => img.isMain) || product.images?.[0];
  const productImgUrl =
    mainImage?.url || product.image || product.thumbnail || productImageUrls.fragrance1;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ productId: product._id, quantity: 1, variantId: null, productName: product.name });
  };

  return (
    <article
      className="group relative flex flex-col h-full bg-[#FAF9F7] border border-[#0D0D0D]/08 hover:border-[#0D0D0D]/20 transition-all duration-500"
      aria-label={`Product: ${product.name}`}
    >
      {/* Image area */}
      <Link to={`/product/${product.slug}`} className="block overflow-hidden relative" tabIndex={-1}>
        <div className="aspect-[3/4] overflow-hidden bg-[#F0EDE8]">
          <SafeImage
            src={productImgUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
          />
        </div>

        {/* Quick-add overlay — appears on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#0D0D0D] text-[#FAF9F7] text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-[#C9A96E] hover:text-[#0D0D0D] transition-colors duration-300 disabled:opacity-60"
            aria-label={`Add ${product.name} to cart`}
          >
            {isAddingToCart ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <ShoppingBag size={14} strokeWidth={1.5} />
            )}
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="pt-4 pb-5 px-1 flex flex-col gap-1 flex-grow">
        {product.category?.name && (
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A96E] font-medium">
            {product.category.name}
          </span>
        )}

        <Link
          to={`/product/${product.slug}`}
          className="font-['Cormorant_Garamond'] text-[18px] font-light leading-snug text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors"
        >
          {product.name}
        </Link>

        <div className="flex items-center justify-between mt-2">
          <span className="text-[13px] font-medium text-[#0D0D0D] tracking-wide">
            {formatPrice(product.price)}
          </span>

          {/* Mobile add-to-cart (always visible on touch) */}
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="lg:hidden flex items-center justify-center w-9 h-9 border border-[#0D0D0D]/15 text-[#0D0D0D]/60 hover:bg-[#0D0D0D] hover:text-[#FAF9F7] hover:border-[#0D0D0D] transition-all duration-200 disabled:opacity-50"
            aria-label={`Add ${product.name} to cart`}
          >
            {isAddingToCart ? <Loader2 size={14} className="animate-spin" /> : <ShoppingBag size={14} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
    </article>
  );
});

export default ProductCard;