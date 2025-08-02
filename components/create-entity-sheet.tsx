"use client"

import type React from "react"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { Entity } from "@/types/entity"
import { Plus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CreateEntitySheetProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (entity: Omit<Entity, "id" | "lastUpdated">) => void
  entityType?: Entity["type"]
}

export function CreateEntitySheet({ isOpen, onClose, onSubmit, entityType = "service" }: CreateEntitySheetProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: entityType,
    description: "",
    owner: "",
    repository: "",
    status: "active",
    version: "v1.0.0",
    dependencies: "",
    tags: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const entity: Omit<Entity, "id" | "lastUpdated"> = {
      name: formData.name,
      type: formData.type as Entity["type"],
      description: formData.description,
      owner: formData.owner,
      repository: formData.repository || `https://github.com/company/${formData.name}`,
      status: formData.status as Entity["status"],
      version: formData.version,
      dependencies: formData.dependencies ? formData.dependencies.split(",").map((d) => d.trim()) : [],
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [formData.type],
      metadata: [
        { key: "owner", value: formData.owner },
        { key: "status", value: formData.status },
        { key: "updated", value: "Just now" },
      ],
    }

    onSubmit(entity)

    // Reset form
    setFormData({
      name: "",
      type: "",
      description: "",
      owner: "",
      repository: "",
      status: "active",
      version: "v1.0.0",
      dependencies: "",
      tags: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px] flex flex-col p-0">
        <div className="p-6 pb-4">
          <SheetHeader>
            <SheetTitle>Create Component</SheetTitle>
            <SheetDescription>Add a new component to the catalog</SheetDescription>
          </SheetHeader>
        </div>

        <ScrollArea className="flex-1 px-6" style={{ height: "calc(100vh - 200px)" }}>
          <div className="pr-4">
            <form id="create-entity-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="my-awesome-service"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="library">Library</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of what this component does..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="owner">Owner Team</Label>
                <Select value={formData.owner} onValueChange={(value) => handleInputChange("owner", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Frontend Team">Frontend Team</SelectItem>
                    <SelectItem value="Backend Team">Backend Team</SelectItem>
                    <SelectItem value="Data Team">Data Team</SelectItem>
                    <SelectItem value="Design Team">Design Team</SelectItem>
                    <SelectItem value="DevOps Team">DevOps Team</SelectItem>
                    <SelectItem value="QA Team">QA Team</SelectItem>
                    <SelectItem value="Product Team">Product Team</SelectItem>
                    <SelectItem value="Security Team">Security Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="repository">Repository URL</Label>
                <Input
                  id="repository"
                  type="url"
                  placeholder="https://github.com/company/repo"
                  value={formData.repository}
                  onChange={(e) => handleInputChange("repository", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  placeholder="v1.0.0"
                  value={formData.version}
                  onChange={(e) => handleInputChange("version", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dependencies">Dependencies (comma-separated)</Label>
                <Input
                  id="dependencies"
                  placeholder="react, typescript, tailwind"
                  value={formData.dependencies}
                  onChange={(e) => handleInputChange("dependencies", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  placeholder="frontend, react, ui"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="deprecated">Deprecated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Additional spacing at bottom for better scrolling */}
              <div className="pb-8" />
            </form>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-3 p-6 pt-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex items-center gap-2" form="create-entity-form">
            <Plus className="h-4 w-4" />
            Create Component
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
