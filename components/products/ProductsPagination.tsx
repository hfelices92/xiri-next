import Link from "next/link";
import React from "react";

type ProductsPaginationProps = {
  page: number;
  totalPages: number;
  search?: string;
};
export default function ProductsPagination({
  page,
  totalPages,
  search,
}: ProductsPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const baseUrl = search
    ? `/admin/products/search?search=${search}&page=`
    : `/admin/products?page=`;
  return (
    <nav className="flex justify-center py-10 ">
      {page > 1 && (
        <Link
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          href={`${baseUrl}${page - 1}`}
        >
          &laquo;
        </Link>
      )}

      {pages.map((pageNumber) => (
        <Link
          key={pageNumber}
          href={`${baseUrl}${pageNumber}`}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
            pageNumber === page
              ? "bg-indigo-600 text-white hover:bg-indigo-500"
              : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          }`}
        >
          {pageNumber}
        </Link>
      ))}
      {totalPages > page && (
        <Link
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          href={`${baseUrl}${page + 1}`}
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
