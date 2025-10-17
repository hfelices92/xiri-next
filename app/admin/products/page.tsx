import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getTotalProducts() {
  const totalProducts = await prisma.product.count();
  return totalProducts;
}
async function getProducts(currentPage: number, pageSize: number) {
  const skip = (currentPage - 1) * pageSize;
  const products = await prisma.product.findMany({
    take: 10,
    skip: skip,

    include: {
      category: true,
    },
  });

  return products;
}

export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const currentPage = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  if (currentPage < 1) {
    return redirect("/admin/products");
  }
  const productsData = getProducts(currentPage, pageSize);
  const totalProductsData = getTotalProducts();
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);
  const totalPages = Math.ceil(totalProducts / pageSize);

  if (currentPage > totalPages) {
    return redirect("/admin/products");
  }
  return (
    <>
      <Heading>Administrar Productos</Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href={"/admin/products/new"}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center rounded-md  font-bold hover:bg-amber-500 transition"
        >
          Crear Producto Nuevo
        </Link>
        <ProductSearchForm />
      </div>

      <ProductTable products={products} />

      <ProductsPagination page={currentPage} totalPages={totalPages} />
    </>
  );
}
