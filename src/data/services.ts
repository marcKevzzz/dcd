import type { Service } from '../types/service'

export const services: Service[] = [
  {
    number: '01',
    title: 'Web development for agencies',
    body: 'Motion-heavy sites and CMS builds, built closely with your designers and delivered ready for your team to own.',
    tags: ['Astro', 'GSAP', 'React', 'TypeScript'],
    cursor: 'web dev →',
  },
  {
    number: '02',
    title: 'AI & automation workflows',
    body: 'Hands-on training and custom skills for tools like Claude Code, followed by the workflows your team needs. With an honest list of what not to automate.',
    tags: ['Claude Code', 'Custom Agents', 'Tooling', 'Workflows'],
    cursor: 'ai workflows →',
  },
  {
    number: '03',
    title: 'AI in products & systems architecture',
    body: 'Semantic search and assistants grounded in your content, tested on the questions real users ask, answering with sources and verifiable telemetry.',
    tags: ['RAG', 'Semantic Search', 'PostgreSQL', 'Real-time Sync'],
    cursor: 'systems →',
  },
]
