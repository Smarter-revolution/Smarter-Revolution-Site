import Image from 'next/image';
import { StrapiImage as StrapiImageType } from '@/types/strapi';

interface StrapiImageProps {
  image: StrapiImageType;
  size?: 'thumbnail' | 'small' | 'medium' | 'large' | 'original';
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function StrapiImage({
  image,
  size = 'original',
  className,
  priority = false,
  fill = false,
  width,
  height,
}: StrapiImageProps) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

  // Get the appropriate image URL based on size
  let imageUrl = image.url;
  let imageWidth = image.width;
  let imageHeight = image.height;

  if (size !== 'original' && image.formats?.[size]) {
    const format = image.formats[size]!;
    imageUrl = format.url;
    imageWidth = format.width;
    imageHeight = format.height;
  }

  // Strapi Cloud serves images from CDN, local Strapi needs base URL
  const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${STRAPI_URL}${imageUrl}`;

  if (fill) {
    return (
      <Image
        src={fullUrl}
        alt={image.alternativeText || ''}
        fill
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={fullUrl}
      alt={image.alternativeText || ''}
      width={width || imageWidth}
      height={height || imageHeight}
      className={className}
      priority={priority}
    />
  );
}
