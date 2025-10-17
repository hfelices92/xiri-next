import { Order, Product, OrderItem as OrderItemModel } from "@prisma/client";

export type OrderItem = Pick<Product, "id" | "name" | "price"> & {
  quantity: number;
  subtotal: number;
};

export type OrderWithItems = Order & {
  orderItems: (OrderItemModel & {
    product: Product;
  })[];
};
