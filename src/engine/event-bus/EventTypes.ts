/** Priority determines the dispatch order of Hunter System events. */
export type EventPriority = 'critical' | 'high' | 'normal' | 'low' | 'background'

export interface EventMetadata {
  readonly [key: string]: string | number | boolean | null
}

export interface EventEnvelope<TKey extends string, TPayload> {
  readonly id: string
  readonly type: TKey
  readonly source: string
  readonly target?: string
  readonly payload: TPayload
  readonly timestamp: number
  readonly priority: EventPriority
  readonly metadata: EventMetadata
}

export interface EventInput<TKey extends string, TPayload> {
  readonly type: TKey
  readonly source: string
  readonly payload: TPayload
  readonly target?: string
  readonly priority?: EventPriority
  readonly metadata?: EventMetadata
}

export type EventSubscriber<TKey extends string, TPayload> = (
  event: EventEnvelope<TKey, TPayload>,
) => void

export type EventMiddleware<TEventMap extends object> = (
  event: AnyHunterEvent<TEventMap>,
) => boolean | void

export type EventName<TEventMap extends object> = Extract<keyof TEventMap, string>

export type AnyHunterEvent<TEventMap extends object> = {
  [TKey in EventName<TEventMap>]: EventEnvelope<TKey, TEventMap[TKey]>
}[EventName<TEventMap>]

export interface HunterSystemEventMap {
  BootStarted: Record<string, never>
  BootCompleted: Record<string, never>
  SceneEntered: { sceneId: string }
  SceneExited: { sceneId: string }
  HunterRegistered: Record<string, never>
  ArchiveOpened: { recordId: string }
  ArchiveCompleted: Record<string, never>
  AscensionEntered: Record<string, never>
  MilestoneHovered: { milestoneId: string }
  MilestoneOpened: { milestoneId: string }
  TimelineCompleted: Record<string, never>
  TransmissionUnlocked: Record<string, never>
  SkillHovered: { skillId: string }
  SkillSelected: { skillId: string }
  SkillUnlocked: { skillId: string }
  MissionOpened: { missionId: string }
  MissionCompleted: { missionId: string }
  InventoryOpened: Record<string, never>
  ArtifactCollected: { artifactId: string }
  AchievementUnlocked: { achievementId: string }
  ExplorerProgressUpdated: { progress: number }
  HunterRankUpdated: { rank: string }
  TransmissionStarted: Record<string, never>
  TransmissionCompleted: Record<string, never>
  SystemWarning: { message: string }
  SystemError: { message: string }
  ReducedMotionEnabled: { enabled: boolean }
  ThemeChanged: { theme: string }
  DeveloperModeEnabled: { enabled: boolean }
  PerformanceChanged: { quality: string }
}
