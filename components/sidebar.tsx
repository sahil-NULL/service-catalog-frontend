"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { LayoutGrid, Box, Plug, Database, Building2, Users, User, Search, FileText } from "lucide-react"
import type { ViewType } from "@/app/page"

const navigationSections = [
  {
    title: "Catalog",
    items: [
      { name: "Components", icon: LayoutGrid, badge: "42", view: "components" as ViewType },
      { name: "Systems", icon: Box, badge: "18", view: "systems" as ViewType },
      { name: "APIs", icon: Plug, badge: "28", view: "apis" as ViewType },
      { name: "Resources", icon: Database, badge: "15", view: "resources" as ViewType },
    ],
  },
  {
    title: "Organization",
    items: [
      { name: "Domains", icon: Building2, badge: "8", view: "domains" as ViewType },
      { name: "Groups", icon: Users, badge: "12", view: "groups" as ViewType },
      { name: "Users", icon: User, badge: "124", view: "users" as ViewType },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Search", icon: Search, view: "components" as ViewType },
      { name: "Templates", icon: FileText, badge: "8", view: "templates" as ViewType },
    ],
  },
]

interface SidebarProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <nav className="w-70 bg-white border-r border-gray-200 py-6">
      {navigationSections.map((section) => (
        <div key={section.title} className="mb-8">
          <h3 className="px-6 pb-3 mb-3 text-xs font-semibold text-gray-500 uppercase border-b border-gray-100">
            {section.title}
          </h3>

          {section.items.map((item) => {
            const Icon = item.icon
            const isActive = item.view === currentView

            return (
              <div
                key={item.name}
                className={cn(
                  "flex items-center gap-3 px-6 py-2.5 cursor-pointer transition-all",
                  "hover:bg-gray-50 hover:text-gray-900",
                  isActive ? "bg-blue-50 text-blue-900 border-r-2 border-blue-600" : "text-gray-600",
                )}
                onClick={() => onViewChange(item.view)}
              >
                <Icon className="h-5 w-5" />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
