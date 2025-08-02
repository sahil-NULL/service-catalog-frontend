"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Group } from "@/types"
import { Users, User, Calendar } from "lucide-react"

interface GroupCardProps {
  group: Group
  onClick: () => void
}

export function GroupCard({ group, onClick }: GroupCardProps) {
  return (
    <Card className="cursor-pointer transition-all hover:border-gray-300 hover:shadow-sm" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <Users className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{group.name}</h3>
          </div>
          <Badge variant="secondary" className="text-xs capitalize">
            {group.type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{group.description}</p>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{group.members} members</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{group.lead}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{group.updatedAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
