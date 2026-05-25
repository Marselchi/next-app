"use client"

import { useState } from "react"
import { useDebounce } from "use-debounce"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SearchInput,
  TagsFilter,
  ActiveTags,
  AuthorFilter,
  ActiveAuthor,
  Pagination,
  ConfirmDialog,
  PageHeader,
  EmptyState,
  LoadingState,
  TagOption,
} from "@/components/shared"
import {
  UserItemList,
  CreateUserItemDialog,
  EditUserItemDialog,
  UserItemData,
} from "@/components/personal"
import { authClient } from "@/lib/authclient"
import { userItem } from "@/hooks/user-item/hook"
import { PaginatedMeta } from "@/types/express"
import { manyFilter } from "@/hooks/many-filter/hook"

export default function PersonalPage() {
  const { data: session } = authClient.useSession()

  const [search, setSearch] = useState("")
  const [authorFilter, setAuthorFilter] = useState("")
  const [selectedTags, setSelectedTags] = useState<number[]>([])
  const [page, setPage] = useState(1)

  const [debouncedSearch] = useDebounce(search, 300)

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<UserItemData | null>(null)

  const { data: items, isLoading } = userItem.useList({
    page,
    limit: 10,
    search: debouncedSearch,
    authorLike: authorFilter,
    tags: selectedTags,
  })

  const { data: filters } = manyFilter.useList({ limit: 100 })

  // Mutations
  const create = userItem.useCreate()
  const update = userItem.useUpdate()
  const remove = userItem.useDelete()

  // Derived data
  const data: UserItemData[] = items?.items ?? []
  const tagOptions: TagOption[] = filters?.items ?? []

  // Handlers
  const handleCreate = async (data: { name: string }) => {
    if (!session?.user?.id) return

    await create.mutateAsync({
      name: data.name,
      userId: session.user.id,
    })
  }

  const handleEdit = async (name: string) => {
    if (!selectedItem) return

    await update.mutateAsync({
      id: selectedItem.id,
      body: {
        name,
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

  const openEdit = (item: UserItemData) => {
    setSelectedItem(item)
    setEditOpen(true)
  }

  const openDelete = (item: UserItemData) => {
    setSelectedItem(item)
    setDeleteOpen(true)
  }

  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    )
  }

  const clearFilters = () => {
    setAuthorFilter("")
    setSelectedTags([])
    setSearch("")
  }

  const hasActiveFilters =
    selectedTags.length > 0 ||
    authorFilter.trim() !== "" ||
    search.trim() !== ""

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <PageHeader
            title="Personal"
            description="Manage your personal items"
            action={
              <CreateUserItemDialog
                isLoading={create.isPending}
                onCreate={handleCreate}
              />
            }
          />

          {/* Filters */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search by name..."
              />

              <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                <TagsFilter
                  options={tagOptions}
                  selected={selectedTags}
                  onChange={setSelectedTags}
                />

                <AuthorFilter value={authorFilter} onChange={setAuthorFilter} />

                {hasActiveFilters && (
                  <Button variant="ghost" size="icon" onClick={clearFilters}>
                    <X className="size-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Active filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                <ActiveTags
                  options={tagOptions}
                  selected={selectedTags}
                  onRemove={toggleTag}
                />

                <ActiveAuthor
                  value={authorFilter}
                  onClear={() => setAuthorFilter("")}
                />
              </div>
            )}
          </div>

          {/* Content */}
          {isLoading ? (
            <LoadingState />
          ) : data.length === 0 ? (
            <EmptyState />
          ) : (
            <UserItemList
              items={data}
              onEdit={openEdit}
              onDelete={openDelete}
            />
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
      <EditUserItemDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        initialName={selectedItem?.name || ""}
        isLoading={update.isPending}
        onSave={handleEdit}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Item"
        description={`Are you sure you want to delete "${selectedItem?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        isLoading={remove.isPending}
        onConfirm={handleDelete}
      />
    </div>
  )
}
