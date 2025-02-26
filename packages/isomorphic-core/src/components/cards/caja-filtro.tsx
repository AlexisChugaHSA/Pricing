'use client';

import { Text } from 'rizzui';
import cn from '../../utils/class-names';

const cajaFiltroClasses = {
  base: 'border border-muted bg-gray-0 p-5 dark:bg-gray-50 lg:p-6',
  rounded: {
    sm: 'rounded-sm',
    DEFAULT: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
  },
};

type CajaFiltroTypes = {
  rounded?: keyof typeof cajaFiltroClasses.rounded;
  className?: string;
  children?: React.ReactNode; // Para permitir contenido personalizado
};

export default function CajaFiltro({
  rounded = 'DEFAULT',
  className,
  children,
}: CajaFiltroTypes) {
  return (
    <div
      className={cn(
        cajaFiltroClasses.base,
        cajaFiltroClasses.rounded[rounded],
        className
      )}
    >
      {/* Contenido personalizable */}
      {children}
    </div>
  );
}