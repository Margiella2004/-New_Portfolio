import './EditorialOverlay.css'

function EditorialOverlay({ activeProject, typography = {} }) {
  if (!activeProject) return null

  const titleStyle = {
    fontFamily: `'${typography.titleFont || 'Instrument Serif'}', Georgia, serif`,
    fontSize: `${typography.titleSize || 3}rem`,
    fontWeight: typography.titleWeight || 400,
    fontStyle: typography.titleItalic ? 'italic' : 'normal',
    color: typography.titleColor || '#000000',
    letterSpacing: `${typography.titleLetterSpacing || -0.15}rem`,
  }

  const tagsStyle = {
    fontFamily: `'${typography.tagsFont || 'IBM Plex Mono'}', monospace`,
    fontSize: `${typography.tagsSize || 0.95}rem`,
    fontWeight: typography.tagsWeight || 500,
    color: typography.tagsColor || '#9a9494',
  }

  const descStyle = {
    fontFamily: `'${typography.descFont || 'Pangea Afrikan'}', sans-serif`,
    fontSize: `${typography.descSize || 1}rem`,
    fontWeight: typography.descWeight || 400,
    color: typography.descColor || '#000000',
    lineHeight: typography.descLineHeight || 1.22,
  }

  const triangleSize = typography.triangleSize || 1
  const triangleStyle = {
    borderTopWidth: `${triangleSize}rem`,
    borderBottomWidth: `${triangleSize}rem`,
    borderLeftWidth: `${triangleSize * 1.5}rem`,
    borderLeftColor: typography.triangleColor || '#ffffff',
  }

  const wrapperStyle = {
    gap: `${typography.triangleGap || 1.5}rem`,
  }

  return (
    <section className="editorial-strip" aria-label="Active project preview">
      <div className="editorial-grid">
        <div className="editorial-title-wrapper" style={wrapperStyle}>
          <h2 className="editorial-title" style={titleStyle}>{activeProject.title}</h2>
          <div className="editorial-triangle" style={triangleStyle} aria-hidden="true" />
        </div>
        <aside className="editorial-info">
          <div className="editorial-content">
            <div className="editorial-tags" style={tagsStyle}>
              {activeProject.tags?.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p className="editorial-description" style={descStyle}>{activeProject.description}</p>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default EditorialOverlay
