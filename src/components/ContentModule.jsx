import './ContentModule.css';

export default function ContentModule({
  title,
  description,
  images,
  layout,
  className = '',
  overlayContent,
  hideTopImage = false,
  bentoTextAlign = 'right',
  style
}) {
  const renderMedia = (src, alt, extraClassName = '') => {
    if (!src) return null;
    const normalized = String(src).toLowerCase().split('?')[0].split('#')[0];
    const isVideo = normalized.endsWith('.mp4') || normalized.endsWith('.mov') || normalized.endsWith('.webm');

    if (isVideo) {
      return (
        <video
          className={`content-module-image ${extraClassName}`.trim()}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      );
    }

    return <img src={src} alt={alt} className={`content-module-image ${extraClassName}`.trim()} />;
  };

  // Text content subcomponent
  const TextContent = ({ align = 'left', maxWidth = '440px' }) => (
    <div className={`content-module-text content-module-text-${align}`}>
      <h2 className="content-module-title">{title}</h2>
      <p className="content-module-description" style={{ maxWidth }}>
        {description}
      </p>
    </div>
  );

  // Layout: Stacked (Text top, Image bottom)
  if (layout === 'stacked') {
    return (
      <div className={`content-module content-module-stacked ${className}`} style={style}>
        <TextContent maxWidth="672px" />
        <div className="content-module-image-container content-module-image-container-large">
          {renderMedia(images?.[0], title)}
        </div>
      </div>
    );
  }

  // Layout: Split Left (Image Left, Text Right)
  if (layout === 'split-left') {
    return (
      <div className={`content-module content-module-split-left ${className}`} style={style}>
        <div className="content-module-image-container content-module-image-container-square">
          {renderMedia(images?.[0], title)}
        </div>
        <div className="content-module-text-wrapper">
          <TextContent maxWidth="90%" />
        </div>
      </div>
    );
  }

  // Layout: Split Right (Text Left, Image Right)
  if (layout === 'split-right') {
    return (
      <div className={`content-module content-module-split-right ${className}`} style={style}>
        <div className="content-module-text-wrapper">
          <TextContent />
        </div>
        <div className="content-module-image-container content-module-image-container-square">
          {renderMedia(images?.[0], title)}
        </div>
      </div>
    );
  }

  // Layout: Grid 2 (Text top, 2 Images side-by-side)
  if (layout === 'grid-2') {
    return (
      <div className={`content-module content-module-grid-2 ${className}`} style={style}>
        <TextContent />
        <div className="content-module-image-grid">
          {images.slice(0, 2).map((img, i) => (
            <div key={i} className="content-module-image-container content-module-image-container-grid">
              {renderMedia(img, `${title} ${i + 1}`)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Layout: Bento Up Left (Large Image Top, Text Left / Image Right Bottom)
  if (layout === 'bento-up-left') {
    return (
      <div className={`content-module content-module-bento-up-left ${className}`} style={style}>
        {/* Top Large Image */}
        {!hideTopImage && (
          <div className="content-module-image-container content-module-image-container-large">
            {renderMedia(images?.[0], `${title} Main`)}
          </div>
        )}

        {/* Bottom Split */}
        <div className="content-module-bento-bottom">
          <div className="content-module-bento-text">
            <TextContent align="left" />
          </div>
          <div className="content-module-image-container content-module-image-container-bento">
            {renderMedia(images?.[1] || images?.[0], `${title} Detail`)}
          </div>
        </div>
      </div>
    );
  }

  // Layout: Bento Up Right (Large Image Top, Image Left / Text Right Bottom)
  if (layout === 'bento-up-right') {
    const bentoTextAlignClass =
      bentoTextAlign === 'left' ? 'content-module-bento-text-left' : 'content-module-bento-text-right';
    const textAlign = bentoTextAlign === 'left' ? 'left' : 'right';

    return (
      <div className={`content-module content-module-bento-up-right ${className}`} style={style}>
        {/* Top Large Image */}
        {!hideTopImage && (
          <div className="content-module-image-container content-module-image-container-large">
            {renderMedia(images?.[0], `${title} Main`)}
          </div>
        )}

        {/* Bottom Split */}
        <div className="content-module-bento-bottom">
          <div className="content-module-image-container content-module-image-container-bento">
            {renderMedia(images?.[1] || images?.[0], `${title} Detail`)}
          </div>
          <div className={`content-module-bento-text ${bentoTextAlignClass}`}>
            <TextContent align={textAlign} />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
