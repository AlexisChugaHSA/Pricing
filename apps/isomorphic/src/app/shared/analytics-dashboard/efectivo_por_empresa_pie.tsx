'use client';

import WidgetCard from '@components/cards/widget-card';
import { CustomTooltip } from '@components/charts/custom-tooltip';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,Cell 
} from 'recharts';
import { useMedia } from '@hooks/use-media';
import { Efectivo_Empresa,obtenerDatos } from '@/app/services/efectivo_empresa.service';

const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <text
      x={x}
      y={y}
      dy={10} // Ajusta la posición vertical
      textAnchor="end"
      transform={`rotate(-60, ${x}, ${y})`}
      style={{ fontSize: 12, fill: '#333' }} // Opcional: Personaliza estilo
    >
      {payload.value}
    </text>
  );
};


// Colores para las barras
const barColors = ['#5a5fd7', '#10b981', '#f97316', '#e11d48', '#6366f1', '#4ade80', '#d97706'];

export default function EfectivoPorEmpresa({ className }: { className?: string }) {
  const isMediumScreen = useMedia('(max-width: 1200px)', false);
  const [datos, setDatos] = useState<Efectivo_Empresa[]>([]); 
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
const data = datos
if(data && data.length > 0){
  return (
    <WidgetCard title="Efectivo por empresa" className={className}>
      <div className="mt-5 aspect-[1060/660] w-full lg:mt-7">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={isMediumScreen ? 18 : 24}
            margin={{
              left: 10,
              bottom: 30, // Espacio para el título del eje X
            }}
            className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              tickLine={false}
              dataKey="empresa"
              label={{ value: 'Empresa', position: 'insideBottom', offset: -10 }}
             // tick={<CustomTick />}
            />
            <YAxis
              tickLine={false}
              label={{
                value: 'Efectivo',
                angle: -90,
                position: 'insideLeft',
                offset: -1,
              }}

              domain={[0, 5000]}
            />
            <Tooltip content={<CustomTooltip />} />

            <Bar dataKey="efectivo" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={barColors[index % barColors.length]} // Asignar color único por barra
                />
              ))}
              <LabelList
                dataKey="efectivo"
                position="top"
                style={{ fill: '#000' }}
                formatter={(value: any) => `$${value}`} // Formato de etiqueta con $
              />
            </Bar>


          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
}