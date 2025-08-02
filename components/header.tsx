"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Bell, Building, Users, Code, Server, BarChart3, Palette } from "lucide-react"

interface HeaderProps {
  selectedGroup: string
  onGroupChange: (group: string) => void
}

const organizationStructure = [
  {
    name: "All Organizations",
    icon: Building,
    children: [
      {
        name: "Engineering",
        icon: Users,
        children: [
          { name: "Frontend Team", icon: Code },
          { name: "Backend Team", icon: Server },
        ],
      },
      {
        name: "Product",
        icon: BarChart3,
        children: [{ name: "Design Team", icon: Palette }],
      },
    ],
  },
]

export function Header({ selectedGroup, onGroupChange }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <div className="text-xl font-semibold text-gray-900">🎭 Service Catalog</div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              {selectedGroup}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => onGroupChange("All Organizations")}>
              <Building className="h-4 w-4 mr-2" />
              All Organizations
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onGroupChange("Engineering Team")} className="pl-6">
              <Users className="h-4 w-4 mr-2" />
              Engineering
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onGroupChange("Frontend Team")} className="pl-8">
              <Code className="h-4 w-4 mr-2" />
              Frontend Team
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onGroupChange("Backend Team")} className="pl-8">
              <Server className="h-4 w-4 mr-2" />
              Backend Team
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onGroupChange("Product Team")} className="pl-6">
              <BarChart3 className="h-4 w-4 mr-2" />
              Product
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onGroupChange("Design Team")} className="pl-8">
              <Palette className="h-4 w-4 mr-2" />
              Design Team
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center">
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
