import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

function EditorialOverlay({
  activeProject,
  isExpanded,
  isIntroComplete,
  previewSources,
  previewImagesReady,
  onAnimatingChange,
  expandedTopOffsetRem,
}) {
  const infoRef = useRef(null)
  const titleRef = useRef(null)
  const previewsRef = useRef(null)
  const expandedTitleRef = useRef(null)
  const contentRef = useRef(null)
  const tagsRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonRef = useRef(null)
  const uiTimelineRef = useRef(null)
  const expandedLayoutRef = useRef({ width: null, paddingRight: null })
  const collapsedLayoutRef = useRef({ width: null, paddingRight: null })

  // Stop wheel events from reaching VirtualScroll when expanded
  useLayoutEffect(() => {
    const infoNode = infoRef.current
    if (!infoNode) return

    const stopPropagation = (e) => {
      if (isExpanded) {
        e.stopPropagation()
      }
    }

    infoNode.addEventListener('wheel', stopPropagation, { capture: true, passive: false })
    infoNode.addEventListener('touchmove', stopPropagation, { capture: true, passive: false })

    return () => {
      infoNode.removeEventListener('wheel', stopPropagation, { capture: true })
      infoNode.removeEventListener('touchmove', stopPropagation, { capture: true })
    }
  }, [isExpanded])
  const hasInitializedUiAnimationRef = useRef(false)
  const previewReadyRef = useRef(previewImagesReady)

  useLayoutEffect(() => {
    previewReadyRef.current = previewImagesReady
  }, [previewImagesReady])

  useLayoutEffect(() => {
    const infoNode = infoRef.current
    const titleNode = titleRef.current
    const previewNode = previewsRef.current
    const expandedTitleNode = expandedTitleRef.current
    const contentNode = contentRef.current
    const tagsNode = tagsRef.current
    const descriptionNode = descriptionRef.current
    const buttonNode = buttonRef.current
    if (!infoNode || !titleNode || !previewNode || !expandedTitleNode || !contentNode || !tagsNode || !descriptionNode || !buttonNode) return undefined

    const previewImageNodes = Array.from(previewNode.querySelectorAll('img'))
    const animationTargets = [
      infoNode,
      previewNode,
      titleNode,
      expandedTitleNode,
      contentNode,
      tagsNode,
      descriptionNode,
      buttonNode,
      ...previewImageNodes,
    ].filter(Boolean)

    uiTimelineRef.current?.kill()
    gsap.killTweensOf(animationTargets)

    const expandedShift =
      getComputedStyle(infoNode).getPropertyValue('--info-shift-expanded').trim() || '-11rem'

    if (!hasInitializedUiAnimationRef.current) {
      const initStyle = getComputedStyle(infoNode)
      if (!isExpanded) {
        collapsedLayoutRef.current = {
          width: initStyle.width,
          paddingRight: initStyle.paddingRight,
        }
      }
      hasInitializedUiAnimationRef.current = true
      gsap.set(infoNode, {
        x: isExpanded ? expandedShift : 0,
        y: 0,
        force3D: true,
      })
      gsap.set(titleNode, { opacity: isExpanded ? 0 : 1, force3D: true })
      gsap.set(expandedTitleNode, {
        opacity: isExpanded ? 1 : 0,
        force3D: true,
      })
      gsap.set(contentNode, {
        opacity: 1,
        filter: 'blur(0px)',
        force3D: true,
      })
      gsap.set([tagsNode, descriptionNode, buttonNode], {
        opacity: 1,
        filter: 'blur(0px)',
        force3D: true,
      })
      gsap.set(previewNode, {
        autoAlpha: isExpanded && previewReadyRef.current ? 1 : 0,
        y: isExpanded ? 0 : 14,
        scale: isExpanded ? 1 : 0.96,
        filter: 'blur(0px)',
        maxHeight: isExpanded ? '400vh' : 0,
        marginTop: isExpanded ? '1rem' : 0,
        force3D: true,
      })
      return undefined
    }

    const measureId = `editorial-${isExpanded ? 'expand' : 'collapse'}-${Date.now()}`
    const canMeasure = typeof performance !== 'undefined' && typeof performance.mark === 'function'
    let finished = false
    let mounted = true

    if (canMeasure) {
      performance.mark(`${measureId}-start`)
    }

    const finish = () => {
      if (finished) return
      finished = true
      if (mounted) onAnimatingChange(false)

      if (canMeasure) {
        performance.mark(`${measureId}-end`)
        try {
          performance.measure(
            `editorial-${isExpanded ? 'expand' : 'collapse'}`,
            `${measureId}-start`,
            `${measureId}-end`
          )
        } catch {
          // ignore duplicate measure names or unsupported combinations
        }
      }
    }

    const timeline = gsap.timeline({
      defaults: {
        ease: 'power2.inOut',
        overwrite: 'auto',
      },
      onStart: () => {
        if (mounted) onAnimatingChange(true)
      },
      onComplete: finish,
      onInterrupt: finish,
    })

    uiTimelineRef.current = timeline

    if (isExpanded) {
      const expandedStyle = getComputedStyle(infoNode)
      expandedLayoutRef.current = {
        width: expandedStyle.width,
        paddingRight: expandedStyle.paddingRight,
      }
      gsap.set(infoNode, { clearProps: 'width,paddingRight,marginTop' })
      infoNode.scrollTop = 0
      // Set individual elements to invisible for staggered reveal
      gsap.set([tagsNode, descriptionNode, buttonNode], { opacity: 0, filter: 'blur(8px)' })
      gsap.set(previewImageNodes, { opacity: 0, y: 10, filter: 'blur(8px)' })

      timeline
        // Fade out left title while container begins expanding
        .to(titleNode, { opacity: 0, duration: 0.1, ease: 'power2.inOut' }, 0)
        .to(contentNode, { opacity: 0, filter: 'blur(10px)', duration: 0.14, ease: 'power2.inOut' }, 0.02)
        // Expand/move container first
        .to(
          infoNode,
          {
            x: expandedShift,
            duration: 0.55,
            ease: 'power2.inOut',
          },
          0.14
        )
        // After expansion completes, reveal internal content
        .to(contentNode, { opacity: 1, filter: 'blur(0px)', duration: 0.01 }, 0.74)
        .to(previewNode, { maxHeight: '400vh', marginTop: '1rem', duration: 0.22, ease: 'power2.inOut' }, 0.76)
        .to(previewNode, { filter: 'blur(12px)', duration: 0.01 }, 0.78)
        .to(
          previewNode,
          {
            autoAlpha: previewReadyRef.current ? 1 : 0,
            y: 0,
            scale: 1,
            duration: 0.2,
            ease: 'power2.inOut',
          },
          0.82
        )
        .to(previewNode, { filter: 'blur(0px)', duration: 0.15, ease: 'power2.inOut' }, 0.95)
        .to(
          previewImageNodes,
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.18, stagger: 0.08, ease: 'power2.inOut' },
          0.86
        )
        // Staggered reveal from bottom to top
        .to(buttonNode, { opacity: 1, filter: 'blur(0px)', duration: 0.18, ease: 'power2.inOut' }, 1.0)
        .to(descriptionNode, { opacity: 1, filter: 'blur(0px)', duration: 0.18, ease: 'power2.inOut' }, 1.1)
        .to(tagsNode, { opacity: 1, filter: 'blur(0px)', duration: 0.18, ease: 'power2.inOut' }, 1.2)
        .to(expandedTitleNode, { opacity: 1, duration: 0.2, ease: 'power2.inOut' }, 1.3)
        .call(() => {
          gsap.set(infoNode, { clearProps: 'width,paddingRight' })
        }, null, 1.36)
    } else {
      gsap.set(infoNode, { clearProps: 'width,paddingRight,marginTop' })
      const collapsedStyle = getComputedStyle(infoNode)
      const collapsedWidth = collapsedStyle.width
      const collapsedPaddingRight = collapsedStyle.paddingRight
      collapsedLayoutRef.current = { width: collapsedWidth, paddingRight: collapsedPaddingRight }
      const frozenExpandedWidth = expandedLayoutRef.current.width ?? collapsedWidth
      const frozenExpandedPaddingRight = expandedLayoutRef.current.paddingRight ?? collapsedPaddingRight

      gsap.set(infoNode, { marginTop: `${expandedTopOffsetRem}rem` })
      gsap.set(infoNode, {
        width: frozenExpandedWidth,
        paddingRight: frozenExpandedPaddingRight,
      })
      timeline
        // Simultaneous exit sequence
        .to(expandedTitleNode, { opacity: 0, duration: 0.14, ease: 'power2.inOut' }, 0)
        .to([tagsNode, descriptionNode, buttonNode], { opacity: 0, filter: 'blur(8px)', duration: 0.14, ease: 'power2.inOut' }, 0)
        .to(
          previewImageNodes,
          {
            opacity: 0,
            y: 10,
            filter: 'blur(8px)',
            duration: 0.14,
            ease: 'power2.inOut',
          },
          0
        )
        .to(contentNode, { opacity: 0, filter: 'blur(10px)', duration: 0.14, ease: 'power2.inOut' }, 0.02)
        // Collapse panel back to base state
        .to(previewNode, { filter: 'blur(12px)', autoAlpha: 0, y: 14, scale: 0.96, duration: 0.2, ease: 'power2.inOut' }, 0.48)
        .to(previewNode, { maxHeight: 0, marginTop: 0, duration: 0.22, ease: 'power2.inOut' }, 0.62)
        .to(
          infoNode,
          {
            width: collapsedWidth,
            paddingRight: collapsedPaddingRight,
            duration: 0.24,
            ease: 'power2.inOut',
          },
          0.7
        )
        .to(infoNode, { marginTop: 0, duration: 0.22, ease: 'power2.inOut' }, 0.98)
        .to(infoNode, { x: 0, duration: 0.55, ease: 'power2.inOut' }, 0.2)
        .to(titleNode, { opacity: 1, duration: 0.18, ease: 'power2.inOut' }, 0.7)
        // Reset nodes for next expand
        .to(
          [tagsNode, descriptionNode, buttonNode],
          { opacity: 1, filter: 'blur(0px)', duration: 0.01 },
          0.82
        )
        .to(previewImageNodes, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.01 }, 0.82)
        .to(contentNode, { opacity: 1, filter: 'blur(0px)', duration: 0.16, ease: 'power2.inOut' }, 0.86)
        .call(() => {
          gsap.set(infoNode, { clearProps: 'width,paddingRight,marginTop' })
        }, null, 1.22)
    }

    return () => {
      mounted = false
      timeline.kill()
      gsap.killTweensOf(animationTargets)
      finish()
    }
  }, [expandedTopOffsetRem, isExpanded, onAnimatingChange])

  useEffect(() => {
    const previewNode = previewsRef.current
    if (!previewNode || !hasInitializedUiAnimationRef.current || !isExpanded) return

    gsap.to(previewNode, {
      autoAlpha: previewImagesReady ? 1 : 0,
      duration: 0.24,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [isExpanded, previewImagesReady])

  if (!activeProject) return null
  return (
    <section
      className={`editorial-strip ${isExpanded ? 'is-expanded' : ''} ${isIntroComplete ? 'intro-ready' : 'intro-hidden'}`}
      aria-label="Active project preview"
      style={{ '--expanded-offset': `${expandedTopOffsetRem}rem` }}
    >
      <div className="editorial-grid">
        <h2 ref={titleRef} className="editorial-title">{activeProject.title}</h2>
        <aside ref={infoRef} className="editorial-info">
          <h2 ref={expandedTitleRef} className="editorial-title-expanded">{activeProject.title}</h2>
          <div className="editorial-info-scroll">
            <div ref={contentRef} className="editorial-content">
              <div ref={tagsRef} className="editorial-tags">
                {activeProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <p ref={descriptionRef}>{activeProject.description}</p>
              <button ref={buttonRef} type="button">{activeProject.cta}</button>
            </div>
            <div ref={previewsRef} className="editorial-previews">
              {previewSources.slice(0, 4).map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Preview ${index + 1}`}
                  loading={isExpanded ? 'eager' : 'lazy'}
                  decoding="async"
                />
              ))}
            </div>
            <div className="editorial-bottom-spacer" aria-hidden="true" />
          </div>
        </aside>
      </div>
    </section>
  )
}

export default EditorialOverlay
