'use client';

import WidgetCard from '@components/cards/widget-card';
import { CustomTooltip } from '@components/charts/custom-tooltip';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { Evolutivo_Efectivo,obtenerDatos } from '@/app/services/evolutivo_efectivo.service';



const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <text
      x={x}
      y={y}
      dy={10} // Ajusta la posición vertical
      textAnchor="middle"
      transform={`rotate(0, ${x}, ${y})`}
      style={{ fontSize: 12, fill: '#333' }} // Opcional: Personaliza estilo
    >
      {payload.value}
    </text>
  );
};
const formatLegendName = (name: string) => {
  return name
    .split('_')           // Divide la cadena por guiones bajos
    .map((word) =>        // Convierte cada palabra en capital
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');           // Vuelve a juntar las palabras con espacios
};
const barColors = [
  '#5a5fd7', '#10b981', '#f97316', '#e11d48', '#6366f1', 
  '#4ade80', '#d97706', '#eab308', '#8b5cf6', '#ef4444'
];
export default function EvolutivoEfectivo({ className }: { className?: string }) {
    const [datos, setDatos] = useState<Evolutivo_Efectivo[]>([]); 
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
    <WidgetCard title={'Evolutivo Efectivo'} className={className}>
      <div className="mt-2 w-full lg:mt-2" style={{ height: '100%' }}>
        <ResponsiveContainer width="100%" height={400}>
        <LineChart
        data={data}
        margin={{
          top: 0,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
              dataKey="mes"
              tickLine={false}
              label={{ value: 'Mes', position: 'insideBottom', offset: -10 }}
              tick={<CustomTick />}
              padding={{ left: 0, right: 0 }}
            />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} formatter={(value) => formatLegendName(value)} />
        {data.length > 0 && // Verificación para asegurar que data tiene contenido
          Object.keys(data[0])
            .filter((key) => key !== 'mes') // Excluir el eje "mes"
            .map((empresa, index) => (
              <Line
                key={empresa}
                type="monotone"
                dataKey={empresa}
                stroke={barColors[index % barColors.length]} // Asignar color a cada línea
                strokeWidth={2}
              >
                <LabelList
                  dataKey={empresa}
                  position="top"
                  style={{
                    fill: barColors[index % barColors.length], // Asignar color al texto del label
                  }}

                />
              </Line>
            ))}
      </LineChart>

        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
}
