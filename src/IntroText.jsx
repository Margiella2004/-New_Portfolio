import './IntroText.css'

const lineImage = "https://www.figma.com/api/mcp/asset/3aabee4c-2f03-4b7b-9acb-67ee915e883d"
const arrowImage = "https://www.figma.com/api/mcp/asset/ede21216-651c-4981-b9b1-42facbc7fea5"

export default function IntroText({ paddingX = 72 }) {
  return (
    <div className="intro-section" style={{ paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
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

        {/* Right: Intro text */}
        <p className="intro-text">
          Hi, I'm a UX & 3D Designer who combines coding and design values in order to create better products
        </p>
      </div>
    </div>
  )
}
