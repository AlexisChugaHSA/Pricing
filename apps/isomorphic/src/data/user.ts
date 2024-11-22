import { number } from "zod"

export type User = {
  id_usuario?:number,
  id_empresa?:number,
  nombre?:string,
  apellido?:string,
  correo?:string,
  password?:string
};

export const UserData = [
  {
    id_usuario:1,
    id_empresa:1,
    nombre:"string",
    apellido:"string",
    correo:"string",
    password:"string"
  },

];
