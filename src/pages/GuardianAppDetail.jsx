import { useEffect } from 'react';
import ProjectDetailHeader from '../components/ProjectDetailHeader';
import GuardianTimeline from '../components/GuardianTimeline';
import ContentModule from '../components/ContentModule';
import OtherProjects from '../components/OtherProjects';
import Footer from '../Footer';
import { footerData } from '../footerData';
import { projectsData } from '../data/projectsData';
import './GuardianAppDetail.css';

// Import images
import heroImage from '../../img_assets/gaurdian.png';
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
import affinityMapImage from '../../img_assets/Create Affinity Map.png';
import interactionPrototypeImage from '../../img_assets/Create Interaction Prototype.png';
import navigationClipPrimary from '../../img_assets/Screen Recording 2026-01-04 at 7.17.25 PM.mov';
import navigationClipSecondary from '../../img_assets/Screen Recording 2026-01-04 at 7.19.08 PM.mov';
import presentationPhoto from '../../img_assets/594362318_1134515405160983_6935414773021549184_n.jpg';

export default function GuardianAppDetail() {
  const project = {
    metadata: {
      date: 'November - December 2025',
      company: 'Hackathon',
      category: 'Elder care'
    },
    title: 'Guardian App',
    description: 'Guardian App is a BRIDEGOOD AI for Social Good hackathon concept built to support elders and caregivers during scam calls. I led UX research and interaction design, translating anxiety and confusion into calm, step by step guidance that works in the moment. The product focuses on privacy safe verification, clear risk summaries, and simple actions so users can decide without losing confidence or control.',
    skills: ['UX Research', 'UI Design', 'Vibe Coding', 'Python', 'Websockets']
  };
  const copy = {
    quoteIntro:
      'Teaching older adults made the stakes feel real. The barrier was never just knowledge, it was confidence and fear of making the wrong move. Guardian is designed to lower that pressure with language that feels human, actions that are easy to recognize, and a flow that makes the next step obvious without shaming the user.',
    quoteAfterBento:
      'In a live call, clarity beats complexity. We narrowed each screen to one risk summary, one short explanation, and two primary actions so users can respond quickly without scanning or guessing.',
    quoteAfterGallery:
      'Caregivers needed context without overwhelm, so we prioritized what to show, when to show it, and how to share it. The result is a short summary, a simple report, and a path to support that respects privacy.',
    quoteShowcase:
      'This project reinforced that in high stakes interactions, ambiguity reads as distrust. Guardian keeps the user at the center and treats decision making as something to support, not replace.',
    quoteAffinity:
      'We synthesized usability feedback into an affinity map, then ranked changes by impact. Timing, wording, privacy cues, and visual contrast were the themes that kept repeating.',
    quoteNav:
      'We prototyped the navigation flow in motion, then tested it on real people. Watching where users paused helped us adjust copy, spacing, and action placement before finalizing the interaction model.',
    bentoLeftTitle: 'Call Intercept Concepts',
    bentoLeftDescription:
      'Early screens explored how to surface risk in a live call without overwhelming the user. We tested language hierarchy, alert weight, and large action buttons that are easy to recognize at a glance.',
    bentoRightTitle: 'Scam Summary and Report',
    bentoRightDescription:
      'We paired a short summary with a clear report option so users could verify what happened, document details, and share them with a caregiver or family member.',
    bentoLeftTwoTitle: 'Alert Timing and Tone',
    bentoLeftTwoDescription:
      'We iterated on when to interrupt and how to phrase alerts so they felt supportive, not alarming. The goal was to earn trust while keeping the call in context.',
    bentoRightTwoTitle: 'Trust and Privacy Cues',
    bentoRightTwoDescription:
      'Permission cues explain what data is shown and why. This keeps users in control and makes the system feel transparent rather than intrusive.',
    navLeftTitle: 'Live Call Flow',
    navLeftDescription:
      'The live flow keeps users oriented with one clear risk callout, a short explanation, and two actions. The interface supports fast decisions without forcing a deep read.',
    navRightTitle: 'Post Call Support',
    navRightDescription:
      'After the call, the system summarizes what happened, suggests next steps, and creates a report that can be shared with a caregiver or support team.',
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
            <p className="guardian-app-quote-text">{copy.quoteIntro}</p>
          </section>

          {/* 5. Progress Timeline */}
          <section className="guardian-app-timeline-section">
            <GuardianTimeline />
          </section>

          {/* Left Bento Box (Bento-Up-Left) */}
          <section className="guardian-app-bento-section">
            <ContentModule
              layout="bento-up-left"
              title={copy.bentoLeftTitle}
              description={copy.bentoLeftDescription}
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
              title={copy.bentoRightTitle}
              description={copy.bentoRightDescription}
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
            <p className="guardian-app-quote-text">{copy.quoteAfterBento}</p>
          </section>

          {/* Left Bento Box 2 (Bento-Up-Left) */}
          <section className="guardian-app-bento-section">
            <ContentModule
              layout="bento-up-left"
              title={copy.bentoLeftTwoTitle}
              description={copy.bentoLeftTwoDescription}
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
              title={copy.bentoRightTwoTitle}
              description={copy.bentoRightTwoDescription}
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
            <p className="guardian-app-quote-text">{copy.quoteAfterGallery}</p>
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
          <section className="guardian-app-bento-section">
            <ContentModule
              layout="stacked"
              title="Final Showcase"
              description=""
              images={[finalShowcaseImage]}
              hideText={true}
              className="guardian-app-content-module"
              style={{
                '--content-module-border-radius-mobile': '20px',
                '--content-module-border-radius-desktop': '34px'
              }}
            />
          </section>

          {/* Quote */}
          <section className="guardian-app-quote">
            <p className="guardian-app-quote-text">{copy.quoteShowcase}</p>
          </section>

          {/* Image Section */}
          <section className="guardian-app-image-section">
            <img
              src={affinityMapImage}
              alt="Affinity Map"
              className="guardian-app-section-image"
              loading="lazy"
              decoding="async"
            />
          </section>

          {/* Quote */}
          <section className="guardian-app-quote">
            <p className="guardian-app-quote-text">{copy.quoteAffinity}</p>
          </section>

          {/* Image Section */}
          <section className="guardian-app-image-section">
            <img
              src={interactionPrototypeImage}
              alt="Interaction Prototype"
              className="guardian-app-section-image"
              loading="lazy"
              decoding="async"
            />
          </section>

          {/* Text Left + Small Bento Right */}
          <section className="guardian-app-bento-section">
            <ContentModule
              layout="bento-up-left"
              title={copy.navLeftTitle}
              description={copy.navLeftDescription}
              images={[navigationClipPrimary]}
              hideTopImage={true}
              hideText={false}
              className="guardian-app-content-module"
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

          {/* Image Left + Text Right */}
          <section className="guardian-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title={copy.navRightTitle}
              description={copy.navRightDescription}
              images={[navigationClipSecondary]}
              hideTopImage={true}
              hideText={false}
              bentoTextAlign="right"
              className="guardian-app-content-module"
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

          {/* Quote */}
          <section className="guardian-app-quote">
            <p className="guardian-app-quote-text">{copy.quoteNav}</p>
          </section>

          {/* Image Left, No Text */}
          <section className="guardian-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title=""
              description=""
              images={[presentationPhoto]}
              hideTopImage={true}
              hideText={true}
              bentoTextAlign="right"
              className="guardian-app-content-module"
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

          <section className="guardian-app-bio-skills">
            <div className="guardian-app-description">
              <p className="guardian-app-description-text">
                Jonathan Ramesh
                <br />
                Christopher Gonzales
                <br />
                Neil Huang
              </p>
            </div>
          </section>

        </div>
        <section className="guardian-app-other-projects-stage">
          <OtherProjects project={projectsData.synechronCube} />
        </section>
        <div className="footer-layer guardian-app-footer-layer">
          <Footer data={footerData} />
        </div>
      </main>
    </>
  );
}
