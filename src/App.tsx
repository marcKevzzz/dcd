import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 'samson',
    number: '01',
    year: '2026',
    name: 'Samson Dental Center',
    category: 'Healthcare management platform',
    stack: ['ASP.NET Core', 'React', 'PostgreSQL', 'SignalR'],
    description: 'Less administration. More care.',
    detail: 'A connected clinical workspace that brings patient records, scheduling, and role-based workflows into one system.',
    features: ['Role-based clinical workflow dashboard', 'Automated patient scheduling', 'Electronic health records', 'Real-time appointment sync'],
    nodes: ['Clinical dashboard', 'Patient records', 'Scheduling', 'SignalR sync'],
    url: 'https://samsondentalcenter-website.chrbuilds.dev',
  },
  {
    id: 'hole-in-hub',
    number: '02',
    year: '2026',
    name: 'Hole In Hub Golf & Lounge',
    category: 'Entertainment & hospitality ERP',
    stack: ['PERN Stack', 'Supabase', 'Express.js', 'Tailwind CSS'],
    description: 'Every bay. Every bill. In sync.',
    detail: 'The operational connections behind a golf lounge: from reserving a bay to closing the bill and keeping inventory aligned.',
    features: ['Integrated point-of-sale', 'Bay reservation management', 'Real-time inventory tracking', 'Automated billing engine'],
    nodes: ['Bay reservations', 'Point of sale', 'Inventory', 'Billing engine'],
    url: 'https://holeinhub-ptp.vercel.app',
  },
  {
    id: 'helmet-cartel',
    number: '03',
    year: '2026',
    name: 'Helmet Cartel Merchandise',
    category: 'Retail operations & storefront system',
    stack: ['ASP.NET Web Forms', 'C#', 'SQL Server', 'Chart.js'],
    description: 'One storefront. The whole operation.',
    detail: 'A dual-architecture retail system connecting a multi-brand helmet storefront with the information a store needs to operate.',
    features: ['Shoei, AGV, Gille, HNJ & Zebra inventory filters', 'Sales velocity and revenue telemetry', 'Low-stock notifications', 'Live operational audit logs'],
    nodes: ['Storefront', 'Inventory filters', 'Operations', 'SQL Server'],
    url: null,
  },
]

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'} /></svg>
}

function Blueprint({ nodes, index }: { nodes: string[]; index: number }) {
  return (
    <div className={`system-drawing drawing-${index}`} role="img" aria-label={`Conceptual workflow: ${nodes.join(', ')}`}>
      <div className="drawing-meta"><span>FIG. 0{index + 1} / SYSTEM MAP</span><span>CONCEPTUAL VIEW</span></div>
      <svg viewBox="0 0 700 330" className="drawing-svg" aria-hidden="true">
        <g className="draw-lines" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M80 90h540v170H80zM80 123h540M264 123v137M80 170h184M80 215h184M299 154h284v78H299zM312 215l40-20 45 9 42-35 42 17 46-24 44 8"/>
          <path d="M112 106h4m8 0h4m8 0h4M105 145h128m-128 48h92m-92 46h112M312 246h70m18 0h70m18 0h70"/>
          <path strokeDasharray="4 5" d="M30 90h35m570 0h35M80 38v37m540-37v37M350 270v37M30 260h35m570 0h35"/>
          <path d="M80 52h540m-540-5v10m540-10v10M650 90v170m-5-170h10m-10 170h10"/>
        </g>
        <text x="350" y="43" textAnchor="middle" className="svg-label">CONNECTED WORKFLOW / 04 NODES</text>
        <text x="112" y="310" className="svg-label">INPUT → PROCESS → PERSIST → SYNC</text>
      </svg>
      <div className="node-strip">{nodes.map((node, i) => <span key={node}><small>0{i + 1}</small>{node}</span>)}</div>
    </div>
  )
}

