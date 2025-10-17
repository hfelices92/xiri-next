"use client";
import Heading from "../../../components/ui/Heading";
import React from "react";
import OrderCard from "../../../components/order/OrderCard";
import useSWR from "swr";
import { OrderWithItems } from "../../../src/types";

export default function AdminOrdersPage() {
  const url = "/admin/orders/api";
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
        <Heading>Administrar pedidos</Heading>

        {orders.length === 0 ? (
          <p className="text-center">No hay pedidos pendientes</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </>
    );
}
