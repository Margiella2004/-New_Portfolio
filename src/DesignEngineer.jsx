import './DesignEngineer.css'
import designEngineerSvg from '/Design Engineer.svg'
import designEngineerMobileSvg from '/Design Engineer_Mobile.svg'

export default function DesignEngineer() {
  return (
    <div className="design-engineer-container">
      <img src={designEngineerSvg} alt="Design Engineer" className="design-engineer-svg design-engineer-desktop" />
      <img src={designEngineerMobileSvg} alt="Design Engineer" className="design-engineer-svg design-engineer-mobile" />
    </div>
  )
}