function ProjectArt({ project, index }: {
  project: typeof projects[number]
  index: number
}) {
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

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const search = useRef<HTMLInputElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const smoothScroll = useRef<Lenis | null>(null)
  const [light, setLight] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const [progress, setProgress] = useState(0)
  const [activeWork, setActiveWork] = useState(0)
  const [stageIndex, setStageIndex] = useState(0)
  const [stageFill, setStageFill] = useState(0)

  const actions = [
    { label: 'Home', hint: '/', run: () => navigate('home') },
    { label: 'Selected work', hint: '/work', run: () => navigate('work') },
    { label: 'Our approach', hint: '/approach', run: () => navigate('approach') },
    { label: 'The team', hint: '/team', run: () => navigate('team') },
    { label: 'Toggle light / dark', hint: 'THEME', run: () => setLight(value => !value) },
  ].filter(action => action.label.toLowerCase().includes(query.toLowerCase()))

  function closeMenu() { dialog.current?.close(); smoothScroll.current?.start(); previousFocus.current?.focus() }
  function openMenu() { previousFocus.current = document.activeElement as HTMLElement; setQuery(''); setSelected(0); dialog.current?.showModal(); smoothScroll.current?.stop(); search.current?.focus() }
  function navigate(id: string) {
    closeMenu()
    if (smoothScroll.current) smoothScroll.current.scrollTo(`#${id}`)
    else document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
  }

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); dialog.current?.open ? closeMenu() : openMenu() }
    }
    const update = () => {
      const height = document.documentElement.scrollHeight - innerHeight
      setProgress(height > 0 ? Math.round(scrollY / height * 100) : 0)
    }
    document.addEventListener('keydown', keydown)
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => {
      document.removeEventListener('keydown', keydown)
      window.removeEventListener('scroll', update)
    }
  }, [])

  useEffect(() => {
    const media = gsap.matchMedia()
    media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 1024px)' }, ({ conditions }) => {
      if (!conditions?.motion) return
      const desktop = !!conditions.desktop
      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        anchors: true,
        prevent: element => !!element.closest('dialog'),
      })
      smoothScroll.current = lenis
      if (dialog.current?.open) lenis.stop()
      lenis.on('scroll', ScrollTrigger.update)
      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)

      const context = gsap.context(() => {
        // Hero Intro reveal
        const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
        intro.fromTo('.hero-title', { '--ink-clip': '100%', '--wire-opacity': 1 }, { '--ink-clip': '0%', '--wire-opacity': 0, duration: 1.15 }, .12)
          .from('.hero-statement-text', { opacity: 0, y: 16, duration: 0.8 }, .4)
          .from('.hero-telemetry > span', { opacity: 0, duration: .5, stagger: .1 }, .85)
          .from('.hero-bottom > *', { y: 18, opacity: 0, duration: .75, stagger: .12 }, .95)

        gsap.to('.hero-content', {
          y: -40, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .8 },
        })

        // Manifesto animation: unpinned, wireframe fill on scroll matching piergorelli
        const manifestoTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.manifesto',
            start: 'top 70%',
            end: 'bottom 55%',
            scrub: true,
          },
        })
        manifestoTl.fromTo(
          '.wf-solid',
          { clipPath: 'inset(-0.35em 100% -0.45em 0em)' },
          { clipPath: 'inset(-0.35em 0% -0.45em 0em)', stagger: 0.5, ease: 'none' }
        )
        manifestoTl.to('[data-wf-note]', { opacity: 0.25, ease: 'none' }, 0.3)
        manifestoTl.from('.manifesto-lead', { y: 24, opacity: 0.2, duration: 0.5, ease: 'power2.out' }, 0.5)

        // Selected Work pinned stage on desktop
        if (desktop) {
          ScrollTrigger.create({
            trigger: '.ws.is-pinned',
            start: 'top 88px',
            end: () => `+=${innerHeight * 2.4}`,
            pin: true,
            scrub: 0.35,
            fastScrollEnd: true,
            preventOverlaps: true,
            onUpdate: (self) => {
              const p = self.progress
              const count = projects.length

              if (p >= 0.99) {
                setActiveWork(count - 1)
                setStageIndex(2)
                setStageFill(1)
                return
              }

              const total = p * count
              const pIdx = Math.min(count - 1, Math.floor(total))
              setActiveWork(pIdx)

              const within = total - pIdx
              const stagePos = within * 3
              const sIdx = Math.min(2, Math.floor(stagePos))
              const fill = Math.min(1, Math.max(0, stagePos - sIdx))

              setStageIndex(sIdx)
              setStageFill(fill)
            },
          })
        }

        // Team mark subtle rotation
        gsap.from('.member-mark svg', {
          rotation: -12, scale: .85, transformOrigin: 'center', ease: 'none',
          scrollTrigger: { trigger: '.team-roster', start: 'top 95%', end: 'top 45%', scrub: .7 },
        })
      }, root)

      let disposed = false
      document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
      return () => {
        disposed = true
        context.revert()
        gsap.ticker.remove(tick)
        lenis.destroy()
        smoothScroll.current = null
      }
    })
    return () => media.revert()
  }, [])

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    document.documentElement.classList.add('has-cursor')
    const cursor = document.querySelector<HTMLElement>('.cursor')
    const ch = cursor?.querySelector<HTMLElement>('.cursor__h')
    const cv = cursor?.querySelector<HTMLElement>('.cursor__v')
    const cpt = cursor?.querySelector<HTMLElement>('.cursor__pt')
    const clabel = cursor?.querySelector<HTMLElement>('.cursor__label')

    if (!cursor || !ch || !cv || !cpt || !clabel) return

    const setH = gsap.quickTo(ch, 'y', { duration: 0.08, ease: 'power3.out' })
    const setV = gsap.quickTo(cv, 'x', { duration: 0.08, ease: 'power3.out' })
    const setPtX = gsap.quickTo(cpt, 'x', { duration: 0.16, ease: 'power3.out' })
    const setPtY = gsap.quickTo(cpt, 'y', { duration: 0.16, ease: 'power3.out' })

    let hoveredEl: HTMLElement | null = null
    let magneticEl: HTMLElement | null = null

    const formatCoords = (x: number, y: number) =>
      `x ${String(Math.round(x)).padStart(4, '0')} · y ${String(Math.round(y)).padStart(4, '0')}`

    const onMove = (e: MouseEvent) => {
      cursor.classList.add('is-visible')
      setH(e.clientY)
      setV(e.clientX)
      setPtX(e.clientX)
      setPtY(e.clientY)

      if (!hoveredEl) {
        clabel.textContent = `x ${String(Math.round(e.clientX)).padStart(4, '0')} · y ${String(Math.round(e.clientY)).padStart(4, '0')}`
      }

      const targetBtn = (e.target as HTMLElement)?.closest<HTMLElement>('.button, .circle-button')
      if (targetBtn !== magneticEl) {
        if (magneticEl) gsap.to(magneticEl, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
        magneticEl = targetBtn
      }
      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect()
        gsap.to(magneticEl, {
          x: (e.clientX - (rect.left + rect.width / 2)) * 0.22,
          y: (e.clientY - (rect.top + rect.height / 2)) * 0.28,
          duration: 0.3,
          ease: 'power3.out',
        })
      }
    }

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement)?.closest<HTMLElement>('a, button, summary, details, [data-cursor]')
      if (interactive !== hoveredEl) {
        hoveredEl = interactive
        cursor.classList.toggle('is-hover', !!interactive)
        if (interactive) {
          clabel.textContent =
            interactive.dataset.cursor ??
            (interactive.tagName === 'A' && (interactive as HTMLAnchorElement).target === '_blank'
              ? 'visit ↗'
              : interactive.tagName === 'A'
              ? 'open →'
              : 'click')
        }
      }
    }

    const onLeave = () => cursor.classList.remove('is-visible')
    const onDown = () => cursor.classList.add('is-down')
    const onUp = () => cursor.classList.remove('is-down')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  const currentProject = projects[activeWork]

  return (
    <div id="home" ref={root} className={`portfolio ${light ? 'light' : ''}`}>
      <div className="cursor" aria-hidden="true">
        <span className="cursor__h" />
        <span className="cursor__v" />
        <span className="cursor__pt">
          <span className="cursor__ring" />
          <span className="cursor__label mono" />
        </span>
      </div>
      <a className="skip-link" href="#main">Skip to content</a>

      {/* Header */}
      <header className={`header ${progress > 0 ? 'is-scrolled' : ''}`}>
        <a href="#home" className="brand" aria-label="dcd. home">dcd<span>.</span></a>
        <nav aria-label="Main navigation">
          <a href="#work" className="nav-link"><small>01</small> <span className="nav-label"><span className="nav-label-inner" data-label="Work">Work</span></span></a>
          <a href="#approach" className="nav-link"><small>02</small> <span className="nav-label"><span className="nav-label-inner" data-label="Approach">Approach</span></span></a>
          <a href="#team" className="nav-link"><small>03</small> <span className="nav-label"><span className="nav-label-inner" data-label="Team">Team</span></span></a>
        </nav>
        <div className="header-controls">
          <button className="circle-button" aria-label={`Switch to ${light ? 'dark' : 'light'} theme`} onClick={() => setLight(!light)}>
            <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
              <circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor"/>
              <path d="M10 3.5a6.5 6.5 0 0 1 0 13z" fill="currentColor"/>
            </svg>
          </button>
          <a href="#work" className="button button-small">Explore the work <Arrow /></a>
        </div>
        <div className="nav-ruler" aria-hidden="true">
          <div className="ruler-track" />
          <div className="ruler-progress" style={{ width: `${progress}%` }} />
          <span className="ruler-marker mono" style={{ left: `clamp(16px, ${progress}%, calc(100% - 16px))` }}>
            {String(progress).padStart(2, '0')}%
          </span>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-ink">We Decide<span className="accent">.</span></span>
              <span className="hero-title-wire" aria-hidden="true">We Decide.</span>
            </h1>
            <p className="hero-statement">
              <span className="hero-statement-text">Web &amp; systems engineering for creative agencies and enterprises, when the idea is hard to build.</span>
              <span className="typing-caret" aria-hidden="true" />
            </p>
            <div className="hero-telemetry mono">
              <span><i className="dot" /> HUMAN / BUILT TOGETHER</span>
              <span><i className="diamond" /> SYSTEM / DESIGNED TO CONNECT</span>
              <span className="telemetry-note">NO BLACK BOXES</span>
            </div>
            <div className="hero-bottom">
              <p>Four developers. From the first decision to deployment.<br /> We design and build systems that work together.</p>
              <div className="hero-actions flex gap-3">
                <a href="#work" className="button button-primary">See the systems <Arrow /></a>
                <a href="#team" className="button">Meet the collective <Arrow diagonal /></a>
              </div>
            </div>
          </div>
        </section>

        {/* Approach / Manifesto (Unpinned & animated matching reference) */}
        <section className="manifesto section-shell" id="approach" data-wireframe>
          <div className="section-top mono">
            <span>[ 01 ] MANIFESTO</span>
            <span data-wf-note>FIG. 01 · WIREFRAME → PRODUCTION</span>
          </div>
          <div className="manifesto-stage">
            <div className="wf-row">
              <h2 className="wf-line">
                <span className="outline-text" aria-hidden="true">Decide &amp; design.</span>
                <span className="wf-solid"><span className="wf-solid__inner">Decide &amp; design.</span></span>
              </h2>
              <span className="wf-dim mono" data-wf-note aria-hidden="true">↤ 12 COL ↦</span>
            </div>
            <div className="wf-row">
              <h2 className="wf-line">
                <span className="outline-text" aria-hidden="true">Code with intent.</span>
                <span className="wf-solid"><span className="wf-solid__inner">Code with intent.</span></span>
              </h2>
              <span className="wf-dim mono" data-wf-note aria-hidden="true">FONT-SIZE: 7.1VW</span>
            </div>
            <div className="wf-row">
              <h2 className="wf-line">
                <span className="outline-text" aria-hidden="true">Deploy with care.</span>
                <span className="wf-solid"><span className="wf-solid__inner">Deploy with care.</span></span>
              </h2>
              <span className="wf-dim mono" data-wf-note aria-hidden="true">LS −0.035EM</span>
            </div>
            <div className="manifesto-body">
              <p className="manifesto-lead">
                Every system starts with a decision. We ask what people actually need, map the workflow, and get the whole system through production intact—from the first line of code to live deployment.
              </p>
            </div>
          </div>
        </section>

        {/* Selected Work (Pier Gorelli Work Stage Structure) */}
        <section id="work" className="work section-shell">
          <div className="section-top mono">
            <span>[ 02 ] SELECTED WORK</span>
            <span>FIELD REPORTS · 03 SYSTEMS</span>
          </div>
          <div className="work-intro">
            <h2>Built for the<br /><span className="muted">real world.</span></h2>
            <p className="work-intro-lead">Healthcare, hospitality, retail. A look at the interfaces above and the engineering underneath.</p>
          </div>

          {/* Desktop Pinned Stage */}
          <div className="ws is-pinned" data-work-stage>
            <div className="ws__count" aria-hidden="true">
              <span className="ws__n">{currentProject.number}</span>
              <span className="ws__of outline-text">/03</span>
            </div>

            <div className="ws__stages mono" aria-hidden="true">
              <ol>
                <li className={stageIndex === 0 ? 'is-active' : ''}>
                  <span>01</span><b>Plot</b>
                  <i style={{ transform: `scaleX(${stageIndex === 0 ? stageFill : stageIndex > 0 ? 1 : 0})` }} />
                </li>
                <li className={stageIndex === 1 ? 'is-active' : ''}>
                  <span>02</span><b>Build</b>
                  <i style={{ transform: `scaleX(${stageIndex === 1 ? stageFill : stageIndex > 1 ? 1 : 0})` }} />
                </li>
                <li className={stageIndex === 2 ? 'is-active' : ''}>
                  <span>03</span><b>Live</b>
                  <i style={{ transform: `scaleX(${stageIndex === 2 ? stageFill : 0})` }} />
                </li>
              </ol>
              <div className="ws__rail">
                {projects.map((_, i) => (
                  <i key={i} className={i <= activeWork ? 'is-on' : ''} />
                ))}
              </div>
            </div>

            <div className="ws__panel">
              <div className="ws__meta mono">
                <span>{currentProject.number} / {currentProject.year}</span>
                <span>{currentProject.stack.slice(0, 3).join(' · ')}</span>
              </div>
              <h3 className="ws__title">{currentProject.name}</h3>
              <p className="mono category">{currentProject.category}</p>
              <p className="ws__summary">{currentProject.detail}</p>
              <div className="ws__actions">
                <a
                  className="button button-small"
                  href={currentProject.url || '#work'}
                  target={currentProject.url ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  Read the case study <Arrow />
                </a>
              </div>
            </div>

            <div className="ws__art-container">
              <div className="ws__art">
                <ProjectArt project={currentProject} index={activeWork} />
              </div>
            </div>
          </div>

          {/* Mobile / Fallback Stacked Cards */}
          <div className="ws-cards-mobile">
            {projects.map((project, index) => (
              <article key={project.id} className="ws-card">
                <div className="project-copy">
                  <div className="ws__meta mono">
                    <span>{project.number} / {project.year}</span>
                    <span>{project.stack.slice(0, 3).join(' · ')}</span>
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

        {/* Team */}
        <section id="team" className="team section-shell">
          <div className="section-top mono">
            <span>[ 03 ] THE COLLECTIVE</span>
            <span>04 DEVELOPERS / SHARED OWNERSHIP</span>
          </div>
          <div className="team-intro">
            <h2>Different minds.<br />Same commit.</h2>
            <p>Four developers working across interfaces, application logic, and data. One team, from blueprint to production.</p>
          </div>
          <div className="team-roster">
            {[1, 2, 3, 4].map(i => (
              <div key={i}>
                <span className="mono">DEV / 0{i}</span>
                <div className="member-mark" aria-hidden="true">
                  <span>0{i}</span>
                  <svg viewBox="0 0 100 100"><path d="M0 50h100M50 0v100M15 15h70v70H15z" /></svg>
                </div>
                <h3>Team member {i}</h3>
                <p className="mono">PROFILE TO BE ADDED</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer section-shell" id="contact">
        <div className="grid-12 footer-top">
          <p className="footer-claim">
            Got a brief that needs to move?{' '}
            <a href="mailto:hello@dcd.dev" className="link--inline accent">
              Let's talk.
            </a>
          </p>
          <div className="footer-col">
            <p className="note">Site</p>
            <ul>
              <li><a href="#work" className="link">Work</a></li>
              <li><a href="#approach" className="link">Services</a></li>
              <li><a href="#team" className="link">About</a></li>
              <li><a href="#approach" className="link">Blog</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <p className="note">Elsewhere</p>
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/piergorelli/" target="_blank" rel="noopener noreferrer" className="link">
                  LinkedIn <span className="arrow" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/lupin72" target="_blank" rel="noopener noreferrer" className="link">
                  GitHub <span className="arrow" aria-hidden="true">↗</span>
                </a>
              </li>
              <li><a href="#feed" className="link">RSS</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <p className="note">Contact</p>
            <ul>
              <li><a href="mailto:hello@dcd.dev" className="link">Send a brief</a></li>
              <li>
                <a href="mailto:hello@dcd.dev" className="link">
                  Book a call <span className="arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-sign">
          <p className="footer-mark" aria-hidden="true">We Decide.</p>
        </div>

        <div className="footer-bottom note">
          <p className="copy">
            <span>© 2026 PIER GORELLI</span>
            <span>DESIGNED AND BUILT IN VALENCIA</span>
          </p>
          <span className="hint">
            Press <kbd>⌥G</kbd> for the grid · <kbd role="button" tabIndex={0} onClick={openMenu} className="kbd-btn">⌘K</kbd> for everything else
          </span>
          <nav className="legal-links" aria-label="Legal">
            <a href="#privacy" className="link">Privacy</a>
            <a href="#cookies" className="link">Cookies</a>
            <a href="#accessibility" className="link">Accessibility</a>
          </nav>
        </div>
      </footer>

      {/* Shortcut dialog */}
      <dialog
        ref={dialog}
        className="shortcut-dialog"
        data-lenis-prevent
        onCancel={() => { smoothScroll.current?.start(); previousFocus.current?.focus() }}
        onClick={event => { if (event.target === dialog.current) closeMenu() }}
        aria-label="Shortcut navigation"
      >
        <div className="command-search">
          <label htmlFor="command-search" className="mono">⌘ K</label>
          <input
            id="command-search"
            ref={search}
            value={query}
            placeholder="Search pages and actions…"
            autoComplete="off"
            onChange={event => { setQuery(event.target.value); setSelected(0) }}
            onKeyDown={event => {
              if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault()
                setSelected(value => actions.length ? (value + (event.key === 'ArrowDown' ? 1 : -1) + actions.length) % actions.length : 0)
              }
              if (event.key === 'Enter' && actions[selected]) {
                event.preventDefault()
                actions[selected].run()
                closeMenu()
              }
            }}
            aria-controls="command-results"
            aria-activedescendant={actions[selected] ? `command-${selected}` : undefined}
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
          />
          <button onClick={closeMenu} className="mono" aria-label="Close shortcut menu">ESC</button>
        </div>
        <p className="mono command-label">GO TO / DO</p>
        <div id="command-results" role="listbox" aria-label="Pages and actions">
          {actions.length ? actions.map((action, index) => (
            <button
              role="option"
              aria-selected={selected === index}
              id={`command-${index}`}
              className={selected === index ? 'selected' : ''}
              key={action.label}
              onMouseEnter={() => setSelected(index)}
              onClick={() => { action.run(); closeMenu() }}
            >
              {action.label}
              <span className="mono">{action.hint}</span>
            </button>
          )) : (
            <p className="empty-results">No matches. Try “work”, “team”, or “theme”.</p>
          )}
        </div>
        <div className="command-footer mono">↑ ↓ NAVIGATE <span>ENTER TO SELECT</span></div>
      </dialog>
    </div>
  )
}
