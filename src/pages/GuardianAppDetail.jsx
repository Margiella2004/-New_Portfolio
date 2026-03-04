import { useEffect } from 'react';
import HeaderNew from '../components/HeaderNew';
import GuardianTimeline from '../components/GuardianTimeline';
import ContentModule from '../components/ContentModule';
import OtherProjects from '../components/OtherProjects';
import { projectsData } from '../data/projectsData';
import './GuardianAppDetail.css';

// Import images
import heroImage from '../../img_assets/gaurdian.png';
import tilesSectionIntro from '../../img_assets/Frame 2147238398.png';
import rightBentoImage from '../../img_assets/IMG_1007.png';
import leftBentoImage from '../../img_assets/IMG_1009.png';
import secondLeftBentoImage from '../../img_assets/Frame 2147238402-1.png';
import secondRightBentoImage from '../../img_assets/Frame 2147238402-2.png';
import scamStatsImage from '../../img_assets/Frame 2147238322-1.png';
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
import apiStackImage from '../../img_assets/API_stack.png';
import detectionFlowImage from '../../img_assets/Screenshot 2026-01-14 at 7.48.02 PM.png';
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
    description: 'Guardian App is a BRIDEGOOD AI for Social Good hackathon concept built to support elders and caregivers during scam calls. I led UX research and interaction design, translating anxiety and confusion into calm, step-by-step guidance that works in the moment. The product focuses on privacy-safe verification, clear risk summaries, and the ability for caregivers to intervene in calls with the help of AI.',
    skills: ['UX Research', 'UI Design', 'Vibe Coding', 'Python', 'Websockets']
  };
  const copy = {
    quoteIntro:
      'In my first hackathon, we were a collection of different people with different backgrounds: a freshman, an ML researcher, marketing, and a designer. We all came to the hackathon with different ideas, but as we started talking and iterating through them, there was one thing all of us had in common. We all had an experience with a loved one experiencing a scam call.',
    quoteAfterBento:
      'While we found a topic that we all wanted to tackle, the goal of the hackathon was to figure out how AI can be used for social good. We started to run through different solutions to our problem, figuring out any way we could help seniors. Through talking to our mentors, we found out about a new feature from Apple that allows people to have an AI bot answer unknown calls, protecting the user from potential scammers. We wanted to use this technology in our product. The problem was that the legality of this is only possible due to Apple partnering with many ISPs to make this feature happen. While it took us time to find a solution to this issue, it was our continuing research into this problem that heavily contributed to it.',
    quoteAfterGallery:
      'Once we had our research ready, I started to map out the user flow with the help of my developer so we could figure out something that was realistic and doable in the two-day time span we had. It was here that I got stuck, so I brought my team together so we could all do a session of Crazy Eights. Being the person leading this exercise, I saw just how much non-designers could bring out new ideas through our collective and personal lived experiences. It was through this that we were able to break through and figure out a flow we all agreed upon. After that, it was go time.',
    quoteShowcase:
      'Throughout affinity mapping, we were able to point out user concerns, including privacy concerns about reading the entire conversation. Through this, we censored the elder’s transcript and shifted it into a short AI analysis with a color ranking system showing how concerning the information the elder is giving is, while the scammer side has the keyword detection on. I then made the transcript the entire screen, giving better perception and attention to the transcript. I then created a soundwave component that conveyed to the user that the transcript was live and who the user was talking to. This included an analysis of the scam while the transcript was happening, giving clear feedback to the user.',
    quoteAffinity:
      'After that, I created a more sophisticated report analysis for the viewer. I also included a learning component under the report to give feedback to the caregiver so they can help teach their elder about how people exploit their age group and what they can do to better protect themselves. This came from our research where 70 percent of people thought they could detect a scam, when in actuality only 50 percent of people can. This prompted us to add a small but important feature for better education and teaching so both parties can communicate between each other and protect each other.',
    quoteNav:
      'I then presented our project live. It was one of the most nervous I had ever been, but an absolute wonderful experience. It never felt like a competition, as someone said that there is no competition when doing social good. Even though we ended up placing third, I was able to learn even more about AI and come out of it as a better and more complete product designer.',
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
    bentoInsertTitle: 'Userflow',
    apiStackTitle: 'API Stack',
    apiStackDescription:
      'The Guardian app uses a simple real-time pipeline: Twilio receives an incoming call and, via a webhook, is instructed to stream the caller’s audio over a WebSocket to a FastAPI backend that’s exposed to the internet with ngrok. The backend opens an OpenAI Realtime transcription session and forwards Twilio’s µ-law audio frames into the API, then relays partial and final transcript events to the browser over a separate /frontend-stream WebSocket. The Vite frontend subscribes to that stream to display live captions and highlight scam-related keywords, giving users an immediate, readable view of what’s being said while the call is still in progress.',
    userflowDescription:
      'Through agreement on the user flow and API stack, my developer and I worked collaboratively to figure out an interaction that could best utilize the AI technologies while still having a smooth user experience—especially for our target group. Through this, we decided on a dashboard interface, allowing the caregiver to parse through complex data in a simple interface, with the ability to read through reports the AI collects on the elder in order to make sure the caregiver is doing the best they can to protect them.',
    navLeftTitle: 'Live Call Flow',
    navLeftDescription:
      'After that, I created a more sophisticated report analysis for the viewer. I also included a learning component under the report to give feedback to the caregiver so they can help teach their elder about how people exploit their age group and what they can do to better protect themselves. This came from our research where 70 percent of people thought they could detect a scam, when in actuality only 50 percent of people can. This prompted us to add a small but important feature for better education and teaching so both parties can communicate between each other and protect each other.',
    navRightTitle: 'Post Call Support',
    navRightDescription:
      'After the call, the system summarizes what happened, suggests next steps, and creates a report that can be shared with a caregiver or support team.',
    scammerTitle: 'Scammer Playbook',
    scammerBody:
      'I led the research with my group, focusing on scammer stories more than anything else. We collected multiple stories and broke them down into user journeys. It was through this breakdown that we discovered how scammers break down elders and get them to fall for their tricks. Scammers research beforehand through exposed data on the deep web, then build a persona of the target in order to find weak spots. So when they call, they know how to emotionally stun the target, which consists of getting as high of an emotional reaction as possible—rattling them—and then pressuring them into doing whatever they need. It is through this that hundreds of millions of dollars are lost in the US. It is only after that that caregivers are notified, due to the shame elders feel after it happens, making it less likely an elder will tell them.',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeaderNew activeSection="projects" />
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

          {/* Right Image Bento */}
          <section className="guardian-app-bento-section">
            <ContentModule
              layout="bento-up-left"
              title={copy.scammerTitle}
              description={copy.scammerBody}
              images={[scamStatsImage]}
              hideTopImage={true}
              hideText={false}
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

          {/* Right Image + Text Left Bento */}
          <section className="guardian-app-bento-section">
            <ContentModule
              layout="bento-up-right"
              title={copy.bentoInsertTitle}
              description={copy.userflowDescription}
              images={[detectionFlowImage]}
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

          <section className="guardian-app-bento-section">
            <ContentModule
              layout="bento-up-left"
              title={copy.apiStackTitle}
              description={copy.apiStackDescription}
              images={[apiStackImage]}
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

          {/* Quote */}
          <section className="guardian-app-quote">
            <p className="guardian-app-quote-text">After we presented our prototype to six investors, we waited for a couple of days for their selection. For the hackathon, the top three that were selected would be brought to a gala where the final selection for the top three places would be made. It was through this patient waiting that I learned that my team had been selected for the gala. We had a week to make our changes and make my pitch deck. With this time, my team and I did rigorous user testing with family and friends who were taking care of elders. Through this, we poured all our findings into one basket across five people and created an affinity map from our usability testing in order to make important changes.</p>
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
      </main>
    </>
  );
}
