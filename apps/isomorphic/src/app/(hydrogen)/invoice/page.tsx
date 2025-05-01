'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import InvoiceTable from '@/app/shared/invoice/invoice-list/table';
import { PiPlusBold } from 'react-icons/pi';
import ExportButton from '@/app/shared/export-button';
import { metaObject } from '@/config/site.config';
import { invoiceData } from '@/data/invoice-data';
import { obtenerFacturas,Factura } from '@/app/services/factura.service'; // Importa la función de servicio.
{/*
export const metadata = {
  ...metaObject('Invoices'),
};*/}

const pageHeader = {
  title: 'Facturación',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.invoice.home,
      name: 'Invoice',
    },
    {
      name: 'List',
    },
  ],
};

export default function InvoiceListPage() {
  const [facturas, setFacturas] = useState<Factura[]>([]); // Estado para almacenar las facturas.

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token disponible');
      return;
    }  
    obtenerFacturas(45,token ) // Usa el ID que corresponda.
      .then((data) => {
        setFacturas(data); // Guarda los datos en el estado.
      })
      .catch((error) => {
        console.error('Error al obtener las facturas:', error);
      });
  }, []);
  if(facturas){
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={facturas}
            fileName="invoice_data"
            header="ID,Name,Username,Avatar,Email,Due Date,Amount,Status,Created At"
          />
          {/*
          <Link href={routes.invoice.create} className="w-full @lg:w-auto">
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Invoice
            </Button>
          </Link>*/}
        </div>
      </PageHeader>

      <InvoiceTable data={facturas} /> {/* Cambiado a facturas */}
    </>
  );}
}
