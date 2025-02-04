import axios from 'axios';
import { GLOBAL } from './global.service';

export const url=GLOBAL.url

export interface Indicador {
  id: string,
  titulo: string,
  valor: string,
  descripcion: string,
  porcentaje: string,
}



export async function obtenerDatos( token: string): Promise<Indicador[]> {
  try {
    const response = await axios.get<Indicador[]>(url+'indicadores', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos Indicadores', error);
    throw error;
  }
}


