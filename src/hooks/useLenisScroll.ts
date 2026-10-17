import { useEffect, useRef, useState, type RefObject } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

export function useLenisScroll(rootRef: RefObject<HTMLDivElement | null>) {
  const smoothScroll = useRef<Lenis | null>(null)
  const [progress, setProgress] = useState(0)
  const [activeWork, setActiveWork] = useState(0)
  const [stageIndex, setStageIndex] = useState(0)
  const [stageFill, setStageFill] = useState(0)

  // Track global scroll progress for header ruler
  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? Math.round((window.scrollY / height) * 100) : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  // Setup Lenis & GSAP ScrollTrigger
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        desktop: '(min-width: 1024px)',
      },
      ({ conditions }) => {
        if (!conditions?.motion) return
        const desktop = !!conditions.desktop
        const lenis = new Lenis({
          duration: 1.05,
          wheelMultiplier: 1.0,
          smoothWheel: true,
          anchors: true,
          prevent: element => !!element.closest('dialog'),
        })
        smoothScroll.current = lenis
        lenis.on('scroll', ScrollTrigger.update)

        const tick = (time: number) => lenis.raf(time * 1000)
        gsap.ticker.add(tick)

        const context = gsap.context(() => {
          // Hero Intro reveal
          const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
          intro
            .fromTo(
              '.hero-title',
              { '--ink-clip': '100%', '--wire-opacity': 1 },
              { '--ink-clip': '0%', '--wire-opacity': 0, duration: 1.15 },
              0.12
            )
            .from('.hero-statement-text', { opacity: 0, y: 16, duration: 0.8 }, 0.4)
            .from('.hero-telemetry > span', { opacity: 0, duration: 0.5, stagger: 0.1 }, 0.85)
            .from('.hero-bottom > *', { y: 18, opacity: 0, duration: 0.75, stagger: 0.12 }, 0.95)

          gsap.to('.hero-content', {
            y: -40,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
          })

          // Manifesto animation: unpinned, wireframe fill on scroll
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

          // Selected Work pinned stage on desktop: completely dynamic, scalable for any number of projects
          if (desktop) {
            const count = projects.length
            const panels = gsap.utils.toArray<HTMLElement>('.ws.is-pinned .ws__item .ws__panel')
            const arts = gsap.utils.toArray<HTMLElement>('.ws.is-pinned .ws__item .ws__art-container')
            const stageBars = gsap.utils.toArray<HTMLElement>('.ws.is-pinned .ws__stage-bar')
            const stageNums = gsap.utils.toArray<HTMLElement>('.ws.is-pinned .ws__stage-num')
            const railBars = gsap.utils.toArray<HTMLElement>('.ws.is-pinned .ws__rail-bar')
            const reel = document.querySelector<HTMLElement>('.ws__reel')

            if (panels.length >= count && arts.length >= count && count >= 2) {
              gsap.set(panels.slice(1), { opacity: 0, y: 25, pointerEvents: 'none' })
              gsap.set(panels[0], { opacity: 1, y: 0, pointerEvents: 'auto' })
              gsap.set(arts.slice(1), { clipPath: 'inset(0% 100% 0% 0%)', opacity: 1, scale: 1, x: -30, pointerEvents: 'none' })
              gsap.set(arts[0], { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1, x: 0, pointerEvents: 'auto' })

              if (stageBars.length >= 3) {
                gsap.set(stageBars, { scaleX: 0, transformOrigin: '0% 50%', backgroundColor: 'var(--accent)' })
              }
              if (stageNums.length >= 3) {
                gsap.set(stageNums, { color: 'var(--muted)' })
              }
              if (railBars.length >= count) {
                gsap.set(railBars.slice(1), { backgroundColor: 'var(--line)' })
                gsap.set(railBars[0], { backgroundColor: 'var(--accent)' })
              }
              if (reel) gsap.set(reel, { yPercent: 0 })

              // Dynamic scroll distance: gives each project ~2.5 viewports of scroll room
              const totalDistance = window.innerHeight * Math.max(3, count * 2.5)

              const workTl = gsap.timeline({
                scrollTrigger: {
                  trigger: '.ws.is-pinned',
                  start: 'top 88px',
                  end: () => `+=${totalDistance}`,
                  pin: true,
                  scrub: 1.2,
                  preventOverlaps: true,
                  onUpdate: (self) => {
                    const p = self.progress
                    if (p >= 0.99) {
                      setActiveWork(count - 1)
                      setStageIndex(2)
                      return
                    }

                    // Progress mapped smoothly across projects and stages
                    const pos = p * count
                    const pIdx = Math.min(count - 1, Math.floor(pos))
                    const within = pos - pIdx
                    const sIdx = Math.min(2, Math.floor(within * 3))

                    setActiveWork(pIdx)
                    setStageIndex(sIdx)
                  },
                },
              })

              const STAGE_DUR = 0.4
              const TRANS_TIME = 0.22

              // Build timeline dynamically: stages fill 1 by 1 in one single flow (Design -> Code -> Deploy)
              for (let i = 0; i < count; i++) {
                const sIdx = Math.min(stageBars.length - 1, Math.floor((i / count) * stageBars.length))

                if (stageBars[sIdx] && stageNums[sIdx]) {
                  // Active stage number and bar highlight in blue and fill 0 -> 1
                  workTl.set(stageNums[sIdx], { color: 'var(--accent)' })
                  workTl.set(stageBars[sIdx], { backgroundColor: 'var(--accent)' })
                  workTl.to(stageBars[sIdx], { scaleX: 1, duration: STAGE_DUR, ease: 'none' })

                  // When completed, turn white if moving to a subsequent stage
                  if (i < count - 1) {
                    workTl.set(stageNums[sIdx], { color: 'var(--muted)' })
                    workTl.set(stageBars[sIdx], { backgroundColor: 'var(--fg)' })
                  }
                } else {
                  workTl.to({}, { duration: STAGE_DUR })
                }

                if (i < count - 1) {
                  const next = i + 1
                  const label = `p${i}_to_p${next}`
                  workTl.addLabel(label)

                  // Outgoing panel exits
                  workTl.to(panels[i], { opacity: 0, y: -20, ease: 'power2.in', duration: 0.1 }, label)
                  workTl.set(panels[i], { pointerEvents: 'none' }, `${label}+=0.1`)

                  // Incoming panel enters
                  workTl.fromTo(
                    panels[next],
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, ease: 'power2.out', duration: 0.14 },
                    `${label}+=0.08`
                  )
                  workTl.set(panels[next], { pointerEvents: 'auto' }, `${label}+=0.1`)

                  // Outgoing art shifts right and recedes
                  workTl.to(
                    arts[i],
                    { scale: 0.98, x: 30, opacity: 0.25, ease: 'power2.inOut', duration: TRANS_TIME },
                    label
                  )
                  workTl.set(arts[i], { pointerEvents: 'none' }, `${label}+=0.12`)

                  // Incoming art unmasks left-to-right and settles
                  workTl.to(
                    arts[next],
                    { clipPath: 'inset(0% 0% 0% 0%)', x: 0, ease: 'power2.inOut', duration: TRANS_TIME },
                    label
                  )
                  workTl.set(arts[next], { pointerEvents: 'auto' }, `${label}+=0.12`)

                  // Rail advances
                  if (railBars[next]) {
                    workTl.to(railBars[next], { backgroundColor: 'var(--accent)', duration: 0.08, ease: 'none' }, label)
                  }

                  // Reel advances to next project number dynamically
                  if (reel) {
                    const targetPercent = -(next / count) * 100
                    workTl.to(reel, { yPercent: targetPercent, ease: 'power2.inOut', duration: TRANS_TIME }, label)
                  }
                }
              }
            }
          }

          // Team mark subtle rotation
          gsap.from('.member-mark svg', {
            rotation: -12,
            scale: 0.85,
            transformOrigin: 'center',
            ease: 'none',
            scrollTrigger: { trigger: '.team-roster', start: 'top 95%', end: 'top 45%', scrub: 0.7 },
          })
        }, rootRef)

        let disposed = false
        document.fonts.ready.then(() => {
          if (!disposed) ScrollTrigger.refresh()
        })

        return () => {
          disposed = true
          context.revert()
          gsap.ticker.remove(tick)
          lenis.destroy()
          smoothScroll.current = null
        }
      }
    )
    return () => media.revert()
  }, [rootRef])

  const scrollTo = (target: string) => {
    if (smoothScroll.current) {
      smoothScroll.current.scrollTo(target)
    } else {
      const el = target.startsWith('#') ? document.getElementById(target.slice(1)) : document.querySelector(target)
      el?.scrollIntoView({ behavior: 'instant' })
    }
  }

  return {
    smoothScroll,
    progress,
    activeWork,
    stageIndex,
    stageFill,
    scrollTo,
  }
}
