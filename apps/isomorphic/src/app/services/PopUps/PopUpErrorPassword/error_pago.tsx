'use client';

import WidgetCard from '@components/cards/widget-card';
import { Info } from 'lucide-react'; // icono de alerta

export default function PopUpErrorPago() {
  console.log("Renderizando ErrorPagoModal");

  return (
    <WidgetCard
          className="bg-red-100 border border-red-300 text-red-700 @4xl:col-span-1 @7xl:col-span-1" title={undefined}    >
      <div className="flex items-start gap-3 p-4">
        <Info className="w-6 h-6 text-red-600 mt-1" />
        <div>
          <h1 className="text-lg font-semibold">
            Error en el registro de su pago
          </h1>
          <p className="text-sm mt-1">
            No se pudo completar su pago, por favor inténtelo más tarde.
          </p>
        </div>
      </div>
    </WidgetCard>
  );
}
