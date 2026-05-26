"use client"

import Link from "next/link"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DetailHeaderProps {
  title: string
  subtitle?: string
  backHref: string
  backLabel: string
  onEdit: () => void
  onDelete: () => void
}

export function DetailHeader({
  title,
  subtitle = "Детали",
  backHref,
  backLabel,
  onEdit,
  onDelete,
}: Readonly<DetailHeaderProps>) {
  return (
    <div className="flex flex-col gap-4">
      <Button asChild variant="ghost" className="-ml-2 w-fit">
        <Link href={backHref}>
          <ArrowLeft className="size-4" />
          {backLabel}
        </Link>
      </Button>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="size-4" />
            <span className="hidden sm:inline">Редактировать</span>
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="size-4" />
            <span className="hidden sm:inline">Удалить</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
