"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SearchInput,
  DateRangeFilter,
  Pagination,
  ConfirmDialog,
  PageHeader,
  EmptyState,
  LoadingState,
} from "@/components/shared"
import {
  EntityList,
  CreateEntityDialog,
  EditEntityDialog,
  ManyEntityItem,
} from "@/components/dashboard"
import type { DateRange } from "react-day-picker"
import { useDebounce } from "use-debounce"
import { manyEntity } from "@/hooks/many-entity/hook"
import { PaginatedMeta } from "@/types/express"

export default function DashboardPage() {
  // Filters state
  const [search, setSearch] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [page, setPage] = useState(1)

  // Debounce search
  const [debouncedSearch] = useDebounce(search, 300)

  // Dialog state
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ManyEntityItem | null>(null)

  const onSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const onDateRangeChange = (value: DateRange | undefined) => {
    setDateRange(value)
    setPage(1)
  }

  // Data fetching (SERVER-SIDE FILTERING)
  const { data: items, isLoading } = manyEntity.useList({
    page,
    limit: 10,
    search: debouncedSearch,
    dateFrom: dateRange?.from?.toISOString(),
    dateTo: dateRange?.to?.toISOString(),
  })

  // Tags
  // const { data: users } = user.useList({ limit: 10 })

  // Mutations
  const create = manyEntity.useCreate()
  const update = manyEntity.useUpdate()
  const remove = manyEntity.useDelete()

  // Derived data
  const data: ManyEntityItem[] = items?.items ?? []
  const hasActiveFilters = !!search || !!dateRange

  // Handlers
  const handleCreate = async (data: { name: string; userIds: string[] }) => {
    await create.mutateAsync({
      name: data.name,
      filterFieldDate: new Date(),
      userIds: data.userIds,
    })
  }

  const handleEdit = async (name: string) => {
    if (!selectedItem) return

    await update.mutateAsync({
      id: selectedItem.id,
      body: {
        name: name,
      },
    })

    setEditOpen(false)
    setSelectedItem(null)
  }

  const handleDelete = async () => {
    if (!selectedItem) return

    await remove.mutateAsync(selectedItem.id)

    setDeleteOpen(false)
    setSelectedItem(null)
  }

  const openEdit = (item: ManyEntityItem) => {
    setSelectedItem(item)
    setEditOpen(true)
  }

  const openDelete = (item: ManyEntityItem) => {
    setSelectedItem(item)
    setDeleteOpen(true)
  }

  const clearFilters = () => {
    setSearch("")
    setDateRange(undefined)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <PageHeader
            title="Dashboard"
            description="Manage your entities"
            action={
              <CreateEntityDialog
                users={[]}
                isLoading={create.isPending}
                onCreate={handleCreate}
              />
            }
          />

          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchInput
              value={search}
              onChange={onSearchChange}
              placeholder="Search by name..."
            />

            <div className="flex gap-2">
              <DateRangeFilter value={dateRange} onChange={onDateRangeChange} />

              {hasActiveFilters && (
                <Button variant="ghost" size="icon" onClick={clearFilters}>
                  <X className="size-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <LoadingState />
          ) : data.length === 0 ? (
            <EmptyState />
          ) : (
            <EntityList items={data} onEdit={openEdit} onDelete={openDelete} />
          )}

          {/* Pagination */}
          <Pagination
            page={page}
            totalPages={(items?.meta as PaginatedMeta)?.totalPages || 1}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Dialogs */}
      <EditEntityDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        initialName={selectedItem?.name || ""}
        isLoading={update.isPending}
        onSave={handleEdit}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Entity"
        description={`Are you sure you want to delete "${selectedItem?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        isLoading={remove.isPending}
        onConfirm={handleDelete}
      />
    </div>
  )
}
