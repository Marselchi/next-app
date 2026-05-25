"use client"

import Link from "next/link"
import { Edit, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface UserItemData {
  id: number
  name: string
  createdAt: Date
  userId: string
  user?: { id: string; name: string }
  filters?: { id: number; name: string }[]
}

interface UserItemCardProps {
  item: UserItemData
  onEdit: (item: UserItemData) => void
  onDelete: (item: UserItemData) => void
}

export function UserItemCard({
  item,
  onEdit,
  onDelete,
}: Readonly<UserItemCardProps>) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <Link href={`/personal/${item.id}`}>
              <CardTitle className="cursor-pointer truncate text-lg hover:underline">
                {item.name}
              </CardTitle>
            </Link>
            <CardDescription className="mt-1">
              <span className="flex items-center gap-1">
                <User className="size-3" />
                {item.user?.name || "Unknown"}
              </span>
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
      {item.filters && item.filters.length > 0 && (
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1">
            {item.filters.map((f) => (
              <Badge key={f.id} variant="outline">
                {f.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
