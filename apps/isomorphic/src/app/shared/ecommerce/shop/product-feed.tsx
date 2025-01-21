'use client';

import { useState } from 'react';
import { Button } from 'rizzui';
import ProductModernCard from '@components/cards/product-modern-card';
import { modernProductsGrid } from '@/data/shop-products';
import hasSearchedParams from '@utils/has-searched-params';
// Note: using shuffle to simulate the filter effect
import shuffle from 'lodash/shuffle';
import { routes } from '@/config/routes';
import React, { useEffect } from 'react';
import { obtenerProductos, Producto } from '@/app/services/producto.service';

let countPerPage = 12;

export default function ProductFeed() {
  const [products, setProducts] = useState<Producto[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(countPerPage);

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNextPage(nextPage + countPerPage);
    }, 600);
  }
    // Carga inicial de productos
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
  

  const filteredData = hasSearchedParams()
    ? shuffle(products)
    : products;

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
        {filteredData
          ?.slice(0, nextPage)
          ?.map((product, index) => (
            <ProductModernCard key={product.id_producto} product={product} routes={routes} />
          ))}
      </div>

      {nextPage < filteredData?.length && (
        <div className="mb-4 mt-5 flex flex-col items-center xs:pt-6 sm:pt-8">
          <Button isLoading={isLoading} onClick={() => handleLoadMore()}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
