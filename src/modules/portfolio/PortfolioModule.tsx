import { useState } from 'react'
import {
  hunterCertificates,
  hunterEducation,
  hunterProfile,
  hunterProjects,
  hunterSkills,
} from '@/data/portfolio'

interface PortfolioModuleProps {
  onOpenAscension: () => void
}

/** Public Hunter profile: every project, skill, and link is backed by the supplied CV. */
export function PortfolioModule({ onOpenAscension }: PortfolioModuleProps) {
  const [contactStatus, setContactStatus] = useState('')
  function summonHunter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()
    if (!name || !message) {
      setContactStatus('Enter your name and message to summon the hunter.')
      return
    }
    const subject = encodeURIComponent(`Portfolio message from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\n\n${message}`)
    window.location.href = `mailto:${hunterProfile.email}?subject=${subject}&body=${body}`
    setContactStatus('Your email app is opening with the message prepared.')
  }
  return (
    <main className="portfolio-module">
      <div className="atmosphere" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <nav className="portfolio-nav" aria-label="Main navigation">
        <a href="#identity" className="portfolio-mark">
          HUNTER<span>/</span>SYSTEM
        </a>
        <div>
          <a href="#quests">Quests</a>
          <a href="#inventory">Inventory</a>
          <button type="button" onClick={onOpenAscension}>
            Hunter progress ↗
          </button>
        </div>
      </nav>
      <section
        className="portfolio-hero hologram-panel"
        id="identity"
        aria-labelledby="portfolio-title"
      >
        <p className="eyebrow">System notification · hunter registration</p>
        <h1 id="portfolio-title">
          {hunterProfile.name}
          <em> // shadow archive</em>
        </h1>
        <p className="portfolio-title">{hunterProfile.title}</p>
        <p className="portfolio-intro">{hunterProfile.summary}</p>
        <div className="profile-hud" aria-label="Hunter profile summary">
          <div>
            <span>Rank</span>
            <strong>Rising Analyst</strong>
          </div>
          <div>
            <span>Class</span>
            <strong>Data & AI</strong>
          </div>
          <div>
            <span>Base</span>
            <strong>{hunterProfile.location}</strong>
          </div>
        </div>
        <div className="portfolio-actions">
          <button className="primary-action" type="button" onClick={onOpenAscension}>
            Enter status window <span aria-hidden="true">→</span>
          </button>
          <a href={hunterProfile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={hunterProfile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        </div>
      </section>
      <section className="portfolio-focus" id="records" aria-labelledby="focus-title">
        <p className="eyebrow">Ability record · skill tree</p>
        <h2 id="focus-title">Abilities acquired in the field.</h2>
        <ul className="skill-tree">
          {hunterSkills.map((skill, index) => (
            <li key={skill}>
              <span>0{index + 1}</span>
              {skill}
            </li>
          ))}
        </ul>
      </section>
      <section className="quest-section" id="quests" aria-labelledby="quests-title">
        <div>
          <p className="eyebrow">Active quests · project archive</p>
          <h2 id="quests-title">Clear the dungeons.</h2>
        </div>
        <div className="quest-grid">
          {hunterProjects.map((project) => (
            <article className="dungeon-card" key={project.title}>
              <header>
                <span>Quest difficulty</span>
                <strong>{project.rank} Rank</strong>
              </header>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <small>{project.stack}</small>
              <footer>
                {project.demo ? (
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    Live demo ↗
                  </a>
                ) : null}
                {project.github ? (
                  <a href={project.github} target="_blank" rel="noreferrer">
                    View quest ↗
                  </a>
                ) : null}
              </footer>
            </article>
          ))}
        </div>
      </section>
      <section className="inventory-section" id="inventory">
        <article>
          <p className="eyebrow">Inventory / credentials</p>
          <h2>Certificates & achievements</h2>
          <ul>
            {hunterCertificates.map(([name, url]) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noreferrer">
                  {name} ↗
                </a>
              </li>
            ))}
          </ul>
        </article>
        <article>
          <p className="eyebrow">Hunter archive / education</p>
          <h2>Progress record</h2>
          <ul>
            {hunterEducation.map((record) => (
              <li key={record}>{record}</li>
            ))}
          </ul>
          <a className="summon-link" href={`mailto:${hunterProfile.email}`}>
            Summon the Hunter ↗
          </a>
        </article>
      </section>
      <section className="achievements-section" aria-labelledby="achievements-title">
        <div className="section-heading">
          <p className="eyebrow">Achievement vault</p>
          <h2 id="achievements-title">Certificates unlocked.</h2>
        </div>
        <div className="achievement-grid">
          {hunterCertificates.map(([name, url], index) => (
            <article className="achievement-card" key={url}>
              <span className="achievement-rank">
                {index === hunterCertificates.length - 1 ? 'Special' : 'Verified'}
              </span>
              <span className="achievement-number">0{index + 1}</span>
              <div>
                <p className="eyebrow">Certificate acquired</p>
                <h3>{name}</h3>
              </div>
              <a href={url} target="_blank" rel="noreferrer">
                Inspect credential ↗
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="summon-section" id="contact" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">Communication gate</p>
          <h2 id="contact-title">Summon the Hunter.</h2>
          <p>
            Have a project, internship, or collaboration in mind? Send a message directly to{' '}
            {hunterProfile.name}.
          </p>
          <a href={`mailto:${hunterProfile.email}`}>{hunterProfile.email}</a>
          <div className="contact-links">
            <a href={hunterProfile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={hunterProfile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
        </div>
        <form className="summon-form" onSubmit={summonHunter}>
          <label>
            Your name
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            Your message
            <textarea name="message" rows={4} required />
          </label>
          <button className="primary-action" type="submit">
            Send summon <span aria-hidden="true">→</span>
          </button>
          {contactStatus ? <p role="status">{contactStatus}</p> : null}
        </form>
      </section>
      <button
        className="journey-orb"
        type="button"
        onClick={onOpenAscension}
        aria-label="Open Hunter Ascension journey"
      >
        <span>
          Open
          <br />
          journey
        </span>
      </button>
    </main>
  )
}
