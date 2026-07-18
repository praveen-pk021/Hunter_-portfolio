import { EventBus } from '@/engine/event-bus/EventBus'
import type { HunterSystemEventMap } from '@/engine/event-bus/EventTypes'
import type { SceneEngineState, SceneRegistration } from '@/engine/scene-engine/SceneTypes'

const INITIAL_STATE: SceneEngineState = {
  currentSceneId: null,
  previousSceneId: null,
  lifecycle: 'initialized',
  isTransitioning: false,
}

/** Owns scene lifecycle, registration, and decoupled navigation state. */
export class SceneEngine {
  private readonly registry = new Map<string, SceneRegistration>()
  private readonly listeners = new Set<(state: SceneEngineState) => void>()
  private state = INITIAL_STATE

  public constructor(private readonly eventBus: EventBus<HunterSystemEventMap>) {}

  public register(scene: SceneRegistration): () => void {
    if (this.registry.has(scene.id)) throw new Error(`Scene "${scene.id}" is already registered.`)
    this.registry.set(scene.id, scene)
    return () => this.unregister(scene.id)
  }

  public unregister(sceneId: string): void {
    if (this.state.currentSceneId === sceneId) {
      throw new Error('An active scene cannot be unregistered.')
    }
    this.registry.delete(sceneId)
  }

  public getState(): SceneEngineState {
    return this.state
  }

  public getScene(sceneId: string): SceneRegistration | undefined {
    return this.registry.get(sceneId)
  }

  public subscribe(listener: (state: SceneEngineState) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  public async jump(sceneId: string): Promise<void> {
    const nextScene = this.registry.get(sceneId)
    if (!nextScene) throw new Error(`Scene "${sceneId}" is not registered.`)
    if (this.state.currentSceneId === sceneId && this.state.lifecycle === 'active') return

    const currentScene = this.state.currentSceneId
      ? this.registry.get(this.state.currentSceneId)
      : undefined
    this.updateState({ lifecycle: 'exiting', isTransitioning: Boolean(currentScene) })
    if (currentScene) {
      await currentScene.beforeExit?.()
      this.eventBus.publish({
        type: 'SceneExited',
        source: 'scene-engine',
        payload: { sceneId: currentScene.id },
      })
      await currentScene.afterExit?.()
    }

    this.updateState({ lifecycle: 'loading', isTransitioning: true })
    await nextScene.beforeLoad?.()
    await nextScene.loader()
    await nextScene.afterLoad?.()

    this.updateState({ lifecycle: 'ready' })
    this.updateState({ lifecycle: 'entering' })
    await nextScene.beforeEnter?.()
    this.updateState({
      currentSceneId: nextScene.id,
      previousSceneId: currentScene?.id ?? null,
      lifecycle: 'active',
      isTransitioning: false,
    })
    this.eventBus.publish({
      type: 'SceneEntered',
      source: 'scene-engine',
      payload: { sceneId: nextScene.id },
    })
    await nextScene.afterEnter?.()
  }

  public async next(): Promise<void> {
    const scenes = this.orderedScenes()
    const currentIndex = scenes.findIndex((scene) => scene.id === this.state.currentSceneId)
    const nextScene = scenes[currentIndex + 1]
    if (nextScene) await this.jump(nextScene.id)
  }

  public async previous(): Promise<void> {
    const scenes = this.orderedScenes()
    const currentIndex = scenes.findIndex((scene) => scene.id === this.state.currentSceneId)
    const previousScene = scenes[currentIndex - 1]
    if (previousScene) await this.jump(previousScene.id)
  }

  public async destroy(sceneId: string): Promise<void> {
    const scene = this.registry.get(sceneId)
    if (!scene) return
    await scene.destroy?.()
    if (this.state.currentSceneId === sceneId) {
      this.updateState({ lifecycle: 'destroyed', currentSceneId: null, isTransitioning: false })
    }
    this.registry.delete(sceneId)
  }

  private orderedScenes(): SceneRegistration[] {
    return [...this.registry.values()].sort((first, second) => first.order - second.order)
  }

  private updateState(update: Partial<SceneEngineState>): void {
    this.state = { ...this.state, ...update }
    this.listeners.forEach((listener) => listener(this.state))
  }
}
