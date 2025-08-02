"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Entity } from "@/types"
import { useState, useMemo } from "react"
import { Network, Download, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface DependencyGraphSheetProps {
  isOpen: boolean
  onClose: () => void
  entities: Entity[]
}

interface GraphNode {
  id: string
  name: string
  type: Entity["type"]
  dependencies: string[]
  dependents: string[]
}

export function DependencyGraphSheet({ isOpen, onClose, entities }: DependencyGraphSheetProps) {
  const [selectedEntity, setSelectedEntity] = useState<string>("")
  const [viewMode, setViewMode] = useState<"dependencies" | "dependents" | "both">("both")
  const [zoom, setZoom] = useState(100)

  const graphData = useMemo(() => {
    const nodes: GraphNode[] = entities.map((entity) => ({
      id: entity.id,
      name: entity.name,
      type: entity.type,
      dependencies: entity.dependencies,
      dependents: entities
        .filter((e) =>
          e.dependencies.some(
            (dep) =>
              dep.toLowerCase().includes(entity.name.toLowerCase()) ||
              entity.name.toLowerCase().includes(dep.toLowerCase()),
          ),
        )
        .map((e) => e.name),
    }))

    return nodes
  }, [entities])

  const filteredNodes = useMemo(() => {
    if (!selectedEntity) return graphData

    const selected = graphData.find((node) => node.id === selectedEntity)
    if (!selected) return graphData

    const relatedNodes = new Set([selected.id])

    if (viewMode === "dependencies" || viewMode === "both") {
      selected.dependencies.forEach((dep) => {
        const depNode = graphData.find(
          (node) =>
            node.name.toLowerCase().includes(dep.toLowerCase()) || dep.toLowerCase().includes(node.name.toLowerCase()),
        )
        if (depNode) relatedNodes.add(depNode.id)
      })
    }

    if (viewMode === "dependents" || viewMode === "both") {
      selected.dependents.forEach((dep) => {
        const depNode = graphData.find((node) => node.name === dep)
        if (depNode) relatedNodes.add(depNode.id)
      })
    }

    return graphData.filter((node) => relatedNodes.has(node.id))
  }, [graphData, selectedEntity, viewMode])

  const getNodeColor = (type: Entity["type"]) => {
    switch (type) {
      case "service":
        return "bg-green-100 border-green-300 text-green-800"
      case "website":
        return "bg-yellow-100 border-yellow-300 text-yellow-800"
      case "library":
        return "bg-blue-100 border-blue-300 text-blue-800"
      case "api":
        return "bg-purple-100 border-purple-300 text-purple-800"
      default:
        return "bg-gray-100 border-gray-300 text-gray-800"
    }
  }

  const exportGraph = () => {
    const graphJson = JSON.stringify(filteredNodes, null, 2)
    const blob = new Blob([graphJson], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "dependency-graph.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[90vw] sm:max-w-[90vw] max-w-none">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Dependency Graph
          </SheetTitle>
          <SheetDescription>Visualize relationships and dependencies between components</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Controls */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Focus on:</label>
              <Select value={selectedEntity} onValueChange={setSelectedEntity}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select component..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All components</SelectItem>
                  {entities.map((entity) => (
                    <SelectItem key={entity.id} value={entity.id}>
                      {entity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">View:</label>
              <Select
                value={viewMode}
                onValueChange={(value: "dependencies" | "dependents" | "both") => setViewMode(value)}
              >
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="both">Both</SelectItem>
                  <SelectItem value="dependencies">Dependencies</SelectItem>
                  <SelectItem value="dependents">Dependents</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 25))}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
              <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setZoom(100)}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="outline" size="sm" onClick={exportGraph}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Graph Visualization */}
          <div className="border rounded-lg p-6 bg-white min-h-[500px] overflow-auto">
            <div
              className="relative"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top left",
                minWidth: "800px",
                minHeight: "600px",
              }}
            >
              {/* Simple node layout */}
              <div className="grid grid-cols-4 gap-8 p-8">
                {filteredNodes.map((node, index) => (
                  <div key={node.id} className="relative">
                    {/* Node */}
                    <div
                      className={`
                      p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md
                      ${getNodeColor(node.type)}
                      ${selectedEntity === node.id ? "ring-2 ring-blue-500" : ""}
                    `}
                    >
                      <div className="font-semibold text-sm mb-1">{node.name}</div>
                      <Badge variant="secondary" className="text-xs">
                        {node.type}
                      </Badge>
                      <div className="text-xs text-gray-600 mt-2">
                        <div>Dependencies: {node.dependencies.length}</div>
                        <div>Dependents: {node.dependents.length}</div>
                      </div>
                    </div>

                    {/* Connection lines (simplified) */}
                    {node.dependencies.length > 0 && (
                      <div className="absolute -bottom-4 left-1/2 w-px h-4 bg-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="absolute top-4 right-4 bg-white p-4 rounded-lg border shadow-sm">
                <h4 className="font-semibold text-sm mb-2">Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
                    <span className="text-xs">Service</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-300"></div>
                    <span className="text-xs">Website</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></div>
                    <span className="text-xs">Library</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-purple-100 border border-purple-300"></div>
                    <span className="text-xs">API</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{filteredNodes.length}</div>
              <div className="text-sm text-gray-600">Components</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {filteredNodes.reduce((sum, node) => sum + node.dependencies.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Dependencies</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {filteredNodes.reduce((sum, node) => sum + node.dependents.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Dependents</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(
                  (filteredNodes.reduce((sum, node) => sum + node.dependencies.length, 0) / filteredNodes.length) * 10,
                ) / 10}
              </div>
              <div className="text-sm text-gray-600">Avg Dependencies</div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
