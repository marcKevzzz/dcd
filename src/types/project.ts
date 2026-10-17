export interface Project {
  id: string
  number: string
  year: string
  name: string
  category: string
  stack: string[]
  description: string
  detail: string
  features: string[]
  nodes: string[]
  url: string | null
  stage?: string
}
