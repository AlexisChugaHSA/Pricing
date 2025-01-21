'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Title, Text } from 'rizzui';
import cn from '../../utils/class-names';
import WishlistButton from '../wishlist-button';
import { generateSlug } from '../../utils/generate-slug';
import ColorSwatch from '../../utils/color-swatch';
import { Product } from '../../types';
import { toCurrency } from '../../utils/to-currency';

interface ProductProps {
  product: Product;
  className?: string;
  routes: any;
}

export default function ProductModernCard({
  product,
  className,
  routes,
}: ProductProps) {
  const {
    nombre,
    imagen,
    descripcion,
    precio,
  } = product;
  return (
    <div className={cn(className)}>
      <div className="relative">
        <div className="relative mx-auto aspect-[4/5.06] w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            alt={nombre}
            src={imagen}
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw"
            className="h-full w-full object-cover"
          />
        </div>
        <WishlistButton className="absolute end-3 top-3" />
      </div>

      <div className="pt-3">
        <Link
          href={routes.eCommerce.productDetails(
            String(nombre)
          )}
        >
          <Title
            as="h6"
            className="mb-1 truncate font-semibold transition-colors hover:text-primary"
          >
            {nombre}
          </Title>
        </Link>

        <Text as="p" className="truncate">
          {descripcion}
        </Text>
        <div className="mt-2 flex items-center font-semibold text-gray-900">
          {toCurrency(Number(precio))}
          {precio && (
            <del className="ps-1.5 text-[13px] font-normal text-gray-500">
              {toCurrency(Number(precio))}
            </del>
          )}
        </div>
      </div>
    </div>
  );
}
