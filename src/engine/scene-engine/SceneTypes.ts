export type SceneLifecycleState =
  'initialized' | 'loading' | 'ready' | 'entering' | 'active' | 'exiting' | 'destroyed'

export type SceneTransition =
  'portal' | 'fade' | 'materialize' | 'scan' | 'teleport' | 'ascend' | 'dissolve'

export interface SceneLifecycleHooks {
  beforeLoad?: () => void | Promise<void>
  afterLoad?: () => void | Promise<void>
  beforeEnter?: () => void | Promise<void>
  afterEnter?: () => void | Promise<void>
  beforeExit?: () => void | Promise<void>
  afterExit?: () => void | Promise<void>
  destroy?: () => void | Promise<void>
}

export interface SceneRegistration extends SceneLifecycleHooks {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly order: number
  readonly transition: SceneTransition
  readonly loader: () => Promise<unknown>
}

export interface SceneEngineState {
  readonly currentSceneId: string | null
  readonly previousSceneId: string | null
  readonly lifecycle: SceneLifecycleState
  readonly isTransitioning: boolean
}
