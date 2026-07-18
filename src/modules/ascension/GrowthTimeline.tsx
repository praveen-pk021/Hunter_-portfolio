import type { AscensionMilestone } from './types/AscensionTypes'

interface GrowthTimelineProps {
  milestones: readonly AscensionMilestone[]
  onHover: (id: string) => void
  onSelect: (id: string) => void
  selectedId: string | null
}

export function GrowthTimeline({ milestones, onHover, onSelect, selectedId }: GrowthTimelineProps) {
  return (
    <section className="growth-timeline" aria-labelledby="timeline-title">
      <div>
        <p className="eyebrow">Evidence-led evolution</p>
        <h1 id="timeline-title">Hunter Ascension</h1>
      </div>
      {milestones.length === 0 ? (
        <p className="empty-state">
          No verified milestones yet. Add evidence-backed entries to{' '}
          <code>src/data/timeline.ts</code> to begin the record.
        </p>
      ) : (
        <ol>
          {milestones.map((milestone) => (
            <li key={milestone.id}>
              <button
                aria-pressed={selectedId === milestone.id}
                className={`milestone ${milestone.state}`}
                onClick={() => onSelect(milestone.id)}
                onMouseEnter={() => onHover(milestone.id)}
              >
                <span className="milestone-core" />
                <span>
                  <strong>{milestone.title}</strong>
                  <small>{milestone.date}</small>
                </span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
