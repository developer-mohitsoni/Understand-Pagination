// PaginationControls.tsx

"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  currentPage,
  perPage,
  totalPages,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="flex gap-4 items-center mt-4">
      <Button
        variant="outline"
        className="px-3 py-1 text-gray-700"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${currentPage - 1}&per_page=${perPage}`);
        }}
      >
        Previous
      </Button>

      <div className="text-gray-700">
        Page {currentPage} of {totalPages}
      </div>

      <Button
        variant="outline"
        className="px-3 py-1 text-gray-700"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${currentPage + 1}&per_page=${perPage}`);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
