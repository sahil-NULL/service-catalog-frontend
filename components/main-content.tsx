"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EntityCard } from "@/components/entity-card"
import { UserCard } from "@/components/user-card"
import { GroupCard } from "@/components/group-card"
import { DomainCard } from "@/components/domain-card"
import { TemplateCard } from "@/components/template-card"
import type { Entity, User, Group, Domain, Template } from "@/types"
import type { ViewType } from "@/app/page"
import { Search, ArrowUpDown, Plus, ChevronRight, Network } from "lucide-react"
import { AdvancedSearchSheet } from "@/components/advanced-search-sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

interface MainContentProps {
  currentView: ViewType
  data: (Entity | User | Group | Domain | Template)[]
  searchQuery: string
  onSearchChange: (query: string) => void
  onEntityClick: (entity: Entity) => void
  onUserClick: (user: User) => void
  onGroupClick: (group: Group) => void
  onDomainClick: (domain: Domain) => void
  onTemplateClick: (template: Template) => void
  onCreateClick: () => void
  sortBy: "name" | "updated" | "owner"
  sortOrder: "asc" | "desc"
  onSortChange: (sort: "name" | "updated" | "owner") => void
  onSortOrderChange: (order: "asc" | "desc") => void
  statusFilter: string
  onStatusFilterChange: (status: string) => void
  typeFilter: string
  onTypeFilterChange: (type: string) => void
  bulkOperationMode: boolean
  onBulkOperationModeChange: (enabled: boolean) => void
  selectedItems: string[]
  onBulkSelect: (id: string, selected: boolean) => void
  onBulkSelectAll: (selected: boolean) => void
  onBulkDelete: () => void
  onBulkStatusChange: (status: string) => void
  onShowDependencyGraph: () => void
}

const getViewConfig = (view: ViewType) => {
  switch (view) {
    case "components":
      return {
        title: "Components",
        description: "Software components tracked in the Engineering Team catalog",
        breadcrumb: ["Catalog", "Components"],
        createLabel: "Create Component",
      }
    case "systems":
      return {
        title: "Systems",
        description: "System architectures and platforms in your organization",
        breadcrumb: ["Catalog", "Systems"],
        createLabel: "Create System",
      }
    case "apis":
      return {
        title: "APIs",
        description: "API endpoints and services available in your ecosystem",
        breadcrumb: ["Catalog", "APIs"],
        createLabel: "Create API",
      }
    case "resources":
      return {
        title: "Resources",
        description: "Infrastructure resources and databases",
        breadcrumb: ["Catalog", "Resources"],
        createLabel: "Create Resource",
      }
    case "domains":
      return {
        title: "Domains",
        description: "Business domains and organizational boundaries",
        breadcrumb: ["Organization", "Domains"],
        createLabel: "Create Domain",
      }
    case "groups":
      return {
        title: "Groups",
        description: "Teams and organizational groups",
        breadcrumb: ["Organization", "Groups"],
        createLabel: "Create Group",
      }
    case "users":
      return {
        title: "Users",
        description: "People in your organization",
        breadcrumb: ["Organization", "Users"],
        createLabel: "Add User",
      }
    case "templates":
      return {
        title: "Templates",
        description: "Reusable templates for creating new components",
        breadcrumb: ["Tools", "Templates"],
        createLabel: "Create Template",
      }
  }
}

