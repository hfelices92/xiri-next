import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getTotalProducts(query: string) {
  const totalProducts = await prisma.product.count({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
  return totalProducts;
}
async function searchProducts(
  query: string,
  currentPage: number,
  pageSize: number
) {
  const skip = (currentPage - 1) * pageSize;
  const products = prisma.product.findMany({
    take: 10,
    skip: skip,
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });
  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string; page: string };
}) {
  const { search } = searchParams;

  const currentPage = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  if (currentPage < 1) {
    return redirect("/admin/products");
  }
  const productsData = await searchProducts(search, currentPage, pageSize);
  const totalProductsData = getTotalProducts(search);
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);
  const totalPages = Math.ceil(totalProducts / pageSize);
  console.log(totalProducts);

  return (
    <>
      <Heading>Resultados de Búsqueda</Heading>
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
      <ProductsPagination
        page={currentPage}
        totalPages={totalPages}
        search={search}
      />
    </>
  );
}
