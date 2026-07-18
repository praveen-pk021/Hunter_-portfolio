import type {
  AnyHunterEvent,
  EventEnvelope,
  EventInput,
  EventMiddleware,
  EventName,
  EventPriority,
  EventSubscriber,
} from '@/engine/event-bus/EventTypes'

const PRIORITY_VALUE: Record<EventPriority, number> = {
  critical: 0,
  high: 1,
  normal: 2,
  low: 3,
  background: 4,
}

interface QueuedEvent<TEventMap extends object> {
  readonly event: AnyHunterEvent<TEventMap>
  readonly sequence: number
}

/**
 * Coordinates typed, decoupled communication between Hunter System modules.
 * Subscribers are isolated so a failure in one handler never blocks another.
 */
export class EventBus<TEventMap extends object> {
  private readonly subscribers = new Map<string, Set<EventSubscriber<string, unknown>>>()
  private readonly middleware = new Set<EventMiddleware<TEventMap>>()
  private readonly history: AnyHunterEvent<TEventMap>[] = []
  private readonly observers = new Set<(event: AnyHunterEvent<TEventMap>) => void>()
  private readonly maximumQueueSize: number
  private readonly maximumHistorySize: number
  private queue: QueuedEvent<TEventMap>[] = []
  private sequence = 0
  private flushScheduled = false

  public constructor({ maximumQueueSize = 100, maximumHistorySize = 100 } = {}) {
    this.maximumQueueSize = maximumQueueSize
    this.maximumHistorySize = maximumHistorySize
  }

  public publish<TKey extends EventName<TEventMap>>(
    input: EventInput<TKey, TEventMap[TKey]>,
  ): EventEnvelope<TKey, TEventMap[TKey]> {
    const event = this.createEvent(input)
    if (event.priority === 'critical') {
      this.dispatch(event)
      return event
    }

    if (this.queue.length >= this.maximumQueueSize) {
      this.queue.shift()
    }

    this.queue.push({ event, sequence: this.sequence++ })
    this.scheduleFlush()
    return event
  }

  public flush(): void {
    this.flushScheduled = false
    this.queue
      .sort(
        (first, second) =>
          PRIORITY_VALUE[first.event.priority] - PRIORITY_VALUE[second.event.priority] ||
          first.sequence - second.sequence,
      )
      .splice(0)
      .forEach(({ event }) => this.dispatch(event))
  }

  public subscribe<TKey extends EventName<TEventMap>>(
    type: TKey,
    subscriber: EventSubscriber<TKey, TEventMap[TKey]>,
  ): () => void {
    const subscribers = this.subscribers.get(type) ?? new Set<EventSubscriber<string, unknown>>()
    subscribers.add(subscriber as EventSubscriber<string, unknown>)
    this.subscribers.set(type, subscribers)
    return () => this.unsubscribe(type, subscriber)
  }

  public once<TKey extends EventName<TEventMap>>(
    type: TKey,
    subscriber: EventSubscriber<TKey, TEventMap[TKey]>,
  ): () => void {
    const unsubscribe = this.subscribe(type, (event) => {
      unsubscribe()
      subscriber(event)
    })
    return unsubscribe
  }

  public unsubscribe<TKey extends EventName<TEventMap>>(
    type: TKey,
    subscriber: EventSubscriber<TKey, TEventMap[TKey]>,
  ): void {
    const subscribers = this.subscribers.get(type)
    if (!subscribers) return
    subscribers.delete(subscriber as EventSubscriber<string, unknown>)
    if (subscribers.size === 0) this.subscribers.delete(type)
  }

  public use(middleware: EventMiddleware<TEventMap>): () => void {
    this.middleware.add(middleware)
    return () => this.middleware.delete(middleware)
  }

  /** Observes successfully dispatched events without subscribing to one event type. */
  public observe(observer: (event: AnyHunterEvent<TEventMap>) => void): () => void {
    this.observers.add(observer)
    return () => this.observers.delete(observer)
  }

  public clear(): void {
    this.queue = []
    this.history.splice(0)
  }

  public getHistory(): readonly AnyHunterEvent<TEventMap>[] {
    return this.history
  }

  public getQueueSize(): number {
    return this.queue.length
  }

  private createEvent<TKey extends EventName<TEventMap>>(
    input: EventInput<TKey, TEventMap[TKey]>,
  ): EventEnvelope<TKey, TEventMap[TKey]> {
    return {
      id: crypto.randomUUID(),
      type: input.type,
      source: input.source,
      target: input.target,
      payload: input.payload,
      timestamp: Date.now(),
      priority: input.priority ?? 'normal',
      metadata: input.metadata ?? {},
    }
  }

  private dispatch(event: AnyHunterEvent<TEventMap>): void {
    const shouldDispatch = [...this.middleware].every((middleware) => middleware(event) !== false)
    if (!shouldDispatch) return

    this.history.push(event)
    if (this.history.length > this.maximumHistorySize) this.history.shift()

    const subscribers = this.subscribers.get(event.type)
    subscribers?.forEach((subscriber) => {
      try {
        subscriber(event)
      } catch {
        // Subscribers are intentionally isolated to preserve event propagation.
      }
    })
    this.observers.forEach((observer) => observer(event))
  }

  private scheduleFlush(): void {
    if (this.flushScheduled) return
    this.flushScheduled = true
    queueMicrotask(() => this.flush())
  }
}
