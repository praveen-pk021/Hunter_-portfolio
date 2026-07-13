import { EventBus } from '@/engine/event-bus/EventBus'
import type { HunterSystemEventMap } from '@/engine/event-bus/EventTypes'

describe('EventBus', () => {
  it('delivers queued events to subscribers when flushed', () => {
    const eventBus = new EventBus<HunterSystemEventMap>()
    const received: string[] = []
    eventBus.subscribe('SkillSelected', (event) => received.push(event.payload.skillId))

    eventBus.publish({ type: 'SkillSelected', source: 'test', payload: { skillId: 'python' } })
    eventBus.flush()

    expect(received).toEqual(['python'])
  })

  it('dispatches critical events immediately', () => {
    const eventBus = new EventBus<HunterSystemEventMap>()
    const received: string[] = []
    eventBus.subscribe('SystemError', (event) => received.push(event.payload.message))

    eventBus.publish({
      type: 'SystemError',
      source: 'test',
      payload: { message: 'Recovery required.' },
      priority: 'critical',
    })

    expect(received).toEqual(['Recovery required.'])
    expect(eventBus.getQueueSize()).toBe(0)
  })

  it('orders queued events by priority and records history', () => {
    const eventBus = new EventBus<HunterSystemEventMap>()
    const received: string[] = []
    eventBus.subscribe('SystemWarning', (event) => received.push(event.payload.message))

    eventBus.publish({
      type: 'SystemWarning',
      source: 'test',
      payload: { message: 'low' },
      priority: 'low',
    })
    eventBus.publish({
      type: 'SystemWarning',
      source: 'test',
      payload: { message: 'high' },
      priority: 'high',
    })
    eventBus.flush()

    expect(received).toEqual(['high', 'low'])
    expect(eventBus.getHistory()).toHaveLength(2)
  })

  it('allows middleware to stop dispatch', () => {
    const eventBus = new EventBus<HunterSystemEventMap>()
    const received: string[] = []
    eventBus.use(() => false)
    eventBus.subscribe('BootStarted', () => received.push('received'))

    eventBus.publish({ type: 'BootStarted', source: 'test', payload: {}, priority: 'critical' })

    expect(received).toEqual([])
    expect(eventBus.getHistory()).toEqual([])
  })
})
