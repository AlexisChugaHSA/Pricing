import axios from 'axios';
import { GLOBAL } from './global.service';

export const url=GLOBAL.url

export interface Evolutivo_Precio_Credito {
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
export interface Evolutivo_Precio_Contado {
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


export async function obtenerDatosPCredito(token: string, mes?: string): Promise<Evolutivo_Precio_Credito[]> {
  try {
    const urlFinal = mes ? `${url}evolutivo-efectivo/${mes}` : `${url}evolutivo-efectivo`;
    const response = await axios.get<Evolutivo_Precio_Credito[]>(urlFinal, {
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

export async function obtenerDatosPContado(token: string, mes?: string): Promise<Evolutivo_Precio_Contado[]> {
  try {
    const urlFinal = mes ? `${url}evolutivo-efectivo/${mes}` : `${url}evolutivo-efectivo`;
    const response = await axios.get<Evolutivo_Precio_Credito[]>(urlFinal, {
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

export async function obtenerDatosCuota(token: string, mes?: string): Promise<Evolutivo_Precio_Credito[]> {
  try {
    const urlFinal = mes ? `${url}evolutivo-efectivo/${mes}` : `${url}evolutivo-efectivo`;
    const response = await axios.get<Evolutivo_Precio_Credito[]>(urlFinal, {
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

export async function obtenerDatosEfectivo(token: string, mes?: string): Promise<Evolutivo_Precio_Contado[]> {
  try {
    const urlFinal = mes ? `${url}evolutivo-efectivo/${mes}` : `${url}evolutivo-efectivo`;
    const response = await axios.get<Evolutivo_Precio_Credito[]>(urlFinal, {
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


