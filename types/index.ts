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

export interface User {
  id: string
  name: string
  email: string
  role: string
  team: string
  avatar: string
  description: string
  joinedAt: string
  lastActive: string
  skills: string[]
  projects: string[]
}

export interface Group {
  id: string
  name: string
  description: string
  team: string
  members: number
  lead: string
  createdAt: string
  updatedAt: string
  type: "team" | "squad" | "guild"
  projects: string[]
}

export interface Domain {
  id: string
  name: string
  description: string
  owner: string
  systems: string[]
  status: "active" | "inactive" | "deprecated"
  createdAt: string
  updatedAt: string
  tags: string[]
}

export interface Template {
  id: string
  name: string
  description: string
  language: string
  framework: string
  author: string
  createdAt: string
  updatedAt: string
  downloads: number
  tags: string[]
  category: string
}
