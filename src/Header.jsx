import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <nav className="nav-links">
        <a href="#home" className="nav-link">home</a>
        <a href="#projects" className="nav-link">projects</a>
        <a href="#about" className="nav-link">about me</a>
      </nav>

      <div className="logo">
        <span className="logo-j">J</span>
        <span className="logo-text">o</span>
        <span className="logo-text logo-n">n</span>
        <span className="logo-dot">.</span>
        <span className="logo-r">R</span>
        <span className="logo-text">am</span>
      </div>

      <button className="contact-button">
        contact me
      </button>
    </header>
  )
}
