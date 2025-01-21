import Link from 'next/link';
import Image from 'next/image';
import WishlistButton from '../wishlist-button';
import { generateSlug } from '../../utils/generate-slug';
import { Title, Text } from 'rizzui';
import { Product } from '../../types';
import { toCurrency } from '../../utils/to-currency';

interface ProductProps {
  product: Product;
  className?: string;
  routes: any;
}

export default function ProductMinimalCard({
  product,
  className,
  routes,
}: ProductProps) {
  const {
    slug,
    nombre,
    imagen,
    descripcion,
    precio,
  } = product;

  return (
    <div className={className}>
      <div className="relative">
        <div className="relative mx-auto aspect-[4/5.06] w-full bg-gray-100">
          <Image
            alt={nombre}
            src={imagen}
            fill
            priority
            quality={90}
            placeholder="blur"
            sizes="(max-width: 768px) 100vw"
            blurDataURL={`/_next/image?url=${imagen}&w=10&q=1`}
            className="h-full w-full object-cover"
          />
        </div>
        <WishlistButton className="absolute end-3 top-3" />
      </div>

      <div className="pt-3.5">
        <div className="pb-1 font-medium text-red-dark">Just In</div>
        <Link
          href={routes.eCommerce.productDetails(
            String(slug ?? generateSlug(nombre))
          )}
        >
          <Title
            as="h6"
            className="mb-0.5 truncate font-semibold transition-colors hover:text-primary"
          >
            {nombre}
          </Title>
        </Link>
        <Text as="p" className="mb-1 truncate">
          {descripcion}
        </Text>



        <div className="mt-3.5 flex items-center font-semibold text-gray-900">
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
