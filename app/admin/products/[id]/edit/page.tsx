import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }
  return product;
}
type Params = Promise<{ id: string }> ;
export default async function EditProductsPage({ params }: { params: Params }) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  return (
    <>
      <Heading>Editar Producto</Heading>
      <GoBackButton />
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
