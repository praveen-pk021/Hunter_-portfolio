import { EventBus } from '@/engine/event-bus/EventBus'
import type { HunterSystemEventMap } from '@/engine/event-bus/EventTypes'
import { SceneEngine } from '@/engine/scene-engine/SceneEngine'

describe('SceneEngine', () => {
  it('runs scene lifecycle hooks and publishes navigation events', async () => {
    const eventBus = new EventBus<HunterSystemEventMap>()
    const sceneEngine = new SceneEngine(eventBus)
    const lifecycle: string[] = []
    const enteredScenes: string[] = []
    eventBus.subscribe('SceneEntered', (event) => enteredScenes.push(event.payload.sceneId))
    sceneEngine.register({
      id: 'scene-test',
      title: 'Test Scene',
      description: 'A scene used for lifecycle verification.',
      order: 1,
      transition: 'fade',
      loader: async () => lifecycle.push('load'),
      beforeLoad: () => {
        lifecycle.push('before-load')
      },
      beforeEnter: () => {
        lifecycle.push('before-enter')
      },
      afterEnter: () => {
        lifecycle.push('after-enter')
      },
    })

    await sceneEngine.jump('scene-test')
    eventBus.flush()

    expect(lifecycle).toEqual(['before-load', 'load', 'before-enter', 'after-enter'])
    expect(sceneEngine.getState().lifecycle).toBe('active')
    expect(enteredScenes).toEqual(['scene-test'])
  })

  it('navigates registered scenes in their declared order', async () => {
    const sceneEngine = new SceneEngine(new EventBus<HunterSystemEventMap>())
    const createScene = (id: string, order: number) => ({
      id,
      title: id,
      description: id,
      order,
      transition: 'fade' as const,
      loader: async () => undefined,
    })
    sceneEngine.register(createScene('scene-first', 1))
    sceneEngine.register(createScene('scene-second', 2))

    await sceneEngine.jump('scene-first')
    await sceneEngine.next()

    expect(sceneEngine.getState().currentSceneId).toBe('scene-second')
    expect(sceneEngine.getState().previousSceneId).toBe('scene-first')
  })
})
