"use client";
import { completeOrder } from "@/actions/complete-order-action";
import { OrderWithItems } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import React from "react";

type OrderCardProps = {
  order: OrderWithItems;
};

export default function OrderCard({ order }: OrderCardProps) {
 
  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
    >
      <p className="text-2xl font-medium text-gray-900">
        Cliente: {order.name}{" "}
      </p>
      <p className="text-lg font-medium text-gray-900">Productos del Pedido:</p>
      <dl className="mt-6 space-y-4">
        {order.orderItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 border-t border-gray-200 pt-4"
          >
            <dt className="font-bold">{item.quantity} x</dt>
            <dd>{item.product.name}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">
            Total a Pagar: {formatCurrency(order.total)}
          </dt>
          <dd className="text-base font-medium text-gray-900">{}</dd>
        </div>
      </dl>

      <form action={completeOrder}>
        <input type="hidden" name="order_id" value={order.id} />
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Completar Pedido"
        />
      </form>
    </section>
  );
}
