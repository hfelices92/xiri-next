"use client";
import { Product } from "@prisma/client";
import { useStore } from "@/src/store";
import React from "react";

type AddProductToCartButtonProps = {
  product: Product;
};
export default function AddProductToCartButton({
  product,
}: AddProductToCartButtonProps) {
  const addToOrder = useStore((state) => state.addToOrder);

  return (
    <button
      type="button"
      className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded"
      onClick={() => {
        addToOrder(product);
      }}
    >
      Añadir
    </button>
  );
}
