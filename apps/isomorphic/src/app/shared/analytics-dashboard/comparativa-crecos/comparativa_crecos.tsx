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
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzM2MjA1NzM4LCJqdGkiOiI4NjAxMWIzZS1kY2MzLTQ4ODQtYmY4Yy1hMzJjNWNlYzQ4MTMiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjo3NSwibmJmIjoxNzM2MjA1NzM4LCJjc3JmIjoiOTBiZWY5M2UtZmQ2MS00YWY4LWEwYjAtNTI3YWQ2YWMxOGUzIiwiZXhwIjoxNzM2MjQxNzM4LCJpc19hZG1pbiI6ZmFsc2V9.o43hpwrHQbAMUWut89CgEsKlm89dD-F1h8vEdu4hJ_8';
      useEffect(() => {
        obtenerDatos(token ) // Usa el ID que corresponda.
          .then((data) => {
            setDatos(data); // Guarda los datos en el estado.
          })
          .catch((error) => {
            console.error('Error al obtener las facturas:', error);
          });
      }, []);
    const orderData = datos
    console.log(orderData)
    
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
  