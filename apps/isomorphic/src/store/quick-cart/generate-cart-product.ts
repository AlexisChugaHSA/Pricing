import { CartItem, Product, ProductColor } from '@/types';
import { generateSlug } from '@utils/generate-slug';

interface CartProduct extends Omit<Product, 'colors' | 'sizes'> {
  color: ProductColor;
  size: number;
}

export function generateCartProduct(product: CartProduct): CartItem {
  return {
    id: product?.id_producto,
    name: product?.nombre,
    slug: generateSlug(product?.nombre),
    description: product?.descripcion,
    image: product?.imagen,
    price: product?.precio,
    quantity: 1,
    size: product.size,
    color: product.color,
  };
}
