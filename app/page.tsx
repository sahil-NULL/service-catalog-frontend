"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { ViewEntitySheet } from "@/components/view-entity-sheet"
import { CreateEntitySheet } from "@/components/create-entity-sheet"
import { ViewUserSheet } from "@/components/view-user-sheet"
import { ViewGroupSheet } from "@/components/view-group-sheet"
import { ViewDomainSheet } from "@/components/view-domain-sheet"
import { ViewTemplateSheet } from "@/components/view-template-sheet"
import type { Entity, User, Group, Domain, Template } from "@/types"
import {
  mockComponents,
  mockSystems,
  mockApis,
  mockResources,
  mockDomains,
  mockGroups,
  mockUsers,
  mockTemplates,
} from "@/data/mock-data"
import { NotificationToast } from "@/components/notification-toast"
import { DependencyGraphSheet } from "@/components/dependency-graph-sheet"

export type ViewType = "components" | "systems" | "apis" | "resources" | "domains" | "groups" | "users" | "templates"

export default function ServiceCatalogPage() {
  const [currentView, setCurrentView] = useState<ViewType>("components")
  const [entities, setEntities] = useState<Entity[]>(mockComponents)
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [groups, setGroups] = useState<Group[]>(mockGroups)
  const [domains, setDomains] = useState<Domain[]>(mockDomains)
  const [templates, setTemplates] = useState<Template[]>(mockTemplates)

  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const [isViewSheetOpen, setIsViewSheetOpen] = useState(false)
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false)
  const [isUserSheetOpen, setIsUserSheetOpen] = useState(false)
  const [isGroupSheetOpen, setIsGroupSheetOpen] = useState(false)
  const [isDomainSheetOpen, setIsDomainSheetOpen] = useState(false)
  const [isTemplateSheetOpen, setIsTemplateSheetOpen] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGroupFilter, setSelectedGroupFilter] = useState("Engineering Team")
  const [sortBy, setSortBy] = useState<"name" | "updated" | "owner">("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  // Add these new state variables after the existing ones
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [bulkOperationMode, setBulkOperationMode] = useState(false)
  const [showDependencyGraph, setShowDependencyGraph] = useState(false)
  const [notifications, setNotifications] = useState<
    Array<{ id: string; message: string; type: "success" | "error" | "info" }>
  >([])

  // Add these new handler functions
  const handleBulkSelect = (id: string, selected: boolean) => {
    setSelectedItems((prev) => (selected ? [...prev, id] : prev.filter((item) => item !== id)))
  }

  const handleBulkSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedItems(sortedData.map((item) => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return

    // Simulate bulk delete
    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        message: `${selectedItems.length} items deleted successfully`,
        type: "success",
      },
    ])

    setSelectedItems([])
    setBulkOperationMode(false)
  }

  const handleBulkStatusChange = (newStatus: string) => {
    if (selectedItems.length === 0) return

    // Simulate bulk status update
    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        message: `Status updated for ${selectedItems.length} items`,
        type: "success",
      },
    ])

    setSelectedItems([])
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view)
    setSearchQuery("")

    // Load appropriate data based on view
    switch (view) {
      case "components":
        setEntities(mockComponents)
        break
      case "systems":
        setEntities(mockSystems)
        break
      case "apis":
        setEntities(mockApis)
        break
      case "resources":
        setEntities(mockResources)
        break
    }
  }

  const handleEntityClick = (entity: Entity) => {
    setSelectedEntity(entity)
    setIsViewSheetOpen(true)
  }

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
    setIsUserSheetOpen(true)
  }

  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group)
    setIsGroupSheetOpen(true)
  }

  const handleDomainClick = (domain: Domain) => {
    setSelectedDomain(domain)
    setIsDomainSheetOpen(true)
  }

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template)
    setIsTemplateSheetOpen(true)
  }

  const handleCreateEntity = (newEntity: Omit<Entity, "id" | "lastUpdated">) => {
    const entity: Entity = {
      ...newEntity,
      id: Date.now().toString(),
      lastUpdated: "Just now",
    }
    setEntities((prev) => [...prev, entity])
    setIsCreateSheetOpen(false)
  }

  const getCurrentData = () => {
    switch (currentView) {
      case "users":
        return users
      case "groups":
        return groups
      case "domains":
        return domains
      case "templates":
        return templates
      default:
        return entities
    }
  }

  const filteredData = getCurrentData().filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ("type" in item && item.type.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = statusFilter === "all" || ("status" in item && item.status === statusFilter)

    const matchesType = typeFilter === "all" || ("type" in item && item.type === typeFilter)

    const matchesGroup =
      selectedGroupFilter === "All Organizations" ||
      ("owner" in item && item.owner.includes(selectedGroupFilter.replace(" Team", ""))) ||
      ("team" in item && item.team === selectedGroupFilter)

    return matchesSearch && matchesStatus && matchesType && matchesGroup
  })

  const sortedData = [...filteredData].sort((a, b) => {
    let aValue: string
    let bValue: string

    switch (sortBy) {
      case "updated":
        aValue = "lastUpdated" in a ? a.lastUpdated : "updatedAt" in a ? a.updatedAt : ""
        bValue = "lastUpdated" in b ? b.lastUpdated : "updatedAt" in b ? b.updatedAt : ""
        break
      case "owner":
        aValue = "owner" in a ? a.owner : "team" in a ? a.team : ""
        bValue = "owner" in b ? b.owner : "team" in b ? b.team : ""
        break
      default:
        aValue = a.name
        bValue = b.name
    }

    const comparison = aValue.localeCompare(bValue)
    return sortOrder === "asc" ? comparison : -comparison
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header selectedGroup={selectedGroupFilter} onGroupChange={setSelectedGroupFilter} />

      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar currentView={currentView} onViewChange={handleViewChange} />

        <MainContent
          currentView={currentView}
          data={sortedData}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onEntityClick={handleEntityClick}
          onUserClick={handleUserClick}
          onGroupClick={handleGroupClick}
          onDomainClick={handleDomainClick}
          onTemplateClick={handleTemplateClick}
          onCreateClick={() => setIsCreateSheetOpen(true)}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={setSortBy}
          onSortOrderChange={setSortOrder}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          // Add bulk operation props
          bulkOperationMode={bulkOperationMode}
          onBulkOperationModeChange={setBulkOperationMode}
          selectedItems={selectedItems}
          onBulkSelect={handleBulkSelect}
          onBulkSelectAll={handleBulkSelectAll}
          onBulkDelete={handleBulkDelete}
          onBulkStatusChange={handleBulkStatusChange}
          onShowDependencyGraph={() => setShowDependencyGraph(true)}
        />
      </div>

      <ViewEntitySheet entity={selectedEntity} isOpen={isViewSheetOpen} onClose={() => setIsViewSheetOpen(false)} />

      <CreateEntitySheet
        isOpen={isCreateSheetOpen}
        onClose={() => setIsCreateSheetOpen(false)}
        onSubmit={handleCreateEntity}
        entityType={currentView === "components" ? "service" : (currentView.slice(0, -1) as Entity["type"])}
      />

      <ViewUserSheet user={selectedUser} isOpen={isUserSheetOpen} onClose={() => setIsUserSheetOpen(false)} />

      <ViewGroupSheet group={selectedGroup} isOpen={isGroupSheetOpen} onClose={() => setIsGroupSheetOpen(false)} />

      <ViewDomainSheet domain={selectedDomain} isOpen={isDomainSheetOpen} onClose={() => setIsDomainSheetOpen(false)} />

      <ViewTemplateSheet
        template={selectedTemplate}
        isOpen={isTemplateSheetOpen}
        onClose={() => setIsTemplateSheetOpen(false)}
      />
      {/* Add after the existing sheets */}
      <NotificationToast notifications={notifications} onDismiss={dismissNotification} />

      <DependencyGraphSheet
        isOpen={showDependencyGraph}
        onClose={() => setShowDependencyGraph(false)}
        entities={entities}
      />
    </div>
  )
}
