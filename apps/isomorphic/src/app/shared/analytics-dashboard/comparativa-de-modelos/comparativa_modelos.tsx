'use client';

import { routes } from '@/config/routes';
import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import TableComparativaModelos from './table';
import {Comparativa_Modelos,obtenerDatos } from '@/app/services/comparativa_modelos.service';
import { useEffect, useState } from 'react';
import WidgetCard from '@components/cards/widget-card';


  export default function ComparativaModelos() {
         const [datos, setDatos] = useState<Comparativa_Modelos[]>([]); 
          useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
              console.error('No hay token disponible');
              return;
            }          
            obtenerDatos(token ) 
              .then((data) => {
                setDatos(data); 
              })
              .catch((error) => {
                console.error('Error al obtener las facturas:', error);
              });
          }, []);
        const orderData = datos
        if(orderData && orderData.length > 0){
    return (
      <WidgetCard title={'Comparativa Modelos'} className="flex flex-col gap-4">
        <TableComparativaModelos
          data={orderData}
          variant="elegant"
          className="[&_.table-filter]:hidden [&_.table-pagination]:hidden "
        />
       </WidgetCard>
    );}
  }
  