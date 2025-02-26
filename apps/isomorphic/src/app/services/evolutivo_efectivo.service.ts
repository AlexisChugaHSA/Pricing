import axios from 'axios';
import { GLOBAL } from './global.service';

export const url=GLOBAL.url

export interface Evolutivo_Efectivo {
  mes: string;
  almacenes_japon: number;
  artefacta: number;
  computron: number;
  crecos: number;
  jaher: number;
  la_ganga: number;
  marcimex: number;
  novicompu: number;
  point: number;
  super_paco: number;
}

export interface Evolutivo_Efectivo_Mes {
  dia: string;
  almacenes_japon: number;
  artefacta: number;
  computron: number;
  crecos: number;
  jaher: number;
  la_ganga: number;
  marcimex: number;
  novicompu: number;
  point: number;
  super_paco: number;
}



export async function obtenerDatos(token: string, mes?: string): Promise<Evolutivo_Efectivo[]> {
  try {
    const urlFinal = mes ? `${url}evolutivo-efectivo/${mes}` : `${url}evolutivo-efectivo`;

    const response = await axios.get<Evolutivo_Efectivo[]>(urlFinal, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener datos Evolutivo-Efectivo', error);
    throw error;
  }
}

export async function obtenerDatosPorMes( token: string,mes?:string): Promise<Evolutivo_Efectivo_Mes[]> {
  try {
    const response = await axios.get<Evolutivo_Efectivo_Mes[]>(url+'evolutivo-efectivo/'+mes, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos Evolutivo-Efectivo', error);
    throw error;
  }
}

