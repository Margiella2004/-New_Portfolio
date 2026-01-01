import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './StackedRevealSection.css'

gsap.registerPlugin(ScrollTrigger)

export default function StackedRevealSection({
  children,
  className = '',
  innerClassName = '',
  revealOffsetFactor = 0.6,
  revealDistanceFactor = 1.15,
  pinSpacing = true,
  revealOnce = false,
}) {
  const stageRef = useRef(null)
  const innerRef = useRef(null)
  const hasPlayedRef = useRef(false)

  useLayoutEffect(() => {
    const stageEl = stageRef.current
    const innerEl = innerRef.current
    if (!stageEl || !innerEl) return undefined

    const getOffset = () => Math.round(stageEl.offsetHeight * revealOffsetFactor)
    const setOffset = () => {
      if (revealOnce && hasPlayedRef.current) return
      gsap.set(innerEl, { y: getOffset() })
    }

    setOffset()

    const scrollTriggerConfig = revealOnce
      ? {
          trigger: stageEl,
          start: 'top 70%',
          toggleActions: 'play none none none',
          once: true,
        }
      : {
          trigger: stageEl,
          start: 'top top',
          end: () =>
            `+=${Math.round(stageEl.offsetHeight * revealDistanceFactor)}`,
          pin: true,
          pinSpacing,
          scrub: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }

    const revealTween = gsap.to(innerEl, {
      y: 0,
      ease: revealOnce ? 'power2.out' : 'none',
      duration: revealOnce ? 0.9 : 1,
      scrollTrigger: scrollTriggerConfig,
      onComplete: () => {
        hasPlayedRef.current = true
      },
    })

    const handleRefresh = () => {
      setOffset()
    }

    ScrollTrigger.addEventListener('refreshInit', handleRefresh)
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.removeEventListener('refreshInit', handleRefresh)
      revealTween.scrollTrigger?.kill()
      revealTween.kill()
    }
  }, [pinSpacing, revealDistanceFactor, revealOffsetFactor])

  const stageClassName = ['stacked-reveal-stage', className]
    .filter(Boolean)
    .join(' ')
  const innerClassNameCombined = ['stacked-reveal-inner', innerClassName]
    .filter(Boolean)
    .join(' ')

  return (
    <section ref={stageRef} className={stageClassName}>
      <div ref={innerRef} className={innerClassNameCombined}>
        {children}
      </div>
    </section>
  )
}
