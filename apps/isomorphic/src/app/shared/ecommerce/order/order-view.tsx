'use client';

import Image from 'next/image';
import { useAtomValue } from 'jotai';
import isEmpty from 'lodash/isEmpty';
import { PiCheckBold } from 'react-icons/pi';
import Membresias from './membresias';
import {
  billingAddressAtom,
  orderNoteAtom,
  shippingAddressAtom,
} from '@/store/checkout';
import OrderViewProducts from '@/app/shared/ecommerce/order/order-products/order-view-products';
import { useCart } from '@/store/quick-cart/cart.context';
import { Title, Text, Button } from 'rizzui';
import cn from '@utils/class-names';
import { toCurrency } from '@utils/to-currency';
import { formatDate } from '@utils/format-date';
import usePrice from '@hooks/use-price';
import PayPalButtonComponent from '@/app/services/paypal.service';
import { guardarFactura, Iva, obtenerIva } from '@/app/services/factura.service';
import { useEffect, useState } from 'react';
import { Membresia } from '@/app/services/membresia.service';
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from 'rizzui';
import { PhoneNumber } from '@ui/phone-input';
import * as z from 'zod';
import { Empresa, comprobarEmpresa, guardarEmpresa } from '@/app/services/empresa.service';
import { Factura, DetFactura,guardarDetalleFactura } from '@/app/services/factura.service';
import { guardarPago, Pago } from '@/app/services/pago.service';
import { guardarMetodoPago, MetodoPago } from '@/app/services/metodo_pago.service';
import { ProductoUsuario,guardarProductoUsuario } from '@/app/services/producto_usuario.service copy';


const orderStatus = [
  { id: 1, label: 'Selección de productos' },
  { id: 2, label: 'Creación de orden' },
  { id: 3, label: 'Selección de membresía' },
  { id: 4, label: 'Realizar el pago' },
];

const currentOrderStatus = 3;

const facturaSchema = z.object({
  dniRuc: z.string().min(10, 'Debe tener al menos 10 caracteres'),
  nombre: z.string().min(3, 'El nombre es obligatorio'),
  correo: z.string().email('Ingrese un correo válido'),
  direccion: z.string().min(1, 'La dirección es obligatoria'),
  telefono: z.string().min(10, 'Ingrese un número válido'),
});

type FacturaFormInput = z.infer<typeof facturaSchema>;


function WidgetCard({
  title,
  className,
  children,
  childrenWrapperClass,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
  childrenWrapperClass?: string;
}) {
  return (
    <div className={className}>
      <Title
        as="h3"
        className="mb-3.5 text-base font-semibold @5xl:mb-5 4xl:text-lg"
      >
        {title}
      </Title>
      <div
        className={cn(
          'rounded-lg border border-muted px-5 @sm:px-7 @5xl:rounded-xl',
          childrenWrapperClass
        )}
      >
        {children}
      </div>
    </div>
  );
}


