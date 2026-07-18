import type { CareerCompassData } from './types/AscensionTypes'

export const careerStages = [
  'Foundation',
  'Explorer',
  'Builder',
  'Specialist',
  'Engineer',
  'Innovator',
  'Leader',
  'Visionary',
] as const

export const futureGoals = [
  'Complete an internship',
  'Build AI products',
  'Contribute to open source',
  'Become a data analyst',
  'Master advanced React',
] as const

export const careerCompass: CareerCompassData = {
  currentDirection: 'Professional growth',
  primaryFocus: 'Portfolio evidence',
  secondaryFocus: 'Continuous learning',
  longTermGoal: 'Build meaningful software',
  currentObjective: 'Add verified milestones',
}
