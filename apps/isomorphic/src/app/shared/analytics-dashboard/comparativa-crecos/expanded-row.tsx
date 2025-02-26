import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import { Title, Text, Button } from 'rizzui';
import EvolutivoModal from '../evolutivo_modal';
import { obtenerDatosPCredito, obtenerDatosPContado, Evolutivo_Precio_Contado, Evolutivo_Precio_Credito } from '@/app/services/evolutivo_modal.service';
import TrendingDownIcon from '@components/icons/trending-down';
import TrendingUpIcon from '@components/icons/trending-up';

export default function ExpandedOrderRowCCrecos({ record }: any) {
  const [datosPCredito, setDatosPCredito] = useState<Evolutivo_Precio_Credito[]>([]);
  const [datosPContado, setDatosPContado] = useState<Evolutivo_Precio_Contado[]>([]);

  const token = 'TU_TOKEN_AQUI';

  useEffect(() => {
    obtenerDatosPCredito(token, "01").then((data) => setDatosPCredito(data));
    obtenerDatosPContado(token, "02").then((data) => setDatosPContado(data));
  }, []);

  const [isOpenCredito, setIsOpenCredito] = useState(false);
  const [isOpenContado, setIsOpenContado] = useState(false);
  if (!record?.productos?.length) {
    return <Text>No product available</Text>;
  }

  return (
    <div className="grid grid-cols-1 divide-y bg-gray-0 px-3.5 dark:bg-gray-50">
      {record?.productos.map((product: any) => (
        <article
          key={record.id + product.nombre}
          className="flex items-center  py-6 first-of-type:pt-2.5 last-of-type:pb-2.5" style={{ gap: "100px", paddingLeft: "150px" }}
        >
          <div className="flex items-start" style={{ maxWidth: "90px", flexShrink: 0, alignItems: "center" }}>
            <div style={{ maxWidth: "90px", flexShrink: 0 }} className="relative me-4 aspect-[80/60] w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
              <Image
                fill
                className="object-cover"
                src={product.imagen}
                alt={product.nombre}
              />
            </div>
            <a href={product.url} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="w-full">Ver</Button>
            </a>
          </div>
          <div className="flex w-full max-w-xs items-center " style={{ gap: "50px" }}>
            <header style={{ width: "80px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500" style={{ fontSize: '11px' }}>Marca:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {product.marca}
              </Title>
            </header>
            <header style={{ width: "90px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500" style={{ fontSize: '11px' }}>Modelo:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {product.modelo}
              </Title>
            </header>
            <header style={{ width: "90px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500" style={{ fontSize: '11px' }}>Característica:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {product.caracteristica}
              </Title>
            </header>
            <header style={{ width: "90px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500" style={{ fontSize: '11px' }}>Precio contado:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium flex gap-2">
                {product.precio_contado}
                {product.porcentaje_contado ? ( // Verificar si porcentaje_cuota no es null o undefined
                  <Text className="font-medium text-gray-700 flex items-center gap-1">
                    <span
                      className={`flex items-center gap-1 text-sm ${product.porcentaje_contado.includes('-') ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                      ({product.porcentaje_contado.includes('-') ? (
                        <TrendingDownIcon className="h-auto w-4" />
                      ) : (
                        <TrendingUpIcon className="h-auto w-4" />
                      )}
                      {product.porcentaje_contado}%)
                    </span>
                  </Text>
                ) : null}
              </Title>
              <Button size="sm" className="w-full" onClick={() => setIsOpenContado(true)}>
                Evolutivo
              </Button>
              <Dialog open={isOpenContado} onClose={setIsOpenContado} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                  <Dialog.Panel className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-1 @7xl:grid-cols-1 3xl:gap-8">
                      <EvolutivoModal className="@4xl:col-span-1 @7xl:col-span-1" data={datosPContado} title="Evolutivo Precio Contado" />
                    </div>
                    <button
                      onClick={() => setIsOpenContado(false)}
                      className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
                    >
                      Cerrar
                    </button>
                  </Dialog.Panel>
                </div>
              </Dialog>
            </header>
            <header style={{ width: "90px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500" style={{ fontSize: '11px' }}>Precio crédito:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium flex gap-2">
                {product.precio_credito+' '}
                {product.porcentaje_credito ? ( // Verificar si porcentaje_cuota no es null o undefined
                  <Text className="font-medium text-gray-700 flex items-center gap-1">
                    <span
                      className={`flex items-center gap-1 text-sm ${product.porcentaje_credito.includes('-') ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                      ({product.porcentaje_credito.includes('-') ? (
                        <TrendingDownIcon className="h-auto w-4" />
                      ) : (
                        <TrendingUpIcon className="h-auto w-4" />
                      )}
                      {product.porcentaje_credito}%)
                    </span>
                  </Text>
                ) : null}
              </Title>
              <Button size="sm" className="w-full" onClick={() => setIsOpenCredito(true)}>
                Evolutivo
              </Button>
              <Dialog open={isOpenCredito} onClose={setIsOpenCredito} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                  <Dialog.Panel className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-1 @7xl:grid-cols-1 3xl:gap-8">
                      <EvolutivoModal className="@4xl:col-span-1 @7xl:col-span-1" data={datosPCredito} title="Evolutivo Precio Crédito" />
                    </div>
                    <button
                      onClick={() => setIsOpenCredito(false)}
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
                {product.precio_credito}
                {product.plazo}
              </Title>
              <Text className="mb-1 text-gray-500" style={{fontSize:'11px'}}>{product.cuotas} cuotas</Text>
            </header>
          </div>
        </article>
      ))}
    </div>
  );
}