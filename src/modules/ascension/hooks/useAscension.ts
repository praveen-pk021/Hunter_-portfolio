import { useEffect, useMemo, useState } from 'react'
import { useEventBus } from '@/engine/event-bus'
import { timeline } from '@/data/timeline'

export function useAscension() {
  const eventBus = useEventBus()
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null)
  const [explorerProgress, setExplorerProgress] = useState(0)
  const milestones = timeline
  const selectedMilestone = milestones.find(({ id }) => id === selectedMilestoneId) ?? null
  const completedMilestones = useMemo(
    () => milestones.filter(({ state }) => state === 'completed').length,
    [milestones],
  )

  useEffect(() => {
    eventBus.publish({ type: 'AscensionEntered', source: 'ascension', payload: {} })
  }, [eventBus])

  function selectMilestone(id: string) {
    setSelectedMilestoneId(id)
    eventBus.publish({ type: 'MilestoneOpened', source: 'ascension', payload: { milestoneId: id } })
    if (explorerProgress < 15) {
      const progress = Math.min(explorerProgress + 3, 15)
      setExplorerProgress(progress)
      eventBus.publish({
        type: 'ExplorerProgressUpdated',
        source: 'ascension',
        payload: { progress },
      })
    }
  }

  function hoverMilestone(id: string) {
    eventBus.publish({
      type: 'MilestoneHovered',
      source: 'ascension',
      payload: { milestoneId: id },
    })
  }

  return {
    completedMilestones,
    explorerProgress,
    hoverMilestone,
    milestones,
    selectMilestone,
    selectedMilestone,
  }
}
