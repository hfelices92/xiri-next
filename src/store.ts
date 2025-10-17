import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@/app/generated/prisma";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromOrder: (id: number) => void;
  clearOrder: () => void;
 
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    const { categoryId, image, ...data } = product;
    let items: OrderItem[] = get().order;
    if (get().order.find((item) => item.id === product.id)) {
      items = get().order.map((item) => {
        if (item.id === product.id) {
          const quantity = item.quantity + 1;
          return {
            ...item,
            quantity,
            subtotal: quantity * item.price,
          };
        }
        return item;
      });
    } else {
      items = [
        ...get().order,
        {
          ...data,
          quantity: 1,
          subtotal: 1 * data.price,
        },
      ];
    }
    set({ order: items });
  },
  increaseQuantity: (id) => {
    const items = get().order.map((item) => {
      if (item.id === id) {
        const quantity = item.quantity + 1;
        return {
          ...item,
          quantity,
          subtotal: quantity * item.price,
        };
      }
      return item;
    });
    set({ order: items });
  },
  decreaseQuantity: (id) => {
    const items = get().order.map((item) => {
      if (item.id === id && item.quantity > 1) {
        const quantity = item.quantity - 1;
        return {
          ...item,
          quantity,
          subtotal: quantity * item.price,
        };
      }
      return item;
    });
    
    set({ order: items });
  },
  removeFromOrder: (id) => {
    const items = get().order.filter((item) => item.id !== id);
    set({ order: items });
  },
  clearOrder: () => set({ order: [] }),
  
}));
