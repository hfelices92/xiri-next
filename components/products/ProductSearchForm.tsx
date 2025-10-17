"use client";
import { SearchSchema } from "@/src/schema";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProductSearchForm() {
  const router = useRouter();
  const handleSearch = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };
    const result = SearchSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    router.push(`/admin/products/search?search=${result.data.search}`);
  };
  return (
    <form action={handleSearch} className="flex items-center ">
      <input
        type="text"
        placeholder="Buscar Producto"
        className="p-2 placeholder-gray-400 w-full bg-white rounded-l-lg border border-gray-400"
        name="search"
      />

      <input
        type="submit"
        value="Buscar"
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer rounded-r-lg  "
      />
    </form>
  );
}
