"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Search, X, Plus } from "lucide-react"

interface AdvancedSearchSheetProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (filters: SearchFilters) => void
}

interface SearchFilters {
  query: string
  types: string[]
  statuses: string[]
  owners: string[]
  tags: string[]
  dateRange: {
    from?: string
    to?: string
  }
  hasRepository: boolean
  hasDependencies: boolean
}

export function AdvancedSearchSheet({ isOpen, onClose, onSearch }: AdvancedSearchSheetProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    types: [],
    statuses: [],
    owners: [],
    tags: [],
    dateRange: {},
    hasRepository: false,
    hasDependencies: false,
  })

  const [customTag, setCustomTag] = useState("")

  const availableTypes = ["service", "website", "library", "api"]
  const availableStatuses = ["active", "inactive", "deprecated"]
  const availableOwners = ["Frontend Team", "Backend Team", "Data Team", "DevOps Team", "Design Team"]
  const popularTags = ["react", "typescript", "nodejs", "python", "aws", "kubernetes", "microservice", "api"]

  const handleTypeToggle = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type) ? prev.types.filter((t) => t !== type) : [...prev.types, type],
    }))
  }

  const handleStatusToggle = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(status) ? prev.statuses.filter((s) => s !== status) : [...prev.statuses, status],
    }))
  }

  const handleOwnerToggle = (owner: string) => {
    setFilters((prev) => ({
      ...prev,
      owners: prev.owners.includes(owner) ? prev.owners.filter((o) => o !== owner) : [...prev.owners, owner],
    }))
  }

  const handleTagToggle = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }))
  }

  const addCustomTag = () => {
    if (customTag && !filters.tags.includes(customTag)) {
      setFilters((prev) => ({
        ...prev,
        tags: [...prev.tags, customTag],
      }))
      setCustomTag("")
    }
  }

  const clearFilters = () => {
    setFilters({
      query: "",
      types: [],
      statuses: [],
      owners: [],
      tags: [],
      dateRange: {},
      hasRepository: false,
      hasDependencies: false,
    })
  }

  const handleSearch = () => {
    onSearch(filters)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Advanced Search
          </SheetTitle>
          <SheetDescription>Use advanced filters to find exactly what you're looking for</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Query */}
          <div className="space-y-2">
            <Label htmlFor="query">Search Query</Label>
            <Input
              id="query"
              placeholder="Enter search terms..."
              value={filters.query}
              onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
            />
          </div>

          {/* Types */}
          <div className="space-y-3">
            <Label>Component Types</Label>
            <div className="grid grid-cols-2 gap-2">
              {availableTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.types.includes(type)}
                    onCheckedChange={() => handleTypeToggle(type)}
                  />
                  <Label htmlFor={`type-${type}`} className="capitalize">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <Label>Status</Label>
            <div className="grid grid-cols-2 gap-2">
              {availableStatuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={filters.statuses.includes(status)}
                    onCheckedChange={() => handleStatusToggle(status)}
                  />
                  <Label htmlFor={`status-${status}`} className="capitalize">
                    {status}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Owners */}
          <div className="space-y-3">
            <Label>Owner Teams</Label>
            <div className="space-y-2">
              {availableOwners.map((owner) => (
                <div key={owner} className="flex items-center space-x-2">
                  <Checkbox
                    id={`owner-${owner}`}
                    checked={filters.owners.includes(owner)}
                    onCheckedChange={() => handleOwnerToggle(owner)}
                  />
                  <Label htmlFor={`owner-${owner}`} className="text-sm">
                    {owner}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={filters.tags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add custom tag..."
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCustomTag()}
              />
              <Button size="sm" onClick={addCustomTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {filters.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {filters.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleTagToggle(tag)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Date Range */}
          <div className="space-y-3">
            <Label>Last Updated</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="date-from" className="text-xs">
                  From
                </Label>
                <Input
                  id="date-from"
                  type="date"
                  value={filters.dateRange.from || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, from: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="date-to" className="text-xs">
                  To
                </Label>
                <Input
                  id="date-to"
                  type="date"
                  value={filters.dateRange.to || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, to: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="space-y-3">
            <Label>Additional Filters</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has-repository"
                  checked={filters.hasRepository}
                  onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, hasRepository: !!checked }))}
                />
                <Label htmlFor="has-repository">Has Repository</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has-dependencies"
                  checked={filters.hasDependencies}
                  onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, hasDependencies: !!checked }))}
                />
                <Label htmlFor="has-dependencies">Has Dependencies</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-3 mt-8 pt-6 border-t">
          <Button variant="outline" onClick={clearFilters}>
            Clear All
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
