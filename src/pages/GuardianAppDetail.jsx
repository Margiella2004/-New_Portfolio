import { useEffect } from 'react';
import ProjectDetailHeader from '../components/ProjectDetailHeader';
import GuardianTimeline from '../components/GuardianTimeline';
import ContentModule from '../components/ContentModule';
import OtherProjects from '../components/OtherProjects';
import StackedRevealSection from '../components/StackedRevealSection';
import Footer from '../Footer';
import { footerData } from '../footerData';
import { projectsData } from '../data/projectsData';
import './GuardianAppDetail.css';

// Import images
import heroImage from '../../img_assets/Frame 56.png';
import tilesSectionIntro from '../../img_assets/Frame 2147238398.png';
import rightBentoImage from '../../img_assets/IMG_1007.png';
import leftBentoImage from '../../img_assets/IMG_1009.png';
import secondLeftBentoImage from '../../img_assets/Frame 2147238402-1.png';
import secondRightBentoImage from '../../img_assets/Frame 2147238402-2.png';
import journeyMapImage from '../../img_assets/Frame 2147238322-2.png';
import threeImageOne from '../../img_assets/IMG_7010.png';
import threeImageTwo from '../../img_assets/IMG_7014.png';
import threeImageThree from '../../img_assets/IMG_7015.png';
import timerImage from '../../img_assets/Frame 2147238401.png';
import teammateSketchesImage from '../../img_assets/Frame 2147238322.png';
import timerEndImage from '../../img_assets/Frame 2147238402.png';
import twoImageOne from '../../img_assets/IMG_7017 1.png';
import twoImageTwo from '../../img_assets/IMG_7018 1.png';
import finalShowcaseImage from '../../img_assets/Frame 2147238322-3.png';

