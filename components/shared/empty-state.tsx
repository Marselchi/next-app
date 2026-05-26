"use client"

import { Card, CardContent } from "@/components/ui/card"

interface EmptyStateProps {
  message?: string
}

export function EmptyState({
  message = "Ничего не найдено",
}: Readonly<EmptyStateProps>) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  )
}
