export interface Entity {
  id: string
  name: string
  type: "service" | "website" | "library" | "api"
  description: string
  owner: string
  repository: string
  status: "active" | "inactive" | "deprecated"
  version: string
  lastUpdated: string
  dependencies: string[]
  tags: string[]
  metadata: Array<{
    key: string
    value: string
  }>
}
