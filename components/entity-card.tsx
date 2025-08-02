"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Entity } from "@/types/entity"
import {
  Box,
  Layers,
  Plug,
  User,
  GitBranch,
  Activity,
  Globe,
  Shield,
  Package,
  Download,
  Clock,
  Cpu,
  Gauge,
  Monitor,
  Lock,
  Users,
  Zap,
} from "lucide-react"

interface EntityCardProps {
  entity: Entity
  onClick: () => void
}

const getEntityIcon = (type: string) => {
  switch (type) {
    case "service":
      return Box
    case "website":
      return Layers
    case "library":
      return Plug
    case "api":
      return Plug
    default:
      return Box
  }
}

const getEntityIconColor = (type: string) => {
  switch (type) {
    case "service":
      return "bg-green-100 text-green-700"
    case "website":
      return "bg-yellow-100 text-yellow-700"
    case "library":
      return "bg-blue-100 text-blue-700"
    case "api":
      return "bg-blue-100 text-blue-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const getMetaIcon = (key: string) => {
  switch (key) {
    case "owner":
      return User
    case "branch":
      return GitBranch
    case "status":
      return Activity
    case "environment":
      return Globe
    case "compliance":
      return Shield
    case "version":
      return Package
    case "downloads":
      return Download
    case "updated":
      return Clock
    case "technology":
      return Cpu
    case "performance":
      return Gauge
    case "type":
      return Monitor
    case "access":
      return Lock
    case "users":
      return Users
    case "cache":
      return Zap
    default:
      return Activity
  }
}

export function EntityCard({ entity, onClick }: EntityCardProps) {
  const Icon = getEntityIcon(entity.type)
  const iconColorClass = getEntityIconColor(entity.type)

  return (
    <Card className="cursor-pointer transition-all hover:border-gray-300 hover:shadow-sm" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColorClass}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{entity.name}</h3>
          </div>
          <Badge variant="secondary" className="text-xs">
            {entity.type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{entity.description}</p>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          {entity.metadata.map((meta, index) => {
            const MetaIcon = getMetaIcon(meta.key)
            return (
              <div key={index} className="flex items-center gap-1">
                <MetaIcon className="h-3 w-3" />
                <span>{meta.value}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