export default function OrderView() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No hay token disponible');
    return;
  }
  const id_usuario=45;
  const { items, total, totalItems } = useCart();
  const [iva, setIva] = useState<Iva | null>(null);
  const storedMembresia = localStorage.getItem('membresia');
  const [empresa, setEmpresa] = useState<Partial<Empresa>>({});
  const [factura, setFactura] = useState<Partial<Factura>>({});

  let membresia: Membresia | null = null;
  if (storedMembresia) {
    try {
      membresia = JSON.parse(storedMembresia) as Membresia;
    } catch (error) {
      console.error('Error al parsear la membresía desde localStorage:', error);
      localStorage.removeItem('membresia'); // Eliminar datos corruptos
    }
  }

  const transformToPayPalItems = (items: any[]) => {
    return items.map((product) => ({
      name: product.name,
      unit_amount: {
        currency_code: "USD",
        value: (
          membresia
            ? product.price * (1 - membresia.descuento)
            : product.price
        ).toFixed(2)
      },
      quantity: product.quantity.toString()
    }));
  };

  const paypalItems = transformToPayPalItems(items);

  const { price: subtotal } = usePrice(
    items && {
      amount: total,
    }
  );
  const { price: totalPrice } = usePrice({
    amount: total,
  });
  const orderNote = useAtomValue(orderNoteAtom);

  useEffect(() => {
    const loadIva = async () => {
      try {
        const data = await obtenerIva(token);
        setIva(data);
      } catch (error) {
        console.error('Error al cargar el valor del IVA:', error);
      }
    };
    loadIva();
  }, []);

  const periodo=membresia?.periodo??1;
  const iva_valor=iva?.iva_valor??0.15
  const subtotalValue = parseFloat(subtotal.replace(/[^0-9.]/g, "")) || 0;
  const descuentoValue = membresia?.descuento ?? 0;
  const descuento = subtotalValue * descuentoValue;
  const totalDescuento = subtotalValue * (1 - descuentoValue);
  const totalIva = iva ? iva.iva_valor * totalDescuento : totalDescuento;
  const totalF = totalIva + totalDescuento



  if (iva === null && membresia === null && totalDescuento === null && paypalItems === null) {
    return <div>Cargando...</div>;
  }
  const methods = useForm<FacturaFormInput>({
    resolver: zodResolver(facturaSchema),
  });
  const handleDniBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const dniRuc = event.target.value.trim();
    if (!dniRuc) return;
    methods.setValue('nombre', '');
    methods.setValue('correo', '');
    methods.setValue('direccion', '');
    methods.setValue('telefono', '');
    try {
      const empresa = await comprobarEmpresa(dniRuc);
      if (empresa) {
        methods.setValue('nombre', empresa.nombre);
        methods.setValue('correo', empresa.correo);
        methods.setValue('direccion', empresa.direccion);
        methods.setValue('telefono', empresa.telefono);
      }
    } catch (error) {
      console.error('Error al cargar la empresa:', error);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      let empresaData: Empresa;
      if (empresa?.id_empresa) {
        empresaData = {
          id_empresa:       empresa.id_empresa,
          id_metodo_pago:   40,  
          identificacion:   empresa.identificacion!, 
          nombre:           empresa.nombre!,
          direccion:        empresa.direccion!,
          telefono:         empresa.telefono!,
          correo:           empresa.correo!
        };
        console.log("Usando empresa existente:", empresaData);
      } else {
        const nuevaEmpresa: Omit<Empresa, 'id_empresa'> = {
          id_metodo_pago: 40,       
          identificacion: data.dniRuc,
          nombre: data.nombre,
          direccion: data.direccion,
          telefono: data.telefono,
          correo: data.correo
        };
        console.log("Creando nueva empresa:", nuevaEmpresa);
        const empresaGuardada = await guardarEmpresa(nuevaEmpresa, token);
        if (!empresaGuardada?.id_empresa) {
          throw new Error("No se ha podido guardar la empresa");
        }
        empresaData = empresaGuardada;
        console.log("Empresa guardada:", empresaData);
      }
      setFactura((prev) => ({
        ...prev,
        id_empresa:        empresaData.id_empresa,
        nombre_empresa:    empresaData.nombre,
        ruc_empresa:       empresaData.identificacion,
        correo_empresa:    empresaData.correo,
        direccion_empresa: empresaData.direccion,
        telefono_empresa:  empresaData.telefono
      }));
      console.log("Estado de factura actualizado con empresa:", empresaData.id_empresa);
  
    } catch (error: any) {
      console.error("Error en onSubmit de empresa:", error);
      alert("No se pudo procesar la información de la empresa. Intenta de nuevo.");
    }
  };
  
  const today = new Date();
  const fechaHoy = today.toISOString().split('T')[0];
  const fechaHastaDate = new Date(today.setMonth(today.getMonth() + periodo));
  const fechaHasta = fechaHastaDate.toISOString().split('T')[0];
  const nombresConcatenados = items.map(item => item.name).join('-');
