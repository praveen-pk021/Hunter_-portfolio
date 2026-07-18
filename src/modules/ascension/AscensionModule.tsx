import { CareerCompass } from './CareerCompass'
import { FutureGoals } from './FutureGoals'
import { GrowthStatistics } from './GrowthStatistics'
import { GrowthTimeline } from './GrowthTimeline'
import { MilestoneInspector } from './MilestoneInspector'
import { useAscension } from './hooks/useAscension'

export function AscensionModule({ onReturnToProfile }: { onReturnToProfile: () => void }) {
  const ascension = useAscension()
  return (
    <main className="ascension-module">
      <header className="ascension-status">
        <span>Growth analysis active</span>
        <button type="button" onClick={onReturnToProfile}>
          ← Return to hunter profile
        </button>
        <span>Hunter progress remains evidence-based</span>
      </header>
      <div className="ascension-grid">
        <CareerCompass completedMilestones={ascension.completedMilestones} />
        <GrowthTimeline
          milestones={ascension.milestones}
          onHover={ascension.hoverMilestone}
          onSelect={ascension.selectMilestone}
          selectedId={ascension.selectedMilestone?.id ?? null}
        />
        <MilestoneInspector milestone={ascension.selectedMilestone} />
        <GrowthStatistics
          completedMilestones={ascension.completedMilestones}
          explorerProgress={ascension.explorerProgress}
        />
        <FutureGoals />
      </div>
    </main>
  )
}
