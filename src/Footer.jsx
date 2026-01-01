import './Footer.css'
import logoSvg from '../img_assets/logo.svg'
import linkArrowImage from '../Svg/material-symbols-light_arrow-back.svg'

const baseOrigin =
  typeof window !== 'undefined' && window.location?.origin
    ? window.location.origin
    : 'https://example.com'

const sanitizeText = (value) => {
  if (value === null || value === undefined) return ''
  return String(value)
}

const sanitizeUrl = (url) => {
  if (!url) return null
  try {
    const parsed = new URL(url, baseOrigin)
    return parsed.href
  } catch (error) {
    console.warn('[Footer] Skipped unsafe URL', url, error)
    return null
  }
}

export function Footer({ data = {} }) {
  const { email = '', projects = [], social = [], copyright = '©2025' } = data

  return (
    <div className="module-content module-footer" style={styles.container}>
      <div className="footer-inner">
        <div className="footer-social" style={styles.socialRow}>
          {social.map((link) => {
            const safeUrl = sanitizeUrl(link.url)
            if (!safeUrl) return null

            const label = sanitizeText(link.label || '')

            return (
              <a
                key={safeUrl}
                href={safeUrl}
                className="footer-social-link"
                style={styles.socialLink}
                target="_blank"
                rel="noreferrer"
              >
                {label}
                <img src={linkArrowImage} alt="" style={styles.socialArrow} />
              </a>
            )
          })}
        </div>

        <div style={styles.emailRow}>
          <div className="footer-small-label" style={styles.smallLabel}>EMAIL</div>
          <div className="footer-email-value" style={styles.emailValue}>{sanitizeText(email)}</div>
        </div>

        <div style={styles.projectsRow}>
          <div className="footer-small-label" style={styles.smallLabel}>PROJECTS</div>
          <div style={styles.projectsList}>
            {projects.map((project, index) => (
              <div key={project} style={styles.projectItem}>
                <span className="footer-project-index" style={styles.projectIndex}>0{index + 1}</span>
                <span className="footer-project-name" style={styles.projectName}>{sanitizeText(project)}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.bottomRow}>
          <img src={logoSvg} alt="Logo" className="footer-logo" style={styles.logo} />
          <div className="footer-copyright" style={styles.copyright}>{sanitizeText(copyright)}</div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    background: '#6F3C59',
    color: '#ffffff',
    padding: '80px 0',
  },
  socialRow: {
    display: 'flex',
    gap: '50.04px',
    justifyContent: 'flex-end',
    marginBottom: '40px',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'Pangea Afrikan, sans-serif',
    fontWeight: 700,
    fontSize: '10.725px',
    color: '#ffffff',
    letterSpacing: '0.9653px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    opacity: '0.338',
  },
  socialArrow: {
    width: '16.696px',
    height: '16.696px',
    transform: 'rotate(-45deg)',
    display: 'inline-block',
    filter: 'brightness(0) invert(1)',
    opacity: '0.338',
  },
  smallLabel: {
    fontFamily: 'Pangea Afrikan, sans-serif',
    fontWeight: 700,
    fontSize: '10.725px',
    letterSpacing: '0.9653px',
    textTransform: 'uppercase',
  },
  emailRow: {
    borderTop: '0.894px solid #868686',
    borderBottom: '0.894px solid #868686',
    padding: '34px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emailValue: {
    fontFamily: 'Instrument Serif, serif',
    fontSize: '41.381px',
    lineHeight: '51.48px',
    letterSpacing: '-1.287px',
    textAlign: 'right',
  },
  projectsRow: {
    borderBottom: '0.894px solid #868686',
    padding: '34px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  projectsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15.194px',
    alignItems: 'flex-end',
  },
  projectItem: {
    display: 'flex',
    gap: '8.938px',
    alignItems: 'flex-start',
  },
  projectIndex: {
    fontFamily: 'Pangea Afrikan, sans-serif',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '-0.466px',
  },
  projectName: {
    fontFamily: 'Instrument Serif, serif',
    fontSize: '40.398px',
    lineHeight: '51.48px',
    letterSpacing: '-1.287px',
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: '26.813px',
  },
  logo: {
    height: '200px',
    width: 'auto',
    display: 'block',
  },
  copyright: {
    fontFamily: 'Instrument Serif, serif',
    fontSize: '37.359px',
    lineHeight: '51.48px',
    letterSpacing: '-1.287px',
  },
}

export default Footer
