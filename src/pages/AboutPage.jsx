import { useEffect, useRef } from 'react'
import HeaderNew from '../components/HeaderNew'
import '../Footer.css'
import './AboutPage.css'

export default function AboutPage() {
  const headerRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="about-page">
      <HeaderNew
        innerRef={headerRef}
        activeSection="contact"
        blendActive={false}
      />

      <main className="about-page-content">
        <section className="module-footer about-page-module">
          <div className="footer-inner aboutme-inner">
            <div className="aboutme-top">
              <div className="aboutme-status">
                <span className="aboutme-status-dot" />
                <span className="aboutme-status-text">Looking for work</span>
              </div>
              <h1 className="aboutme-heading">About Me</h1>
            </div>

            <div className="aboutme-bio">
              <p className="aboutme-para aboutme-para--large">
                Hi, I&rsquo;m a{' '}
                <span className="aboutme-italic aboutme-underline">Ux &amp; 3d Designer</span>{' '}
                who merges coding with design to create better products, prioritizing{' '}
                <span className="aboutme-italic aboutme-underline">User-Centric Design</span>{' '}
                above all.
              </p>

              <p className="aboutme-para aboutme-para--medium">
                I am currently a design engineer at{' '}
                <span className="aboutme-italic aboutme-underline">Sensigo</span>{' '}
                where I work with AI And Product Design aswell.
              </p>

              <p className="aboutme-para aboutme-para--medium">
                My{' '}
                <span className="aboutme-italic aboutme-underline">art</span>{' '}
                and{' '}
                <span className="aboutme-italic aboutme-underline">engineering</span>{' '}
                background boosts my critical thinking, enabling a logical and abstract approach
                to product development.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
