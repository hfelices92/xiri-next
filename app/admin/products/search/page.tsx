import ProductSearchForm from "../../../../components/products/ProductSearchForm";
import ProductsPagination from "../../../../components/products/ProductsPagination";
import ProductTable from "../../../../components/products/ProductsTable";
import Heading from "../../../../components/ui/Heading";
import { prisma } from "../../../../src/lib/prisma";
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
  const products = await prisma.product.findMany({
    take: 10,
    skip,
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

// 👇 Aquí definimos el tipo, igual que con params
type SearchParams = Promise<{ search?: string; page?: string }>;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { search = "", page = "1" } = await searchParams; // 👈 necesario con Next 15

  const currentPage = parseInt(page) || 1;
  const pageSize = 10;

  if (currentPage < 1) {
    return redirect("/admin/products");
  }

  const [products, totalProducts] = await Promise.all([
    searchProducts(search, currentPage, pageSize),
    getTotalProducts(search),
  ]);

  const totalPages = Math.ceil(totalProducts / pageSize);

  return (
    <>
      <Heading>Resultados de Búsqueda</Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href={"/admin/products/new"}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center rounded-md font-bold hover:bg-amber-500 transition"
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
