'use client';
import { Membresia, obtenerMembresias, obtenerMembresiabyId } from "@/app/services/membresia.service";
import { useEffect, useState } from "react";
import CajaFiltro from "../../analytics-dashboard/filtros/caja-filtro";
import { Badge, Button, Title } from "rizzui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { toCurrency } from "@utils/to-currency";
import { DUMMY_ID } from "@/config/constants";
import Link from 'next/link';
import { routes } from "@/config/routes";
import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/navigation';
import { useCart } from "@/store/quick-cart/cart.context";

const CheckIcon = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', fontSize: '15px', paddingLeft: '10px', paddingRight: '10px' }} />
    </div>
  );
};

export default function MembresiasCards({ total_precio }: any) {
  const router = useRouter();
  const { updateAllQuantities } = useCart();

  const [membresias, setMembresias] = useState<Membresia[]>([]);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await obtenerMembresias();
        setMembresias(data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };
    loadProducts();
  }, []);

  if (membresias.length < 4) {
    return <div>Cargando las membresías...</div>;
  }

  const handlePagar = (periodo: any,membresia:Membresia) => {
    updateAllQuantities(periodo);
    localStorage.setItem('membresia', JSON.stringify(membresia));
    router.push(routes.eCommerce.orderDetails(DUMMY_ID));
  };


  const membresia1 = membresias[0];
  const membresia2 = membresias[1];
  const membresia3 = membresias[2];
  const membresia4 = membresias[3];

  const total1 = total_precio * (1 - membresia1.descuento)
  const total2 = total_precio * (1 - membresia2.descuento)
  const total3 = total_precio * (1 - membresia3.descuento)
  const total4 = total_precio * (1 - membresia4.descuento)

  return (
    <>
      <div className="grid grid-cols-1 gap-3 @4xl:grid-cols-1 @7xl:grid-cols-1 3xl:gap-8" style={{ alignItems: "center", textAlign: "center" }}>
        <Title as="h3" className="text-lg font-semibold xl:text-xl" style={{ textAlign: "center", padding: "10px" }}>
          Membresías
        </Title>
      </div>
      <div className="grid grid-cols-1 gap-3 @4xl:grid-cols-4 @7xl:grid-cols-4 3xl:gap-8 text-center" style={{ alignItems: "center", padding: "10px", justifyContent: 'center' }}>
        <CajaFiltro className="@4xl:col-span-1 @7xl:col-span-1">
          <Title as="h2" className="text-lg font-semibold xl:text-xl" style={{ textAlign: "center", padding: "10px" }}>
            {membresia1.tipo}
          </Title>
          <div className="container flex p-5 gap-3 items-center" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="-mb-0.5 text-2xl font-semibold text-gray-700 lg:text-3xl flex">
              {toCurrency(total1 as number)}/mes
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
          </div>
          <Button size="xl" className="w-50" style={{ margin: "15px" }} onClick={() => handlePagar(membresia1.periodo,membresia1)}>
            Pagar
          </Button>

        </CajaFiltro>
        <CajaFiltro className="@4xl:col-span-1 @7xl:col-span-1">
          <Title as="h2" className="text-lg font-semibold xl:text-xl" style={{ textAlign: "center", padding: "10px" }}>
            {membresia2.tipo}
          </Title>
          <div className="container flex p-5 gap-3 items-center" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <del className="ps-1.5 font-medium text-red">
              {toCurrency(total_precio as number)}/mes
            </del>
            <Badge rounded="md" variant="flat" color="info">
              - {membresia2.descuento * 100}%
            </Badge>
            <div className="-mb-0.5 text-2xl font-semibold text-gray-700 lg:text-3xl flex">
              {toCurrency(total2 as number)}/mes
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
          </div>
          <Button size="xl" className="w-50" style={{ margin: "15px" }} onClick={() => handlePagar(membresia2.periodo,membresia2)}>
            Pagar
          </Button>


        </CajaFiltro>
        <CajaFiltro className="@4xl:col-span-1 @7xl:col-span-1">
          <Title as="h2" className="text-lg font-semibold xl:text-xl" style={{ textAlign: "center", padding: "10px" }}>
            {membresia3.tipo}
          </Title>
          <div className="container flex p-5 gap-3 items-center" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <del className="ps-1.5 font-medium text-red">
              {toCurrency(total_precio as number)}/mes
            </del>
            <Badge rounded="md" variant="flat" color="info">
              - {membresia3.descuento * 100}%
            </Badge>
            <div className="-mb-0.5 text-2xl font-semibold text-gray-700 lg:text-3xl flex">
              {toCurrency(total3 as number)}/mes
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
          </div>
          <Button size="xl" className="w-50" style={{ margin: "15px" }} onClick={() => handlePagar(membresia3.periodo,membresia3)}>
            Pagar
          </Button>


        </CajaFiltro>
        <CajaFiltro className="@4xl:col-span-1 @7xl:col-span-1">
          <Title as="h2" className="text-lg font-semibold xl:text-xl" style={{ textAlign: "center", padding: "10px" }}>
            {membresia4.tipo}
          </Title>
          <div className="container flex p-5 gap-3 items-center" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <del className="ps-1.5 font-medium text-red">
              {toCurrency(total_precio as number)}/mes
            </del>
            <Badge rounded="md" variant="flat" color="info">
              - {membresia4.descuento * 100}%
            </Badge>
            <div className="-mb-0.5 text-2xl font-semibold text-gray-700 lg:text-3xl flex">
              {toCurrency(total4 as number)}/mes
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
            <p
              className="mx-auto max-w-[45ch] text-sm leading-6 text-gray-500 @2xl:text-base flex"
              style={{ fontSize: 'min(5vw, 14px)', justifyContent: 'center' }}
            >
              <CheckIcon /> Flexibilidad de cancelación.
            </p>
          </div>
          <Button size="xl" className="w-50" style={{ margin: "15px" }} onClick={() => handlePagar(membresia4.periodo,membresia4)}>
            Pagar
          </Button>

        </CajaFiltro>


      </div></>

  )
}
