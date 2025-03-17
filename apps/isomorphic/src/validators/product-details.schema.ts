import { z } from 'zod';

const messages = {
  productNameRequired: "El nombre del producto es requerido",
  productPriceRequired: "El precio del producto es requerido",
  productImageRequired: "La imagen del producto es requerida",
};

export const productDetailsSchema = z.object({
  id_producto: z.union([z.number().int(), z.string()]).optional(),
  id_categoria: z.union([z.number().int(), z.string()]).optional(),
  nombre: z.union([z.string().min(1, { message: messages.productNameRequired }), z.number()]).optional(),
  descripcion: z.union([z.string(), z.number()]).optional(),
  precio: z.union([z.number().positive({ message: messages.productPriceRequired }), z.string()]).optional(),
  descuento: z.union([z.number().min(0).max(100), z.string()]).optional(),
  url: z.union([z.string(), z.number()]).optional(),
  imagen: z.union([z.string(), z.number()]).optional(),
  tags: z.union([z.string(), z.number()]).optional(),
});
export type ProductDetailsInput = z.infer<typeof productDetailsSchema>;