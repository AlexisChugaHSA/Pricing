import axios from 'axios';
import { GLOBAL } from './global.service';

export const url=GLOBAL.url

export interface Membresia {
id_membresia:number,
tipo:string,
periodo:number,
descuento:number,
activo:boolean
}



export async function obtenerMembresias(): Promise<Membresia[]> {
  try {
    const response = await axios.get<Membresia[]>(url+'api/membresias');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los membresias:', error);
    throw error;
  }
}

export async function obtenerMembresiabyId(id: number): Promise<Membresia> {
  try {
    const response = await axios.get<Membresia>(url+'membresia/' + id);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la membresia:', error);
    throw error;
  }
}


