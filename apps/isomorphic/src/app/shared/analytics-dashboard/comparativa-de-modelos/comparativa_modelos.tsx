'use client';

import { routes } from '@/config/routes';
import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import TableComparativaModelos from './table';

const orderData = [
  {
    id: '3413',
    name: 'Daewoo 43N1EC24',
    email: 'August17@hotmail.com',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-15.webp',
    items: 83,
    price: '457.00',
    cuota: '457.00',
    plazo: '457.00',
    status: 'Cancelled',
    createdAt: '2023-08-06T00:01:51.735Z',
    updatedAt: '2023-08-10T22:39:21.113Z',
    products: [
      {
        id: '0o02051402',
        name: 'Almacenes Japon',
        category: 'Celulares',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp',
        precio_credito: '50',
        cuotas:24,
        precio_contado: '110.00',
        modelo: 'NOTE 40',
        marca: 'Xiaomi',
        caracteristica: 'Gama Alta',
      },
      {
        id: '0o17477064',
        name: 'Computron',
        category: 'Cocina',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/5.webp',
          precio_credito: '50',
          cuotas:24,
          precio_contado: '110.00',
          modelo: 'MILAN',
          marca: 'Mabe',
          caracteristica: '5',
      },
      {
        id: '0o02374305',
        name: 'Artefacta',
        category: 'TV',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/6.webp',
          precio_credito: '50',
          cuotas:24,
          precio_contado: '110.00',
          modelo: '82JDFLSVJSD',
          marca: 'LG',
          caracteristica: '82',
      },
    ],
  },
  {
    id: '3414',
    name: 'Daewoo 58N1EC24',
    email: 'General.Bergstrom@yahoo.com',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-14.webp',
    items: 21,
    price: '426.00',
    cuota: '457.00',
    plazo: '457.00',
    status: 'Cancelled',
    createdAt: '2023-07-22T10:53:43.612Z',
    updatedAt: '2023-08-13T08:39:41.230Z',
    products: [
      {
        id: '0o02602714',
        name: 'Licensed Concrete Cheese',
        category: 'Shirt',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp',
        price: '410.00',
        quantity: 2,
      },
      {
        id: '0o24033230',
        name: 'Gorgeous Bronze Gloves',
        category: 'Watch',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/1.webp',
        price: '948.00',
        quantity: 1,
      },
    ],
  },
  {
    id: '3415',
    name: 'Daewoo 58N1EC24',
    email: 'Daniella_Littel@gmail.com',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-13.webp',
    items: 93,
    price: '544.00',
    cuota: '457.00',
    plazo: '457.00',
    status: 'Refunded',
    createdAt: '2023-07-29T08:46:59.211Z',
    updatedAt: '2023-08-08T22:08:04.564Z',
    products: [
      {
        id: '0o02374305',
        name: 'Rustic Steel Computer',
        category: 'Shoes',
        image:
          'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/2.webp',
        price: '948.00',
        quantity: 1,
      },
    ],
  }]


  export default function ComparativaModelos() {
    return (
  
        <TableComparativaModelos
          data={orderData}
          variant="elegant"
          className="[&_.table-filter]:hidden [&_.table-pagination]:hidden "
        />
      
    );
  }
  