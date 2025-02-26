import axios from 'axios';
import { GLOBAL } from './global.service';

export const url=GLOBAL.url

export interface Producto {
    id_producto:number;
    id_categoria:number;
    nombre:string;
    descripcion:string;    
    precio:number;  
    descuento:number;
    url:string; 
    imagen:string;
    tags:string;  
}

export async function obtenerProductos(): Promise<Producto[]> {
  try {
    const response = await axios.get<Producto[]>(url+'productos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
}

export async function obtenerProductobyId(id: string): Promise<Producto> {
  try {
    const response = await axios.get<Producto>(url+'producto/' + id);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
}
