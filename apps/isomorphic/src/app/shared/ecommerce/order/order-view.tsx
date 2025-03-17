'use client';

import Image from 'next/image';
import { useAtomValue } from 'jotai';
import isEmpty from 'lodash/isEmpty';
import { PiCheckBold } from 'react-icons/pi';
import Membresias from './membresias';
import {
  billingAddressAtom,
  orderNoteAtom,
  shippingAddressAtom,
} from '@/store/checkout';
import OrderViewProducts from '@/app/shared/ecommerce/order/order-products/order-view-products';
import { useCart } from '@/store/quick-cart/cart.context';
import { Title, Text } from 'rizzui';
import cn from '@utils/class-names';
import { toCurrency } from '@utils/to-currency';
import { formatDate } from '@utils/format-date';
import usePrice from '@hooks/use-price';
import PayPalButtonComponent from '@/app/services/paypal.service';
import { Iva, obtenerIva } from '@/app/services/factura.service';
import { useEffect, useState } from 'react';
import { Membresia } from '@/app/services/membresia.service';
import { toNumber } from 'lodash';

const orderStatus = [
  { id: 1, label: 'Selección de productos' },
  { id: 2, label: 'Creación de orden' },
  { id: 3, label: 'Selección de membresía' },
  { id: 4, label: 'Realizar el pago' },
];

const transitions = [
  {
    id: 1,
    paymentMethod: {
      name: 'MasterCard',
      image:
        'https://isomorphic-furyroad.s3.amazonaws.com/public/payment/master.png',
    },
    price: '$1575.00',
  },
  {
    id: 2,
    paymentMethod: {
      name: 'PayPal',
      image:
        'https://isomorphic-furyroad.s3.amazonaws.com/public/payment/paypal.png',
    },
    price: '$75.00',
  },
  {
    id: 2,
    paymentMethod: {
      name: 'Stripe',
      image:
        'https://isomorphic-furyroad.s3.amazonaws.com/public/payment/stripe.png',
    },
    price: '$375.00',
  },
];

const currentOrderStatus = 3;



function WidgetCard({
  title,
  className,
  children,
  childrenWrapperClass,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
  childrenWrapperClass?: string;
}) {
  return (
    <div className={className}>
      <Title
        as="h3"
        className="mb-3.5 text-base font-semibold @5xl:mb-5 4xl:text-lg"
      >
        {title}
      </Title>
      <div
        className={cn(
          'rounded-lg border border-muted px-5 @sm:px-7 @5xl:rounded-xl',
          childrenWrapperClass
        )}
      >
        {children}
      </div>
    </div>
  );
}


export default function OrderView() {
  const { items, total, totalItems } = useCart();
  const [iva, setIva] = useState<Iva | null>(null);
  const storedMembresia = localStorage.getItem('membresia');

  let membresia: Membresia | null = null;

  if (storedMembresia) {
    try {
      membresia = JSON.parse(storedMembresia) as Membresia;
    } catch (error) {
      console.error('Error al parsear la membresía desde localStorage:', error);
      localStorage.removeItem('membresia'); // Eliminar datos corruptos
    }
  }


  const { price: subtotal } = usePrice(
    items && {
      amount: total,
    }
  );
  const { price: totalPrice } = usePrice({
    amount: total,
  });
  const orderNote = useAtomValue(orderNoteAtom);
  const billingAddress = useAtomValue(billingAddressAtom);
  const shippingAddress = useAtomValue(shippingAddressAtom);


  useEffect(() => {
    const loadIva = async () => {
      try {
        const data = await obtenerIva("");
        setIva(data);
      } catch (error) {
        console.error('Error al cargar el valor del IVA:', error);
      }
    };
    loadIva();
  }, []);


  const subtotalValue = parseFloat(subtotal.replace(/[^0-9.]/g, "")) || 0;
  const descuentoValue = membresia?.descuento ?? 0;
  const descuento = subtotalValue * descuentoValue
  const totalDescuento = subtotalValue * (1 - descuentoValue);
  const totalIva = iva ? iva.iva_valor*totalDescuento : totalDescuento;
  const totalF=totalIva+totalDescuento




  if (iva === null && membresia === null && totalDescuento === null) {
    return <div>Cargando...</div>;
  }
  

  return (
    <div className="@container">
      <div className="flex flex-wrap justify-center border-b border-t border-gray-300 py-4 font-medium text-gray-700 @5xl:justify-start">
        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
          {/* October 22, 2022 at 10:30 pm */}
          {formatDate(new Date(), 'MMMM D, YYYY')} at{' '}
          {formatDate(new Date(), 'h:mm A')}
        </span>
        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
          {totalItems} Items
        </span>
        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
          Total {totalPrice}
        </span>
        <span className="my-2 ms-5 rounded-3xl border-r border-muted bg-green-lighter px-2.5 py-1 text-xs text-green-dark first:ps-0 last:border-r-0">
          Paid
        </span>
      </div>
      <div className="items-start pt-10 @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <div className="space-y-7 @5xl:col-span-8 @5xl:space-y-10 @6xl:col-span-7" style={{justifyItems:'center'}}>
          {orderNote && (
            <div className="">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">
                Notes About Order
              </span>
              <div className="rounded-xl border border-muted px-5 py-3 text-sm leading-[1.85]">
                {orderNote}
              </div>
            </div>
          )}

          <div className="pb-5">
            <OrderViewProducts />
            <div className="border-t border-muted pt-7 @5xl:mt-3">
              <div className="ms-auto max-w-lg space-y-6">
                <div className="flex font-medium text-center" style={{justifyContent:'end'}}>
                  <del className='text-red'>{subtotal}</del>
                </div>
                {membresia && (
                  <div className="flex justify-between font-medium">
                    Descuento (-{membresia.descuento * 100}%): <span>-{toCurrency(descuento)}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium">
                  Subtotal: <span>{toCurrency(totalDescuento)}</span>
                </div>
                {iva && (
                  <div className="flex justify-between font-medium">
                    IVA ({iva.iva_valor * 100}%): <span>{toCurrency(totalIva)}</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-muted pt-5 text-base font-semibold">
                  Total <span>{toCurrency(totalF)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="" style={{maxWidth:'400px', justifyContent:'end'}}>
            < PayPalButtonComponent />
          </div>
        </div>
        
        <div className="space-y-7 pt-8 @container @5xl:col-span-4 @5xl:space-y-10 @5xl:pt-0 @6xl:col-span-3">
          <WidgetCard
            title="Order Status"
            childrenWrapperClass="py-5 @5xl:py-8 flex"
          >
            <div className="ms-2 w-full space-y-7 border-s-2 border-gray-100">
              {orderStatus.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "relative ps-6 text-sm font-medium before:absolute before:-start-[9px] before:top-px before:h-5 before:w-5 before:-translate-x-px before:rounded-full before:bg-gray-100 before:content-[''] after:absolute after:-start-px after:top-5  after:h-10 after:w-0.5  after:content-[''] last:after:hidden",
                    currentOrderStatus > item.id
                      ? 'before:bg-primary after:bg-primary'
                      : 'after:hidden',
                    currentOrderStatus === item.id && 'before:bg-primary'
                  )}
                >
                  {currentOrderStatus >= item.id ? (
                    <span className="absolute -start-1.5 top-1 text-white">
                      <PiCheckBold className="h-auto w-3" />
                    </span>
                  ) : null}

                  {item.label}
                </div>
              ))}
            </div>
          </WidgetCard>
        </div>
      </div>
    </div>

  );
}
