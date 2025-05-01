import axios from 'axios';
import { GLOBAL } from './global.service';

export const url=GLOBAL.url

export interface Usuario {
  id_usuario?: number;
  usuario: string; 
  password?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  token?:string
}

export interface UsuarioLogin{
  id_usuario?: number;
  token?:string
}

export async function guardarUsuario(usuario: Usuario): Promise<{ id_usuario: number }> {
  try {
    const response = await axios.post(url + 'guardar-usuario', usuario, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Usuario guardado exitosamente:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
    throw error;
  }
}

export async function consultarUsuarioPorId(id_usuario: number): Promise<Usuario> {
  try {
    const response = await axios.get<Usuario>(url +'usuario/'+id_usuario);
    return response.data;
  } catch (error) {
    console.error('Error al consultar el usuario por ID:', error);
    throw error;
  }
}

export async function loginUsuario(correo: string, password: string): Promise<Usuario> {
  try {
    const response = await axios.post(url+'login-prueba', {
      usuario: correo,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: Usuario = {
      id_usuario: response.data.id_usuario ?? undefined,
      usuario: response.data.usuario, 
      password: response.data.password ?? undefined, 
      nombre: response.data.nombre ?? undefined, 
      apellido: response.data.apellido ?? undefined, 
      telefono: response.data.telefono ?? undefined,
      token: response.data.token, 
    };

    return data;
  } catch (error) {
    console.error('Error al realizar el login:', error);
    throw error;
  }
}

export async function logoutUsuarioPorCorreo(usuario: string): Promise<void> {
  try {
    const response = await axios.post(url+'logout-prueba', { usuario }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Logout exitoso:', response.data);
  } catch (error) {
    console.error('Error al realizar el logout:', error);
    throw error;
  }
}

export async function comprobarUsuario(usuario: string): Promise<boolean> {
  try {
    const response = await axios.get<boolean>(url+'usuario/existe', {
      params: { usuario },
    });
    console.log('Usuario comprobado:', response.data);
    return response.data; // Devuelve true si existe, false si no.
  } catch (error) {
    console.error('Error al comprobar el usuario:', error);
    throw error;
  }
}

export async function loginUsuarioSi(usuario: Usuario): Promise<UsuarioLogin> {
  try {
    const response = await axios.post(`${url}login/si`, usuario, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    localStorage.setItem('token',response.data.token)
    return response.data;
  } catch (error) {
    console.error('Error en el login:', error);
    throw error;
  }
}