/*
  const handlePaymentApproved = async (orderId: string,nombre_cliente:string) => {
    const metodoPago: MetodoPago = {
      nombre:nombre_cliente,
      tarjeta:orderId
    };
    const metodoPagoR = await guardarMetodoPago(metodoPago, token);
    console.log("Metodo pago guardado");
    const pago: Pago={
      id_empresa:empresa.id_empresa,
      procesado:1,
      intentos:0,
      valor:parseFloat(totalF.toFixed(2)),
      descuento:parseFloat(descuentoValue.toFixed(2)),
      cancelado:0,
      detalle:nombresConcatenados,
      fecha:fechaHoy,
      fecha_hasta:fechaHasta,
      periodo:periodo
    }
    const pagoR = await guardarPago(pago,token);
    console.log("Pago guardada");
    setFactura((prev) => ({...prev, fecha:fechaHoy,id_metodo_pago:metodoPagoR.id_metodo_pago,
      sri:"",subtotal:parseFloat(totalDescuento.toFixed(2)),total:parseFloat(totalF.toFixed(2)),
      iva: iva_valor,iva_0:iva_valor
    }))
    const facturaCompleta: Factura = {
      ...factura as Factura
    };
    const facturaR = await guardarFactura(facturaCompleta,token)
    console.log("Factura guardada");
    if (!facturaR.id_factura || !pagoR.id_pago) {
      throw new Error("Faltan datos en factura o pago");
    }
    const detalleFactura:DetFactura={
      id_factura:facturaR.id_factura,
      id_pago:pagoR.id_pago,
    }
    let productosGuardados = 0;
    const totalProductos = items.length;
  
    for (const producto of items) {
      try {
        const detalle = {
          ...detalleFactura,
          id_producto: producto.id,
          precio:parseFloat(producto.price.toFixed(2))
        };
  
        await guardarDetalleFactura(detalle,token);
        productosGuardados++;
        console.log("Detalle factura guardado");
  
        if (productosGuardados === totalProductos) {
          const totalProductos = items.length;
          let productosGuardados = 0;
          for (const producto of items) {
            const prod_user: ProductoUsuario = {
              id_usuario: id_usuario,
              activo: 1,
              id_pago: pagoR.id_pago,
              periodo: periodo,
              id_producto: producto.id,
              precio: producto.price
            };
          
            try {
              const result = await guardarProductoUsuario(prod_user, token);
              productosGuardados++;
              console.log("Producto-Usuario guardado");
              if (productosGuardados === totalProductos) {
                console.log("Todo se ha guardado con éxito")
              }
            } catch (error) {
              console.error("Error al guardar Producto-Usuario:", error);
              break; 
            }
          }
          
        }
      } catch (error) {
        console.error("Error al guardar detalle:", error);
        alert("Error al guardar el pago"); // Aquí puedes usar un modal también
        break;
      }
    }
    
  };*/
  const handlePaymentApproved = async (orderId: string, nombre_cliente: string) => {
    try {
      // 1. Guardar método de pago
      const metodoPago: MetodoPago = {
        nombre: nombre_cliente,
        tarjeta: orderId,
      };
      const metodoPagoR = await guardarMetodoPago(metodoPago, token);
      console.log("Método de pago guardado");
  
      // 2. Guardar pago
      if (!factura?.id_empresa) {
        throw new Error('Faltan datos de empresa o usuario en factura');
      }
      const pago: Pago = {
        id_empresa: factura.id_empresa,
        procesado: 1,
        intentos: 0,
        valor: parseFloat(totalF.toFixed(2)),
        descuento: parseFloat(descuentoValue.toFixed(2)),
        cancelado: 0,
        detalle: nombresConcatenados,
        fecha: fechaHoy,
        fecha_hasta: fechaHasta,
        periodo: periodo,
      };

      const pagoR:any = await guardarPago(pago, token);
      console.log("Pago guardado");
      if (!pagoR?.id_pago || !metodoPagoR?.id_metodo_pago) {
        throw new Error("No se pudo guardar el pago o el método de pago.");
      }

      if (
        !factura?.id_empresa ||
        !factura?.nombre_empresa ||
        !factura?.ruc_empresa ||
        !factura?.telefono_empresa ||
        !factura?.correo_empresa
      ) {
        throw new Error('Faltan datos de empresa o usuario en factura');
      }
  
      // 3. Preparar factura
      const facturaCompleta: Factura = {
        id_empresa:        factura.id_empresa,
        nombre_empresa:    factura.nombre_empresa,
        ruc_empresa:       factura.ruc_empresa,
        telefono_empresa:  factura.telefono_empresa,
        correo_empresa:    factura.correo_empresa,
        id_usuario:        id_usuario,
        fecha:             fechaHoy,
       // id_metodo_pago:    metodoPagoR.id_metodo_pago,
        sri:               "",
        subtotal:          parseFloat(totalDescuento.toFixed(2)),
        total:             parseFloat(totalF.toFixed(2)),
        iva:               iva_valor,
        iva_0:             iva_valor,
      };
      console.log(facturaCompleta)
  
      // 4. Guardar factura
      const facturaR = await guardarFactura(facturaCompleta, token);
      console.log("Factura guardada");
  
      if (!pagoR?.id_pago || !facturaR?.id_factura) {
        throw new Error("No se pudo guardar la factura.");
      }
  
      // 5. Guardar detalles de factura
      const detalleFacturaBase: DetFactura = {
        id_factura: facturaR.id_factura,
        id_pago: pagoR.id_pago,
      };
  
      for (const producto of items) {
        const detalle: DetFactura = {
          ...detalleFacturaBase,
          id_producto: producto.id,
          precio: parseFloat(producto.price.toFixed(2)),
        };
  
        try {
          await guardarDetalleFactura(detalle, token);
          console.log("Detalle factura guardado");
        } catch (error) {
          console.error("Error al guardar detalle de factura:", error);
          throw new Error("Error guardando detalles de factura. Proceso abortado.");
        }
      }
  
      // 6. Guardar productos del usuario
      for (const producto of items) {
        const prod_user: ProductoUsuario = {
          id_usuario,
          activo: 1,
          id_pago: pagoR.id_pago,
          periodo,
          id_producto: producto.id,
          precio: producto.price,
        };
  
        try {
          await guardarProductoUsuario(prod_user, token);
          console.log("Producto-Usuario guardado");
        } catch (error) {
          console.error("Error al guardar Producto-Usuario:", error);
          throw new Error("Error guardando productos del usuario. Proceso abortado.");
        }
      }
  
      console.log("Todo el proceso se ejecutó correctamente.");
    } catch (error: any) {
      console.error("Error general en el proceso de pago:", error);
      alert("Ocurrió un error durante el proceso. Por favor, intente nuevamente.");
    }
  };
  

  return (
    <div className="@container">
      <div className="flex flex-wrap justify-center border-b border-t border-gray-300 py-4 font-medium text-gray-700 @5xl:justify-start">
        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
          {formatDate(new Date(), 'MMMM D, YYYY')} at{' '}
          {formatDate(new Date(), 'h:mm A')}
        </span>
        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
          {totalItems} Items
        </span>
        <span className="my-2 border-r border-muted px-5 py-0.5 first:ps-0 last:border-r-0">
          Total {totalPrice}
        </span>
        <span className="my-2 ms-5 rounded-3xl border-r border-muted bg-green-lighter px-2.5 py-1 text-xs text-green-dark first:ps-0 last:border-r-0">
          Paid
        </span>
      </div>
      <div className="items-start pt-10 @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <div className="space-y-7 @5xl:col-span-8 @5xl:space-y-10 @6xl:col-span-7" style={{ justifyItems: 'center' }}>
          {orderNote && (
            <div className="">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">
                Notes About Order
              </span>
              <div className="rounded-xl border border-muted px-5 py-3 text-sm leading-[1.85]">
                {orderNote}
              </div>
            </div>
          )}

          <div className="pb-5">
            <OrderViewProducts />
            <div className="border-t border-muted pt-7 @5xl:mt-3">
              <div className="ms-auto max-w-lg space-y-6">
                <div className="flex font-medium text-center" style={{ justifyContent: 'end' }}>
                  <del className='text-red'>{subtotal}</del>
                </div>
                {membresia && (
                  <div className="flex justify-between font-medium">
                    Descuento (-{membresia.descuento * 100}%): <span>-{toCurrency(descuento)}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium">
                  Subtotal: <span>{toCurrency(totalDescuento)}</span>
                </div>
                {iva && (
                  <div className="flex justify-between font-medium">
                    IVA ({iva.iva_valor * 100}%): <span>{toCurrency(totalIva)}</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-muted pt-5 text-base font-semibold">
                  Total <span>{toCurrency(totalF)}</span>
                </div>
              </div>
            </div>
          </div>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className={cn('isomorphic-form flex flex-col gap-4')}
            >
              <Title as="h3" className="font-semibold">Datos de facturación (Obligatorio)</Title>

              <Input
                label="DNI / RUC"
                placeholder="Ingrese su DNI o RUC"
                {...methods.register('dniRuc')}
                error={methods.formState.errors.dniRuc?.message}
                onBlur={(e) => handleDniBlur(e)}
              />

              <Input
                label="Nombre"
                placeholder="Ingrese su nombre completo"
                {...methods.register('nombre')}
                error={methods.formState.errors.nombre?.message}
              />

              <Input
                label="Correo"
                type="email"
                placeholder="Ingrese su correo"
                {...methods.register('correo')}
                error={methods.formState.errors.correo?.message}
              />

              <Input
                label="Dirección"
                placeholder="Ingrese su dirección"
                {...methods.register('direccion')}
                error={methods.formState.errors.direccion?.message}
              />

              <Controller
                name="telefono"
                control={methods.control}
                render={({ field }) => (
                  <PhoneNumber
                    label="Teléfono"
                    country="us"
                    value={field.value}
                    onChange={field.onChange}
                    error={methods.formState.errors.telefono?.message}
                  />
                )}
              />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="submit" size="xl" className="w-40" style={{ margin: "15px" }}>
                  Guardar
                </Button>
              </div>

            </form>
          </FormProvider>
          <div className="" style={{ maxWidth: '400px', justifyContent: 'end' }}>
            < PayPalButtonComponent iva={iva?.iva_valor} paypalItems={paypalItems} subtotal={totalDescuento} onPaymentApproved={handlePaymentApproved} />
          </div>
        </div>

        <div className="space-y-7 pt-8 @container @5xl:col-span-4 @5xl:space-y-10 @5xl:pt-0 @6xl:col-span-3">
          <WidgetCard
            title="Order Status"
            childrenWrapperClass="py-5 @5xl:py-8 flex"
          >
            <div className="ms-2 w-full space-y-7 border-s-2 border-gray-100">
              {orderStatus.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "relative ps-6 text-sm font-medium before:absolute before:-start-[9px] before:top-px before:h-5 before:w-5 before:-translate-x-px before:rounded-full before:bg-gray-100 before:content-[''] after:absolute after:-start-px after:top-5  after:h-10 after:w-0.5  after:content-[''] last:after:hidden",
                    currentOrderStatus > item.id
                      ? 'before:bg-primary after:bg-primary'
                      : 'after:hidden',
                    currentOrderStatus === item.id && 'before:bg-primary'
                  )}
                >
                  {currentOrderStatus >= item.id ? (
                    <span className="absolute -start-1.5 top-1 text-white">
                      <PiCheckBold className="h-auto w-3" />
                    </span>
                  ) : null}

                  {item.label}
                </div>
              ))}
            </div>
          </WidgetCard>
        </div>
      </div>
    </div>

  );
}
