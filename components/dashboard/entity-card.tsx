"use client"

import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface ManyEntityItem {
  id: number
  name: string
  filterFieldDate: Date
  createdAt: Date
  updatedAt: Date
  users?: { id: string; name: string }[]
}

interface EntityCardProps {
  item: ManyEntityItem
  onEdit: (item: ManyEntityItem) => void
  onDelete: (item: ManyEntityItem) => void
}

export function EntityCard({
  item,
  onEdit,
  onDelete,
}: Readonly<EntityCardProps>) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <Link href={`/dashboard/${item.id}`}>
              <CardTitle className="cursor-pointer truncate text-lg hover:underline">
                {item.name}
              </CardTitle>
            </Link>
            <CardDescription className="mt-1">
              Date: {new Date(item.filterFieldDate).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
              <Edit className="size-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDelete(item)}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      {item.users && item.users.length > 0 && (
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1">
            {item.users.map((u) => (
              <Badge key={u.id} variant="secondary">
                {u.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
