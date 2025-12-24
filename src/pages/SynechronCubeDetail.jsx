import { useEffect } from 'react';
import { Leva, folder, useControls } from 'leva';
import ProjectDetailHeader from '../components/ProjectDetailHeader';
import ContentModule from '../components/ContentModule';
import { projectsData } from '../data/projectsData';
import SynechronTimeline from '../components/SynechronTimeline';
import OtherProjects from '../components/OtherProjects';
import StackedRevealSection from '../components/StackedRevealSection';
import Footer from '../Footer';
import { footerData } from '../footerData';
import './SynechronCubeDetail.css';
import guardianHeaderImage from '../../img_assets/Frame 56.png';

export default function SynechronCubeDetail() {
  const project = projectsData.synechronCube;
  const guardianProject = {
    ...projectsData.guardianApp,
    heroImage: guardianHeaderImage
  };
  const {
    containerPadding,
    containerPaddingTopMobile,
    containerPaddingTopDesktop,
    sectionGapMobile,
    sectionGapDesktop,
    headerGap,
    titleSectionGap,
    heroHeightMobile,
    heroHeightMd,
    heroHeightLg,
    heroRadiusMobile,
    heroRadiusDesktop,
    quotePaddingMobile,
    quotePaddingDesktop,
    addedBlockGap,
    newSectionsGap,
    bentoPairGap,
    bentoGapMobile,
    bentoGapDesktop,
    bentoTextWidth,
    moduleImageHeightLarge,
    moduleImageHeightBento,
    moduleRadiusMobile,
    moduleRadiusDesktop
  } = useControls({
    Page: folder({
      containerPadding: { value: 20, min: 0, max: 80, step: 1 },
      containerPaddingTopMobile: { value: 80, min: 0, max: 200, step: 1 },
      containerPaddingTopDesktop: { value: 112, min: 0, max: 240, step: 1 },
      sectionGapMobile: { value: 20, min: 0, max: 120, step: 1 },
      sectionGapDesktop: { value: 20, min: 0, max: 160, step: 1 },
      headerGap: { value: 80, min: 0, max: 200, step: 1 },
      titleSectionGap: { value: 16, min: 0, max: 80, step: 1 }
    }),
    Hero: folder({
      heroHeightMobile: { value: 400, min: 200, max: 900, step: 10 },
      heroHeightMd: { value: 600, min: 300, max: 1100, step: 10 },
      heroHeightLg: { value: 700, min: 300, max: 1300, step: 10 },
      heroRadiusMobile: { value: 20, min: 0, max: 80, step: 1 },
      heroRadiusDesktop: { value: 35, min: 0, max: 120, step: 1 }
    }),
    Quote: folder({
      quotePaddingMobile: { value: 24, min: 0, max: 120, step: 1 },
      quotePaddingDesktop: { value: 208, min: 0, max: 260, step: 1 }
    }),
    NewSections: folder({
      addedBlockGap: { value: 20, min: 0, max: 120, step: 1 },
      newSectionsGap: { value: 20, min: 0, max: 160, step: 1 },
      bentoPairGap: { value: 20, min: 0, max: 120, step: 1 }
    }),
    Modules: folder({
      bentoGapMobile: { value: 24, min: 0, max: 120, step: 1 },
      bentoGapDesktop: { value: 40, min: 0, max: 200, step: 1 },
      bentoTextWidth: { value: 30, min: 10, max: 50, step: 1 },
      moduleImageHeightLarge: { value: 560, min: 200, max: 1200, step: 10 },
      moduleImageHeightBento: { value: 560, min: 200, max: 1200, step: 10 },
      moduleRadiusMobile: { value: 20, min: 0, max: 80, step: 1 },
      moduleRadiusDesktop: { value: 34, min: 0, max: 120, step: 1 }
    })
  });

  const moduleStyles = {
    '--content-module-bento-gap': `${bentoGapMobile}px`,
    '--content-module-bento-gap-desktop': `${bentoGapDesktop}px`,
    '--content-module-bento-text-width': `${bentoTextWidth}%`,
    '--content-module-bento-media-width': `${100 - bentoTextWidth}%`,
    '--content-module-image-height-large': `${moduleImageHeightLarge}px`,
    '--content-module-image-height-bento': `${moduleImageHeightBento}px`,
    '--content-module-border-radius-mobile': `${moduleRadiusMobile}px`,
    '--content-module-border-radius-desktop': `${moduleRadiusDesktop}px`
  };

  const isVideoSrc = (src) => {
    if (typeof src !== 'string') return false;
    const normalized = src.toLowerCase().split('?')[0].split('#')[0];
    return normalized.endsWith('.mp4') || normalized.endsWith('.mov') || normalized.endsWith('.webm');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log('[SynechronCube Spacing]', {
      containerPadding,
      sectionGapDesktop,
      addedBlockGap,
      newSectionsGap,
      bentoPairGap,
      bentoGapDesktop,
      bentoTextWidth
    });
  }, [
    containerPadding,
    sectionGapDesktop,
    addedBlockGap,
    newSectionsGap,
    bentoPairGap,
    bentoGapDesktop,
    bentoTextWidth
  ]);

  return (
    <>
      <Leva collapsed={false} />
      <ProjectDetailHeader />
      <main
        className="synechron-cube-page"
        style={{
          '--synechron-container-padding-mobile': `${containerPadding}px`,
          '--synechron-container-padding-desktop': `${containerPadding}px`,
          '--synechron-container-padding-top-mobile': `${containerPaddingTopMobile}px`,
          '--synechron-container-padding-top-desktop': `${containerPaddingTopDesktop}px`,
          '--synechron-section-gap-mobile': `${sectionGapMobile}px`,
          '--synechron-section-gap-desktop': `${sectionGapDesktop}px`,
          '--synechron-header-gap': `${headerGap}px`,
          '--synechron-title-section-gap': `${titleSectionGap}px`,
          '--synechron-hero-height-mobile': `${heroHeightMobile}px`,
          '--synechron-hero-height-md': `${heroHeightMd}px`,
          '--synechron-hero-height-lg': `${heroHeightLg}px`,
          '--synechron-hero-border-radius-mobile': `${heroRadiusMobile}px`,
          '--synechron-hero-border-radius-desktop': `${heroRadiusDesktop}px`,
          '--synechron-quote-padding-mobile': `${quotePaddingMobile}px`,
          '--synechron-quote-padding-desktop': `${quotePaddingDesktop}px`,
          '--synechron-added-block-gap': `${addedBlockGap}px`,
          '--synechron-new-sections-gap': `${newSectionsGap}px`,
          '--synechron-bento-pair-gap': `${bentoPairGap}px`,
          '--content-module-border-radius-mobile': `${moduleRadiusMobile}px`,
          '--content-module-border-radius-desktop': `${moduleRadiusDesktop}px`
        }}
      >
        <div className="synechron-cube-container">

          {/* Header Section */}
          <header className="synechron-cube-header">
            <div className="synechron-cube-title-section">
              <div className="synechron-cube-metadata">
                <span className="synechron-cube-metadata-item">
                  {project.metadata.date}
                </span>
                <span className="synechron-cube-metadata-item synechron-cube-metadata-secondary">
                  {project.metadata.company}
                </span>
                <span className="synechron-cube-metadata-item synechron-cube-metadata-secondary">
                  {project.metadata.category}
                </span>
              </div>
              <h1 className="synechron-cube-title">{project.title}</h1>
            </div>
            <div className="synechron-cube-hero-image-container">
              <img
                src={project.heroImage}
                alt={project.title}
                className="synechron-cube-hero-image"
              />
            </div>
          </header>

          {/* Bio & Skills Section */}
          <section className="synechron-cube-bio-skills">
            <div className="synechron-cube-description">
              <p className="synechron-cube-description-text">
                {project.description}
              </p>
            </div>
            <div className="synechron-cube-skills">
              {project.skills.map((skill, index) => (
                <span key={index} className="synechron-cube-skill">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="synechron-cube-legacy-sections">
            {/* Number Grid Image */}
            <section className="synechron-cube-grid">
              <div className="synechron-cube-grid-image-container">
                <img
                  src={project.numberGridImage}
                  alt="Synechron Cube Grid"
                  className="synechron-cube-grid-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>

            {/* Centered Quote */}
            <section className="synechron-cube-quote">
              <p className="synechron-cube-quote-text">{project.quote}</p>
            </section>

            {/* Content Modules */}
          {project.contentModules.map((module, index) => (
            <div key={`${module.title}-${index}`} className="synechron-cube-module-block">
              <ContentModule
                layout={module.layout}
                title={module.title}
                description={module.description}
                images={module.images}
                overlayContent={module.overlayText}
                hideTopImage={module.title === 'Why A Cube?'}
                bentoTextAlign={module.title === 'Model/Texture' ? 'left' : 'right'}
                className="synechron-cube-content-module"
                style={moduleStyles}
              />

                {module.title === 'Why A Cube?' && (
                  <div className="synechron-cube-timeline-wrapper">
                    <SynechronTimeline />
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Centered Quote (between legacy and new sections) */}
          <section className="synechron-cube-quote">
            <p className="synechron-cube-quote-text">{project.quote}</p>
          </section>

          {(project.featureBlock?.bigImage ||
            project.featureBlock?.bentoLeft ||
            project.bentoPairImages?.length >= 2) && (
            <section className="synechron-cube-new-sections">
              {/* Added: Big image + Bento Left (single block) */}
              {(project.featureBlock?.bigImage || project.featureBlock?.bentoLeft) && (
                <section className="synechron-cube-added-block">
                  {project.featureBlock?.bigImage && (
                    <div className="synechron-cube-feature-image-container">
                      {isVideoSrc(project.featureBlock.bigImage) ? (
                        <video
                          className="synechron-cube-feature-image"
                          src={project.featureBlock.bigImage}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img
                          src={project.featureBlock.bigImage}
                          alt="Synechron Cube Feature"
                          className="synechron-cube-feature-image"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                    </div>
                  )}

                  {project.featureBlock?.bentoLeft && (
                    <div className="synechron-cube-module-block">
                      <ContentModule
                        layout={project.featureBlock.bentoLeft.layout}
                        title={project.featureBlock.bentoLeft.title}
                        description={project.featureBlock.bentoLeft.description}
                        images={project.featureBlock.bentoLeft.images}
                        overlayContent={project.featureBlock.bentoLeft.overlayText}
                        hideTopImage
                        className="synechron-cube-content-module"
                        style={moduleStyles}
                      />
                    </div>
                  )}
                </section>
              )}

              {/* Added: Two bento-style images */}
              {project.bentoPairImages?.length >= 2 && (
                <section className="synechron-cube-bento-pair">
                  {project.bentoPairImages.slice(0, 2).map((img, index) => (
                    <div key={index} className="synechron-cube-bento-pair-image-container">
                      {isVideoSrc(img) ? (
                        <video
                          className="synechron-cube-bento-pair-image"
                          src={img}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img
                          src={img}
                          alt={`Synechron Cube Bento ${index + 1}`}
                          className="synechron-cube-bento-pair-image"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                    </div>
                  ))}
                </section>
              )}
            </section>
          )}

        </div>
        <StackedRevealSection
          className="synechron-cube-reveal-stage synechron-cube-other-projects-stage"
          innerClassName="synechron-cube-reveal-inner"
        >
          <OtherProjects project={guardianProject} />
        </StackedRevealSection>
        <div className="footer-layer synechron-cube-footer-layer">
          <Footer data={footerData} />
        </div>
      </main>
    </>
  );
}
