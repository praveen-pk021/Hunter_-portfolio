import type { AscensionMilestone } from './types/AscensionTypes'

export function MilestoneInspector({ milestone }: { milestone: AscensionMilestone | null }) {
  return (
    <aside
      className="ascension-panel milestone-inspector"
      aria-live="polite"
      aria-labelledby="inspector-title"
    >
      <p className="eyebrow">Milestone inspector</p>
      {milestone ? (
        <>
          <h2 id="inspector-title">{milestone.title}</h2>
          <p>{milestone.description}</p>
          {milestone.skills?.length ? (
            <p>
              <b>Skills:</b> {milestone.skills.join(', ')}
            </p>
          ) : null}
          {milestone.evidenceUrl ? (
            <a href={milestone.evidenceUrl}>View evidence</a>
          ) : (
            <p className="muted">No evidence link supplied.</p>
          )}
        </>
      ) : (
        <>
          <h2 id="inspector-title">Select a milestone</h2>
          <p className="muted">Evidence, related work, lessons, and next steps will appear here.</p>
        </>
      )}
    </aside>
  )
}
