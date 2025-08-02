"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { Download, FileText, Database } from "lucide-react"

interface ExportSheetProps {
  isOpen: boolean
  onClose: () => void
  data: any[]
  dataType: string
}

export function ExportSheet({ isOpen, onClose, data, dataType }: ExportSheetProps) {
  const [exportFormat, setExportFormat] = useState<"csv" | "json" | "xlsx">("csv")
  const [includeFields, setIncludeFields] = useState({
    id: true,
    name: true,
    description: true,
    owner: true,
    status: true,
    type: true,
    tags: true,
    metadata: false,
    dependencies: false,
  })
  const [filterBy, setFilterBy] = useState("all")

  const handleFieldToggle = (field: string) => {
    setIncludeFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleExport = () => {
    const filteredData = data.filter((item) => {
      if (filterBy === "all") return true
      if (filterBy === "active") return item.status === "active"
      if (filterBy === "inactive") return item.status === "inactive"
      return true
    })

    const exportData = filteredData.map((item) => {
      const exported: any = {}
      Object.keys(includeFields).forEach((field) => {
        if (includeFields[field as keyof typeof includeFields] && item[field]) {
          exported[field] = Array.isArray(item[field]) ? item[field].join(", ") : item[field]
        }
      })
      return exported
    })

    if (exportFormat === "json") {
      const jsonString = JSON.stringify(exportData, null, 2)
      downloadFile(jsonString, `${dataType}-export.json`, "application/json")
    } else if (exportFormat === "csv") {
      const csvString = convertToCSV(exportData)
      downloadFile(csvString, `${dataType}-export.csv`, "text/csv")
    }

    onClose()
  }

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return ""

    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header] || ""
            return `"${value.toString().replace(/"/g, '""')}"`
          })
          .join(","),
      ),
    ].join("\n")

    return csvContent
  }

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export {dataType}
          </SheetTitle>
          <SheetDescription>Export your data in various formats with custom field selection</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Export Format */}
          <div className="space-y-3">
            <Label>Export Format</Label>
            <RadioGroup value={exportFormat} onValueChange={(value: "csv" | "json" | "xlsx") => setExportFormat(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  CSV (Comma Separated Values)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="json" id="json" />
                <Label htmlFor="json" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  JSON (JavaScript Object Notation)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Filter Options */}
          <div className="space-y-3">
            <Label>Filter Data</Label>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Field Selection */}
          <div className="space-y-3">
            <Label>Include Fields</Label>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(includeFields).map((field) => (
                <div key={field} className="flex items-center space-x-2">
                  <Checkbox
                    id={field}
                    checked={includeFields[field as keyof typeof includeFields]}
                    onCheckedChange={() => handleFieldToggle(field)}
                  />
                  <Label htmlFor={field} className="capitalize text-sm">
                    {field.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-3">
            <Label>Export Preview</Label>
            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              <div className="text-gray-600 mb-2">
                {data.length} total items • {Object.values(includeFields).filter(Boolean).length} fields selected
              </div>
              <div className="font-mono text-xs text-gray-500">
                {exportFormat === "csv"
                  ? "name,description,owner,status..."
                  : '{"name": "...", "description": "...", ...}'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleExport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export {exportFormat.toUpperCase()}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
