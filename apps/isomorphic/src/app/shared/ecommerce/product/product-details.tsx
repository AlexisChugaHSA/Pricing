'use client';

import { useParams } from 'next/navigation';
import ProductDetailsRelatedProducts from '@/app/shared/ecommerce/product/product-details-related-products';
import ProductDetailsDescription from '@/app/shared/ecommerce/product/product-details-description';
import ProductDeliveryOptions from '@/app/shared/ecommerce/product/product-delivery-options';
import ProductDetailsGallery from '@/app/shared/ecommerce/product/product-details-gallery';
import ProductDetailsSummery from '@/app/shared/ecommerce/product/product-details-summery';
import ProductDetailsReview from '@/app/shared/ecommerce/product/product-details-review';
import { modernProductsGrid } from '@/data/shop-products';
import { generateSlug } from '@utils/generate-slug';
import { obtenerProductos, Producto } from '@/app/services/producto.service';
import { useEffect, useState } from 'react';

export default function ProductDetails() {
  const [products, setProducts] = useState<Producto[]>([]);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await obtenerProductos();
        setProducts(data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };
    loadProducts();
  }, []);
  const params = useParams();
  const product =
    products.find(
      (item) => generateSlug(item.nombre) === params.slug
    ) ?? products[0];

  return (
    <div className="@container">
      <div className="@3xl:grid @3xl:grid-cols-12">
        <div className="col-span-7 mb-7 @container @lg:mb-10 @3xl:pe-10">
          <ProductDetailsGallery />
        </div>
        <div className="col-span-5 @container">
          <ProductDetailsSummery product={product} />
          {/*<ProductDeliveryOptions />
          <ProductDetailsDescription />
          <ProductDetailsReview />*/}
        </div>
      </div>
      <ProductDetailsRelatedProducts />
    </div>
  );
}
