'use client';

import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import isEmpty from 'lodash/isEmpty';
import { PiShoppingCartSimple } from 'react-icons/pi';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Product } from '@/types';
import { Button, Title, Text } from 'rizzui';
import { toCurrency } from '@utils/to-currency';
import GetSize from '@/app/shared/ecommerce/product/get-size';
import { calculatePercentage } from '@utils/calculate-percentage';
import { GetColor } from '@/app/shared/ecommerce/product/get-color';
import WishlistButton from '@/app/shared/ecommerce/product/wishlist-button';
import { useCart } from '@/store/quick-cart/cart.context';
import {
  ProductDetailsInput,
  productDetailsSchema,
} from '@/validators/product-details.schema';
import { generateCartProduct } from '@/store/quick-cart/generate-cart-product';
import { Producto } from '@/app/services/producto.service';

export default function ProductDetailsSummery({
  product,
}: {
  product: Producto;
}) {
  const clicked = useRef(false);
  const { addItemToCart, isInCart   } = useCart();
  const [isLoading, setLoading] = useState(false);
  const isProductInCart = isInCart(product.id_producto);

  const methods = useForm<ProductDetailsInput>({
    mode: 'onBlur',
    defaultValues: product,
    resolver: zodResolver(productDetailsSchema),
  });


  const onSubmit: SubmitHandler<ProductDetailsInput> = async (data) => {
    if (isProductInCart) return;  
    clicked.current = true;
    const item = generateCartProduct({
      ...product
    });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('createOrder data ->', data);
      addItemToCart(item, 1);
      toast.success(<Text as="b">El producto se ha agregado al carrito</Text>);
      clicked.current = false;
    }, 600);

  };

if(product){
  return (
    <>
      <div className="border-b border-muted pb-6 @lg:pb-8">
        <Title as="h2" className="mb-2.5 font-bold @6xl:text-4xl">
          {product?.nombre}
        </Title>
        <Text as="p" className="text-base">
          {product?.descripcion}
        </Text>
      </div>

      <FormProvider {...methods}>
        <form className="pb-8 pt-5" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="mb-1.5 mt-2 flex items-end font-lexend text-base">
            <div className="-mb-0.5 text-2xl font-semibold text-gray-900 lg:text-3xl">
              {toCurrency(product?.precio as number)}
            </div>
            <del className="ps-1.5 font-medium text-gray-500">
              {toCurrency(product?.precio as number)}
            </del>
            <div className="ps-1.5 text-red">
              ({calculatePercentage(295, 320)}% Descuento)
            </div>
          </div>
          <div className="font-medium text-green-dark">
            Incluido impuestos
          </div>
          {/*

          <div className="mb-3.5 flex items-start justify-between pt-6">
            <Title as="h6" className="font-inter text-sm font-medium">
              Select Size
            </Title>
            <Button size="sm" variant="text" className="h-auto py-0 underline">
              Size Guide
            </Button>
          </div>
          
          
          {!isEmpty(product.sizes) && <GetSize sizes={product.sizes} />}

          <Title as="h6" className="mb-3.5 mt-6 font-inter text-sm font-medium">
            Select Color
          </Title>

          <GetColor colors={product?.colors ?? []} />*/}

          <div className="grid grid-cols-1 gap-4 pt-7 @md:grid-cols-2 @xl:gap-6">
            <Button
              size="xl"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading || isProductInCart} 
              className="h-12 text-sm lg:h-14 lg:text-base"
            >
              <PiShoppingCartSimple className="me-2 h-5 w-5 lg:h-[22px] lg:w-[22px]" />{' '}
              {isProductInCart ? 'Ya en el carrito' : 'Añadir al carrito'}
            </Button>
             {/*
            <WishlistButton />*/}
          </div>
        </form>
      </FormProvider>
    </>
  )}
}
