import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button, Title } from 'rizzui';
import ProductModernCard from '@components/cards/product-modern-card';
import { similarProducts } from '@/data/similar-products-data';
import { obtenerProductos, Producto } from '@/app/services/producto.service';
import { useEffect, useState } from 'react';

export default function ProductDetailsRelatedProducts({
  product,
}: {
  product: Producto;
}) {
  const [products, setProducts] = useState<Producto[]>([]);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await obtenerProductos();
        const filteredProducts = product
          ? data.filter((p) => p.id_producto !== product.id_producto)
          : data;
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };
    loadProducts();
  }, [product]);
  if(products && products.length > 0){
  return (
    <section className="pt-10 @5xl:pt-12 @7xl:pt-14">
      <header className="mb-4 flex items-center justify-between">
        <Title as="h3" className="font-semibold">
          Productos Similares
        </Title>
        <Link href={routes.eCommerce.shop}>
          <Button as="span" variant="text" className="py-0 underline">
            Ver Todos
          </Button>
        </Link>
      </header>
      <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-2 @xl:grid-cols-3 @xl:gap-y-9 @5xl:grid-cols-4 @5xl:gap-x-7 @7xl:grid-cols-5">
        {products.map((product) => (
          <ProductModernCard key={product.id_producto} product={product} routes={routes} />
        ))}
      </div>
    </section>
  );}
}
