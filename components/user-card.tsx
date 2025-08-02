"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@/types"
import { Mail, Clock } from "lucide-react"

interface UserCardProps {
  user: User
  onClick: () => void
}

export function UserCard({ user, onClick }: UserCardProps) {
  return (
    <Card className="cursor-pointer transition-all hover:border-gray-300 hover:shadow-sm" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.role}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {user.team}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{user.description}</p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{user.lastActive}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {user.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {user.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{user.skills.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
