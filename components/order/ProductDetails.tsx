import { OrderItem } from "@/src/types";
import React, { useMemo } from "react";
import { XCircleIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "@/src/utils";
import { useStore } from "@/src/store";

type ProductDetailsProps = {
  item: OrderItem;
};
export default function ProductDetails({ item }: ProductDetailsProps) {
  const increaseQuantity = useStore((state) => state.increaseQuantity);
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);
  const removeFromOrder = useStore((state) => state.removeFromOrder);

  const disableDescreaseButton = useMemo(() => {
    return item.quantity === 1;
  }, [item]);
  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button
            type="button"
            onClick={() => removeFromOrder(item.id)}
            className="cursor-pointer"
          >
            <XCircleIcon className="text-red-600 h-8 w-8 " />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">
          {formatCurrency(item.price)}
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            disabled={disableDescreaseButton}
            className="disabled:opacity-20 cursor-pointer disabled:cursor-auto"
          >
            <MinusIcon className="h-6 w-6 " />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            className="cursor-pointer"
          >
            <PlusIcon className="h-6 w-6 " />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">{formatCurrency(item.subtotal)}</span>
        </p>
      </div>
    </div>
  );
}
