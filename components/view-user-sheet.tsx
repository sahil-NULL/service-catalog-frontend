"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@/types"
import { Edit, Code } from "lucide-react"

interface ViewUserSheetProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
}

export function ViewUserSheet({ user, isOpen, onClose }: ViewUserSheetProps) {
  if (!user) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle>{user.name}</SheetTitle>
              <SheetDescription>{user.role}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-8">
          {/* Overview Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Email</label>
                <p className="text-sm text-gray-900 mt-1">{user.email}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Team</label>
                <p className="text-sm text-gray-900 mt-1">{user.team}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Joined</label>
                <p className="text-sm text-gray-900 mt-1">{user.joinedAt}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Last Active</label>
                <p className="text-sm text-gray-900 mt-1">{user.lastActive}</p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-600 leading-relaxed">{user.description}</p>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Projects</h3>
            <div className="space-y-2">
              {user.projects.map((project, index) => (
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
            Edit Profile
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
