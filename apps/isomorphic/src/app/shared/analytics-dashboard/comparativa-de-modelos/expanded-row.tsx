import Image from 'next/image';
import { PiXBold } from 'react-icons/pi';
import { Title, Text } from 'rizzui';

export default function ExpandedOrderRowCModelos({ record }: any) {
  if (record?.products?.length === 0) {
    return <Text>No product available</Text>;
  }
  return (
    <div className="grid grid-cols-1 divide-y bg-gray-0 px-3.5 dark:bg-gray-50">
      {record?.products.map((product: any) => (
        <article
          key={record.id + product.name}
          className="flex items-center  py-6 first-of-type:pt-2.5 last-of-type:pb-2.5" style={{gap:"150px"}}
        >
          <div className="flex items-start" style={{ maxWidth: "100px", flexShrink: 0 }}>
            <div style={{ maxWidth: "100px", flexShrink: 0 }} className="relative me-4 aspect-[80/60] w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
              <Image
                fill
                className="object-cover"
                src={product.image}
                alt={product.name}
              />
            </div>
            <header style={{ maxWidth: "100px", flexShrink: 0 }}>
            <Text className="mb-1 text-gray-500">Producto:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {product.name}
              </Title>

            </header>
          </div>
          <div className="flex w-full max-w-xs items-center " style={{gap:"90px"}}>
          <header style={{ width: "80px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500">Marca:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {product.marca}
              </Title>
            </header>
            <header style={{ width: "90px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500">Modelo:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {product.modelo}
              </Title>
            </header>
            <header style={{ width: "90px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500">Característica:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {product.caracteristica}
              </Title>
            </header>
          <header style={{ width: "90px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500">Precio contado:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {product.precio_contado}
              </Title>
            </header>
            <header style={{ width: "110px", flexShrink: 0 }}>
              <Text className="mb-1 text-gray-500">Precio credito:</Text>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {product.precio_credito}
              </Title>
              <Text className="mb-1 text-gray-500" style={{fontSize:'11px'}}>{product.cuotas} cuotas</Text>
            </header>
           
          </div>
        </article>
      ))}
    </div>
  );
}