export default function GuardianAppDetail() {
  const project = {
    metadata: {
      date: 'November - December 2025',
      company: 'Hackathon',
      category: 'Elder care'
    },
    title: 'Guardian App',
    description: 'Jonathan Ramesh is a Interdisciplinary Designer focusing on UX Design and Engineering. Jonathan combines his coding experience and design education to create products focused on bringing back human centered design.',
    skills: ['UX Research', 'UI Design', 'Vibe Coding', 'Python', 'Websockets']
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ProjectDetailHeader />
      <main className="guardian-app-page">
        <div className="guardian-app-container">

          {/* Header Section - Copied from Synechron Cube */}
          <header className="guardian-app-header">
            <div className="guardian-app-title-section">
              <div className="guardian-app-metadata">
                <span className="guardian-app-metadata-item">
                  {project.metadata.date}
                </span>
                <span className="guardian-app-metadata-item guardian-app-metadata-secondary">
                  {project.metadata.company}
                </span>
                <span className="guardian-app-metadata-item guardian-app-metadata-secondary">
                  {project.metadata.category}
                </span>
              </div>
              <h1 className="guardian-app-title">{project.title}</h1>
            </div>
            <div className="guardian-app-hero-image-container">
              <img
                src={heroImage}
                alt={project.title}
                className="guardian-app-hero-image"
              />
            </div>
          </header>

          {/* Bio & Skills Section */}
          <section className="guardian-app-bio-skills">
            <div className="guardian-app-description">
              <p className="guardian-app-description-text">
                {project.description}
              </p>
            </div>
            <div className="guardian-app-skills">
              {project.skills.map((skill, index) => (
                <span key={index} className="guardian-app-skill">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* 3. 64 Tiles Section - Complete image */}
          <section className="guardian-app-image-section">
            <img
              src={tilesSectionIntro}
              alt="64 Tiles"
              className="guardian-app-section-image"
              loading="lazy"
              decoding="async"
            />
          </section>

          {/* 4. Quote */}
          <section className="guardian-app-quote">
            <p className="guardian-app-quote-text">{project.description}</p>
          </section>

          {/* 5. Progress Timeline */}
          <section className="guardian-app-timeline-section">
            <GuardianTimeline />
          </section>

          {/* Left Bento Box (Bento-Up-Left) */}
          <section className="guardian-app-bento-section">
            <ContentModule
              layout="bento-up-left"
              title="PLACEHOLDER_TITLE_LEFT"
              description="PLACEHOLDER_DESCRIPTION_LEFT"
              images={[
                leftBentoImage
              ]}
              hideTopImage={true}
              hideText={true}
              className="guardian-app-content-module"
              style={{
                '--content-module-bento-gap': '24px',
                '--content-module-bento-gap-desktop': '40px',
                '--content-module-bento-text-width': '30%',
                '--content-module-bento-media-width': '70%',
                '--content-module-image-height-large': '560px',
                '--content-module-image-height-bento': '560px',
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          {/* Right Bento Box (Bento-Up-Right) */}
          <section className="guardian-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title="PLACEHOLDER_TITLE_RIGHT"
              description="PLACEHOLDER_DESCRIPTION_RIGHT"
              images={[
                rightBentoImage
              ]}
              hideTopImage={true}
              hideText={true}
              bentoTextAlign="right"
              className="guardian-app-content-module"
              style={{
                '--content-module-bento-gap': '24px',
                '--content-module-bento-gap-desktop': '40px',
                '--content-module-bento-text-width': '30%',
                '--content-module-bento-media-width': '70%',
                '--content-module-image-height-large': '560px',
                '--content-module-image-height-bento': '560px',
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          {/* Quote */}
          <section className="guardian-app-quote">
            <p className="guardian-app-quote-text">{project.description}</p>
          </section>

          {/* Left Bento Box 2 (Bento-Up-Left) */}
          <section className="guardian-app-bento-section">
            <ContentModule
              layout="bento-up-left"
              title="PLACEHOLDER_TITLE_LEFT_2"
              description="PLACEHOLDER_DESCRIPTION_LEFT_2"
              images={[
                secondLeftBentoImage
              ]}
              hideTopImage={true}
              hideText={true}
              className="guardian-app-content-module"
              style={{
                '--content-module-bento-gap': '24px',
                '--content-module-bento-gap-desktop': '40px',
                '--content-module-bento-text-width': '30%',
                '--content-module-bento-media-width': '70%',
                '--content-module-image-height-large': '560px',
                '--content-module-image-height-bento': '560px',
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          {/* Right Bento Box 2 (Bento-Up-Right) */}
          <section className="guardian-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title="PLACEHOLDER_TITLE_RIGHT_2"
              description="PLACEHOLDER_DESCRIPTION_RIGHT_2"
              images={[
                secondRightBentoImage
              ]}
              hideTopImage={true}
              hideText={true}
              bentoTextAlign="right"
              className="guardian-app-content-module"
              style={{
                '--content-module-bento-gap': '24px',
                '--content-module-bento-gap-desktop': '40px',
                '--content-module-bento-text-width': '30%',
                '--content-module-bento-media-width': '70%',
                '--content-module-image-height-large': '560px',
                '--content-module-image-height-bento': '560px',
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          {/* Image Section */}
          <section className="guardian-app-image-section">
            <img
              src={journeyMapImage}
              alt="Guardian App Section"
              className="guardian-app-section-image"
              loading="lazy"
              decoding="async"
            />
          </section>

          {/* Three Image Section */}
          <section className="guardian-app-three-image-section">
            <div className="guardian-app-three-image-container">
              <div className="guardian-app-three-image-item">
                <img src={threeImageOne} alt="Image 1" loading="lazy" decoding="async" />
              </div>
              <div className="guardian-app-three-image-item">
                <img src={threeImageTwo} alt="Image 2" loading="lazy" decoding="async" />
              </div>
              <div className="guardian-app-three-image-item">
                <img src={threeImageThree} alt="Image 3" loading="lazy" decoding="async" />
              </div>
            </div>
          </section>

          {/* Quote */}
          <section className="guardian-app-quote">
            <p className="guardian-app-quote-text">{project.description}</p>
          </section>

          {/* Single Image Section - Right Aligned */}
          <section className="guardian-app-single-image-section guardian-app-single-image-right">
            <div className="guardian-app-single-image-item">
              <img src={timerImage} alt="Single Image" loading="lazy" decoding="async" />
            </div>
          </section>

          {/* Image Section */}
          <section className="guardian-app-image-section">
            <img
              src={teammateSketchesImage}
              alt="Guardian App Section"
              className="guardian-app-section-image"
              loading="lazy"
              decoding="async"
            />
          </section>

          {/* Single Image Section - Left Aligned */}
          <section className="guardian-app-single-image-section guardian-app-single-image-left">
            <div className="guardian-app-single-image-item">
              <img src={timerEndImage} alt="Single Image" loading="lazy" decoding="async" />
            </div>
          </section>

          {/* Two Image Section - Left Aligned */}
          <section className="guardian-app-two-image-section guardian-app-two-image-left">
            <div className="guardian-app-two-image-container">
              <div className="guardian-app-two-image-item">
                <img src={twoImageOne} alt="Image 1" loading="lazy" decoding="async" />
              </div>
              <div className="guardian-app-two-image-item">
                <img src={twoImageTwo} alt="Image 2" loading="lazy" decoding="async" />
              </div>
            </div>
          </section>

          {/* Image Section */}
          <section className="guardian-app-reveal-stage">
            <img
              src={finalShowcaseImage}
              alt="Guardian App Section"
              className="guardian-app-reveal-image"
              loading="lazy"
              decoding="async"
            />
          </section>

        </div>
        <StackedRevealSection
          className="guardian-app-reveal-stage guardian-app-other-projects-stage"
          innerClassName="guardian-app-reveal-inner"
        >
          <OtherProjects project={projectsData.synechronCube} />
        </StackedRevealSection>
        <div className="footer-layer guardian-app-footer-layer">
          <Footer data={footerData} />
        </div>
      </main>
    </>
  );
}
