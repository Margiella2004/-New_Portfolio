import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './GuardianTimeline.css';

const milestones = [
  { week: 'hours 1-3', title: 'Brainstorm/ Sketch' },
  { week: 'hours 5-7', title: 'Ideate' },
  { week: 'hours 8-10', title: 'Prototype/Iterate' },
  { week: 'hours 11-16', title: 'Refine Prototype' },
  { week: 'hours 17-24', title: 'Present Work' }
];

export default function GuardianTimeline() {
  const cardRef = useRef(null);
  const scrollRef = useRef(null);
  const trackWrapperRef = useRef(null);
  const lineRef = useRef(null);
  const markerRefs = useRef([]);
  const circlesRef = useRef([]);

  useEffect(() => {
    if (
      !cardRef.current ||
      !scrollRef.current ||
      !trackWrapperRef.current ||
      !lineRef.current
    ) {
      return undefined;
    }

    const axisRef = { current: 'x' };
    const progressRef = { current: 0 };

    const applyLineProgress = () => {
      if (!lineRef.current) return;
      if (axisRef.current === 'x') {
        gsap.set(lineRef.current, {
          scaleX: progressRef.current,
          scaleY: 1,
          transformOrigin: 'left center'
        });
      } else {
        gsap.set(lineRef.current, {
          scaleY: progressRef.current,
          scaleX: 1,
          transformOrigin: 'center top'
        });
      }
    };

    const layoutTrack = () => {
      const scrollEl = scrollRef.current;
      const wrapperEl = trackWrapperRef.current;
      if (!scrollEl || !wrapperEl) return;

      const first = markerRefs.current[0];
      const last = markerRefs.current[markerRefs.current.length - 1];
      if (!first || !last) return;

      const scrollRect = scrollEl.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();

      const startX =
        firstRect.left -
        scrollRect.left +
        scrollEl.scrollLeft +
        firstRect.width / 2;
      const startY =
        firstRect.top -
        scrollRect.top +
        scrollEl.scrollTop +
        firstRect.height / 2;
      const endX =
        lastRect.left -
        scrollRect.left +
        scrollEl.scrollLeft +
        lastRect.width / 2;
      const endY =
        lastRect.top -
        scrollRect.top +
        scrollEl.scrollTop +
        lastRect.height / 2;

      const dx = endX - startX;
      const dy = endY - startY;
      const isHorizontal = Math.abs(dx) >= Math.abs(dy);
      axisRef.current = isHorizontal ? 'x' : 'y';

      if (isHorizontal) {
        wrapperEl.style.left = `${startX}px`;
        wrapperEl.style.top = `${Math.round(startY) - 0.5}px`;
        wrapperEl.style.width = `${Math.max(1, dx)}px`;
        wrapperEl.style.height = '1px';
      } else {
        wrapperEl.style.left = `${Math.round(startX) - 0.5}px`;
        wrapperEl.style.top = `${startY}px`;
        wrapperEl.style.width = '1px';
        wrapperEl.style.height = `${Math.max(1, dy)}px`;
      }

      applyLineProgress();
    };

    window.addEventListener('resize', layoutTrack);
    layoutTrack();
    requestAnimationFrame(layoutTrack);

    progressRef.current = 0;
    applyLineProgress();
    circlesRef.current.forEach((circle) => {
      if (circle) {
        gsap.set(circle, { opacity: 0, scale: 0, transformOrigin: 'center' });
      }
    });

    const progress = { value: 0 };
    const triggered = new Array(milestones.length).fill(false);
    const tl = gsap.timeline({ paused: true });

    tl.to(progress, {
      value: 1,
      duration: 4,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (lineRef.current) {
          progressRef.current = progress.value;
          applyLineProgress();
        }

        milestones.forEach((_, index) => {
          const threshold = index / (milestones.length - 1);

          if (progress.value >= threshold && !triggered[index]) {
            triggered[index] = true;
            const circle = circlesRef.current[index];

            if (circle) {
              gsap
                .timeline()
                .to(circle, {
                  opacity: 1,
                  scale: 1.5,
                  duration: 0.2,
                  ease: 'power2.inOut'
                })
                .to(circle, {
                  scale: 1,
                  duration: 0.3,
                  ease: 'power2.inOut'
                });
            }
          }
        });
      }
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl.play();
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', layoutTrack);
      tl.kill();
    };
  }, []);

  return (
    <div className="guardian-timeline">
      <div ref={cardRef} className="guardian-timeline-card">
        <div className="guardian-timeline-title-wrapper">
          <h3 className="guardian-timeline-title">
            Progress Timeline - 24 hours
          </h3>
        </div>

        <div className="guardian-timeline-track-area">
          <div ref={scrollRef} className="guardian-timeline-scroll">
            <div ref={trackWrapperRef} className="guardian-timeline-track-wrapper">
              <div className="guardian-timeline-track-base" />
              <div ref={lineRef} className="guardian-timeline-track-progress" />
            </div>

            <div className="guardian-timeline-milestones">
              {milestones.map((milestone, index) => (
                <div key={index} className="guardian-timeline-milestone">
                  <div
                    ref={(el) => {
                      markerRefs.current[index] = el;
                    }}
                    className="guardian-timeline-icon-wrapper"
                  >
                    <svg className="guardian-timeline-icon" viewBox="0 0 17 17" fill="none">
                      <circle
                        cx="8.43311"
                        cy="8.43311"
                        r="8.14231"
                        fill="var(--timeline-bg)"
                        stroke="var(--timeline-stroke)"
                        strokeWidth="0.58"
                      />
                      <circle
                        ref={(el) => {
                          circlesRef.current[index] = el;
                        }}
                        cx="8.43315"
                        cy="8.43323"
                        r="5.52514"
                        fill="var(--timeline-accent)"
                      />
                    </svg>
                  </div>

                  <div className="guardian-timeline-text">
                    <p className="guardian-timeline-week">{milestone.week}</p>
                    <p className="guardian-timeline-milestone-title">
                      {milestone.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
