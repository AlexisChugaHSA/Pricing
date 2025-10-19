import axios from 'axios';
import { GLOBAL } from './global.service';

export const url=GLOBAL.url

export interface Factura {
  id_factura?: number;
  id_metodo_pago?:number; 
  id_empresa: number;
  total: number;
  subtotal: number;
  fecha: string;
  iva: number;
  iva_0: number;
  ruc_empresa: string;
  nombre_empresa: string;
  telefono_empresa: string;
  correo_empresa: string;
  direccion_empresa?:string; 
  id_usuario: number;
  sri:string;
}

export interface DetFactura {
  id_detalle_factura?: number;
  id_pago: number;
  id_producto?: number;
  id_factura: number;
  precio?: number;
}
export interface Iva{
  id_iva:string;
  iva_valor:number;
}


export async function guardarFactura(factura: Factura, token: string): Promise<Factura> {
  try {
    const response = await axios.post<Factura>(url + 'facturacion', factura, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al guardar la factura:', error);
    throw error;
  }
}

export async function guardarDetalleFactura(detalle: DetFactura, token: string): Promise<DetFactura> {
  try {
    const response = await axios.post<DetFactura>(url + 'detalle-factura', detalle, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al guardar el detalle de factura:', error);
    throw error;
  }
}

export async function obtenerFacturas(id: number, token: string): Promise<Factura[]> {
  try {
    const response = await axios.get<Factura[]>(url+'facturas-by-user/'+id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las facturas:', error);
    throw error;
  }
}

export async function obtenerFactbyId(id: number, token: string): Promise<Factura> {
  try {
    const response = await axios.get<Factura>(url+'facturacion/'+id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las facturas:', error);
    throw error;
  }
}

export async function obtenerDetFactbyId(id: number, token: string): Promise<DetFactura[]> {
  try {
    const response = await axios.get<DetFactura[]>(url+'detalle-facturas-fact/'+id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las facturas:', error);
    throw error;
  }
}

export async function obtenerIva( token: string): Promise<Iva> {
  try {
    const response = await axios.get<Iva>(url+'iva', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las facturas:', error);
    throw error;
  }
}