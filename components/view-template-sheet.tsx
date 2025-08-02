"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Template } from "@/types"
import { Edit, Download } from "lucide-react"

interface ViewTemplateSheetProps {
  template: Template | null
  isOpen: boolean
  onClose: () => void
}

export function ViewTemplateSheet({ template, isOpen, onClose }: ViewTemplateSheetProps) {
  if (!template) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>{template.name}</SheetTitle>
          <SheetDescription>Template information and usage</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-8">
          {/* Overview Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Name</label>
                <p className="text-sm text-gray-900 mt-1">{template.name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Category</label>
                <Badge variant="secondary" className="mt-1">
                  {template.category}
                </Badge>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Language</label>
                <p className="text-sm text-gray-900 mt-1">{template.language}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Framework</label>
                <p className="text-sm text-gray-900 mt-1">{template.framework}</p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Description</h3>
            <p className="text-gray-600 leading-relaxed">{template.description}</p>
          </div>

          {/* Usage Stats Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Usage Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Downloads</label>
                <p className="text-sm text-gray-900 mt-1">{template.downloads}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Author</label>
                <p className="text-sm text-gray-900 mt-1">{template.author}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Created</label>
                <p className="text-sm text-gray-900 mt-1">{template.createdAt}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Last Updated</label>
                <p className="text-sm text-gray-900 mt-1">{template.updatedAt}</p>
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag, index) => (
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
            <Download className="h-4 w-4" />
            Use Template
          </Button>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
