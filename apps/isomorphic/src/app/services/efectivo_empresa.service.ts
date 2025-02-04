import axios from 'axios';
import { GLOBAL } from './global.service';

export const url=GLOBAL.url

export interface Efectivo_Empresa {
  empresa: string;
  efectivo: number;
}



export async function obtenerDatos( token: string): Promise<Efectivo_Empresa[]> {
  try {
    const response = await axios.get<Efectivo_Empresa[]>(url+'empresa-efectivo', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos Efectivo- EMpresa', error);
    throw error;
  }
}


