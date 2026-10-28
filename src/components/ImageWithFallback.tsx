import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Editorial imagery',
  className = '',
  containerClassName = '',
  fallbackTitle = 'Atelier Noir',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#ECE8E1] ${containerClassName}`}>
      {/* Editorial fallback placeholder container */}
      {(!src || hasError) ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F5F2EC] via-[#ECE8E1] to-[#E2DDD5]">
          <div className="w-12 h-12 mb-3 rounded-full border border-[#D5CFC5] flex items-center justify-center text-[#7E7569]">
            <svg
              className="w-6 h-6 stroke-current"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
            </svg>
          </div>
          <span className="font-serif italic text-sm text-[#7E7569] tracking-wider mb-1">
            {fallbackTitle}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#9A9184]">
            Archive Monograph
          </span>
        </div>
      ) : (
        <>
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            {...props}
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-[#ECE8E1] animate-pulse" />
          )}
        </>
      )}
    </div>
  );
};
