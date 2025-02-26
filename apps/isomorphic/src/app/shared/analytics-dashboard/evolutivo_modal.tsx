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
import { Evolutivo_Efectivo,obtenerDatos, Evolutivo_Efectivo_Mes,obtenerDatosPorMes } from '@/app/services/evolutivo_efectivo.service';
import DropdownAction from '@components/charts/dropdown-action';
import { title } from 'process';
import Meses from '@/app/services/consulta.service';



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
const viewOptions = [{ value: "0", label: "Todos" },...Meses];


interface EvolutivoModalProps {
  className?: string;
  data: Evolutivo_Efectivo[];
  title: string;
}

export default function EvolutivoModal({ className, data, title }: EvolutivoModalProps) {
  console.log("Renderizando EvolutivoModal");
  if (!data || data.length === 0) return null; // No renderizar si no hay datos

  return (
    <WidgetCard title={title} className={className}>
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
            {Object.keys(data[0])
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

