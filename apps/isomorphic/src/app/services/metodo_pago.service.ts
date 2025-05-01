import axios from 'axios';
import { GLOBAL } from './global.service';

export const url=GLOBAL.url

export interface MetodoPago {
  id_metodo_pago?:number,
  tarjeta:string,
  nombre:string
}

export async function guardarMetodoPago(metodoPago: MetodoPago, token: string): Promise<MetodoPago> {
  try {
    const response = await axios.post<MetodoPago>(url + 'metodo-pago', metodoPago, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al guardar el método de pago:', error);
    throw error;
  }
}
