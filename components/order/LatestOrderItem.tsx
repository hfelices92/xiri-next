import { OrderWithItems } from "@/src/types";

type LatestOrderItemProps = {
  order: OrderWithItems;
};
export default function LatestOrderItem({ order }: LatestOrderItemProps) {
  return (
    <div className="bg-white shadow p-5 space-y-5 rounded-lg">
      <h2 className="text-2xl font-bold text-slate-600">
        Cliente: {order.name}
      </h2>
      <div>
        <h3 className="text-lg font-semibold mb-2">Productos del Pedido:</h3>
        <ul className="list-disc list-inside space-y-1 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-600">
          {order.orderItems.map((item) => (
            <li key={item.id} className="flex py-6 text-sm">
              <p>
                <span className="font-bold">{item.quantity}</span> x{" "}
                {item.product.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
