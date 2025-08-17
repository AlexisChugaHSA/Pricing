'use client';

import { useState, useEffect } from 'react';
import { Button } from 'rizzui';
import ProductModernCard from '@components/cards/product-modern-card';
import { routes } from '@/config/routes';
import shuffle from 'lodash/shuffle';
import hasSearchedParams from '@utils/has-searched-params';
import { obtenerProductos, Producto } from '@/app/services/producto.service';
import { obtenerProductoUsuarioById, ProductoUsuario } from '@/app/services/producto_usuario';

let countPerPage = 12;

export default function ProductFeed() {
  const [products, setProducts] = useState<Producto[]>([]);
  const [productsUser, setProductsUser] = useState<ProductoUsuario[]>([]);
  const [productosUsuario, setProductosUsuario] = useState<Producto[]>([]);
  const [otrosProductos, setOtrosProductos] = useState<Producto[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(countPerPage);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNextPage(nextPage + countPerPage);
    }, 600);
  }

  // Cargar usuario desde localStorage
  useEffect(() => {
    const usuarioString = localStorage.getItem('usuario');
    const tokenLS = localStorage.getItem('token');
    if (usuarioString) {
      try {
        const usuario: any = JSON.parse(usuarioString);
        setUserId(usuario.id_usuario);
      } catch (err) {
        console.error('Error parseando usuario:', err);
      }
    }
    if (tokenLS) {
      setToken(tokenLS);
    }
  }, []);

  // Cargar todos los productos
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

  // Cargar productos del usuario
  useEffect(() => {
    if (userId && token) {
      const loadProductsUser = async () => {
        try {
          console.log(userId)
          const data = await obtenerProductoUsuarioById(userId, token);
          setProductsUser(data);
        } catch (error) {
          console.error('Error al cargar los productos del usuario:', error);
        }
      };
      loadProductsUser();
    }
  }, [userId, token]);

  // Separar productosUsuario y otrosProductos
  useEffect(() => {
    if (products.length > 0 && productsUser.length > 0) {
      const idsUsuario = productsUser.map((pu) => pu.id_producto);

      const productosDelUsuario = products.filter((p) =>
        idsUsuario.includes(p.id_producto)
      );

      const productosRestantes = products.filter(
        (p) => !idsUsuario.includes(p.id_producto)
      );

      setProductosUsuario(productosDelUsuario);
      setOtrosProductos(productosRestantes);

      console.log('Productos del usuario:', productosDelUsuario);
      console.log('Otros productos:', productosRestantes);
    }
  }, [products, productsUser]);

  const filteredData = hasSearchedParams()
    ? shuffle(productosUsuario.concat(otrosProductos)) // si quieres mezclar
    : productosUsuario.concat(otrosProductos);

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
        {filteredData
          ?.slice(0, nextPage)
          ?.map((product) => (
            <ProductModernCard
              key={product.id_producto}
              product={product}
              routes={routes}
            />
          ))}
      </div>

      {nextPage < filteredData?.length && (
        <div className="mb-4 mt-5 flex flex-col items-center xs:pt-6 sm:pt-8">
          <Button isLoading={isLoading} onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
