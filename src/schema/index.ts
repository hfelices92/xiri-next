import z from "zod";

export const OrderSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  total: z.number().min(1, "Hay que añadir al menos un producto al pedido"),
  order: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number().min(1),
      subtotal: z.number(),
    })
  ),
});

export const OderIdSchema = z.object({
  order_id: z
    .string()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, {
      message: "El ID de la orden debe ser un número válido",
    }),
});


export const SearchSchema = z.object({
  search: z.string().trim().min(1, "El término de búsqueda es obligatorio"),
})


export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio'}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    image: z.string().min(1, { message: 'La Imagen del Producto es Obligatoria' }),
})