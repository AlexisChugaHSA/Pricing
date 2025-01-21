'use client';

import WidgetCard from '@components/cards/widget-card';
import { CustomTooltip } from '@components/charts/custom-tooltip';
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

const data = [
  { name: 'Page A', uv: 4000, amt: 2400 },
  { name: 'Page B', uv: 3000, amt: 2210 },
  { name: 'Page C', uv: 2000, amt: 2290 },
  { name: 'Page D', uv: 2780, amt: 2000 },
  { name: 'Page E', uv: 1890, amt: 2181 },
  { name: 'Page F', uv: 2390, amt: 2500 },
  { name: 'Page G', uv: 3490, amt: 2100 },
];

// Colores para las barras
const barColors = ['#5a5fd7', '#10b981', '#f97316', '#e11d48', '#6366f1', '#4ade80', '#d97706'];

export default function EfectivoPorEmpresa({ className }: { className?: string }) {
  const isMediumScreen = useMedia('(max-width: 1200px)', false);

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
              dataKey="name"
              label={{ value: 'Empresa', position: 'insideBottom', offset: -10 }}
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

            <Bar dataKey="uv" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={barColors[index % barColors.length]} // Asignar color único por barra
                />
              ))}
              <LabelList
                dataKey="uv"
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
