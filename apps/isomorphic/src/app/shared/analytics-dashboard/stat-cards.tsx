'use client';

import MetricCard from '@components/cards/metric-card';
import { Text } from 'rizzui';
import cn from '@utils/class-names';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Indicador, obtenerDatos } from '@/app/services/indicadores.service';
import { useEffect, useState } from 'react';

const trafficData = [
  {
    day: 'Sunday',
    sale: 4000,
    cost: 2400,
  },
  {
    day: 'Monday',
    sale: 3000,
    cost: 1398,
  },
  {
    day: 'Tuesday',
    sale: 2000,
    cost: 9800,
  },
  {
    day: 'Wednesday',
    sale: 2780,
    cost: 3908,
  },
  {
    day: 'Thursday',
    sale: 1890,
    cost: 4800,
  },
  {
    day: 'Friday',
    sale: 2390,
    cost: 3800,
  },
  {
    day: 'Saturday',
    sale: 3490,
    cost: 4300,
  },
];

const conventionRateData = [
  {
    day: 'Sunday',
    sale: 2000,
    cost: 2400,
  },
  {
    day: 'Monday',
    sale: 3000,
    cost: 1398,
  },
  {
    day: 'Tuesday',
    sale: 2000,
    cost: 9800,
  },
  {
    day: 'Wednesday',
    sale: 2780,
    cost: 3908,
  },
  {
    day: 'Thursday',
    sale: 1890,
    cost: 4800,
  },
  {
    day: 'Friday',
    sale: 2390,
    cost: 3800,
  },
  {
    day: 'Saturday',
    sale: 3490,
    cost: 4300,
  },
];

const barData = [
  {
    day: 'Sunday',
    sale: 2000,
    cost: 2400,
  },
  {
    day: 'Monday',
    sale: 2800,
    cost: 1398,
  },
  {
    day: 'Tuesday',
    sale: 3500,
    cost: 9800,
  },
  {
    day: 'Wednesday',
    sale: 2780,
    cost: 3908,
  },
  {
    day: 'Thursday',
    sale: 1890,
    cost: 4800,
  },
  {
    day: 'Friday',
    sale: 2390,
    cost: 3800,
  },
  {
    day: 'Saturday',
    sale: 3490,
    cost: 4300,
  },
];

const analyticsStatData = [
  {
    id: '1',
    titulo: 'Efectivo Promedio',
    valor: '500',
    descripcion: 'Number of the visitors on the website.',
    porcentaje: '+32.40',
  },
  {
    id: '2',
    titulo: 'Promedio Cuotas',
    valor: '300',
    descripcion: 'Number of the visitors turned into user.',
    porcentaje: '-4.40',
  },
  {
    id: '3',
    titulo: 'Promedio Plazo',
    valor: '5',
    descripcion: 'Number of the visitors went without visiting.',
    porcentaje: '+32.40',
  },
];




export default function StatCards({ className }: { className?: string }) {
  const [datos, setDatos] = useState<Indicador[]>([]);
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No hay token disponible');
        return;
      }
    
    obtenerDatos(token)
      .then((data) => {
        setDatos(data);
      })
      .catch((error) => {
        console.error('Error al obtener las facturas:', error);
      });
  }, []);
  const analyticsStatData = datos
  const analyticsStatData2 = analyticsStatData.map((item) => {
    let fill = '';
    let chart: any[] = [];;
  
    if (item.titulo.includes('Efectivo')) {
      fill = '#015DE1';
      chart = trafficData;
    } else if (item.titulo.includes('Cuotas')) {
      fill = '#048848';
      chart = conventionRateData;
    } else if (item.titulo.includes('Plazo')) {
      fill = '#B92E5D';
      chart = barData;
    }
  
    return { ...item, fill, chart };
  });
  
  const formattedAnalyticsStatData = analyticsStatData2.map((item) => {
    let formattedValor = item.valor;
    if (item.titulo.includes('Efectivo') || item.titulo.includes('Cuotas')) {
      formattedValor = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      }).format(Number(item.valor));
    }
    return { ...item, valor: formattedValor };
  });
  if(formattedAnalyticsStatData && formattedAnalyticsStatData.length > 0){
  return (
    <div
      className={cn('grid grid-cols-1 gap-5 3xl:gap-8 4xl:gap-9', className)}
    >
      {formattedAnalyticsStatData.map((stat) => (
        <MetricCard
          key={stat.titulo + stat.id}
          title={stat.titulo}
          metric={stat.valor}
          rounded="lg"
          metricClassName="text-2xl mt-1"
          info={
            <Text className="mt-4 max-w-[150px] text-sm text-gray-500">
              {stat.descripcion}
            </Text>
          }
          chart={
            <>
              <div
                style={{ color: stat.fill }}
                className="mb-3 text-sm font-medium"
              >
                {stat.porcentaje}%
              </div>
              <div className="h-12 w-20 @[16.25rem]:h-16 @[16.25rem]:w-24 @xs:h-20 @xs:w-28">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart barSize={6} barGap={5} data={stat.chart}>
                    <Bar
                      dataKey="sale"
                      fill={stat.fill}
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          }
          chartClassName="flex flex-col w-auto h-auto text-center"
          className="@container @7xl:text-[15px] [&>div]:items-end"
        />
      ))}
    </div>
  );}
}
