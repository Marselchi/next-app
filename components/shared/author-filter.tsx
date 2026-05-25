"use client"

import { User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface AuthorFilterProps {
  value: string
  onChange: (value: string) => void
}

export function AuthorFilter({ value, onChange }: Readonly<AuthorFilterProps>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <User className="size-4" />
          <span className="hidden sm:inline">{value.trim() || "Author"}</span>
          <span className="sm:hidden">Author</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="end">
        <div className="grid gap-4">
          <div className="text-sm font-medium">Filter by Author</div>
          <Input
            placeholder="Type author name..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface ActiveAuthorProps {
  value: string
  onClear: () => void
}

export function ActiveAuthor({ value, onClear }: Readonly<ActiveAuthorProps>) {
  if (!value.trim()) return null

  return (
    <Badge variant="secondary" className="cursor-pointer" onClick={onClear}>
      Author: {value}
      <X className="ml-1 size-3" />
    </Badge>
  )
}
