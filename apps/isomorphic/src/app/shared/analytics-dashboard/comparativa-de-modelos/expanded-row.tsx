import Image from 'next/image';
import { PiXBold } from 'react-icons/pi';
import { Title, Text } from 'rizzui';

export default function ExpandedOrderRowCModelos({ record }: any) {
  if (record?.empresas?.length === 0) {
    return <Text>No empresa available</Text>;
  }
  return (
    <div className="grid grid-cols-1 divide-y bg-gray-0 px-3.5 dark:bg-gray-50">
      {record?.empresas.map((empresa: any) => (
        <article
          key={record.id + empresa.empresa}
          className="flex items-center  py-6 first-of-type:pt-2.5 last-of-type:pb-2.5" style={{gap:"300px"}}
        >
          <div className="flex items-start" style={{ maxWidth: "200px", flexShrink: 0 }}>
            <header style={{ maxWidth: "200px", flexShrink: 0 }}>
            <Text className="mb-1 text-gray-500">Empresa:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {empresa.empresa}
              </Title>

            </header>
          </div>
          <div className="flex w-full max-w-xs items-center " style={{gap:"195px"}}>
          <header style={{ width: "90px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500">Efectivo:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {empresa.efectivo}
              </Title>
            </header>
            <header style={{ width: "60px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500">Cuota:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {empresa.cuota}
              </Title>
            </header>
            <header style={{ width: "70px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500">Plazo:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {empresa.plazo}
              </Title>
            </header>
          </div>
        </article>
      ))}
    </div>
  );
}
