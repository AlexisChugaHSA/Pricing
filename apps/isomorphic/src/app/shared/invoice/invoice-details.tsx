'use client';

import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { Badge, Title, Text } from 'rizzui';
import Table from '@/app/shared/table';
import { siteConfig } from '@/config/site.config';
import { useParams } from 'next/navigation';
import { DetFactura, Factura, obtenerDetFactbyId, obtenerFactbyId } from '@/app/services/factura.service';
import { useEffect, useState } from 'react';
import { obtenerProductos, Producto } from '@/app/services/producto.service';
import { obtenerPagobyId, Pago } from '@/app/services/pago.service';
import IconImage from '@public/icon.png'


const columns = [
  {
    title: 'Producto',
    dataIndex: 'product',
    key: 'product',
    width: 250,
    render: (product: any) => (
      <>
        <Title as="h6" className="mb-0.5 text-sm font-medium">
          {product.title}
        </Title>
        <Text
          as="p"
          className=" max-w-[250px] overflow-hidden truncate text-sm text-gray-500"
        >
          {product.description}
        </Text>
      </>
    ),
  },
  {
    title: 'Precio Unitario',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    width: 200,
    render: (value: string) => {
      const formattedValue = parseFloat(value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).replace('$', '').replace('.', ',');

      return <Text className="font-medium">{`$${formattedValue} USD`}</Text>;
    }
  },
  {
    title: 'Periodo',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 200,
  },

  {
    title: 'Importe',
    dataIndex: 'total',
    key: 'total',
    width: 200,
    render: (value: string) => {
      const formattedValue = parseFloat(value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).replace('$', '').replace('.', ',');

      return <Text className="font-medium">{`$${formattedValue} USD`}</Text>;
    }
  },
];

function InvoiceDetailsListTable({ invoiceItems }: { invoiceItems: any[] }) {

  return (
    <Table
      data={invoiceItems}
      columns={columns}
      variant="minimal"
      rowKey={(record) => record.id}
      scroll={{ x: 660 }}
      className="mb-11"
    />
  );
}

