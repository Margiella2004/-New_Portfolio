import './DesignEngineer.css'
import designEngineerSvg from '/Design Engineer.svg'

export default function DesignEngineer() {
  return (
    <div className="design-engineer-container">
      <img src={designEngineerSvg} alt="Design Engineer" className="design-engineer-svg" />
    </div>
  )
}
