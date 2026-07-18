import { careerCompass, careerStages } from './AscensionConfig'

interface CareerCompassProps {
  completedMilestones: number
}

export function CareerCompass({ completedMilestones }: CareerCompassProps) {
  const currentStageIndex = Math.min(Math.floor(completedMilestones / 3), careerStages.length - 1)
  return (
    <section className="ascension-panel career-compass" aria-labelledby="compass-title">
      <p className="eyebrow">Career compass</p>
      <h2 id="compass-title">{careerStages[currentStageIndex]}</h2>
      <ol className="stage-list">
        {careerStages.map((stage, index) => (
          <li className={index <= currentStageIndex ? 'active' : ''} key={stage}>
            {stage}
          </li>
        ))}
      </ol>
      <dl>
        <div>
          <dt>Direction</dt>
          <dd>{careerCompass.currentDirection}</dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd>{careerCompass.primaryFocus}</dd>
        </div>
        <div>
          <dt>Objective</dt>
          <dd>{careerCompass.currentObjective}</dd>
        </div>
      </dl>
    </section>
  )
}
