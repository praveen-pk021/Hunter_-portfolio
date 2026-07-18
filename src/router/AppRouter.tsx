import { useEffect } from 'react'
import { useSceneEngine } from '@/engine/scene-engine'
import { AscensionModule } from '@/modules/ascension'
import { PortfolioModule } from '@/modules/portfolio/PortfolioModule'

/** Renders registered scenes; the Scene Engine owns transitions and lifecycle. */
export function AppRouter() {
  const { sceneEngine, state } = useSceneEngine()
  useEffect(() => {
    const registrations = [
      {
        id: 'portfolio',
        title: 'Portfolio',
        description: 'Hunter portfolio landing scene.',
        order: 0,
        transition: 'materialize' as const,
        loader: async () => undefined,
      },
      {
        id: 'ascension',
        title: 'Ascension',
        description: 'Evidence-led growth journey.',
        order: 1,
        transition: 'ascend' as const,
        loader: async () => undefined,
      },
    ]
    registrations.forEach((scene) => {
      if (!sceneEngine.getScene(scene.id)) sceneEngine.register(scene)
    })
    if (
      !sceneEngine.getState().currentSceneId &&
      sceneEngine.getState().lifecycle === 'initialized'
    ) {
      void sceneEngine.jump('portfolio')
    }
  }, [sceneEngine])

  if (state.currentSceneId === 'ascension')
    return <AscensionModule onReturnToProfile={() => void sceneEngine.jump('portfolio')} />
  return (
    <>
      <PortfolioModule onOpenAscension={() => void sceneEngine.jump('ascension')} />
      {state.isTransitioning ? (
        <div className="scene-transition" aria-live="polite">
          Transferring scene…
        </div>
      ) : null}
    </>
  )
}
