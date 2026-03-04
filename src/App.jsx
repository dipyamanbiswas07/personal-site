import { useState, useEffect } from 'react'
import './App.css'

// ─── DATA ────────────────────────────────────────────────────────────────────

const HERO_LINES = [
  { cmd: 'whoami',         output: 'DIPYAMAN BISWAS' },
  { cmd: 'cat role.txt',   output: 'Engineering Manager · Full Stack · AI/LLM' },
  { cmd: 'ping location',  output: 'PUNE, INDIA — 11+ YRS EXPERIENCE' },
  { cmd: 'ls skills/',     output: 'ai-llm/  frontend/  backend/  cloud/' },
]

const SKILLS = {
  'AI & LLM':       ['LangGraph', 'RAG', 'Multi-Agent Systems', 'Fine-tuning', 'LLM Evaluation', 'Prompt Engineering', 'OpenAI API', 'Anthropic Claude'],
  'Languages':      ['JavaScript', 'TypeScript', 'C#', 'HTML5', 'CSS/SASS/LESS'],
  'Front-End':      ['React.js', 'Vue.js', 'Angular 2+', 'Redux/Flux', 'Pinia', 'Webpack'],
  'Back-End':       ['.NET Core', 'REST APIs', 'ASP.NET MVC'],
  'DevOps & Cloud': ['Azure', 'Docker', 'Kubernetes', 'Azure DevOps'],
}

const EXPERIENCE = [
  {
    company: 'Energy Exemplar',
    role: 'Engineering Manager',
    period: 'Feb 2024 — Present',
    location: 'Pune',
    current: true,
    highlights: [
      'Architected production-grade AI product leveraging LangGraph for stateful multi-agent workflows and RAG for domain-specific data retrieval',
      'Leading a team to build a new Apps Platform on PLEXOS Cloud, enabling rapid creation and deployment of energy applications',
      'Standardized AI dev tooling (GitHub Copilot, Cursor, Claude Code) — 80%+ adoption, +20% engineering productivity',
      'Streamlined developer onboarding with an end-to-end workflow, reducing onboarding time by 40%',
      'Mentored and coached engineers through 1:1s and growth plans, fostering a culture of ownership and accountability',
      'Managed performance reviews, promotions & hiring for a team of 15',
    ],
  },
  {
    company: 'Appsmith',
    role: 'Staff Software Engineer',
    period: 'Feb 2023 — Feb 2024',
    location: 'Pune',
    highlights: [
      'Built self-checkout experience with Stripe as payment partner',
      'Increased inbound customers by 15%',
    ],
  },
  {
    company: 'Atlan',
    role: 'Senior Software Engineer',
    period: 'Jul 2022 — Feb 2023',
    location: 'Pune',
    highlights: [
      'Centralized application state with Redux/Pinia',
      'Reduced page load time by 20% via lazy loading & code splitting',
    ],
  },
  {
    company: 'Energy Exemplar',
    role: 'Lead Software Engineer',
    period: 'Aug 2019 — Jul 2022',
    location: 'Pune',
    highlights: [
      'Architected PLEXOS Cloud from the ground up',
      'Reduced API calls by 30% with Vue-Query client-side caching',
    ],
  },
  {
    company: 'Ivanti',
    role: 'Software Engineer',
    period: 'Jul 2018 — Aug 2019',
    location: 'Bangalore',
    highlights: ['Built multiple ITSM product modules with Angular 2'],
  },
  {
    company: 'Analytics Quotient (now Kantar)',
    role: 'Software Engineer',
    period: 'Jul 2014 — Mar 2018',
    location: 'Bangalore',
    highlights: ['Full stack development with JavaScript, jQuery & ASP.NET MVC'],
  },
]

const PROJECTS = [
  {
    name: 'Monthly Finance Tracker',
    url: 'https://finance.dipyamanbiswas.in',
    description: 'Personal finance tracking app with category budgets, monthly completion tracking, and an insights dashboard.',
    tech: ['Vue 3', 'Vite', 'Pinia', 'Supabase', 'Tailwind CSS'],
    status: 'live',
  },
]

const NAV_SECTIONS = ['hero', 'about', 'skills', 'experience', 'projects', 'contact']

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

function Cursor() {
  return <span className="cursor">█</span>
}

