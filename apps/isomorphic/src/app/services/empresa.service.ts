import axios from 'axios';
import { GLOBAL } from './global.service';

export const url=GLOBAL.url

export interface Empresa {
id_empresa?:number,
id_metodo_pago?:number,//borrar
identificacion:string,
nombre:string,
direccion:string,
telefono:string,
correo:string
}

export async function guardarEmpresa(empresa: Empresa, token: string): Promise<Empresa> {
  try {
    const response = await axios.post<Empresa>(url + 'empresa', empresa, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al guardar la empresa:', error);
    throw error;
  }
}

export async function obtenerEmpresabyId(id: number): Promise<Empresa> {
  try {
    const response = await axios.get<Empresa>(url+'empresa/' + id);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la empresa:', error);
    throw error;
  }
}
export async function comprobarEmpresa(identificacion: string): Promise<Empresa> {
  try {
    const response = await axios.get<Empresa>(url+'empresa-existe/' + identificacion);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la empresa:', error);
    throw error;
  }
}


