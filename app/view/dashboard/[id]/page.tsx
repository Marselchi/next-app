"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DetailHeader,
  InfoItem,
  LoadingState,
  ConfirmDialog,
} from "@/components/shared"
import { EditEntityDialog } from "@/components/dashboard"
import { manyEntity } from "@/hooks/many-entity/hook"

export default function DashboardDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = use(params)
  const router = useRouter()

  // Dialog state
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  // Data fetching
  const { data: item, isLoading } = manyEntity.useDetail(id)

  // Mutations
  const update = manyEntity.useUpdate()
  const remove = manyEntity.useDelete()

  // Handlers
  const handleEdit = async (name: string) => {
    await update.mutateAsync({
      id: Number(id),
      body: {
        name,
      },
    })
    setEditOpen(false)
  }

  const handleDelete = async () => {
    await remove.mutateAsync(id)
    router.push("/dashboard")
  }

  const formatDate = (dateStr: Date | string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <LoadingState />
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <p className="text-muted-foreground">Entity not found</p>
            <Button asChild variant="outline">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <div className="flex flex-col gap-6">
          <DetailHeader
            title={item.name}
            subtitle="Entity Details"
            backHref="/dashboard"
            backLabel="Back to Dashboard"
            onEdit={() => setEditOpen(true)}
            onDelete={() => setDeleteOpen(true)}
          />

          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
              <CardDescription>
                View all details about this entity
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoItem
                  icon={Calendar}
                  label="Filter Date"
                  value={formatDate(item.filterFieldDate)}
                />
                <InfoItem
                  icon={Calendar}
                  label="Created At"
                  value={formatDate(item.createdAt)}
                />
                <InfoItem
                  icon={Calendar}
                  label="Updated At"
                  value={formatDate(item.updatedAt)}
                />
              </div>

              {item.users && item.users.length > 0 && (
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Users className="size-5 text-muted-foreground" />
                    <p className="text-sm font-medium">Assigned Users</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.users.map((u: { id: string; name: string }) => (
                      <Badge key={u.id} variant="secondary">
                        {u.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {item.filters && item.filters.length > 0 && (
                <div>
                  <p className="mb-3 text-sm font-medium">Filters</p>
                  <div className="flex flex-wrap gap-2">
                    {item.filters.map((f: { id: number; name: string }) => (
                      <Badge key={f.id} variant="outline">
                        {f.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <EditEntityDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        initialName={item?.name || ""}
        isLoading={update.isPending}
        onSave={handleEdit}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Entity"
        description={`Are you sure you want to delete "${item?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        isLoading={remove.isPending}
        onConfirm={handleDelete}
      />
    </div>
  )
}
