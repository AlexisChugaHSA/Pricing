import axios from 'axios';
import { GLOBAL } from './global.service';

export const url=GLOBAL.url

export interface Filtro {
  value: string; 
  label: string; 
}


// Obtener años
export async function obtenerAñosFiltro(id:string): Promise<Filtro[]> {
  try {
    const response = await axios.get<Filtro[]>(url + 'año-filtro/'+id);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los años-filtro:', error);
    throw error;
  }
}

// Obtener empresas
export async function obtenerEmpresasFiltro(id:string): Promise<Filtro[]> {
  try {
    const response = await axios.get<Filtro[]>(url + 'empresa-filtro/'+id);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las empresas-filtro:', error);
    throw error;
  }
}

// Obtener marcas
export async function obtenerMarcasFiltro(id:string): Promise<Filtro[]> {
  try {
    const response = await axios.get<Filtro[]>(url + 'marca-filtro/'+id);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las marcas-filtro:', error);
    throw error;
  }
}

// Obtener gamas
export async function obtenerGamasFiltro(id:string): Promise<Filtro[]> {
  try {
    const response = await axios.get<Filtro[]>(url + 'gama-filtro/'+id);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las gamas-filtro:', error);
    throw error;
  }
}

// Obtener características
export async function obtenerCaracteristicasFiltro(id:string): Promise<Filtro[]> {
  try {
    const response = await axios.get<Filtro[]>(url + 'caracteristica-filtro/'+id);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las características-filtro:', error);
    throw error;
  }
}

// Obtener modelos
export async function obtenerModelosFiltro(id:string): Promise<Filtro[]> {
  try {
    const response = await axios.get<Filtro[]>(url + 'modelo-filtro/'+id);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los modelos-filtro:', error);
    throw error;
  }
}

const Meses = [
  { value: "01", label: "Enero" },
  { value: "02", label: "Febrero" },
  { value: "03", label: "Marzo" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Mayo" },
  { value: "06", label: "Junio" },
  { value: "07", label: "Julio" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" }
];

export default Meses;