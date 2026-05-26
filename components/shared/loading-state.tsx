"use client"

interface LoadingStateProps {
  message?: string
}

export function LoadingState({
  message = "Загрузка...",
}: Readonly<LoadingStateProps>) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-muted-foreground">{message}</div>
    </div>
  )
}
