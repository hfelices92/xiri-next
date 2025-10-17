"use client";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center rounded-md  font-bold hover:bg-amber-500 transition cursor-pointer"
    >
      Volver
    </button>
  );
}
