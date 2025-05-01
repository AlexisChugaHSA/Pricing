'use client';

import WidgetCard from '@components/cards/widget-card';
import { Title } from 'rizzui';
import cn from '@utils/class-names';
import { useCallback, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import DropdownAction from '@components/charts/dropdown-action';
import { Efectivo_EmpresaPie, obtenerDatosPie } from '@/app/services/efectivo_empresa.service';



const COLORS = ['#5a5fd7', '#10b981', '#f97316', '#e11d48', '#6366f1', '#4ade80', '#d97706'];

const viewOptions = [
  { value: 'Daily', label: 'Daily' },
  { value: 'Monthly', label: 'Monthly' },
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, outerRadius, startAngle, endAngle, midAngle } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius - 100) * cos;
  const sy = cy + (outerRadius - 100) * sin;
  return (
    <Sector
      cx={sx}
      cy={sy}
      cornerRadius={5}
      innerRadius={50}
      outerRadius={120}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={props.fill}
    />
  );
};

export default function Efectivo_Empresa_Pie({ className }: { className?: string }) {
  const [datos, setDatos] = useState<Efectivo_EmpresaPie[]>([]);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token disponible');
      return;
    }
  
    obtenerDatosPie(token)
      .then((data) => setDatos(data))
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, []);

  const chartData = datos; 

  const onMouseOver = useCallback((_: any, index: number) => {
    setActiveIndex(index);
  }, []);

  const onMouseLeave = useCallback(() => {
    setActiveIndex(0);
  }, []);

  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  if (chartData.length === 0) return null; // Retorna null si no hay datos

  return (
    <WidgetCard
      title="Efectivo por empresa"
      titleClassName="text-gray-800 sm:text-lg font-inter"
      headerClassName="items-center"
      className={cn('@container', className)}
    >
      <div className="h-full items-center gap-4 @sm:flex">
        <div className="relative h-[300px] w-full after:absolute after:inset-1/2 after:h-20 after:w-20 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-dashed after:border-gray-300 @sm:w-3/5 @sm:py-3 rtl:after:translate-x-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart className="w-20 [&_.recharts-layer:focus]:outline-none [&_.recharts-sector:focus]:outline-none dark:[&_.recharts-text.recharts-label]:first-of-type:fill-white">
              <Pie
                activeIndex={activeIndex}
                data={chartData}
                cornerRadius={10}
                innerRadius={55}
                outerRadius={100}
                paddingAngle={5}
                stroke="rgba(0,0,0,0)"
                dataKey="porcentaje"
                activeShape={renderActiveShape}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="@sm:w-2/5 @sm:ps-2">
          <div className="mb-4 mt-1">
            <div className="mb-1.5 text-gray-700">Total Empresas</div>
            <Title as="h2" className="font-inter font-bold text-gray-900">
              {chartData.length}
            </Title>
          </div>
          <div>
            {chartData.map((entry, index) => (
              <Detail key={index} color={COLORS[index % COLORS.length]} value={entry.porcentaje} text={entry.empresa} />
            ))}
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}

function Detail({ color, value, text }: { color: string; value: number; text: string }) {
  return (
    <div className="flex justify-between gap-2 border-b border-gray-100 py-3 last:border-b-0">
      <div className="col-span-3 flex items-center justify-start gap-1.5">
        <span style={{ background: color }} className="block h-3 w-3 rounded" />
        <p className="text-gray-500">{text}</p>
      </div>
      <span
        style={{ borderColor: color }}
        className="rounded-full border-2 px-2 font-semibold text-gray-700"
      >
        {value}%
      </span>
    </div>
  );
}
