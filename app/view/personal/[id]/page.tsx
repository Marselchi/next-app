"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { EditUserItemDialog } from "@/components/personal"
import { userItem } from "@/hooks/user-item/hook"

export default function PersonalDetailPage({
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
  const { data: item, isLoading } = userItem.useDetail(id)

  // Mutations
  const update = userItem.useUpdate()
  const remove = userItem.useDelete()

  // Handlers
  const handleEdit = async (name: string) => {
    await update.mutateAsync({
      id: Number(id),
      body: { name },
    })
    setEditOpen(false)
  }

  const handleDelete = async () => {
    await remove.mutateAsync(id)
    router.push("/personal")
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
            <p className="text-muted-foreground">Item not found</p>
            <Button asChild variant="outline">
              <Link href="/personal">Back to Personal</Link>
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
            subtitle="Item Details"
            backHref="/personal"
            backLabel="Back to Personal"
            onEdit={() => setEditOpen(true)}
            onDelete={() => setDeleteOpen(true)}
          />

          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
              <CardDescription>
                View all details about this item
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoItem
                  icon={User}
                  label="Author"
                  value={item.user?.name || "Unknown"}
                />
                <InfoItem
                  icon={Calendar}
                  label="Created At"
                  value={formatDate(item.createdAt)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <EditUserItemDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        initialName={item?.name || ""}
        isLoading={update.isPending}
        onSave={handleEdit}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Item"
        description={`Are you sure you want to delete "${item?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        isLoading={remove.isPending}
        onConfirm={handleDelete}
      />
    </div>
  )
}
