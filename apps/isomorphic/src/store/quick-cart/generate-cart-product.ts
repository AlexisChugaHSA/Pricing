import { Producto } from '@/app/services/producto.service';
import { CartItem, Product, ProductColor } from '@/types';
import { generateSlug } from '@utils/generate-slug';

interface CartProduct extends Omit<Product, 'colors' | 'sizes'> {
  color: ProductColor;
  size: number;
}

export function generateCartProduct(product: Producto): CartItem {
  return {
    id: product.id_producto,
    name: product.nombre,
    slug: generateSlug(product.nombre), // Generar slug
    description: product.descripcion || '', // Evitar undefined
    image: product.imagen,
    price: product.precio,
    quantity: 1, // Siempre inicia con cantidad 1 en el carrito
    size: 1, // Valor predeterminado para evitar el error
  };
}
