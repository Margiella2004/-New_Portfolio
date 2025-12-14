import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'
import './FloatingTabs.css'

gsap.registerPlugin(Draggable)

const svgPaths = {
  arrowFill: 'M8.62993 17.3546C8.11411 18.5152 7.8562 19.0955 7.51634 19.259C7.2084 19.4072 6.84691 19.3924 6.55205 19.2197C6.22665 19.029 6.01687 18.4296 5.5973 17.2308L0.453158 2.5333C0.098368 1.51961 -0.0790272 1.01276 0.033754 0.678435C0.136221 0.374682 0.374682 0.136221 0.678435 0.033754C1.01276 -0.0790272 1.51961 0.098368 2.53329 0.453158L17.2308 5.5973C18.4296 6.01687 19.029 6.22665 19.2197 6.55205C19.3924 6.84691 19.4072 7.2084 19.259 7.51634C19.0955 7.8562 18.5152 8.11411 17.3546 8.62993L11.8882 11.0594C11.6782 11.1527 11.5733 11.1994 11.4834 11.2656C11.4002 11.3268 11.3268 11.4002 11.2656 11.4834C11.1994 11.5733 11.1527 11.6782 11.0594 11.8882L8.62993 17.3546Z',
  arrowStroke:
    'M0.852616 0.549882C0.86322 0.546334 0.942849 0.526288 1.21785 0.59578C1.48379 0.662989 1.83672 0.785969 2.35359 0.966874L17.0509 6.11141C17.6602 6.32467 18.0831 6.47294 18.38 6.60652C18.526 6.67223 18.6212 6.72609 18.6827 6.76961C18.7426 6.81205 18.7531 6.83236 18.7501 6.82723C18.8312 6.96564 18.8382 7.13579 18.7686 7.28035C18.7712 7.27504 18.7626 7.29654 18.7061 7.34383C18.6484 7.39221 18.5573 7.45295 18.4171 7.53035C18.1321 7.68763 17.7226 7.86982 17.1329 8.13191L11.6671 10.5616C11.4787 10.6453 11.3089 10.7177 11.1602 10.8272C11.0331 10.9209 10.9209 11.0331 10.8272 11.1602C10.7177 11.3089 10.6453 11.4787 10.5616 11.6671L8.13191 17.1329C7.86982 17.7226 7.68763 18.1321 7.53035 18.4171C7.45295 18.5573 7.39221 18.6484 7.34383 18.7061C7.29654 18.7626 7.27504 18.7712 7.28035 18.7686C7.13579 18.8382 6.96564 18.8312 6.82723 18.7501C6.83236 18.7531 6.81205 18.7426 6.76961 18.6827C6.72609 18.6212 6.67223 18.526 6.60652 18.38C6.47294 18.0831 6.32467 17.6602 6.11141 17.0509L0.966874 2.35359C0.785969 1.83672 0.662989 1.48379 0.59578 1.21785C0.526288 0.942849 0.546334 0.86322 0.549882 0.852616C0.597985 0.710019 0.710019 0.597985 0.852616 0.549882Z',
}

const defaultTabs = [
  {
    id: 'ux-research',
    label: 'UX Research',
    color: '#aaa8d7',
    position: { left: '8%', top: '18%' },
    arrowPosition: { left: '32%', bottom: '-24px' },
    baseRotation: -34,
    delay: 0.3,
  },
  {
    id: 'branding',
    label: 'Branding',
    color: '#d7a8a8',
    position: { left: '46%', top: '62%' },
    arrowPosition: { left: '52%', top: '96%' },
    baseRotation: 6,
    delay: 1.1,
  },
  {
    id: 'creative-direction',
    label: 'Creative Direction',
    color: '#d7a8cc',
    position: { left: '56%', top: '18%' },
    arrowPosition: { right: '14%', top: '96%' },
    baseRotation: 270,
    delay: 0.6,
  },
  {
    id: 'typography',
    label: 'Typography',
    color: '#d7d6a8',
    position: { left: '72%', top: '66%' },
    arrowPosition: { left: '50%', top: '-26px' },
    baseRotation: -10,
    delay: 1.5,
  },
  {
    id: 'ui-design',
    label: 'UI Design',
    color: '#bad7a8',
    position: { left: '84%', top: '30%' },
    arrowPosition: { left: '14%', top: '102%' },
    baseRotation: -76,
    delay: 0,
  },
]

