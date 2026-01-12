import { useEffect } from 'react';
import ProjectDetailHeader from '../components/ProjectDetailHeader';
import ContentModule from '../components/ContentModule';
import OtherProjects from '../components/OtherProjects';
import Footer from '../Footer';
import { footerData } from '../footerData';
import { projectsData } from '../data/projectsData';
import heroImage from '../../img_assets/wander_app/PersonaShowcase.png';
import problemStatementImage from '../../img_assets/wander_app/ProblemStatement.png';
import affinityMapImage from '../../img_assets/wander_app/AffinityMap.png';
import affinityInsightsImage from '../../img_assets/wander_app/AffinityMap-1.png';
import affinityGapImage from '../../img_assets/wander_app/AffinityMap-2.png';
import affinityEndScreenImage from '../../img_assets/wander_app/AffinityMap-3.png';
import affinityVisualImage from '../../img_assets/wander_app/AffinityMap-4.png';
import affinityQuestionsImage from '../../img_assets/wander_app/AffinityMap-6.png';
import prototypeStripImage from '../../img_assets/wander_app/wander_prototypet.png';
import usabilityAffinityImage from '../../img_assets/wander_app/UsabilityAffinityMap.png';
import usabilityAnalysisImage from '../../img_assets/wander_app/UsabilityAnalysis.png';
import strategicInsightImage from '../../img_assets/wander_app/Container.png';
import './WanderAppDetail.css';

export default function WanderAppDetail() {
  const project = {
    metadata: {
      date: 'June - July 2025',
      company: 'Wander',
      category: 'Travel'
    },
    title: 'Wander App',
    description:
      'Wander App is a travel planning concept built around clear itineraries and personalized discovery. I mapped the end-to-end journey from inspiration to booking, then designed a lightweight flow that keeps planning fast while still surfacing rich context and local insights.',
    skills: ['UX Research', 'UI Design', 'Prototyping', 'Design Systems', 'React']
  };
  const quote =
    'Travel planning breaks when the details feel scattered. We centered the experience around one living plan so users always know what is next without losing room to explore.';
  const quoteSecondary =
    'Personas helped us check bias early, prioritize the right features, and keep the flow rooted in real travel routines.';
  const quoteTertiary =
    'The affinity map surfaced the same themes across interviews, which gave us a clear priority order for the experience.';
  const quoteFinal =
    'The strategic insight clarified the product promise: less setup, more calm, and confidence baked into every step.';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ProjectDetailHeader />
      <main className="wander-app-page">
        <div className="wander-app-container">
          <header className="wander-app-header">
            <div className="wander-app-title-section">
              <div className="wander-app-metadata">
                <span className="wander-app-metadata-item">
                  {project.metadata.date}
                </span>
                <span className="wander-app-metadata-item wander-app-metadata-secondary">
                  {project.metadata.company}
                </span>
                <span className="wander-app-metadata-item wander-app-metadata-secondary">
                  {project.metadata.category}
                </span>
              </div>
              <h1 className="wander-app-title">{project.title}</h1>
            </div>
            <div className="wander-app-hero-image-container">
              <img
                src={heroImage}
                alt={project.title}
                className="wander-app-hero-image"
              />
            </div>
          </header>

          <section className="wander-app-bio-skills">
            <div className="wander-app-description">
              <p className="wander-app-description-text">
                {project.description}
              </p>
            </div>
            <div className="wander-app-skills">
              {project.skills.map((skill, index) => (
                <span key={index} className="wander-app-skill">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="wander-app-quote">
            <p className="wander-app-quote-text">{quote}</p>
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="stacked"
              title="Problem Statement"
              description=""
              images={[problemStatementImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px',
                '--content-module-image-height-large': '720px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title="Proto Personas"
              description="We defined early personas to anchor priorities, align language, and keep the planning flow grounded in real travel behavior."
              images={[heroImage]}
              hideTopImage={true}
              bentoTextAlign="left"
              className="wander-app-content-module wander-app-content-module-right"
              style={{
                '--content-module-bento-gap': '24px',
                '--content-module-bento-gap-desktop': '40px',
                '--content-module-bento-text-width': '30%',
                '--content-module-bento-media-width': '70%',
                '--content-module-image-height-bento': '560px',
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          <section className="wander-app-quote">
            <p className="wander-app-quote-text">{quoteSecondary}</p>
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="stacked"
              title="Affinity Mapping"
              description=""
              images={[affinityMapImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px',
                '--content-module-image-height-large': '720px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="grid-2"
              title="Research Highlights"
              description=""
              images={[affinityInsightsImage, affinityQuestionsImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-grid-mobile': '16px',
                '--content-module-border-radius-grid-desktop': '28px'
              }}
            />
          </section>

          <section className="wander-app-quote">
            <p className="wander-app-quote-text">{quoteTertiary}</p>
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="stacked"
              title="Prototype Screens"
              description=""
              images={[prototypeStripImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px',
                '--content-module-image-height-large': '560px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="stacked"
              title="Usability Testing"
              description=""
              images={[usabilityAffinityImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px',
                '--content-module-image-height-large': '720px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="stacked"
              title="Analysis & Fixes"
              description=""
              images={[usabilityAnalysisImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px',
                '--content-module-image-height-large': '560px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title="Control & Trust Gap"
              description="Duration mismatches chipped away at trust, so we treated time changes as a hard constraint and asked for consent."
              images={[affinityGapImage]}
              hideTopImage={true}
              className="wander-app-content-module"
              style={{
                '--content-module-bento-gap': '24px',
                '--content-module-bento-gap-desktop': '40px',
                '--content-module-bento-text-width': '30%',
                '--content-module-bento-media-width': '70%',
                '--content-module-image-height-bento': '560px',
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title="Visual Inconsistency"
              description="Color shifts raised stress levels during the flow, so we aligned the palette through the end screen."
              images={[affinityVisualImage]}
              hideTopImage={true}
              bentoTextAlign="left"
              className="wander-app-content-module wander-app-content-module-right"
              style={{
                '--content-module-bento-gap': '24px',
                '--content-module-bento-gap-desktop': '40px',
                '--content-module-bento-text-width': '30%',
                '--content-module-bento-media-width': '70%',
                '--content-module-image-height-bento': '560px',
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="grid-2"
              title="Usability Pain Points"
              description=""
              images={[affinityEndScreenImage, affinityVisualImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-grid-mobile': '16px',
                '--content-module-border-radius-grid-desktop': '28px'
              }}
            />
          </section>

          <section className="wander-app-bento-section">
            <ContentModule
              layout="stacked"
              title="Strategic Insight"
              description=""
              images={[strategicInsightImage]}
              hideText={true}
              className="wander-app-content-module"
              style={{
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px',
                '--content-module-image-height-large': '560px'
              }}
            />
          </section>

          <section className="wander-app-quote">
            <p className="wander-app-quote-text">{quoteFinal}</p>
          </section>
        </div>
        <section className="wander-app-other-projects-stage">
          <OtherProjects project={projectsData.synechronCube} />
        </section>
        <div className="footer-layer wander-app-footer-layer">
          <Footer data={footerData} />
        </div>
      </main>
    </>
  );
}
