"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Entity } from "@/types/entity"
import { Edit, ExternalLink } from "lucide-react"

interface ViewEntitySheetProps {
  entity: Entity | null
  isOpen: boolean
  onClose: () => void
}

export function ViewEntitySheet({ entity, isOpen, onClose }: ViewEntitySheetProps) {
  if (!entity) return null

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "deprecated":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>{entity.name}</SheetTitle>
          <SheetDescription>View component information and metadata</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-8">
          {/* Overview Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Name</label>
                <p className="text-sm text-gray-900 mt-1">{entity.name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Type</label>
                <p className="text-sm text-gray-900 mt-1 capitalize">{entity.type}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Owner</label>
                <p className="text-sm text-gray-900 mt-1">{entity.owner}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                <Badge className={`mt-1 ${getStatusColor(entity.status)}`}>{entity.status}</Badge>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Description</h3>
            <p className="text-gray-600 leading-relaxed">{entity.description}</p>
          </div>

          {/* Technical Details Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Repository</label>
                <a
                  href={entity.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 mt-1 flex items-center gap-1"
                >
                  {entity.repository}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Version</label>
                <p className="text-sm text-gray-900 mt-1">{entity.version}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Last Updated</label>
                <p className="text-sm text-gray-900 mt-1">{entity.lastUpdated}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Dependencies</label>
                <p className="text-sm text-gray-900 mt-1">{entity.dependencies.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {entity.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
