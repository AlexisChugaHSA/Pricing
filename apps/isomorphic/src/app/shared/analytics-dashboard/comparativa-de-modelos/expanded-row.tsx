import TrendingDownIcon from '@components/icons/trending-down';
import TrendingUpIcon from '@components/icons/trending-up';
import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import { PiXBold } from 'react-icons/pi';
import { Title, Text, Button } from 'rizzui';
import EvolutivoModal from '../evolutivo_modal';
import { useEffect, useState } from 'react';
import { Evolutivo_Precio_Contado, Evolutivo_Precio_Credito, obtenerDatosCuota, obtenerDatosEfectivo } from '@/app/services/evolutivo_modal.service';

export default function ExpandedOrderRowCModelos({ record }: any) {
  const [datosPCredito, setDatosPCredito] = useState<Evolutivo_Precio_Credito[]>([]);
  const [datosPContado, setDatosPContado] = useState<Evolutivo_Precio_Contado[]>([]);

  const token = 'TU_TOKEN_AQUI';

  useEffect(() => {
    obtenerDatosCuota(token, "01").then((data) => setDatosPCredito(data));
    obtenerDatosEfectivo(token, "02").then((data) => setDatosPContado(data));
  }, []);

  const [isOpenCuota, setIsOpenCuota] = useState(false);
  const [isOpenEfectivo, setIsOpenEfectivo] = useState(false);
  if (record?.empresas?.length === 0) {
    return <Text>No empresa available</Text>;
  }
  return (
    <div className="grid grid-cols-1 divide-y bg-gray-0 px-3.5 dark:bg-gray-50">
      {record?.empresas.map((empresa: any) => (
        <article
          key={record.id + empresa.empresa}
          className="flex items-center  py-6 first-of-type:pt-2.5 last-of-type:pb-2.5" style={{ gap: "185px", paddingLeft: "200px" }}
        >
          <div className="flex items-start" style={{ maxWidth: "200px", flexShrink: 0 }}>
            <header style={{ maxWidth: "200px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500">Empresa:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {empresa.empresa}
              </Title>
              <a href={empresa.url} target="_blank" rel="noopener noreferrer">
                <Button size="sm" style={{ maxWidth: "42px" }}>Ver</Button>
              </a>

            </header>
          </div>
          <div className="flex w-full max-w-xs items-center " style={{ gap: "145px" }}>
            <header style={{ width: "80px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500">Efectivo:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium flex gap-2">
                {empresa.efectivo}
                {empresa.p_efectivo ? ( // Verificar si porcentaje_cuota no es null o undefined
                  <Text className="font-medium text-gray-700 flex items-center gap-1">
                    <span
                      className={`flex items-center gap-1 text-sm ${empresa.p_efectivo.includes('-') ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                      ({empresa.p_efectivo.includes('-') ? (
                        <TrendingDownIcon className="h-auto w-4" />
                      ) : (
                        <TrendingUpIcon className="h-auto w-4" />
                      )}
                      {empresa.p_efectivo}%)
                    </span>
                  </Text>
                ) : null}
              </Title>
              <Button size="sm" className="w-full" onClick={() => setIsOpenEfectivo(true)}>
                Evolutivo
              </Button>
              <Dialog open={isOpenEfectivo} onClose={setIsOpenEfectivo} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                  <Dialog.Panel className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-1 @7xl:grid-cols-1 3xl:gap-8">
                      <EvolutivoModal className="@4xl:col-span-1 @7xl:col-span-1" data={datosPContado} title="Evolutivo Efectivo Modal" />
                    </div>
                    <button
                      onClick={() => setIsOpenEfectivo(false)}
                      className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
                    >
                      Cerrar
                    </button>
                  </Dialog.Panel>
                </div>
              </Dialog>
            </header>
            <header style={{ width: "80px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500">Cuota:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium flex gap-2">
                {empresa.cuota}
                {empresa.p_cuota ? ( // Verificar si porcentaje_cuota no es null o undefined
                  <Text className="font-medium text-gray-700 flex items-center gap-1">
                    <span
                      className={`flex items-center gap-1 text-sm ${empresa.p_cuota.includes('-') ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                      ({empresa.p_cuota.includes('-') ? (
                        <TrendingDownIcon className="h-auto w-4" />
                      ) : (
                        <TrendingUpIcon className="h-auto w-4" />
                      )}
                      {empresa.p_cuota}%)
                    </span>
                  </Text>
                ) : null}
              </Title>
              <Button size="sm" className="w-full" onClick={() => setIsOpenCuota(true)}>
                Evolutivo
              </Button>
              <Dialog open={isOpenCuota} onClose={setIsOpenCuota} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                  <Dialog.Panel className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-1 @7xl:grid-cols-1 3xl:gap-8">
                      <EvolutivoModal className="@4xl:col-span-1 @7xl:col-span-1" data={datosPCredito} title="Evolutivo Cuotas" />
                    </div>
                    <button
                      onClick={() => setIsOpenCuota(false)}
                      className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
                    >
                      Cerrar
                    </button>
                  </Dialog.Panel>
                </div>
              </Dialog>
            </header>
            <header style={{ width: "70px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500">Plazo:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {empresa.cuota}
              </Title>
              <Text className="mb-1 text-gray-500" style={{ fontSize: '11px' }}>{empresa.plazo} cuotas</Text>
            </header>
          </div>
        </article>
      ))}
    </div>
  );
}
