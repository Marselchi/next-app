"use client"

import { Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import type { DateRange } from "react-day-picker"

interface DateRangeFilterProps {
  value: DateRange | undefined
  onChange: (value: DateRange | undefined) => void
}

export function DateRangeFilter({
  value,
  onChange,
}: Readonly<DateRangeFilterProps>) {
  const formatDateRange = () => {
    if (!value?.from) return null
    if (!value.to) return value.from.toLocaleDateString("ru-RU")
    return `${value.from.toLocaleDateString("ru-RU")} - ${value.to.toLocaleDateString("ru-RU")}`
  }

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto">
            <Calendar className="size-4" />
            <span className="hidden sm:inline">
              {formatDateRange() || "Период"}
            </span>
            <span className="sm:hidden">Даты</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <CalendarComponent
            mode="range"
            selected={value}
            onSelect={onChange}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>

      {value && (
        <Button variant="ghost" size="icon" onClick={() => onChange(undefined)}>
          <X className="size-4" />
        </Button>
      )}
    </div>
  )
}