export default function FloatingTabs({
  enabled = true,
  floatAmpX = 6,
  floatAmpY = 10,
  floatSpeedX = 9,
  floatSpeedY = 8,
  hoverScale = 1.05,
  dragScale = 1.1,
  arrowWiggle = 3,
  arrowDelayOffset = 0,
}) {
  const containerRef = useRef(null)
  const tabRefs = useRef([])
  const arrowRefs = useRef([])

  const tabs = useMemo(() => defaultTabs, [])

  useEffect(() => {
    if (!enabled) return

    const floatTweens = []
    const arrowTweens = []
    const draggables = []
    const cleanupHandlers = []

    tabs.forEach((tab, index) => {
      const node = tabRefs.current[index]
      const arrowNode = arrowRefs.current[index]
      if (!node) return

      gsap.set(node, { opacity: 1, scale: 1 })

      const xRange = floatAmpX
      const yRange = floatAmpY

      const floatY = gsap.fromTo(
        node,
        { y: -(yRange / 2) },
        {
          y: yRange / 2,
          duration: floatSpeedY,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: tab.delay || 0,
        }
      )

      const floatX = gsap.fromTo(
        node,
        { x: -(xRange / 2) },
        {
          x: xRange / 2,
          duration: floatSpeedX,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: (tab.delay || 0) + 0.4,
        }
      )

      floatTweens.push(floatX, floatY)

      const hoverIn = () =>
        gsap.to(node, { scale: hoverScale, duration: 0.22, ease: 'power1.out' })
      const hoverOut = () =>
        gsap.to(node, { scale: 1, duration: 0.22, ease: 'power1.out' })
      const press = () =>
        gsap.to(node, { scale: dragScale, duration: 0.16, ease: 'power1.out' })
      const release = () =>
        gsap.to(node, { scale: hoverScale, duration: 0.18, ease: 'power1.out' })

      node.addEventListener('pointerenter', hoverIn)
      node.addEventListener('pointerleave', hoverOut)
      cleanupHandlers.push(() => {
        node.removeEventListener('pointerenter', hoverIn)
        node.removeEventListener('pointerleave', hoverOut)
      })

      const dragInstance = Draggable.create(node, {
        type: 'x,y',
        inertia: false,
        bounds: containerRef.current,
        onPress() {
          node.style.cursor = 'grabbing'
          node.style.zIndex = '60'
          press()
        },
        onRelease() {
          node.style.cursor = 'grab'
          node.style.zIndex = ''
          release()
        },
        onDrag() {
          node.style.cursor = 'grabbing'
        },
        onDragEnd() {
          node.style.cursor = 'grab'
        },
      })

      draggables.push(dragInstance[0])
      node.style.cursor = 'grab'

      if (arrowNode) {
        gsap.set(arrowNode, { rotation: tab.baseRotation || 0 })
        const tl = gsap.timeline({
          repeat: -1,
          defaults: { ease: 'sine.inOut' },
          delay: (tab.delay || 0) + arrowDelayOffset,
        })

        tl.to(arrowNode, {
          rotation: (tab.baseRotation || 0) + arrowWiggle,
          x: 2.5,
          y: -2.5,
          duration: 2.25,
        })
          .to(arrowNode, {
            rotation: (tab.baseRotation || 0) - arrowWiggle,
            x: -2.5,
            y: 2.5,
            duration: 2.25,
          })
          .to(arrowNode, {
            rotation: tab.baseRotation || 0,
            x: 0,
            y: 0,
            duration: 2,
          })

        arrowTweens.push(tl)
      }
    })

    return () => {
      floatTweens.forEach((tween) => tween.kill())
      arrowTweens.forEach((tl) => tl.kill())
      draggables.forEach((drag) => drag?.kill())
      cleanupHandlers.forEach((fn) => fn())
    }
  }, [
    enabled,
    floatAmpX,
    floatAmpY,
    floatSpeedX,
    floatSpeedY,
    hoverScale,
    dragScale,
    arrowWiggle,
    arrowDelayOffset,
    tabs,
  ])

  if (!enabled) return null

  return (
    <div className="floating-tabs" ref={containerRef} aria-hidden="true">
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          className={`floating-tab floating-tab-${tab.id}`}
          style={tab.position}
          ref={(el) => {
            tabRefs.current[index] = el
          }}
        >
          <div
            className="floating-tab-inner"
            style={{ backgroundColor: tab.color }}
          >
            <span className="floating-tab-label">{tab.label}</span>
            <div className="floating-tab-border" />
          </div>

          <div
          className="floating-tab-arrow"
          style={tab.arrowPosition}
          ref={(el) => {
            arrowRefs.current[index] = el
          }}
        >
          <svg
            viewBox="0 0 20 20"
            className="floating-tab-arrow-icon"
            style={{ color: tab.color, fill: tab.color }}
          >
            <path d={svgPaths.arrowFill} fill="currentColor" />
            <path
              d={svgPaths.arrowStroke}
              stroke="white"
              strokeLinejoin="bevel"
              strokeOpacity="0.74"
              strokeWidth="1.09"
            />
          </svg>
          </div>
        </div>
      ))}
    </div>
  )
}
