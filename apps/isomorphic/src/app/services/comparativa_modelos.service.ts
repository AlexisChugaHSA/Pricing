import axios from 'axios';
import { GLOBAL } from './global.service';

export const url=GLOBAL.url

export interface Comparativa_Modelos {
  id: string;
  marca: string;
  modelo: string;
  total_efectivo: string;
  p_total_efectivo: string;
  total_cuota: string;
  p_total_cuota: string;
  total_plazo: string;
  empresas: Empresa[];
}

export interface Empresa {
  id: string;
  empresa: string;
  efectivo: string;
  p_efectivo:string
  cuota: string;
  p_cuota:string;
  plazo: string;
  url: string;
}




export async function obtenerDatos( token: string): Promise<Comparativa_Modelos[]> {
  try {
    const response = await axios.get<Comparativa_Modelos[]>(url+'comparativa-modelos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos Comparativa-Modelos', error);
    throw error;
  }
}


