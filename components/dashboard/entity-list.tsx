"use client"

import { ManyEntityItem, EntityCard } from "./entity-card"

interface EntityListProps {
  items: ManyEntityItem[]
  onEdit: (item: ManyEntityItem) => void
  onDelete: (item: ManyEntityItem) => void
}

export function EntityList({
  items,
  onEdit,
  onDelete,
}: Readonly<EntityListProps>) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <EntityCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
