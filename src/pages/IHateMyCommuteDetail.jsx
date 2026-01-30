import { useEffect } from 'react';
import ProjectDetailHeader from '../components/ProjectDetailHeader';
import ContentModule from '../components/ContentModule';
import OtherProjects from '../components/OtherProjects';
import Footer from '../Footer';
import { footerData } from '../footerData';
import { projectsData } from '../data/projectsData';
import './IHateMyCommuteDetail.css';

// Import images
import heroImage from '../../img_assets/i_hate_my_commute/image2.png';
import commutePhoto from '../../img_assets/i_hate_my_commute/image3.png';
import brentWongPainting from '../../img_assets/i_hate_my_commute/image4.png';
import claudeOutput from '../../img_assets/i_hate_my_commute/image5.png';
import levaPanel from '../../img_assets/i_hate_my_commute/image6.png';
import glitchEffect from '../../img_assets/i_hate_my_commute/image8.png';
import screenshot1 from '../../img_assets/i_hate_my_commute/image9.png';
import screenshot2 from '../../img_assets/i_hate_my_commute/image10.png';
import zoomedOutView from '../../img_assets/i_hate_my_commute/image11.png';
import focusedScene from '../../img_assets/i_hate_my_commute/image12.png';
import roadAsset from '../../img_assets/i_hate_my_commute/image13.png';
import environmentView from '../../img_assets/i_hate_my_commute/image14.png';
import levaPanelFull from '../../img_assets/i_hate_my_commute/image15.png';
import timesOfDay from '../../img_assets/i_hate_my_commute/image16.png';

const bentoStyles = {
  '--content-module-bento-gap': '24px',
  '--content-module-bento-gap-desktop': '40px',
  '--content-module-bento-text-width': '30%',
  '--content-module-bento-media-width': '70%',
  '--content-module-image-height-bento': '560px',
  '--content-module-border-radius-mobile': '20px',
  '--content-module-border-radius-desktop': '34px'
};

