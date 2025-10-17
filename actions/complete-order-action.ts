"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { OderIdSchema } from "@/src/schema";

export async function completeOrder(formData: FormData) {
  const data = {
    order_id: formData.get("order_id"),
  };

 
  const result = OderIdSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error);
    return;
  }
  try {
    await prisma.order.update({
      where: { id: result.data.order_id },
      data: { status: true, orderReadyAt: new Date(Date.now()) },
    });

    revalidatePath("/admin/orders");
  } catch (error) {
    console.log(error);
  }
}
