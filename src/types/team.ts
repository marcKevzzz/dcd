export interface TeamMember {
  id: string
  slot: string
  name: string
  role: string
  bio: string
  stack: string[]
  github?: string
  status: string
  svgShape: 'reticle' | 'waveform' | 'matrix' | 'cube'
}