export default function IHateMyCommuteDetail() {
  const project = projectsData.iHateMyCommute;
  const synechronProject = projectsData.synechronCube;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ProjectDetailHeader />
      <main className="commute-page">
        <div className="commute-container">

          {/* Header Section */}
          <header className="commute-header">
            <div className="commute-title-section">
              <div className="commute-metadata">
                <span className="commute-metadata-item">
                  {project.metadata.date}
                </span>
                <span className="commute-metadata-item commute-metadata-secondary">
                  {project.metadata.company}
                </span>
                <span className="commute-metadata-item commute-metadata-secondary">
                  {project.metadata.category}
                </span>
              </div>
              <h1 className="commute-title">{project.title}</h1>
            </div>
            <div className="commute-hero-image-container">
              <img
                src={heroImage}
                alt={project.title}
                className="commute-hero-image"
              />
            </div>
          </header>

          {/* Bio & Skills Section */}
          <section className="commute-bio-skills">
            <div className="commute-description">
              <p className="commute-description-text">
                {project.description}
              </p>
            </div>
            <div className="commute-skills">
              {project.skills.map((skill, index) => (
                <span key={index} className="commute-skill">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Quote 1 */}
          <section className="commute-quote">
            <p className="commute-quote-text">
              Optimization is the horse-and-carrot you chase forever and never quite catch. There's no need to think about anything. It's all been optimized for you.
            </p>
          </section>

          {/* Section 1: Optimization and Smoothness */}
          <section className="commute-bento-section">
            <ContentModule
              layout="bento-up-left"
              title="Optimization and Smoothness"
              description="Everyone calls AI the word of the 2020s. I want to throw another into the ring: optimization. Designers can't seem to get enough of it, and now every job posting asks for these skills. From Claude Code to Bolt, vibecoding is all the rage. Access to building digital products has dropped dramatically in the last two years. I'm a designer first, coder second, and I lean on that coding background because I like static things. Speculative design is not enough; I want to see the real thing in motion."
              images={[commutePhoto]}
              hideTopImage={true}
              style={bentoStyles}
            />
          </section>

          {/* Section 2: The Commute That Sparked the Project */}
          <section className="commute-bento-section">
            <ContentModule
              layout="bento-up-right"
              title="The Commute That Sparked the Project"
              description="I had recently moved to the Bay Area post-college. Starting my internship at Sensigo meant commuting from the East Bay to Redwood City. If you know that traffic, you know the hell I signed up for. I sat in my car, moving an inch every ten minutes, and thought, 'He did not know how good he had it.' While painful, this commute inspired the project I was about to make."
              images={[brentWongPainting]}
              hideTopImage={true}
              bentoTextAlign="left"
              style={bentoStyles}
            />
          </section>

          {/* Quote 2 */}
          <section className="commute-quote">
            <p className="commute-quote-text">
              Lighting creates a mood, whether it is the harsh top-down light of noon or a low, warm edge light that reads as dusk. What elevates 3D interfaces from 2D experiences is the cinematic aspect that you can create.
            </p>
          </section>

          {/* Section 3: The Image, Claude Code, and Credit Anxiety */}
          <section className="commute-bento-section">
            <ContentModule
              layout="bento-up-left"
              title="The Image, Claude Code, and Credit Anxiety"
              description="I saw a painterly beach-and-ocean image on are.na. I dropped it into Claude Code and asked for a React Three Fiber environment based on it. The only problem is that I am not the most familiar with React.js, and especially React Three Fiber, so at the beginning there was the worry of debugging. If something were to happen where I needed to shift from building to finding an error, then I would be screwed into wasting credits."
              images={[claudeOutput]}
              hideTopImage={true}
              style={bentoStyles}
            />
          </section>

          {/* Section 4: Every Scene Is Lit Like a Netflix Movie */}
          <section className="commute-bento-section">
            <ContentModule
              layout="bento-up-right"
              title="Every Scene Is Lit Like a Netflix Movie"
              description="I don't really set scenes up from scratch anymore thanks to AI, and it's nice skipping the tedious Three.js setup. But a common issue is that no matter the program, everything ends up lit the same. The GitHub projects it references tend to share the same basic setup, which makes everything look identical. For me, that's a big issue because lighting is the main driver of narrative."
              images={[levaPanel]}
              hideTopImage={true}
              bentoTextAlign="left"
              style={bentoStyles}
            />
          </section>

          {/* Section 5: How To Push Against The Biases */}
          <section className="commute-bento-section">
            <ContentModule
              layout="bento-up-left"
              title="How To Push Against The Biases"
              description="When the Opus credits ran out, I went to the terminal. With Leva panels set up, I do most of the visual debugging there and leave the logic to the AI. I punch above my weight by pointing the AI at GitHub repos. It can reuse known setups instead of starting from scratch. That one image started to narrow my focus. I kept optimizing for resemblance, and everything else fell to the side."
              images={[glitchEffect]}
              hideTopImage={true}
              style={bentoStyles}
            />
          </section>

          {/* Quote 3 */}
          <section className="commute-quote">
            <p className="commute-quote-text">
              Those mistakes can become points of reflection. Working with the machine, instead of treating it as a mistake, it becomes a space where biases can be seen, manipulated, and rewritten.
            </p>
          </section>

          {/* Section 6: Make Mistakes Great Again */}
          <section className="commute-bento-section">
            <ContentModule
              layout="bento-up-right"
              title="Make Mistakes Great Again"
              description="After yelling at the AI in Caps Lock, I figured it out through the Leva sliders: it had added a custom post-processing shader pass. It handled posterization, dithering, bloom, vignette, and grain. I spent a lot of time trying to find the issue, and that forced me to sit with the scene. As I zoomed out, the camera unlocked and I drifted outside the scene into the sky dome. That fake space view on a laptop screen made me think about my relationship with the internet."
              images={[screenshot2, zoomedOutView]}
              bentoTextAlign="left"
              style={bentoStyles}
            />
          </section>

          {/* Section 7: Zooming Out and Focusing */}
          <section className="commute-bento-section">
            <ContentModule
              layout="bento-up-left"
              title="Zooming Out and Focusing"
              description="My final vision started to form, unexpected but perfect. I realized I wanted to make an experience about the global commute, with all its small pleasures and annoyances. I built a custom sky dome and used real-world sun math to keep it believable. I wanted a calming overwhelm, and I wanted the road to feel endless in either direction."
              images={[focusedScene, environmentView]}
              style={bentoStyles}
            />
          </section>

          {/* Section 8: The Final Touches */}
          <section className="commute-bento-section">
            <ContentModule
              layout="bento-up-right"
              title="The Final Touches"
              description="I had Claude set up most of the assets. The lesson was obvious: expect AI mistakes, and build your own safety net. Mine was the Leva panel. Every model had its axis, position, and rotation adjustable. I could treat the environment more like Blender than code. Upon completing the project Sunday night, I couldn't help but procrastinate. I just kept driving with music in the background."
              images={[levaPanelFull, timesOfDay]}
              bentoTextAlign="left"
              style={bentoStyles}
            />
          </section>

        </div>

        {/* Other Projects Navigation */}
        <section className="commute-other-projects-stage">
          <OtherProjects project={synechronProject} />
        </section>

        {/* Footer */}
        <div className="footer-layer commute-footer-layer">
          <Footer data={footerData} />
        </div>
      </main>
    </>
  );
}
