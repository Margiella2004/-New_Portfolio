import './IntroText.css'
import lineImage from '../Svg/Line 1.svg'
import arrowImage from '../Svg/material-symbols-light_arrow-back.svg'
import linkArrowImage from '../Svg/material-symbols-light_arrow-back.svg'

export default function IntroText({ paddingX = 72 }) {
  // Ensure minimum padding on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const effectivePadding = isMobile ? Math.max(paddingX, 40) : paddingX

  return (
    <div className="intro-section" style={{ paddingLeft: `${effectivePadding}px`, paddingRight: `${effectivePadding}px` }}>
      {/* Horizontal Line */}
      <div className="intro-line-container">
        <img src={lineImage} alt="" className="intro-line" />
      </div>

      {/* Content Container */}
      <div className="intro-content">
        {/* Left: "who is this guy" with arrow */}
        <div className="who-is-this-guy">
          <div className="who-text-wrapper">
            <p className="who-text">who is this guy</p>
          </div>
          <div className="arrow-wrapper">
            <div className="arrow-rotate">
              <div className="arrow-container">
                <img src={arrowImage} alt="" className="arrow-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Intro text and links */}
        <div className="intro-text-container">
          <p className="intro-text">
            Hi, I'm a UX & 3D Designer who combines coding and design values in order to create better products
          </p>

          {/* Link Buttons */}
          <div className="link-buttons">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="link-button">
              <span className="link-button-text">linkedin</span>
              <div className="link-button-arrow">
                <img src={linkArrowImage} alt="" className="link-arrow-image" />
              </div>
            </a>

            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="link-button">
              <span className="link-button-text">resume</span>
              <div className="link-button-arrow">
                <img src={linkArrowImage} alt="" className="link-arrow-image" />
              </div>
            </a>

            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="link-button">
              <span className="link-button-text">github</span>
              <div className="link-button-arrow">
                <img src={linkArrowImage} alt="" className="link-arrow-image" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
