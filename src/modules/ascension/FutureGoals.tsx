import { futureGoals } from './AscensionConfig'

export function FutureGoals() {
  return (
    <section className="ascension-panel future-goals" aria-labelledby="goals-title">
      <p className="eyebrow">Future trajectory</p>
      <h2 id="goals-title">Future goals</h2>
      <ul>
        {futureGoals.map((goal) => (
          <li key={goal}>{goal}</li>
        ))}
      </ul>
    </section>
  )
}
