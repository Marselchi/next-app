"use client"

import { UserItemData, UserItemCard } from "./user-item-card"

interface UserItemListProps {
  items: UserItemData[]
  onEdit: (item: UserItemData) => void
  onDelete: (item: UserItemData) => void
}

export function UserItemList({
  items,
  onEdit,
  onDelete,
}: Readonly<UserItemListProps>) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <UserItemCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
