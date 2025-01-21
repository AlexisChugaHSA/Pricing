'use client';

import WidgetCard from '@components/cards/widget-card';
import { CustomTooltip } from '@components/charts/custom-tooltip';
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

const data = [
  {
    name: 'Ene',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Abr',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Jul',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Ago',
    uv: 3490,
    pv: 4800,
    amt: 2100,
  },
  {
    name: 'Sep',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Nov',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Dic',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  }
];

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

export default function EvolutivoEfectivo({ className }: { className?: string }) {
  return (
    <WidgetCard title={'Evolutivo Efectivo'} className={className}>
      <div className="mt-5 w-full lg:mt-7" style={{ height: '100%' }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{
              top: 10, // Espacio para el título y leyenda
              bottom: 20, // Espacio para las etiquetas del eje X
              left: -15,
              right: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              label={{ value: 'Mes', position: 'insideBottom', offset: -10 }}
              tick={<CustomTick />}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis domain={[0, 11000]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#3b82f6"
              activeDot={{ r: 8 }}
              strokeWidth={2}
              dot={false}
            >
              <LabelList dataKey="pv" position="top" style={{ fill: '#3b82f6' }} />
            </Line>
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
            >
              <LabelList dataKey="uv" position="top" style={{ fill: '#10b981' }} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}

