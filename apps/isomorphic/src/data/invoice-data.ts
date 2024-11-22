import { number } from "zod"

export type Invoice = {
  id_factura:number,
  id_empresa:number,
  total:number,  
  subtotal:number,
  fecha:string,
  iva:number,  
  iva_0:number,  
  ruc_empresa:string,
  nombre_empresa:string,
  telefono_empresa:string,
  correo_empresa:string,
  id_usuario:number
};

export const invoiceData = [
  {
    id_factura:1,
    id_empresa:1,
    total:100.0,  
    subtotal:90.0,
    fecha:'2024-11-13',
    iva:0.15,  
    iva_0:0.15,  
    ruc_empresa:'132135',
    nombre_empresa:'hsa',
    telefono_empresa:'1235456',
    correo_empresa:'hsa@gmail.com',
    id_usuario:1
  },
  {
    id_factura:2,
    id_empresa:1,
    total:200.0,  
    subtotal:90.0,
    fecha:'2024-11-10',
    iva:0.15,  
    iva_0:0.15,  
    ruc_empresa:'132135',
    nombre_empresa:'hsa',
    telefono_empresa:'1235456',
    correo_empresa:'hsa@gmail.com',
    id_usuario:1
  }
];
