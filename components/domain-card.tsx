"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Domain } from "@/types"
import { Building2, User, Layers, Activity } from "lucide-react"

interface DomainCardProps {
  domain: Domain
  onClick: () => void
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

export function DomainCard({ domain, onClick }: DomainCardProps) {
  return (
    <Card className="cursor-pointer transition-all hover:border-gray-300 hover:shadow-sm" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{domain.name}</h3>
          </div>
          <Badge className={getStatusColor(domain.status)}>{domain.status}</Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{domain.description}</p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{domain.owner}</span>
          </div>
          <div className="flex items-center gap-1">
            <Layers className="h-3 w-3" />
            <span>{domain.systems.length} systems</span>
          </div>
          <div className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            <span>{domain.updatedAt}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {domain.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {domain.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{domain.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