export function MainContent({
  currentView,
  data,
  searchQuery,
  onSearchChange,
  onEntityClick,
  onUserClick,
  onGroupClick,
  onDomainClick,
  onTemplateClick,
  onCreateClick,
  sortBy,
  sortOrder,
  onSortChange,
  onSortOrderChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  bulkOperationMode,
  onBulkOperationModeChange,
  selectedItems,
  onBulkSelect,
  onBulkSelectAll,
  onBulkDelete,
  onBulkStatusChange,
  onShowDependencyGraph,
}: MainContentProps) {
  const config = getViewConfig(currentView)
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)

  const renderCard = (item: Entity | User | Group | Domain | Template) => {
    if ("email" in item) {
      return <UserCard key={item.id} user={item as User} onClick={() => onUserClick(item as User)} />
    }
    if ("members" in item && "team" in item) {
      return <GroupCard key={item.id} group={item as Group} onClick={() => onGroupClick(item as Group)} />
    }
    if ("owner" in item && "systems" in item) {
      return <DomainCard key={item.id} domain={item as Domain} onClick={() => onDomainClick(item as Domain)} />
    }
    if ("language" in item && "framework" in item) {
      return (
        <TemplateCard key={item.id} template={item as Template} onClick={() => onTemplateClick(item as Template)} />
      )
    }
    return <EntityCard key={item.id} entity={item as Entity} onClick={() => onEntityClick(item as Entity)} />
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <span>{config.breadcrumb[0]}</span>
        <ChevronRight className="h-4 w-4 text-gray-400" />
        <span>{config.breadcrumb[1]}</span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">{config.title}</h1>
        <p className="text-gray-600">{config.description}</p>
      </div>

      {/* Filters and Actions */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 max-w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={`Search ${config.title.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button
          variant="outline"
          onClick={() => setShowAdvancedSearch(true)}
          className="flex items-center gap-2 bg-transparent"
        >
          <Search className="h-4 w-4" />
          Advanced
        </Button>

        {/* Bulk Operations Toggle */}
        <Button
          variant={bulkOperationMode ? "default" : "outline"}
          onClick={() => onBulkOperationModeChange(!bulkOperationMode)}
          className="flex items-center gap-2"
        >
          <Checkbox className="h-4 w-4" />
          Bulk
        </Button>

        {/* Bulk Operations Bar */}
        {bulkOperationMode && (
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border">
            <Checkbox
              checked={selectedItems.length === data.length && data.length > 0}
              onCheckedChange={onBulkSelectAll}
            />
            <span className="text-sm text-blue-900">{selectedItems.length} selected</span>
            {selectedItems.length > 0 && (
              <>
                <Select onValueChange={onBulkStatusChange}>
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="deprecated">Deprecated</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" variant="destructive" onClick={onBulkDelete}>
                  Delete
                </Button>
              </>
            )}
          </div>
        )}

        <Button variant="outline" onClick={onShowDependencyGraph} className="flex items-center gap-2 bg-transparent">
          <Network className="h-4 w-4" />
          Graph
        </Button>

        {/* Status Filter */}
        {["components", "systems", "apis", "resources"].includes(currentView) && (
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="deprecated">Deprecated</SelectItem>
            </SelectContent>
          </Select>
        )}

        {/* Type Filter */}
        {["components", "systems", "apis", "resources"].includes(currentView) && (
          <Select value={typeFilter} onValueChange={onTypeFilterChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="service">Service</SelectItem>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="library">Library</SelectItem>
              <SelectItem value="api">API</SelectItem>
            </SelectContent>
          </Select>
        )}

        {/* Sort */}
        <Select value={sortBy} onValueChange={(value: "name" | "updated" | "owner") => onSortChange(value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="updated">Updated</SelectItem>
            <SelectItem value="owner">Owner</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon" onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}>
          <ArrowUpDown className="h-4 w-4" />
        </Button>

        <Button onClick={onCreateClick} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {config.createLabel}
        </Button>
      </div>

      {/* Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <div key={item.id} className="relative">
            {bulkOperationMode && (
              <Checkbox
                className="absolute top-2 left-2 z-10 bg-white"
                checked={selectedItems.includes(item.id)}
                onCheckedChange={(checked) => onBulkSelect(item.id, !!checked)}
              />
            )}
            {renderCard(item)}
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No {config.title.toLowerCase()} found matching your criteria.</p>
        </div>
      )}

      <AdvancedSearchSheet
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        onSearch={(filters) => {
          // Handle advanced search filters
          console.log("Advanced search:", filters)
        }}
      />
    </main>
  )
}
