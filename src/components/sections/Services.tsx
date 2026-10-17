import { services } from '../../data/services'

export function Services() {
  const handleServiceEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const fromTop = e.clientY - rect.top < rect.height / 2
    e.currentTarget.style.setProperty('--origin', fromTop ? 'top' : 'bottom')
  }

  const handleServiceLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const toTop = e.clientY - rect.top < rect.height / 2
    e.currentTarget.style.setProperty('--origin', toTop ? 'top' : 'bottom')
  }

  return (
    <section id="services" className="services-section section-shell">
      <div className="section-top mono">
        <span>[ 03 ] SERVICES</span>
        <a href="#contact" className="services-top-link">
          ALL SERVICES →
        </a>
      </div>
      <ol className="services-list">
        {services.map(s => (
          <li key={s.number} className="service-row">
            <a
              href="#contact"
              className="service__link"
              data-cursor={s.cursor}
              onMouseEnter={handleServiceEnter}
              onMouseLeave={handleServiceLeave}
            >
              <span className="service__n mono" aria-hidden="true">
                {s.number}
              </span>
              <h2 className="service__title">{s.title}</h2>
              <div className="service__content">
                <p className="service__body">{s.body}</p>
                <ul className="service__tags">
                  {s.tags.map(t => (
                    <li key={t} className="mono">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="service__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
