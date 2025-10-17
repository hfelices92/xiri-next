'use client'
import { Category } from "@/app/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation"; 
type CategoryIconProps = {
  category: Category;

};


export default function CategoryIcon({ category }: CategoryIconProps) {
  
  const { category: currentCategory } = useParams<{category:string}>()
  const isActive = currentCategory === category.slug
  return (
    <div
      className={` flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b ${isActive ? 'bg-amber-400' : ''}`}
    >
      <div className="w-12 h-12 relative">
        <Image src={`/icon_${category.slug}.svg`} alt={category.name} fill />
      </div>
      <Link href={`/order/${category.slug}`} className="text-xl font-bold">{category.name}</Link>
    </div>
  );
}
