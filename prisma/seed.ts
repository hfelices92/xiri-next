import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  try {
    await prisma.category.createMany({
      data: categories,
      skipDuplicates: true,
    });
    await prisma.product.createMany({
      data: products,
      skipDuplicates: true,
    });
    console.log(`Seeding finished.`);
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
