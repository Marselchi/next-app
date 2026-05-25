"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface UserOption {
  id: string
  name: string
}

interface CreateEntityDialogProps {
  users: UserOption[]
  isLoading: boolean
  onCreate: (data: { name: string; userIds: string[] }) => Promise<void>
}

export function CreateEntityDialog({
  users,
  isLoading,
  onCreate,
}: Readonly<CreateEntityDialogProps>) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])

  const handleSubmit = async () => {
    if (!name.trim()) return
    await onCreate({ name, userIds: selectedUserIds })
    setName("")
    setSelectedUserIds([])
    setOpen(false)
  }

  const toggleUser = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="size-4" />
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Entity</DialogTitle>
          <DialogDescription>
            Add a new entity to your dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name..."
            />
          </div>
          <div className="grid gap-2">
            <Label>Assign Users</Label>
            <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto rounded-md border p-2">
              {users.map((u) => (
                <Badge
                  key={u.id}
                  variant={
                    selectedUserIds.includes(u.id) ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => toggleUser(u.id)}
                >
                  {u.name}
                </Badge>
              ))}
              {users.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No users available
                </p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
