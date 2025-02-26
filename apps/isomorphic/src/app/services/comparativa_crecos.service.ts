import axios from 'axios';
import { GLOBAL } from './global.service';

export const url=GLOBAL.url

export interface Comparativa_Crecos {
  id: string;
  nombre: string;
  efectivo: string;
  porcentaje_efectivo: string
  cuota: string;
  porcentaje_cuota: string
  plazo: string;
  productos: Product[];
}

export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  imagen: string;
  precio_credito?: string; 
  porcentaje_credito:string;
  cuotas?: number; 
  precio_contado?: string; 
  porcentaje_contado:string;
  modelo?: string; 
  marca?: string; 
  caracteristica?: string;
  url?:string;
}



export async function obtenerDatos( token: string): Promise<Comparativa_Crecos[]> {
  try {
    const response = await axios.get<Comparativa_Crecos[]>(url+'comparativa-crecos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos Comparativa-Crecos', error);
    throw error;
  }
}


