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
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzM2MjA1NzM4LCJqdGkiOiI4NjAxMWIzZS1kY2MzLTQ4ODQtYmY4Yy1hMzJjNWNlYzQ4MTMiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjo3NSwibmJmIjoxNzM2MjA1NzM4LCJjc3JmIjoiOTBiZWY5M2UtZmQ2MS00YWY4LWEwYjAtNTI3YWQ2YWMxOGUzIiwiZXhwIjoxNzM2MjQxNzM4LCJpc19hZG1pbiI6ZmFsc2V9.o43hpwrHQbAMUWut89CgEsKlm89dD-F1h8vEdu4hJ_8';
          useEffect(() => {
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
  