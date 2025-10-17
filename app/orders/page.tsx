"use client";
import LatestOrderItem from "../../components/order/LatestOrderItem";
import Logo from "../../components/ui/Logo";
import { OrderWithItems } from "../../src/types";
import React from "react";
import useSWR from "swr";

export default function OrdersPage() {
    const url = "/orders/api";
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const {
    data: orders,
    error,
    isLoading,
  } = useSWR<OrderWithItems[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });
    if (isLoading) return <p className="text-center">Cargando pedidos...</p>;
    if (error) return <p className="text-center">Error al cargar los pedidos</p>;
    if (orders)
  return (
    <>
      <h1 className="text-center mt-20 text-6xl font-black">Pedidos Listos</h1>
      <Logo />
        {orders.length === 0 ? (
            <p className="text-center">No hay pedidos listos para entregar</p>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5 max-w-5xl mx-auto">
            {orders.map((order) => (
                <LatestOrderItem key={order.id} order={order} />
            ))}
            </div>
        )}

    </>
  );
}
