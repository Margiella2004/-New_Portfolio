import './IntroText.css'
import linkArrowImage from '../Svg/material-symbols-light_arrow-back.svg'

export default function IntroText({ paddingX = 72 }) {
  return (
    <div className="intro-section">
      {/* Horizontal Line */}
      <div className="intro-line-container">
        <div className="intro-line" />
      </div>

      {/* Content Container */}
      <div className="intro-content">
        {/* Left: "who is this guy" */}
        <div className="who-is-this-guy">
          <div className="who-text-wrapper">
            <p className="who-text">who is this guy</p>
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
