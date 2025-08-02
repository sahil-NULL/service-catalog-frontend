"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Group } from "@/types"
import { Edit, Code } from "lucide-react"

interface ViewGroupSheetProps {
  group: Group | null
  isOpen: boolean
  onClose: () => void
}

export function ViewGroupSheet({ group, isOpen, onClose }: ViewGroupSheetProps) {
  if (!group) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>{group.name}</SheetTitle>
          <SheetDescription>Team information and details</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-8">
          {/* Overview Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Name</label>
                <p className="text-sm text-gray-900 mt-1">{group.name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Type</label>
                <Badge variant="secondary" className="mt-1 capitalize">
                  {group.type}
                </Badge>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Team Lead</label>
                <p className="text-sm text-gray-900 mt-1">{group.lead}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Members</label>
                <p className="text-sm text-gray-900 mt-1">{group.members}</p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Description</h3>
            <p className="text-gray-600 leading-relaxed">{group.description}</p>
          </div>

          {/* Details Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Created</label>
                <p className="text-sm text-gray-900 mt-1">{group.createdAt}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Last Updated</label>
                <p className="text-sm text-gray-900 mt-1">{group.updatedAt}</p>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Projects</h3>
            <div className="space-y-2">
              {group.projects.map((project, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Code className="h-4 w-4 text-gray-400" />
                  <span>{project}</span>
                </div>
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
            Edit Group
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
