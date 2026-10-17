import { teamMembers } from '../../data/team'
import { Arrow } from '../common/Arrow'

function MemberMarkSvg({ shape }: { shape: 'reticle' | 'waveform' | 'matrix' | 'cube' }) {
  switch (shape) {
    case 'reticle':
      return (
        <svg viewBox="0 0 100 100" role="img" aria-label="System coordinate reticle">
          <circle cx="50" cy="50" r="42" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="26" />
          <circle cx="50" cy="50" r="8" />
          <path d="M50 4v92M4 50h92" />
          <path d="M26 50h-4M78 50h-4M50 26v-4M50 78v-4" />
        </svg>
      )
    case 'waveform':
      return (
        <svg viewBox="0 0 100 100" role="img" aria-label="Harmonic interaction wave">
          <path d="M10 50h80M50 10v80" strokeDasharray="2 2" />
          <path d="M15 50 Q 32.5 15, 50 50 T 85 50" />
          <rect x="20" y="20" width="60" height="60" strokeDasharray="4 4" />
        </svg>
      )
    case 'matrix':
      return (
        <svg viewBox="0 0 100 100" role="img" aria-label="Distributed node graph">
          <path d="M25 25h50v50H25z" strokeDasharray="3 3" />
          <path d="M25 25L75 75M75 25L25 75" />
          <circle cx="25" cy="25" r="4" fill="currentColor" />
          <circle cx="75" cy="25" r="4" fill="currentColor" />
          <circle cx="25" cy="75" r="4" fill="currentColor" />
          <circle cx="75" cy="75" r="4" fill="currentColor" />
          <circle cx="50" cy="50" r="6" />
        </svg>
      )
    case 'cube':
      return (
        <svg viewBox="0 0 100 100" role="img" aria-label="Isometric container cube">
          <path d="M50 16L82 34V70L50 88L18 70V34Z" />
          <path d="M50 16V52M50 52L82 70M50 52L18 70" />
          <circle cx="50" cy="52" r="3" fill="currentColor" />
        </svg>
      )
  }
}

export function Team() {
  return (
    <section id="team" className="team section-shell">
      <div className="section-top mono">
        <span>[ 04 ] THE COLLECTIVE</span>
        <span>04 DEVELOPERS / SHARED OWNERSHIP</span>
      </div>
      <div className="team-intro">
        <h2>
          Different minds<br />
          Same commit
        </h2>
        <p>
          Four developers working across interfaces, application logic, and data. One team, from blueprint to
          production.
        </p>
      </div>
      <div className="team-roster">
        {teamMembers.map((member, i) => (
          <article key={member.id} className="team-card">
            <div className="team-card-head mono">
              <span className="member-slot">{member.slot}</span>
              <span className="member-status">{member.status}</span>
            </div>

            <div className="member-mark" aria-hidden="true">
              <span className="member-count">0{i + 1}</span>
              <MemberMarkSvg shape={member.svgShape} />
            </div>

            <div className="team-card-body">
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role mono">{member.role}</p>
              <p className="member-bio">{member.bio}</p>

              <div className="member-stack mono">
                {member.stack.map(tag => (
                  <span key={tag} className="stack-tag">{tag}</span>
                ))}
              </div>

              {member.github && (
                <div className="team-card-foot">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="member-link mono"
                  >
                    <span>Inspect commits</span>
                    <Arrow />
                  </a>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
