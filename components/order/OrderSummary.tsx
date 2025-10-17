"use client";
import { useStore } from "@/src/store";
import { formatCurrency } from "@/src/utils";
import ProductDetails from "./ProductDetails";
import { useMemo } from "react";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function OrderSummary() {
  const { order, clearOrder } = useStore();
  const total = useMemo(() => {
    return order.reduce((total, item) => total + item.subtotal, 0);
  }, [order]);

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name")?.toString().trim(),
      total,
      order,
    };

    const result = OrderSchema.safeParse(data);
    if (result.error) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await createOrder(data);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });

      return;
    }

    toast.success("Pedido Creado Correctamente");
    clearOrder();
  };
  return (
    <aside className="lg:h-screen lg:overflow-y-auto md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-5">No hay productos en el pedido</p>
      ) : (
        <div className="my-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}

          <p className="text-2xl mt-10 font-bold text-center">
            Total a pagar:{" "}
            <span className="text-amber-500 font-black">
              {formatCurrency(total)}
            </span>
          </p>

          <form className="w-full mt-10 space-y-5" action={handleCreateOrder}>
            <input
              type="text"
              placeholder="Introduce tu nombre"
              className="bg-white border border-gray-100 w-full p-2"
              name="name"
            />
            <input
              type="submit"
              className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold hover:bg-gray-800"
              value="Confirmar Pedido"
            />
          </form>
        </div>
      )}
    </aside>
  );
}
