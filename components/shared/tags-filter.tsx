"use client"

import { Tag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface TagOption {
  id: number
  name: string
}

interface TagsFilterProps {
  options: TagOption[]
  selected: number[]
  onChange: (selected: number[]) => void
}

export function TagsFilter({
  options,
  selected,
  onChange,
}: Readonly<TagsFilterProps>) {
  const toggleTag = (tagId: number) => {
    onChange(
      selected.includes(tagId)
        ? selected.filter((id) => id !== tagId)
        : [...selected, tagId]
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <Tag className="size-4" />
          <span>Tags {selected.length > 0 && `(${selected.length})`}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="end">
        <div className="grid gap-4">
          <div className="text-sm font-medium">Filter by Tags</div>
          <div className="grid max-h-48 gap-2 overflow-y-auto">
            {options.map((tag) => (
              <label
                key={tag.id}
                className="flex cursor-pointer items-center gap-2"
              >
                <Checkbox
                  checked={selected.includes(tag.id)}
                  onCheckedChange={() => toggleTag(tag.id)}
                />
                <span className="text-sm">{tag.name}</span>
              </label>
            ))}
            {options.length === 0 && (
              <p className="text-sm text-muted-foreground">No tags available</p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface ActiveTagsProps {
  options: TagOption[]
  selected: number[]
  onRemove: (tagId: number) => void
}

export function ActiveTags({
  options,
  selected,
  onRemove,
}: Readonly<ActiveTagsProps>) {
  if (selected.length === 0) return null

  return (
    <>
      {selected.map((tagId) => {
        const tag = options.find((t) => t.id === tagId)
        return tag ? (
          <Badge
            key={tagId}
            variant="secondary"
            className="cursor-pointer"
            onClick={() => onRemove(tagId)}
          >
            {tag.name}
            <X className="ml-1 size-3" />
          </Badge>
        ) : null
      })}
    </>
  )
}
