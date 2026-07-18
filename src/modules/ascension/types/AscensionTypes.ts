export type MilestoneState = 'completed' | 'current' | 'future'

export interface AscensionMilestone {
  readonly id: string
  readonly title: string
  readonly date: string
  readonly description: string
  readonly skills?: readonly string[]
  readonly projects?: readonly string[]
  readonly certificates?: readonly string[]
  readonly evidenceUrl?: string
  readonly lessonsLearned?: string
  readonly nextStep?: string
  readonly state: MilestoneState
}

export interface CareerCompassData {
  readonly currentDirection: string
  readonly primaryFocus: string
  readonly secondaryFocus: string
  readonly longTermGoal: string
  readonly currentObjective: string
}
