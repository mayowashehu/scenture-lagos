import React, { useState, useEffect } from 'react';
import { siteImages } from '../../lib/siteImages';

const FALLBACK = siteImages.hero;

/**
 * Image with referrer-friendly loading and fallback when CDN fails.
 */
export default function SafeImage({ src, alt, className = '', fallbackSrc = FALLBACK, ...props }) {
  const resolved = src || fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(resolved);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(resolved);
    setFailed(false);
  }, [resolved]);

  const handleError = () => {
    if (!failed && currentSrc !== fallbackSrc) {
      setFailed(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={currentSrc || fallbackSrc}
      alt={alt || ''}
      className={className}
      loading={props.loading ?? 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={handleError}
      {...props}
    />
  );
}