function SectionHeader({ label, title }) {
  return (
    <div className="section-header">
      <div className="section-label">
        <span className="dim">[</span>
        <span className="accent">{label}</span>
        <span className="dim">]</span>
      </div>
      <h2 className="section-title">{title}</h2>
      <div className="section-rule" />
    </div>
  )
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.4 }
    )
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="nav">
      <div className="nav-logo">DB</div>
      <div className="nav-items">
        {NAV_SECTIONS.map(id => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav-item ${active === id ? 'active' : ''}`}
            data-label={id.toUpperCase()}
          >
            <span className="nav-dot" />
          </a>
        ))}
      </div>
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const timers = HERO_LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(v => Math.max(v, i + 1)), i * 700 + 500)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <div className="grid-overlay" />
        <div className="scanlines" />
        <div className="hero-glow" />
      </div>

      <div className="hero-content">
        <div className="terminal-window">
          <div className="terminal-chrome">
            <div className="chrome-dots">
              <span /><span /><span />
            </div>
            <div className="chrome-title">dipyaman@portfolio:~</div>
          </div>
          <div className="terminal-body">
            {HERO_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="terminal-block">
                <div className="cmd-line">
                  <span className="prompt">dipyaman@portfolio:~$</span>
                  <span className="cmd-text"> {line.cmd}</span>
                </div>
                <div className="output-line">{line.output}</div>
              </div>
            ))}
            <div className="cmd-line">
              <span className="prompt">dipyaman@portfolio:~$</span>
              <Cursor />
            </div>
          </div>
        </div>

        <div className="hero-links">
          <a href="mailto:dipyamanbiswas07@gmail.com" className="hero-link">
            <span className="hero-link-icon">✉</span>
            dipyamanbiswas07@gmail.com
          </a>
          <a href="https://linkedin.com/in/dipyamanbiswas07" target="_blank" rel="noopener noreferrer" className="hero-link">
            <span className="hero-link-icon">in</span>
            dipyamanbiswas07
          </a>
          <a href="https://github.com/dipyamanbiswas07" target="_blank" rel="noopener noreferrer" className="hero-link">
            <span className="hero-link-icon">gh</span>
            dipyamanbiswas07
          </a>
        </div>
      </div>

      <div className="scroll-hint">
        <span>SCROLL</span>
        <div className="scroll-arrow">▼</div>
      </div>
    </section>
  )
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About() {
  const stats = [
    { value: '11+', label: 'Years Experience' },
    { value: '15',  label: 'Engineers Led' },
    { value: '40%', label: 'Faster Onboarding' },
    { value: '80%+', label: 'AI Tool Adoption' },
  ]

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader label="01" title="ABOUT.ME" />
        <div className="about-grid">
          <div className="about-text">
            <p className="about-lead">
              Engineering Manager with <span className="hl">11+ years</span> across Analytics, Energy, and Service Management industries.
            </p>
            <p>
              I specialize in building large-scale products from scratch and aligning technical execution with business priorities. Lately I've been deep in the AI/LLM space — shipping production-grade pipelines with <span className="hl">LangGraph</span> and <span className="hl">RAG architectures</span>.
            </p>
            <p>
              Beyond the code, I care deeply about people — mentoring engineers through 1:1s, building growth plans, and partnering with Product and Design to align technical execution with business priorities.
            </p>
          </div>
          <div className="stats-grid">
            {stats.map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <SectionHeader label="02" title="SKILL.MODULES" />
        <div className="skills-list">
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} className="skill-group">
              <div className="skill-group-label">
                <span className="dim">MODULE:</span>
                <span className="accent"> {cat.toUpperCase()}</span>
              </div>
              <div className="skill-tags">
                {items.map(s => <span key={s} className="skill-tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeader label="03" title="WORK.LOG" />
        <div className="timeline">
          {EXPERIENCE.map((job, i) => (
            <div key={i} className={`timeline-item ${job.current ? 'current' : ''}`}>
              <div className="timeline-track">
                <div className="track-dot" />
                {i < EXPERIENCE.length - 1 && <div className="track-line" />}
              </div>
              <div className="timeline-card">
                <div className="job-top">
                  <div className="job-company-row">
                    <span className="job-company">{job.company}</span>
                    {job.current && <span className="badge-current">CURRENT</span>}
                  </div>
                  <span className="job-period">{job.period}</span>
                </div>
                <div className="job-role">
                  {job.role} <span className="dim">// {job.location}</span>
                </div>
                <ul className="job-bullets">
                  {job.highlights.map((h, j) => (
                    <li key={j}><span className="accent">›</span> {h}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <SectionHeader label="04" title="PROJECTS.DIR" />
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="project-card">
              <div className="project-chrome">
                <div className="chrome-dots small">
                  <span /><span /><span />
                </div>
                <div className="project-status-row">
                  <span className={`status-dot ${p.status}`} />
                  <span>{p.status.toUpperCase()}</span>
                </div>
              </div>
              <div className="project-body">
                <div className="project-title-row">
                  <h3 className="project-name">{p.name}</h3>
                  <span className="project-arrow">↗</span>
                </div>
                <p className="project-desc">{p.description}</p>
                <div className="project-tech">
                  {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <div className="project-url">{p.url.replace('https://', '')}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  const links = [
    { cmd: './connect --channel email',    label: 'dipyamanbiswas07@gmail.com',        href: 'mailto:dipyamanbiswas07@gmail.com' },
    { cmd: './connect --channel linkedin', label: 'linkedin.com/in/dipyamanbiswas07', href: 'https://linkedin.com/in/dipyamanbiswas07' },
    { cmd: './connect --channel github',   label: 'github.com/dipyamanbiswas07',       href: 'https://github.com/dipyamanbiswas07' },
  ]

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeader label="05" title="CONTACT.SH" />
        <div className="terminal-window contact-terminal">
          <div className="terminal-chrome">
            <div className="chrome-dots"><span /><span /><span /></div>
            <div className="chrome-title">contact.sh</div>
          </div>
          <div className="terminal-body">
            {links.map((l, i) => (
              <div key={i} className="contact-block">
                <div className="cmd-line">
                  <span className="prompt">$</span>
                  <span className="cmd-text"> {l.cmd}</span>
                </div>
                <div className="contact-output">
                  <a href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
                    {l.label}
                  </a>
                </div>
              </div>
            ))}
            <div className="cmd-line" style={{ marginTop: '0.5rem' }}>
              <span className="prompt">$</span>
              <Cursor />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="app">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <span>DIPYAMAN BISWAS © 2026</span>
        <span className="dim">|</span>
        <span>REACT + VITE</span>
        <span className="dim">|</span>
        <span>VERCEL</span>
      </footer>
    </div>
  )
}
