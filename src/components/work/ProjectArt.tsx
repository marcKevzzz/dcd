import type { Project } from '../../types/project'
import { Blueprint } from './Blueprint'

interface ProjectArtProps {
  project: Project
  index: number
}

export function ProjectArt({ project, index }: ProjectArtProps) {
  if (project.id === 'helmet-cartel') {
    return (
      <div className="helmet-visual">
        <img
          src="/images/helmet-storefront.png"
          alt="Helmet Cartel digital storefront"
          width="1023"
          height="529"
          loading="lazy"
        />
        <div className="image-caption mono">
          HELMET CARTEL / STOREFRONT <span>USER-SUPPLIED CAPTURE</span>
        </div>
      </div>
    )
  }
  return <Blueprint nodes={project.nodes} index={index} />
}
