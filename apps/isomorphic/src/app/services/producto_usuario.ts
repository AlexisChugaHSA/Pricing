import axios from 'axios';
import { GLOBAL } from './global.service';

export const url = GLOBAL.url

export interface ProductoUsuario {
  id_producto_usuario?: number,
  id_usuario: number,
  id_producto: number,
  id_pago: number,
  activo: number,
  precio: number,
  periodo: number
}

export async function guardarProductoUsuario(productoUsuario: ProductoUsuario, token: string): Promise<ProductoUsuario> {
  try {
    const response = await axios.post<ProductoUsuario>(url + 'producto-usuario', productoUsuario, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al guardar el producto de usuario:', error);
    throw error;
  }
}
export async function obtenerProductoUsuarioById(
  id: number,
  token: string
): Promise<ProductoUsuario[]> {
  try {
    // 👇 OJO: tipamos la respuesta de axios
    const { data } = await axios.get<ProductoUsuario | ProductoUsuario[]>(
      `${url}producto-usuario/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Normalizamos: si viene obj -> [obj]; si ya es array -> tal cual; si viene null/undefined -> []
    if (Array.isArray(data)){
      console.log(data) 
      return data;}
      console.log(data) 
    return data ? [data] : [];
  } catch (error) {
    console.error('Error al obtener los productos del usuario:', error);
    throw error;
  }
}