import React from "react";
import { prisma } from "@/src/lib/prisma";
import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";

const getProductsByCategory = async (category: string) => {
  return await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });
};
export default async function OrderPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const products = await getProductsByCategory((await params).category);

  return (
    <>
      <Heading>Selecciona tu pedido</Heading>
      <div className="grid grid-cols-1  xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
