"use client"

import { ReactNode } from "react"
import { LucideIcon } from "lucide-react"

interface InfoItemProps {
  icon: LucideIcon
  label: string
  value: string | ReactNode
}

export function InfoItem({
  icon: Icon,
  label,
  value,
}: Readonly<InfoItemProps>) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-5 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium">{label}</p>
        <div className="text-sm text-muted-foreground">{value}</div>
      </div>
    </div>
  )
}