export default function InvoiceDetails() {
  const params: any = useParams();
  const [factura, setFactura] = useState<Factura | null>(null);
  const [detFacturas, setFacturas] = useState<DetFactura[]>([]);
  const [pago, setPago] = useState<Pago | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No hay token disponible');
    return;
  }

  useEffect(() => {
    obtenerFactbyId(params.id, token)
      .then((data) => {
        setFactura(data);
      })
      .catch((error) => {
        console.error('Error al obtener la factura:', error);
      });
  }, [params.id]);


  useEffect(() => {
    obtenerDetFactbyId(params.id, token) // Usa el ID que corresponda.
      .then((data) => {
        setFacturas(data); // Guarda los datos en el estado.
      })
      .catch((error) => {
        console.error('Error al obtener las facturas:', error);
      });
  }, [params.id]);

  useEffect(() => {
    if (detFacturas && detFacturas.length > 0) {
      obtenerPagobyId(detFacturas[0].id_pago, token)
        .then((data) => {
          setPago(data); // Guarda los datos en el estado.
        })
        .catch((error) => {
          console.error('Error al obtener los pagos:', error);
        });
    } else {
      console.warn('detFacturas no está definido o está vacío.');
    }
  }, [detFacturas, token]);

  console.log(pago)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };
    loadProducts();
  }, []);

  // Filtrar productos según detFacturas
  useEffect(() => {
    if (detFacturas.length > 0 && productos.length > 0) {
      const idsProductos = detFacturas.map((det) => det.id_producto?.toString());
      const productosRelacionados = productos.filter((producto) =>
        idsProductos.includes(producto.id_producto.toString())
      );
      setProductosFiltrados(productosRelacionados); // Guarda los productos relacionados en el estado
    }
  }, [detFacturas, productos]); // Ejecuta el efecto cuando cambien detFacturas o productos



  const invoiceItems = productosFiltrados.map((producto) => ({
    id: producto.id_producto,
    product: {
      title: producto.nombre,
      description: producto.descripcion,
    },
    unitPrice: producto.precio,
    quantity: pago?.periodo, // Si tienes una cantidad específica, cámbiala aquí
    total: (pago?.periodo ?? 1) * producto.precio, // Actualiza si tienes una lógica específica para el total
  }));


  if (pago && factura) {
    const importe_total = parseFloat(
      (productosFiltrados.reduce((acumulador, producto) => acumulador + producto.precio, 0) * (pago?.periodo || 0)).toFixed(2)
    );
    const descuento = parseFloat((pago.descuento * importe_total).toFixed(2));
    const subtotal = parseFloat((importe_total - descuento).toFixed(2));
    const iva = parseFloat((factura.iva * subtotal).toFixed(2));
    const total = parseFloat((subtotal + iva).toFixed(2));
    return (
      <div className="w-full rounded-xl border border-muted p-5 text-sm sm:p-6 lg:p-8 2xl:p-10">
        <div className="mb-12 flex flex-col-reverse items-start justify-between md:mb-16 md:flex-row">
          <Image
            src={
              IconImage
            }
            alt={siteConfig.title}
            style={{"maxWidth":"20vh","maxHeight":"20vh"}}
            className="dark:invert"
            priority
          />
          <div className="mb-4 md:mb-0">
            <Badge
              variant="flat"
              color="success"
              rounded="md"
              className="mb-3 md:mb-2"
            >
              Pagado
            </Badge>
            <Title as="h6">INV - #{factura?.id_factura}</Title>
            <Text className="mt-0.5 text-gray-500">Número de Factura</Text>
          </div>
        </div>

        <div className="mb-12 grid gap-4 xs:grid-cols-2 sm:grid-cols-3 sm:grid-rows-1">
          <div className="">
            <Title as="h6" className="mb-3.5 font-semibold">
              Emisor:
            </Title>
            <Text className="mb-1.5 text-sm font-semibold uppercase">
              
            </Text>
            <Text className="mb-1.5">High Systems Analyticis</Text>
            <Text className="mb-1.5">
              Quito, <br /> Ecuador
            </Text>
            <Text className="mb-4 sm:mb-6 md:mb-8">+593 990 690 106</Text>
            <div>
              <Text className="mb-2 text-sm font-semibold">Fecha:</Text>
              <Text>Mar 22, 2013</Text>
            </div>
          </div>

          <div className="mt-4 xs:mt-0">
            <Title as="h6" className="mb-3.5 font-semibold">
              Facturado a:
            </Title>
            <Text className="mb-1.5 text-sm font-semibold uppercase">
            {factura?.nombre_empresa}
            </Text>
            <Text className="mb-1.5">Albert Flores</Text>
            <Text className="mb-1.5">
              2715 Ash Dr. San Jose, <br />
              South Dakota 83475
            </Text>
            <Text className="mb-4 sm:mb-6 md:mb-8">(671) 555-0110</Text>
            {/* 
            <div>
              <Text className="mb-2 text-sm font-semibold">Due Date</Text>
              <Text>Mar 22, 2013</Text>
            </div>*/}
          </div>
          {/* 
          <div className="mt-4 flex sm:mt-6 md:mt-0 md:justify-end">
            <QRCodeSVG
              value="https://reactjs.org/"
              className="h-28 w-28 lg:h-32 lg:w-32"
            />
          </div>*/}
        </div>

        <InvoiceDetailsListTable invoiceItems={invoiceItems || []} />

        <div className="flex flex-col-reverse items-center justify-center border-t border-muted pb-4 pt-8 xs:flex-row">
          {/*<div className="mt-6 max-w-md pe-4 xs:mt-0">
            <Title
              as="h6"
              className="mb-1 text-xs font-semibold uppercase xs:mb-2 xs:text-sm"
            >
              Notes
            </Title>
            <Text className="leading-[1.7]">
              We appreciate your business. Should you need us to add VAT or extra
              notes let us know!
            </Text>
          </div>*/}
          <div className=" w-full max-w-sm">
            <Text className="flex items-center justify-between border-b border-muted pb-3.5 lg:pb-5">
              Importe total:{' '}
              <Text as="span" className="font-semibold">
                {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(importe_total).replace('US$', '$')} USD
              </Text>
            </Text>
            <Text className="flex items-center justify-between border-b border-muted py-3.5 lg:py-5">
              Descuento ({`${pago?.descuento * 100}%`}):{' '}
              <Text as="span" className="font-semibold">
                <Text as="span" className="font-semibold">
                  <Text as="span" className="font-semibold">
                    {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(descuento).replace('US$', '$')} USD
                  </Text>

                </Text>

              </Text>
            </Text>
            <Text className="flex items-center justify-between border-b border-muted py-3.5 lg:py-5">
              Subtotal:{' '}
              <Text as="span" className="font-semibold">
                {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(subtotal).replace('US$', '$')} USD
              </Text>
            </Text>
            <Text className="flex items-center justify-between border-b border-muted py-3.5 lg:py-5">
              IVA ({`${factura?.iva * 100}%`}):
              <Text as="span" className="font-semibold">
                {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(iva).replace('US$', '$')} USD
              </Text>
            </Text>
            <Text className="flex items-center justify-between pt-4 text-base font-semibold text-gray-900 lg:pt-5">
              Total: <Text as="span">{new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(total).replace('US$', '$')} USD</Text>
            </Text>
          </div>
        </div>
      </div>
    );
  }
}
