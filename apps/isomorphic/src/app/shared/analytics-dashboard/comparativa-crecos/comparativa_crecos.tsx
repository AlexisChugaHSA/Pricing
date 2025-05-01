'use client';

import { routes } from '@/config/routes';
import TableComparativaCrecos from './table';
import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';
import { useEffect, useState } from 'react';
import { Comparativa_Crecos,obtenerDatos } from '@/app/services/comparativa_crecos.service';
import WidgetCard from '@components/cards/widget-card';




  export default function ComparativaCrecos() {
     const [datos, setDatos] = useState<Comparativa_Crecos[]>([]); 
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No hay token disponible');
        return;
      }
    
        obtenerDatos(token ) // Usa el ID que corresponda.
          .then((data) => {
            setDatos(data); // Guarda los datos en el estado.
          })
          .catch((error) => {
            console.error('Error al obtener las facturas:', error);
          });
      }, []);
    const orderData = datos
    
    if(orderData && orderData.length > 0){
    return (
      <WidgetCard title={'Comparativa Empresas'} className="flex flex-col gap-4">
        <TableComparativaCrecos
          data={orderData}
          variant="elegant"
          className="[&_.table-filter]:hidden [&_.table-pagination]:hidden "
        /> 
        </WidgetCard>
    );}
  }
  