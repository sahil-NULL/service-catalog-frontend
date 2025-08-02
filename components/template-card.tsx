"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Template } from "@/types"
import { FileText, Download, User, Calendar } from "lucide-react"

interface TemplateCardProps {
  template: Template
  onClick: () => void
}

export function TemplateCard({ template, onClick }: TemplateCardProps) {
  return (
    <Card className="cursor-pointer transition-all hover:border-gray-300 hover:shadow-sm" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{template.name}</h3>
          </div>
          <Badge variant="secondary" className="text-xs">
            {template.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.description}</p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <span className="font-medium">{template.language}</span>
            <span>/</span>
            <span>{template.framework}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            <span>{template.downloads}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{template.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{template.updatedAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
