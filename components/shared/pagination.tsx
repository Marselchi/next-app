"use client"

import { Button } from "@/components/ui/button"

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: Readonly<PaginationProps>) {
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center gap-2">
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        Предыдущая
      </Button>
      <span className="flex items-center px-4 text-sm text-muted-foreground">
        Страница {page} из {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        Следующая
      </Button>
    </div>
  )
}
