
import { Product } from "@/app/generated/prisma";
import { formatCurrency, getImagePath } from "@/src/utils";
import Image from "next/image";
import AddProductToCartButton from "./AddProductToCartButton";

type ProductCardProps = {
  product: Product;
  
};
export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image);
  return (
    <div className="border bg-white border-gray-200 rounded shadow-sm hover:shadow-lg transition-shadow duration-300 h-[450px] flex flex-col">
      <div className="relative w-full h-58">
        <Image
        src={imagePath}
        alt={`Imagen ${product.name}`}
        fill
        className="object-cover rounded-t"
      />
      </div>

        <h3 className="text-xl font-bold px-3 mt-2">{product.name}</h3>
      <div className="p-5 flex flex-col justify-between justify-items-end mt-auto">
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatCurrency(product.price)}
        </p>
        <AddProductToCartButton product={product}/>
      </div>
    </div>
  );
}
