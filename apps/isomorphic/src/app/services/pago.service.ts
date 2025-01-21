import axios from 'axios';
import { GLOBAL } from './global.service';

export const url=GLOBAL.url

export interface Pago {
  id_pago: number;
  id_empresa: number;
  valor: number;
  descuento: number;
  periodo: number;
  fecha: string;
  procesado: number;
  intentos: number;
  detalle: string;
  cancelado: number;
  fecha_hasta: string;
}



export async function obtenerPagobyId(id: number, token: string): Promise<Pago> {
  try {
    const response = await axios.get<Pago>(url+'pago/'+id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los pagos:', error);
    throw error;
  }
}
