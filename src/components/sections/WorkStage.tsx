import { Arrow } from '../common/Arrow'
import { ProjectArt } from '../work/ProjectArt'
import { projects } from '../../data/projects'

interface WorkStageProps {
  activeWork: number
  stageIndex: number
  stageFill: number
}

export function WorkStage({ activeWork, stageIndex, stageFill }: WorkStageProps) {
  return (
    <section id="work" className="work section-shell">
      <div className="section-top mono">
        <span>[ 02 ] SELECTED WORK</span>
        <span>FIELD REPORTS · {String(projects.length).padStart(2, '0')} SYSTEMS</span>
      </div>

      <div className="work-intro">
        <h2 className="sr-only">Selected Work</h2>
        <p className="work-intro-lead">
          Healthcare, hospitality, retail<span className="accent">.</span> A look at the interfaces and the engineering underneath—from Samson Dental's clinical workspace and Hole In Hub's hospitality ERP to Helmet Cartel's retail operations<span className="accent">.</span>
        </p>
      </div>

      {/* Desktop Pinned Stage */}
      <div className="ws is-pinned" data-work-stage>
        <div className="ws__count" aria-hidden="true">
          <span className="ws__n-wrap">
            <div className="ws__reel">
              {projects.map(p => (
                <span key={p.id}>{p.number}</span>
              ))}
            </div>
          </span>
          <span className="ws__of outline-text">/{String(projects.length).padStart(2, '0')}</span>
        </div>

        <div className="ws__stages mono" aria-hidden="true">
          <ol>
            <li>
              <span className="ws__stage-num">01</span>
              <b>Design</b>
              <i className="ws__stage-bar" />
            </li>
            <li>
              <span className="ws__stage-num">02</span>
              <b>Code</b>
              <i className="ws__stage-bar" />
            </li>
            <li>
              <span className="ws__stage-num">03</span>
              <b>Deploy</b>
              <i className="ws__stage-bar" />
            </li>
          </ol>
          <div className="ws__rail">
            {projects.map((_, i) => (
              <i key={i} className={`ws__rail-bar ${i === 0 ? 'is-on' : ''}`} />
            ))}
          </div>
        </div>

        {projects.map((project, i) => (
          <div key={project.id} className="ws__item" data-index={i}>
            <div className="ws__panel">
              <div className="ws__meta mono">
                <span>
                  {project.number} / {project.year}
                </span>
                {/* <span>{project.stack.slice(0, 3).join(' · ')}</span> */}
              </div>
              <h3 className="ws__title">{project.name}</h3>
              <p className="mono category">{project.category}</p>
              <p className="ws__summary">{project.detail}</p>
              <div className="ws__actions">
                <a
                  className="button button-small"
                  href={project.url || '#work'}
                  target={project.url ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  Read the case study <Arrow />
                </a>
              </div>
            </div>

            <div className="ws__art-container" style={{ zIndex: i + 1 }}>
              <div className="ws__art">
                <ProjectArt project={project} index={i} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile / Fallback Stacked Cards */}
      <div className="ws-cards-mobile">
        {projects.map((project, index) => (
          <article key={project.id} className="ws-card">
            <div className="project-copy">
              <div className="ws__meta mono">
                <span>
                  {project.number} / {project.year}
                </span>
                {/* <span>{project.stack.slice(0, 3).join(' · ')}</span> */}
              </div>
              <h3 className="ws__title">{project.name}</h3>
              <p className="mono category">{project.category}</p>
              <p className="ws__summary">{project.detail}</p>
              <div className="ws__actions">
                <a
                  className="button button-small"
                  href={project.url || '#work'}
                  target={project.url ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  Read the case study <Arrow />
                </a>
              </div>
            </div>
            <div className="ws__art">
              <ProjectArt project={project} index={index} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
