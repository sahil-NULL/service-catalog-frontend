"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Domain } from "@/types"
import { Edit, Layers } from "lucide-react"

interface ViewDomainSheetProps {
  domain: Domain | null
  isOpen: boolean
  onClose: () => void
}

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

export function ViewDomainSheet({ domain, isOpen, onClose }: ViewDomainSheetProps) {
  if (!domain) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>{domain.name}</SheetTitle>
          <SheetDescription>Domain information and systems</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-8">
          {/* Overview Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Name</label>
                <p className="text-sm text-gray-900 mt-1">{domain.name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                <Badge className={`mt-1 ${getStatusColor(domain.status)}`}>{domain.status}</Badge>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Owner</label>
                <p className="text-sm text-gray-900 mt-1">{domain.owner}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Systems</label>
                <p className="text-sm text-gray-900 mt-1">{domain.systems.length}</p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Description</h3>
            <p className="text-gray-600 leading-relaxed">{domain.description}</p>
          </div>

          {/* Systems Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Systems</h3>
            <div className="space-y-2">
              {domain.systems.map((system, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Layers className="h-4 w-4 text-gray-400" />
                  <span>{system}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Created</label>
                <p className="text-sm text-gray-900 mt-1">{domain.createdAt}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Last Updated</label>
                <p className="text-sm text-gray-900 mt-1">{domain.updatedAt}</p>
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {domain.tags.map((tag, index) => (
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
            Edit Domain
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
