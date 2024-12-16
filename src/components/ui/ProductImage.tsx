import React from 'react';
import { ImageIcon } from 'lucide-react';

interface ProductImageProps {
  url?: string;
  data?: string;
  alt: string;
}

export function ProductImage({ url, data, alt }: ProductImageProps) {
  const imageSource = data || url;

  if (!imageSource) {
    return (
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg">
        <ImageIcon size={48} className="text-gray-400" />
      </div>
    );
  }

  return (
    <img
      src={imageSource}
      alt={alt}
      className="w-full h-48 object-cover rounded-lg"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
      }}
    />
  );
}