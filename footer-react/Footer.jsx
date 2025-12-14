import React from 'react';
import './Footer.css';

const baseOrigin =
  typeof window !== 'undefined' && window.location?.origin
    ? window.location.origin
    : 'https://example.com';

const sanitizeText = (value) => {
  if (value === null || value === undefined) return '';
  return String(value);
};

const sanitizeUrl = (url) => {
  if (!url) return null;
  try {
    const parsed = new URL(url, baseOrigin);
    return parsed.href;
  } catch (error) {
    console.warn('[Footer] Skipped unsafe URL', url, error);
    return null;
  }
};

export function Footer({ data = {} }) {
  const { email = '', projects = [], social = [], copyright = '©2025' } = data;

  return (
    <div className="module-content module-footer" style={styles.container}>
      <div className="footer-social" style={styles.socialRow}>
        {social.map((link) => {
          const safeUrl = sanitizeUrl(link.url);
          if (!safeUrl) return null;

          const label = sanitizeText(link.label || '');

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
              <span style={styles.socialArrow}>↗</span>
            </a>
          );
        })}
      </div>

      <div style={styles.emailRow}>
        <div style={styles.smallLabel}>EMAIL</div>
        <div style={styles.emailValue}>{sanitizeText(email)}</div>
      </div>

      <div style={styles.projectsRow}>
        <div style={styles.smallLabel}>PROJECTS</div>
        <div style={styles.projectsList}>
          {projects.map((project, index) => (
            <div key={project} style={styles.projectItem}>
              <span style={styles.projectIndex}>0{index + 1}</span>
              <span style={styles.projectName}>{sanitizeText(project)}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.bottomRow}>
        <div style={styles.wordmark}>
          <span style={styles.wordmarkItalic}>J</span>
          <span style={styles.wordmarkLight}>onathan </span>
          <span style={styles.wordmarkItalic}>R</span>
          <span style={styles.wordmarkLight}>amesh</span>
        </div>
        <div style={styles.copyright}>{sanitizeText(copyright)}</div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: '#000000',
    color: '#ffffff',
    padding: '80px 48px'
  },
  socialRow: {
    display: 'flex',
    gap: '50.04px',
    justifyContent: 'flex-end',
    marginBottom: '40px'
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
    opacity: '0.338'
  },
  socialArrow: {
    fontSize: '13.41px',
    transform: 'rotate(-45deg)',
    display: 'inline-block'
  },
  smallLabel: {
    fontFamily: 'Pangea Afrikan, sans-serif',
    fontWeight: 700,
    fontSize: '10.725px',
    letterSpacing: '0.9653px',
    textTransform: 'uppercase'
  },
  emailRow: {
    borderTop: '0.894px solid #868686',
    borderBottom: '0.894px solid #868686',
    padding: '34px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  emailValue: {
    fontFamily: 'Instrument Serif, serif',
    fontSize: '41.381px',
    lineHeight: '51.48px',
    letterSpacing: '-1.287px',
    textAlign: 'right'
  },
  projectsRow: {
    borderBottom: '0.894px solid #868686',
    padding: '34px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  projectsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15.194px',
    alignItems: 'flex-end'
  },
  projectItem: {
    display: 'flex',
    gap: '8.938px',
    alignItems: 'baseline'
  },
  projectIndex: {
    fontFamily: 'Pangea Afrikan, sans-serif',
    fontSize: '14.627px',
    lineHeight: '18.639px',
    letterSpacing: '-0.466px'
  },
  projectName: {
    fontFamily: 'Instrument Serif, serif',
    fontSize: '40.398px',
    lineHeight: '51.48px',
    letterSpacing: '-1.287px'
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: '26.813px'
  },
  wordmark: {
    fontFamily: 'Instrument Serif, serif',
    fontStyle: 'italic',
    fontSize: '138.709px',
    letterSpacing: '-9.7096px'
  },
  wordmarkItalic: {
    fontStyle: 'italic'
  },
  wordmarkLight: {
    fontFamily: 'Pangea Afrikan, sans-serif',
    fontWeight: 300
  },
  copyright: {
    fontFamily: 'Instrument Serif, serif',
    fontSize: '37.359px',
    lineHeight: '51.48px',
    letterSpacing: '-1.287px'
  }
};

export default Footer;
