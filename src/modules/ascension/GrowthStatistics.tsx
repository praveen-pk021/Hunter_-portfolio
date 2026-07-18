interface GrowthStatisticsProps {
  completedMilestones: number
  explorerProgress: number
}

export function GrowthStatistics({ completedMilestones, explorerProgress }: GrowthStatisticsProps) {
  return (
    <section className="ascension-panel growth-statistics" aria-label="Growth statistics">
      <div>
        <span>Verified milestones</span>
        <strong>{completedMilestones}</strong>
      </div>
      <div>
        <span>Explorer progress</span>
        <strong>{explorerProgress}%</strong>
      </div>
      <div>
        <span>Evidence rule</span>
        <strong>Verified only</strong>
      </div>
    </section>
  )
}
